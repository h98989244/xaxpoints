import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const { signInWithEmail, signUpWithEmail } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (isLogin) {
      const { error } = await signInWithEmail(email, password)
      if (error) {
        setError(error.message)
      } else {
        navigate('/member')
      }
    } else {
      const { error } = await signUpWithEmail(email, password, displayName)
      if (error) {
        setError(error.message)
      } else {
        navigate('/member')
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
          {/* 切換分頁 */}
          <div className="flex mb-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${isLogin ? 'bg-primary text-white' : ''}`}
            >
              登入
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${!isLogin ? 'bg-primary text-white' : ''}`}
            >
              註冊
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">暱稱</label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                  placeholder="您的暱稱"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-400">Email</label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-400">密碼</label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                type="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all">
              {isLogin ? '登入' : '註冊'}
            </button>
          </form>

          {/* 社群登入 */}
          <div className="mt-6">
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              <span className="px-4 text-xs text-slate-500">或使用以下方式登入</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors font-medium text-sm">
                <span className="text-green-500 font-bold">LINE</span> 登入
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors font-medium text-sm">
                Google 登入
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
