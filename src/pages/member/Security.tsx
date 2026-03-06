import { useState, useEffect } from 'react'
import MemberSidebar from '../../components/layout/MemberSidebar'
import useAuth from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import type { LoginLog } from '../../types'

export default function Security() {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' })
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([])

  useEffect(() => {
    if (user && supabase) {
      supabase
        .from('login_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)
        .then(({ data }) => {
          if (data) setLoginLogs(data)
        })
    }
  }, [user])

  async function handleChangePassword() {
    if (!supabase) return
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('兩次輸入的密碼不一致')
      return
    }
    if (passwords.newPassword.length < 6) {
      setMessage('密碼至少需要 6 個字元')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: passwords.newPassword })
    if (error) {
      setMessage(`修改失敗：${error.message}`)
    } else {
      setMessage('密碼已更新')
      setShowPasswordForm(false)
      setPasswords({ newPassword: '', confirmPassword: '' })
    }
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">帳號安全</h1>
        <p className="text-slate-500 mb-8">管理密碼、兩步驟驗證與社群帳號綁定</p>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium max-w-2xl ${message.includes('失敗') || message.includes('不一致') || message.includes('至少') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
            {message}
          </div>
        )}

        <div className="space-y-6 max-w-2xl">
          {/* 密碼管理 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">lock</span>
                <div>
                  <h3 className="font-bold">密碼管理</h3>
                  <p className="text-sm text-slate-500">定期更換密碼以確保帳號安全</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all"
              >
                修改密碼
              </button>
            </div>
            {showPasswordForm && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">新密碼</label>
                  <input
                    type="password"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="請輸入新密碼（至少 6 個字元）"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">確認新密碼</label>
                  <input
                    type="password"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    placeholder="再次輸入新密碼"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm"
                >
                  確認修改
                </button>
              </div>
            )}
          </section>

          {/* 兩步驟驗證 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">security</span>
                <div>
                  <h3 className="font-bold">兩步驟驗證</h3>
                  <p className="text-sm text-slate-500">透過手機簡訊 OTP 加強帳號防護</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          </section>

          {/* 社群帳號綁定 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">link</span>
              社群帳號綁定
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-green-500 font-bold text-lg">LINE</span>
                  <span className="text-sm text-slate-500">未綁定</span>
                </div>
                <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary transition-colors">綁定</button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">Google</span>
                  <span className="text-sm text-slate-500">未綁定</span>
                </div>
                <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary transition-colors">綁定</button>
              </div>
            </div>
          </section>

          {/* 登入紀錄 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              最近登入紀錄
            </h3>
            {loginLogs.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">schedule</span>
                <p className="text-slate-500">尚無登入紀錄</p>
              </div>
            ) : (
              <div className="space-y-3">
                {loginLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-lg ${log.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {log.status === 'success' ? 'check_circle' : 'cancel'}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{log.device ?? '未知裝置'}</p>
                        <p className="text-xs text-slate-500">{log.ip_address ?? '未知 IP'} {log.location ? `· ${log.location}` : ''}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(log.created_at).toLocaleString('zh-TW')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
