import { Link, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AdminLogin from '../../pages/admin/AdminLogin'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth()
  const { pathname } = useLocation()

  if (loading) return <LoadingSpinner />
  if (!user || !isAdmin) return <AdminLogin />
  if (pathname === '/admin') return <Navigate to="/admin/inventory" replace />

  return (
    <div className="min-h-screen">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">sports_esports</span>
            <span className="font-bold">GameCredit 後台</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium">
            <Link
              to="/admin/inventory"
              className={pathname === '/admin/inventory' ? 'text-primary' : 'hover:text-primary transition-colors'}
            >
              庫存管理
            </Link>
            <Link
              to="/admin/settings"
              className={pathname === '/admin/settings' ? 'text-primary' : 'hover:text-primary transition-colors'}
            >
              網站設定
            </Link>
          </nav>
        </div>
        <Link to="/" className="text-sm text-slate-500 hover:text-primary">返回前台</Link>
      </header>
      {children}
    </div>
  )
}
