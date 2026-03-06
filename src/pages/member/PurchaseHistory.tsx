import { useState } from 'react'
import MemberSidebar from '../../components/layout/MemberSidebar'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import useOrders from '../../hooks/useOrders'

export default function PurchaseHistory() {
  const { user } = useAuth()
  const { orders, loading } = useOrders(user?.id)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false
    if (search && !order.order_number.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">購買紀錄</h1>
        <p className="text-slate-500 mb-8">查看您的所有訂單與點數卡序號</p>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-4">
              <input
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary"
                placeholder="搜尋訂單編號..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-primary"
              >
                <option value="all">全部狀態</option>
                <option value="已完成">已完成</option>
                <option value="待付款">待付款</option>
                <option value="已付款">已付款</option>
                <option value="處理中">處理中</option>
                <option value="已取消">已取消</option>
                <option value="已退款">已退款</option>
              </select>
            </div>
          </div>

          {loading ? <LoadingSpinner /> : filteredOrders.length === 0 ? (
            <div className="p-16 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">receipt_long</span>
              <h2 className="text-xl font-bold mb-2">尚無購買紀錄</h2>
              <p className="text-slate-500">您完成的訂單將會顯示在這裡</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-left">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">訂單編號</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">日期</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">金額</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">付款方式</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm">{order.order_number}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString('zh-TW')}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">NT$ {order.total_amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{order.payment_method ?? '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        order.status === '已完成' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : order.status === '已取消' || order.status === '已退款' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
