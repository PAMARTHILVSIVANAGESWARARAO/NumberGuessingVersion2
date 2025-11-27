import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getLeaderboard } from '../api/leaderboard';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await getLeaderboard();
      setPlayers(response.leaderboard);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-default';
  };

  const getMedalEmoji = (medal) => {
    if (medal === 'gold') return '🥇';
    if (medal === 'silver') return '🥈';
    if (medal === 'bronze') return '🥉';
    return '';
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4" style={{ color: 'white' }}>
              <i className="bi bi-trophy-fill me-3"></i>
              Leaderboard
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              Top players and their scores
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
          ) : players.length === 0 ? (
            <div className="game-card text-center">
              <i className="bi bi-inbox" style={{ fontSize: '60px', color: '#6c757d' }}></i>
              <h4 className="mt-3">No players yet</h4>
              <p className="text-muted">Be the first to play!</p>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                {players.map((player) => (
                  <div 
                    key={player.rank} 
                    className={`leaderboard-item ${player.username === currentUser.username ? 'border border-primary border-3' : ''}`}
                  >
                    <div className="d-flex align-items-center">
                      <div className={`rank-badge ${getRankClass(player.rank)} me-3`}>
                        {player.rank}
                      </div>
                      <div>
                        <h5 className="mb-0">
                          {player.username}
                          {player.username === currentUser.username && (
                            <span className="badge bg-primary ms-2">You</span>
                          )}
                        </h5>
                        <small className="text-muted">
                          {player.medal ? player.medal.charAt(0).toUpperCase() + player.medal.slice(1) + ' Medal' : 'No Medal'}
                        </small>
                      </div>
                    </div>
                    <div className="text-end">
                      <div style={{ fontSize: '14px', color: '#6c757d' }}>Score</div>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>
                        {player.total_score}
                      </div>
                      {player.medal && (
                        <div style={{ fontSize: '32px' }}>
                          {getMedalEmoji(player.medal)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;