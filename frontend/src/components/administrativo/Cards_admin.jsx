import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth'; 
// import '../../assets/styles/layout/_cards.css';

function CardsAdmin() {
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
        if (Array.isArray(data)) {
          setDeliveries(data);
        } else {
          setDeliveries([]);
        }
      })
      .catch(error => console.error('Erro ao buscar entregas:', error))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="cards-grid">Carregando cards...</div>;
  if (deliveries.length === 0) return <div className="cards-grid">Nenhuma entrega encontrada</div>;

  const totalEntregas = deliveries.length;
  const faturamento = deliveries.reduce((sum, entrega) => sum + (entrega.valor_total_nota || 0), 0);
  const custo = faturamento ? faturamento * 0.2 : 0;
  const atrasadas = deliveries.filter(d => d.status === "atrasado").length;
  const indiceAtraso = totalEntregas > 0 ? ((atrasadas / totalEntregas) * 100).toFixed(1) + "%" : "0%";

  return (
    <div className="cards-grid">
      <div className="card card-success">
        <div className="card-content">
          <div className="card-header">
            <span className="card-icon">💰</span>
            <h3>Faturamento</h3>
          </div>
          <p className="card-value">R$ {faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="card card-info">
        <div className="card-content">
          <div className="card-header">
            <span className="card-icon">💸</span>
            <h3>Custo</h3>
          </div>
          <p className="card-value">R$ {custo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="card card-primary">
        <div className="card-content">
          <div className="card-header">
            <span className="card-icon">📦</span>
            <h3>Quantidade de Entregas</h3>
          </div>
          <p className="card-value">{totalEntregas}</p>
        </div>
      </div>

      <div className="card card-warning">
        <div className="card-content">
          <div className="card-header">
            <span className="card-icon">⚡</span>
            <h3>Índice de Atraso</h3>
          </div>
          <p className="card-value">{indiceAtraso}</p>
        </div>
      </div>
    </div>
  );
}

export default CardsAdmin;