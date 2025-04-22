import React, { useState, useEffect } from 'react';
import '../../../assets/styles/layout/_cards.css';

function CardsAdmin() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://127.0.0.1:8000/deliveries/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDeliveries(Array.isArray(data) ? data : [data]);
      })
      .catch(error => console.error('Erro ao buscar entregas:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  const totalEntregas = deliveries.length;
  const faturamento = deliveries.reduce((sum, entrega) => sum + (entrega.valor_total_nota || 0), 0);
  const custo = faturamento * 0.2; // 20% do faturamento
  const atrasadas = deliveries.filter(d => d.status === "atrasado").length;
  const indiceAtraso = totalEntregas > 0 ? ((atrasadas / totalEntregas) * 100).toFixed(1) + "%" : "0%";

  return (
    <div className="cards">
      <div className="card" style={{ borderColor: 'var(--success-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Faturamento</h3>
            <span className="card-icon">💰</span>
          </div>
          <div className="card-body">
            <h2>R$ {faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--info-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Custo</h3>
            <span className="card-icon">💸</span>
          </div>
          <div className="card-body">
            <h2>R$ {custo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--primary-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Quantidade de Entregas</h3>
            <span className="card-icon">📦</span>
          </div>
          <div className="card-body">
            <h2>{totalEntregas}</h2>
          </div>
        </div>
      </div>

      <div className="card" style={{ borderColor: 'var(--warning-color)' }}>
        <div className="card-content">
          <div className="card-header">
            <h3>Índice de Atraso</h3>
            <span className="card-icon">⚡</span>
          </div>
          <div className="card-body">
            <h2>{indiceAtraso}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsAdmin;