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
            {[
              { nota: 'NF-38429', cliente: 'Mercado ABC', endereco: 'Rua São João, 123', motorista: 'João Silva', previsao: '09:45', status: 'Entregue' },
              { nota: 'NF-38430', cliente: 'Farmácia Saúde', endereco: 'Av. Paulista, 1000', motorista: 'Maria Santos', previsao: '10:15', status: 'Em rota' },
              { nota: 'NF-38431', cliente: 'Supermercado Extra', endereco: 'Av. Brigadeiro, 750', motorista: 'Carlos Oliveira', previsao: '10:30', status: 'Em rota' },
              { nota: 'NF-38432', cliente: 'Hotel Central', endereco: 'Rua Augusta, 456', motorista: 'Ana Costa', previsao: '11:00', status: 'Atrasado' },
              { nota: 'NF-38433', cliente: 'Centro Empresarial', endereco: 'Av. Faria Lima, 3000', motorista: 'Roberto Dias', previsao: '11:30', status: 'Em rota' },
            ].map((item) => (
              <tr key={item.nota}>
                <td>{item.nota}</td>
                <td>{item.cliente}</td>
                <td>{item.endereco}</td>
                <td>{item.motorista}</td>
                <td>{item.previsao}</td>
                <td>
                  <span className={`status-badge ${item.status.replace(' ', '-').toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="button-details">Detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;