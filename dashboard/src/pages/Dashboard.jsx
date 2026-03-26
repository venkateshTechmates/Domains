import { Link } from 'react-router-dom';
import {
  Building2, DollarSign, Heart, Shield, Truck, ShoppingBag, GraduationCap,
  ChevronRight, Activity, TrendingUp, Users, Globe, LayoutGrid
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { monthlyRevenue, orderStatus } from '../data/mockData';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const categories = [
  { name:'Business Systems',  description:'HMS Â· HRMS Â· CRM Â· ERP Â· LMS Â· CMS Â· IMS Â· PMS Â· TMS Â· EMS', icon:Building2,    path:'/cat/business',  color:'indigo',  modules:10, stats:[{label:'Modules',val:'10'},{label:'Employees',val:'84'}] },
  { name:'Finance & Banking', description:'Accounts Â· Loans Â· Assets Â· Budgets Â· Portfolio Â· BFSI',      icon:DollarSign,   path:'/cat/finance',   color:'emerald', modules:7,  stats:[{label:'Modules',val:'7'},{label:'Active Loans',val:'9'}] },
  { name:'Healthcare',        description:'EHR Â· EMR Â· Laboratory (LIS) Â· PACS Â· Radiology (RIS)',       icon:Heart,        path:'/cat/healthcare',color:'rose',    modules:5,  stats:[{label:'Modules',val:'5'},{label:'Patients',val:'10'}] },
  { name:'IT & Security',     description:'IAM Â· SSO Â· Workflow Â· Notifications Â· Audit Logs',            icon:Shield,       path:'/cat/it',        color:'violet',  modules:5,  stats:[{label:'Modules',val:'5'},{label:'IAM Users',val:'10'}] },
  { name:'Logistics',         description:'OMS Â· WMS Â· Fleet Management Â· Supply Chain',                  icon:Truck,        path:'/cat/logistics', color:'amber',   modules:4,  stats:[{label:'Modules',val:'4'},{label:'Fleet',val:'7'}] },
  { name:'E-Commerce',        description:'Product Information Management Â· Payment Gateway',              icon:ShoppingBag,  path:'/cat/ecommerce', color:'pink',    modules:2,  stats:[{label:'Modules',val:'2'},{label:'Products',val:'7'}] },
  { name:'Education',         description:'Student Management Â· Exam Management Â· EMS',                   icon:GraduationCap,path:'/cat/education', color:'yellow',  modules:3,  stats:[{label:'Modules',val:'3'},{label:'Students',val:'10'}] },
];

const CS = {
  indigo:  {border:'border-indigo-200',  hb:'hover:border-indigo-400',  bg:'bg-indigo-50',  ico:'text-indigo-600',  badge:'bg-indigo-50 text-indigo-700',  lnk:'text-indigo-600'},
  emerald: {border:'border-emerald-200', hb:'hover:border-emerald-400', bg:'bg-emerald-50', ico:'text-emerald-600', badge:'bg-emerald-50 text-emerald-700', lnk:'text-emerald-600'},
  rose:    {border:'border-rose-200',    hb:'hover:border-rose-400',    bg:'bg-rose-50',    ico:'text-rose-600',    badge:'bg-rose-50 text-rose-700',       lnk:'text-rose-600'},
  violet:  {border:'border-violet-200',  hb:'hover:border-violet-400',  bg:'bg-violet-50',  ico:'text-violet-600',  badge:'bg-violet-50 text-violet-700',  lnk:'text-violet-600'},
  amber:   {border:'border-amber-200',   hb:'hover:border-amber-400',   bg:'bg-amber-50',   ico:'text-amber-600',   badge:'bg-amber-50 text-amber-700',    lnk:'text-amber-600'},
  pink:    {border:'border-pink-200',    hb:'hover:border-pink-400',    bg:'bg-pink-50',    ico:'text-pink-600',    badge:'bg-pink-50 text-pink-700',       lnk:'text-pink-600'},
  yellow:  {border:'border-yellow-200',  hb:'hover:border-yellow-400',  bg:'bg-yellow-50',  ico:'text-yellow-700',  badge:'bg-yellow-50 text-yellow-700',  lnk:'text-yellow-700'},
};

function CategoryCard({ name, description, icon:Icon, path, color, modules, stats }) {
  const c = CS[color];
  return (
    <Link to={path} className={`group bg-white rounded-2xl p-6 border-2 ${c.border} ${c.hb} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${c.bg}`}><Icon className={`w-7 h-7 ${c.ico}`} /></div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>{modules} modules</span>
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-indigo-700 transition-colors">{name}</h3>
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">{description}</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-2.5 text-center">
            <p className="text-lg font-bold text-gray-800">{s.val}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
      <div className={`flex items-center gap-1 text-sm font-semibold ${c.lnk} group-hover:gap-2 transition-all`}>
        Explore Modules <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const totalModules = categories.reduce((s, c) => s + c.modules, 0);
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            {' Â· '}{totalModules} modules across {categories.length} domains
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
          <Activity className="w-4 h-4" /> All Systems Operational
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Domains',       value:categories.length, icon:Globe,      cls:'bg-indigo-50 text-indigo-600' },
          { label:'Total Modules', value:totalModules,      icon:LayoutGrid, cls:'bg-purple-50 text-purple-600' },
          { label:'Active Users',  value:'284',             icon:Users,      cls:'bg-emerald-50 text-emerald-600' },
          { label:'Monthly Rev',   value:'$241K',           icon:TrendingUp, cls:'bg-rose-50 text-rose-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className={`inline-flex p-2 rounded-lg ${k.cls} mb-3`}><k.icon className="w-5 h-5" /></div>
            <p className="text-2xl font-bold text-gray-900">{k.value}</p>
            <p className="text-sm text-gray-600 font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 mb-4">Monthly Revenue</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize:12 }} />
              <YAxis tick={{ fontSize:12 }} tickFormatter={v => '$' + (v/1000).toFixed(0) + 'K'} />
              <Tooltip formatter={v => ['$' + (v/1000).toFixed(0) + 'K', 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ fill:'#6366f1', r:4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <p className="font-semibold text-gray-800 mb-3">Order Distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={orderStatus} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                {orderStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl font-bold text-gray-900">Domains</h2>
          <span className="text-sm text-gray-400">â€” click to explore modules</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map(cat => <CategoryCard key={cat.name} {...cat} />)}
        </div>
      </div>
    </div>
  );
}
