import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import useSiteSettings from '../../hooks/useSiteSettings'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { getSetting } = useSiteSettings()
  const general = getSetting('general') as Record<string, string>
  const siteName = general.site_name
  const logoUrl = general.logo_url || ''

  async function handleSubscribe() {
    if (!email || !supabase) return
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })
    if (error) {
      setStatus(error.code === '23505' ? 'success' : 'error')
    } else {
      setStatus('success')
    }
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 品牌資訊 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-8 w-8 object-contain" />
              ) : (
                <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
              )}
              <span className="text-xl font-bold tracking-tight">{siteName}</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              全球領先的即時數位遊戲點數交易平台。
            </p>
          </div>

          {/* 公司資訊 */}
          <div>
            <h4 className="font-bold mb-6">公司資訊</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="/about">關於我們</a></li>
              <li><a className="hover:text-primary transition-colors" href="/contact">聯絡我們</a></li>
            </ul>
          </div>

          {/* 客戶服務 */}
          <div>
            <h4 className="font-bold mb-6">客戶服務</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="/faq">常見問題</a></li>
              <li><a className="hover:text-primary transition-colors" href="/terms">服務條款</a></li>
              <li><a className="hover:text-primary transition-colors" href="/privacy">隱私權政策</a></li>
              <li><a className="hover:text-primary transition-colors" href="/refund">退款政策</a></li>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <button onClick={handleSubscribe} className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            {status === 'success' && <p className="text-xs text-green-500 mt-2">訂閱成功！感謝您的訂閱。</p>}
            {status === 'error' && <p className="text-xs text-red-500 mt-2">訂閱失敗，請稍後再試。</p>}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {siteName} 版權所有。</p>

        </div>
      </div>
    </footer>
  )
}
