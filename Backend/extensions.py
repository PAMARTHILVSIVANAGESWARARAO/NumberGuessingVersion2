from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config

jwt = JWTManager()

mongo_client = MongoClient(Config.MONGO_URI)
db = mongo_client[Config.MONGO_DB]

users_collection = db['users']
games_collection = db['games']

users_collection.create_index('username', unique=True)
users_collection.create_index('email', unique=True)
games_collection.create_index([('user_id', 1), ('status', 1)])