import { useQuery } from '@tanstack/react-query'
import { orderAPI } from '@/features/orders/services/orderAPI'
import { useAppStore } from '@/store/useAppStore'

export const useOrders = () => {
  const { user } = useAppStore()

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const orders = await orderAPI.getAll()
      return orders
        .filter(order => order.usuario_id === Number(user?.id))
        .sort((a, b) => b.id - a.id)//filtra pedidos por usuario_id en orden descendiente
    },
    enabled: !!user, //solo ejecuta si hay un usuario logueado
  })
}