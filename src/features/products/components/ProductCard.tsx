import type { Product } from '@/features/products/types'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer h-full bg-white rounded-lg shadow-md flex flex-col hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:-translate-y-1 border-b-4 border-b-transparent hover:border-b-orange-400 transition-all duration-300">
      
      {product.imagenes_url.length > 0 && (
        <img 
          src={product.imagenes_url[0]} 
          alt={product.nombre}
          className="w-full h-44 object-cover rounded-lg"
        />
      )}

      <div className="px-4 py-4 flex flex-col gap-2 flex-1">
        <h3 className='text-lg font-medium'>{product.nombre}</h3>
        <p className='flex-1 text-gray-500'>{product.descripcion}</p>
        <p className="text-green-700 font-bold">${product.precio_base}</p>
      </div>
    </div>
  )
}