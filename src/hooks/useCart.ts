import { useState, useCallback } from 'react'
import type { Product, CartItem } from '../types'

// 從 localStorage 讀取購物車
function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem('gamecredit_cart')
    return saved ? JSON.parse(saved) as CartItem[] : []
  } catch {
    return []
  }
}

// 儲存購物車至 localStorage
function saveCart(items: CartItem[]) {
  localStorage.setItem('gamecredit_cart', JSON.stringify(items))
}

export default function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      let next: CartItem[]
      if (existing) {
        next = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        next = [...prev, { product, quantity }]
      }
      saveCart(next)
      return next
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const next = prev.filter(item => item.product.id !== productId)
      saveCart(next)
      return next
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prev => {
      const next = prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
      saveCart(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem('gamecredit_cart')
  }, [])

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clearCart, totalAmount, totalItems }
}
