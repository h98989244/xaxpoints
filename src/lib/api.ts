import type { User, Product, OrderRaw, Stats } from './types';
import { parseOrder } from './types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface RequestOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

async function request<T>(path: string, options?: RequestOptions): Promise<T> {
  const token = localStorage.getItem('zuohe_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Request failed');
  return data as T;
}

export const api = {
  // Auth
  register: (email: string, password: string, display_name: string) =>
    request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, display_name }),
    }),
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ message: string }>('/auth/logout', { method: 'POST' }),
  getMe: () => request<{ user: User }>('/auth/me'),
  updateProfile: (data: { phone?: string; display_name?: string }) =>
    request<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Products
  getProducts: () => request<{ products: Product[] }>('/products'),
  getProduct: (id: string) => request<{ product: Product }>(`/products/${id}`),
  createProduct: (data: Partial<Product>) =>
    request<{ product: Product }>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateProduct: (id: string, data: Partial<Product>) =>
    request<{ product: Product }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteProduct: (id: string) =>
    request<{ message: string }>(`/products/${id}`, { method: 'DELETE' }),

  // Orders
  createOrder: async (data: {
    buyer_name: string;
    buyer_email: string;
    buyer_phone: string;
    payment_method: string;
    note?: string;
    items: { product_id: string; name: string; quantity: number; price: number }[];
  }) => {
    const res = await request<{ order: OrderRaw }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { order: parseOrder(res.order) };
  },
  getOrders: async () => {
    const res = await request<{ orders: OrderRaw[]; pagination?: unknown }>('/orders');
    return { orders: res.orders.map(parseOrder) };
  },
  getOrder: async (id: string) => {
    const res = await request<{ order: OrderRaw }>(`/orders/${id}`);
    return { order: parseOrder(res.order) };
  },
  updateOrder: async (id: string, data: Record<string, unknown>) => {
    const res = await request<{ order: OrderRaw }>(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return { order: parseOrder(res.order) };
  },
  trackOrder: async (orderNumber: string) => {
    const res = await request<{ order: OrderRaw }>(`/orders/track/${orderNumber}`);
    return { order: parseOrder(res.order) };
  },

  // Admin
  getStats: () => request<Stats>('/admin/stats'),
};
