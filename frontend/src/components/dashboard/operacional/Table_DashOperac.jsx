import React from 'react';
import '../../../assets/styles/layout/_table.css';

function TableDashOperac() {
  const entregasCriticas = [
    { nota: 'NF-12345', motorista: 'João Silva', cliente: 'Empresa ABC', prazo: '14:00', status: 'Atrasado', risco: 'Alto' },
    { nota: 'NF-12346', motorista: 'João Silva', cliente: 'Empresa XYZ', prazo: '15:30', status: 'Em Rota', risco: 'Médio' },
    { nota: 'NF-12347', motorista: 'Maria Santos', cliente: 'Cliente 123', prazo: '16:00', status: 'Em Rota', risco: 'Baixo' }
  ];

  return (
    <div className="table-criticas table-container">
      <h2>Entregas Críticas</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nota</th>
              <th>Motorista</th>
              <th>Cliente</th>
              <th>Prazo</th>
              <th>Status</th>
              <th>Risco</th>
            </tr>
          </thead>
          <tbody>
            {entregasCriticas.map((entrega, index) => (
              <tr key={index}>
                <td>{entrega.nota}</td>
                <td>{entrega.motorista}</td>
                <td>{entrega.cliente}</td>
                <td>{entrega.prazo}</td>
                <td>{entrega.status}</td>
                <td>{entrega.risco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableDashOperac;
