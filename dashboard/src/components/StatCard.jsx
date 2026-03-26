import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   border: 'border-blue-100',   ring: 'bg-blue-100' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  border: 'border-green-100',  ring: 'bg-green-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100', ring: 'bg-purple-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100', ring: 'bg-orange-100' },
  red:    { bg: 'bg-red-50',    icon: 'text-red-600',    border: 'border-red-100',    ring: 'bg-red-100' },
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100', ring: 'bg-indigo-100' },
  teal:   { bg: 'bg-teal-50',   icon: 'text-teal-600',   border: 'border-teal-100',   ring: 'bg-teal-100' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  border: 'border-amber-100',  ring: 'bg-amber-100' },
  rose:   { bg: 'bg-rose-50',   icon: 'text-rose-600',   border: 'border-rose-100',   ring: 'bg-rose-100' },
  cyan:   { bg: 'bg-cyan-50',   icon: 'text-cyan-600',   border: 'border-cyan-100',   ring: 'bg-cyan-100' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-100', ring: 'bg-violet-100' },
  slate:  { bg: 'bg-slate-50',  icon: 'text-slate-600',  border: 'border-slate-100',  ring: 'bg-slate-100' },
}

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', trend }) {
  const c = colorMap[color] ?? colorMap.blue

  return (
    <div className={`bg-white rounded-xl p-5 border ${c.border} shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${c.ring}`}>
          <Icon size={18} className={c.icon} />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            trend > 0 ? 'bg-green-50 text-green-700' :
            trend < 0 ? 'bg-red-50 text-red-700' :
            'bg-gray-50 text-gray-600'
          }`}>
            {trend > 0 ? <TrendingUp size={10} /> : trend < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
      <p className="text-sm text-gray-500 truncate">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5 truncate">{subtitle}</p>}
    </div>
  )
}
