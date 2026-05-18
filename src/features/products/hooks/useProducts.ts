import { useQuery } from '@tanstack/react-query'
import { productAPI } from '@/features/products/services/productAPI'
import { ProductFilters } from '@/features/products/types'

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productAPI.getAll(filters),
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getById(id),
    enabled: !!id,
  })
}
