import type { CreatePedidoDTO } from '@/features/cart/types'
import { api } from '@/shared/api'

export const pedidoAPI = {
  create: async (pedido: CreatePedidoDTO) => {
    const response = await api.post('/pedidos_websocket/api/v1/pedidos', pedido)
    return response.data
  },

  getFormasPago: async () => {
    const response = await api.get<{ data: { codigo: string; descripcion: string; habilitado: boolean }[]; total: number }>('/pedidos/formas-pago/')
    return response.data.data
  },
}