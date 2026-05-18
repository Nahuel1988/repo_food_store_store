// Tipos específicos del módulo de productos
export interface Product {
  id: string
  name: string
  description: string
  price: number
  ingredients?: string[]
}

export interface ProductFilters {
  search?: string
  priceMin?: number
  priceMax?: number
}
