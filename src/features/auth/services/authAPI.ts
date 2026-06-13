import type { User } from '@/features/auth/types'
import { api } from '@/shared/api'

export const authAPI = {
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    await api.post('/api/v1/auth/token', formData, {
      
    })
  },

  register: async (data: { nombre: string; apellido: string; email: string; password: string; celular: string }) => {
    await api.post('/api/v1/auth/register', data)
  },

  logout: async () => {
    await api.post('/api/v1/auth/logout')
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/api/v1/auth/me')
    return response.data
  },
}