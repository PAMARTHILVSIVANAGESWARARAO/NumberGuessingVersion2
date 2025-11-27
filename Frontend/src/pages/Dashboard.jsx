import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const getMedalIcon = (medal) => {
    if (medal === 'gold') return '🥇';
    if (medal === 'silver') return '🥈';
    if (medal === 'bronze') return '🥉';
    return '🎮';
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="container">
          <div className="welcome-card">
            <h1 className="welcome-title">
              Welcome back, {user.username}! 👋
            </h1>
            <p className="text-muted">Ready to test your guessing skills?</p>

            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">{user.total_score || 0}</div>
                <div className="stat-label">Total Score</div>
              </div>
              <div className="stat-item">
                <div className="medal-icon">{getMedalIcon(user.medal)}</div>
                <div className="stat-label">
                  {user.medal ? user.medal.toUpperCase() : 'No Medal Yet'}
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <i className="bi bi-controller" style={{ fontSize: '60px', color: '#667eea' }}></i>
                  <h3 className="mt-3">Play Game</h3>
                  <p className="text-muted">Start a new guessing challenge</p>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/game')}
                  >
                    Start Playing
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <i className="bi bi-trophy-fill" style={{ fontSize: '60px', color: '#ffd700' }}></i>
                  <h3 className="mt-3">Leaderboard</h3>
                  <p className="text-muted">See top players</p>
                  <button 
                    className="btn btn-warning btn-lg"
                    onClick={() => navigate('/leaderboard')}
                  >
                    View Rankings
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="card text-center p-4">
                <div className="card-body">
                  <i className="bi bi-clock-history" style={{ fontSize: '60px', color: '#764ba2' }}></i>
                  <h3 className="mt-3">Game History</h3>
                  <p className="text-muted">View your past games</p>
                  <button 
                    className="btn btn-secondary btn-lg"
                    onClick={() => navigate('/history')}
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;