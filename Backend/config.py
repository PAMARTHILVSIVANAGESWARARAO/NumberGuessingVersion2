import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    MONGO_DB = os.getenv('MONGO_DB', 'guessing_game')
    
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    
    GAME_MIN_NUMBER = int(os.getenv('GAME_MIN_NUMBER', '1'))
    GAME_MAX_NUMBER = int(os.getenv('GAME_MAX_NUMBER', '100'))
    
    SCORE_BASE = 1000
    SCORE_ATTEMPT_PENALTY = 30
    SCORE_TIME_PENALTY = 2