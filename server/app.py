from server.config import app, db
from flask import request, session, jsonify, render_template
from server.models import db, User, UserStock, Stock
from flask_migrate import Migrate
import yfinance as yf
import os
def format_market_cap(market_cap):
            if market_cap >= 1e12:
                return f"{market_cap / 1e12:.2f} Trillion"
            elif market_cap >= 1e9:
                return f"{market_cap / 1e9:.2f} Billion"
            elif market_cap >= 1e6:
                return f"{market_cap / 1e6:.2f} Million"
            else:
                return f"{market_cap:.2f}"
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")
            
@app.get('/stocks')
def get_all_stocks():
    stocks = [s.to_dict() for s in Stock.query.all()]
    return stocks, 200

@app.get('/stock/days/<int:id>')
def get_stock_chart_days(id):
    stock = Stock.query.filter_by(id=id).first()
    stock_ticker = yf.Ticker(stock.ticker)
    hist = stock_ticker.history(period='5d')
    if hist.empty:
        return {'error': f'Sorry unable to find {stock_ticker}'}, 404
    return [stock.to_dict(), hist.to_json()], 200

@app.get('/stock/3mo/<int:id>')
def get_stock_chart_3mo(id):
    stock = Stock.query.filter_by(id=id).first()
    stock_ticker = yf.Ticker(stock.ticker)
    hist = stock_ticker.history(period='3mo')
    if hist.empty:
        return {'error': f'Sorry unable to find {stock_ticker}'}, 404
    return [stock.to_dict(), hist.to_json()], 200

@app.get('/stock/6mo/<int:id>')
def get_stock_chart_6mo(id):
    stock = Stock.query.filter_by(id=id).first()
    stock_ticker = yf.Ticker(stock.ticker)
    hist = stock_ticker.history(period='6mo')
    if hist.empty:
        return {'error': f'Sorry unable to find {stock_ticker}'}, 404
    return [stock.to_dict(), hist.to_json()], 200

@app.get('/stock/year/<int:id>')
def get_stock_chart_year(id):
    stock = Stock.query.filter_by(id=id).first()
    stock_ticker = yf.Ticker(stock.ticker)
    hist = stock_ticker.history(period='1y')
    if hist.empty:
        return {'error': f'Sorry unable to find {stock_ticker}'}, 404
    return [stock.to_dict(), hist.to_json()], 200

@app.get('/stock/update/<int:id>')
def update_stock_price(id):
    try:
        stock = Stock.query.filter_by(id=id).first()
        stock_ticker = yf.Ticker(stock.ticker)
        hist = stock_ticker.history(period='1m')['Close'][0]
        market_cap = stock_ticker.info['marketCap']
        formatted_market_cap = format_market_cap(market_cap)
        stock.price = round(hist, 2)
        stock.market_cap = formatted_market_cap
        db.session.add(stock)
        db.session.commit()
        return {'updated price': stock.price, 'updated market cap': stock.market_cap}, 200
    except ValueError:
        return {'error': f'Sorry unable to find {stock_ticker}'}, 404

@app.get('/user_stocks')
def get_all_user_stocks():
    stocks = [s.to_dict() for s in UserStock.query.all()]
    return stocks, 200

@app.post('/user_stocks')
def buy_stock():
    data = request.get_json()
    try:
        user_stock = UserStock(
            shares=data.get('shares'),
            user_id=data.get('user_id'),
            stock_id=data.get('stock_id')
        )
        db.session.add(user_stock)
        db.session.commit()
        return user_stock.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422

@app.patch('/user_stocks/<int:id>')
def sell_shares(id):
    stock_to_update = UserStock.query.filter_by(id=id).first()
    data = request.get_json()
    if not stock_to_update:
        return {'error': 'not user found'}, 404
    if not data:
        return {'error': 'unable to process your input'}, 422
    for attr in data:
        setattr(stock_to_update, attr, data[attr])
    db.session.add(stock_to_update)
    db.session.commit()
    return stock_to_update.to_dict(), 200

@app.delete('/user_stocks/<int:id>')
def sell_all_stock(id):
    stock_to_delete = UserStock.query.filter_by(id=id).first()
    try:
        db.session.delete(stock_to_delete)
        db.session.commit()
        return {'message': 'stock deleted'}, 204
    except LookupError:
        return {'error': 'user_stock not found'}, 404

@app.get('/users')
def get_users():
    users = [user.to_dict() for user in User.query.all()]
    return users, 200

@app.patch('/user/<int:id>')
def update_username(id):
    data = request.get_json()

    if not data:
        return {'error': 'unable to process your input'}, 422
    
    user_to_update = User.query.filter_by(id=id).first()

    if not user_to_update:
        return {'error': 'not user found'}, 404   
    
    for attr in data:
        setattr(user_to_update, attr, data[attr])
    db.session.add(user_to_update)
    db.session.commit()
    return user_to_update.to_dict(), 200

@app.post('/signup')
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    new_user = User(
        username=username
    )
    new_user.password_hash = password
    try:
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422

@app.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.authenticate(data['password']):
        return {'error': 'invalid input'}, 400
    session['user_id'] = user.id
    return user.to_dict(), 201

@app.get('/check_session')
def auto_login():
    user = User.query.filter_by(id=session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    return {'error': 'unauthorized'}, 401

@app.delete('/logout')
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return {'message': 'logged out'}, 204
    return {'error': 'session not found'}, 404


if __name__ == '__main__':
    app.run()