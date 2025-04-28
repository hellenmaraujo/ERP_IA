import React from 'react';

function TableMot() {
  return (
    <div className="table-mot">
      <table>
        <thead>
          <tr>
            <th>Nota</th>
            <th>Cliente</th>
            <th>Endereço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NF-12345</td>
            <td>Mercado X</td>
            <td>Rua das Flores, 123</td>
            <td>Entregue</td>
          </tr>
          <tr>
            <td>NF-67890</td>
            <td>Padaria Y</td>
            <td>Avenida Central, 45</td>
            <td>Em rota</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableMot;
