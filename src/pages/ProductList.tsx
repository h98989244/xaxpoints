import { useEffect, useState, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useProducts from '../hooks/useProducts'
import type { Product } from '../types'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { categories, loading: catLoading, fetchFilteredProducts } = useProducts()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') ?? '')

  const activeCategory = searchParams.get('category') ?? 'all'
  const sortBy = searchParams.get('sort') ?? 'default'

  const loadProducts = useCallback(async () => {
    setLoading(true)
    const data = await fetchFilteredProducts({
      categorySlug: activeCategory !== 'all' ? activeCategory : undefined,
      search: search || undefined,
      sortBy,
    })
    setProducts(data)
    setLoading(false)
  }, [activeCategory, sortBy, search, fetchFilteredProducts])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  function setCategory(slug: string) {
    const params = new URLSearchParams(searchParams)
    if (slug === 'all') params.delete('category')
    else params.set('category', slug)
    setSearchParams(params)
  }

  function setSort(value: string) {
    const params = new URLSearchParams(searchParams)
    if (value === 'default') params.delete('sort')
    else params.set('sort', value)
    setSearchParams(params)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (search) params.set('search', search)
    else params.delete('search')
    setSearchParams(params)
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium">
          <Link className="text-slate-500 hover:text-primary" to="/">首頁</Link>
          <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
          <span className="text-primary">商品列表</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">所有商品</h1>
          <select
            value={sortBy}
            onChange={(e) => setSort(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary"
          >
            <option value="default">推薦排序</option>
            <option value="price_asc">價格低到高</option>
            <option value="price_desc">價格高到低</option>
            <option value="newest">最新上架</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左側篩選 */}
          <aside className="space-y-6">
            {/* 搜尋 */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder="搜尋商品..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>

            {/* 分類篩選 */}
            <div>
              <h3 className="font-bold mb-4">平台分類</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory('all')}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  全部
                </button>
                {!catLoading && categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.slug)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat.slug ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 右側商品網格 */}
          <div className="lg:col-span-3">
            {loading ? <LoadingSpinner /> : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-20">
                    <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">inventory_2</span>
                    <h2 className="text-xl font-bold mb-2">找不到商品</h2>
                    <p className="text-slate-500">嘗試更換篩選條件或搜尋其他關鍵字</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Link to={`/products/${product.id}`} key={product.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                        <div className="aspect-video relative overflow-hidden bg-slate-200 dark:bg-slate-700">
                          {product.image_urls[0] ? (
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={product.image_urls[0]} alt={product.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
                            </div>
                          )}
                          {product.platform && (
                            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                              {product.platform}
                            </div>
                          )}
                          {product.stock <= 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">已售完</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              {product.original_price && (
                                <span className="text-xs line-through text-slate-500">NT$ {product.original_price.toLocaleString()}</span>
                              )}
                              <span className="text-xl font-black text-primary">NT$ {product.price.toLocaleString()}</span>
                            </div>
                            <span className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md shadow-primary/20">
                              {product.stock > 0 ? '立即購買' : '缺貨中'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
