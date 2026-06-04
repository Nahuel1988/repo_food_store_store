import axios from 'axios'
import type { User } from '@/features/auth/types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: '',
  withCredentials: true,
})

export const authAPI = {
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    await api.post('/usuarios/api/v1/auth/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },

  register: async (data: { nombre: string; apellido: string; email: string; password: string; celular: string }) => {
    await api.post('/usuarios/api/v1/auth/register', data)
  },

  logout: async () => {
    await api.post('/usuarios/api/v1/auth/logout')
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/usuarios/api/v1/auth/me')
    return response.data
  },
}