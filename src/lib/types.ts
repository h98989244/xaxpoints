export interface User {
  id: string;
  email: string;
  display_name: string;
  phone: string | null;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  denomination: number;
  price: number;
  description: string;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  denomination: number;
  price: number;
  quantity: number;
  card_codes: string[] | null;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  payment_method: 'atm' | 'convenience_store';
  total_amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  note: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Stats {
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  today_orders: number;
}
