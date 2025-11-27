from extensions import games_collection
from bson import ObjectId
from datetime import datetime

class GameModel:
    @staticmethod
    def create_game(user_id, secret_number):
        game_doc = {
            'user_id': user_id,
            'secret_number': secret_number,
            'start_time': datetime.utcnow(),
            'end_time': None,
            'attempts': 0,
            'status': 'active',
            'guesses': [],
            'score': None
        }
        
        result = games_collection.insert_one(game_doc)
        game_doc['_id'] = str(result.inserted_id)
        return game_doc
    
    @staticmethod
    def find_active_game(user_id):
        game = games_collection.find_one({
            'user_id': user_id,
            'status': 'active'
        })
        if game:
            game['_id'] = str(game['_id'])
        return game
    
    @staticmethod
    def find_by_id(game_id):
        game = games_collection.find_one({'_id': ObjectId(game_id)})
        if game:
            game['_id'] = str(game['_id'])
        return game
    
    @staticmethod
    def add_guess(game_id, guess, clues):
        result = games_collection.update_one(
            {'_id': ObjectId(game_id)},
            {
                '$inc': {'attempts': 1},
                '$push': {
                    'guesses': {
                        'guess': guess,
                        'clues': clues,
                        'timestamp': datetime.utcnow()
                    }
                }
            }
        )
        return result.modified_count > 0
    
    @staticmethod
    def complete_game(game_id, score):
        result = games_collection.update_one(
            {'_id': ObjectId(game_id)},
            {
                '$set': {
                    'status': 'completed',
                    'end_time': datetime.utcnow(),
                    'score': score
                }
            }
        )
        return result.modified_count > 0
    
    @staticmethod
    def get_user_history(user_id, limit=10):
        games = list(games_collection.find(
            {
                'user_id': user_id,
                'status': 'completed'
            },
            {
                'secret_number': 1,
                'attempts': 1,
                'score': 1,
                'start_time': 1,
                'end_time': 1
            }
        ).sort('start_time', -1).limit(limit))

        fixed_games = []
        for game in games:
            fixed_games.append({
                '_id': str(game['_id']),
                'secret_number': game.get('secret_number'),
                'attempts': game.get('attempts'),
                'score': game.get('score'),
                'start_time': game['start_time'].isoformat() if game.get('start_time') else None,
                'end_time': game['end_time'].isoformat() if game.get('end_time') else None
            })

        return fixed_games
