import React from 'react';

function CardsDashOperacional({ data }) {
  const dados = data || {
    notasEmAtraso: 5,
    riscoDeAtraso: 8,
    motoristasEmRota: 12,
    totalMotoristas: 15,
    entregasNoPrazo: 90,
    variacaoEntrega: 5,
  };

  return (
    <div className="operac-cards">
      <div className="operac-card red">
        <div className="operac-card-title">Notas em Atraso</div>
        <div className="operac-card-value">{dados.notasEmAtraso}</div>
      </div>
      <div className="operac-card orange">
        <div className="operac-card-title">Risco de Atraso</div>
        <div className="operac-card-value">{dados.riscoDeAtraso}</div>
      </div>
      <div className="operac-card blue">
        <div className="operac-card-title">Motoristas em Rota</div>
        <div className="operac-card-value">{dados.motoristasEmRota}</div>
      </div>
      <div className="operac-card green">
        <div className="operac-card-title">Entregas no Prazo</div>
        <div className="operac-card-value">{dados.entregasNoPrazo}%</div>
      </div>
    </div>
  );
}

export default CardsDashOperacional;