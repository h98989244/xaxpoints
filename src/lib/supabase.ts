import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export function getSupabase() {
  if (!supabase) {
    console.warn('Supabase 尚未設定環境變數，請設定 VITE_SUPABASE_URL 與 VITE_SUPABASE_ANON_KEY')
  }
  return supabase
}
