import React from 'react';
import { useNavigate } from 'react-router-dom';
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
          <li><span className="sidebar-icon">🏠</span> Dashboard</li>
          <li><span className="sidebar-icon">📦</span> Entregas</li>
          <li><span className="sidebar-icon">🗺️</span> Roteirização</li>
        </ul>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-title">Gestão</div>
        <ul className="sidebar-list">
          <li><span className="sidebar-icon">🚚</span> Motoristas</li>
          <li><span className="sidebar-icon">🚛</span> Frota</li>
          <li><span className="sidebar-icon">🏢</span> Depósitos</li>
        </ul>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-title">Sistema</div>
        <ul className="sidebar-list">
          <li><span className="sidebar-icon">📈</span> Relatórios</li>
          <li><span className="sidebar-icon">👥</span> Usuários</li>
          <li><span className="sidebar-icon">⚙️</span> Configurações</li>
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