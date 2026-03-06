import { useEffect, useState } from 'react'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useProducts from '../hooks/useProducts'
import useSiteSettings from '../hooks/useSiteSettings'
import type { Product } from '../types'

const defaultHero = {
  badge: '限時特賣 最高 20% 折扣',
  title_prefix: '提升您的',
  title_highlight: '遊戲體驗',
  description: '即時取得 Steam、PlayStation、Xbox 和 Mobile Legends 點數。發卡迅速，100% 安全。',
  button_text: '立即選購',
  image_url: '',
}

export default function Home() {
  const { categories, loading, fetchFeaturedProducts } = useProducts()
  const { getSetting, loading: settingsLoading } = useSiteSettings()
  const [featured, setFeatured] = useState<Product[]>([])
  const [hero, setHero] = useState(defaultHero)

  useEffect(() => {
    fetchFeaturedProducts().then(setFeatured)
  }, [fetchFeaturedProducts])

  useEffect(() => {
    if (!settingsLoading) {
      const h = getSetting('hero') as Record<string, string>
      if (h && Object.keys(h).length > 0) {
        setHero({
          badge: h.badge || defaultHero.badge,
          title_prefix: h.title_prefix || defaultHero.title_prefix,
          title_highlight: h.title_highlight || defaultHero.title_highlight,
          description: h.description || defaultHero.description,
          button_text: h.button_text || defaultHero.button_text,
          image_url: h.image_url || defaultHero.image_url,
        })
      }
    }
  }, [settingsLoading, getSetting])

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero 區塊 */}
        <section className="relative rounded-xl overflow-hidden mb-12">
          <div className="aspect-[21/9] w-full bg-slate-800 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent z-10" />
            <img
              className="w-full h-full object-cover"
              src={hero.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDP6myavyKAGP7q7TrPTaLzW-pbz77kBPgnNEMDJqNQMf8EH9EBZKueUZI-yhaVSIPNdqKGGHHsgR9gznHVZGlrsyCnWyVtzBn0xRz9zGgLWrdW4HG29RO86Om6SSWQABVXe9qL1kd6YHQi97nmF7hj2s-03P1I8gbCjFbUfImiMMk2EbovrU_H-Pai7BTWr3IWuj6WxjTfzd_EbgunNp0svREIj3mcSYZKVgqqQkBSgjS34C04GdiqbOs9Re-d4xlnYaRPBxgb4o0"}
              alt="遊戲主題橫幅"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
              {hero.badge && <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white mb-4 w-fit">{hero.badge}</span>}
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                {hero.title_prefix} <span className="text-primary">{hero.title_highlight}</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 max-w-lg">{hero.description}</p>
              <div className="flex gap-4">
                <a href="/products" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">{hero.button_text}</a>
              </div>
            </div>
          </div>
        </section>

        {/* 信任指標 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: 'speed', title: '即時發卡', desc: '付款後立即取得您的數位點數序號。' },
            { icon: 'verified_user', title: '安全支付', desc: '透過全球合作夥伴進行加密交易。' },
            { icon: 'support_agent', title: '全年無休客服', desc: '我們的團隊隨時為您提供協助。' },
          ].map((item) => (
            <div key={item.icon} className="flex items-center gap-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 精選平台（從資料庫取得） */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">精選平台</h2>
            <a className="text-primary font-semibold text-sm hover:underline" href="/products">查看全部</a>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <a href={`/products?category=${cat.slug}`} key={cat.id} className="group cursor-pointer">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 transition-all hover:border-primary">
                    <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-3xl">{cat.icon ?? 'sports_esports'}</span>
                    </div>
                    <span className="font-bold">{cat.name}</span>
                  </div>
                </a>
              ))}
              {categories.length === 0 && (
                <p className="col-span-full text-center text-slate-500 py-8">尚無分類資料</p>
              )}
            </div>
          )}
        </section>

        {/* 熱銷點數（從資料庫取得精選商品） */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">熱銷點數</h2>
            <a className="text-primary font-semibold text-sm hover:underline" href="/products">查看全部</a>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <a href={`/products/${product.id}`} key={product.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                  <div className="aspect-video relative overflow-hidden bg-slate-200 dark:bg-slate-700">
                    {product.image_urls[0] ? (
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={product.image_urls[0]} alt={product.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
                      </div>
                    )}
                    {product.tags.includes('熱門') && (
                      <div className="absolute top-2 right-2 bg-background-dark/80 backdrop-blur-sm text-xs text-white font-bold px-2 py-1 rounded">熱門</div>
                    )}
                    {product.tags.includes('特賣') && (
                      <div className="absolute top-2 right-2 bg-green-500/80 backdrop-blur-sm text-xs text-white font-bold px-2 py-1 rounded">特賣</div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{product.platform ?? product.category}</p>
                    <h3 className="font-bold mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.original_price && (
                          <span className="text-xs line-through text-slate-500">NT$ {product.original_price.toLocaleString()}</span>
                        )}
                        <span className="text-xl font-black text-primary">NT$ {product.price.toLocaleString()}</span>
                      </div>
                      <span className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md shadow-primary/20">立即購買</span>
                    </div>
                  </div>
                </a>
              ))}
              {featured.length === 0 && (
                <p className="col-span-full text-center text-slate-500 py-8">尚無精選商品</p>
              )}
            </div>
          )}
        </section>

        {/* 推薦好友橫幅 */}
        <section className="mb-16 rounded-2xl bg-primary overflow-hidden relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-primary/20">
          <div className="relative z-10 flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">推薦好友，賺取獎勵</h2>
            <p className="text-white/80 text-lg mb-6">向好友推薦 GameCredit，每位好友完成首筆交易，您即可獲得紅利點數獎勵。</p>
            <button onClick={() => { window.location.href = '/member/referral' }} className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl">獲取邀請連結</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
