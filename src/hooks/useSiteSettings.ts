import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { SiteSetting } from '../types'

export default function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    if (!supabase) {
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('site_settings')
      .select('*')
    setSettings(data ?? [])
    setLoading(false)
  }

  function getSetting(key: string) {
    return settings.find(s => s.key === key)?.value ?? {}
  }

  async function updateSetting(key: string, value: Record<string, unknown>) {
    if (!supabase) return { error: '尚未連接資料庫' }
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' })
    if (!error) {
      setSettings(prev => {
        const exists = prev.some(s => s.key === key)
        if (exists) return prev.map(s => s.key === key ? { ...s, value } : s)
        return [...prev, { id: '', key, value, updated_at: new Date().toISOString() }]
      })
    }
    return { error: error?.message }
  }

  return { settings, loading, getSetting, updateSetting, refetch: fetchSettings }
}
