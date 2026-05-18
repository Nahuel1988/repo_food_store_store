import axios from 'axios'
import { Product, ProductFilters } from '@/features/products/types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE,
})

export const productAPI = {
  // Obtener todos los productos
  getAll: async (filters?: ProductFilters) => {
    const response = await api.get<Product[]>('/products', { params: filters })
    return response.data
  },

  // Obtener un producto por ID
  getById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },

  // Crear producto
  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post<Product>('/products', product)
    return response.data
  },

  // Actualizar producto
  update: async (id: string, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product)
    return response.data
  },

  // Eliminar producto
  delete: async (id: string) => {
    await api.delete(`/products/${id}`)
  },
}
