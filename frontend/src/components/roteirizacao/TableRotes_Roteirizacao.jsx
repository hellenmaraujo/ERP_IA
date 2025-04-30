import { useState } from "react";
import "../../assets/styles/layout/_cards.css";
import "../../assets/styles/layout/_table.css";

export default function TableRotesRoteirizacao({ rotas = [] }) {
  const [edicoes, setEdicoes] = useState({});

  const handleEdit = (id, campo, valor) => {
    setEdicoes(prev => ({
      ...prev,
      [id]: { ...prev[id], [campo]: valor }
    }));
  };

  return (
    <div className="card mt-4 mb-4">
      <div className="card-content">
        <h2 className="card-title mb-3">Rotas Geradas</h2>
        <table className="data-table table-criticas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destino</th>
              <th>Qtd. NFs</th>
              <th>Veículo</th>
              <th>Motorista</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rotas.map((rota, index) => (
              <tr key={index}>
                <td>{rota.id}</td>
                <td>{rota.destino}</td>
                <td>{rota.quantidade}</td>
                <td>{rota.veiculo}</td>
                <td>
                  <input
                    type="text"
                    value={edicoes[rota.id]?.motorista || ""}
                    onChange={(e) => handleEdit(rota.id, "motorista", e.target.value)}
                    placeholder="Nome do motorista"
                  />
                </td>
                <td>
                  <button className="btn secondary">Editar</button>
                  <button className="btn primary" style={{ marginLeft: "0.5rem" }}>Salvar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
