# Click Counter - Brex Challenge Warmup

Aplicação full-stack de contador de clicks com autenticação simples por username.

## 📋 Sobre o Projeto

Sistema completo que permite usuários fazerem login e manterem um contador de clicks persistente. Construído com tecnologias modernas tanto no frontend quanto no backend.

## 🏗️ Arquitetura

```
brex-challenge-warmup/
├── client/click-counter/    # Frontend Next.js
└── server/                   # Backend FastAPI
```

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS + Radix UI
- **Linguagem**: TypeScript
- **Features**: Login, contador de clicks, updates otimistas

### Backend
- **Framework**: FastAPI
- **Banco de Dados**: SQLite
- **Linguagem**: Python
- **Features**: CRUD de usuários, contador persistente, API RESTful

## 🚀 Como Executar

### 1. Backend (FastAPI)

```bash
# Entrar no diretório
cd server

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Rodar servidor
uvicorn main:app --reload
```

O servidor estará em: `http://localhost:8000`

Documentação interativa: `http://localhost:8000/docs`

### 2. Frontend (Next.js)

```bash
# Entrar no diretório
cd client/click-counter

# Instalar dependências
npm install

# Rodar aplicação
npm run dev
```

A aplicação estará em: `http://localhost:3000`

## 📖 Como Usar

1. **Acesse** `http://localhost:3000`
2. **Digite** seu username no formulário de login
3. **Clique** em "Login" para entrar
4. **Use** o botão "Click Me!" para incrementar seu contador
5. **Seus clicks são salvos automaticamente** no banco de dados
6. **Resete** quando quiser com o botão "Reset Counter"

## 🎯 Funcionalidades

### ✅ Implementado

- [x] Tela de login com username
- [x] Criação automática de usuários
- [x] Contador de clicks funcional
- [x] Persistência em banco de dados
- [x] API RESTful completa
- [x] Interface moderna e responsiva
- [x] Updates otimistas (UX rápida)
- [x] Tratamento de erros
- [x] Loading states

### 🔮 Possíveis Melhorias Futuras

- [ ] Autenticação real (JWT)
- [ ] Ranking de usuários
- [ ] Histórico de clicks
- [ ] Gráficos de progresso
- [ ] Testes automatizados
- [ ] Deploy (Vercel + Railway/Render)

## 📚 API Endpoints

### Users

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Info da API |
| `POST` | `/users` | Criar usuário |
| `GET` | `/users/{username}` | Buscar usuário |
| `GET` | `/users` | Listar todos |
| `PUT` | `/users/{username}/clicks` | Atualizar clicks |
| `POST` | `/users/{username}/increment` | +1 click |

## 🛠️ Tecnologias Utilizadas

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Geist Font

### Backend
- FastAPI
- SQLite
- Pydantic
- Uvicorn
- Python 3.x

## 📁 Estrutura de Arquivos

```
.
├── client/click-counter/
│   ├── app/
│   │   ├── page.tsx              # Login
│   │   ├── counter/page.tsx      # Contador
│   │   └── layout.tsx
│   ├── components/
│   │   ├── login-form.tsx
│   │   ├── click-counter.tsx
│   │   └── ui/                   # Componentes UI
│   ├── lib/
│   │   ├── api.ts                # Client API
│   │   └── utils.ts
│   └── public/
│       └── brex_icon.png
│
└── server/
    ├── main.py                    # API FastAPI
    ├── requirements.txt
    ├── README.md
    └── clicks.db                  # SQLite (gerado)
```

## 🧪 Testar a API

### Opção 1: Documentação Interativa
Acesse `http://localhost:8000/docs`

### Opção 2: cURL

```bash
# Criar usuário
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"luigi"}'

# Buscar usuário
curl "http://localhost:8000/users/luigi"

# Incrementar clicks
curl -X POST "http://localhost:8000/users/luigi/increment"
```

## 📝 Banco de Dados

**SQLite** - Arquivo local `clicks.db`

### Tabela `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | PK auto-increment |
| `username` | TEXT | Único, not null |
| `clicks` | INTEGER | Default 0 |
| `created_at` | TIMESTAMP | Auto |

## 🤝 Contribuindo

Projeto de desafio técnico. Sinta-se livre para fazer fork e experimentar!

## 📄 Licença

MIT License - veja [LICENSE](LICENSE)

---

Feito com ❤️ para o desafio Brex

