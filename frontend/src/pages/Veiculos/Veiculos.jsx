import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import '../../assets/styles/pages/_veiculos.css';

function Veiculos() {
  const navigate = useNavigate();

  return (
    <PageLayout pageTitle="Veículos">
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar veículo por modelo ou placa..." />
          <button className="btn btn-primary ml-3" onClick={() => navigate('/veiculos/novo')}>
            + Adicionar Novo Veículo
          </button>
          <button>Pesquisar</button>
        </div>

        <div className="vehicle-cards">
          <div className="vehicle-card">
            <div className="vehicle-header">
              <div className="vehicle-icon">🚚</div>
              <div className="vehicle-info">
                <h3 className="vehicle-model">Mercedes-Benz Atego</h3>
                <div className="vehicle-plate">Placa: ABC-1234</div>
                <div className="status-tags">
                  <span className="status-tag status-active">Em rota</span>
                </div>
              </div>
              <div className="more-options">⋮</div>
            </div>

            <div className="alert-section warning">
              <div className="alert-icon warning">⚠️</div>
              <div className="alert-text warning">Atraso<br />3 entregas atrasadas hoje</div>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-label">Entregas Hoje</div>
                <div className="stat-value">12</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Taxa de Sucesso</div>
                <div className="stat-value">98%</div>
              </div>
            </div>

            <div className="vehicle-details">
              <div className="detail-item">
                <div className="detail-label">Autonomia:</div>
                <div className="detail-value">
                  380 km restantes
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Óleo:</div>
                <div className="detail-value">
                  2.500 km para troca
                  <div className="progress-bar">
                    <div className="progress-fill warning" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Categoria:</div>
                <div className="detail-value">Caminhão #123</div>
              </div>
            </div>

            <div className="actions">
              <button className="action-btn primary" onClick={() => navigate('/veiculos/1')}>
                <span>📋</span> Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Veiculos;