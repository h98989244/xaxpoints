import { useState, useEffect, useRef } from 'react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import useSiteSettings from '../../hooks/useSiteSettings'
import { supabase } from '../../lib/supabase'

export default function Settings() {
  const { loading, getSetting, updateSetting, refetch } = useSiteSettings()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const [general, setGeneral] = useState({
    site_name: '', company_name: '', tax_id: '', logo_url: '',
    contact_email: '', contact_phone: '', address: '',
  })

  const [hero, setHero] = useState({
    badge: '',
    title_prefix: '',
    title_highlight: '',
    description: '',
    button_text: '',
    image_url: '',
  })

  useEffect(() => {
    if (!loading) {
      const g = getSetting('general') as Record<string, string>
      setGeneral({
        site_name: g.site_name ?? '',
        company_name: g.company_name ?? '',
        tax_id: g.tax_id ?? '',
        logo_url: g.logo_url ?? '',
        contact_email: g.contact_email ?? '',
        contact_phone: g.contact_phone ?? '',
        address: g.address ?? '',
      })
      const h = getSetting('hero') as Record<string, string>
      setHero({
        badge: h.badge ?? '限時特賣 最高 20% 折扣',
        title_prefix: h.title_prefix ?? '提升您的',
        title_highlight: h.title_highlight ?? '遊戲體驗',
        description: h.description ?? '即時取得 Steam、PlayStation、Xbox 和 Mobile Legends 點數。發卡迅速，100% 安全。',
        button_text: h.button_text ?? '立即選購',
        image_url: h.image_url ?? '',
      })
    }
  }, [loading, getSetting])

  async function handleSave() {
    setSaving(true)
    setMessage('')
    const r1 = await updateSetting('general', general)
    const r2 = await updateSetting('hero', hero)
    if (r1.error || r2.error) {
      setMessage(`儲存失敗：${r1.error || r2.error}`)
    } else {
      setMessage('設定已儲存')
      refetch()
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const inputClass = "w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary"

  return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">網站設定</h1>
        <p className="text-slate-500 mb-8">管理網站基本資訊與首頁橫幅</p>

        {loading ? <LoadingSpinner /> : (
          <div className="space-y-8">
            {message && (
              <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('失敗') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                {message}
              </div>
            )}

            {/* 一般資訊 */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings</span>一般資訊
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">網站名稱</label>
                  <input className={inputClass} value={general.site_name} onChange={(e) => setGeneral({ ...general, site_name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">公司名稱</label>
                  <input className={inputClass} value={general.company_name} onChange={(e) => setGeneral({ ...general, company_name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">統一編號</label>
                  <input className={inputClass} value={general.tax_id} onChange={(e) => setGeneral({ ...general, tax_id: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">網站 Logo</label>
                  <div className="flex items-center gap-4">
                    {general.logo_url ? (
                      <div className="relative group w-20 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                        <img src={general.logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
                        <button
                          type="button"
                          onClick={() => setGeneral({ ...general, logo_url: '' })}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-white">delete</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={logoUploading}
                        onClick={() => logoInputRef.current?.click()}
                        className="w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-1 hover:border-primary hover:text-primary transition-colors text-slate-400 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined">{logoUploading ? 'hourglass_top' : 'add_photo_alternate'}</span>
                        <span className="text-xs font-medium">{logoUploading ? '上傳中' : '上傳'}</span>
                      </button>
                    )}
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file || !supabase) return
                        setLogoUploading(true)
                        const ext = file.name.split('.').pop()
                        const path = `site/logo-${Date.now()}.${ext}`
                        const { error } = await supabase.storage.from('product-images').upload(path, file)
                        if (!error) {
                          const { data } = supabase.storage.from('product-images').getPublicUrl(path)
                          setGeneral((prev) => ({ ...prev, logo_url: data.publicUrl }))
                        }
                        setLogoUploading(false)
                        e.target.value = ''
                      }}
                    />
                    <div className="text-xs text-slate-400">
                      <p>建議尺寸：200x200px</p>
                      <p>支援 PNG、JPG、SVG</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">聯絡 Email</label>
                  <input className={inputClass} value={general.contact_email} onChange={(e) => setGeneral({ ...general, contact_email: e.target.value })} type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">聯絡電話</label>
                  <input className={inputClass} value={general.contact_phone} onChange={(e) => setGeneral({ ...general, contact_phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">公司地址</label>
                  <input className={inputClass} value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
                </div>
              </div>
            </section>

            {/* 首頁橫幅 */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">image</span>首頁橫幅 (Hero)
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">標籤文字</label>
                  <input className={inputClass} value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} placeholder="如：限時特賣 最高 20% 折扣" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">標題前段</label>
                    <input className={inputClass} value={hero.title_prefix} onChange={(e) => setHero({ ...hero, title_prefix: e.target.value })} placeholder="提升您的" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">標題重點（藍色）</label>
                    <input className={inputClass} value={hero.title_highlight} onChange={(e) => setHero({ ...hero, title_highlight: e.target.value })} placeholder="遊戲體驗" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">描述文字</label>
                  <textarea rows={2} className={inputClass} value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} placeholder="即時取得 Steam、PlayStation..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">按鈕文字</label>
                    <input className={inputClass} value={hero.button_text} onChange={(e) => setHero({ ...hero, button_text: e.target.value })} placeholder="立即選購" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">背景圖片網址</label>
                    <input className={inputClass} value={hero.image_url} onChange={(e) => setHero({ ...hero, image_url: e.target.value })} placeholder="https://..." />
                  </div>
                </div>
              </div>
            </section>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {saving ? '儲存中...' : '儲存設定'}
            </button>
          </div>
        )}
      </main>
  )
}
