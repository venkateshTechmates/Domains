const statusStyles = {
  // Generic
  active:      'bg-green-100 text-green-700',
  inactive:    'bg-gray-100 text-gray-600',
  pending:     'bg-yellow-100 text-yellow-700',
  archived:    'bg-gray-100 text-gray-500',
  // Patient/Health
  admitted:    'bg-blue-100 text-blue-700',
  discharged:  'bg-green-100 text-green-700',
  outpatient:  'bg-purple-100 text-purple-700',
  critical:    'bg-red-100 text-red-700',
  // Employee
  'on leave':  'bg-orange-100 text-orange-700',
  resigned:    'bg-red-100 text-red-700',
  // Order / Shipment
  processing:  'bg-blue-100 text-blue-700',
  shipped:     'bg-indigo-100 text-indigo-700',
  delivered:   'bg-green-100 text-green-700',
  cancelled:   'bg-red-100 text-red-700',
  returned:    'bg-orange-100 text-orange-700',
  // Leads / Deals
  new:         'bg-sky-100 text-sky-700',
  contacted:   'bg-blue-100 text-blue-700',
  qualified:   'bg-violet-100 text-violet-700',
  proposal:    'bg-purple-100 text-purple-700',
  negotiation: 'bg-amber-100 text-amber-700',
  won:         'bg-green-100 text-green-700',
  lost:        'bg-red-100 text-red-700',
  // Finance
  paid:        'bg-green-100 text-green-700',
  overdue:     'bg-red-100 text-red-700',
  draft:       'bg-gray-100 text-gray-600',
  // Workflow / Tasks
  open:        'bg-blue-100 text-blue-700',
  'in progress': 'bg-yellow-100 text-yellow-700',
  completed:   'bg-green-100 text-green-700',
  approved:    'bg-green-100 text-green-700',
  rejected:    'bg-red-100 text-red-700',
  review:      'bg-purple-100 text-purple-700',
  // Access
  enabled:     'bg-green-100 text-green-700',
  disabled:    'bg-red-100 text-red-700',
  suspended:   'bg-orange-100 text-orange-700',
  // Content
  published:   'bg-green-100 text-green-700',
  'in stock':  'bg-green-100 text-green-700',
  'low stock': 'bg-yellow-100 text-yellow-700',
  'out of stock': 'bg-red-100 text-red-700',
  // Log levels
  info:        'bg-blue-100 text-blue-700',
  warning:     'bg-yellow-100 text-yellow-700',
  error:       'bg-red-100 text-red-700',
  success:     'bg-green-100 text-green-700',
}

export default function Badge({ status }) {
  const key = String(status ?? '').toLowerCase()
  const style = statusStyles[key] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  )
}
