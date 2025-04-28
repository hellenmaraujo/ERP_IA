import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../assets/styles/layout/_cards.css';

function Cards() {
  const { token } = useAuth();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch('http://127.0.0.1:8000/deliveries/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDeliveries(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Erro ao buscar entregas:', error))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="cards">Carregando...</div>;

  const total = deliveries.length;
  const emTransito = deliveries.filter(d => d.status === "em rota").length;
  const entregues = deliveries.filter(d => d.status === "entregue").length;
  const pendentes = deliveries.filter(d => d.status === "pendente").length;
  const taxaEntregaPrazo = total > 0 ? ((entregues / total) * 100).toFixed(1) + "%" : "0%";

  return (
    <div className="cards">
      <div className="card" style={{ borderColor: 'var(--warning-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Entregas em Trânsito</h3>
            <span className="card-icon">🚚</span>
          </div>
          <div className="card-body">
            <h2>{emTransito}</h2>
            <p className="card-variation">Atualizado em tempo real</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--success-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Taxa de Entrega no Prazo</h3>
            <span className="card-icon">⏱️</span>
          </div>
          <div className="card-body">
            <h2>{taxaEntregaPrazo}</h2>
            <p className="card-variation">Atualizado em tempo real</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--info-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Entregas Pendentes</h3>
            <span className="card-icon">📦</span>
          </div>
          <div className="card-body">
            <h2>{pendentes}</h2>
            <p className="card-variation">Atualizado em tempo real</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--danger-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Total de Entregas</h3>
            <span className="card-icon">📝</span>
          </div>
          <div className="card-body">
            <h2>{total}</h2>
            <p className="card-variation">Atualizado em tempo real</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;