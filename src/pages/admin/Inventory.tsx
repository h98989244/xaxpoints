import { Link } from 'react-router-dom'

export default function Inventory() {
  return (
    <div className="min-h-screen">
      {/* 後台導覽列 */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">sports_esports</span>
            <span className="font-bold">GameCredit 後台</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium">
            <Link to="/admin/inventory" className="text-primary">庫存管理</Link>
            <Link to="/admin/settings" className="hover:text-primary transition-colors">網站設定</Link>
          </nav>
        </div>
        <Link to="/" className="text-sm text-slate-500 hover:text-primary">返回前台</Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">庫存管理</h1>
            <p className="text-slate-500 text-sm">管理商品庫存、上架與下架</p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            新增商品
          </button>
        </div>

        {/* 篩選列 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary flex-1 min-w-[200px]" placeholder="搜尋商品名稱..." />
          <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary">
            <option>全部分類</option>
            <option>Steam</option>
            <option>PlayStation</option>
            <option>Xbox</option>
          </select>
          <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary">
            <option>全部狀態</option>
            <option>上架中</option>
            <option>已下架</option>
            <option>低庫存</option>
          </select>
        </div>

        {/* 商品表格 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">商品名稱</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">分類</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">價格</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">庫存</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">inventory_2</span>
                  <p className="text-slate-500">尚無商品，點擊「新增商品」開始上架</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
