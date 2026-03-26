import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { risOrders } from '../data/mockData';
import { Radiation, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const cols = [
  { key:'id',           label:'ID' },
  { key:'patient',      label:'Patient',       sortable:true },
  { key:'exam',         label:'Exam',          sortable:true },
  { key:'physician',    label:'Ordered By',    sortable:true },
  { key:'priority',     label:'Priority' },
  { key:'orderedDate',  label:'Ordered',       sortable:true },
  { key:'completedDate',label:'Completed',     sortable:true },
  { key:'status',       label:'Status' },
];
const fields = [
  { key:'patient',      label:'Patient',       type:'text', required:true },
  { key:'exam',         label:'Exam/Procedure',type:'text', required:true },
  { key:'physician',    label:'Ordering MD',   type:'text' },
  { key:'priority',     label:'Priority',      type:'select', options:['Stat','Urgent','Routine','Elective'] },
  { key:'orderedDate',  label:'Ordered Date',  type:'date' },
  { key:'completedDate',label:'Completed Date',type:'date' },
  { key:'notes',        label:'Clinical Notes',type:'textarea' },
  { key:'status',       label:'Status',        type:'select', options:['Ordered','Scheduled','In Progress','Completed','Cancelled'] },
];

export default function RIS() {
  const crud = useCRUD(risOrders);
  const stat     = risOrders.filter(r => r.priority === 'Stat').length;
  const active   = risOrders.filter(r => r.status === 'Scheduled' || r.status === 'In Progress').length;
  const complete = risOrders.filter(r => r.status === 'Completed').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Radiology Information System" subtitle="Radiology orders · Scheduling · Workflow management" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders"  value={risOrders.length} subtitle="all referrals"  icon={Radiation}   color="rose"   trend={2}  />
        <StatCard title="STAT Orders"   value={stat}              subtitle="urgent"         icon={AlertCircle} color="red"    trend={-1} />
        <StatCard title="In Progress"   value={active}            subtitle="scheduled/active"icon={Clock}      color="amber"  trend={0}  />
        <StatCard title="Completed"     value={complete}          subtitle="finished"       icon={CheckCircle} color="green"  trend={3}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search orders…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">+ New Order</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Order' : 'New Radiology Order'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
