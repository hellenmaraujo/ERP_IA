import React, { useState } from 'react';
import '../../assets/styles/layout/_map.css';

function Map() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="map">
      <div className="map-header">
        <h2 className="map-title">Rastreamento em Tempo Real</h2>
        <div className="map-filters">
          <button className="map-filter-button" onClick={toggleFilters}>
            Filtros
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="map-sidebar">
          <h3>Filtros</h3>
          <div className="filter-category">
            <label>Motoristas</label>
            <select>
              <option>Todos</option>
              <option>João Silva</option>
              <option>Maria Santos</option>
              <option>Carlos Oliveira</option>
            </select>
          </div>
          <div className="filter-category">
            <label>Rotas</label>
            <select>
              <option>Todos</option>
              <option>Notas Entregues</option>
              <option>Notas em Rota</option>
              <option>Notas Atrasadas</option>
            </select>
          </div>
          <div className="filter-category">
            <label>Fornecedor</label>
            <select>
              <option>Todos</option>
              <option>Fornecedor A</option>
              <option>Fornecedor B</option>
              <option>Fornecedor C</option>
            </select>
          </div>
        </div>
      )}

      <iframe
        title="Mapa"
        src="https://www.google.com/maps/embed?..."
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Map;