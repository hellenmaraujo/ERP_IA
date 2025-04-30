import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, MapPin, Phone, Mail, TrendingUp, User, Calendar } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../components/common/Alert';
import PageLayout from '../../components/layout/PageLayout';
import '../../assets/styles/pages/_motoristas.css';

function Motoristas() {
  const [searchTerm, setSearchTerm] = useState('');

  const motoristas = [
    {
      id: 1,
      nome: "João Silva",
      foto: "/api/placeholder/150/150",
      status: "Em rota",
      telefone: "(11) 99999-8888",
      email: "joao.silva@email.com",
      cnh: "12345678900",
      categoria: "D",
      vencimentoCNH: "2025-06-15",
      veiculo: "Caminhão #123",
      metricas: {
        entregasHoje: 12,
        entregasNoMes: 245,
        taxaSucesso: 98,
        tempoMedioEntrega: "45min"
      },
      alertas: [
        { tipo: "atraso", mensagem: "3 entregas atrasadas hoje" },
        { tipo: "cnh", mensagem: "CNH vence em 45 dias" }
      ]
    },
    {
      id: 2,
      nome: "Maria Santos",
      foto: "/api/placeholder/150/150",
      status: "Disponível",
      telefone: "(11) 97777-6666",
      email: "maria.santos@email.com",
      cnh: "98765432100",
      categoria: "D",
      vencimentoCNH: "2024-12-20",
      veiculo: "Van #456",
      metricas: {
        entregasHoje: 8,
        entregasNoMes: 180,
        taxaSucesso: 100,
        tempoMedioEntrega: "38min"
      },
      alertas: []
    }
  ];

  return (
    <PageLayout pageTitle="Motoristas">
      <div className="motoristas-container">
        <div className="header-motoristas">
          <h1>Gestão de Motoristas</h1>
          <button className="botao-novo-motorista">
            + Novo Motorista
          </button>
        </div>

        <div className="busca-motorista">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar motorista..."
              className="input-busca"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid-motoristas">
          {motoristas.map((motorista) => (
            <div key={motorista.id} className="card-motorista">
              <div>
                <div>
                  <div>
                    <img
                      src={motorista.foto}
                      alt={motorista.nome}
                    />
                    <div>
                      <h3>{motorista.nome}</h3>
                      <div>
                        <span className={motorista.status === 'Em rota' ? 'status-em-rota' : 'status-disponivel'}>
                          {motorista.status}
                        </span>
                        {motorista.veiculo && (
                          <span>
                            {motorista.veiculo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button>
                    •••
                  </button>
                </div>

                {motorista.alertas.length > 0 && (
                  <div>
                    {motorista.alertas.map((alerta, index) => (
                      <Alert key={index} variant={alerta.tipo === 'atraso' ? 'destructive' : 'warning'}>
                        <AlertTriangle />
                        <AlertTitle>{alerta.tipo === 'atraso' ? 'Atraso' : 'Aviso'}</AlertTitle>
                        <AlertDescription>{alerta.mensagem}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}

                <div>
                  <div>
                    <div>
                      <TrendingUp />
                      <span>Entregas Hoje</span>
                    </div>
                    <p>
                      {motorista.metricas.entregasHoje}
                    </p>
                  </div>
                  <div>
                    <div>
                      <CheckCircle />
                      <span>Taxa de Sucesso</span>
                    </div>
                    <p>
                      {motorista.metricas.taxaSucesso}%
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <Phone />
                    <span>{motorista.telefone}</span>
                  </div>
                  <div>
                    <Mail />
                    <span>{motorista.email}</span>
                  </div>
                  <div>
                    <User />
                    <span>CNH: {motorista.cnh} - Categoria {motorista.categoria}</span>
                  </div>
                  <div>
                    <Calendar />
                    <span>Vencimento CNH: {new Date(motorista.vencimentoCNH).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <button>
                    <MapPin />
                    Ver Rota
                  </button>
                  <button>
                    <Clock />
                    Histórico
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Motoristas;