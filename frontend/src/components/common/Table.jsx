import React from 'react';
import '../../assets/styles/layout/_table.css';

function Table() {
  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="section-title">
          <span className="icon-square" /> Notas em Rota Hoje
        </h2>
        <div className="table-actions">
          <button className="button-filter">Atualizar</button>
          <button className="button-filter">Exportar</button>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="deliveries-table">
          <thead>
            <tr>
              {['Nota #', 'Cliente', 'Endereço', 'Motorista', 'Previsão', 'Status', 'Ações'].map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Dados estáticos para exibição inicial */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;