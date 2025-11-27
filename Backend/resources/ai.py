from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.ai_service import AIService
from models.game_model import GameModel

class AIHint(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('last_guess', type=int, required=True, help='Last guess is required')
        self.parser.add_argument('clues', type=dict, required=True, help='Clues are required')
        self.ai_service = AIService()
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        args = self.parser.parse_args()
        
        game = GameModel.find_active_game(user_id)
        if not game:
            return {'message': 'No active game found'}, 404
        
        hint = self.ai_service.generate_hint(
            args['last_guess'],
            args['clues'],
            game['attempts']
        )
        
        return {
            'message': 'AI hint generated',
            'hint': hint
        }, 200