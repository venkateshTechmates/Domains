import { useState, useMemo } from 'react'

let idCounter = 10000

export function useCRUD(initialData = []) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(item =>
      Object.values(item).some(v => String(v ?? '').toLowerCase().includes(q))
    )
  }, [data, search])

  const openAdd = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (item) => { setEditing(item); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const save = (form) => {
    if (editing) {
      setData(prev => prev.map(item => item.id === editing.id ? { ...item, ...form } : item))
    } else {
      idCounter++
      setData(prev => [...prev, { ...form, id: `GEN${idCounter}` }])
    }
    closeModal()
  }

  const remove = (id) => setData(prev => prev.filter(item => item.id !== id))

  return {
    data: filtered,
    allData: data,
    search,
    setSearch,
    modalOpen,
    editing,
    openAdd,
    openEdit,
    closeModal,
    save,
    remove,
    deleteTarget,
    setDeleteTarget,
  }
}
