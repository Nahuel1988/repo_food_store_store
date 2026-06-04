import { useCartStore } from '@/features/cart/store/useCartStore'
import { useNavigate } from 'react-router-dom'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateCantidad } = useCartStore()
  const navigate = useNavigate()

  const total = items.reduce((acc, item) => acc + parseFloat(item.precio_base) * item.cantidad, 0)

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Tu carrito</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 && (
            <p className="text-gray-400 text-center mt-8">El carrito está vacío</p>
          )}
          {items.map((item) => (
            <div key={item.producto_id} className="flex gap-3 items-center">
              {item.imagen && (
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{item.nombre}</p>
                <p className="text-green-600 text-sm">${item.precio_base}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => item.cantidad > 1 ? updateCantidad(item.producto_id, item.cantidad - 1) : removeItem(item.producto_id)}
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                  >-</button>
                  <span className="text-sm">{item.cantidad}</span>
                  <button
                    onClick={() => updateCantidad(item.producto_id, item.cantidad + 1)}
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                  >+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.producto_id)} className="text-gray-300 hover:text-red-500 transition-colors text-sm">✕</button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-4 border-t">
            <p className="font-bold text-gray-800 mb-4">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => { onClose(); navigate('/carrito') }}
              className="w-full py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium"
            >
              Confirmar pedido
            </button>
          </div>
        )}
      </div>
    </>
  )
}