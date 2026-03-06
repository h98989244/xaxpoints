import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">GameCredit 遊戲點數</span>
          </Link>

          {/* 導覽連結 - 桌面版 */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link className="hover:text-primary transition-colors" to="/products?category=steam">Steam</Link>
            <Link className="hover:text-primary transition-colors" to="/products?category=playstation">PSN</Link>
            <Link className="hover:text-primary transition-colors" to="/products?category=mobile">手遊點數</Link>
            <Link className="hover:text-primary transition-colors" to="/products?category=gift-card">禮物卡</Link>
          </nav>

          {/* 搜尋欄 */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                placeholder="搜尋遊戲或點數..."
                type="text"
              />
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex items-center gap-2">
            <Link to="/cart" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin/inventory" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors" title="後台管理">
                    <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                  </Link>
                )}
                <Link to="/member" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <span className="material-symbols-outlined">person</span>
                </Link>
                <button
                  onClick={signOut}
                  className="hidden sm:flex bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                  登出
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
