import React from 'react';
// import './CardsOperac.css'; // Estilos personalizados

function CardsDashOperacional({ data }) {
  return (
    <div className="operac-cards">
      <div className="operac-card red">
        <div className="operac-card-icon">⬛</div>
        <div className="operac-card-title">Notas em Atraso</div>
        <div className="operac-card-value">{data.notasEmAtraso}</div>
        <div className="operac-card-desc">Requer ação imediata</div>
      </div>
      <div className="operac-card orange">
        <div className="operac-card-icon">⬛</div>
        <div className="operac-card-title">Risco de Atraso</div>
        <div className="operac-card-value">{data.riscoDeAtraso}</div>
        <div className="operac-card-desc">Monitorar próximas 2h</div>
      </div>
      <div className="operac-card blue">
        <div className="operac-card-icon">⬛</div>
        <div className="operac-card-title">Motoristas em Rota</div>
        <div className="operac-card-value">{data.motoristasEmRota}</div>
        <div className="operac-card-desc">De {data.totalMotoristas} ativos hoje</div>
      </div>
      <div className="operac-card green">
        <div className="operac-card-icon">⬛</div>
        <div className="operac-card-title">Entregas no Prazo</div>
        <div className="operac-card-value">{data.entregasNoPrazo}%</div>
        <div className="operac-card-desc">↑ {data.variacaoEntrega}% vs ontem</div>
      </div>
    </div>
  );
}

export default CardsDashOperacional;