import type { Product } from '@/features/products/types'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <p className="price">${product.precio_base}</p>
    </div>
  )
}
