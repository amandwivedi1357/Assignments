import React from 'react';
import UserProfile from './UserProfile';
import LoginMessage from './LoginMessage';

const UserDashboard = ({ 
  name, 
  bio,      
  email, 
  isLoggedIn, 
  onLogout,
  onLogin = () => {} 
}) => {
  return (
    <div className="user-dashboard">
      <LoginMessage isLoggedIn={isLoggedIn} />
      
      {isLoggedIn ? (
        <div>
          <UserProfile 
            name={name}
            email={email}
            bio={bio}
          />
          <div className="logout-section">
            <button 
              onClick={onLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="login-section">
          <p className="text-lg mb-4">You need to log in</p>
          <button  
            onClick={onLogin}
            className="login-button"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;