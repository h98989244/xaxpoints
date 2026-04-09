import { useEffect, useState } from 'react';
import { ShoppingCart, Clock, DollarSign, CalendarDays } from 'lucide-react';
import { api } from '../../lib/api';
import type { Stats } from '../../lib/types';

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getStats()
      .then((data) => setStats((data as any).stats ?? data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      icon: ShoppingCart,
      label: '總訂單數',
      value: stats?.total_orders ?? 0,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Clock,
      label: '待處理訂單',
      value: stats?.pending_orders ?? 0,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: DollarSign,
      label: '總營收',
      value: stats ? `NT$${(stats.total_revenue ?? 0).toLocaleString()}` : 'NT$0',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      icon: CalendarDays,
      label: '今日訂單',
      value: stats?.today_orders ?? 0,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-10 bg-[#253448] rounded w-10 mb-4" />
              <div className="h-4 bg-[#253448] rounded w-1/2 mb-2" />
              <div className="h-8 bg-[#253448] rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="card p-6">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <p className="text-gray-400 text-sm">{card.label}</p>
              <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
