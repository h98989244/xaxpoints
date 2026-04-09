import { useState, useEffect, type FormEvent } from 'react';
import { Save, Mail, Phone, MapPin, Hash, Store, Clock } from 'lucide-react';
import { api } from '../../lib/api';
import { useSettings } from '../../contexts/SettingsContext';
import type { SiteSettings } from '../../lib/types';

const fields = [
  { key: 'store_name', label: '商店名稱', icon: Store, placeholder: '佐和點數王' },
  { key: 'email', label: '聯絡信箱', icon: Mail, placeholder: 'support@example.com' },
  { key: 'phone', label: '聯絡電話', icon: Phone, placeholder: '02-1234-5678' },
  { key: 'address', label: '營業地址', icon: MapPin, placeholder: '台北市中山區XX路XX號' },
  { key: 'tax_id', label: '統一編號', icon: Hash, placeholder: '12345678' },
  { key: 'service_hours', label: '服務時間', icon: Clock, placeholder: '週一至週五 09:00 - 18:00' },
] as const;

export default function AdminSettings() {
  const { settings: current, refresh } = useSettings();
  const [form, setForm] = useState<SiteSettings>({ ...current });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({ ...current });
  }, [current]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      await api.updateSettings(form);
      refresh();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">網站設定</h1>

      <form onSubmit={handleSubmit}>
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-1.5">
                  <field.icon className="w-4 h-4 text-[#C9A84C]" />
                  {field.label}
                </label>
                <input
                  type="text"
                  value={form[field.key] || ''}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full bg-[#16213E] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          {saved && (
            <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg p-3">
              設定已儲存成功！
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold flex items-center gap-2 px-6 py-3 rounded-xl disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? '儲存中...' : '儲存設定'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
