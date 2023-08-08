from app import app
from models import db, User, UserStock, Stock
from S_and_P_500 import stock_data
from faker import Faker
from random import randint
fake = Faker()
import yfinance as yf
# 1e2 e means exponant

# def format_market_cap(market_cap):
#             if market_cap >= 1e12:
#                 return f"{market_cap / 1e12:.2f} Trillion"
#             elif market_cap >= 1e9:
#                 return f"{market_cap / 1e9:.2f} Billion"
#             elif market_cap >= 1e6:
#                 return f"{market_cap / 1e6:.2f} Million"
#             else:
#                 return f"{market_cap:.2f}"
# def get_stock_data():
#     stock_dict = {}
#     for stock_symbol in stock_data:
#             ticker = yf.Ticker(stock_symbol)
#             cap = ticker.info['marketCap']
#             formatted_market_cap = format_market_cap(cap)
#             stock_dict[stock_symbol] = formatted_market_cap
#     return stock_dict
if __name__ == '__main__':
    
    with app.app_context():
        pass
        # UserStock.query.delete()
        # dic = get_stock_data()
        # print(dic)
        # for k,v in dic.items():
        #      stock = Stock.query.filter_by(ticker=k).first()
        #      stock.market_cap = v
        #      db.session.add(stock)
        #      db.session.commit()
             
        # User.query.delete()
        # Stock.query.delete()
        # print('seeding stocks')
        # def format_market_cap(market_cap):
        #     if market_cap >= 1e12:
        #         return f"{market_cap / 1e12:.2f} Trillion"
        #     elif market_cap >= 1e9:
        #         return f"{market_cap / 1e9:.2f} Billion"
        #     elif market_cap >= 1e6:
        #         return f"{market_cap / 1e6:.2f} Million"
        #     else:
        #         return f"{market_cap:.2f}"
        # for stock_symbol, stock_info in stock_data.items():
        #     formatted_market_cap = format_market_cap(stock_info['market_cap'])
        #     stock = Stock(
        #         ticker=stock_symbol,
        #         name=stock_info['company'],
        #         industry=stock_info['industry'],
        #         market_cap=formatted_market_cap
        #     )
        #     db.session.add(stock)
        #     db.session.commit()
        # for i in range(20):
        #     user = User(
        #         username=fake.name(),
        #     )
        #     user.password_hash = '123'
        #     db.session.add(user)
        #     db.session.commit()
        # for i in range(20):
        #     userStock = UserStock(
        #         shares=randint(1, 20),
        #         user_id=randint(1, 1),
        #         stock_id=randint(1, 500)
        #     )
        #     db.session.add(userStock)
        #     db.session.commit()
        