import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const faqData = [
  {
    category: '購買相關',
    items: [
      { q: '如何購買遊戲點數？', a: '選擇您想要的點數商品，加入購物車後完成結帳付款，點數序號將自動發送至您的 Email。' },
      { q: '支援哪些付款方式？', a: '我們支援信用卡/簽帳卡、虛擬 ATM 轉帳、超商代碼繳費、LINE Pay 及街口支付。' },
      { q: '付款後多久可以收到序號？', a: '信用卡付款通常即時發送，ATM/超商付款則在確認入帳後自動發送，一般不超過 30 分鐘。' },
    ],
  },
  {
    category: '兌換教學',
    items: [
      { q: '如何兌換 Steam 錢包序號？', a: '登入 Steam 帳號，前往「遊戲」>「兌換 Steam 錢包序號」，輸入序號即可完成兌換。' },
      { q: '序號有使用期限嗎？', a: '大多數平台的點數序號沒有使用期限，但建議儘快兌換以避免風險。' },
    ],
  },
  {
    category: '退換貨',
    items: [
      { q: '可以退款嗎？', a: '數位商品一經售出且序號已發送，原則上不接受退款。如有特殊情況請聯繫客服。' },
      { q: '收到的序號無法使用怎麼辦？', a: '請先確認您的帳號區域是否符合商品限制，若仍無法使用請立即聯繫客服，我們將協助處理。' },
    ],
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">常見問題</h1>
          <p className="text-slate-500">找不到答案？請聯繫我們的客服團隊</p>
        </div>

        <div className="space-y-8">
          {faqData.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">help</span>
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const key = `${section.category}-${item.q}`
                  const isOpen = openIndex === key
                  return (
                    <div key={key} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <span>{item.q}</span>
                        <span className={`material-symbols-outlined transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
