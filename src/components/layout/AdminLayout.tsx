import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useSiteSettings from '../../hooks/useSiteSettings'
import AdminLogin from '../../pages/admin/AdminLogin'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth()
  const { getSetting } = useSiteSettings()
  const general = getSetting('general') as Record<string, string>
  const siteName = general.site_name || 'GameCredit'
  const { pathname } = useLocation()

  if (loading) return <LoadingSpinner />
  if (!user || !isAdmin) return <AdminLogin />
  if (pathname === '/admin') return <Navigate to="/admin/inventory" replace />

  return (
    <div className="min-h-screen">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">sports_esports</span>
            <span className="font-bold">{siteName} 後台</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium">
            <a
              href="/admin/inventory"
              className={pathname === '/admin/inventory' ? 'text-primary' : 'hover:text-primary transition-colors'}
            >
              庫存管理
            </a>
            <a
              href="/admin/categories"
              className={pathname === '/admin/categories' ? 'text-primary' : 'hover:text-primary transition-colors'}
            >
              分類管理
            </a>
            <a
              href="/admin/settings"
              className={pathname === '/admin/settings' ? 'text-primary' : 'hover:text-primary transition-colors'}
            >
              網站設定
            </a>
          </nav>
        </div>
        <a href="/" className="text-sm text-slate-500 hover:text-primary">返回前台</a>
      </header>
      {children}
    </div>
  )
}
