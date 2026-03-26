import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useCRUD } from '../hooks/useCRUD';
import { engagements } from '../data/mockData';
import { Briefcase, Star, AlertTriangle, ThumbsUp } from 'lucide-react';

const columns = [
  { key:'id', label:'ID' },
  { key:'employee', label:'Employee', sortable:true },
  { key:'department', label:'Department', sortable:true },
  { key:'type', label:'Type', sortable:true },
  { key:'score', label:'Score', sortable:true, render: v => (
    <span className={`font-semibold ${v >= 85 ? 'text-green-600' : v >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{v}</span>
  )},
  { key:'date', label:'Date', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
  { key:'by', label:'Reviewed By' },
  { key:'feedback', label:'Feedback' },
];
const fields = [
  { key:'employee',   label:'Employee',    type:'text',   required:true },
  { key:'department', label:'Department',  type:'text' },
  { key:'type',       label:'Type',        type:'select', options:['Recognition','Training','Performance Rev','Survey','Coaching'] },
  { key:'score',      label:'Score (0-100)',type:'number' },
  { key:'date',       label:'Date',        type:'date' },
  { key:'feedback',   label:'Feedback',    type:'textarea' },
  { key:'status',     label:'Status',      type:'select', options:['Active','Flagged','Closed'] },
  { key:'by',         label:'Reviewed By', type:'text' },
];

export default function EMS() {
  const crud = useCRUD(engagements);
  const active = engagements.filter(e => e.status === 'Active').length;
  const flagged = engagements.filter(e => e.status === 'Flagged').length;
  const avgScore = Math.round(engagements.reduce((s, e) => s + e.score, 0) / engagements.length);
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Employee Management & Engagement" subtitle="Reviews · Training · Recognition · Surveys" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Records"  value={engagements.length} subtitle="engagements"  icon={Briefcase}    color="violet" trend={2}  />
        <StatCard title="Active"         value={active}             subtitle="in progress"  icon={ThumbsUp}     color="green"  trend={1}  />
        <StatCard title="Flagged"        value={flagged}            subtitle="need action"  icon={AlertTriangle}color="amber"  trend={-1} />
        <StatCard title="Avg Score"      value={avgScore}           subtitle="out of 100"   icon={Star}         color="indigo" trend={3}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search engagements…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-violet-300" />
          <button onClick={crud.openAdd} className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Record</button>
        </div>
        <DataTable data={crud.data} columns={columns} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Engagement' : 'Add Engagement'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
