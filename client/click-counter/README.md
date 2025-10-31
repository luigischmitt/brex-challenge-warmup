# Click Counter - Frontend

Aplicação web de contador de clicks construída com Next.js 15, React e TypeScript.

## Features

- 🔐 **Login simples** - Login apenas com username
- 👆 **Contador de clicks** - Interface interativa para contar clicks
- 💾 **Persistência** - Dados salvos no backend via API
- 🎨 **UI moderna** - Componentes com Tailwind CSS
- ⚡ **Updates otimistas** - Interface responsiva com feedback imediato

## Tecnologias

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Radix UI** (componentes acessíveis)

## Pré-requisitos

Certifique-se de que o servidor backend está rodando em `http://localhost:8000`. 

Veja as instruções em [`../../server/README.md`](../../server/README.md).

## Instalação

```bash
# Instalar dependências
npm install
```

## Configuração (Opcional)

Para usar uma URL diferente para a API, crie um arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Executar o projeto

```bash
# Modo desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
app/
├── page.tsx              # Página de login (/)
├── counter/
│   └── page.tsx         # Página do contador (/counter)
├── layout.tsx           # Layout raiz
└── globals.css          # Estilos globais

components/
├── login-form.tsx       # Componente de login
├── click-counter.tsx    # Componente do contador
└── ui/                  # Componentes UI reutilizáveis

lib/
├── api.ts              # Funções para comunicação com API
└── utils.ts            # Utilitários
```

## Fluxo da Aplicação

1. **Login** (`/`) - Usuário insere username
2. **Criar/Buscar Usuário** - API cria usuário ou retorna existente
3. **Contador** (`/counter?username=X`) - Exibe contador do usuário
4. **Clicks** - Cada click é salvo no backend automaticamente

## API Endpoints Utilizados

- `POST /users` - Criar usuário
- `GET /users/{username}` - Buscar dados do usuário
- `POST /users/{username}/increment` - Incrementar clicks
- `PUT /users/{username}/clicks` - Atualizar clicks (usado no reset)

## Build para Produção

```bash
npm run build
npm run start
```

## Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
