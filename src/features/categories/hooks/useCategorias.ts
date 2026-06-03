import { useQuery } from '@tanstack/react-query'
import { categoriaAPI } from '@/features/categories/services/categoriaAPI'

//Devuelve todas las categorias sin filtro
export const useCategorias = () => {
    return useQuery({
        queryKey: ['categorias'],
        queryFn: () => categoriaAPI.getAll(),
    })
}