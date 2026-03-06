import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // 目前僅前端展示，未來可串接後端
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">聯絡我們</h1>
          <p className="text-slate-500">有任何問題或建議？歡迎與我們聯繫</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 聯絡資訊 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                聯絡資訊
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">mail</span>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">support@gamecredit.tw</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
                  <div>
                    <p className="text-sm text-slate-500">客服時間</p>
                    <p className="font-medium">週一至週日 10:00 - 22:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">chat</span>
                  <div>
                    <p className="text-sm text-slate-500">LINE 客服</p>
                    <p className="font-medium">@gamecredit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                常見問題
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                在聯絡我們之前，建議先查看常見問題，或許能更快找到您需要的答案。
              </p>
              <a href="/faq" className="text-primary text-sm font-bold hover:underline">前往常見問題 →</a>
            </div>
          </div>

          {/* 聯絡表單 */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit_note</span>
                傳送訊息
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">訊息已送出</h3>
                  <p className="text-slate-500 mb-6">感謝您的來信，我們將在 1-2 個工作天內回覆您。</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    再次傳送
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">姓名</label>
                      <input
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Email</label>
                      <input
                        required
                        type="email"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">主旨</label>
                    <select
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="">請選擇主旨</option>
                      <option value="訂單問題">訂單問題</option>
                      <option value="序號無法使用">序號無法使用</option>
                      <option value="退款申請">退款申請</option>
                      <option value="帳號問題">帳號問題</option>
                      <option value="合作洽談">合作洽談</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">訊息內容</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="請詳細描述您的問題或需求..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all"
                  >
                    送出訊息
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
