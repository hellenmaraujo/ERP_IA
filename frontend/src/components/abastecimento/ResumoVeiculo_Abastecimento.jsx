export default function ResumoVeiculoAbastecimento({ veiculo }) {
  if (!veiculo) return null;

  return (
    <div className="resumo-veiculo mb-3">
      <p><strong>Placa:</strong> {veiculo.placa}</p>
      <p><strong>Modelo:</strong> {veiculo.modelo}</p>
      <p><strong>Motorista:</strong> {veiculo.motorista}</p>
      <p><strong>KM Atual:</strong> {veiculo.kmAtual}</p>
    </div>
  );
}
