import { useParams } from 'react-router-dom'
import { useProduct } from '@/features/products/hooks'
import { Header } from '@/shared/components/Header'

export const ProductDetailPage = () => {
  const { id } = useParams()
  const { data: product, isLoading, error } = useProduct(id ?? '')

  if (isLoading) return <div>Cargando producto...</div>
  if (error || !product) return <div>Producto no encontrado</div>

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
        <p className="text-green-600 font-bold text-2xl">${product.precio_base}</p>
      </div>
    </>
  )
}