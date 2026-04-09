import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';
import type { SiteSettings } from '../lib/types';

const defaults: SiteSettings = {
  email: '',
  phone: '',
  address: '',
  tax_id: '',
  store_name: '佐和點數王',
  service_hours: '',
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  refresh: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    api
      .getSettings()
      .then((data) => setSettings({ ...defaults, ...data.settings }))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh: fetch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
