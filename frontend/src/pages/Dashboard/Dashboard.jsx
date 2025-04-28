import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../../components/common/Sidebar';
// import Header from '../../components/common/Header';
// import '../../assets/styles/pages/_dashboard.css';

// import DashboardAdmin from './Dashboard_administrativo';
// import DashboardOperacional from './Dashboard_operacional';
// import DashboardMotorista from './Dashboard_motorista';

function Dashboard() {
  const { user, token } = useAuth();

  if (!user || !user.nome || !user.perfil || !token) {
    return (
      <div className="loading-message" style={{ padding: "2rem", textAlign: "center" }}>
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        {/* <main className="dashboard-main">
          <h2>Dashboard <strong>{user.perfil}</strong> - {user.nome}</h2>
          {user.perfil === 'administrativo' && <DashboardAdmin />}
          {user.perfil === 'operacional' && <DashboardOperacional />}
          {user.perfil === 'motorista' && <DashboardMotorista />}
        </main> */}
      </div>
    </div>
  );
}

export default Dashboard;
