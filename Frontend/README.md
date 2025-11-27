# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) foa# Number Guessing Game - Frontend

A complete React + Vite frontend for the Number Guessing Game with authentication, game play, history tracking, and leaderboard.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Make sure Backend is Running

Ensure your Flask backend is running at `http://localhost:5000`

## 📦 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Routing
- **Axios** - API calls
- **Bootstrap 5** - UI components (via CDN)
- **Bootstrap Icons** - Icons
- **Google Fonts (Poppins)** - Typography

## 📁 Project Structure

```
src/
├── api/
│   ├── axiosInstance.js    # Axios configuration with JWT interceptor
│   ├── auth.js              # Authentication API calls
│   ├── game.js              # Game API calls
│   ├── leaderboard.js       # Leaderboard API calls
│   └── ai.js                # AI hint API calls
├── components/
│   ├── Navbar.jsx           # Navigation bar component
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── pages/
│   ├── Register.jsx         # User registration page
│   ├── Login.jsx            # User login page
│   ├── Dashboard.jsx        # Main dashboard
│   ├── Game.jsx             # Game play screen
│   ├── History.jsx          # Game history page
│   └── Leaderboard.jsx      # Leaderboard rankings
├── styles/
│   └── global.css           # Global styles
├── App.jsx                  # Main app component with routes
└── main.jsx                 # App entry point
```

## 🎮 Features

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Auto-login if token exists
- ✅ Token stored in localStorage
- ✅ Protected routes
- ✅ Auto-redirect on authentication

### Game Play
- ✅ Start new game
- ✅ Make guesses (1-100)
- ✅ Real-time clue system:
  - Direction (Higher/Lower)
  - Temperature (Hot/Warm/Cold)
  - Parity (Even/Odd)
  - Digit Range (e.g., 50-59)
- ✅ Attempt counter
- ✅ Previous guesses history
- ✅ AI-powered hints from Gemini
- ✅ Victory screen with stats
- ✅ Play again functionality

### Dashboard
- ✅ Welcome message with username
- ✅ Display total score
- ✅ Display medal status
- ✅ Quick navigation to all features
- ✅ Modern card-based UI

### Game History
- ✅ List of past games
- ✅ Secret number revealed
- ✅ Attempts taken
- ✅ Score earned
- ✅ Start and end timestamps
- ✅ Sorted by newest first

### Leaderboard
- ✅ Top players ranking
- ✅ Total scores
- ✅ Medal display (Gold/Silver/Bronze)
- ✅ Visual rank indicators
- ✅ Highlight current user
- ✅ Real-time updates

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Poppins Font** - Clean, modern typography
- **Bootstrap 5** - Professional components
- **Gradient Backgrounds** - Attractive visuals
- **Card-based Layout** - Organized content
- **Color-coded Clues** - Easy to understand
- **Smooth Animations** - Polished experience
- **Loading States** - User feedback
- **Error Handling** - Clear error messages

## 🔐 Authentication Flow

1. User lands on login page
2. If token exists → auto-redirect to dashboard
3. User logs in → token stored in localStorage
4. Token automatically sent with all API requests
5. Invalid token → auto-redirect to login
6. Logout → clear token and redirect

## 🎯 Game Flow

1. **Start Game** → POST `/game/start`
2. **Make Guess** → POST `/game/guess`
3. **Receive Clues** → Display colored badges
4. **Get AI Hint** (optional) → POST `/ai/hint`
5. **Correct Guess** → Show victory screen with score
6. **Play Again** → Restart flow

## 📊 API Integration

All API calls are made through Axios instance with:
- Base URL: `http://localhost:5000`
- JWT token auto-injection
- Error interceptor for 401 handling
- Clean error messages

### API Endpoints Used

```javascript
// Auth
POST /auth/register
POST /auth/login

// Game
POST /game/start
POST /game/guess
GET  /game/history

// Leaderboard
GET  /leaderboard

// AI
POST /ai/hint
```

## 🎨 Color Scheme

- **Primary**: `#667eea` (Purple)
- **Secondary**: `#764ba2` (Deep Purple)
- **Success**: Bootstrap Green
- **Warning**: Bootstrap Yellow
- **Danger**: Bootstrap Red

### Clue Colors
- **Higher**: Red (#ff6b6b)
- **Lower**: Teal (#4ecdc4)
- **Hot**: Red (#ff6b6b)
- **Warm**: Orange (#ffa500)
- **Cold**: Teal (#4ecdc4)
- **Even**: Purple (#667eea)
- **Odd**: Deep Purple (#764ba2)

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

The API base URL is configured in `src/api/axiosInstance.js`:

```javascript
baseURL: 'http://localhost:5000'
```

Change this if your backend runs on a different port.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Change Colors

Edit `src/styles/global.css` - main gradient:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change API URL

Edit `src/api/axiosInstance.js`:

```javascript
baseURL: 'YOUR_API_URL'
```

### Change Port

Edit `vite.config.js`:

```javascript
server: {
  port: 3000
}
```

## 🐛 Troubleshooting

### CORS Issues
Make sure Flask backend has CORS enabled:
```python
from flask_cors import CORS
CORS(app)
```

### Token Expiry
JWT tokens expire after 24 hours (configured in backend). Users will be auto-logged out.

### Network Errors
Check if backend is running at `http://localhost:5000`

## 📝 Notes

- All routes except `/login` and `/register` are protected
- Token is validated on every protected route access
- User data is stored in localStorage for persistence
- AI hints require Gemini API key in backend

## 🎉 Ready to Play!

1. Start backend: `python app.py`
2. Start frontend: `npm run dev`
3. Register a new account
4. Start guessing numbers!

---

Built with ❤️ using React + Vite + Bootstrapr Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
