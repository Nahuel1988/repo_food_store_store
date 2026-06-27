import { authAPI } from '@/features/auth/services/authAPI'
import { useAppStore } from '@/store/useAppStore'
import { useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
  const { user, setUser } = useAppStore()
  const queryClient = useQueryClient()

  const login = async (email: string, password: string) => {
    await authAPI.login(email, password)
    const userData = await authAPI.me()
    setUser({ id: String(userData.id), name: userData.nombre })
  }

  const logout = async () => {
    await authAPI.logout()
    setUser(null)
    queryClient.clear()
  }

  const loadUser = async () => {
    try {
      const userData = await authAPI.me()
      setUser({ id: String(userData.id), name: userData.nombre })
    } catch {
      setUser(null)
    }
  }

  return { user, login, logout, loadUser }
}