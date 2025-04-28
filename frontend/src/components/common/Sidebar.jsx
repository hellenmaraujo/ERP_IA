import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/styles/layout/_sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '➡️' : '⬅️'}
      </button>

      <div className="sidebar-section">
        <div className="sidebar-title">Principal</div>
        <ul className="sidebar-list">
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <span className="sidebar-icon">🏠</span> Dashboard
            </Link>
          </li>
          {(user.perfil === 'operacional' || user.perfil === 'administrativo') && (
            <li>
              <Link to="/roteirizacao" className="sidebar-link">
                <span className="sidebar-icon">🗺️</span> Roteirização
              </Link>
            </li>
          )}
          {(user.perfil === 'operacional' || user.perfil === 'administrativo') && (
            <li>
              <Link to="/upload" className="sidebar-link">
                <span className="sidebar-icon">📤</span> Uploads
              </Link>
            </li>
          )}
          {(user.perfil === 'motorista' || user.perfil === 'operacional' || user.perfil === 'administrativo') && (
            <li>
              <Link to="/entregas" className="sidebar-link">
                <span className="sidebar-icon">📦</span> Entregas
              </Link>
            </li>
          )}
        </ul>
      </div>

      <hr className="sidebar-divider" />

      {(user.perfil === 'operacional' || user.perfil === 'administrativo') && (
        <div className="sidebar-section">
          <div className="sidebar-title">Gestão</div>
          <ul className="sidebar-list">
            {user.perfil === 'administrativo' && (
              <li>
                <Link to="/motoristas" className="sidebar-link">
                  <span className="sidebar-icon">🚚</span> Motoristas
                </Link>
              </li>
            )}
            <li>
              <Link to="/veiculos" className="sidebar-link">
                <span className="sidebar-icon">🚛</span> Veículos
              </Link>
            </li>
          </ul>
        </div>
      )}

      <hr className="sidebar-divider" />

      {user.perfil === 'administrativo' && (
        <div className="sidebar-section">
          <div className="sidebar-title">Sistema</div>
          <ul className="sidebar-list">
            <li>
              <Link to="/usuarios" className="sidebar-link">
                <span className="sidebar-icon">👥</span> Usuários
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="sidebar-footer">
        <ul className="sidebar-list">
          <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
            <span className="sidebar-icon">🚪</span> Sair
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;