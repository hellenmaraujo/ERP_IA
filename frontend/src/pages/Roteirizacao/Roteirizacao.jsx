import { useState } from "react";
import PageLayout from '../../components/layout/PageLayout';
import TableProcessRoteirizacao from "../../components/roteirizacao/TableProcess_Roteirizacao";
import TableRotesRoteirizacao from "../../components/roteirizacao/TableRotes_Roteirizacao";
import TableDetailRoteirizacao from "../../components/roteirizacao/TableDetail_Roteirizacao";

function Roteirizacao() {
  const [rotaSelecionada, setRotaSelecionada] = useState(null);

  const handleSelecionarRota = (rota) => {
    setRotaSelecionada(rota);
  };

  return (
    <PageLayout pageTitle="Roteirizacao">
      <TableProcessRoteirizacao />
      <div className="text-right mt-2 mb-4">
        <button
          className="btn btn-primary"
          onClick={() =>
            setRotaSelecionada({
              id: 1,
              destino: "Zona Leste",
              quantidade: 2,
              veiculo: "VUC-01",
              motorista: "João Silva"
            })
          }
        >
          Roteirizar
        </button>
      </div>
      <TableRotesRoteirizacao onSelecionarRota={handleSelecionarRota} />
      {rotaSelecionada && (
        <TableDetailRoteirizacao rotaSelecionada={rotaSelecionada} />
      )}
    </PageLayout>
  );
}

export default Roteirizacao;