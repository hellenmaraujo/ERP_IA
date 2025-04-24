import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
);

import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import '../../../assets/styles/layout/_charts.css';

function ChartsAdmin() {

  const volumeEntregas = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Entregas No Prazo',
        data: [120, 130, 100, 140, 170, 110, 90],
        borderColor: 'green',
        backgroundColor: 'green',
        tension: 0.4,
      },
      {
        label: 'Entregas Atrasadas',
        data: [10, 15, 12, 8, 20, 10, 5],
        borderColor: 'red',
        backgroundColor: 'red',
        tension: 0.4,
      },
      {
        label: 'Total Entregas',
        data: [130, 145, 112, 148, 190, 120, 95],
        borderColor: 'blue',
        backgroundColor: 'blue',
        tension: 0.4,
      },
    ],
  };

  const performanceMotoristas = {
    labels: ['João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa'],
    datasets: [
      {
        label: 'No Prazo',
        backgroundColor: 'green',
        data: [30, 25, 20, 28],
      },
      {
        label: 'Atrasadas',
        backgroundColor: 'red',
        data: [5, 2, 3, 1],
      },
    ],
  };

  const custoReceitaLucro = {
    labels: ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [
      {
        label: 'Receita',
        data: [1000, 1100, 1050, 1150, 1200, 1250],
        borderColor: 'green',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Custo Operacional',
        data: [800, 850, 820, 870, 900, 920],
        borderColor: 'red',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Lucro',
        data: [200, 250, 230, 280, 300, 330],
        borderColor: 'blue',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  const faturamentoFornecedor = {
    labels: ['Fornecedor A', 'Fornecedor B', 'Fornecedor C', 'Fornecedor D'],
    datasets: [
      {
        label: 'Faturamento',
        data: [40000, 30000, 20000, 10000],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
      },
    ],
  };

  const optionsComScales = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { 
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    },
  };

  const optionsSemScales = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Volume de Entregas</h3>
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Line
            data={volumeEntregas} 
            options={optionsComScales}
          />
        </div>
      </div>
      <div className="chart-card">
        <h3>Performance por Motorista</h3>
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Bar
            data={performanceMotoristas} 
            options={optionsComScales}
          />
        </div>
      </div>
      <div className="chart-card">
        <h3>Custo Operacional vs Receita vs Lucro</h3>
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Line
            data={custoReceitaLucro} 
            options={optionsComScales}
          />
        </div>
      </div>
      <div className="chart-card">
        <h3>Faturamento por Fornecedor</h3>
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Doughnut
            data={faturamentoFornecedor} 
            options={optionsSemScales}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartsAdmin;