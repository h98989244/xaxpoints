import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    { icon: Mail, label: '電子郵件', value: settings.email, href: settings.email ? `mailto:${settings.email}` : null },
    { icon: Phone, label: '客服電話', value: settings.phone, href: settings.phone ? `tel:${settings.phone.replace(/-/g, '')}` : null },
    { icon: MapPin, label: '營業地址', value: settings.address, href: null },
    { icon: Clock, label: '服務時間', value: settings.service_hours, href: null },
  ].filter((item) => item.value);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">
            聯絡<span className="text-[#C9A84C]">我們</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            有任何問題或建議？我們很樂意聽取您的意見。請透過以下方式與我們聯繫。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-white mb-6">聯絡資訊</h3>
              <div className="space-y-5">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white hover:text-[#C9A84C] transition-colors text-sm font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">訊息已送出！</h3>
                  <p className="text-gray-400 mb-6">感謝您的來信，我們會在 1-2 個工作天內回覆您。</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="text-[#C9A84C] hover:text-[#E8D48B] transition-colors text-sm font-medium"
                  >
                    再次發送訊息
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-6">發送訊息</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">姓名 *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-[#16213E] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                          placeholder="請輸入姓名"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">電子郵件 *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-[#16213E] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">主旨 *</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[#16213E] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="請輸入主旨"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">訊息內容 *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[#16213E] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                        placeholder="請描述您的問題或建議..."
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
                      <Send className="w-4 h-4" />
                      送出訊息
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
