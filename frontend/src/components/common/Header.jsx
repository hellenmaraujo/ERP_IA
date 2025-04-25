import React from 'react';
import '../assets/styles/layout/_header.css';

function Header() {
  const user = {
    name: localStorage.getItem('usuario') || 'Usuário',
    role: localStorage.getItem('perfil') || 'Perfil',
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">Dashboard</div>
        <div className="header-user">
          <div className="user-info">
            <div className="user-name">{user?.name || 'Usuário'}</div>
            <div className="user-role">{user?.role || 'Perfil'}</div>
          </div>
          <div className="user-avatar">U</div>
        </div>
      </div>
    </header>
  );
}

export default Header;