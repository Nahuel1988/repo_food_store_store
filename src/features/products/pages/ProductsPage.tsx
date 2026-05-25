import { useState } from 'react'
import { useCategorias, useProducts } from '@/features/products/hooks'
import { ProductCard } from '@/features/products/components'
import { Header } from '@/shared/components/Header'

export const ProductsPage = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | undefined>(undefined)

  const {data: categorias} = useCategorias()
  const {data: products, isLoading, error} = useProducts({ categoria_id: categoriaSeleccionada })

  if (isLoading) return <div>Cargando productos...</div>
  if (error) return <div>Error cargando productos</div>

  return (
    <>
      <Header/>

    <div className="min-h-screen bg-gray-50 px-6 py-8">

      <div className='flex gap-5 justify-center mb-10'>
        <button onClick={() => setCategoriaSeleccionada(undefined)}
        className='px-4 py-2 rounded border hover:border-transparent hover:bg-orange-400 hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:shadow-orange-400 hover:text-white transition-all'>
          Todos
        </button>
        {categorias?.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaSeleccionada(categoria.id)}
            className='px-4 py-2 rounded border hover:border-transparent hover:bg-orange-400 hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:shadow-orange-400 hover:text-white transition-all'
          >
            {categoria.nombre}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
    </>
  )
}
