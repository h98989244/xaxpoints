import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F0F23] border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="佐和點數王" className="w-8 h-8 object-contain" />
              <span className="text-lg font-bold text-[#C9A84C]">佐和點數王</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              提供最安全、最快速的點數卡購買服務。多種面額、多種支付方式，滿足您的各種需求。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: '首頁' },
                { to: '/products', label: '商品列表' },
                { to: '/track', label: '訂單查詢' },
                { to: '/about', label: '關於我們' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">法律資訊</h3>
            <ul className="space-y-2">
              {[
                { to: '/terms', label: '服務條款' },
                { to: '/privacy', label: '隱私權政策' },
                { to: '/contact', label: '聯絡我們' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                support@zuohe.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                02-1234-5678
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
                台北市中山區
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#C9A84C]/10 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 佐和點數王 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
