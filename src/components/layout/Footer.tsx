import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 品牌資訊 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
              <span className="text-xl font-bold tracking-tight">GameCredit 遊戲點數</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              全球領先的即時數位遊戲點數交易平台。
            </p>
          </div>

          {/* 公司資訊 */}
          <div>
            <h4 className="font-bold mb-6">公司資訊</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-primary transition-colors" to="/about">關於我們</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/contact">聯絡我們</Link></li>
            </ul>
          </div>

          {/* 客戶服務 */}
          <div>
            <h4 className="font-bold mb-6">客戶服務</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-primary transition-colors" to="/faq">常見問題</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/terms">服務條款</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/privacy">隱私權政策</Link></li>
              <li><Link className="hover:text-primary transition-colors" to="/refund">退款政策</Link></li>
            </ul>
          </div>

          {/* 訂閱電子報 */}
          <div>
            <h4 className="font-bold mb-6">訂閱電子報</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">獲取最新優惠和點數上架資訊。</p>
            <div className="flex gap-2">
              <input
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 focus:ring-primary"
                placeholder="電子郵件地址"
                type="email"
              />
              <button className="bg-primary text-white p-2 rounded-lg">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} GameCredit 心安心食品有限公司 版權所有。</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-xl">payments</span>
            <span className="material-symbols-outlined text-xl">credit_card</span>
            <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
