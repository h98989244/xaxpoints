import { useState, type FormEvent } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { CreditCard, Building2, ShoppingBag, User, Mail, Phone, Pencil } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { api } from '../lib/api';

export default function Checkout() {
  const { user, loading: authLoading } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [buyerPhone, setBuyerPhone] = useState('');
  const [editingPhone, setEditingPhone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'atm' | 'convenience_store'>('atm');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Determine if phone needs to be entered
  const hasPhone = !!user?.phone;

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-3">購物車是空的</h2>
        <p className="text-gray-400 mb-6">請先將商品加入購物車</p>
        <Link to="/products" className="btn-gold px-6 py-3 rounded-xl inline-block">
          瀏覽商品
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const phone = hasPhone && !editingPhone ? user.phone! : buyerPhone;

    if (!phone || phone.trim().length === 0) {
      setError('請輸入手機號碼');
      return;
    }

    setSubmitting(true);

    try {
      // Save phone to profile if it's new or changed
      if (!hasPhone || (editingPhone && buyerPhone !== user.phone)) {
        await api.updateProfile({ phone: phone.trim() });
      }

      const data = await api.createOrder({
        buyer_name: user.display_name,
        buyer_email: user.email,
        buyer_phone: phone.trim(),
        payment_method: paymentMethod,
        note: note || undefined,
        items: items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });
      clearCart();
      navigate(`/orders/${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '訂單建立失敗');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">結帳</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Buyer Info - Auto-filled, read-only */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">購買人資訊</h2>
            <div className="space-y-4">
              {/* Name - from account */}
              <div className="flex items-center gap-3 p-3 bg-[#16213E] rounded-lg">
                <User className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">姓名</p>
                  <p className="text-white font-medium truncate">{user.display_name}</p>
                </div>
              </div>

              {/* Email - from account */}
              <div className="flex items-center gap-3 p-3 bg-[#16213E] rounded-lg">
                <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">電子信箱</p>
                  <p className="text-white font-medium truncate">{user.email}</p>
                </div>
              </div>

              {/* Phone - show saved value or input */}
              {hasPhone && !editingPhone ? (
                <div className="flex items-center gap-3 p-3 bg-[#16213E] rounded-lg">
                  <Phone className="w-5 h-5 text-[#C9A84C] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">手機號碼</p>
                    <p className="text-white font-medium">{user.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBuyerPhone(user.phone || '');
                      setEditingPhone(true);
                    }}
                    className="text-gray-400 hover:text-[#C9A84C] transition-colors p-1"
                    title="修改手機號碼"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-[#C9A84C]" />
                      手機號碼 {!hasPhone && <span className="text-[#C9A84C] text-xs">（首次下單需填寫，之後自動帶入）</span>}
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                    placeholder="09xx-xxx-xxx"
                    autoFocus={!hasPhone}
                  />
                  {editingPhone && (
                    <button
                      type="button"
                      onClick={() => setEditingPhone(false)}
                      className="text-sm text-gray-400 hover:text-[#C9A84C] mt-1"
                    >
                      取消修改
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">付款方式</h2>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'atm'
                    ? 'border-[#C9A84C] bg-[#C9A84C]/5'
                    : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/40'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="atm"
                  checked={paymentMethod === 'atm'}
                  onChange={() => setPaymentMethod('atm')}
                  className="accent-[#C9A84C]"
                />
                <Building2 className="w-5 h-5 text-[#C9A84C]" />
                <div>
                  <div className="text-white font-medium">ATM 轉帳</div>
                  <div className="text-gray-400 text-sm">透過 ATM 或網銀轉帳付款</div>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'convenience_store'
                    ? 'border-[#C9A84C] bg-[#C9A84C]/5'
                    : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/40'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="convenience_store"
                  checked={paymentMethod === 'convenience_store'}
                  onChange={() => setPaymentMethod('convenience_store')}
                  className="accent-[#C9A84C]"
                />
                <CreditCard className="w-5 h-5 text-[#C9A84C]" />
                <div>
                  <div className="text-white font-medium">超商條碼繳費</div>
                  <div className="text-gray-400 text-sm">至超商使用條碼繳費</div>
                </div>
              </label>
            </div>

            {/* Payment Info */}
            <div className="mt-4 p-4 bg-[#16213E] rounded-lg">
              {paymentMethod === 'atm' ? (
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-[#C9A84C] mb-2">ATM 轉帳資訊</p>
                  <p>請於下單後依據訂單頁面顯示的帳號進行轉帳。</p>
                  <p className="mt-1 text-gray-400">轉帳完成後系統將自動確認並發送點數卡。</p>
                </div>
              ) : (
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-[#C9A84C] mb-2">超商條碼繳費</p>
                  <p>下單後將產生繳費條碼，請至超商出示條碼繳費。</p>
                  <p className="mt-1 text-gray-400">繳費完成後系統將自動確認並發送點數卡。</p>
                </div>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">備註</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              placeholder="有任何需要備註的事項嗎？（選填）"
            />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">訂單摘要</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-white font-medium">
                    NT${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#C9A84C]/10 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400 text-lg">總計</span>
                <span className="text-[#C9A84C] text-2xl font-bold">
                  NT${totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full py-3 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '訂單建立中...' : '確認下單'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
