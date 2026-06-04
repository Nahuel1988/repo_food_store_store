export interface Direccion {
  id: number
  alias: string
  linea1: string
  linea2: string
  ciudad: string
  provincia: string
  codigo_postal: string
  latitud: string
  longitud: string
  es_principal: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  nombre: string
  apellido: string
  email: string
  celular: string
  created_at: string
  updated_at: string
  direcciones: Direccion[]
}