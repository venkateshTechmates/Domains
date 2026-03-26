import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { employees, departments, inventoryItems, orders, monthlyRevenue } from '../data/mockData';
import { Building2, Users, Package, TrendingUp, DollarSign, Briefcase } from 'lucide-react';

const deptData = departments.map(d => ({ name: d.name.substring(0, 4), employees: d.employees }));

export default function ERP() {
  const totalRevenue = '$241,000';
  const activeEmps   = employees.filter(e => e.status === 'Active').length;
  const totalItems   = inventoryItems.length;
  const openOrders   = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Enterprise Resource Planning" subtitle="Unified view across all business operations" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Revenue" value={totalRevenue} subtitle="Mar 2024"       icon={DollarSign}  color="emerald" trend={12}  />
        <StatCard title="Active Staff"    value={activeEmps}   subtitle="employees"      icon={Users}       color="purple"  trend={4}   />
        <StatCard title="Inventory SKUs"  value={totalItems}   subtitle="tracked"        icon={Package}     color="amber"   trend={0}   />
        <StatCard title="Open Orders"     value={openOrders}   subtitle="in processing"  icon={Briefcase}   color="indigo"  trend={-2}  />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Monthly Revenue (MoM)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`$${(v/1000).toFixed(0)}K`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Headcount by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="employees" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700">Department Overview</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Department','Head','Staff','Budget'].map(h => (
                  <th key={h} className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {departments.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-800">{d.name}</td>
                  <td className="px-4 py-2 text-gray-500">{d.head}</td>
                  <td className="px-4 py-2 text-gray-700">{d.employees}</td>
                  <td className="px-4 py-2 text-gray-700">{d.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700">Key Business Metrics</div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {[
              { label: 'Revenue Growth', value: '+12%',    color: 'text-emerald-600', icon: TrendingUp },
              { label: 'Employee Turnover', value: '8.3%', color: 'text-amber-600',   icon: Users },
              { label: 'Gross Margin', value: '62%',       color: 'text-indigo-600',  icon: DollarSign },
              { label: 'Dept. Count', value: departments.length, color: 'text-purple-600', icon: Building2 },
              { label: 'Low-Stock Items', value: inventoryItems.filter(i=>i.status==='Low Stock').length, color: 'text-rose-600', icon: Package },
              { label: 'Won Deals', value: 1,              color: 'text-green-600',   icon: Briefcase },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <m.icon className={`w-5 h-5 ${m.color}`} />
                <div>
                  <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-gray-500">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
