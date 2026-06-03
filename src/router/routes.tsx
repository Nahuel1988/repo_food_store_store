import { Routes, Route } from 'react-router-dom'
import { ProductsPage } from '@/features/products/pages'
import { ProductDetailPage } from '@/features/products/pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/productos/:id" element={<ProductDetailPage />} />
    </Routes>
  )
}