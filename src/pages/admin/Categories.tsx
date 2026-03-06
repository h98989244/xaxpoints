import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import useProducts from '../../hooks/useProducts'
import type { Category, Product } from '../../types'

export default function Categories() {
  const { fetchAllCategories, fetchAllProducts, createCategory, updateCategory, deleteCategory } = useProducts()
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', icon: '', sort_order: '0' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [cats, prods] = await Promise.all([fetchAllCategories(), fetchAllProducts()])
    setCategories(cats)
    setProducts(prods)
    setLoading(false)
  }

  function countProducts(categoryId: string) {
    return products.filter(p => p.category_id === categoryId).length
  }

  function openCreateForm() {
    setEditingId(null)
    setForm({ name: '', slug: '', icon: '', sort_order: String(categories.length) })
    setShowForm(true)
    setMessage('')
  }

  function openEditForm(c: Category) {
    setEditingId(c.id)
    setForm({ name: c.name, slug: c.slug, icon: c.icon ?? '', sort_order: String(c.sort_order) })
    setShowForm(true)
    setMessage('')
  }

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      name: form.name,
      slug: form.slug || generateSlug(form.name),
      icon: form.icon || undefined,
      sort_order: parseInt(form.sort_order) || 0,
    }

    if (editingId) {
      const { error } = await updateCategory(editingId, payload)
      if (error) { setMessage(`更新失敗：${error}`); return }
      setMessage('分類已更新')
    } else {
      const { error } = await createCategory(payload)
      if (error) { setMessage(`新增失敗：${error}`); return }
      setMessage('分類已新增')
    }
    setShowForm(false)
    loadData()
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleDelete(c: Category) {
    const count = countProducts(c.id)
    const msg = count > 0
      ? `此分類下有 ${count} 件商品，刪除後這些商品將變為「未分類」。確定要刪除「${c.name}」嗎？`
      : `確定要刪除「${c.name}」嗎？`
    if (!confirm(msg)) return
    const { error } = await deleteCategory(c.id)
    if (error) { setMessage(`刪除失敗：${error}`); return }
    setMessage('分類已刪除')
    loadData()
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleToggleActive(c: Category) {
    await updateCategory(c.id, { is_active: !c.is_active })
    loadData()
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">分類管理</h1>
          <p className="text-slate-500 text-sm">共 {categories.length} 個分類</p>
        </div>
        <button onClick={openCreateForm} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined text-lg">add</span>新增分類
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.includes('失敗') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
          {message}
        </div>
      )}

      {/* 新增/編輯表單 */}
      {showForm && (
        <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-lg font-bold mb-4">{editingId ? '編輯分類' : '新增分類'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-400">分類名稱 *</label>
              <input
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || generateSlug(e.target.value) })}
                placeholder="如：Steam 點數"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-400">Slug（網址代碼）</label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="自動產生"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-400">圖示（Material Symbol 名稱）</label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="如：sports_esports"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-400">排序</label>
              <input
                type="number"
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm">{editingId ? '儲存' : '新增'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-200 dark:bg-slate-800 px-6 py-2 rounded-lg font-bold text-sm">取消</button>
            </div>
          </form>
        </div>
      )}

      {/* 分類列表 */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading ? <LoadingSpinner /> : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">排序</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">分類名稱</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Slug</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">商品數</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">category</span>
                    <p className="text-slate-500">尚無分類</p>
                  </td>
                </tr>
              ) : categories.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-sm text-slate-500">{c.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {c.icon && <span className="material-symbols-outlined text-primary text-lg">{c.icon}</span>}
                      <span className="font-medium text-sm">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">{c.slug}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold">{countProducts(c.id)} 件</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggleActive(c)} className={`text-xs px-2 py-1 rounded-full font-bold cursor-pointer ${c.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-200 text-slate-500'}`}>
                      {c.is_active ? '啟用中' : '已停用'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditForm(c)} className="p-1 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button onClick={() => handleDelete(c)} className="p-1 hover:text-red-500 transition-colors">
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
