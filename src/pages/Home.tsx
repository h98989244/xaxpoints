import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Home() {
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP6myavyKAGP7q7TrPTaLzW-pbz77kBPgnNEMDJqNQMf8EH9EBZKueUZI-yhaVSIPNdqKGGHHsgR9gznHVZGlrsyCnWyVtzBn0xRz9zGgLWrdW4HG29RO86Om6SSWQABVXe9qL1kd6YHQi97nmF7hj2s-03P1I8gbCjFbUfImiMMk2EbovrU_H-Pai7BTWr3IWuj6WxjTfzd_EbgunNp0svREIj3mcSYZKVgqqQkBSgjS34C04GdiqbOs9Re-d4xlnYaRPBxgb4o0"
              alt="遊戲主題橫幅"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white mb-4 w-fit">限時特賣 最高 20% 折扣</span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                提升您的 <span className="text-primary">遊戲體驗</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 max-w-lg">即時取得 Steam、PlayStation、Xbox 和 Mobile Legends 點數。發卡迅速，100% 安全。</p>
              <div className="flex gap-4">
                <Link to="/products" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">立即選購</Link>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/20 transition-all">查看優惠</button>
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

        {/* 精選平台 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">精選平台</h2>
            <Link className="text-primary font-semibold text-sm hover:underline" to="/products">查看全部</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Steam', slug: 'steam', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz0eOuCr96mEA4PjNAvvhjHI1wjFnQ5DPd7-YNZCw0mhIBkhP1XRcoNTJJVX7-LtzzmMtMJNs2lLLqNHbLQRY162CuDjWbZgQPoO9rACYhWNTqBXRyyJuEWNXy22ajOaspyST_p3r5KHUMjaZ_e9Zh-y96xGt61SilSsF580SFOcLSM92UE1EJ-skEp92rVBU23uKdcvwPtgIRfg84kFXjZBv7oA3XV6Q6avTYOhLee2_jA4QnotyufG6El7DNnHJNHkVkXM_Gf1k' },
              { name: 'PlayStation', slug: 'playstation', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn8Mko4zyF4ptcAFNuRNI4IQSD3vBU8_m7Rf_aWKw2ENsDXQSz4oAhlLNwSnUoI4PZD09mrnZxQzMbPD8s2Dd3qO8b3T0U2HhLfjFeS0Ya1otiLQ83APFTNGWJsp3hEW9grdPq0lNVIPa0-w6q-hCoX6RWvGjfpMGYGdWAWnPlWDBGQBvAjAWiAtEnC1jiTUWHigOxAHkR4VLmW-ePFx7nDnUq6lZZozlX1yyzZZFUtro6XQefeIZIC01Hn5w-wk1RZ66b06Cx-98' },
              { name: 'Xbox', slug: 'xbox', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpaBBguKn_SkbCRJSQWwFJUIceUkufaGbvLCvbvoCFlgER5ecbYyPQTvmFA2QXCih2KgDr5qMB_V_lvHTq8OtFspADlw4HZsRNNZNdn7IXk03yI5Og6YQjStVFAZ5zuyPdqNLenjLHWLcG2ySRsxzSgIuO2eZThTA65VNlAjRcGZntBS4ngwjLdWJbyuGrnayQjtTrOOHSxoOhHXgmvFczZ4_MjqTFVo2qXPYogjdD3Pf8O3hVliqFY9FPV2BB5EqyVyjZn-CIs8Y' },
              { name: 'Nintendo', slug: 'nintendo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ZBQhVHrH2vvrt9xhSfkFsO0JzQsYPOOFsanl8L1K_1AELuMTLDZnEZLDQoDWhtr8k-9IrPSOVZUwa1I8VEf9Ny8a02jGDW5YhjJ1frooN0HPMuwCQrkexm7uyF8ivmWOa47vlEAFyN8b6XFPg8WY9LHFjzVfp-5FJSEdfe90v7kyrj79rX5QwZqYVdkOywjVSatzoPj_MX6EKYA94i6eLLandr72LwVerQ7I0_9h--k4jkaaJpbbZA-wq6KnA_rlLt0G_0WSqfo' },
              { name: '無盡對決', slug: 'mobile', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5hxF4KHtpo6rFx26pAKcGmyRN7XnQ67arJO4X7TM0q6QEqo4ILHUFMUVwut3qlpMVLzistw_IzTi6kkse0dIsdH8S5zzz32467qtojMi2pEtUHfxNzOS0x2RUFeTDSYOkkNyL1B97zSqdhHQSK4JjHu0c-PkqGWSF1qwieaKqNzMpVfLoAMD7-yMEmKUM0hlsmMlyjUZ5CzBaRj7t4L97euS7ssvCGv46ohbc_W9p0VJEjveJ7xgfiHmHT1xI5ZcRZr-w3HoL68A' },
              { name: '絕地求生 M', slug: 'mobile', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmk9xepAHs1REY_4UfJdf0ZdTndbwlcMypuLLpV3ZEdso6aynW2IuW8roEB1MhqiRmGPk_OxTcpBshwSbxwuqF2P8UzJai1bOLag6PDqNxv2nPO7-zReP-3r6_sKu25VhRB6F0WFtWFkvR4emnSZIcn4uDfjhVegF3KHQ0p1bAkRvSa7MkQuWzmS6evtepCgKkxdxsSBLn4zJMZRYK0796WWKUhFq24RyJ_U0lY4ODo9T7o7NppAafIelZabPSTAUmmbz9QECZ5tM' },
            ].map((platform) => (
              <Link to={`/products?category=${platform.slug}`} key={platform.name} className="group cursor-pointer">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 transition-all hover:border-primary">
                  <div className="size-16 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <img className="w-full h-full object-cover" src={platform.img} alt={platform.name} />
                  </div>
                  <span className="font-bold">{platform.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 熱銷點數 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">熱銷點數</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { platform: 'Steam 爭氣卡', name: '$50 USD 數位禮物卡', price: '$47.50', original: '$50.00', tag: '熱門', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0xKNrzIZLPVOikIFdROr2wcvMpPTkJ2DBvEzyKiWvy2o1M3PtD2IAPJVPiNrmRH9iZe7Tm8t04tJEsL92jsGMpiAnSWLf9HXzjj_aXwBboIb6LCMFOEGpdPtoSaU-iOyMrOWAnv2E6J1951MFfDVQmAFR99fTeA6NTGIRGs3pvXvYVR-FVj7f02wXCCPkHI9f8llcja2l4mmt_bFoKUZ2OScAbFDZx5nZvIedrcVYWgvC-_eJMi6z2xhDI93ZvpMjkLA2R2ei-U' },
              { platform: 'PlayStation Store', name: '$25 USD 數位禮物卡', price: '$25.00', original: null, tag: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4XeMbjx0PGeXk5Scl8LtZuAUoHGTdBilBDA1G3bkWMI5sp5n5z6mUDHRvL2Pdel-iRAXIJVNR4zlEvbLsj1JepN56B49o37KyOWSloD93VkNCZqtGIFRP3mGq3vyRbYS4vtBdnsWelp5aznHyJYFBSxYLpQztfTpsFBMQTRbvwKE7jYoetr1eSY0RhmK32eT8TJz3xJUWHmtouoq4tcxlNCkrgibWxlKlJuq1vXhmgrFJbpHoHO4ymyvy91HF-zuUt8DXUS-y6c' },
              { platform: '無盡對決', name: '1000 鑽石儲值', price: '$15.99', original: '$20.00', tag: '特賣', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPbr4HlDkRbI1DRF4R1zWGblb0-E0TjJ8CMceBDhJDMbtXzuLtK7nYZhSqXaA6ZU13HcnsyuKyxhrmtdIA_FmiOW3FYgp-8YC-PMnX0PumTLa80vzUOwTy9INg0vq03HIOPiNeKde1E5MQt2dp77Ir4QhDhrNAQWWR8kSQIteYqYjrthgK_T7q6psKChD2mdIcgrLTR0HW9qCvNvbvYgkLlirurFAXyvTnVWPiIo3ICoSvgV5_CYB60PShNOU9X_LgymO_1y4DM_w' },
              { platform: 'Xbox 網路', name: 'Game Pass Ultimate 3 個月', price: '$44.99', original: null, tag: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2hDOdt4tunVheFaSI1Nw-FbILDrUx9uSCE2tUhL2omwNSBAH67v8vyclcqG_oktjnLdK61OpAm9KkZ7YBloCfaUmZAP5kk0NAmigmNnRRqP551Nzi-zlUL7E2y10Kg8BL6CQlHxFl2At-l01BBMFcB6CwTzgal8Q1gT8GTqH-i2qfilYVqRM2geI8hO-SAIgSyLVV5IbJgyYZhOXgNwPp3G7NGM8p5nPCtYPlhXVm-KUichHyxc6jKZYeI4elHSxJxMUxtKwt8M' },
            ].map((product) => (
              <div key={product.name} className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                <div className="aspect-video relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={product.img} alt={product.name} />
                  {product.tag && (
                    <div className={`absolute top-2 right-2 backdrop-blur-sm text-xs text-white font-bold px-2 py-1 rounded ${product.tag === '特賣' ? 'bg-green-500/80' : 'bg-background-dark/80'}`}>
                      {product.tag}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{product.platform}</p>
                  <h3 className="font-bold mb-4">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.original && <span className="text-xs line-through text-slate-500">{product.original}</span>}
                      <span className="text-xl font-black text-primary">{product.price}</span>
                    </div>
                    <Link to="/products" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md shadow-primary/20">立即購買</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 推薦好友橫幅 */}
        <section className="mb-16 rounded-2xl bg-primary overflow-hidden relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-primary/20">
          <div className="relative z-10 flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">推薦好友，賺取 $5 獎勵</h2>
            <p className="text-white/80 text-lg mb-6">向好友推薦 GameCredit，每位好友完成首筆交易，您即可獲得獎勵。</p>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl">獲取邀請連結</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
