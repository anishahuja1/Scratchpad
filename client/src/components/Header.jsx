import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-right">
        <div className="user-profile">
          <img src={user?.avatar || 'https://ui-avatars.com/api/?name=User'} alt="Profile" />
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role">Admin</span>
          </div>
          <button onClick={logout} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
