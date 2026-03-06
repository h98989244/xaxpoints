import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function AdminLogin() {
  const { user, isAdmin, loading, signInWithEmail } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 已登入且是 Admin，直接導向後台
  if (!loading && user && isAdmin) {
    navigate('/admin/inventory', { replace: true })
    return null
  }

  // 已登入但不是 Admin
  if (!loading && user && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-background-dark flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-red-500 text-3xl">block</span>
          </div>
          <h2 className="text-xl font-bold mb-2">權限不足</h2>
          <p className="text-slate-500 text-sm mb-6">此帳號沒有管理員權限，無法進入後台。</p>
          <Link to="/" className="text-primary font-bold text-sm hover:underline">返回首頁</Link>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: authError } = await signInWithEmail(email, password)
    if (authError) {
      setError(authError.message)
      setSubmitting(false)
      return
    }

    // 登入成功後 useAuth 會自動更新 user/profile，
    // 下次 render 時如果是 admin 會自動導向
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-background-dark flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-background-dark flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-md w-full shadow-xl">
        {/* 標題 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-bold">後台管理系統</h1>
          <p className="text-slate-500 text-sm mt-1">GameCredit 管理員登入</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-400">管理員 Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
              <input
                type="email"
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-primary focus:border-primary"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-400">密碼</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              <input
                type="password"
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-primary focus:border-primary"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            {submitting ? '登入中...' : '登入後台'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 text-sm hover:text-primary transition-colors">
            ← 返回前台首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
