import { useState, useEffect } from 'react'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import useSiteSettings from '../../hooks/useSiteSettings'

export default function Settings() {
  const { loading, getSetting, updateSetting, refetch } = useSiteSettings()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [general, setGeneral] = useState({
    site_name: '', company_name: '', tax_id: '', logo_url: '',
    contact_email: '', contact_phone: '', address: '',
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
    }
  }, [loading, getSetting])

  async function handleSave() {
    setSaving(true)
    setMessage('')
    const result = await updateSetting('general', general)
    if (result.error) {
      setMessage(`儲存失敗：${result.error}`)
    } else {
      setMessage('設定已儲存')
      refetch()
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">網站設定</h1>
        <p className="text-slate-500 mb-8">管理網站基本資訊</p>

        {loading ? <LoadingSpinner /> : (
          <div className="space-y-8">
            {message && (
              <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('失敗') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                {message}
              </div>
            )}

            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings</span>一般資訊
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">網站名稱</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" value={general.site_name} onChange={(e) => setGeneral({ ...general, site_name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">公司名稱</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" value={general.company_name} onChange={(e) => setGeneral({ ...general, company_name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">統一編號</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" value={general.tax_id} onChange={(e) => setGeneral({ ...general, tax_id: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">聯絡 Email</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" value={general.contact_email} onChange={(e) => setGeneral({ ...general, contact_email: e.target.value })} type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">聯絡電話</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" value={general.contact_phone} onChange={(e) => setGeneral({ ...general, contact_phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-400">公司地址</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-primary" value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
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
