from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from contextlib import contextmanager
from typing import Optional

app = FastAPI(title="Click Counter API")

# CORS configuration para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DB_PATH = "clicks.db"


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


def init_db():
    """Inicializa o banco de dados"""
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                clicks INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()


# Inicializa o banco ao iniciar a aplicação
init_db()


# Modelos Pydantic
class User(BaseModel):
    username: str


class UserResponse(BaseModel):
    id: int
    username: str
    clicks: int


class ClickUpdate(BaseModel):
    clicks: int


# Endpoints
@app.get("/")
def read_root():
    return {"message": "Click Counter API", "version": "1.0.0"}


@app.post("/users", response_model=UserResponse)
def create_user(user: User):
    """Cria um novo usuário ou retorna o existente"""
    with get_db() as conn:
        try:
            cursor = conn.execute(
                "INSERT INTO users (username, clicks) VALUES (?, 0)",
                (user.username,)
            )
            conn.commit()
            user_id = cursor.lastrowid
            
            row = conn.execute(
                "SELECT id, username, clicks FROM users WHERE id = ?",
                (user_id,)
            ).fetchone()
            
            return dict(row)
        except sqlite3.IntegrityError:
            # Usuário já existe, retorna o existente
            row = conn.execute(
                "SELECT id, username, clicks FROM users WHERE username = ?",
                (user.username,)
            ).fetchone()
            
            if row:
                return dict(row)
            raise HTTPException(status_code=400, detail="Error creating user")


@app.get("/users/{username}", response_model=UserResponse)
def get_user(username: str):
    """Busca um usuário pelo username"""
    with get_db() as conn:
        row = conn.execute(
            "SELECT id, username, clicks FROM users WHERE username = ?",
            (username,)
        ).fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="User not found")
        
        return dict(row)


@app.put("/users/{username}/clicks", response_model=UserResponse)
def update_clicks(username: str, click_update: ClickUpdate):
    """Atualiza o número de clicks de um usuário"""
    with get_db() as conn:
        cursor = conn.execute(
            "UPDATE users SET clicks = ? WHERE username = ?",
            (click_update.clicks, username)
        )
        conn.commit()
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        row = conn.execute(
            "SELECT id, username, clicks FROM users WHERE username = ?",
            (username,)
        ).fetchone()
        
        return dict(row)


@app.post("/users/{username}/increment", response_model=UserResponse)
def increment_clicks(username: str):
    """Incrementa o contador de clicks de um usuário em 1"""
    with get_db() as conn:
        cursor = conn.execute(
            "UPDATE users SET clicks = clicks + 1 WHERE username = ?",
            (username,)
        )
        conn.commit()
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        row = conn.execute(
            "SELECT id, username, clicks FROM users WHERE username = ?",
            (username,)
        ).fetchone()
        
        return dict(row)


@app.get("/users", response_model=list[UserResponse])
def list_users():
    """Lista todos os usuários"""
    with get_db() as conn:
        rows = conn.execute(
            "SELECT id, username, clicks FROM users ORDER BY clicks DESC"
        ).fetchall()
        
        return [dict(row) for row in rows]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

