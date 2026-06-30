import { api } from '@/shared/api'
import type { Order } from '@/features/orders/types'

export const orderAPI = {
  getAll: async () => {
    const response = await api.get<Order[]>('/pedidos_websocket/api/v1/pedidos')
    return response.data
  },
}