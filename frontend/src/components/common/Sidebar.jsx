import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/layout/_sidebar.css';
import Logo from '../../assets/images/logo.png'; 

function Sidebar() {
  // Estado para controlar se o sidebar está colapsado ou não
  const [collapsed, setCollapsed] = useState(localStorage.getItem('sidebarState') === 'collapsed');
  const perfil = localStorage.getItem('perfil'); // 'administrativo', 'operacional', 'motorista'

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

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
              <span>Principal</span>
            </Link>
          </li>
          <li>
            <Link to="/deliveries">
              <i className="menu-icon">🚚</i>
              <span>Entregas</span>
            </Link>
          </li>
          <li>
            <Link to="/abastecimento">
              <i className="menu-icon">⛽</i>
              <span>Abastecimento</span>
            </Link>
          </li>
          {perfil !== 'motorista' && (
            <li>
              <Link to="/upload">
                <i className="menu-icon">🗂️</i>
                <span>Processar NFs</span>
              </Link>
            </li>
          )}
          {perfil !== 'motorista' && (
            <li>
              <Link to="/roteirizacao">
                <i className="menu-icon">🧭</i>
                <span>Roteirização</span>
              </Link>
            </li>
          )}
        </ul>
        
        {perfil === 'administrativo' && (
          <>
            <div className="sidebar-separator"></div>
            <p className="sidebar-section">Gestão</p>
            <ul>
              <li>
                <Link to="/indicadores">
                  <i className="menu-icon">📈</i>
                  <span>Indicadores</span>
                </Link>
              </li>
              <li>
                <Link to="/relatorios">
                  <i className="menu-icon">📄</i>
                  <span>Relatórios</span>
                </Link>
              </li>
              <li>
                <Link to="/motoristas">
                  <i className="menu-icon">👨‍✈️</i>
                  <span>Motoristas</span>
                </Link>
              </li>
              <li>
                <Link to="/veiculos">
                  <i className="menu-icon">🚛</i>
                  <span>Veículos</span>
                </Link>
              </li>
            </ul>

            <div className="sidebar-separator"></div>
            <p className="sidebar-section">Sistema</p>
            <ul>
              <li>
                <Link to="/usuarios">
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
          </>
        )}
      </nav>
      
      <div className="sidebar-logout">
        <button className="btn-logout" onClick={handleLogout}>
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