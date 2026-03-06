import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const mockProducts = [
  { id: '1', name: 'Steam $50 爭氣卡', platform: 'Steam', price: 47.5, originalPrice: 50, tag: '熱門', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0xKNrzIZLPVOikIFdROr2wcvMpPTkJ2DBvEzyKiWvy2o1M3PtD2IAPJVPiNrmRH9iZe7Tm8t04tJEsL92jsGMpiAnSWLf9HXzjj_aXwBboIb6LCMFOEGpdPtoSaU-iOyMrOWAnv2E6J1951MFfDVQmAFR99fTeA6NTGIRGs3pvXvYVR-FVj7f02wXCCPkHI9f8llcja2l4mmt_bFoKUZ2OScAbFDZx5nZvIedrcVYWgvC-_eJMi6z2xhDI93ZvpMjkLA2R2ei-U' },
  { id: '2', name: 'PlayStation Store $25 儲值碼', platform: 'PlayStation', price: 25, originalPrice: null, tag: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4XeMbjx0PGeXk5Scl8LtZuAUoHGTdBilBDA1G3bkWMI5sp5n5z6mUDHRvL2Pdel-iRAXIJVNR4zlEvbLsj1JepN56B49o37KyOWSloD93VkNCZqtGIFRP3mGq3vyRbYS4vtBdnsWelp5aznHyJYFBSxYLpQztfTpsFBMQTRbvwKE7jYoetr1eSY0RhmK32eT8TJz3xJUWHmtouoq4tcxlNCkrgibWxlKlJuq1vXhmgrFJbpHoHO4ymyvy91HF-zuUt8DXUS-y6c' },
  { id: '3', name: '無盡對決 1000 鑽石', platform: '手遊點數', price: 15.99, originalPrice: 20, tag: '特賣', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPbr4HlDkRbI1DRF4R1zWGblb0-E0TjJ8CMceBDhJDMbtXzuLtK7nYZhSqXaA6ZU13HcnsyuKyxhrmtdIA_FmiOW3FYgp-8YC-PMnX0PumTLa80vzUOwTy9INg0vq03HIOPiNeKde1E5MQt2dp77Ir4QhDhrNAQWWR8kSQIteYqYjrthgK_T7q6psKChD2mdIcgrLTR0HW9qCvNvbvYgkLlirurFAXyvTnVWPiIo3ICoSvgV5_CYB60PShNOU9X_LgymO_1y4DM_w' },
  { id: '4', name: 'Xbox Game Pass Ultimate 3 個月', platform: 'Xbox', price: 44.99, originalPrice: null, tag: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2hDOdt4tunVheFaSI1Nw-FbILDrUx9uSCE2tUhL2omwNSBAH67v8vyclcqG_oktjnLdK61OpAm9KkZ7YBloCfaUmZAP5kk0NAmigmNnRRqP551Nzi-zlUL7E2y10Kg8BL6CQlHxFl2At-l01BBMFcB6CwTzgal8Q1gT8GTqH-i2qfilYVqRM2geI8hO-SAIgSyLVV5IbJgyYZhOXgNwPp3G7NGM8p5nPCtYPlhXVm-KUichHyxc6jKZYeI4elHSxJxMUxtKwt8M' },
]

const categories = ['全部', 'Steam', 'PlayStation', 'Xbox', 'Nintendo', '手遊點數', '禮物卡']

export default function ProductList() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 麵包屑 */}
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium">
          <Link className="text-slate-500 hover:text-primary" to="/">首頁</Link>
          <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
          <span className="text-primary">商品列表</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">所有商品</h1>
          <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary">
            <option>推薦排序</option>
            <option>價格低到高</option>
            <option>價格高到低</option>
            <option>最新上架</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左側篩選 */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-bold mb-4">平台分類</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cat === '全部' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">面額範圍</h3>
              <div className="space-y-2 text-sm">
                {['$100 以下', '$100 - $500', '$500 - $1000', '$1000 以上'].map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary" />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* 右側商品網格 */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                <div className="aspect-video relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={product.img} alt={product.name} />
                  {product.tag && (
                    <div className={`absolute top-2 right-2 backdrop-blur-sm text-xs text-white font-bold px-2 py-1 rounded ${product.tag === '特賣' ? 'bg-green-500/80' : 'bg-background-dark/80'}`}>
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                    {product.platform}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && <span className="text-xs line-through text-slate-500">${product.originalPrice.toFixed(2)}</span>}
                      <span className="text-xl font-black text-primary">${product.price.toFixed(2)}</span>
                    </div>
                    <span className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md shadow-primary/20">立即購買</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
