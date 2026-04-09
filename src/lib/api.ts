import type { User, Product, Order, Stats } from './types';

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
  createOrder: (data: {
    buyer_name: string;
    buyer_email: string;
    buyer_phone: string;
    payment_method: string;
    note?: string;
    items: { product_id: string; quantity: number }[];
  }) =>
    request<{ order: Order }>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getOrders: () => request<{ orders: Order[] }>('/orders'),
  getOrder: (id: string) => request<{ order: Order }>(`/orders/${id}`),
  updateOrder: (id: string, data: Partial<Order> & { card_codes?: Record<string, string[]> }) =>
    request<{ order: Order }>(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  trackOrder: (orderNumber: string) =>
    request<{ order: Order }>(`/orders/track/${orderNumber}`),

  // Admin
  getStats: () => request<Stats>('/admin/stats'),
};
