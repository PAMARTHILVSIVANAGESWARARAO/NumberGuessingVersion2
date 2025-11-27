from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.game_model import GameModel
from models.user_model import UserModel
from services.clue_service import ClueService
from services.score_service import ScoreService
from config import Config
import random
from datetime import datetime

class StartGame(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        
        active_game = GameModel.find_active_game(user_id)
        if active_game:
            return {'message': 'You already have an active game. Finish it first or request game details.'}, 400
        
        secret_number = random.randint(Config.GAME_MIN_NUMBER, Config.GAME_MAX_NUMBER)
        game = GameModel.create_game(user_id, secret_number)
        
        return {
            'message': 'Game started successfully',
            'game_id': game['_id'],
            'range': f"{Config.GAME_MIN_NUMBER}-{Config.GAME_MAX_NUMBER}",
            'attempts': 0
        }, 201


class MakeGuess(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('guess', type=int, required=True, help='Guess is required')
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        args = self.parser.parse_args()
        
        guess = args['guess']
        
        if guess < Config.GAME_MIN_NUMBER or guess > Config.GAME_MAX_NUMBER:
            return {'message': f'Guess must be between {Config.GAME_MIN_NUMBER} and {Config.GAME_MAX_NUMBER}'}, 400
        
        game = GameModel.find_active_game(user_id)
        if not game:
            return {'message': 'No active game found. Start a new game first.'}, 404
        
        clues = ClueService.generate_clues(guess, game['secret_number'])
        GameModel.add_guess(game['_id'], guess, clues)
        
        game = GameModel.find_by_id(game['_id'])
        attempts = game['attempts']
        
        if clues['direction'] == 'correct':
            time_taken = (datetime.utcnow() - game['start_time']).total_seconds()
            score = ScoreService.calculate_score(attempts, time_taken)
            
            GameModel.complete_game(game['_id'], score)
            UserModel.update_score(user_id, score)
            ScoreService.update_medals()
            
            user = UserModel.find_by_id(user_id)
            
            return {
                'message': 'Congratulations! You won!',
                'correct': True,
                'secret_number': game['secret_number'],
                'attempts': attempts,
                'score': score,
                'total_score': user['total_score'],
                'time_taken': int(time_taken)
            }, 200
        
        clue_message = ClueService.format_clue_message(clues)
        
        return {
            'message': 'Keep guessing!',
            'correct': False,
            'attempts': attempts,
            'clues': clues,
            'clue_message': clue_message
        }, 200


class GameHistory(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        
        parser = reqparse.RequestParser()
        parser.add_argument('limit', type=int, default=10, location='args')
        args = parser.parse_args()
        
        games = GameModel.get_user_history(user_id, args['limit'])
        
        return {
            'message': 'Game history retrieved',
            'games': games
        }, 200