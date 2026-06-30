import { useOrderSocket } from '@/features/orders/hooks/useOrderSocket'
import { pagoAPI } from '@/features/orders/services/pagoAPI'
import type { Order } from '@/features/orders/types'

interface OrderCardProps {
  order: Order
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { estado } = useOrderSocket(order.id)//abre una conexión para el pedido y devuelve su estado

  const estadoActual = estado ?? order.estado_codigo//si estado es null usa order.estado_codigo

  const handlePagar = async () => {
    const {init_point} = await pagoAPI.crearPreferencia(order.id) //crea la preferencia
    window.location.href = init_point //redirige a la URL que devuelve el back
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-b-4 border-b-orange-400">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-800">Pedido #{order.id}</span>
        <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
          {estadoActual}
        </span>
      </div>
      <div className="text-sm text-gray-500 flex flex-col gap-1">
        <span>Forma de pago: {order.forma_pago_codigo}</span>
        <span>Subtotal: ${order.subtotal}</span>
        <span>Descuento: ${order.descuento}</span>
        <span className="font-bold text-gray-700">Total: ${order.total}</span>
        {order.notas && <span>Notas: {order.notas}</span>}
      </div>
      {estadoActual === 'PENDIENTE' && order.forma_pago_codigo === 'MERCADOPAGO' &&(
        <button
          onClick={handlePagar}
          className='mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
        >
          Pagar con MercadoPago
        </button>
      )}
    </div>
  )
}