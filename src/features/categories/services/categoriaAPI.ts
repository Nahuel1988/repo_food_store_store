import type { Categoria } from "../types"
import { api } from "@/shared/api"

export const categoriaAPI = {
    //Obtiene todas las categorias
    getAll: async () => {
        const response = await api.get<{ data: Categoria[]; total: number }>('/categorias/')
        return response.data.data
    }
}