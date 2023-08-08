from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    _password_hash = db.Column(db.String(50), nullable=False)
    account_balance = db.Column(db.Integer, default=1000)

    my_stocks = db.relationship('UserStock', backref='user', cascade='all' )

    serialize_rules = ('-my_stocks.user','-_password_hash',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('permission denied')
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class UserStock(db.Model, SerializerMixin):
    __tablename__ = 'user_stocks'

    id = db.Column(db.Integer, primary_key=True)
    shares = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)

    serialize_rules = ('-user.my_stocks', '-stock.owners',)

class Stock(db.Model, SerializerMixin):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String)
    name = db.Column(db.String)
    industry = db.Column(db.String)
    price = db.Column(db.Integer)
    market_cap = db.Column(db.Integer)


    
    owners = db.relationship('UserStock', backref='stock', cascade='all' )

    serialize_rules = ('-owners.stock',)