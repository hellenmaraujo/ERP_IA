# 🏛️ Arquitetura do Projeto ERP_Log

O ERP_Log é uma plataforma completa de gestão logística, desenvolvida com foco em modularidade, escalabilidade e facilidade de manutenção. Este documento descreve a visão técnica do sistema.

---

## 📚 Visão Geral

O projeto é composto por duas principais camadas:

- **Backend:** API REST desenvolvida em FastAPI, organizada de forma modular por domínios funcionais (Usuários, Entregas, Roteirização, etc.).
- **Frontend:** Aplicação React com Vite, responsável pela interface interativa e responsiva para diferentes perfis de usuários.

---

## 📦 Estrutura de Pastas

```
ERP_Log/
├── backend/
│   ├── erp_log/
│   │   ├── core/           # Configurações centrais: DB, autenticação e segurança
│   │   ├── config/         # Gerenciamento de variáveis de ambiente e settings
│   │   ├── common/         # Helpers e serviços compartilhados
│   │   ├── storage/        # Uploads e armazenamento de arquivos (PDFs)
│   │   ├── modules/        # Divisão por domínio
│   │   │   ├── users/
│   │   │   ├── deliveries/
│   │   │   ├── routing/
│   │   │   ├── dashboard/
│   │   │   └── reports/
│   │   └── main.py         # Entrypoint da aplicação FastAPI
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   └── public/
├── docs/
│   ├── README_backend.md
│   ├── README_frontend.md
│   └── arquitetura.md
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔄 Fluxo de Dados

1. O **Frontend** (React/Vite) realiza requisições HTTP via `axios` utilizando a variável `VITE_API_URL`.
2. O **Backend** (FastAPI) processa as requisições:
   - Realiza autenticação e autorização via JWT
   - Interage com o banco de dados relacional (SQLite/PostgreSQL) via SQLAlchemy
   - Executa algoritmos de roteirização e otimização (Google Maps API)
   - Gerencia uploads de arquivos (comprovantes e PDFs)
3. O **Banco de Dados** armazena dados de usuários, entregas, rotas e métricas.
4. O Backend retorna respostas JSON para o Frontend, que renderiza a interface.

---

## 🧠 Tecnologias Utilizadas

- **Backend:** Python 3.11, FastAPI, SQLAlchemy, Alembic (migrations), Uvicorn, JWT, Google Maps API
- **Frontend:** React 18, Vite, TailwindCSS, Axios, Chart.js
- **Banco de Dados:** SQLite para desenvolvimento, PostgreSQL para produção
- **DevOps:** Docker, Docker-Compose, Shell Scripts de configuração

---

## 🔐 Autenticação e Perfis de Acesso

- Implementação de JWT Tokens com refresh e expiração
- Perfis suportados:
  - Motorista
  - Operacional
  - Administrativo
- Middlewares personalizados para verificação de permissões nas rotas

---

## 📈 Roteirização e Otimização de Entregas

- Algoritmo híbrido baseado em **Clarke-Wright Savings** e **2-Opt**.
- Geração dinâmica de rotas otimizadas considerando:
  - Menor distância
  - Janelas de entrega
  - Prioridades
  - Capacidade dos veículos
- Uso da **Google Distance Matrix API** para dados em tempo real de distância e tráfego.
- Algoritmo de roteirização finalizado no backend e disponível via API
- Integração com frontend em andamento

---

## 📊 Dashboards e KPIs

- Backend entrega os seguintes indicadores via API:
  - Tempo médio por entrega
  - Entregas por tipo, motorista e região
  - Taxa de sucesso e atraso
- Visualização em frontend será feita por gráficos, cards e mapas geográficos

---

## 🚀 Escalabilidade e Melhorias Futuras

- Implementação de WebSockets para atualizações em tempo real
- Evolução da arquitetura para Serverless (AWS Lambda / GCP Functions)
- Pipeline de CI/CD para automação de builds e deploys
- Monitoramento de APIs com Prometheus e Grafana
- Cache de consultas de roteirização para reduzir chamadas à API externa

---