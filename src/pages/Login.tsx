import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import useAuth from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [searchParams] = useSearchParams()
  const refCode = searchParams.get('ref') ?? ''
  const [isLogin, setIsLogin] = useState(!refCode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [refName, setRefName] = useState('')
  const { signInWithEmail, signUpWithEmail } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!refCode || !supabase) return
    supabase
      .from('profiles')
      .select('display_name')
      .eq('referral_code', refCode)
      .single()
      .then(({ data }) => {
        if (data?.display_name) setRefName(data.display_name)
      })
  }, [refCode])

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
        // 記錄推薦關係
        if (refCode && supabase) {
          try {
            const { data: referrer } = await supabase
              .from('profiles')
              .select('id')
              .eq('referral_code', refCode)
              .single()
            const { data: { user: newUser } } = await supabase.auth.getUser()
            if (referrer && newUser) {
              await supabase.from('referrals').insert({
                referrer_id: referrer.id,
                referred_id: newUser.id,
              })
            }
          } catch {
            // 推薦紀錄失敗不影響註冊
          }
        }
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

          {refCode && (
            <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">celebration</span>
              <span>{refName ? `${refName} 邀請您加入` : '您已透過好友邀請連結前來'}，註冊後雙方各得 50 紅利點數！</span>
            </div>
          )}

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
        </div>
      </main>
      <Footer />
    </>
  )
}
