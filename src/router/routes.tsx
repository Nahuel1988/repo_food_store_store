import { Routes, Route } from 'react-router-dom'
import { ProductsPage } from '@/features/products/pages'
import { ProductDetailPage } from '@/features/products/pages'
import { CartPage } from '@/features/cart/pages/CartPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { OrdersPage } from '@/features/orders/pages/OrdersPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/productos/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/carrito' element={<CartPage/>}/>
      <Route path='/pedidos' element={<OrdersPage/>}/>
    </Routes>
  )
}