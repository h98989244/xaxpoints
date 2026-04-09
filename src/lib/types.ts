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

// Items stored as JSON string in DB
export interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
}

// Raw order from API (items/card_codes are JSON strings)
export interface OrderRaw {
  id: string;
  order_number: string;
  user_id: string;
  items: string; // JSON string of OrderItem[]
  total_amount: number;
  payment_method: 'atm' | 'convenience_store';
  payment_status: 'pending' | 'paid' | 'cancelled';
  card_codes: string | null; // JSON string
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_phone: string | null;
  note: string | null;
  created_at: string;
  paid_at: string | null;
}

// Parsed order for frontend use
export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  payment_method: 'atm' | 'convenience_store';
  payment_status: 'pending' | 'paid' | 'cancelled';
  card_codes: string[] | null;
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_phone: string | null;
  note: string | null;
  created_at: string;
  paid_at: string | null;
}

export function parseOrder(raw: OrderRaw): Order {
  let items: OrderItem[] = [];
  try {
    items = typeof raw.items === 'string' ? JSON.parse(raw.items) : raw.items;
  } catch { items = []; }

  let card_codes: string[] | null = null;
  try {
    if (raw.card_codes) {
      card_codes = typeof raw.card_codes === 'string' ? JSON.parse(raw.card_codes) : raw.card_codes;
    }
  } catch { card_codes = null; }

  return { ...raw, items, card_codes };
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
