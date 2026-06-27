import { AppRoutes } from '@/router'
import { useEffect } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import './App.css'

function App() {
  const { loadUser } = useAuth()

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className="app">
      <AppRoutes />
    </div>
  )
}

export default App