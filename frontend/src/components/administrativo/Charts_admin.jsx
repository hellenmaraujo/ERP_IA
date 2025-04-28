import React from 'react';
import { Line } from 'react-chartjs-2';
import '../../assets/styles/layout/_charts.css';

function ChartsAdmin() {
  const dummyData = {
    labels: ['Janeiro', 'Fevereiro', 'Março'],
    datasets: [
      {
        label: 'Entregas',
        data: [50, 75, 100],
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  const dummyOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Exemplo de Gráfico</h3>
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <Line data={dummyData} options={dummyOptions} />
        </div>
      </div>
    </div>
  );
}

export default ChartsAdmin;