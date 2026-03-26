import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  LayoutDashboard, Building2, Users, Handshake, Package, ShoppingCart,
  Warehouse, Truck, Banknote, Heart, ShoppingBag, GraduationCap, Shield,
  Key, GitBranch, Bell, ClipboardList, FileText, Activity, TrendingUp,
  Database, Server, Globe
} from 'lucide-react';
import { monthlyRevenue, deptHeadcount, orderStatus, attendanceTrend } from '../data/mockData';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const modules = [
  {
    category: 'Business Systems',
    color: 'from-indigo-500 to-blue-600',
    items: [
      { name: 'HMS', subtitle: 'Hospital Management', icon: Building2,    path: '/hms',       stats: [{ label: 'Patients', val: '10' }, { label: 'Doctors', val: '8' }],    border: 'border-blue-400' },
      { name: 'HRMS', subtitle: 'Human Resources',    icon: Users,         path: '/hrms',      stats: [{ label: 'Employees', val: '84' }, { label: 'On Leave', val: '1' }],  border: 'border-purple-400' },
      { name: 'CRM', subtitle: 'Customer Relations',  icon: Handshake,     path: '/crm',       stats: [{ label: 'Leads', val: '10' }, { label: 'Open Deals', val: '6' }],   border: 'border-indigo-400' },
      { name: 'ERP', subtitle: 'Enterprise Resource', icon: Database,      path: '/erp',       stats: [{ label: 'Departments', val: '6' }, { label: 'Revenue', val: '$241K' }],border: 'border-sky-400' },
      { name: 'LMS', subtitle: 'Learning Management', icon: GraduationCap, path: '/lms',       stats: [{ label: 'Courses', val: '8' }, { label: 'Learners', val: '8' }],    border: 'border-green-400' },
      { name: 'CMS', subtitle: 'Content Management',  icon: FileText,      path: '/cms',       stats: [{ label: 'Pages', val: '8' }, { label: 'Media Files', val: '6' }],   border: 'border-orange-400' },
    ]
  },
  {
    category: 'Operations',
    color: 'from-amber-500 to-orange-600',
    items: [
      { name: 'IMS', subtitle: 'Inventory Management',icon: Package,       path: '/ims',       stats: [{ label: 'SKUs', val: '12' }, { label: 'Low Stock', val: '2' }],     border: 'border-amber-400' },
      { name: 'OMS', subtitle: 'Order Management',    icon: ShoppingCart,  path: '/oms',       stats: [{ label: 'Orders', val: '10' }, { label: 'Pending', val: '3' }],     border: 'border-teal-400' },
      { name: 'WMS', subtitle: 'Warehouse Management',icon: Warehouse,     path: '/wms',       stats: [{ label: 'Warehouses', val: '6' }, { label: 'Shipments', val: '8' }],border: 'border-cyan-400' },
      { name: 'Logistics', subtitle: 'Supply Chain & Fleet',icon: Truck,   path: '/logistics', stats: [{ label: 'Routes', val: '6' }, { label: 'Fleet', val: '7' }],        border: 'border-orange-400' },
    ]
  },
  {
    category: 'Finance',
    color: 'from-emerald-500 to-green-600',
    items: [
      { name: 'Finance', subtitle: 'Banking & Accounts', icon: Banknote, path: '/finance', stats: [{ label: 'Accounts', val: '6' }, { label: 'Invoices', val: '8' }], border: 'border-emerald-400' },
    ]
  },
  {
    category: 'Healthcare',
    color: 'from-rose-500 to-red-600',
    items: [
      { name: 'Healthcare', subtitle: 'EMR · LIS · Radiology', icon: Heart, path: '/healthcare', stats: [{ label: 'EMR Records', val: '8' }, { label: 'Lab Tests', val: '8' }], border: 'border-rose-400' },
    ]
  },
  {
    category: 'E-Commerce',
    color: 'from-pink-500 to-purple-600',
    items: [
      { name: 'E-Commerce', subtitle: 'PIM · Payments', icon: ShoppingBag, path: '/ecommerce', stats: [{ label: 'Products', val: '7' }, { label: 'Payments', val: '9' }], border: 'border-pink-400' },
    ]
  },
  {
    category: 'Education',
    color: 'from-yellow-500 to-amber-600',
    items: [
      { name: 'Education', subtitle: 'Students · Exams · Courses', icon: GraduationCap, path: '/education', stats: [{ label: 'Students', val: '10' }, { label: 'Exams', val: '7' }], border: 'border-yellow-400' },
    ]
  },
  {
    category: 'IT & Security',
    color: 'from-violet-500 to-indigo-600',
    items: [
      { name: 'IAM', subtitle: 'Identity & Access',    icon: Shield,        path: '/iam',          stats: [{ label: 'Users', val: '10' }, { label: 'Roles', val: '6' }],        border: 'border-violet-400' },
      { name: 'SSO', subtitle: 'Single Sign-On',       icon: Key,           path: '/sso',          stats: [{ label: 'Apps', val: '8' }, { label: 'Sessions', val: '7' }],       border: 'border-indigo-400' },
      { name: 'Workflow', subtitle: 'Process Automation',icon: GitBranch,   path: '/workflow',     stats: [{ label: 'Processes', val: '8' }, { label: 'Tasks', val: '10' }],     border: 'border-slate-400' },
      { name: 'Notifications', subtitle: 'Alerts & Alerts',icon: Bell,      path: '/notifications',stats: [{ label: 'Templates', val: '9' }, { label: 'Sent Today', val: '8' }], border: 'border-yellow-400' },
      { name: 'Audit Logs', subtitle: 'Security Audit',icon: ClipboardList, path: '/audit',        stats: [{ label: 'Events Today', val: '12' }, { label: 'Warnings', val: '3' }],border: 'border-gray-400' },
    ]
  },
];

function ModuleCard({ name, subtitle, icon: Icon, path, stats, border }) {
  return (
    <Link
      to={path}
      className={`bg-white rounded-xl p-4 border-l-4 ${border} hover:shadow-md transition-all duration-200 group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-base font-bold text-gray-900">{s.val}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-medium">
          <Activity className="w-4 h-4" />
          All Systems Operational
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Modules', value: '20', sub: 'across 7 categories', icon: Globe, color: 'indigo' },
          { label: 'Active Employees', value: '84', sub: '1 on leave', icon: Users, color: 'purple' },
          { label: 'Monthly Revenue', value: '$241K', sub: '+12% vs last month', icon: TrendingUp, color: 'emerald' },
          { label: 'Open Incidents', value: '3', sub: '2 warnings, 1 error', icon: Server, color: 'rose' },
        ].map(k => {
          const colors = {
            indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', value: 'text-indigo-700' },
            purple: { bg: 'bg-purple-50', icon: 'text-purple-600', value: 'text-purple-700' },
            emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', value: 'text-emerald-700' },
            rose: { bg: 'bg-rose-50', icon: 'text-rose-600', value: 'text-rose-700' },
          };
          const c = colors[k.color];
          return (
            <div key={k.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-3`}>
                <k.icon className={`w-5 h-5 ${c.icon}`} />
              </div>
              <p className={`text-2xl font-bold ${c.value}`}>{k.value}</p>
              <p className="text-sm text-gray-700 font-medium">{k.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 mb-4">Monthly Revenue Trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`$${(v/1000).toFixed(0)}K`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 mb-4">Headcount by Dept</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptHeadcount} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={45} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 mb-4">Order Status Distribution</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={orderStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                  {orderStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {orderStatus.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    {s.name}
                  </span>
                  <span className="font-semibold text-gray-700">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 mb-4">Attendance Rate (%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={attendanceTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={v => [`${v}%`, 'Attendance']} />
              <Bar dataKey="rate" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Module grid by category */}
      {modules.map(group => (
        <div key={group.category}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">{group.category}</h2>
            <div className={`h-0.5 flex-1 bg-gradient-to-r ${group.color} opacity-30 rounded`} />
            <span className="text-xs text-gray-400">{group.items.length} module{group.items.length > 1 ? 's' : ''}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {group.items.map(m => <ModuleCard key={m.name} {...m} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
