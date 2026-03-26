import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  LayoutDashboard, Building2, DollarSign, Heart, Shield, Truck,
  ShoppingBag, GraduationCap, ChevronDown, ChevronRight, Activity,
  Hospital, Users, Handshake, Layers, BookOpen, FileText, Package,
  Briefcase, TicketCheck, UserCog, Wallet, Landmark, PiggyBank,
  TrendingUp, CreditCard, FlaskConical, ClipboardList, Scan, Radiation,
  Key, GitBranch, Bell, ShoppingCart, Warehouse, Network, Tag,
  FileQuestion, Award
} from 'lucide-react'
import { useState } from 'react'

const navConfig = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/' }
    ]
  },
  {
    label: 'BUSINESS',
    catPath: '/cat/business',
    catIcon: Building2,
    items: [
      { label: 'Hospital (HMS)',   icon: Hospital,     path: '/hms' },
      { label: 'HR Management',   icon: Users,        path: '/hrms' },
      { label: 'CRM',             icon: Handshake,    path: '/crm' },
      { label: 'ERP',             icon: Layers,       path: '/erp' },
      { label: 'Learning (LMS)',  icon: BookOpen,     path: '/lms' },
      { label: 'Content (CMS)',   icon: FileText,     path: '/cms' },
      { label: 'Inventory (IMS)', icon: Package,      path: '/ims' },
      { label: 'Projects (PMS)',  icon: Briefcase,    path: '/pms' },
      { label: 'Tickets (TMS)',   icon: TicketCheck,  path: '/tms' },
      { label: 'Engagement (EMS)',icon: UserCog,      path: '/ems' },
    ]
  },
  {
    label: 'FINANCE',
    catPath: '/cat/finance',
    catIcon: DollarSign,
    items: [
      { label: 'Accounts',        icon: Wallet,       path: '/finance' },
      { label: 'Assets (AMS)',    icon: Package,      path: '/ams' },
      { label: 'Banking (BFSI)',  icon: Landmark,     path: '/bfsi' },
      { label: 'Budgets (BMS)',   icon: PiggyBank,    path: '/bms' },
      { label: 'Loans (LMS)',     icon: DollarSign,   path: '/lms-finance' },
      { label: 'Loan Orig. (LOS)',icon: FileText,     path: '/los' },
      { label: 'Portfolio (PMS)', icon: TrendingUp,   path: '/pms-finance' },
    ]
  },
  {
    label: 'HEALTHCARE',
    catPath: '/cat/healthcare',
    catIcon: Heart,
    items: [
      { label: 'Health Records (EHR)', icon: FileText,       path: '/ehr' },
      { label: 'Medical Rec. (EMR)',   icon: ClipboardList,  path: '/emr' },
      { label: 'Laboratory (LIS)',     icon: FlaskConical,   path: '/lis' },
      { label: 'Imaging (PACS)',       icon: Scan,           path: '/pacs' },
      { label: 'Radiology (RIS)',      icon: Radiation,      path: '/ris' },
    ]
  },
  {
    label: 'IT & SECURITY',
    catPath: '/cat/it',
    catIcon: Shield,
    items: [
      { label: 'Identity (IAM)', icon: Shield,        path: '/iam' },
      { label: 'SSO',            icon: Key,           path: '/sso' },
      { label: 'Workflow',       icon: GitBranch,     path: '/workflow' },
      { label: 'Notifications',  icon: Bell,          path: '/notifications' },
      { label: 'Audit Logs',     icon: ClipboardList, path: '/audit' },
    ]
  },
  {
    label: 'LOGISTICS',
    catPath: '/cat/logistics',
    catIcon: Truck,
    items: [
      { label: 'Orders (OMS)',   icon: ShoppingCart,  path: '/oms' },
      { label: 'Warehouse (WMS)',icon: Warehouse,     path: '/wms' },
      { label: 'Fleet (FMS)',    icon: Truck,         path: '/fms' },
      { label: 'Supply Chain',   icon: Network,       path: '/scm' },
    ]
  },
  {
    label: 'E-COMMERCE',
    catPath: '/cat/ecommerce',
    catIcon: ShoppingBag,
    items: [
      { label: 'Product Info (PIM)', icon: Tag,       path: '/pim' },
      { label: 'Payments',           icon: CreditCard,path: '/payment-gateway' },
    ]
  },
  {
    label: 'EDUCATION',
    catPath: '/cat/education',
    catIcon: GraduationCap,
    items: [
      { label: 'Student Mgmt (SMS)',  icon: Users,        path: '/sms' },
      { label: 'Exam Management',     icon: FileQuestion, path: '/exam-management' },
      { label: 'Edu Management',      icon: Award,        path: '/edu-ems' },
    ]
  }
]

function NavGroup({ group, collapsed }) {
  const [open, setOpen] = useState(true)
  const location = useLocation()

  const isGroupActive = group.items.some(item =>
    item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
  )

  return (
    <div className="mb-1">
      {!collapsed && (
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-300 transition-colors"
        >
          {group.catPath ? (
            <NavLink
              to={group.catPath}
              onClick={e => e.stopPropagation()}
              className={({ isActive }) =>
                `flex items-center gap-1.5 hover:text-indigo-400 transition-colors ${isActive ? 'text-indigo-400' : ''}`
              }
            >
              {group.catIcon && <group.catIcon size={11} />}
              <span>{group.label}</span>
            </NavLink>
          ) : (
            <span>{group.label}</span>
          )}
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
      )}
      {(open || collapsed) && (
        <div>
          {group.items.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg mx-1 mb-0.5 text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`
              }
            >
              <item.icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const { sidebarOpen } = useApp()
  const collapsed = !sidebarOpen

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-700/50 z-30 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-14 px-4 border-b border-slate-700/50 flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Activity size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">Domains</p>
            <p className="text-slate-400 text-xs">Admin Dashboard</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 sidebar-scroll">
        {navConfig.map(group => (
          <NavGroup key={group.label} group={group} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer */}
      <div className={`border-t border-slate-700/50 p-3 flex-shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center gap-2 ${collapsed ? '' : 'px-1'}`}>
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">Admin User</p>
              <p className="text-slate-400 text-xs truncate">admin@domains.app</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
