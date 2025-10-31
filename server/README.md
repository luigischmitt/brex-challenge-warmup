# Click Counter API

API simples em FastAPI para gerenciar usuários e contagem de clicks.

## Instalação

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# No macOS/Linux:
source venv/bin/activate
# No Windows:
# venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

## Executar o servidor

```bash
# Desenvolvimento
uvicorn main:app --reload

# Ou diretamente
python main.py
```

O servidor estará disponível em: `http://localhost:8000`

Documentação interativa: `http://localhost:8000/docs`

## Endpoints

### `GET /`
Retorna informações básicas da API

### `POST /users`
Cria um novo usuário
```json
{
  "username": "luigi"
}
```

### `GET /users/{username}`
Busca um usuário pelo username

### `GET /users`
Lista todos os usuários (ordenados por clicks)

### `PUT /users/{username}/clicks`
Atualiza o número de clicks
```json
{
  "clicks": 10
}
```

### `POST /users/{username}/increment`
Incrementa o contador em 1

## Testar a API

### Opção 1: Script de teste
```bash
python test_api.py
```

### Opção 2: Documentação interativa
Acesse `http://localhost:8000/docs` para testar os endpoints diretamente no navegador.

### Opção 3: cURL
```bash
# Criar usuário
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"luigi"}'

# Buscar usuário
curl "http://localhost:8000/users/luigi"

# Incrementar clicks
curl -X POST "http://localhost:8000/users/luigi/increment"

# Listar todos os usuários
curl "http://localhost:8000/users"
```

## Banco de Dados

Usa SQLite (`clicks.db`) - criado automaticamente ao iniciar o servidor.

### Estrutura da tabela `users`
- `id`: INTEGER (PRIMARY KEY)
- `username`: TEXT (UNIQUE)
- `clicks`: INTEGER (DEFAULT 0)
- `created_at`: TIMESTAMP

