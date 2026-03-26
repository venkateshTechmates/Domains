import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  LayoutDashboard, Building2, Users, Handshake, Layers, FileText,
  GraduationCap, Package, ShoppingCart, Warehouse, Truck,
  Banknote, Heart, ShoppingBag, School, Shield, Key,
  GitBranch, Bell, ClipboardList, ChevronDown, ChevronRight,
  Stethoscope, Activity
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
    items: [
      { label: 'Hospital (HMS)', icon: Building2, path: '/hms' },
      { label: 'HR Management', icon: Users, path: '/hrms' },
      { label: 'CRM', icon: Handshake, path: '/crm' },
      { label: 'ERP', icon: Layers, path: '/erp' },
      { label: 'Content (CMS)', icon: FileText, path: '/cms' },
      { label: 'Learning (LMS)', icon: GraduationCap, path: '/lms' },
    ]
  },
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Inventory (IMS)', icon: Package, path: '/ims' },
      { label: 'Orders (OMS)', icon: ShoppingCart, path: '/oms' },
      { label: 'Warehouse (WMS)', icon: Warehouse, path: '/wms' },
      { label: 'Logistics', icon: Truck, path: '/logistics' },
    ]
  },
  {
    label: 'FINANCE',
    items: [
      { label: 'Finance & Banking', icon: Banknote, path: '/finance' },
    ]
  },
  {
    label: 'HEALTHCARE',
    items: [
      { label: 'EMR / EHR / LIS', icon: Stethoscope, path: '/healthcare' },
    ]
  },
  {
    label: 'E-COMMERCE',
    items: [
      { label: 'E-Commerce', icon: ShoppingBag, path: '/ecommerce' },
    ]
  },
  {
    label: 'EDUCATION',
    items: [
      { label: 'Education', icon: School, path: '/education' },
    ]
  },
  {
    label: 'IT & SECURITY',
    items: [
      { label: 'Identity (IAM)', icon: Shield, path: '/iam' },
      { label: 'SSO', icon: Key, path: '/sso' },
      { label: 'Workflow', icon: GitBranch, path: '/workflow' },
      { label: 'Notifications', icon: Bell, path: '/notifications' },
      { label: 'Audit Logs', icon: ClipboardList, path: '/audit' },
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
          <span>{group.label}</span>
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
