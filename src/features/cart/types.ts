export interface CartItem {
  producto_id: number
  nombre: string
  precio_base: string
  imagen: string
  cantidad: number
}

export interface CreatePedidoDTO {
  direccion_id: number
  forma_pago_codigo: string
  notas: string
  detalles: {
    producto_id: number
    cantidad: number
    personalizacion: []
  }[]
}