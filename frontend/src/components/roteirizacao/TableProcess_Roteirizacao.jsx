import "../../assets/styles/layout/_cards.css";
import "../../assets/styles/layout/_table.css";

export default function TableProcessRoteirizacao({ notasFiscais = [] }) {
  return (
    <div className="card mt-4 mb-4">
      <div className="card-content">
        <h2 className="card-title mb-3">Notas Fiscais Processadas</h2>
        <table className="data-table table-criticas">
          <thead>
            <tr>
              <th>Nota</th>
              <th>Motorista</th>
              <th>Cliente</th>
              <th>Prazo</th>
              <th>Status</th>
              <th>Risco</th>
            </tr>
          </thead>
          <tbody>
            {notasFiscais.map((nf, index) => (
              <tr key={index}>
                <td>{nf.nota}</td>
                <td>{nf.motorista}</td>
                <td>{nf.cliente}</td>
                <td>{nf.prazo}</td>
                <td>{nf.status}</td>
                <td>{nf.risco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
