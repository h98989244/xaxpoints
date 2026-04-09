import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import type { Order } from '../lib/types';

const statusLabel: Record<string, string> = {
  pending: '待付款',
  paid: '已付款',
  cancelled: '已取消',
};
const statusColor: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  paid: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};
const paymentLabel: Record<string, string> = {
  atm: 'ATM 轉帳',
  convenience_store: '超商繳費',
};

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .getOrders()
      .then((data) => setOrders(data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/orders' }} replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">我的訂單</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-5 bg-[#253448] rounded w-1/3 mb-3" />
              <div className="h-4 bg-[#253448] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="card p-6 block hover:bg-[#253448] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-semibold">#{order.order_number}</span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColor[order.payment_status] || ''}`}
                    >
                      {statusLabel[order.payment_status] || order.payment_status}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm space-x-4">
                    <span>{new Date(order.created_at).toLocaleDateString('zh-TW')}</span>
                    <span>{paymentLabel[order.payment_method] || order.payment_method}</span>
                  </div>
                </div>
                <div className="text-[#C9A84C] text-xl font-bold">
                  NT${order.total_amount.toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-3">還沒有訂單</h2>
          <p className="text-gray-400 mb-6">快去選購喜歡的商品吧！</p>
          <Link to="/products" className="btn-gold px-6 py-3 rounded-xl inline-block">
            瀏覽商品
          </Link>
        </div>
      )}
    </div>
  );
}
