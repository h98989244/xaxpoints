import { supabase } from '../lib/supabase'
import type { Coupon } from '../types'

export default function useCoupons() {
  async function validateCoupon(code: string) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !data) return { error: '折扣碼無效或已過期' }

    const coupon = data as Coupon
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
      return { error: '折扣碼已過期' }
    }
    if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
      return { error: '折扣碼已達使用上限' }
    }

    return { data: coupon }
  }

  function calculateDiscount(coupon: Coupon, amount: number): number {
    if (amount < coupon.min_order_amount) return 0
    if (coupon.discount_type === 'percentage') {
      return Math.round(amount * coupon.discount_value / 100)
    }
    return coupon.discount_value
  }

  return { validateCoupon, calculateDiscount }
}
