import { Routes, Route } from 'react-router-dom'
import { ProductsPage, ProductDetailPage } from '@/features/products/pages'
import { CartPage } from '@/features/cart/pages/CartPage'
import { LoginPage, RegisterPage } from '@/features/auth/pages'
import { OrdersPage, OrderSuccessPage, OrderFailurePage, OrderPendingPage } from '@/features/orders/pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/productos/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/carrito' element={<CartPage/>}/>
      <Route path='/pedidos' element={<OrdersPage/>}/>
      <Route path='/orders/:id/success' element={<OrderSuccessPage/>}/>
      <Route path='/orders/:id/failure' element={<OrderFailurePage/>}/>
      <Route path='/orders/:id/pending' element={<OrderPendingPage/>}/>
    </Routes>
  )
}