import { useProducts } from '@/features/products/hooks'
import { ProductCard } from '@/features/products/components'

export const ProductsPage = () => {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) return <div>Cargando productos...</div>
  if (error) return <div>Error cargando productos</div>

  return (
    <div className="products-page">
      <h1>Productos</h1>
      <div className="products-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
