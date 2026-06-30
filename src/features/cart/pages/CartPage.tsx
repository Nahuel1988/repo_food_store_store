import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { pedidoAPI } from '@/features/cart/services/pedidoAPI'
import { authAPI } from '@/features/auth/services/authAPI'
import { Header } from '@/shared/components/Header'

export const CartPage = () => {
  const { items, clearCart } = useCartStore()
  const navigate = useNavigate()

  const [formaPago, setFormaPago] = useState('')
  const [notas, setNotas] = useState('')
  const [direccionId, setDireccionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: formasPago } = useQuery({
    queryKey: ['formas-pago'],
    queryFn: () => pedidoAPI.getFormasPago(),
  })

  const { data: usuario } = useQuery({
    queryKey: ['me'],
    queryFn: () => authAPI.me(),
  })

  const total = items.reduce((acc, item) => acc + parseFloat(item.precio_base) * item.cantidad, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!usuario) { navigate('/login'); return }
    if (!direccionId) { setError('Seleccioná una dirección'); return }
    if (!formaPago) { setError('Seleccioná una forma de pago'); return }

    setLoading(true)
    setError(null)
    try {
      await pedidoAPI.create({
        direccion_id: direccionId,
        forma_pago_codigo: formaPago,
        notas,
        detalles: items.map(item => ({
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          personalizacion: [],
        }))
      })
      clearCart()
      navigate('/')
    } catch {
      setError('Error al crear el pedido. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Tu carrito está vacío</p>
      </div>
    </>
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-6 py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Confirmar pedido</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-b-4 border-b-orange-400">
          <h2 className="font-bold text-gray-700 mb-4">Resumen</h2>
          {items.map(item => (
            <div key={item.producto_id} className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{item.nombre} x{item.cantidad}</span>
              <span>${(parseFloat(item.precio_base) * item.cantidad).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3 font-bold text-gray-800 flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border-b-4 border-b-orange-400 flex flex-col gap-4">
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Dirección</label>
            <select
              value={direccionId ?? ''}
              onChange={(e) => setDireccionId(Number(e.target.value))}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Seleccioná una dirección</option>
              {usuario?.direcciones.map(dir => (
                <option key={dir.id} value={dir.id}>
                  {dir.alias} — {dir.linea1}, {dir.ciudad}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Forma de pago</label>
            <select
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Seleccioná una forma de pago</option>
              {formasPago?.map(fp => (
                <option key={fp.codigo} value={fp.codigo}>{fp.descripcion}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Indicaciones especiales..."
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none h-24"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Enviando pedido...' : 'Hacer pedido'}
          </button>
        </form>
      </div>
    </>
  )
}