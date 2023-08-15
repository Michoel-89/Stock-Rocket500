from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import os
current_directory = os.getcwd()
print(current_directory)
# Instantiate app, set attributes
app = Flask(__name__, static_url_path='', static_folder='../client/build', template_folder='../client/build')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{current_directory}/server/instance/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = os.getenv('SECRET_KEY')

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate Bcrypt
bcrypt = Bcrypt(app)

# Instantiate CORS
CORS(app)