import React from 'react';
// import '../../assets/styles/layout/_cards.css';

function CardsDashMotorista() {
  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-icon red"></div>
        <div className="card-content">
          <h3>Minhas Entregas Atrasadas</h3>
          <h1>3</h1>
          <p>Requer ação imediata</p>
        </div>
      </div>

      <div className="card">
        <div className="card-icon blue"></div>
        <div className="card-content">
          <h3>Entregas Pendentes</h3>
          <h1>5</h1>
          <p>De 12 total hoje</p>
        </div>
      </div>

      <div className="card">
        <div className="card-icon green"></div>
        <div className="card-content">
          <h3>Entregas Realizadas</h3>
          <h1>7</h1>
          <p>58% concluído</p>
        </div>
      </div>

      <div className="card">
        <div className="card-icon yellow"></div>
        <div className="card-content">
          <h3>Próxima Entrega</h3>
          <h1>15:30</h1>
          <p>Empresa XYZ</p>
        </div>
      </div>
    </div>
  );
}

export default CardsDashMotorista;
