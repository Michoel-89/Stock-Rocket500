from config import app, db
from flask import request, session
from models import db, User, UserStock, Stock
from flask_migrate import Migrate

@app.route('/')
def home():
    return '<h1>Home</h1>'

@app.get('/stocks')
def get_all_stocks():
    stocks = [s.to_dict() for s in Stock.query.all()]
    return stocks, 200

@app.get('/stocks/<int:id>')
def get_stock(id):
    stock = Stock.query.filter_by(id=id).first().to_dict()
    return stock, 200

@app.get('/user_stocks')
def get_all_user_stocks():
    stocks = [s.to_dict() for s in UserStock.query.all()]
    return stocks, 200

@app.post('/user_stocks')
def buy_stock():
    data = request.get_json()
    try:
        user_stock = UserStock(
            user_id=data.get('user_id'),
            stock_id=data.get('stock_id')
        )
        db.session.add(user_stock)
        db.session.commit()
        return user_stock.to_dict(), 201
    except ValueError:
        return {'error': 'unable to process your input'}, 422

@app.delete('/user_stocks/<int:id>')
def delete_stock(id):
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
    img_url = data.get('img_url')
    new_user = User(
        username=username,
        img_url=img_url,
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
    app.run(port=5555, debug=True)