// Tipos específicos del módulo de productos
export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio_base: string
  imagenes_url: string[]
  disponible: boolean
  is_active: boolean
  ingrediente_ids: number[]
  categoria_id: number
}

export interface ProductFilters {
  search?: string
  priceMin?: number
  priceMax?: number
  categoria_id?: number
}