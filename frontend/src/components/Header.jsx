import React from 'react';
import '../assets/styles/layout/_header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">Dashboard</div>
        <div className="header-user">
          <div className="user-info">
            <div className="user-name">Usuário</div>
            <div className="user-role">Administrativo</div>
          </div>
          <div className="user-avatar">U</div>
        </div>
      </div>
    </header>
  );
}

export default Header;