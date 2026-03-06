import MemberSidebar from '../../components/layout/MemberSidebar'

export default function Security() {
  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">帳號安全</h1>
        <p className="text-slate-500 mb-8">管理密碼、兩步驟驗證與社群帳號綁定</p>

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
              <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all">修改密碼</button>
            </div>
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
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">schedule</span>
              <p className="text-slate-500">尚無登入紀錄</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
