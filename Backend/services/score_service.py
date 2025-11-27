from config import Config
from models.user_model import UserModel

class ScoreService:
    @staticmethod
    def calculate_score(attempts, time_taken_seconds):
        score = Config.SCORE_BASE - (attempts * Config.SCORE_ATTEMPT_PENALTY) - (time_taken_seconds * Config.SCORE_TIME_PENALTY)
        return max(0, int(score))
    
    @staticmethod
    def update_medals():
        users = UserModel.get_leaderboard()
        
        for idx, user in enumerate(users):
            rank = idx + 1
            
            if rank == 1:
                medal = 'gold'
            elif rank in [2, 3]:
                medal = 'silver'
            elif rank <= 10:
                medal = 'bronze'
            else:
                medal = None
            
            if user.get('medal') != medal:
                UserModel.update_medal(user['_id'], medal)