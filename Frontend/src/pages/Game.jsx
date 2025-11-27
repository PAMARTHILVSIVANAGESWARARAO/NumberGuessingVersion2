import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { startGame, makeGuess } from '../api/game';
import { getAIHint } from '../api/ai';

const Game = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentClues, setCurrentClues] = useState(null);
  const [clueMessage, setClueMessage] = useState('');
  const [aiHint, setAiHint] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartGame = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await startGame();
      setGameId(response.game_id);
      setGameStarted(true);
      setAttempts(0);
      setGuesses([]);
      setGameWon(false);
      setGameResult(null);
      setAiHint('');
      setCurrentClues(null);
      setClueMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start game');
    } finally {
      setLoading(false);
    }
  };

  const handleGuess = async (e) => {
    e.preventDefault();
    if (!guess) return;

    setLoading(true);
    setError('');
    setAiHint('');

    try {
      const response = await makeGuess(parseInt(guess));
      
      if (response.correct) {
        setGameWon(true);
        setGameResult(response);
        
        const user = JSON.parse(localStorage.getItem('user'));
        user.total_score = response.total_score;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setAttempts(response.attempts);
        setCurrentClues(response.clues);
        setClueMessage(response.clue_message);
        setGuesses([
          { guess: parseInt(guess), clues: response.clues },
          ...guesses
        ]);
      }
      
      setGuess('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to make guess');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAIHint = async () => {
    if (!currentClues || guesses.length === 0) return;

    setLoading(true);
    try {
      const response = await getAIHint(guesses[0].guess, currentClues);
      setAiHint(response.hint);
    } catch (err) {
      setError('Failed to get AI hint');
    } finally {
      setLoading(false);
    }
  };

  const getClueClass = (type, value) => {
    const classMap = {
      direction: value === 'higher' ? 'clue-higher' : 'clue-lower',
      temperature: `clue-${value}`,
      parity: value === 'even' ? 'clue-even' : 'clue-odd'
    };
    return `clue-badge ${classMap[type] || ''}`;
  };

  if (gameWon && gameResult) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <div className="container">
            <div className="victory-card">
              <div className="victory-title">🎉 Congratulations! 🎉</div>
              <p style={{ fontSize: '24px' }}>You found the number!</p>
              
              <div className="victory-stats">
                <div className="victory-stat">
                  <div className="victory-stat-value">{gameResult.secret_number}</div>
                  <div className="victory-stat-label">Secret Number</div>
                </div>
                <div className="victory-stat">
                  <div className="victory-stat-value">{gameResult.attempts}</div>
                  <div className="victory-stat-label">Attempts</div>
                </div>
                <div className="victory-stat">
                  <div className="victory-stat-value">{gameResult.score}</div>
                  <div className="victory-stat-label">Score Earned</div>
                </div>
                <div className="victory-stat">
                  <div className="victory-stat-value">{gameResult.time_taken}s</div>
                  <div className="victory-stat-label">Time Taken</div>
                </div>
              </div>

              <div className="mt-4">
                <h4>Your Total Score: {gameResult.total_score}</h4>
              </div>

              <div className="mt-4">
                <button 
                  className="btn btn-light btn-lg me-3"
                  onClick={handleStartGame}
                >
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Play Again
                </button>
                <button 
                  className="btn btn-outline-light btn-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  <i className="bi bi-house-fill me-2"></i>
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {!gameStarted ? (
                <div className="game-card text-center">
                  <i className="bi bi-dice-5-fill" style={{ fontSize: '80px', color: '#667eea' }}></i>
                  <h2 className="mt-4">Number Guessing Game</h2>
                  <p className="text-muted mb-4">
                    I'm thinking of a number between 1 and 100. Can you guess it?
                  </p>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={handleStartGame}
                    disabled={loading}
                  >
                    {loading ? 'Starting...' : 'Start New Game'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="game-card">
                    <h3 className="text-center mb-4">
                      <i className="bi bi-bullseye me-2"></i>
                      Guess the Number (1-100)
                    </h3>

                    {error && (
                      <div className="alert alert-danger">{error}</div>
                    )}

                    <div className="text-center mb-4">
                      <div className="badge bg-primary" style={{ fontSize: '18px', padding: '10px 20px' }}>
                        Attempts: {attempts}
                      </div>
                    </div>

                    <form onSubmit={handleGuess}>
                      <div className="mb-3">
                        <input
                          type="number"
                          className="form-control guess-input"
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          min="1"
                          max="100"
                          placeholder="Enter your guess"
                          disabled={loading}
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 btn-lg"
                        disabled={loading || !guess}
                      >
                        {loading ? 'Guessing...' : 'Submit Guess'}
                      </button>
                    </form>

                    {currentClues && (
                      <div className="mt-4">
                        <h5 className="mb-3">Clues:</h5>
                        <div className="text-center mb-3">
                          <span className={getClueClass('direction', currentClues.direction)}>
                            {currentClues.direction === 'higher' ? '📈 Higher' : '📉 Lower'}
                          </span>
                          <span className={getClueClass('temperature', currentClues.temperature)}>
                            {currentClues.temperature === 'hot' ? '🔥 Hot' : 
                             currentClues.temperature === 'warm' ? '☀️ Warm' : '❄️ Cold'}
                          </span>
                          <span className={getClueClass('parity', currentClues.parity)}>
                            {currentClues.parity === 'even' ? '🎲 Even' : '🎲 Odd'}
                          </span>
                          <span className="clue-badge" style={{ background: '#6c757d', color: 'white' }}>
                            📍 {currentClues.digit_range}
                          </span>
                        </div>
                        <div className="alert alert-info text-center">
                          {clueMessage}
                        </div>

                        <button 
                          className="btn btn-outline-primary w-100"
                          onClick={handleGetAIHint}
                          disabled={loading}
                        >
                          <i className="bi bi-lightbulb-fill me-2"></i>
                          Get AI Hint
                        </button>
                      </div>
                    )}

                    {aiHint && (
                      <div className="ai-hint-box">
                        <h6 className="mb-2">
                          <i className="bi bi-robot me-2"></i>
                          AI Assistant Says:
                        </h6>
                        <p className="mb-0">{aiHint}</p>
                      </div>
                    )}
                  </div>

                  {guesses.length > 0 && (
                    <div className="game-card mt-3">
                      <h5 className="mb-3">
                        <i className="bi bi-list-ul me-2"></i>
                        Previous Guesses
                      </h5>
                      {guesses.map((item, index) => (
                        <div key={index} className="guess-item">
                          <span className="guess-number">{item.guess}</span>
                          <div>
                            <span className={getClueClass('direction', item.clues.direction)}>
                              {item.clues.direction}
                            </span>
                            <span className={getClueClass('temperature', item.clues.temperature)}>
                              {item.clues.temperature}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;