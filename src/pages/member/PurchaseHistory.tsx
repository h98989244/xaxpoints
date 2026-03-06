import MemberSidebar from '../../components/layout/MemberSidebar'

export default function PurchaseHistory() {
  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">購買紀錄</h1>
        <p className="text-slate-500 mb-8">查看您的所有訂單與點數卡序號</p>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-4">
              <input className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary" placeholder="搜尋訂單編號或商品名稱..." />
              <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary">
                <option>全部狀態</option>
                <option>已完成</option>
                <option>待付款</option>
                <option>已取消</option>
              </select>
            </div>
          </div>

          {/* 空狀態 */}
          <div className="p-16 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">receipt_long</span>
            <h2 className="text-xl font-bold mb-2">尚無購買紀錄</h2>
            <p className="text-slate-500">您完成的訂單將會顯示在這裡</p>
          </div>
        </div>
      </main>
    </div>
  )
}
