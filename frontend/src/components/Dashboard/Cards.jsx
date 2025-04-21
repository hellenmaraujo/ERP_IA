import React from 'react';
import '../../assets/styles/layout/_cards.css';

function Cards() {
  const cards = [
    { title: 'Entregas em Trânsito', value: '78', icon: '🚚', borderColor: 'var(--warning-color)', variation: '+12% em relação a ontem' },
    { title: 'Taxa de Entrega no Prazo', value: '94.6%', icon: '⏱️', borderColor: 'var(--success-color)', variation: '+1.2% em relação à semana anterior' },
    { title: 'Utilização da Frota', value: '87%', icon: '🛻', borderColor: 'var(--info-color)', variation: 'Similar à semana anterior' },
    { title: 'Tempo Médio de Entrega', value: '42 min', icon: '🕒', borderColor: 'var(--danger-color)', variation: '-5 min em relação ao mês anterior' }
  ];

  return (
    <div className="cards">
      {cards.map((card) => (
        <div key={card.title} className="card" style={{ borderColor: card.borderColor }}>
          <div className="card-content">
            <div className="card-header">
              <h3>{card.title}</h3>
              <span className="card-icon">{card.icon}</span>
            </div>
            <div className="card-body">
              <h2>{card.value}</h2>
              <p className="card-variation">{card.variation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;