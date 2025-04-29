import React from 'react';
import '../../../assets/styles/layout/_table.css';

function TableDashMotorista() {
  return (
    <div className="table-container table-criticas">
      <h2>Minhas Entregas</h2>
      <table className="data-table table-criticas">
        <thead>
          <tr>
            <th>Nota</th>
            <th>Cliente</th>
            <th>Endereço</th>
            <th>Prazo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NF-12345</td>
            <td>Empresa ABC</td>
            <td>Rua das Flores, 123</td>
            <td>14:00</td>
            <td><span className="status-label atrasado">Atrasado</span></td>
            <td><button className="btn-small">Iniciar Entrega</button></td>
          </tr>
          <tr>
            <td>NF-12346</td>
            <td>Empresa XYZ</td>
            <td>Av. Principal, 456</td>
            <td>15:30</td>
            <td><span className="status-label em-rota">Em Rota</span></td>
            <td><button className="btn-small">Ver Rota</button></td>
          </tr>
          <tr>
            <td>NF-12344</td>
            <td>Cliente ABC</td>
            <td>Rua do Comércio, 789</td>
            <td>13:00</td>
            <td><span className="status-label entregue">Entregue</span></td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableDashMotorista;
