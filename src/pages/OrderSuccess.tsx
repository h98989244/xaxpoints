import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Copy, Check, Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import type { Order } from '../lib/types';

const statusLabel: Record<string, string> = {
  pending: '待付款',
  paid: '已付款',
  cancelled: '已取消',
};
const statusColor: Record<string, string> = {
  pending: 'text-[#C9A84C]',
  paid: 'text-green-400',
  cancelled: 'text-red-400',
};

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedNumber, setCopiedNumber] = useState(false);

  useEffect(() => {
    if (!user || !id) return;
    api
      .getOrder(id)
      .then((data) => setOrder(data.order))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, id]);

  const copyOrderNumber = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.order_number);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg mb-4">找不到此訂單</p>
        <Link to="/orders" className="text-[#C9A84C] hover:text-[#E8D48B]">返回訂單列表</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" strokeWidth={2} />
          </div>
        </div>
        <h1 className="text-2xl font-black text-white mb-2">訂單建立成功！</h1>
        <p className="text-gray-400 text-sm">訂單已成功建立，將由人工客服進行確認</p>
      </div>

      {/* Order Info Card */}
      <div className="card p-5 mb-4">
        <h3 className="text-sm font-bold text-white mb-4">訂單資訊</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">訂單編號</span>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-mono">{order.order_number}</span>
              <button
                onClick={copyOrderNumber}
                className="text-gray-400 hover:text-[#C9A84C] transition-colors"
                title="複製訂單編號"
              >
                {copiedNumber ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">訂單日期</span>
            <span className="text-white text-sm">
              {new Date(order.created_at).toLocaleString('zh-TW')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">付款方式</span>
            <span className="text-white text-sm">
              {order.payment_method === 'atm' ? 'ATM 轉帳' : '超商條碼繳費'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">訂單狀態</span>
            <span className={`text-sm font-semibold ${statusColor[order.payment_status] || ''}`}>
              {statusLabel[order.payment_status] || order.payment_status}
            </span>
          </div>
        </div>
      </div>

      {/* Items Card */}
      <div className="card p-5 mb-4">
        <h3 className="text-sm font-bold text-white mb-4">購買內容</h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">
                {item.name} x{item.quantity}
              </span>
              <span className="text-white text-sm font-medium">
                TWD {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#C9A84C]/10 mt-4 pt-4 flex items-center justify-between">
          <span className="text-white font-bold">總計</span>
          <span className="text-[#C9A84C] font-bold text-lg">
            TWD {order.total_amount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Customer Service Flow */}
      <div className="card p-6 mb-6 text-center bg-gradient-to-b from-[#1E2A3A] to-[#1A2535] border-[#C9A84C]/20">
        <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-[#C9A84C]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-3">人工客服確認流程</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5">
          因本公司銷售點數卡產品為消耗性商品，本平台為預防詐騙，於成功下單後，會轉由人工客服進行確認進行 KYC，並確認購買商品相關性問題，確保詐騙及交易糾紛。
        </p>
        <p className="text-gray-300 text-sm font-medium">
          客服確認完成後，將提供您{order.payment_method === 'atm' ? 'ATM 轉帳帳號' : '超商繳費條碼'}進行付款。
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/orders"
          className="flex items-center justify-center gap-2 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-medium py-3 rounded-xl transition-colors text-sm"
        >
          <Package className="w-4 h-4" />
          查看訂單紀錄
        </Link>
        <Link
          to="/products"
          className="flex items-center justify-center gap-2 border border-gray-600 text-gray-300 hover:bg-[#253448] font-medium py-3 rounded-xl transition-colors text-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          繼續購物
        </Link>
      </div>
    </div>
  );
}
