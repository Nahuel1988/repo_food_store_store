import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '@/features/auth/services/authAPI'
import { Header } from '@/shared/components/Header'

export const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    celular: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await authAPI.register(form)
      navigate('/login')
    } catch {
      setError('Error al registrarse. Verificá los datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md border-b-4 border-b-orange-400 p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear cuenta</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: 'nombre', placeholder: 'Nombre' },
              { name: 'apellido', placeholder: 'Apellido' },
              { name: 'email', placeholder: 'Email', type: 'email' },
              { name: 'password', placeholder: 'Contraseña', type: 'password' },
              { name: 'celular', placeholder: 'Celular' },
            ].map(({ name, placeholder, type = 'text' }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            ))}

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition-colors disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4 text-center">
            ¿Ya tenés cuenta? <Link to="/login" className="text-orange-400 hover:underline">Iniciá sesión</Link>
          </p>
        </div>
      </div>
    </>
  )
}