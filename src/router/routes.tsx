import { Routes, Route } from 'react-router-dom'
import { ProductsPage } from '@/features/products/pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      {/* Agrega más rutas aquí */}
    </Routes>
  )
}
