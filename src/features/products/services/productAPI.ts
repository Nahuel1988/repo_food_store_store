import axios from 'axios'
import type { Product, ProductFilters } from '@/features/products/types'

const api = axios.create({
  baseURL: '',
  withCredentials: true,
})

export const productAPI = {
  // Obtener todos los productos
  getAll: async (filters?: ProductFilters) => {
  const response = await api.get<{ data: Product[]; total: number }>('/productos/', { params: filters })
  return response.data.data
},

  // Obtener un producto por ID
  getById: async (id: string) => {
    const response = await api.get<Product>(`/productos/${id}`)
    return response.data
  },

  // Crear producto
  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/productos', product)
    return response.data
  },

  // Actualizar producto
  update: async (id: string, product: Partial<Product>) => {
    const response = await api.patch<Product>(`/productos/${id}`, product)
    return response.data
  },

  // Eliminar producto
  delete: async (id: string) => {
    await api.delete(`/productos/${id}`)
  },
}
