const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface User {
  id: number
  username: string
  clicks: number
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "ApiError"
  }
}

/**
 * Cria ou retorna um usuário existente
 */
export async function createUser(username: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  })

  if (!response.ok) {
    throw new ApiError(response.status, "Failed to create user")
  }

  return response.json()
}

/**
 * Busca um usuário pelo username
 */
export async function getUser(username: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${username}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError(404, "User not found")
    }
    throw new ApiError(response.status, "Failed to fetch user")
  }

  return response.json()
}

/**
 * Incrementa o contador de clicks de um usuário
 */
export async function incrementClicks(username: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${username}/increment`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new ApiError(response.status, "Failed to increment clicks")
  }

  return response.json()
}

/**
 * Atualiza o número de clicks de um usuário
 */
export async function updateClicks(username: string, clicks: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${username}/clicks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clicks }),
  })

  if (!response.ok) {
    throw new ApiError(response.status, "Failed to update clicks")
  }

  return response.json()
}

/**
 * Lista todos os usuários
 */
export async function listUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`)

  if (!response.ok) {
    throw new ApiError(response.status, "Failed to list users")
  }

  return response.json()
}

