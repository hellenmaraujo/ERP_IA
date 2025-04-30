import { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';

function Relatorios() {
  const [filtros, setFiltros] = useState({
    motorista: '',
    tipo: '',
    regiao: '',
    dataInicial: '',
    dataFinal: ''
  });

  const [relatorios, setRelatorios] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const exportarRelatorio = () => {
    const query = new URLSearchParams(filtros).toString();
    window.open(`/api/reports/export?${query}`, '_blank');
  };

  return (
    <PageLayout pageTitle="Relatórios">
      <div className="card mb-4">
        <div className="card-content">
          <h2 className="card-title">Filtros</h2>
          <div className="form-row">
            <input name="motorista" placeholder="Motorista" value={filtros.motorista} onChange={handleChange} />
            <input name="tipo" placeholder="Tipo de Entrega" value={filtros.tipo} onChange={handleChange} />
            <input name="regiao" placeholder="Região" value={filtros.regiao} onChange={handleChange} />
            <input type="date" name="dataInicial" value={filtros.dataInicial} onChange={handleChange} />
            <input type="date" name="dataFinal" value={filtros.dataFinal} onChange={handleChange} />
            <button className="btn btn-primary" onClick={exportarRelatorio}>Exportar Excel</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="card-title">Resultado</h2>
          {relatorios.length === 0 ? (
            <p>Nenhum resultado encontrado</p>
          ) : (
            <table className="data-table table-criticas">
              <thead>
                <tr>
                  <th>Nota</th>
                  <th>Motorista</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Região</th>
                </tr>
              </thead>
              <tbody>
                {relatorios.map((r, i) => (
                  <tr key={i}>
                    <td>{r.nota}</td>
                    <td>{r.motorista}</td>
                    <td>{r.cliente}</td>
                    <td>{r.data}</td>
                    <td>{r.tipo}</td>
                    <td>{r.status}</td>
                    <td>{r.regiao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Relatorios;