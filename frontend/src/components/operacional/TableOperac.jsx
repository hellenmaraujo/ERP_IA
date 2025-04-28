import React from 'react';

function TableOperac() {
  return (
    <div className="table-operac">
      <table>
        <thead>
          <tr>
            <th>Nota</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Previsão</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NF-23456</td>
            <td>Restaurante Z</td>
            <td>Em rota</td>
            <td>14:00</td>
          </tr>
          <tr>
            <td>NF-98765</td>
            <td>Loja W</td>
            <td>Atrasado</td>
            <td>15:30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableOperac;
