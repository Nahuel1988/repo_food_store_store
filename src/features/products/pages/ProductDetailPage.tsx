import { useParams } from 'react-router-dom'
import { useProduct } from '@/features/products/hooks'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { Header } from '@/shared/components/Header'
import { useToast } from '@/shared/hooks/useToast'
import { Toast } from '@/shared/components/Toast'

export const ProductDetailPage = () => {
  const { id } = useParams()
  const { data: product, isLoading, error } = useProduct(id ?? '')
  const { addItem } = useCartStore()
  const { visible, message, showToast } = useToast()

  if (isLoading) return <div>Cargando producto...</div>
  if (error || !product) return <div>Producto no encontrado</div>

  const handleAddToCart = () => {
    addItem({
      producto_id: product.id,
      nombre: product.nombre,
      precio_base: product.precio_base,
      imagen: product.imagenes_url[0] ?? '',
      cantidad: 1,
    })
    showToast(`${product.nombre} agregado al carrito`)
  }

  return (
    <>
      <Header />
      <div className="bg-white rounded-lg shadow-md border-b-4 border-b-orange-400 min-h-screen px-6 py-8 max-w-3xl mx-auto">

        {product.imagenes_url.length > 0 && (
          <img 
            src={product.imagenes_url[0]} 
            alt={product.nombre}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.nombre}</h1>
        <p className="text-gray-500 mb-4">{product.descripcion}</p>
        <p className="text-green-600 font-bold text-2xl mb-6">${product.precio_base}</p>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium"
        >
          Agregar al carrito
        </button>
        <Toast message={message} visible={visible} />
      </div>
    </>
  )
}