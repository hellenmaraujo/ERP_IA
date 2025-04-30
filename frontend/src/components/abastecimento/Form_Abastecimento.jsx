import { useState } from "react";
import DropdownVeiculo from "./DropdownVeiculo_Abastecimento";
import ResumoVeiculo from "./ResumoVeiculo_Abastecimento";
import CombustivelSelector from "./CombustivelSelector_Abasrecimento";
import ModoSelector from "./ModoSelector_Abastecimento";

export default function FormAbastecimento() {
  const [veiculo, setVeiculo] = useState(null);
  const [combustivel, setCombustivel] = useState("");
  const [modo, setModo] = useState("valor");
  const [valor, setValor] = useState("");
  const [kmAtual, setKmAtual] = useState("");

  const opcoesCombustivel = [
    { tipo: "Gasolina", preco: 5.79 },
    { tipo: "Etanol", preco: 3.89 },
    { tipo: "Diesel", preco: 6.29 },
    { tipo: "Diesel S10", preco: 6.49 },
  ];

  return (
    <form className="card p-4">
      <h2>Registrar Abastecimento</h2>

      <DropdownVeiculo veiculos={[]} value={veiculo?.id || ""} onChange={(id) => setVeiculo({ id, placa: "ABC-1234", modelo: "Fiat Strada", motorista: "Carlos Silva", kmAtual: "45678" })} />
      <ResumoVeiculo veiculo={veiculo} />
      <CombustivelSelector opcoes={opcoesCombustivel} selecionado={combustivel} onChange={setCombustivel} />
      <ModoSelector modo={modo} onToggle={() => setModo((m) => (m === "valor" ? "litros" : "valor"))} />

      <div className="form-row">
        {modo === "valor" ? (
          <>
            <div className="form-group">
              <label>Valor (R$)</label>
              <input type="number" className="form-control" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Litros (calculado)</label>
              <input type="text" className="form-control" disabled placeholder="Calculado automaticamente" />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Litros</label>
              <input type="number" className="form-control" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Valor (calculado)</label>
              <input type="text" className="form-control" disabled placeholder="Calculado automaticamente" />
            </div>
          </>
        )}
      </div>

      <div className="form-group">
        <label>Quilometragem Atual</label>
        <input type="number" className="form-control" value={kmAtual} onChange={(e) => setKmAtual(e.target.value)} />
      </div>

      <button className="btn btn-primary mt-3">Registrar Abastecimento</button>
    </form>
  );
}
