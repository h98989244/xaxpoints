import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto w-full px-6 lg:px-10 py-8">
        {/* 麵包屑 */}
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
          <Link className="text-slate-500 hover:text-primary" to="/">首頁</Link>
          <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
          <Link className="text-slate-500 hover:text-primary" to="/products">Steam</Link>
          <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
          <span className="text-primary">Steam $50 爭氣卡 / 錢包儲值碼</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 左側：商品圖片 */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-2xl">
                <img
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuClM1iFFMfDtoyHBnvwnmdxsDLuIFw4-ny9JR-0n8SYPH02IN7nt_KMTLFBdF8hEYMJrOfVrikm4TuyECfyxsDEzzdKrugLMwshXYknYTTBw9L6LB3bvq0k_Wu1b8XqGd3Ld78t381XMXaJhtHIEMWQu3d-dKAc2dsxuNOfX15TXrrrwREctZnnrepUYanuvxlnOddzygSwullV2iz9Lu5HrsASmBWFihuazeVVz1m69RmwEIhngbLjm83GhFcqKmnaxJ7Olj3ed2A"
                  alt="Steam $50 數位禮物卡"
                />
              </div>
              <div className="mt-6 flex gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined">warning</span>
                <p className="text-sm font-medium">數位產品經售出後恕不退換，請確保您的帳號區域符合產品限制。</p>
              </div>
            </div>
          </div>

          {/* 右側：商品資訊 */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">即時發卡</span>
                <span className="text-slate-500 text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-green-500">check_circle</span> 有現貨
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">Steam $50 爭氣卡 / 錢包儲值碼</h1>
              <p className="text-slate-500 text-lg">為您的 Steam 錢包儲值，盡情暢玩您喜愛的遊戲。</p>
            </div>

            {/* 價格與面額選擇 */}
            <div className="flex flex-col gap-6 p-6 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-primary">$50.00</span>
                <span className="text-slate-500 line-through text-lg">$52.00</span>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">選擇面額</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {['$10', '$20', '$50', '$100'].map((amount) => (
                    <button
                      key={amount}
                      className={`px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                        amount === '$50' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-800 hover:border-primary'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-10 flex items-center justify-center text-slate-500 hover:text-primary">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="size-10 flex items-center justify-center text-slate-500 hover:text-primary">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <button className="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">shopping_cart</span> 加入購物車
                </button>
                <button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all">
                  立即購買
                </button>
              </div>
            </div>

            {/* 商品分頁 */}
            <div className="mt-4">
              <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto whitespace-nowrap">
                {[
                  { key: 'description', label: '商品描述' },
                  { key: 'guide', label: '兌換教學' },
                  { key: 'restrictions', label: '使用限制' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-4 font-medium ${
                      activeTab === tab.key ? 'text-primary font-bold border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <div className="space-y-4 text-slate-600 dark:text-slate-400">
                  <p>Steam 錢包儲值碼就像禮物卡一樣，可以在 Steam 上兌換，用於購買遊戲、軟體、錢包餘額或任何可在 Steam 上購買的商品。</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>可存取超過 30,000 款從 3A 大作到獨立遊戲的各種作品。</li>
                    <li>享受專屬優惠、自動遊戲更新和其他優質福利。</li>
                    <li>送禮給好友、交易物品，甚至在 Steam 工作坊為遊戲創作新內容。</li>
                    <li>加入 Steam 社群。結識新朋友、加入群組、建立戰隊，並在遊戲中聊天。</li>
                  </ul>
                </div>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-6">
                  {[
                    '登入您的 Steam 帳號，前往遊戲選單中的「兌換 Steam 錢包序號」。',
                    '輸入您在訂單中收到的序號，然後點擊「繼續」。',
                    '金額將加入您的帳戶，即可開始使用。祝您遊戲愉快！',
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="size-8 flex-shrink-0 bg-primary text-white flex items-center justify-center rounded-full font-bold text-sm">{i + 1}</span>
                      <p className="text-slate-600 dark:text-slate-400">{step}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'restrictions' && (
                <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <ul className="space-y-4">
                    {[
                      { icon: 'public', title: '區域限制', desc: '此序號僅適用於美國（USD）地區註冊的帳號。' },
                      { icon: 'event_busy', title: '有效期限', desc: 'Steam 錢包序號沒有使用期限。' },
                      { icon: 'info', title: '帳號驗證', desc: '使用者可能需要在 Steam 上完成手機驗證才能使用錢包餘額。' },
                    ].map((item) => (
                      <li key={item.icon} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-0.5">{item.icon}</span>
                        <div>
                          <p className="font-bold">{item.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
