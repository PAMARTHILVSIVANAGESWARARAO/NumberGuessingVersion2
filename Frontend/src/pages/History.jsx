import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getGameHistory } from '../api/game';

const History = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await getGameHistory(20);
      setGames(response.games);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="display-4" style={{ color: 'white' }}>
              <i className="bi bi-clock-history me-3"></i>
              Game History
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              Your past gaming sessions
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : games.length === 0 ? (
            <div className="game-card text-center">
              <i className="bi bi-inbox" style={{ fontSize: '60px', color: '#6c757d' }}></i>
              <h4 className="mt-3">No games played yet</h4>
              <p className="text-muted">Start playing to see your history here</p>
            </div>
          ) : (
            <div className="row">
              {games.map((game, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="history-card">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">
                        <i className="bi bi-trophy-fill text-warning me-2"></i>
                        Game #{games.length - index}
                      </h5>
                      <span className="badge bg-success" style={{ fontSize: '16px' }}>
                        {game.score} pts
                      </span>
                    </div>

                    <div className="mb-2">
                      <strong>Secret Number:</strong>
                      <span className="badge bg-primary ms-2" style={{ fontSize: '18px' }}>
                        {game.secret_number}
                      </span>
                    </div>

                    <div className="mb-2">
                      <strong>Attempts:</strong>
                      <span className="ms-2">{game.attempts}</span>
                    </div>

                    <div className="mb-2">
                      <strong>Started:</strong>
                      <div className="text-muted small">
                        {formatDate(game.start_time)}
                      </div>
                    </div>

                    <div>
                      <strong>Completed:</strong>
                      <div className="text-muted small">
                        {formatDate(game.end_time)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;