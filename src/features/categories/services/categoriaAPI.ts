import axios from "axios"
import type { Categoria } from "../types"

const api = axios.create({
  baseURL: '',
  withCredentials: true,
})

export const categoriaAPI = {
    //Obtiene todas las categorias
    getAll: async () => {
        const response = await api.get<{ data: Categoria[]; total: number }>('/categorias/')
        return response.data.data
    }
}