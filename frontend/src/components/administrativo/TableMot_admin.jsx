import React from 'react';
import '../../../assets/styles/layout/_table.css';

function TableMotoristaAdmin() {
  const motoristas = [
    { nome: 'João Silva', realizadas: 245, naoRealizadas: 5, freteTotal: 85400, custo: 17000 },
    { nome: 'Maria Santos', realizadas: 198, naoRealizadas: 3, freteTotal: 68900, custo: 13700 },
    { nome: 'Carlos Oliveira', realizadas: 176, naoRealizadas: 4, freteTotal: 72300, custo: 14460 },
    { nome: 'Ana Rodrigues', realizadas: 165, naoRealizadas: 6, freteTotal: 56700, custo: 11340 },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="section-title">Performance dos Motoristas</h2>
      </div>
      <div className="table-wrapper">
        <table className="deliveries-table">
          <thead>
            <tr>
              <th>Motorista</th>
              <th>Entregas Realizadas</th>
              <th>Entregas Não Realizadas</th>
              <th>Frete Total</th>
              <th>Custo</th>
            </tr>
          </thead>
          <tbody>
            {motoristas.map((item) => (
              <tr key={item.nome}>
                <td>{item.nome}</td>
                <td>{item.realizadas}</td>
                <td>{item.naoRealizadas}</td>
                <td>R$ {item.freteTotal.toLocaleString('pt-BR')}</td>
                <td>R$ {item.custo.toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableMotoristaAdmin;