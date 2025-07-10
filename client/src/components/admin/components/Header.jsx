// src/components/Header.jsx
import React from 'react';
import '../styles/main.css';

const Header = ({ onLogout }) => {
  return (
    <div className="header-bar">
      <div className="user-info">
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
