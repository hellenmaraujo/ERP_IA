import React from 'react';
import '../../../assets/styles/layout/_cards.css';

function CardsDashOperac() {
  const cards = [
    { titulo: 'Notas em Atraso', valor: 15, descricao: 'Requer ação imediata', cor: 'red' },
    { titulo: 'Risco de Atraso', valor: 8, descricao: 'Monitorar próximas 2h', cor: 'yellow' },
    { titulo: 'Motoristas em Rota', valor: 24, descricao: 'De 30 ativos hoje', cor: 'blue' },
    { titulo: 'Entregas no Prazo', valor: '85%', descricao: '↑ 3% vs ontem', cor: 'green' }
  ];

  return (
    <div className="cards-operacionais">
      {cards.map((card, index) => (
        <div key={index} className={`card ${card.cor}`}>
          <h3>{card.titulo}</h3>
          <h2>{card.valor}</h2>
          <p>{card.descricao}</p>
        </div>
      ))}
    </div>
  );
}

export default CardsDashOperac;
