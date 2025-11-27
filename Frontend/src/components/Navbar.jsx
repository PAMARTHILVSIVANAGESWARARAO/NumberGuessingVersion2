import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          <i className="bi bi-dice-5-fill me-2"></i>
          Guess Game
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="bi bi-house-fill me-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game">
                <i className="bi bi-controller me-1"></i>
                Play
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                <i className="bi bi-clock-history me-1"></i>
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">
                <i className="bi bi-trophy-fill me-1"></i>
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <i className="bi bi-person-circle me-1"></i>
                {user.username}
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;