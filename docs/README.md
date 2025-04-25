# ERP-Log

Sistema ERP Logístico focado na gestão de entregas, otimização de rotas e acompanhamento de KPIs em tempo real.

## Estrutura do Projeto

```
ERP-Log/
├── backend/
│   ├── erp_log/
│   │   ├── core/
│   │   ├── common/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── users/
│   │   │   ├── deliveries/
│   │   │   ├── routing/
│   │   │   ├── dashboard/
│   │   │   └── reports/
│   │   ├── storage/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
├── docs/
│   ├── arquitetura.md
│   ├── README.md
│   ├── README_backend.md
│   ├── README_frontend.md
│   └── setup_env.sh
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Funcionalidades Implementadas

- [x] Autenticação de usuários por perfil (motorista, operacional, administrativo).
- [x] Upload de entregas via backend.
- [x] Login integrado frontend ↔ backend.
- [x] Estrutura inicial de dashboard em desenvolvimento.

## Tecnologias Utilizadas

- Backend:
  - Python 3.11+
  - FastAPI
  - SQLAlchemy
  - PostgreSQL
  - Uvicorn

- Frontend:
  - React
  - Vite
  - Axios

## Como Executar Localmente

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> ⚠️ **Atenção**: o script `setup_env.sh` foi movido para `docs/setup_env.sh`.  
> Ele é útil para configurar ambientes locais com dependências nativas (Linux/macOS).  
> Em Windows, siga as instruções descritas dentro do próprio script.

## Progresso Atual

- Backend com autenticação e upload de entregas funcionando.
- Frontend com tela de login integrada ao backend.
- Redirecionamento correto após login.
- Estrutura de dashboard será iniciada.

## Próximos Passos

- Desenvolver tela de dashboard no frontend.
- Implementar proteção de rotas autenticadas.
- Criar exibição de entregas e KPIs no dashboard.
- Melhorar sistema de alertas e feedbacks de erro.
