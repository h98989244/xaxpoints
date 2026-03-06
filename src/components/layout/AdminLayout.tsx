import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AdminLogin from '../../pages/admin/AdminLogin'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (loading) return <LoadingSpinner />
  if (!user || !isAdmin) return <AdminLogin />
  if (pathname === '/admin') return <Navigate to="/admin/inventory" replace />

  function go(path: string) {
    navigate(path)
  }

  return (
    <div className="min-h-screen">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => go('/')} className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-2xl">sports_esports</span>
            <span className="font-bold">GameCredit 後台</span>
          </button>
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium">
            <button
              onClick={() => go('/admin/inventory')}
              className={`cursor-pointer ${pathname === '/admin/inventory' ? 'text-primary' : 'hover:text-primary transition-colors'}`}
            >
              庫存管理
            </button>
            <button
              onClick={() => go('/admin/settings')}
              className={`cursor-pointer ${pathname === '/admin/settings' ? 'text-primary' : 'hover:text-primary transition-colors'}`}
            >
              網站設定
            </button>
          </nav>
        </div>
        <button onClick={() => go('/')} className="text-sm text-slate-500 hover:text-primary cursor-pointer">返回前台</button>
      </header>
      {children}
    </div>
  )
}
