import type { Product } from '@/features/products/types'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { Link } from 'react-router-dom'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      producto_id: product.id,
      nombre: product.nombre,
      precio_base: product.precio_base,
      imagen: product.imagenes_url[0] ?? '',
      cantidad: 1,
    })
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border-b-4 border-b-orange-400"
        onClick={(e) => e.stopPropagation()}
      >
        {product.imagenes_url.length > 0 && (
          <img 
            src={product.imagenes_url[0]} 
            alt={product.nombre}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.nombre}</h2>
        <p className="text-gray-500 mb-4">{product.descripcion}</p>
        <p className="text-green-600 font-bold text-xl mb-6">${product.precio_base}</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
          >
            Agregar al carrito
          </button>
          <div className="flex justify-between items-center">
            <button onClick={onClose} className="px-2 py-1 text-gray-400 hover:text-white hover:bg-red-500 transition-colors border rounded">
              Cerrar
            </button>
            <Link 
              to={`/productos/${product.id}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              Ver producto completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}