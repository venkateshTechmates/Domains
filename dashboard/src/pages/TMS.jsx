import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useCRUD } from '../hooks/useCRUD';
import { tickets } from '../data/mockData';
import { Bug, AlertOctagon, Wrench, CheckCircle } from 'lucide-react';

const columns = [
  { key:'id', label:'ID' },
  { key:'title', label:'Title', sortable:true },
  { key:'type', label:'Type', sortable:true, render: v => <Badge status={v} /> },
  { key:'priority', label:'Priority', sortable:true, render: v => <Badge status={v} /> },
  { key:'status', label:'Status', sortable:true, render: v => <Badge status={v} /> },
  { key:'assignee', label:'Assignee', sortable:true },
  { key:'reporter', label:'Reporter' },
  { key:'category', label:'Category' },
  { key:'created', label:'Created', sortable:true },
];
const fields = [
  { key:'title',    label:'Title',    type:'text',   required:true },
  { key:'type',     label:'Type',     type:'select', options:['Bug','Feature','Performance','Documentation','Security','Task'] },
  { key:'priority', label:'Priority', type:'select', options:['Critical','High','Medium','Low'] },
  { key:'status',   label:'Status',   type:'select', options:['Open','In Progress','Planned','Resolved','Closed'] },
  { key:'assignee', label:'Assignee', type:'text' },
  { key:'reporter', label:'Reporter', type:'text' },
  { key:'category', label:'Category', type:'text' },
];

export default function TMS() {
  const crud = useCRUD(tickets);
  const open = tickets.filter(t => t.status === 'Open').length;
  const critical = tickets.filter(t => t.priority === 'Critical').length;
  const resolved = tickets.filter(t => t.status === 'Resolved').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Ticket Management" subtitle="Bugs · Features · Support · Tracking" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tickets"  value={tickets.length} subtitle="all types"    icon={Bug}         color="rose"   trend={-2} />
        <StatCard title="Open"           value={open}           subtitle="unresolved"   icon={AlertOctagon}color="amber"  trend={-1} />
        <StatCard title="Critical"       value={critical}       subtitle="high priority"icon={Wrench}      color="red"    trend={0}  />
        <StatCard title="Resolved"       value={resolved}       subtitle="closed"       icon={CheckCircle} color="green"  trend={3}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search tickets…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">+ New Ticket</button>
        </div>
        <DataTable data={crud.data} columns={columns} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Ticket' : 'New Ticket'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
