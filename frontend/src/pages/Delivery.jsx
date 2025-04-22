import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../assets/styles/pages/_delivery.css';

const Delivery = () => {
    const [filtersVisible, setFiltersVisible] = useState(true);
    const [selectAll, setSelectAll] = useState(false);

    // Toggle filters visibility
    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    // Handle select all checkbox
    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        // In a real app, you would update all individual checkboxes here
    };

    // Clear filters
    const clearFilters = () => {
        // Reset all filter inputs - would need refs or controlled components
        const inputs = document.querySelectorAll('.filter-input');
        inputs.forEach(input => {
            if (input.type === 'text') {
                input.value = '';
            } else if (input.type === 'select-one') {
                input.selectedIndex = 0;
            } else if (input.type === 'date') {
                input.value = '';
            }
        });
    };

    return (
        <div className="delivery-container">
            <Sidebar />
            <div className="main-content">
                <Header title="Lista de Entregas" />
                
                {/* Filters Container */}
                <div className="filters-container">
                    <div className="filters-header">
                        <h2 className="filters-title">
                            <i className="fas fa-filter"></i>
                            Filtros de Pesquisa
                        </h2>
                        <button className="btn btn-secondary" onClick={toggleFilters}>
                            <i className={`fas ${filtersVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            {filtersVisible ? 'Recolher' : 'Expandir'}
                        </button>
                    </div>
                    
                    {filtersVisible && (
                        <>
                            <div className="filters-grid">
                                <div className="filter-group">
                                    <label className="filter-label">Número da Nota</label>
                                    <input type="text" className="filter-input" placeholder="Digite o número" />
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Destinatário</label>
                                    <input type="text" className="filter-input" placeholder="Nome do destinatário" />
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Estado</label>
                                    <select className="filter-input filter-select">
                                        <option value="">Todos</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PR">Paraná</option>
                                    </select>
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Cidade</label>
                                    <input type="text" className="filter-input" placeholder="Nome da cidade" />
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Status</label>
                                    <select className="filter-input filter-select">
                                        <option value="">Todos</option>
                                        <option value="pending">Pendente</option>
                                        <option value="in-route">Em rota</option>
                                        <option value="delivered">Entregue</option>
                                    </select>
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Data Inicial</label>
                                    <input type="date" className="filter-input" />
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Data Final</label>
                                    <input type="date" className="filter-input" />
                                </div>
                                
                                <div className="filter-group">
                                    <label className="filter-label">Motorista</label>
                                    <select className="filter-input filter-select">
                                        <option value="">Todos</option>
                                        <option value="1">João Silva</option>
                                        <option value="2">Maria Santos</option>
                                        <option value="3">Carlos Oliveira</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="filter-actions">
                                <button className="btn btn-primary">
                                    <i className="fas fa-search"></i>
                                    Pesquisar
                                </button>
                                <button className="btn btn-secondary" onClick={clearFilters}>
                                    <i className="fas fa-times"></i>
                                    Limpar Filtros
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Table Container */}
                <div className="table-container">
                    <div className="table-header">
                        <h2 className="table-title">
                            <i className="fas fa-clipboard-list"></i>
                            Resultados
                            <span style={{ color: 'var(--dark-gray)', fontSize: '14px', fontWeight: 'normal' }}>
                                (47 registros encontrados)
                            </span>
                        </h2>
                        
                        <div className="table-actions">
                            <button className="btn btn-success">
                                <i className="fas fa-file-excel"></i>
                                Exportar Excel
                            </button>
                            <button className="btn btn-primary">
                                <i className="fas fa-print"></i>
                                Imprimir
                            </button>
                        </div>
                    </div>
                    
                    <div className="table-responsive">
                        <table className="deliveries-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="checkbox-container">
                                            <input 
                                                type="checkbox" 
                                                className="custom-checkbox" 
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </div>
                                    </th>
                                    <th>Número Nota</th>
                                    <th>Destinatário</th>
                                    <th>Endereço</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th>Status</th>
                                    <th>Criado em</th>
                                    <th>Motorista</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" className="custom-checkbox" />
                                    </td>
                                    <td>000047301</td>
                                    <td>KAWAMUKA COMERCIO DE EMBALAGENS LTDA-ME</td>
                                    <td>Rua São João, 123</td>
                                    <td>São Paulo</td>
                                    <td>SP</td>
                                    <td><span className="status-badge status-pending">Pendente</span></td>
                                    <td>21/04/2025</td>
                                    <td>Não atribuído</td>
                                    <td>
                                        <button className="action-button" title="Visualizar">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-button" title="Editar">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-button" title="Atribuir motorista">
                                            <i className="fas fa-user-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" className="custom-checkbox" />
                                    </td>
                                    <td>000047302</td>
                                    <td>SUPERMERCADO EXTRA</td>
                                    <td>Av. Paulista, 1000</td>
                                    <td>São Paulo</td>
                                    <td>SP</td>
                                    <td><span className="status-badge status-in-route">Em rota</span></td>
                                    <td>20/04/2025</td>
                                    <td>João Silva</td>
                                    <td>
                                        <button className="action-button" title="Visualizar">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-button" title="Editar">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-button" title="Rastrear">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" className="custom-checkbox" />
                                    </td>
                                    <td>000047303</td>
                                    <td>FARMÁCIA SAÚDE</td>
                                    <td>Rua Augusta, 456</td>
                                    <td>São Paulo</td>
                                    <td>SP</td>
                                    <td><span className="status-badge status-delivered">Entregue</span></td>
                                    <td>19/04/2025</td>
                                    <td>Maria Santos</td>
                                    <td>
                                        <button className="action-button" title="Visualizar">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-button" title="Comprovante">
                                            <i className="fas fa-file-alt"></i>
                                        </button>
                                        <button className="action-button" title="Histórico">
                                            <i className="fas fa-history"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" className="custom-checkbox" />
                                    </td>
                                    <td>000047304</td>
                                    <td>LOJA DE MÓVEIS CASA NOVA</td>
                                    <td>Av. Brigadeiro, 750</td>
                                    <td>São Paulo</td>
                                    <td>SP</td>
                                    <td><span className="status-badge status-pending">Pendente</span></td>
                                    <td>21/04/2025</td>
                                    <td>Não atribuído</td>
                                    <td>
                                        <button className="action-button" title="Visualizar">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-button" title="Editar">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-button" title="Atribuir motorista">
                                            <i className="fas fa-user-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" className="custom-checkbox" />
                                    </td>
                                    <td>000047305</td>
                                    <td>HOTEL CENTRAL</td>
                                    <td>Rua XV de Novembro, 89</td>
                                    <td>Curitiba</td>
                                    <td>PR</td>
                                    <td><span className="status-badge status-in-route">Em rota</span></td>
                                    <td>21/04/2025</td>
                                    <td>Carlos Oliveira</td>
                                    <td>
                                        <button className="action-button" title="Visualizar">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="action-button" title="Editar">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="action-button" title="Rastrear">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="pagination">
                        <div className="pagination-info">
                            Mostrando 1-5 de 47 registros
                        </div>
                        <div className="pagination-controls">
                            <button className="pagination-btn" disabled>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="pagination-btn active">1</button>
                            <button className="pagination-btn">2</button>
                            <button className="pagination-btn">3</button>
                            <button className="pagination-btn">...</button>
                            <button className="pagination-btn">10</button>
                            <button className="pagination-btn">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delivery;