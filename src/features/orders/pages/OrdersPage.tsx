import { useOrders } from '@/features/orders/hooks/useOrders'
import { Header } from '@/shared/components/Header'
import { useAppStore } from '@/store/useAppStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { OrderCard } from '@/features/orders/components/OrderCard'

export const OrdersPage = () => {
  const { user } = useAppStore()
  const { data: orders, isLoading, isError } = useOrders()
  const navigate = useNavigate()

  useEffect(() => { //redirige a /login si el usuario no esta logueado
    if (!user) navigate('/login')
  }, [user, navigate])

  if (isLoading) return <div>Cargando pedidos...</div>
  if (isError) return <div>Error al cargar pedidos.</div>

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
            <OrderCard key={order.id} order={order}/>
          ))}
        </div>
      </div>
    </>
  )
}