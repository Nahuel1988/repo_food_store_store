import { useState } from 'react'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { CartDrawer } from '@/features/cart/components/CartDrawer'

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { items } = useCartStore()

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <>
      <header className="bg-orange-400 shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">🍔 Food Store</h1>
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

      </header>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}