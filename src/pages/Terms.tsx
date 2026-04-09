import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-2 mb-4">
            <FileText className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-medium">服務條款</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">服務條款</h1>
          <p className="text-gray-500 text-sm">最後更新日期：2024 年 12 月 1 日</p>
        </div>

        {/* Content */}
        <div className="card p-6 md:p-10 space-y-8">
          {[
            {
              title: '第一條　總則',
              content: [
                '歡迎使用「佐和點數王」（以下簡稱「本平台」）所提供之服務。當您使用本平台之任何服務時，即表示您已閱讀、瞭解並同意接受本服務條款之所有內容。',
                '本平台保留隨時修改本條款之權利，修改後之條款將於公布時生效。建議您定期查閱本頁面以了解最新條款。',
              ],
            },
            {
              title: '第二條　服務內容',
              content: [
                '本平台提供點數卡之線上購買服務，包含但不限於各面額之點數卡商品。所有商品之面額、價格及庫存均以本平台網站顯示為準。',
                '本平台僅作為點數卡販售之中介平台，所有點數卡之使用規範依各發行商之規定為準。',
              ],
            },
            {
              title: '第三條　會員註冊',
              content: [
                '使用者需註冊成為會員方能進行購買。註冊時所提供之個人資料必須真實、正確且完整。',
                '會員應妥善保管帳號及密碼，如發現帳號遭他人盜用，應立即通知本平台。因會員保管不當所衍生之損失，由會員自行承擔。',
                '每人僅限註冊一個帳號，本平台有權停用重複帳號。',
              ],
            },
            {
              title: '第四條　購買與付款',
              content: [
                '本平台目前提供 ATM 轉帳及超商條碼繳費兩種付款方式。',
                '訂單成立後，請於指定時間內完成付款。逾期未付款之訂單將自動取消。',
                '付款完成並經本平台確認後，將以電子方式提供點數卡序號。請確認訂單資訊無誤後再行付款。',
              ],
            },
            {
              title: '第五條　退換貨政策',
              content: [
                '由於數位商品之特殊性質，點數卡序號一經發送即無法退換。請於購買前確認商品內容及面額。',
                '若因本平台之疏失導致發送錯誤或無效之序號，本平台將負責重新發送正確序號或辦理退款。',
                '如遇爭議，請於收到序號後 24 小時內聯繫客服處理。',
              ],
            },
            {
              title: '第六條　禁止行為',
              content: [
                '使用者不得利用本平台從事任何違法行為，包括但不限於：洗錢、詐欺、侵犯他人權益等。',
                '不得利用系統漏洞或技術手段干擾本平台之正常運作。',
                '違反上述規定者，本平台有權立即停用其帳號，並保留法律追訴之權利。',
              ],
            },
            {
              title: '第七條　智慧財產權',
              content: [
                '本平台之所有內容，包括但不限於文字、圖片、程式碼、商標及標識，均受智慧財產權法之保護。',
                '未經本平台書面同意，不得複製、修改、散布或以任何形式使用本平台之內容。',
              ],
            },
            {
              title: '第八條　免責聲明',
              content: [
                '本平台不對因不可抗力（包括天災、系統故障、第三方服務中斷等）所導致之服務中斷或延遲負責。',
                '本平台所提供之商品受各發行商條款約束，因發行商政策變更所造成之影響，不在本平台責任範圍內。',
              ],
            },
            {
              title: '第九條　準據法與管轄',
              content: [
                '本條款之解釋及適用以中華民國法律為準據法。',
                '因本條款所生之爭議，雙方同意以臺灣臺北地方法院為第一審管轄法院。',
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
