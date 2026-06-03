export interface Categoria {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  parent_id: number
  is_active: boolean
  subcategorias: Categoria[]
}