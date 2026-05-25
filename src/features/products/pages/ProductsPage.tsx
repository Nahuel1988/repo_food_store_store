import { useState } from 'react'
import { useCategorias, useProducts } from '@/features/products/hooks'
import { ProductCard } from '@/features/products/components'

export const ProductsPage = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | undefined>(undefined)

  const {data: categorias} = useCategorias()
  const {data: products, isLoading, error} = useProducts({ categoria_id: categoriaSeleccionada })

  if (isLoading) return <div>Cargando productos...</div>
  if (error) return <div>Error cargando productos</div>

  return (
    <div className="products-page">
      <h1>Productos</h1>

      <div className='category-filters'>
        <button onClick={() => setCategoriaSeleccionada(undefined)}>
          Todos
        </button>
        {categorias?.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaSeleccionada(categoria.id)}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className='products-grid'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  )
}
