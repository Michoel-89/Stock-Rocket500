from app import app
from models import db, User, UserStock, Stock
from S_and_P_500 import stock_data
from faker import Faker
from random import randint
fake = Faker()

if __name__ == '__main__':

    with app.app_context():
        # User.query.delete()
        Stock.query.delete()
        print('seeding stocks')
        for stock_symbol, stock_info in stock_data.items():
            stock = Stock(
                ticker=stock_symbol,
                name=stock_info['company'],
                industry=stock_info['industry'],
                market_cap=stock_info['market_cap']
            )
            db.session.add(stock)
            db.session.commit()
        # for i in range(20):
        #     user = User(
        #         username=fake.name(),
        #     )
        #     user.password_hash = '123'
        #     db.session.add(user)
        #     db.session.commit()
        # for i in range(20):
        #     userStock = UserStock(
        #         user_id=randint(1, 20),
        #         stock_id=randint(1, 500)
        #     )
        #     db.session.add(userStock)
        #     db.session.commit()
        pass