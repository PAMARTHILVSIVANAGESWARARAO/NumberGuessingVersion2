from extensions import users_collection
from bson import ObjectId
import bcrypt

class UserModel:

    @staticmethod
    def create_user(username, email, password):
        # Hash password as bytes
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Store as string in DB (MongoDB safe)
        hashed_password_str = hashed_password.decode('utf-8')

        user_doc = {
            'username': username,
            'email': email,
            'password': hashed_password_str,  # store as string
            'total_score': 0,
            'medal': None
        }

        result = users_collection.insert_one(user_doc)
        user_doc['_id'] = str(result.inserted_id)
        return user_doc

    @staticmethod
    def find_by_username(username):
        user = users_collection.find_one({'username': username})
        if user:
            user['_id'] = str(user['_id'])
        return user

    @staticmethod
    def find_by_email(email):
        user = users_collection.find_one({'email': email})
        if user:
            user['_id'] = str(user['_id'])
        return user

    @staticmethod
    def find_by_id(user_id):
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        if user:
            user['_id'] = str(user['_id'])
        return user

    @staticmethod
    def verify_password(stored_password, provided_password):
        print("------ VERIFY PASSWORD DEBUG ------")
        print("Stored password raw:", stored_password)
        print("Stored password type:", type(stored_password))
        print("Provided password:", provided_password)

        # stored_password from DB is string; convert to bytes
        if isinstance(stored_password, str):
            stored_password = stored_password.encode('utf-8')

        # provided password is string, convert to bytes
        provided_password_bytes = provided_password.encode('utf-8')

        result = bcrypt.checkpw(provided_password_bytes, stored_password)
        print("Check result:", result)
        print("-----------------------------------")

        return result

    @staticmethod
    def update_score(user_id, score_to_add):
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$inc': {'total_score': score_to_add}}
        )
        return result.modified_count > 0

    @staticmethod
    def update_medal(user_id, medal):
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'medal': medal}}
        )
        return result.modified_count > 0

    @staticmethod
    def get_leaderboard():
        users = list(users_collection.find(
            {},
            {'username': 1, 'total_score': 1, 'medal': 1}
        ).sort('total_score', -1))

        for user in users:
            user['_id'] = str(user['_id'])

        return users
