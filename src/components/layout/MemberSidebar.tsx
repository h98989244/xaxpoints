import { useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const menuItems = [
  { path: '/member', icon: 'dashboard', label: '控制台' },
  { path: '/member/history', icon: 'history', label: '購買紀錄' },
  { path: '/member/referral', icon: 'share', label: '推薦好友' },
  { path: '/member/settings', icon: 'manage_accounts', label: '帳號設定' },
  { path: '/member/security', icon: 'shield_person', label: '帳號安全' },
]

export default function MemberSidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <span className="material-symbols-outlined text-white">videogame_asset</span>
        </div>
        <a href="/" className="text-xl font-bold tracking-tight text-primary">遊戲點數</a>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>登出</span>
        </button>
      </div>
    </aside>
  )
}
