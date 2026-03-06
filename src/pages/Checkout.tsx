import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card')

  const paymentOptions = [
    { key: 'credit_card', icon: 'credit_card', label: '信用卡 / 簽帳卡' },
    { key: 'atm', icon: 'account_balance', label: '虛擬 ATM 轉帳' },
    { key: 'cvs', icon: 'receipt_long', label: '超商代碼繳費' },
    { key: 'wallet', icon: 'account_balance_wallet', label: 'LINE Pay / 街口' },
  ]

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
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span>購物車</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined">radio_button_checked</span>
              <span className="font-bold">填寫資料與支付</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined">radio_button_unchecked</span>
              <span>完成訂購</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 聯絡資訊 */}
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contact_mail</span>
                聯絡資訊
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">Email（接收點數卡號）</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="example@email.com" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">手機號碼</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="0912-345-678" type="tel" />
                </div>
              </div>
            </section>

            {/* 支付方式 */}
            <section className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                支付方式
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.key}
                    className={`relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-colors ${
                      paymentMethod === opt.key
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
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
                <span className="material-symbols-outlined text-primary">description</span>
                電子發票設定
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">載具類型</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm">
                    <option>手機條碼載具</option>
                    <option>自然人憑證</option>
                    <option>捐贈發票</option>
                    <option>會員載具</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">載具代碼</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="/ABC1234" type="text" />
                </div>
              </div>
            </section>
          </div>

          {/* 訂單摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 sticky top-24">
              <h3 className="text-lg font-bold mb-4">訂單摘要</h3>
              <div className="space-y-3 mb-6">
                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center">
                  <span className="font-bold">總計金額</span>
                  <span className="text-xl font-bold text-primary">NT$ 0</span>
                </div>
              </div>
              <Link to="/order-complete/demo" className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl mb-4 shadow-lg shadow-primary/20 transition-all text-center">
                確認付款
              </Link>
              <Link to="/cart" className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-2">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                返回購物車修改
              </Link>
              <div className="mt-6 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-xs text-slate-500 leading-relaxed text-center">
                  按下確認付款即代表您已閱讀並同意本站之服務條款與退換貨政策。點數卡號將於支付成功後自動發送至您的 Email。
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
