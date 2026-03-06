import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">關於我們</h1>
          <p className="text-slate-500">認識 GameCredit 遊戲點數交易平台</p>
        </div>

        <div className="space-y-10">
          {/* 品牌介紹 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">GameCredit 遊戲點數</h2>
                <p className="text-sm text-slate-500">心安儲值通 經營</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              GameCredit 是台灣專業的數位遊戲點數交易平台，致力於為玩家提供最便捷、安全的遊戲點數購買服務。我們與全球多家遊戲平台合作，提供 Steam、PlayStation、Xbox、Nintendo 及各類手遊點數，讓您隨時隨地輕鬆儲值。
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              自成立以來，我們始終秉持「快速、安全、實惠」的服務理念，已為超過數萬名玩家提供優質的點數購買體驗。
            </p>
          </section>

          {/* 為什麼選擇我們 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">為什麼選擇 GameCredit？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'speed', title: '即時發卡', desc: '付款完成後，點數序號自動發送至您的信箱，無需等待人工處理。' },
                { icon: 'verified_user', title: '安全保障', desc: '採用 SSL 加密傳輸與安全支付閘道，確保每筆交易的安全性。' },
                { icon: 'savings', title: '優惠價格', desc: '定期推出限時特賣與折扣活動，讓您以最優惠的價格取得點數。' },
                { icon: 'support_agent', title: '專業客服', desc: '全年無休的客服團隊，隨時為您解答疑問並處理售後問題。' },
                { icon: 'public', title: '多平台支援', desc: '涵蓋 Steam、PSN、Xbox、Nintendo、手遊等主流遊戲平台。' },
                { icon: 'payments', title: '多元支付', desc: '支援信用卡、ATM 轉帳、超商繳費、LINE Pay 等多種付款方式。' },
              ].map((item) => (
                <div key={item.icon} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 公司資訊 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">business</span>
              公司資訊
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 mb-1">公司名稱</p>
                  <p className="font-medium">心安儲值通</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">營業項目</p>
                  <p className="font-medium">數位商品銷售、遊戲點數代理</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 mb-1">服務時間</p>
                  <p className="font-medium">全年無休（線上自動發卡 24 小時）</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">客服時間</p>
                  <p className="font-medium">週一至週日 10:00 - 22:00</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
