import { Link } from 'react-router-dom'

export default function Settings() {
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
            <Link to="/admin/inventory" className="hover:text-primary transition-colors">庫存管理</Link>
            <Link to="/admin/settings" className="text-primary">網站設定</Link>
          </nav>
        </div>
        <Link to="/" className="text-sm text-slate-500 hover:text-primary">返回前台</Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">網站設定</h1>
        <p className="text-slate-500 mb-8">管理網站基本資訊</p>

        <div className="space-y-8">
          {/* 一般資訊 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings</span>
              一般資訊
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">網站名稱</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" defaultValue="GameCredit 遊戲點數" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">公司名稱</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" defaultValue="心安心食品有限公司" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">統一編號</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" placeholder="請輸入統一編號" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">聯絡 Email</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" placeholder="contact@example.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">聯絡電話</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" placeholder="02-1234-5678" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">公司地址</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" placeholder="請輸入公司地址" />
              </div>
            </div>
          </section>

          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all">儲存設定</button>
        </div>
      </main>
    </div>
  )
}
