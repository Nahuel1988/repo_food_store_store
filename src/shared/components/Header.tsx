import { useState, useEffect } from 'react'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { CartDrawer } from '@/features/cart/components/CartDrawer'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useCartStore()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!menuOpen) return
    const handler = () => setMenuOpen(false)
    const timer = setTimeout(() => document.addEventListener('click', handler), 0)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handler)
    }
  }, [menuOpen])

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <>
      <header className="bg-orange-400 shadow-sm px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:opacity-80 transition-opacity">🍔 Food Store</Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-orange-400 text-sm hover:ring-2 hover:ring-white/60 transition-all"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-gray-700 font-medium border-b">{user.name}</p>
                  <Link
                    to="/pedidos"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Mis pedidos
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full transition-all text-gray-800 font-medium"
            >
              Iniciar sesión
            </Link>
          )}

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full transition-all hover:shadow-md"
          >
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="bg-white text-orange-400 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}