import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/components/Header'

export const OrderFailurePage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">❌</span>
        <h1 className="text-2xl font-bold text-gray-800">El pago falló</h1>
        <p className="text-gray-500">Podés intentarlo de nuevo desde tus pedidos.</p>
        <button onClick={() => navigate('/pedidos')} className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
          Ver mis pedidos
        </button>
      </div>
    </>
  )
}