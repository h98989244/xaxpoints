
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Refund() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">退款政策</h1>
          <p className="text-slate-500">了解 GameCredit 的退款與退換貨規範</p>
        </div>

        <div className="space-y-8">
          {/* 重要提醒 */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-yellow-500 mt-0.5">warning</span>
              <div>
                <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-1">重要提醒</h3>
                <p className="text-sm text-yellow-700/80 dark:text-yellow-400/80">
                  數位商品（遊戲點數序號）一經售出且序號已發送，原則上不適用退款。請在購買前確認商品內容與適用平台。
                </p>
              </div>
            </div>
          </div>

          {/* 退款條件 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">rule</span>
              退款適用條件
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">以下情況可以申請退款：</p>
            <ul className="space-y-3">
              {[
                '系統錯誤導致重複扣款或金額不符',
                '收到的序號經驗證確認為無效或已使用',
                '付款成功後超過 24 小時仍未收到序號',
                '購買的商品與商品頁面描述明顯不符',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-green-500 text-lg mt-0.5">check_circle</span>
                  <span className="text-slate-600 dark:text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 不適用退款 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">block</span>
              不適用退款的情況
            </h2>
            <ul className="space-y-3">
              {[
                '序號已成功兌換至任何帳號',
                '因個人原因（如購買錯誤平台、不想要了）提出退款',
                '序號已發送超過 7 天且未提出無效申訴',
                '違反本站服務條款的交易行為',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">cancel</span>
                  <span className="text-slate-600 dark:text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 退款流程 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">route</span>
              退款申請流程
            </h2>
            <div className="space-y-6">
              {[
                { step: '1', title: '提出申請', desc: '透過「聯絡我們」頁面提交退款申請，請附上訂單編號與問題說明。' },
                { step: '2', title: '審核處理', desc: '我們的客服團隊將在 1-3 個工作天內審核您的申請並回覆。' },
                { step: '3', title: '退款作業', desc: '審核通過後，退款將依原付款方式退回，信用卡約 7-14 個工作天到帳，ATM/超商約 3-5 個工作天。' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 退款時效 */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">schedule</span>
              退款時效
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left py-3 px-4 font-bold text-slate-500">付款方式</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-500">退款時間</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { method: '信用卡 / 簽帳卡', time: '7-14 個工作天（依發卡銀行而定）' },
                    { method: '虛擬 ATM 轉帳', time: '3-5 個工作天' },
                    { method: '超商代碼繳費', time: '3-5 個工作天（退至指定帳戶）' },
                    { method: 'LINE Pay / 街口支付', time: '1-3 個工作天' },
                  ].map((row) => (
                    <tr key={row.method} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4 font-medium">{row.method}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 聯絡客服 */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">support_agent</span>
            <h3 className="font-bold mb-2">需要協助？</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              如有退款相關疑問，歡迎聯繫我們的客服團隊，我們將盡快為您處理。
            </p>
            <a href="/contact" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all inline-block">
              聯絡客服
            </a>
          </div>

          <p className="text-xs text-slate-400 text-center">
            本退款政策最後更新日期：2025 年 1 月。GameCredit 保留修改本政策之權利。
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
