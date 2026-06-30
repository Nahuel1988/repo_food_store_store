import { useEffect, useRef, useState } from 'react'

const WS_BASE = import.meta.env.VITE_WS_URL || 'ws://localhost:5173'
const WS_URL = `${WS_BASE}/pedidos_websocket/api/v1/cocina/ws`

export const useOrderSocket = (orderID: number) => {
    const [estado, setEstado] = useState<string | null>(null) //estado inicializado en null
    const ws = useRef<WebSocket | null>(null) //guarda la conexion websocket
    //useRef persiste entre renders

    useEffect(() => {
        ws.current = new WebSocket(WS_URL)//abre la conexión al servidor

        ws.current.onopen = () => {
            ws.current?.send(JSON.stringify({ action: 'subscribe-order', order_id: orderID}))//selecciona el pedido
        }

        ws.current.onmessage = (event) => { //cuando el servidor manda un mensaje ejecuta:
            //parsea el JSON, verifica el pedido y actualiza el estado
            const msg = JSON.parse(event.data)
            if (msg.data?.id === orderID && msg.data?.estado_codigo) {
                setEstado(msg.data.estado_codigo)
            }
        }

        ws.current.onclose = (event) => {
            console.log('WS cerrado:', event.code, event.reason)
        }

        return () => {
            ws.current?.close() //cuando se desmonta el componente se cierra la conexión
        }
    }, [orderID])

    return { estado }
}