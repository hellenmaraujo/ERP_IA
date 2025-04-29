import React from 'react';
import '../../../assets/styles/layout/_cards.css';

function MotoristasDashOperac() {
  const motoristas = [
    { nome: 'João Silva', status: 'Em rota • Caminhão #123', atrasadas: 3, totalHoje: 12, prazo: '75%', tempo: '7h45' },
    { nome: 'Maria Santos', status: 'Em rota • Caminhão #456', atrasadas: 0, totalHoje: 8, prazo: '100%', tempo: '6h30' },
    { nome: 'Carlos Oliveira', status: 'Rota finalizada • Caminhão #789', atrasadas: 1, totalHoje: 15, prazo: '93%', tempo: '8h15' }
  ];

  return (
    <div className="motoristas-dash">
      {motoristas.map((motorista, index) => (
        <div key={index} className="card-motorista">
          <div className="motorista-header">
            <h3 className="motorista-nome">{motorista.nome}</h3>
            <p className="motorista-status">{motorista.status}</p>
          </div>
          <div className="motorista-stats-grid">
            <div className="motorista-stat">
              <strong>{motorista.atrasadas}</strong>
              <span>Atrasadas</span>
            </div>
            <div className="motorista-stat">
              <strong>{motorista.totalHoje}</strong>
              <span>Total hoje</span>
            </div>
            <div className="motorista-stat">
              <strong>{motorista.prazo}</strong>
              <span>No prazo</span>
            </div>
            <div className="motorista-stat">
              <strong>{motorista.tempo}</strong>
              <span>Em trabalho</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MotoristasDashOperac;
