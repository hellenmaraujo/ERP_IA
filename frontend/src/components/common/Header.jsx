import { useContext } from 'react';
import '../../assets/styles/layout/_header.css';
import { SidebarContext } from '../../contexts/SidebarContext'; // Você precisará criar este contexto

function Header({ pageTitle }) {
  // Acessando o contexto do sidebar para coordenar layout responsivo
  const { collapsed } = useContext(SidebarContext);

  return (
    <header className={`header ${collapsed ? 'header-expanded' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">{pageTitle || 'Dashboard'}</h1>
          <div className="header-breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-separator">›</span>
            <span>{pageTitle || 'Dashboard'}</span>
          </div>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <button className="action-button" aria-label="Notificações">
              <i className="notification-icon">🔔</i>
              <span className="notification-badge">3</span>
            </button>
            
            <button className="action-button" aria-label="Mensagens">
              <i className="message-icon">✉️</i>
            </button>
          </div>

          <div className="header-user">
            <div className="user-info">
              <span className="user-name">Usuário Admin</span>
              <span className="user-role">Administrador</span>
            </div>
            <div className="user-avatar">
              <img src="/avatar_placeholder.png" alt="Avatar do usuário" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;