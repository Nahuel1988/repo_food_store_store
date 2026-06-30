import { useNavigate } from 'react-router-dom'
import { Header } from '@/shared/components/Header'

export const OrderPendingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">⏳</span>
        <h1 className="text-2xl font-bold text-gray-800">Pago pendiente</h1>
        <p className="text-gray-500">Tu pago está siendo procesado. Te avisaremos cuando se confirme.</p>
        <button onClick={() => navigate('/pedidos')} className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
          Ver mis pedidos
        </button>
      </div>
    </>
  )
}