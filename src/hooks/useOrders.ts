import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Order, OrderItem, CartItem } from '../types'

export default function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    if (!supabase || !userId) {
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    setOrders(data ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  async function fetchOrderById(orderId: string) {
    if (!supabase) return null
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()
    return data as Order | null
  }

  async function fetchOrderItems(orderId: string) {
    if (!supabase) return []
    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
    return (data ?? []) as OrderItem[]
  }

  async function createOrder(params: {
    userId: string
    items: CartItem[]
    paymentMethod: string
    contactEmail: string
    invoiceType: string
    invoiceCarrier: string
    discountAmount?: number
    loyaltyPointsUsed?: number
  }) {
    if (!supabase) return { error: '尚未連接資料庫' }

    const totalAmount = params.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 0
    ) - (params.discountAmount ?? 0)

    // 建立訂單
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: params.userId,
        total_amount: totalAmount,
        discount_amount: params.discountAmount ?? 0,
        loyalty_points_used: params.loyaltyPointsUsed ?? 0,
        payment_method: params.paymentMethod,
        contact_email: params.contactEmail,
        invoice_type: params.invoiceType,
        invoice_carrier: params.invoiceCarrier,
      })
      .select()
      .single()

    if (orderError || !order) return { error: orderError?.message ?? '建立訂單失敗' }

    // 建立訂單明細
    const orderItems = params.items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) return { error: itemsError.message }

    return { data: order as Order }
  }

  // 管理員：取得所有訂單
  async function fetchAllOrders() {
    if (!supabase) return []
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    return (data ?? []) as Order[]
  }

  return { orders, loading, fetchOrders, fetchOrderById, fetchOrderItems, createOrder, fetchAllOrders }
}
