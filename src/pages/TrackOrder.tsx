import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { api } from '../lib/api';
import type { Order } from '../lib/types';

const statusLabel: Record<string, string> = {
  pending: '待付款',
  paid: '已付款',
  cancelled: '已取消',
};
const statusColor: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  paid: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setError('');
    setOrder(null);
    setLoading(true);
    setSearched(true);

    try {
      const data = await api.trackOrder(orderNumber.trim());
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : '查詢失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">訂單查詢</h1>
        <p className="text-gray-400">輸入訂單編號查詢訂單狀態</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="flex-1 bg-[#16213E] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
          placeholder="請輸入訂單編號"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
        >
          <Search className="w-5 h-5" />
          查詢
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-4 text-center">
          {error}
        </div>
      )}

      {!loading && searched && !error && !order && (
        <div className="text-center text-gray-400 py-10">找不到此訂單</div>
      )}

      {order && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">#{order.order_number}</h2>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${statusColor[order.payment_status] || ''}`}
            >
              {statusLabel[order.payment_status] || order.payment_status}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">建立時間</span>
              <span className="text-white">
                {new Date(order.created_at).toLocaleString('zh-TW')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">付款方式</span>
              <span className="text-white">
                {order.payment_method === 'atm' ? 'ATM 轉帳' : '超商條碼繳費'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">總金額</span>
              <span className="text-[#C9A84C] font-bold text-lg">
                NT${order.total_amount.toLocaleString()}
              </span>
            </div>
            {order.paid_at && (
              <div className="flex justify-between">
                <span className="text-gray-400">付款時間</span>
                <span className="text-green-400">
                  {new Date(order.paid_at).toLocaleString('zh-TW')}
                </span>
              </div>
            )}
          </div>

          {order.items && order.items.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#C9A84C]/10">
              <h3 className="text-sm font-medium text-gray-400 mb-3">訂單商品</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white">
                      NT${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
