import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useOrders from '../hooks/useOrders'
import useAuth from '../hooks/useAuth'
import type { Order, OrderItem } from '../types'

export default function OrderComplete() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { fetchOrderById, fetchOrderItems } = useOrders(user?.id)
  const [order, setOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      fetchOrderById(id),
      fetchOrderItems(id),
    ]).then(([orderData, itemsData]) => {
      setOrder(orderData)
      setOrderItems(itemsData)
      setLoading(false)
    })
  }, [id, fetchOrderById, fetchOrderItems])

  if (loading) return <><Navbar /><LoadingSpinner /><Footer /></>

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* 進度條 */}
        <div className="mb-10">
          <div className="h-2 w-full bg-primary rounded-full overflow-hidden" />
          <div className="flex justify-between mt-4 text-xs sm:text-sm">
            {['購物車', '填寫資料與支付', '完成訂購'].map((step) => (
              <div key={step} className="flex flex-col items-center gap-1 text-primary">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="font-bold">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 成功訊息 */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-black mb-2">訂單已成功建立！</h1>
          <p className="text-slate-500">您的點數卡號將於付款確認後立即發送至您的 Email</p>
        </div>

        {/* 訂單資訊 */}
        {order && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
            <h3 className="font-bold mb-4">訂單資訊</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">訂單編號</p>
                <p className="font-bold">{order.order_number}</p>
              </div>
              <div>
                <p className="text-slate-500">訂單日期</p>
                <p className="font-bold">{new Date(order.created_at).toLocaleDateString('zh-TW')}</p>
              </div>
              <div>
                <p className="text-slate-500">付款方式</p>
                <p className="font-bold">{order.payment_method}</p>
              </div>
              <div>
                <p className="text-slate-500">訂單狀態</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                  order.status === '已完成' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : order.status === '已取消' ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>{order.status}</span>
              </div>
              <div>
                <p className="text-slate-500">總金額</p>
                <p className="font-bold text-primary">NT$ {order.total_amount.toLocaleString()}</p>
              </div>
              {order.discount_amount > 0 && (
                <div>
                  <p className="text-slate-500">折扣金額</p>
                  <p className="font-bold text-green-500">-NT$ {order.discount_amount.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 購買明細 */}
        {orderItems.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
            <h3 className="font-bold mb-4">購買明細</h3>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-xs text-slate-500">x {item.quantity}</p>
                  </div>
                  <p className="font-bold">NT$ {item.subtotal.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/member/history" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold text-center transition-all">查看購買紀錄</a>
          <a href="/products" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-8 py-3 rounded-xl font-bold text-center transition-all">繼續購物</a>
        </div>
      </main>
      <Footer />
    </>
  )
}
