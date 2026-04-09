import { ShieldCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-medium">隱私權政策</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">隱私權政策</h1>
          <p className="text-gray-500 text-sm">最後更新日期：2024 年 12 月 1 日</p>
        </div>

        {/* Content */}
        <div className="card p-6 md:p-10 space-y-8">
          {[
            {
              title: '一、隱私權政策聲明',
              content: [
                '佐和點數王（以下簡稱「本平台」）非常重視您的隱私權。本隱私權政策說明我們如何蒐集、使用、保護及分享您的個人資料。',
                '當您使用本平台之服務時，即表示您同意本隱私權政策之內容。',
              ],
            },
            {
              title: '二、個人資料之蒐集',
              content: [
                '本平台在您註冊會員、購買商品或聯絡客服時，可能蒐集以下個人資料：',
                '• 基本資料：姓名、電子郵件、手機號碼',
                '• 帳戶資料：帳號、加密後之密碼',
                '• 交易資料：訂單紀錄、付款方式、交易金額',
                '• 技術資料：IP 位址、瀏覽器類型、存取時間（透過 Cookie 及類似技術蒐集）',
              ],
            },
            {
              title: '三、個人資料之使用',
              content: [
                '本平台蒐集之個人資料，將用於以下目的：',
                '• 處理您的訂單及提供售後服務',
                '• 寄送訂單通知、交易確認及點數卡序號',
                '• 帳戶管理及身分驗證',
                '• 改善本平台之服務品質與使用者體驗',
                '• 遵循法律規範及配合司法機關之調查',
                '本平台不會將您的個人資料用於上述目的以外之用途，亦不會出售您的資料予第三方。',
              ],
            },
            {
              title: '四、個人資料之保護',
              content: [
                '本平台採取合理之安全措施保護您的個人資料，包括：',
                '• 密碼採用 PBKDF2 加密演算法進行雜湊處理，不以明文儲存',
                '• 所有資料傳輸均透過 HTTPS 加密協定',
                '• 定期檢視安全措施並進行系統更新',
                '• 限制存取個人資料之人員權限',
              ],
            },
            {
              title: '五、Cookie 之使用',
              content: [
                '本平台使用 Cookie 及類似技術以提供更好的使用體驗，包括：',
                '• 維持您的登入狀態',
                '• 記錄購物車內容',
                '• 分析網站流量與使用行為（匿名化處理）',
                '您可透過瀏覽器設定管理或停用 Cookie，但部分功能可能因此受到影響。',
              ],
            },
            {
              title: '六、個人資料之分享',
              content: [
                '本平台僅在以下情況下分享您的個人資料：',
                '• 經您明確同意',
                '• 依法律規定或司法機關之要求',
                '• 為完成交易所必要，與付款處理服務商分享必要之交易資訊',
                '上述第三方合作夥伴均受保密義務約束，不得將您的資料用於其他目的。',
              ],
            },
            {
              title: '七、您的權利',
              content: [
                '依據個人資料保護法，您對您的個人資料享有以下權利：',
                '• 查詢或請求閱覽您的個人資料',
                '• 請求製給複製本',
                '• 請求補充或更正',
                '• 請求停止蒐集、處理或利用',
                '• 請求刪除',
                '如需行使上述權利，請聯繫我們的客服團隊。',
              ],
            },
            {
              title: '八、兒童隱私',
              content: [
                '本平台之服務不針對未滿 18 歲之未成年人。我們不會故意蒐集未成年人之個人資料。若發現有此情形，將立即刪除相關資料。',
              ],
            },
            {
              title: '九、政策修訂',
              content: [
                '本平台保留隨時修訂本隱私權政策之權利。修訂後之政策將於本頁面公布，並更新「最後更新日期」。',
                '重大變更時，我們將透過電子郵件或網站公告方式通知您。',
              ],
            },
            {
              title: '十、聯絡方式',
              content: [
                '如您對本隱私權政策有任何疑問或建議，歡迎透過以下方式聯繫我們：',
                '• 電子郵件：support@zuohe.com',
                '• 客服電話：02-1234-5678',
                '• 服務時間：週一至週五 09:00 - 18:00',
              ],
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-[#C9A84C] mb-3">{section.title}</h2>
              <div className="space-y-2">
                {section.content.map((p, j) => (
                  <p key={j} className="text-gray-300 text-sm leading-relaxed pl-4 border-l-2 border-[#C9A84C]/20">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
