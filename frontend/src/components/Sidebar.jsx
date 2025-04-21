import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/styles/layout/_sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-section">
        <div className="sidebar-title">Principal</div>
        <ul className="sidebar-list">
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <span className="sidebar-icon">🏠</span> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/entregas" className="sidebar-link">
              <span className="sidebar-icon">📦</span> Entregas
            </Link>
          </li>
          <li>
            <Link to="/roteirizacao" className="sidebar-link">
              <span className="sidebar-icon">🗺️</span> Roteirização
            </Link>
          </li>
          <li>
            <Link to="/uploads" className="sidebar-link">
              <span className="sidebar-icon">📤</span> Uploads
            </Link>
          </li>
        </ul>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-title">Gestão</div>
        <ul className="sidebar-list">
          <li>
            <Link to="/motoristas" className="sidebar-link">
              <span className="sidebar-icon">🚚</span> Motoristas
            </Link>
          </li>
          <li>
            <Link to="/frota" className="sidebar-link">
              <span className="sidebar-icon">🚛</span> Frota
            </Link>
          </li>
          <li>
            <Link to="/depositos" className="sidebar-link">
              <span className="sidebar-icon">🏢</span> Depósitos
            </Link>
          </li>
        </ul>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-title">Sistema</div>
        <ul className="sidebar-list">
          <li>
            <Link to="/relatorios" className="sidebar-link">
              <span className="sidebar-icon">📈</span> Relatórios
            </Link>
          </li>
          <li>
            <Link to="/usuarios" className="sidebar-link">
              <span className="sidebar-icon">👥</span> Usuários
            </Link>
          </li>
          <li>
            <Link to="/configuracoes" className="sidebar-link">
              <span className="sidebar-icon">⚙️</span> Configurações
            </Link>
          </li>
        </ul>
      </div>

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