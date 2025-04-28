import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/styles/layout/_header.css';

function Header() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">Dashboard</div>
        <div className="header-user">
          <div className="user-info">
            <div className="user-name">{user.nome || 'Usuário'}</div>
            <div className="user-role">{user.perfil || 'Perfil'}</div>
          </div>
          <div className="user-avatar">
            {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;