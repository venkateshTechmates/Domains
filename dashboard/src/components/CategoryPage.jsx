import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const colorMap = {
  indigo:  { bg: 'bg-indigo-50',  icon: 'text-indigo-600',  border: 'border-l-indigo-400',  badge: 'bg-indigo-50 text-indigo-700',  btn: 'text-indigo-600'  },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-l-emerald-400', badge: 'bg-emerald-50 text-emerald-700',btn: 'text-emerald-600' },
  rose:    { bg: 'bg-rose-50',    icon: 'text-rose-600',    border: 'border-l-rose-400',    badge: 'bg-rose-50 text-rose-700',    btn: 'text-rose-600'    },
  violet:  { bg: 'bg-violet-50',  icon: 'text-violet-600',  border: 'border-l-violet-400',  badge: 'bg-violet-50 text-violet-700',  btn: 'text-violet-600'  },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-600',   border: 'border-l-amber-400',   badge: 'bg-amber-50 text-amber-700',   btn: 'text-amber-600'   },
  pink:    { bg: 'bg-pink-50',    icon: 'text-pink-600',    border: 'border-l-pink-400',    badge: 'bg-pink-50 text-pink-700',    btn: 'text-pink-600'    },
  yellow:  { bg: 'bg-yellow-50',  icon: 'text-yellow-700',  border: 'border-l-yellow-400',  badge: 'bg-yellow-50 text-yellow-700',  btn: 'text-yellow-700'  },
};

function ModuleCard({ name, description, icon: Icon, path, stats, color }) {
  const c = colorMap[color] || colorMap.indigo;
  return (
    <Link
      to={path}
      className={`group bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${c.border} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2.5 rounded-xl ${c.bg} flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight">{name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      {stats?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-2.5 text-center">
              <p className="text-base font-bold text-gray-800">{s.val}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className={`flex items-center gap-1 text-sm font-semibold ${c.btn} group-hover:gap-2 transition-all`}>
        Open Module <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export default function CategoryPage({ title, subtitle, icon: Icon, color, modules, backLabel = 'Dashboard' }) {
  const c = colorMap[color] || colorMap.indigo;
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`p-3.5 rounded-2xl ${c.bg}`}>
          <Icon className={`w-8 h-8 ${c.icon}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{subtitle} · {modules.length} module{modules.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {modules.map(m => (
          <ModuleCard key={m.name} {...m} color={m.color || color} />
        ))}
      </div>
    </div>
  );
}
