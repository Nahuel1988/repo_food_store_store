import axios from "axios"
import type { Categoria } from "@/features/products/types"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
    baseURL: API_BASE,
})

export const categoriaAPI = {
    //Obtiene todas las categorias
    getAll: async () => {
        const response = await api.get<{ data: Categoria[]; total: number }>('/categorias/')
        return response.data.data
    }
}