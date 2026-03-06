
import MemberSidebar from '../../components/layout/MemberSidebar'
import useAuth from '../../hooks/useAuth'
import useOrders from '../../hooks/useOrders'

export default function Dashboard() {
  const { profile, user } = useAuth()
  const { orders, loading } = useOrders(user?.id)
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 text-sm focus:ring-2 focus:ring-primary" placeholder="搜尋點數商品或活動..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right">
                <p className="text-sm font-bold">{profile?.display_name ?? '會員'}</p>
                <p className="text-xs text-slate-500">{profile?.member_level}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="頭像" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* 會員資訊卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-xl flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-24 h-24 rounded-full border-4 border-white/20 bg-slate-600 flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="頭像" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl">person</span>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">{profile?.display_name ?? '會員'}</h1>
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{profile?.member_level ?? '一般會員'}</span>
                  </div>
                </div>
              </div>
              <div className="relative z-10 text-right">
                <p className="text-white/80 text-sm mb-1 uppercase tracking-wider">可用紅利點數</p>
                <p className="text-5xl font-black">{(profile?.loyalty_points ?? 0).toLocaleString()}</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-medium">累計訂單</p>
                  <p className="text-3xl font-bold mt-1">{orders.length} <span className="text-base font-normal text-slate-400">筆</span></p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary">receipt_long</span>
                </div>
              </div>
              <a href="/member/history" className="mt-4 w-full py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-center block">
                查看紀錄
              </a>
            </div>
          </div>

          {/* 最近購買紀錄 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">最近購買紀錄</h2>
              <a href="/member/history" className="text-primary text-sm font-bold hover:underline">查看全部</a>
            </div>
            {loading ? (
              <div className="text-center py-8 text-slate-500">載入中...</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">receipt_long</span>
                <p className="text-slate-500">尚無購買紀錄</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">shopping_bag</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{order.order_number}</p>
                        <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleString('zh-TW')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">NT$ {order.total_amount.toLocaleString()}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        order.status === '已完成' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : order.status === '已取消' ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
