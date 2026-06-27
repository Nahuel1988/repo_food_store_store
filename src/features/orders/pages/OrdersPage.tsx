import { useOrders } from '@/features/orders/hooks/useOrders'
import { Header } from '@/shared/components/Header'
import { useAppStore } from '@/store/useAppStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const OrdersPage = () => {
  const { user } = useAppStore()
  const { data: orders, isLoading } = useOrders()
  const navigate = useNavigate()

  useEffect(() => { //redirige a /login si el usuario no esta logueado
    if (!user) navigate('/login')
  }, [user, navigate])

  if (isLoading) return <div>Cargando pedidos...</div>

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis pedidos</h1>

        {orders?.length === 0 && (
          <p className="text-gray-400 text-center mt-12">No tenés pedidos todavía</p>
        )}

        <div className="flex flex-col gap-4">
          {orders?.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-6 border-b-4 border-b-orange-400">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800">Pedido #{order.id}</span>
                <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                  {order.estado_codigo}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex flex-col gap-1">
                <span>Forma de pago: {order.forma_pago_codigo}</span>
                <span>Subtotal: ${order.subtotal}</span>
                <span>Descuento: ${order.descuento}</span>
                <span className="font-bold text-gray-700">Total: ${order.total}</span>
                {order.notas && <span>Notas: {order.notas}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}