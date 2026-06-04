import { create } from 'zustand'
import type { CartItem } from '@/features/cart/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (producto_id: number) => void
  updateCantidad: (producto_id: number, cantidad: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) => set((state) => {
    const existe = state.items.find(i => i.producto_id === item.producto_id)
    if (existe) {
      return {
        items: state.items.map(i =>
          i.producto_id === item.producto_id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      }
    }
    return { items: [...state.items, item] }
  }),

  removeItem: (producto_id) => set((state) => ({
    items: state.items.filter(i => i.producto_id !== producto_id)
  })),

  updateCantidad: (producto_id, cantidad) => set((state) => ({
    items: state.items.map(i =>
      i.producto_id === producto_id ? { ...i, cantidad } : i
    )
  })),

  clearCart: () => set({ items: [] }),
}))