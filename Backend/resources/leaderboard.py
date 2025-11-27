from flask_restful import Resource
from models.user_model import UserModel

class Leaderboard(Resource):
    def get(self):
        users = UserModel.get_leaderboard()
        
        leaderboard = []
        for idx, user in enumerate(users):
            leaderboard.append({
                'rank': idx + 1,
                'username': user['username'],
                'total_score': user['total_score'],
                'medal': user.get('medal')
            })
        
        return {
            'message': 'Leaderboard retrieved',
            'leaderboard': leaderboard
        }, 200