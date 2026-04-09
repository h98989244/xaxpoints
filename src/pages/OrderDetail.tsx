import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
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

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    api
      .getOrder(id)
      .then((data) => setOrder(data.order))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, id]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-6">
        <div className="h-6 bg-[#253448] rounded w-32" />
        <div className="card p-6 space-y-4">
          <div className="h-6 bg-[#253448] rounded w-1/2" />
          <div className="h-4 bg-[#253448] rounded w-1/3" />
          <div className="h-4 bg-[#253448] rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg mb-4">找不到此訂單</p>
        <Link to="/orders" className="text-[#C9A84C] hover:text-[#E8D48B]">返回訂單列表</Link>
      </div>
    );
  }

  const st = order.payment_status;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/orders"
        className="inline-flex items-center gap-1 text-gray-400 hover:text-[#C9A84C] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回訂單列表
      </Link>

      {/* Order Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">訂單 #{order.order_number}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {new Date(order.created_at).toLocaleString('zh-TW')}
            </p>
          </div>
          <span className={`inline-flex self-start px-4 py-1.5 rounded-full text-sm font-medium border ${statusColor[st] || ''}`}>
            {statusLabel[st] || st}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-400">購買人</span>
            <p className="text-white mt-1">{order.buyer_name}</p>
          </div>
          <div>
            <span className="text-gray-400">Email</span>
            <p className="text-white mt-1">{order.buyer_email}</p>
          </div>
          <div>
            <span className="text-gray-400">電話</span>
            <p className="text-white mt-1">{order.buyer_phone}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">訂單商品</h2>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-[#C9A84C]/10 last:border-0">
              <div>
                <span className="text-white">{item.name}</span>
                <span className="text-gray-400 text-sm ml-2">x{item.quantity}</span>
              </div>
              <span className="text-[#C9A84C] font-semibold">
                NT${(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#C9A84C]/20 pt-4 mt-4 flex justify-between">
          <span className="text-gray-400 text-lg">總計</span>
          <span className="text-[#C9A84C] text-2xl font-bold">
            NT${order.total_amount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">付款資訊</h2>
        <div className="text-sm">
          <p className="text-gray-400 mb-2">
            付款方式：
            <span className="text-white">
              {order.payment_method === 'atm' ? 'ATM 轉帳' : '超商條碼繳費'}
            </span>
          </p>
          {st === 'pending' && (
            <div className="mt-4 p-5 bg-gradient-to-b from-[#16213E] to-[#1A2535] rounded-xl border border-[#C9A84C]/10 text-center">
              <div className="w-10 h-10 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">人工客服確認流程</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                因本公司銷售點數卡產品為消耗性商品，本平台為預防詐騙，於成功下單後，會轉由人工客服進行確認進行 KYC，並確認購買商品相關性問題，確保詐騙及交易糾紛。
              </p>
              <p className="text-gray-300 text-sm font-medium">
                客服確認完成後，將提供您{order.payment_method === 'atm' ? 'ATM 轉帳帳號' : '超商繳費條碼'}進行付款。
              </p>
            </div>
          )}
          {order.paid_at && (
            <p className="text-green-400 text-sm mt-2">
              付款時間：{new Date(order.paid_at).toLocaleString('zh-TW')}
            </p>
          )}
        </div>
      </div>

      {/* Card Codes */}
      {st === 'paid' && order.card_codes && order.card_codes.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">點數卡序號</h2>
          <div className="space-y-2">
            {order.card_codes.map((code, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#16213E] rounded-lg px-4 py-3">
                <code className="text-[#C9A84C] font-mono">{code}</code>
                <button
                  onClick={() => copyCode(code)}
                  className="text-gray-400 hover:text-[#C9A84C] transition-colors p-1"
                  title="複製"
                >
                  {copiedCode === code ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {order.note && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-white mb-2">備註</h2>
          <p className="text-gray-300 text-sm">{order.note}</p>
        </div>
      )}
    </div>
  );
}
