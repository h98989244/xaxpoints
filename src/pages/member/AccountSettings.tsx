import MemberSidebar from '../../components/layout/MemberSidebar'
import useAuth from '../../hooks/useAuth'

export default function AccountSettings() {
  const { profile } = useAuth()

  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">帳號設定</h1>
        <p className="text-slate-500 mb-8">管理您的個人資料與偏好設定</p>

        <div className="space-y-8 max-w-2xl">
          {/* 個人資料 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold mb-6">個人資料</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">person</span>
              </div>
              <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary transition-colors">
                更換頭像
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">暱稱</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" defaultValue={profile?.display_name ?? ''} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">Email</label>
                <div className="flex items-center gap-2">
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm" defaultValue={profile?.email ?? ''} readOnly />
                  <span className="text-green-500 text-xs font-bold whitespace-nowrap">已驗證</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-400">手機號碼</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" defaultValue={profile?.phone ?? ''} placeholder="+886" />
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
                  <input type="checkbox" className="sr-only peer" defaultChecked={profile?.email_subscription} />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">促銷通知</p>
                  <p className="text-sm text-slate-500">接收限時特賣推播通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={profile?.promo_notification} />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer dark:bg-slate-700 peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            </div>
          </section>

          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all">儲存變更</button>
            <button className="bg-slate-200 dark:bg-slate-800 px-8 py-3 rounded-xl font-bold transition-all">取消</button>
          </div>
        </div>
      </main>
    </div>
  )
}
