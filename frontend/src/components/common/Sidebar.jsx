import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/layout/_sidebar.css';
import Logo from '../../assets/images/logo.png'; 

function Sidebar() {
  // Estado para controlar se o sidebar está colapsado ou não
  const [collapsed, setCollapsed] = useState(localStorage.getItem('sidebarState') === 'collapsed');

  // Efeito para persistir o estado no localStorage
  useEffect(() => {
    localStorage.setItem('sidebarState', collapsed ? 'collapsed' : 'expanded');
  }, [collapsed]);

  // Função para alternar o estado do sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <img src={Logo} alt="Logo SPMax" />
      </div>
      
      <nav className="sidebar-nav">
        <p className="sidebar-section">Principal</p>
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="menu-icon">🏠</i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/deliveries">
              <i className="menu-icon">🚚</i>
              <span>Entregas</span>
            </Link>
          </li>
        </ul>
        
        <div className="sidebar-separator"></div>
        
        <p className="sidebar-section">Gestão</p>
        <ul>
          <li>
            <Link to="/drivers">
              <i className="menu-icon">👨‍✈️</i>
              <span>Motoristas</span>
            </Link>
          </li>
          <li>
            <Link to="/vehicles">
              <i className="menu-icon">🚛</i>
              <span>Veículos</span>
            </Link>
          </li>
        </ul>
        
        <div className="sidebar-separator"></div>
        
        <p className="sidebar-section">Sistema</p>
        <ul>
          <li>
            <Link to="/users">
              <i className="menu-icon">👥</i>
              <span>Usuários</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i className="menu-icon">⚙️</i>
              <span>Configurações</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-logout">
        <button className="btn-logout">
          <i className="logout-icon">🚪</i>
          <span>Sair</span>
        </button>
      </div>
      
      {/* Botão para retrair/expandir o sidebar */}
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expandir sidebar" : "Retrair sidebar"}
      >
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  );
}

export default Sidebar;