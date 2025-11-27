from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from models.user_model import UserModel

class Register(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('username', type=str, required=True, help='Username is required')
        self.parser.add_argument('email', type=str, required=True, help='Email is required')
        self.parser.add_argument('password', type=str, required=True, help='Password is required')
    
    def post(self):
        args = self.parser.parse_args()
        
        if UserModel.find_by_username(args['username']):
            return {'message': 'Username already exists'}, 400
        
        if UserModel.find_by_email(args['email']):
            return {'message': 'Email already exists'}, 400
        
        if len(args['password']) < 6:
            return {'message': 'Password must be at least 6 characters'}, 400
        
        user = UserModel.create_user(args['username'], args['email'], args['password'])
        
        return {
            'message': 'User created successfully',
            'user': {
                'id': user['_id'],
                'username': user['username'],
                'email': user['email']
            }
        }, 201


class Login(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('username', type=str, required=True, help='Username is required')
        self.parser.add_argument('password', type=str, required=True, help='Password is required')
    
    def post(self):
        args = self.parser.parse_args()
        
        user = UserModel.find_by_username(args['username'])
        
        if not user:
            return {'message': 'Invalid credentials'}, 401
        
        if not UserModel.verify_password(user['password'], args['password']):
            return {'message': 'Invalid credentials'}, 401
        
        access_token = create_access_token(identity=user['_id'])
        
        return {
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user['_id'],
                'username': user['username'],
                'email': user['email'],
                'total_score': user['total_score'],
                'medal': user['medal']
            }
        }, 200