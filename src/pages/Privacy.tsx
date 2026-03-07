import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">隱私權政策</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
          <p>「本平台」非常重視您的隱私。本政策說明我們如何蒐集、使用及保護您的個人資料。</p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">一、資料蒐集</h2>
          <p>我們可能蒐集以下資料：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>註冊資訊：Email、暱稱、手機號碼。</li>
            <li>交易資訊：購買紀錄、付款方式。</li>
            <li>使用紀錄：瀏覽行為、登入紀錄、IP 位址。</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">二、資料使用</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>提供及改善本平台服務。</li>
            <li>處理訂單與客戶服務。</li>
            <li>發送訂單通知、優惠資訊（可取消訂閱）。</li>
            <li>防止詐騙與非法活動。</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">三、資料保護</h2>
          <p>我們採用業界標準的安全措施保護您的個人資料，包括加密傳輸與安全儲存。</p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">四、Cookie 使用</h2>
          <p>本平台使用 Cookie 以提升使用體驗與分析流量。您可透過瀏覽器設定管理 Cookie 偏好。</p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">五、您的權利</h2>
          <p>您有權要求存取、更正或刪除您的個人資料。請聯繫客服提出申請。</p>

          <p className="text-sm text-slate-500">最後更新日期：2026 年 3 月 1 日</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
