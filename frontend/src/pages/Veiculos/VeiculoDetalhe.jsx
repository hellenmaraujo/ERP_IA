import PageLayout from '../../components/layout/PageLayout';
import '../../assets/styles/pages/_veiculo_detalhe.css';
import { useNavigate } from 'react-router-dom';

function VeiculoDetalhado() {
  const navigate = useNavigate();

  return (
    <PageLayout pageTitle="Detalhes do Veículo">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/veiculos')}>
          ← Voltar para Lista de Veículos
        </button>

        <div className="vehicle-header">
          <div className="vehicle-title">
            <div className="vehicle-icon">🚚</div>
            <div className="vehicle-name">
              <h2>Mercedes-Benz Atego</h2>
              <div className="vehicle-plate">Placa: ABC-1234</div>
            </div>
          </div>
          <div className="status-tag">Em rota</div>
        </div>

        <div className="alert-card warning">
          <div className="alert-icon warning">⚠️</div>
          <div className="alert-content">
            <div className="alert-title">Manutenção Urgente</div>
            <div className="alert-text">
              Sistema de freios requer verificação imediata - Agendar manutenção
            </div>
          </div>
        </div>

        <div className="alert-card">
          <div className="alert-icon">ℹ️</div>
          <div className="alert-content">
            <div className="alert-title">Revisão Programada</div>
            <div className="alert-text">
              Próxima revisão programada em 7 dias (07/05/2025)
            </div>
          </div>
        </div>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-value">125.780</div>
            <div className="stat-label">Quilometragem (km)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">380</div>
            <div className="stat-label">Autonomia (km)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">8,5</div>
            <div className="stat-label">Consumo (km/l)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">22/03/2025</div>
            <div className="stat-label">Última Revisão</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="main-content">
            <div className="tabs">
              <div className="tab active">Informações</div>
              <div className="tab">Manutenção</div>
              <div className="tab">Autonomia</div>
              <div className="tab">Histórico</div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Informações do Veículo</h3>
              </div>
              <div className="card-content">
                <div className="detail-row">
                  <div className="detail-label">Modelo:</div>
                  <div className="detail-value">Mercedes-Benz Atego 2426</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Ano:</div>
                  <div className="detail-value">2022</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Placa:</div>
                  <div className="detail-value">ABC-1234</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Chassi:</div>
                  <div className="detail-value">9BM958074NB123456</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">RENAVAM:</div>
                  <div className="detail-value">12345678901</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Capacidade:</div>
                  <div className="detail-value">14 toneladas</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Tipo:</div>
                  <div className="detail-value">Caminhão Baú</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Dimensões:</div>
                  <div className="detail-value">7,2 m x 2,5 m x 2,8 m (C x L x A)</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Documentação</h3>
              </div>
              <div className="card-content">
                <div className="detail-row">
                  <div className="detail-label">Licenciamento:</div>
                  <div className="detail-value">Válido até 31/12/2025</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">IPVA:</div>
                  <div className="detail-value">Pago em 15/03/2025</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Seguro:</div>
                  <div className="detail-value">Apólice #98765432 - Válido até 10/11/2025</div>
                </div>
                <div className="detail-row">
                  <div className="detail-label">Tacógrafo:</div>
                  <div className="detail-value">
                    Calibrado em 15/01/2025 - Válido até 15/01/2026
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}

export default VeiculoDetalhado;