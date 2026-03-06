
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useCart from '../hooks/useCart'

export default function Cart() {
  const { items, removeItem, updateQuantity, totalAmount } = useCart()

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">購物車</h1>
          <p className="text-slate-500 dark:text-slate-400">確認您的商品清單並進行結帳</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">shopping_cart</span>
            <h2 className="text-xl font-bold mb-2">購物車是空的</h2>
            <p className="text-slate-500 mb-6">快去挑選您喜愛的遊戲點數吧！</p>
            <a href="/products" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">前往商店</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 購物車商品 */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                      {item.product.image_urls[0] && (
                        <img className="w-full h-full object-cover" src={item.product.image_urls[0]} alt={item.product.name} />
                      )}
                    </div>
                    <div className="flex-grow flex flex-col gap-1">
                      <h3 className="text-lg font-bold">{item.product.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">數位點數序號（立即發送）</p>
                      <span className="text-primary font-bold mt-1">NT$ {item.product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between">
                      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                        <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-12 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-sm font-medium mb-1">小計 NT$ {(item.product.price * item.quantity).toLocaleString()}</p>
                        <button onClick={() => removeItem(item.product.id)} className="text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors text-xs">
                          <span className="material-symbols-outlined text-base">delete</span>
                          <span>移除</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <a href="/products" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  <span>繼續購物</span>
                </a>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  共 <span className="text-slate-900 dark:text-white font-bold">{items.length}</span> 件商品
                </p>
              </div>
            </div>

            {/* 訂單摘要 */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-6">訂單摘要</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">商品總計</span>
                    <span className="font-medium">NT$ {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="py-4 border-y border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">折扣碼</label>
                      <div className="flex gap-2">
                        <input className="flex-grow bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm px-4 py-2" placeholder="輸入折扣碼" type="text" />
                        <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">套用</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>結帳總額</span>
                    <span className="text-primary">NT$ {totalAmount.toLocaleString()}</span>
                  </div>
                  <a href="/checkout" className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-4 shadow-lg shadow-primary/20">
                    <span>前往結帳</span>
                    <span className="material-symbols-outlined">payments</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
