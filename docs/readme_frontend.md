

# 💻 ERP_Log — Frontend

Este é o frontend do ERP_Log, desenvolvido em React com Vite. Ele oferece uma interface moderna e responsiva para visualização de entregas, dashboards, roteirização e painéis operacionais, de acordo com o perfil do usuário.

---

## 🧱 Tecnologias Utilizadas

- React 18
- Vite
- TailwindCSS
- Axios
- Chart.js + React Chart.js 2
- React Router DOM

---

## 📁 Estrutura de Pastas

```
src/
├── assets/                 # Imagens e estilos (CSS/Tailwind)
│   ├── images/
│   └── styles/
│       ├── base/
│       ├── layout/
│       └── pages/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   └── Dashboard/
│       ├── Admin/
│       ├── Mot/
│       ├── Operac/
│       ├── Cards.jsx
│       ├── Map.jsx
│       └── Table.jsx
├── pages/
│   ├── Dashboard/index.jsx
│   ├── Delivery/index.jsx
│   ├── Uploads/index.jsx
│   └── Login.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧭 Funcionalidades

- Login com autenticação por perfil (Admin, Operacional, Motorista)
- Painel com métricas (entregas/hora, tempo médio, atrasos)
- Mapa interativo com filtros de entrega
- Upload de PDFs e visualização de prévias
- Integração com a API para visualização e ação em tempo real

---

## 🧪 Variáveis de Ambiente

O frontend usa `.env` com prefixo `VITE_`. Exemplo:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_ENV=development
```

Essas variáveis são acessadas via `import.meta.env`.

---

## ⚙️ Como Rodar

```bash
cd frontend
npm install
npm run dev
```

> O projeto será iniciado em `http://localhost:5173` por padrão (ou a porta configurada pelo Vite).

---

## 🧼 Scripts disponíveis

| Script         | Descrição                                  |
|----------------|--------------------------------------------|
| `npm run dev`  | Roda o projeto localmente com Vite         |
| `npm run build`| Gera build de produção                     |
| `npm run preview` | Visualiza o build de produção localmente |

---

## 📦 Integração com o backend

Todas as requisições são feitas via Axios com a URL base definida em `VITE_API_URL`.  
A autenticação por token (JWT) é armazenada no `localStorage`.

---