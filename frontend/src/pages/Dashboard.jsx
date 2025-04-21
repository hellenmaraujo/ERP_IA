import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Cards from '../components/Dashboard/Cards';
import Map from '../components/Dashboard/Map';
import Table from '../components/Dashboard/Table';
import '../assets/styles/pages/_dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para acessar esta página.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="dashboard-main">
          <Cards />
          <div className="dashboard-container">
            <Map />
            <Table />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
