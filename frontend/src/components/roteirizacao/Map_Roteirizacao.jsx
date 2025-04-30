function MapRoteirizacao({ pontos = [] }) {
  if (pontos.length === 0) return <p className="text-muted">Nenhum ponto de parada disponível.</p>;

  const centro = pontos[0];
  const polyline = pontos.map(p => [p.lat, p.lng]);

  return (
    <div className="map-container">
      <p>Mapa interativo renderizado aqui (simulação)</p>
      {/* Em produção, incluir componente de mapa real como Leaflet ou Google Maps */}
    </div>
  );
}

export default MapRoteirizacao;