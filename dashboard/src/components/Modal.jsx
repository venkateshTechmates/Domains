import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, fields = [], initial = null, onSave }) {
  const [form, setForm] = useState({})

  useEffect(() => {
    if (isOpen) {
      const init = {}
      fields.forEach(f => { init[f.key] = initial?.[f.key] ?? f.default ?? '' })
      setForm(init)
    }
  }, [isOpen, initial])

  if (!isOpen) return null

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSave = () => {
    const required = fields.filter(f => f.required)
    const missing = required.find(f => !form[f.key])
    if (missing) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {fields.map(field => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  value={form[field.key] ?? ''}
                  onChange={e => set(field.key, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={form[field.key] ?? ''}
                  onChange={e => set(field.key, e.target.value)}
                  rows={3}
                  placeholder={field.placeholder ?? ''}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
                />
              ) : (
                <input
                  type={field.type ?? 'text'}
                  value={form[field.key] ?? ''}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder ?? ''}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {initial ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
