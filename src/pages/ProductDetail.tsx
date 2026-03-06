import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useProducts from '../hooks/useProducts'
import useCart from '../hooks/useCart'
import type { Product } from '../types'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { fetchProductById } = useProducts()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchProductById(id).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [id, fetchProductById])

  function handleAddToCart() {
    if (!product) return
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <><Navbar /><LoadingSpinner /><Footer /></>
  if (!product) return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">search_off</span>
        <h1 className="text-2xl font-bold mb-2">找不到商品</h1>
        <a href="/products" className="text-primary font-bold hover:underline">返回商品列表</a>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto w-full px-6 lg:px-10 py-8">
        {/* 麵包屑 */}
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
          <a className="text-slate-500 hover:text-primary" href="/">首頁</a>
          <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
          <a className="text-slate-500 hover:text-primary" href="/products">商品列表</a>
          <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 左側：商品圖片 */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-2xl">
                {product.image_urls[0] ? (
                  <img className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" src={product.image_urls[0]} alt={product.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-400">image</span>
                  </div>
                )}
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
                <span className="text-sm flex items-center gap-1">
                  {product.stock > 0 ? (
                    <><span className="material-symbols-outlined text-sm text-green-500">check_circle</span><span className="text-slate-500">有現貨（{product.stock}）</span></>
                  ) : (
                    <><span className="material-symbols-outlined text-sm text-red-500">cancel</span><span className="text-red-500">已售完</span></>
                  )}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">{product.name}</h1>
              {product.platform && <p className="text-slate-500 text-lg">平台：{product.platform} | 區域：{product.region}</p>}
            </div>

            {/* 價格區塊 */}
            <div className="flex flex-col gap-6 p-6 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-primary">NT$ {product.price.toLocaleString()}</span>
                {product.original_price && (
                  <span className="text-slate-500 line-through text-lg">NT$ {product.original_price.toLocaleString()}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-10 flex items-center justify-center text-slate-500 hover:text-primary">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="size-10 flex items-center justify-center text-slate-500 hover:text-primary">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {added ? '已加入！' : '加入購物車'}
                </button>
                <a
                  href="/checkout"
                  onClick={handleAddToCart}
                  className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all text-center"
                >
                  立即購買
                </a>
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
                <div className="space-y-4 text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {product.description || '暫無商品描述。'}
                </div>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-4 text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {product.redemption_guide || '暫無兌換教學。'}
                </div>
              )}

              {activeTab === 'restrictions' && (
                <div className="space-y-4 text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {product.usage_restrictions || '暫無使用限制說明。'}
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
