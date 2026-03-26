import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { labTests } from '../data/mockData';
import { FlaskConical, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const cols = [
  { key:'id',        label:'ID' },
  { key:'testId',    label:'Test ID',   sortable:true },
  { key:'patient',   label:'Patient',   sortable:true },
  { key:'type',      label:'Test Type', sortable:true },
  { key:'ordered',   label:'Ordered',   sortable:true },
  { key:'resulted',  label:'Resulted',  sortable:true },
  { key:'lab',       label:'Lab',       sortable:true },
  { key:'status',    label:'Status' },
];
const fields = [
  { key:'testId',  label:'Test ID',   type:'text', required:true },
  { key:'patient', label:'Patient',   type:'text', required:true },
  { key:'type',    label:'Test Type', type:'text' },
  { key:'ordered', label:'Ordered',   type:'date' },
  { key:'resulted',label:'Resulted',  type:'date' },
  { key:'lab',     label:'Lab',       type:'text' },
  { key:'status',  label:'Status',    type:'select', options:['Ordered','In Progress','Resulted','Reviewed','Cancelled'] },
];

export default function LIS() {
  const crud = useCRUD(labTests);
  const pending  = labTests.filter(t => t.status === 'In Progress' || t.status === 'Ordered').length;
  const resulted = labTests.filter(t => t.status === 'Resulted' || t.status === 'Reviewed').length;
  const reviewed = labTests.filter(t => t.status === 'Reviewed').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Laboratory Information System" subtitle="Lab orders · Results tracking · Specimen management" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders"  value={labTests.length} subtitle="all tests"    icon={FlaskConical}   color="rose"   trend={4}  />
        <StatCard title="Pending"       value={pending}          subtitle="in progress"  icon={Clock}          color="amber"  trend={0}  />
        <StatCard title="Resulted"      value={resulted}         subtitle="completed"    icon={CheckCircle}    color="green"  trend={3}  />
        <StatCard title="Reviewed"      value={reviewed}         subtitle="by physician" icon={AlertTriangle}  color="indigo" trend={2}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search lab tests…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Lab Order</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Lab Order' : 'New Lab Order'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
