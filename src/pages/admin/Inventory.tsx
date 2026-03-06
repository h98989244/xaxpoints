import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import useProducts from '../../hooks/useProducts'
import type { Product } from '../../types'

export default function Inventory() {
  const { categories, fetchAllProducts, createProduct, updateProduct, deleteProduct } = useProducts()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', description: '', price: '', original_price: '', category_id: '',
    platform: '', region: '台灣', stock: '', is_active: true, is_featured: false,
    tags: '', image_urls: '', redemption_guide: '', usage_restrictions: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    const data = await fetchAllProducts()
    setProducts(data)
    setLoading(false)
  }

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter !== 'all' && p.category_id !== categoryFilter) return false
    return true
  })

  function openCreateForm() {
    setEditingId(null)
    setForm({ name: '', description: '', price: '', original_price: '', category_id: '', platform: '', region: '台灣', stock: '', is_active: true, is_featured: false, tags: '', image_urls: '', redemption_guide: '', usage_restrictions: '' })
    setShowForm(true)
  }

  function openEditForm(p: Product) {
    setEditingId(p.id)
    setForm({
      name: p.name, description: p.description ?? '', price: String(p.price), original_price: p.original_price ? String(p.original_price) : '',
      category_id: p.category_id ?? '', platform: p.platform ?? '', region: p.region, stock: String(p.stock),
      is_active: p.is_active, is_featured: p.is_featured, tags: p.tags.join(', '), image_urls: p.image_urls.join('\n'),
      redemption_guide: p.redemption_guide ?? '', usage_restrictions: p.usage_restrictions ?? '',
    })
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      name: form.name,
      description: form.description || null,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      category_id: form.category_id || null,
      platform: form.platform || null,
      region: form.region,
      stock: parseInt(form.stock) || 0,
      is_active: form.is_active,
      is_featured: form.is_featured,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      image_urls: form.image_urls.split('\n').map(u => u.trim()).filter(Boolean),
      redemption_guide: form.redemption_guide || null,
      usage_restrictions: form.usage_restrictions || null,
    }

    if (editingId) {
      await updateProduct(editingId, payload)
    } else {
      await createProduct(payload)
    }
    setShowForm(false)
    loadProducts()
  }

  async function handleDelete(id: string) {
    if (!confirm('確定要刪除此商品嗎？')) return
    await deleteProduct(id)
    loadProducts()
  }

  async function handleToggleActive(p: Product) {
    await updateProduct(p.id, { is_active: !p.is_active })
    loadProducts()
  }

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">庫存管理</h1>
            <p className="text-slate-500 text-sm">共 {products.length} 件商品</p>
          </div>
          <button onClick={openCreateForm} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>新增商品
          </button>
        </div>

        {/* 新增/編輯表單 */}
        {showForm && (
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-4">{editingId ? '編輯商品' : '新增商品'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">商品名稱 *</label>
                <input required className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">平台</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} placeholder="如 Steam、PlayStation" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">售價 *</label>
                <input required type="number" step="0.01" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">原價（選填）</label>
                <input type="number" step="0.01" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">分類</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                  <option value="">未分類</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">庫存數量</label>
                <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">區域</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-400">標籤（逗號分隔）</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="熱門, 特賣" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-slate-400">商品描述</label>
                <textarea rows={3} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-slate-400">圖片網址（每行一個）</label>
                <textarea rows={2} className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary" value={form.image_urls} onChange={(e) => setForm({ ...form, image_urls: e.target.value })} />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-sm">上架中</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-sm">精選商品</span>
                </label>
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm">{editingId ? '儲存' : '新增'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-slate-200 dark:bg-slate-800 px-6 py-2 rounded-lg font-bold text-sm">取消</button>
              </div>
            </form>
          </div>
        )}

        {/* 篩選列 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary flex-1 min-w-[200px]" placeholder="搜尋商品名稱..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary">
            <option value="all">全部分類</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* 商品表格 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {loading ? <LoadingSpinner /> : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-left">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">商品名稱</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">平台</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">價格</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">庫存</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">inventory_2</span>
                      <p className="text-slate-500">尚無商品</p>
                    </td>
                  </tr>
                ) : filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.image_urls[0] ? (
                          <img src={p.image_urls[0]} alt="" className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm text-slate-400">image</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{p.name}</p>
                          {p.is_featured && <span className="text-[10px] text-primary font-bold">精選</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{p.platform ?? '-'}</td>
                    <td className="px-6 py-4 text-sm font-bold">NT$ {p.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={p.stock <= 5 ? 'text-red-500 font-bold' : ''}>{p.stock}</span>
                      {p.stock <= 5 && p.stock > 0 && <span className="text-[10px] text-red-500 ml-1">低庫存</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggleActive(p)} className={`text-xs px-2 py-1 rounded-full font-bold cursor-pointer ${p.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-200 text-slate-500'}`}>
                        {p.is_active ? '上架中' : '已下架'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditForm(p)} className="p-1 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
  )
}
