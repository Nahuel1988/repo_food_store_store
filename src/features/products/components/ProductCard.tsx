import type { Product } from '@/features/products/types'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="h-full bg-white rounded-lg shadow-md border px-4 py-6 gap-2 hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:shadow-orange-400 transition-all flex flex-col justify-center">
      <h3 className='text-lg font-medium'>{product.nombre}</h3>
      <p className='flex-1'>{product.descripcion}</p>
      <p className="text-green-700">${product.precio_base}</p>
    </div>
  )
}
