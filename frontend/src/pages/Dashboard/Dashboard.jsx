import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import '../../assets/styles/pages/_dashboard.css';

import DashboardAdmin from './Dashboard_administrativo';
import DashboardOperacional from './Dashboard_operacional';
import DashboardMotorista from './Dashboard_motorista';

function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user.nome || !user.perfil) {
    return <div className="loading-message">Carregando...</div>;
  }

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="dashboard-main">
          <h2>Dashboard <strong>{user.perfil}</strong> - {user.nome}</h2>
          {user.perfil === 'administrativo' && <DashboardAdmin />}
          {user.perfil === 'operacional' && <DashboardOperacional />}
          {user.perfil === 'motorista' && <DashboardMotorista />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
