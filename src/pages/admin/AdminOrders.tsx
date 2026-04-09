import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { api } from '../../lib/api';
import type { Order } from '../../lib/types';

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cardCodesInput, setCardCodesInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showCodesModal, setShowCodesModal] = useState<string | null>(null); // order id

  const fetchOrders = () => {
    api
      .getOrders()
      .then((data) => setOrders(data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => o.payment_status === filter);

  const markPaid = async (orderId: string) => {
    setActionLoading(true);
    try {
      await api.updateOrder(orderId, {
        payment_status: 'paid',
        paid_at: new Date().toISOString(),
      });
      fetchOrders();
    } catch {
      // ignore
    }
    setActionLoading(false);
  };

  const cancelOrder = async (orderId: string) => {
    setActionLoading(true);
    try {
      await api.updateOrder(orderId, { payment_status: 'cancelled' });
      fetchOrders();
    } catch {
      // ignore
    }
    setActionLoading(false);
  };

  const submitCardCodes = async (orderId: string) => {
    if (!cardCodesInput.trim()) return;
    setActionLoading(true);
    const codes = cardCodesInput
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);
    try {
      await api.updateOrder(orderId, { card_codes: JSON.stringify(codes) });
      setShowCodesModal(null);
      setCardCodesInput('');
      fetchOrders();
    } catch {
      // ignore
    }
    setActionLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">訂單管理</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'paid', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30'
                  : 'text-gray-400 hover:text-white border border-transparent hover:bg-[#253448]'
              }`}
            >
              {s === 'all' ? '全部' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="card p-6 animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-[#253448] rounded" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((order) => {
            const expanded = expandedId === order.id;
            const st = order.payment_status;
            return (
              <div key={order.id} className="card overflow-hidden">
                <button
                  onClick={() => setExpandedId(expanded ? null : order.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-[#253448]/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-white font-semibold">#{order.order_number}</span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColor[st] || ''}`}
                    >
                      {statusLabel[st] || st}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString('zh-TW')}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {paymentLabel[order.payment_method] || order.payment_method}
                    </span>
                    <span className="text-[#C9A84C] font-bold">
                      NT${order.total_amount.toLocaleString()}
                    </span>
                  </div>
                  {expanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {expanded && (
                  <div className="border-t border-[#C9A84C]/10 p-4 space-y-4">
                    {/* Buyer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">購買人：</span>
                        <span className="text-white ml-1">{order.buyer_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Email：</span>
                        <span className="text-white ml-1">{order.buyer_email}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">電話：</span>
                        <span className="text-white ml-1">{order.buyer_phone}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-gray-400 text-sm font-medium mb-2">商品���細</h4>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-2 border-b border-[#C9A84C]/5 last:border-0 text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-white">{item.name}</span>
                            <span className="text-gray-400">x{item.quantity}</span>
                          </div>
                          <span className="text-[#C9A84C]">
                            NT${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Card Codes Display */}
                    {order.card_codes && order.card_codes.length > 0 && (
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-2">
                          已填入序號 ({order.card_codes.length})
                        </h4>
                        <div className="space-y-1">
                          {order.card_codes.map((code, idx) => (
                            <div
                              key={idx}
                              className="bg-[#16213E] px-3 py-2 rounded text-sm font-mono text-[#C9A84C]"
                            >
                              {code}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.note && (
                      <div className="text-sm">
                        <span className="text-gray-400">���註：</span>
                        <span className="text-gray-300 ml-1">{order.note}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2 flex-wrap">
                      {st === 'pending' && (
                        <>
                          <button
                            onClick={() => markPaid(order.id)}
                            disabled={actionLoading}
                            className="bg-green-500/20 text-green-400 hover:bg-green-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            標記已付款
                          </button>
                          <button
                            onClick={() => cancelOrder(order.id)}
                            disabled={actionLoading}
                            className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            取消訂單
                          </button>
                        </>
                      )}
                      {st === 'paid' && (
                        <button
                          onClick={() => {
                            setShowCodesModal(order.id);
                            setCardCodesInput(
                              order.card_codes ? order.card_codes.join('\n') : '',
                            );
                          }}
                          className="text-sm text-[#C9A84C] hover:text-[#E8D48B] border border-[#C9A84C]/30 px-4 py-2 rounded-lg"
                        >
                          {order.card_codes && order.card_codes.length > 0
                            ? '編輯序號'
                            : '輸入序號'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">��有符合條件的訂單</div>
      )}

      {/* Card Codes Modal */}
      {showCodesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowCodesModal(null)}
          />
          <div className="relative bg-[#1E2A3A] border border-[#C9A84C]/20 rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">輸入點數卡序號</h3>
              <button
                onClick={() => setShowCodesModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-3">每行一個序號</p>
            <textarea
              value={cardCodesInput}
              onChange={(e) => setCardCodesInput(e.target.value)}
              rows={6}
              className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none mb-4"
              placeholder={"XXXX-XXXX-XXXX\nYYYY-YYYY-YYYY"}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowCodesModal(null)}
                className="flex-1 border border-[#C9A84C]/30 text-gray-300 hover:bg-[#253448] py-2.5 rounded-lg transition-colors"
              >
                取���
              </button>
              <button
                onClick={() => {
                  if (showCodesModal) {
                    submitCardCodes(showCodesModal);
                  }
                }}
                disabled={actionLoading}
                className="flex-1 btn-gold py-2.5 rounded-lg disabled:opacity-50"
              >
                {actionLoading ? '儲存中...' : '儲存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
