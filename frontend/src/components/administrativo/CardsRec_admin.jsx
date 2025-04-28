import React from 'react';
import '../../assets/styles/layout/_cards.css';

function CardsRecAdmin() {
  const recomendacoes = [
    { tipo: 'positivo', titulo: 'Bom Trabalho', mensagem: 'Continue assim!', detalhe: 'Tudo dentro da meta.' }
  ];

  return (
    <div className="cards-recomendacoes">
      {recomendacoes.map((rec, index) => (
        <div key={index} className={`recommendation-card urgency-${rec.tipo}`}>
          <div className="card-content">
            <div className="card-info">
              <h3 className="recommendation-title">{rec.titulo}</h3>
              <p className="recommendation-message">{rec.mensagem}</p>
              <small className="recommendation-detail">{rec.detalhe}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsRecAdmin;