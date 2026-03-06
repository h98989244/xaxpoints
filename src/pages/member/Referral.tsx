import { useState, useEffect } from 'react'
import MemberSidebar from '../../components/layout/MemberSidebar'
import useAuth from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

interface ReferralRecord {
  id: string
  referred_id: string
  status: 'registered' | 'completed'
  reward_points: number
  created_at: string
  completed_at: string | null
  referred_profile?: { display_name: string | null; email: string }
}

export default function Referral() {
  const { user, profile } = useAuth()
  const [referrals, setReferrals] = useState<ReferralRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const referralCode = profile?.referral_code ?? ''
  const inviteLink = referralCode ? `${window.location.origin}/login?ref=${referralCode}` : ''

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('referrals')
      .select('*, referred_profile:profiles!referred_id(display_name, email)')
      .eq('referrer_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setReferrals(data ?? [])
        setLoading(false)
      })
  }, [user])

  const totalReferred = referrals.length
  const completedCount = referrals.filter(r => r.status === 'completed').length
  const totalRewardPoints = referrals.reduce((sum, r) => sum + r.reward_points, 0)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const input = document.createElement('input')
      input.value = inviteLink
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="text-lg font-bold">推薦好友</h1>
        </header>

        <div className="p-8 space-y-8">
          {/* 邀請連結卡片 */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-3xl">share</span>
                <div>
                  <h2 className="text-2xl font-bold">邀請好友，一起賺獎勵</h2>
                  <p className="text-white/80 text-sm mt-1">好友透過您的連結註冊並完成首筆交易，雙方各獲得 50 紅利點數</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <div className="flex-1 bg-white/20 backdrop-blur rounded-lg px-4 py-3 font-mono text-sm truncate">
                  {inviteLink || '載入中...'}
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!inviteLink}
                  className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition-all shrink-0 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">{copied ? 'check' : 'content_copy'}</span>
                  {copied ? '已複製' : '複製連結'}
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-white/60 text-xs">
                <span className="material-symbols-outlined text-sm">info</span>
                <span>您的推薦碼：{referralCode || '...'}</span>
              </div>
            </div>
          </div>

          {/* 統計卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-sm font-medium">已邀請</p>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-primary">group_add</span>
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{totalReferred} <span className="text-base font-normal text-slate-400">人</span></p>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-sm font-medium">已完成交易</p>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{completedCount} <span className="text-base font-normal text-slate-400">人</span></p>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-sm font-medium">累計獲得獎勵</p>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">stars</span>
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{totalRewardPoints.toLocaleString()} <span className="text-base font-normal text-slate-400">點</span></p>
            </div>
          </div>

          {/* 推薦紀錄 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">推薦紀錄</h2>
            {loading ? (
              <div className="text-center py-8 text-slate-500">載入中...</div>
            ) : referrals.length === 0 ? (
              <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">group</span>
                <p className="text-slate-500 mt-2">尚無推薦紀錄，分享您的邀請連結給好友吧！</p>
              </div>
            ) : (
              <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="text-left px-5 py-3 font-medium">好友</th>
                      <th className="text-left px-5 py-3 font-medium">註冊時間</th>
                      <th className="text-left px-5 py-3 font-medium">狀態</th>
                      <th className="text-right px-5 py-3 font-medium">獎勵點數</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((r) => {
                      const referred = r.referred_profile as unknown as { display_name: string | null; email: string } | undefined
                      return (
                        <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                          <td className="px-5 py-3">
                            <p className="font-medium">{referred?.display_name || '會員'}</p>
                            <p className="text-xs text-slate-500">{referred?.email}</p>
                          </td>
                          <td className="px-5 py-3 text-slate-500">
                            {new Date(r.created_at).toLocaleDateString('zh-TW')}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              r.status === 'completed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {r.status === 'completed' ? '已完成交易' : '已註冊'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right font-bold">
                            {r.reward_points > 0 ? `+${r.reward_points}` : '-'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
