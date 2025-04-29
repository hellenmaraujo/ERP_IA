import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import '../../assets/styles/layout/_header.css';


function Header() {
  const [nome, setNome] = useState('Usuário');
  const [perfil, setPerfil] = useState('Perfil');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setNome(parsed.nome || 'Usuário');
        setPerfil(parsed.perfil || 'Perfil');
      } catch (err) {
        console.error('Erro ao ler usuário:', err);
      }
    }
  }, []);

  const { user } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  
  // Determine page title based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Extract page name from path and capitalize first letter
    const pageName = path.split('/')[1] || 'dashboard';
    const formattedTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    
    setPageTitle(formattedTitle);
  }, [location]);
  
  // Check if sidebar is collapsed
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarState = localStorage.getItem('sidebarCollapsed');
      setSidebarCollapsed(sidebarState === 'true');
    };
    
    // Initial check
    checkSidebarState();
    
    // Setup event listener for sidebar state changes
    window.addEventListener('storage', checkSidebarState);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', checkSidebarState);
    };
  }, []);

  return (
    <header className={`header ${sidebarCollapsed ? 'header-expanded' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">{pageTitle}</h1>
        </div>
        
        <div className="header-right">
          <div className="user-section">
            <div className="user-info">
              <div className="user-name">{nome || 'Usuário'}</div>
              <div className="user-role">{perfil || 'Perfil'}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;