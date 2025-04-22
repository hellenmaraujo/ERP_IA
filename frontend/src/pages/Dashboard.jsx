import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// auxiliares
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Map from '../components/Dashboard/Map';

// admin
import CardsAdmin from '../components/Dashboard/admin/Cards_admin';
import CardsRecAdmin from '../components/Dashboard/admin/CardsRec_admin';
import ChartsAdmin from '../components/Dashboard/admin/Charts_admin';
import TableMotoristaAdmin from '../components/Dashboard/admin/TableMot_admin';
import TableFornecedorAdmin from '../components/Dashboard/admin/TableForn_admin';

// operacional
import CardsOperac from '../components/Dashboard/operac/CardsOperac';
import TableOperac from '../components/Dashboard/operac/TableOperac';

// motorista
import CardsMot from '../components/Dashboard/mot/CardsMot';
import TableMot from '../components/Dashboard/mot/TableMot';

// css
import '../assets/styles/pages/_dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userPerfil = localStorage.getItem('perfil');
    if (!token) {
      alert('Você precisa estar logado para acessar esta página.');
      navigate('/');
    }
    setPerfil(userPerfil);
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="dashboard-main">
          {perfil === 'administrativo' && (
            <>
              <CardsAdmin />
              <ChartsAdmin />
              <CardsRecAdmin />
              <TableMotoristaAdmin />
              <TableFornecedorAdmin />
            </>
          )}
          {perfil === 'operacional' && (
            <>
              <CardsOperac />
              <div className="dashboard-container">
                <Map />
                <TableOperac />
              </div>
            </>
          )}
          {perfil === 'motorista' && (
            <>
              <CardsMot />
              <div className="dashboard-container">
                <Map />
                <TableMot />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
