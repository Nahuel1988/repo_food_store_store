import {api} from '@/shared/api'

interface PreferenciaResponse {
    pago_id: number
    preference_id: string
    init_point: string
    external_reference: string
}

export const pagoAPI = {
    crearPreferencia: async (pedido_id: number): Promise<PreferenciaResponse> => {
        const response = await api.post<PreferenciaResponse>('/pagos/preferencia', {pedido_id})
        return response.data
    },

    confirmarPago: async (pedido_id: number, payment_id: string) => {
        await api.post('/pagos/confirm', {pedido_id, payment_id})
    },
}