from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from config import Config
from extensions import jwt
from resources.auth import Register, Login
from resources.game import StartGame, MakeGuess, GameHistory
from resources.leaderboard import Leaderboard
from resources.ai import AIHint

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
jwt.init_app(app)
api = Api(app)

api.add_resource(Register, '/auth/register')
api.add_resource(Login, '/auth/login')

api.add_resource(StartGame, '/game/start')
api.add_resource(MakeGuess, '/game/guess')
api.add_resource(GameHistory, '/game/history')

api.add_resource(Leaderboard, '/leaderboard')

api.add_resource(AIHint, '/ai/hint')

@app.route('/')
def home():
    return {
        'message': 'Number Guessing Game API',
        'version': '1.0',
        'endpoints': {
            'auth': ['/auth/register', '/auth/login'],
            'game': ['/game/start', '/game/guess', '/game/history'],
            'leaderboard': ['/leaderboard'],
            'ai': ['/ai/hint']
        }
    }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)