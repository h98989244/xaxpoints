// 會員資料
export interface Profile {
  id: string
  email: string
  display_name: string | null
  phone: string | null
  avatar_url: string | null
  role: 'member' | 'admin'
  loyalty_points: number
  member_level: string
  email_subscription: boolean
  referral_code: string | null
  promo_notification: boolean
  created_at: string
  updated_at: string
}

// 商品分類
export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

// 商品
export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  category_id: string | null
  category: string | null
  platform: string | null
  region: string
  image_urls: string[]
  stock: number
  is_active: boolean
  is_featured: boolean
  tags: string[]
  redemption_guide: string | null
  usage_restrictions: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

// 訂單
export interface Order {
  id: string
  order_number: string
  user_id: string
  status: '待付款' | '已付款' | '處理中' | '已完成' | '已取消' | '已退款'
  total_amount: number
  discount_amount: number
  loyalty_points_used: number
  payment_method: string | null
  payment_status: string
  contact_email: string | null
  invoice_type: string
  invoice_carrier: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

// 訂單明細
export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
  serial_number: string | null
  pin_code: string | null
  is_redeemed: boolean
  created_at: string
}

// 折扣碼
export interface Coupon {
  id: string
  code: string
  description: string | null
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_order_amount: number
  max_uses: number | null
  current_uses: number
  valid_from: string
  valid_until: string | null
  is_active: boolean
  created_at: string
}

// 網站設定
export interface SiteSetting {
  id: string
  key: string
  value: Record<string, unknown>
  updated_at: string
}

// 登入紀錄
export interface LoginLog {
  id: string
  user_id: string
  ip_address: string | null
  user_agent: string | null
  device: string | null
  location: string | null
  status: 'success' | 'failed'
  created_at: string
}

// 購物車項目（前端狀態）
export interface CartItem {
  product: Product
  quantity: number
}
