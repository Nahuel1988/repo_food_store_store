import { api } from '@/shared/api'
import type { Order } from '@/features/orders/types'

export const orderAPI = {
  getAll: async () => {
    const response = await api.get<{ data: Order[]; total: number }>('/pedidos/')
    return response.data.data
  },
}