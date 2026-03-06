import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useCart from '../hooks/useCart'
import useAuth from '../hooks/useAuth'
import useOrders from '../hooks/useOrders'
import useCoupons from '../hooks/useCoupons'
import type { Coupon } from '../types'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, totalAmount, clearCart } = useCart()
  const { user } = useAuth()
  const { createOrder } = useOrders(user?.id)
  const { validateCoupon, calculateDiscount } = useCoupons()

  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [contactEmail, setContactEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('')
  const [invoiceType, setInvoiceType] = useState('手機條碼載具')
  const [invoiceCarrier, setInvoiceCarrier] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponError, setCouponError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const discountAmount = appliedCoupon ? calculateDiscount(appliedCoupon, totalAmount) : 0
  const finalAmount = totalAmount - discountAmount

  async function handleApplyCoupon() {
    setCouponError('')
    const result = await validateCoupon(couponCode)
    if ('error' in result && result.error) {
      setCouponError(typeof result.error === 'string' ? result.error : '折扣碼無效')
      setAppliedCoupon(null)
    } else if ('data' in result && result.data) {
      setAppliedCoupon(result.data)
    }
  }

  async function handleSubmit() {
    if (!user) {
      navigate('/login')
      return
    }
    if (items.length === 0) return

    setSubmitting(true)
    setError('')

    const result = await createOrder({
      userId: user.id,
      items,
      paymentMethod,
      contactEmail,
      invoiceType,
      invoiceCarrier,
      discountAmount,
    })

    if ('error' in result && result.error) {
      setError(typeof result.error === 'string' ? result.error : '建立訂單失敗')
      setSubmitting(false)
      return
    }

    if ('data' in result && result.data) {
      clearCart()
      navigate(`/order-complete/${result.data.id}`)
    }
  }

  const paymentOptions = [
    { key: 'credit_card', icon: 'credit_card', label: '信用卡 / 簽帳卡' },
    { key: 'atm', icon: 'account_balance', label: '虛擬 ATM 轉帳' },
    { key: 'cvs', icon: 'receipt_long', label: '超商代碼繳費' },
    { key: 'wallet', icon: 'account_balance_wallet', label: 'LINE Pay / 街口' },
  ]

  if (items.length === 0) {
    return (
      <><Navbar />
        <main className="max-w-md mx-auto px-4 py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">shopping_cart</span>
          <h1 className="text-xl font-bold mb-2">購物車是空的</h1>
          <Link to="/products" className="text-primary font-bold">前往商店</Link>
        </main>
      <Footer /></>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
        {/* 進度條 */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">結帳進度</span>
            <span className="text-sm font-bold text-primary">66%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '66%' }} />
          </div>
          <div className="flex justify-between mt-4 text-xs sm:text-sm">
            <div className="flex flex-col items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-primary">check_circle</span><span>購物車</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined">radio_button_checked</span><span className="font-bold">填寫資料與支付</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined">radio_button_unchecked</span><span>完成訂購</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 聯絡資訊 */}
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contact_mail</span>聯絡資訊
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">Email（接收點數卡號）</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">手機號碼</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912-345-678" type="tel" />
                </div>
              </div>
            </section>

            {/* 支付方式 */}
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>支付方式
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.key}
                    className={`relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-colors ${
                      paymentMethod === opt.key ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                    }`}
                  >
                    <input className="hidden" name="payment" type="radio" checked={paymentMethod === opt.key} onChange={() => setPaymentMethod(opt.key)} />
                    <span className={`material-symbols-outlined mr-3 ${paymentMethod === opt.key ? 'text-primary' : 'text-slate-400'}`}>{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                    {paymentMethod === opt.key && <span className="material-symbols-outlined text-primary absolute right-4">check_circle</span>}
                  </label>
                ))}
              </div>
            </section>

            {/* 電子發票 */}
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>電子發票設定
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">載具類型</label>
                  <select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary px-4 py-3 text-sm">
                    <option>手機條碼載具</option>
                    <option>自然人憑證</option>
                    <option>捐贈發票</option>
                    <option>會員載具</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">載具代碼</label>
                  <input value={invoiceCarrier} onChange={(e) => setInvoiceCarrier(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary px-4 py-3 text-sm" placeholder="/ABC1234" />
                </div>
              </div>
            </section>
          </div>

          {/* 訂單摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 sticky top-24">
              <h3 className="text-lg font-bold mb-4">訂單摘要</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-slate-400">{item.product.name} x {item.quantity}</span>
                    <span>NT$ {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* 折扣碼 */}
              <div className="py-4 border-y border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex gap-2">
                  <input className="flex-grow bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary" placeholder="折扣碼" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                  <button onClick={handleApplyCoupon} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">套用</button>
                </div>
                {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
                {appliedCoupon && <p className="text-green-500 text-xs">已套用折扣碼：-NT$ {discountAmount.toLocaleString()}</p>}
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">商品小計</span>
                  <span>NT$ {totalAmount.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>折扣</span>
                    <span>-NT$ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>總計金額</span>
                  <span className="text-primary">NT$ {finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !contactEmail}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl mt-4 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
              >
                {submitting ? '處理中...' : '確認付款'}
              </button>
              <Link to="/cart" className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-2 mt-2">
                <span className="material-symbols-outlined text-sm">arrow_back</span>返回購物車修改
              </Link>
              <div className="mt-4 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-xs text-slate-500 leading-relaxed text-center">
                  按下確認付款即代表您已閱讀並同意本站之<Link to="/terms" className="text-primary">服務條款</Link>與退換貨政策。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
