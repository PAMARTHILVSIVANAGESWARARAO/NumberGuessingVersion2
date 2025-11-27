# Number Guessing Game - Backend API

A complete Flask backend for a multi-user number guessing game with JWT authentication, MongoDB storage, AI-powered hints using Google Gemini, and a dynamic leaderboard system.

## Features

- 🔐 User authentication with JWT tokens
- 🎮 Multi-user game sessions
- 🏆 Dynamic leaderboard with medals (Gold, Silver, Bronze)
- 🤖 AI-powered hints using Google Gemini API
- 📊 Score calculation based on attempts and time
- 📜 Game history tracking
- 🔥 Multiple clue types (direction, temperature, parity, digit range)

## Installation

### 1. Install Python Dependencies

```bash
pip install Flask==3.0.0
pip install Flask-RESTful==0.3.10
pip install Flask-JWT-Extended==4.5.3
pip install Flask-CORS==4.0.0
pip install pymongo==4.6.1
pip install bcrypt==4.1.2
pip install python-dotenv==1.0.0
pip install google-generativeai==0.3.2
```

Or use requirements.txt:

```bash
pip install -r requirements.txt
```

### 2. Install MongoDB

**For Windows:**
Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**For macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 3. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key for your .env file

### 4. Environment Setup

Create a `.env` file in the project root:

```bash
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
MONGO_URI=mongodb://localhost:27017/
MONGO_DB=guessing_game
GEMINI_API_KEY=your-gemini-api-key-here
GAME_MIN_NUMBER=1
GAME_MAX_NUMBER=100
SCORE_BASE=1000
SCORE_ATTEMPT_PENALTY=30
SCORE_TIME_PENALTY=2
```

## Project Structure

```
backend/
├── app.py                      # Main Flask application
├── config.py                   # Configuration settings
├── extensions.py               # Flask extensions & MongoDB setup
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables
├── resources/
│   ├── auth.py                # Authentication endpoints
│   ├── game.py                # Game logic endpoints
│   ├── leaderboard.py         # Leaderboard endpoint
│   └── ai.py                  # AI hint endpoint
├── services/
│   ├── score_service.py       # Score calculation logic
│   ├── clue_service.py        # Clue generation logic
│   └── ai_service.py          # Gemini AI integration
└── models/
    ├── user_model.py          # User database operations
    └── game_model.py          # Game database operations
```

## Running the Application

```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication

**Register**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "player1",
  "email": "player1@example.com",
  "password": "securepass123"
}
```

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "player1",
  "password": "securepass123"
}
```

Response includes `access_token` - use in Authorization header for protected routes.

### Game Endpoints

**Start New Game**
```http
POST /game/start
Authorization: Bearer <access_token>
```

**Make a Guess**
```http
POST /game/guess
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "guess": 50
}
```

**Get Game History**
```http
GET /game/history?limit=10
Authorization: Bearer <access_token>
```

### Leaderboard

**Get Leaderboard**
```http
GET /leaderboard
```

### AI Hints

**Get AI Hint**
```http
POST /ai/hint
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "last_guess": 57,
  "clues": {
    "direction": "higher",
    "temperature": "warm",
    "parity": "even",
    "digit_range": "60-69"
  }
}
```

## Game Rules

### Scoring System
- Base Score: 1000 points
- Penalty: -30 points per attempt
- Penalty: -2 points per second
- Minimum Score: 0

### Clue Types
- **Direction**: Higher or Lower
- **Temperature**: Hot (within 5), Warm (within 15), Cold (15+)
- **Parity**: Even or Odd
- **Digit Range**: e.g., 40-49, 50-59

### Medal System
- 🥇 Gold: Rank #1
- 🥈 Silver: Rank #2-3
- 🥉 Bronze: Rank #4-10
- None: Below rank 10

## Testing with Postman/cURL

**Register a User:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Start Game:**
```bash
curl -X POST http://localhost:5000/game/start \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Make Guess:**
```bash
curl -X POST http://localhost:5000/game/guess \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"guess":50}'
```

## MongoDB Collections

### Users Collection
```json
{
  "_id": ObjectId,
  "username": "player1",
  "email": "player1@example.com",
  "password": "hashed_password",
  "total_score": 2500,
  "medal": "gold"
}
```

### Games Collection
```json
{
  "_id": ObjectId,
  "user_id": "user_id_here",
  "secret_number": 73,
  "start_time": ISODate,
  "end_time": ISODate,
  "attempts": 5,
  "status": "completed",
  "score": 850,
  "guesses": [
    {
      "guess": 50,
      "clues": {...},
      "timestamp": ISODate
    }
  ]
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS enabled for cross-origin requests
- Unique username and email constraints

## Development Tips

- MongoDB must be running before starting the app
- Use `.env` file for configuration (never commit it!)
- JWT tokens expire after 24 hours (configurable)
- AI hints work even without Gemini API (fallback messages)

## License

MIT License - Feel free to use this project!