import { Crown, Shield, Zap, Heart, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#1A1A2E]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A84C] rounded-full blur-[128px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A84C] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-2 mb-6">
            <Crown className="w-5 h-5 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-medium">關於我們</span>
          </div>
          <img src="/logo.png" alt="佐和點數王" className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-[0_0_20px_rgba(201,168,76,0.3)]" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            佐和<span className="text-[#C9A84C]">點數王</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            我們致力於提供最便捷、最安全的點數卡購買體驗，讓每一次交易都快速且安心。
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#C9A84C] mb-6">我們的故事</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                佐和點數王成立於對數位消費體驗的追求。我們深知在快節奏的生活中，消費者需要一個值得信賴的平台來快速購買點數卡，無需排隊、無需等待。
              </p>
              <p>
                從創立之初，我們就以「便利、快速、安全」為核心理念，打造了一個直覺且高效的線上點數卡交易平台。不論您是遊戲玩家、串流影音愛好者，還是有各種數位消費需求的用戶，佐和點數王都能滿足您的需求。
              </p>
              <p>
                我們與各大點數卡供應商建立了穩固的合作關係，確保每一張點數卡都是正品、即時發送，讓您在購買後的第一時間就能使用。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            我們的<span className="text-[#C9A84C]">核心價值</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: '快速出貨',
                desc: '付款確認後即時發送點數卡序號，全程自動化處理，讓您不必等待。',
              },
              {
                icon: Shield,
                title: '安全保障',
                desc: '採用最高規格的資料加密技術，確保每一筆交易和個人資訊的安全。',
              },
              {
                icon: Heart,
                title: '用心服務',
                desc: '專業的客服團隊隨時為您解答疑問，讓每一位客戶都感受到我們的用心。',
              },
              {
                icon: Award,
                title: '品質保證',
                desc: '所有點數卡均為正品授權，與官方供應商合作，品質有保障。',
              },
              {
                icon: Users,
                title: '客戶至上',
                desc: '以客戶需求為導向，持續優化平台功能與購物體驗，追求最佳服務。',
              },
              {
                icon: Crown,
                title: '值得信賴',
                desc: '累積眾多客戶好評與回購，我們用實力與口碑贏得您的信賴。',
              },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                  <item.icon className="w-7 h-7 text-[#C9A84C]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-10 bg-gradient-to-r from-[#1E2A3A] to-[#253448] border-[#C9A84C]/30">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              開始您的點數卡購買之旅
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              立即瀏覽我們的商品，享受最優惠的價格與最快速的服務。
            </p>
            <a href="/products" className="btn-gold inline-block px-8 py-3 rounded-xl text-lg">
              瀏覽商品
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
