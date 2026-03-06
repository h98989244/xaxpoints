import { useState, useEffect } from 'react'
import MemberSidebar from '../../components/layout/MemberSidebar'
import useAuth from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

export default function AccountSettings() {
  const { profile, user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    display_name: '',
    phone: '',
    email_subscription: true,
    promo_notification: true,
  })

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name ?? '',
        phone: profile.phone ?? '',
        email_subscription: profile.email_subscription,
        promo_notification: profile.promo_notification,
      })
    }
  }, [profile])

  async function handleSave() {
    if (!supabase || !user) return
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: form.display_name,
        phone: form.phone,
        email_subscription: form.email_subscription,
        promo_notification: form.promo_notification,
      })
      .eq('id', user.id)

    if (error) {
      setMessage(`儲存失敗：${error.message}`)
    } else {
      setMessage('設定已儲存')
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !supabase || !user) return

    const ext = file.name.split('.').pop()
    const filePath = `${user.id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      setMessage(`上傳失敗：${uploadError.message}`)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id)

    setMessage('頭像已更新，重新整理頁面即可看到')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">帳號設定</h1>
        <p className="text-slate-500 mb-8">管理您的個人資料與偏好設定</p>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.includes('失敗') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
            {message}
          </div>
        )}

        <div className="space-y-8 max-w-2xl">
          {/* 個人資料 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">個人資料</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="頭像" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-3xl">person</span>
                )}
              </div>
              <label className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary transition-colors cursor-pointer">
                更換頭像
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">暱稱</label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                  value={form.display_name}
                  onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">Email</label>
                <div className="flex items-center gap-2">
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm" value={profile?.email ?? ''} readOnly />
                  <span className="text-green-500 text-xs font-bold whitespace-nowrap">已驗證</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">手機號碼</label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+886"
                />
              </div>
            </div>
          </section>

          {/* 偏好設定 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">偏好設定</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">電子報訂閱</p>
                  <p className="text-sm text-slate-500">接收最新優惠與活動資訊</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={form.email_subscription}
                    onChange={(e) => setForm({ ...form, email_subscription: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">促銷通知</p>
                  <p className="text-sm text-slate-500">接收限時特賣推播通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={form.promo_notification}
                    onChange={(e) => setForm({ ...form, promo_notification: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            </div>
          </section>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {saving ? '儲存中...' : '儲存變更'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
