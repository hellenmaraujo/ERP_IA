import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para acessar esta página.');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#004a8d'
    }}>
      Bem-vindo ao Dashboard!
      <button 
        onClick={handleLogout} 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
