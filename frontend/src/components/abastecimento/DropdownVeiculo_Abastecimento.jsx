export default function DropdownVeiculoAbastecimento({ veiculos = [], value, onChange }) {
  return (
    <div className="form-group">
      <label>Veículo</label>
      <select className="form-control" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione um veículo</option>
        {veiculos.map((v, i) => (
          <option key={i} value={v.id}>
            {v.placa} - {v.modelo} ({v.motorista})
          </option>
        ))}
      </select>
    </div>
  );
}
