import { useApp } from '../context/AppContext'
import { Menu, Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Dashboard',
  '/hms': 'Hospital Management System',
  '/hrms': 'HR Management System',
  '/crm': 'Customer Relationship Management',
  '/erp': 'Enterprise Resource Planning',
  '/ims': 'Inventory Management System',
  '/finance': 'Finance & Banking',
  '/lms': 'Learning Management System',
  '/cms': 'Content Management System',
  '/oms': 'Order Management System',
  '/wms': 'Warehouse Management System',
  '/iam': 'Identity & Access Management',
  '/workflow': 'Workflow Management',
  '/healthcare': 'Healthcare Systems',
  '/logistics': 'Logistics Management',
  '/ecommerce': 'E-Commerce Platform',
  '/education': 'Education Management',
  '/audit': 'Audit Logs',
  '/notifications': 'Notification System',
  '/sso': 'Single Sign-On',
}

export default function Header() {
  const { toggleSidebar } = useApp()
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'Dashboard'

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0 z-20">
      <button
        onClick={toggleSidebar}
        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1">
        <h1 className="text-base font-semibold text-gray-800 truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search modules..."
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 w-52"
          />
        </div>
        <button className="relative p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      </div>
    </header>
  )
}
