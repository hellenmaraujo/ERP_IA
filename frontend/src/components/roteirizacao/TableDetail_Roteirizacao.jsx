import { useEffect, useState } from "react";
import MapRoteirizacao from "./Map_Roteirizacao";
import "../../assets/styles/layout/_cards.css";
import "../../assets/styles/layout/_table.css";

export default function TableDetailRoteirizacao({ rotaSelecionada }) {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    if (rotaSelecionada?.id) {
      setEntregas([
        {
          nf: "12345",
          destinatario: "João da Silva",
          endereco: "Rua A, 123 - Bairro X",
          prazo_entrega: "2025-05-10"
        },
        {
          nf: "67890",
          destinatario: "Maria Souza",
          endereco: "Rua B, 456 - Bairro Y",
          prazo_entrega: "2025-05-10"
        }
      ]);
    }
  }, [rotaSelecionada]);

  const pontos = entregas.map((entrega, index) => ({
    lat: -23.55 + index * 0.01,
    lng: -46.63 + index * 0.01,
    label: `${entrega.destinatario} - ${entrega.endereco}`
  }));

  if (!rotaSelecionada) return null;

  return (
    <div className="card mt-4 mb-4">
      <div className="card-content">
        <h2 className="card-title mb-3">Detalhes da Rota #{rotaSelecionada.id}</h2>
        <table className="data-table table-criticas">
          <thead>
            <tr>
              <th>NF</th>
              <th>Destinatário</th>
              <th>Endereço</th>
              <th>Prazo de Entrega</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map((entrega, i) => (
              <tr key={i}>
                <td>{entrega.nf}</td>
                <td>{entrega.destinatario}</td>
                <td>{entrega.endereco}</td>
                <td>{entrega.prazo_entrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MapRoteirizacao pontos={pontos} />
      </div>
    </div>
  );
}