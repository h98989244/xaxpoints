import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">服務條款</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
          <p>歡迎使用 GameCredit 遊戲點數交易平台（以下簡稱「本平台」）。請在使用本平台服務前，詳細閱讀以下條款。</p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">一、帳戶條款</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>您必須年滿 18 歲或取得法定監護人同意方可使用本平台服務。</li>
            <li>您有責任維護帳戶資訊的安全性與保密性。</li>
            <li>每位使用者僅可註冊一個帳戶，禁止共用或轉讓帳戶。</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">二、交易規則</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>本平台販售的數位商品為遊戲點數序號，一經購買並發送序號後，交易即視為完成。</li>
            <li>商品價格以結帳時顯示的價格為準，本平台保留調整價格的權利。</li>
            <li>使用折扣碼或紅利點數折抵時，需符合各項活動之使用條件。</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">三、退貨政策</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>數位商品一經售出且序號已發送，原則上不接受退款。</li>
            <li>若因系統錯誤導致序號無效，請於 7 日內聯繫客服，我們將協助處理退款或重新發送。</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">四、免責聲明</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>本平台不對第三方平台的服務中斷或變更負責。</li>
            <li>使用者應自行確認帳號區域是否符合商品使用限制。</li>
          </ul>

          <p className="text-sm text-slate-500">最後更新日期：2026 年 3 月 1 日</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
