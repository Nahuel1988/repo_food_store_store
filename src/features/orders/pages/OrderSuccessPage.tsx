import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { pagoAPI } from '@/features/orders/services/pagoAPI'
import { Header } from '@/shared/components/Header'

export const OrderSuccessPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    const payment_id = searchParams.get('payment_id') //lee el query param
    if (!id || !payment_id) { setStatus('error'); return } //si falta el id o el payment_id muestra error

    //llama al back con pedido_id y payment_id y maneja el error con promesas
    pagoAPI.confirmarPago(Number(id), payment_id)
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        {status === 'loading' && <p className="text-gray-500">Confirmando pago...</p>}
        {status === 'ok' && (
          <>
            <span className="text-6xl">✅</span>
            <h1 className="text-2xl font-bold text-gray-800">¡Pago exitoso!</h1>
            <p className="text-gray-500">Tu pedido fue confirmado.</p>
            <button onClick={() => navigate('/pedidos')} className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
              Ver mis pedidos
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <span className="text-6xl">❌</span>
            <h1 className="text-2xl font-bold text-gray-800">Algo salió mal</h1>
            <button onClick={() => navigate('/pedidos')} className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
              Ver mis pedidos
            </button>
          </>
        )}
      </div>
    </>
  )
}