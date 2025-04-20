# ERP-Log-Pro

Sistema ERP Logístico focado na gestão de entregas, otimização de rotas e acompanhamento de KPIs em tempo real.

## Estrutura do Projeto

```
ERP-LOG-PRO/
├── backend/
│   └── app/
│       ├── core/
│       ├── models/
│       ├── routers/
│       ├── schemas/
│       ├── services/
│       ├── database.py
│       ├── main.py
│       └── .env.example
├── uploaded_files/
├── venv/
├── .env
├── .gitignore
├── docker-compose.yml
└── requirements.txt
```

## Funcionalidades Implementadas

- [x] Cadastro e autenticação de usuários (motorista, operacional, administrativo).
- [x] Upload de arquivos PDF de Notas Fiscais.
- [x] Extração de dados estruturados de NF-e (dados do emitente, destinatário, valores, transporte, produtos).
- [x] Registro de entregas na base de dados.
- [x] Listagem de entregas cadastradas.
- [x] Organização inicial do backend com FastAPI.

## Tecnologias Utilizadas

- Python 3.11+
- FastAPI
- SQLAlchemy
- PostgreSQL (via Docker)
- PyPDF2
- Uvicorn
- Docker

## Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/hellenmaraujo/ERP-Log-Pro.git
cd ERP-Log-Pro
```

2. Configure o ambiente:
```bash
cp backend/app/.env.example backend/app/.env
```
Preencha as variáveis do `.env` conforme necessário.

3. Suba a aplicação usando Docker:
```bash
docker-compose up --build
```

4. Acesse:
- API via Swagger UI: `http://localhost:8000/docs`

## Progresso Atual

- Backend com autenticação e CRUD de entregas básico OK.
- Upload e leitura de PDFs parcialmente implementados (em ajuste para melhor extração).
- Estrutura pronta para incluir dashboards, KPIs e roteirização otimizada.

## Próximos Passos

- Corrigir parsing de PDFs de NF-e para extrair todos os campos com precisão.
- Criar estrutura de relatórios e KPIs.
- Integrar API de mapas para roteirização automática.
- Desenvolver frontend (React).

