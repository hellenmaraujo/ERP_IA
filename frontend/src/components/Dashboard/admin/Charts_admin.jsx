import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import '../../../assets/styles/layout/_charts.css'; // Supondo que você crie depois um css para charts

function ChartsAdmin() {
  // Dados simulados
  const volumeEntregas = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Entregas No Prazo',
        data: [120, 130, 100, 140, 170, 110, 90],
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Entregas Atrasadas',
        data: [10, 15, 12, 8, 20, 10, 5],
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Total Entregas',
        data: [130, 145, 112, 148, 190, 120, 95],
        borderColor: 'blue',
        fill: false,
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
        fill: false,
      },
      {
        label: 'Custo Operacional',
        data: [800, 850, 820, 870, 900, 920],
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Lucro',
        data: [200, 250, 230, 280, 300, 330],
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const faturamentoFornecedor = {
    labels: ['Fornecedor A', 'Fornecedor B', 'Fornecedor C', 'Fornecedor D'],
    datasets: [
      {
        data: [40000, 30000, 20000, 10000],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Volume de Entregas</h3>
        <Line data={volumeEntregas} />
      </div>

      <div className="chart-card">
        <h3>Performance por Motorista</h3>
        <Bar data={performanceMotoristas} />
      </div>

      <div className="chart-card">
        <h3>Custo Operacional vs Receita vs Lucro</h3>
        <Line data={custoReceitaLucro} />
      </div>

      <div className="chart-card">
        <h3>Faturamento por Fornecedor</h3>
        <Doughnut data={faturamentoFornecedor} />
      </div>
    </div>
  );
}

export default ChartsAdmin;