

# 🛠️ ERP_Log — Backend

Este é o backend do ERP_Log, uma solução logística com múltiplos perfis de acesso, roteirização inteligente, upload de entregas e dashboards com KPIs.

---

## 📁 Estrutura Modular

```
erp_log/
├── core/              # Configurações centrais: auth, DB, JWT
├── common/            # Funções e serviços reutilizáveis
├── config/            # Arquivos de configuração e settings
├── storage/           # PDFs e arquivos enviados
├── modules/           # Divisão por domínio
│   ├── users/         # Usuários, perfis, autenticação
│   ├── deliveries/    # Entregas, uploads, tipos
│   ├── routing/       # Roteirização e otimização
│   ├── dashboard/     # KPIs e métricas
│   └── reports/       # Relatórios e análises
└── main.py            # Entrypoint do FastAPI
```

---

## ✅ Funcionalidades

- Autenticação por perfil (JWT)
- Upload e preview de entregas (PDF)
- Cálculo de KPIs automáticos
- Roteirização inteligente com Google Maps API
- Visualização em mapa
- Dashboards em tempo real
- Exportação de relatórios

---

## ⚙️ Como rodar localmente

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn erp_log.main:app --reload
```

---

## 🌍 Variáveis de ambiente

Você deve criar um arquivo `.env` na raiz do projeto. Um exemplo já está disponível como `.env.example`.

```env
DATABASE_URL=sqlite:///./backend/database/erp_log.db
SECRET_KEY=your-secret-key
GOOGLE_MAPS_API_KEY=your-api-key
VITE_API_URL=http://localhost:8000
```

---

## 🧰 Setup automático do ambiente

Para configurar dependências nativas (OpenBLAS, C, etc), use:

```bash
bash docs/setup_env.sh
```

> ⚠️ Este script está pronto para macOS, Linux e mostra instruções no Windows.