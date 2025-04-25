import React from 'react';
import '../../assets/styles/layout/_table.css';

function TableFornecedorAdmin() {
  const fornecedores = [
    { nome: 'Fornecedor A', realizadas: 120, atrasadas: 5, faturamento: 40000, custo: 8000 },
    { nome: 'Fornecedor B', realizadas: 90, atrasadas: 8, faturamento: 30000, custo: 6000 },
    { nome: 'Fornecedor C', realizadas: 70, atrasadas: 4, faturamento: 20000, custo: 4000 },
    { nome: 'Fornecedor D', realizadas: 40, atrasadas: 2, faturamento: 10000, custo: 2000 },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="section-title">Performance dos Fornecedores</h2>
      </div>
      <div className="table-wrapper">
        <table className="deliveries-table">
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Entregas Realizadas</th>
              <th>Entregas Atrasadas</th>
              <th>Faturamento</th>
              <th>Custo</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((item) => (
              <tr key={item.nome}>
                <td>{item.nome}</td>
                <td>{item.realizadas}</td>
                <td>{item.atrasadas}</td>
                <td>R$ {item.faturamento.toLocaleString('pt-BR')}</td>
                <td>R$ {item.custo.toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableFornecedorAdmin;