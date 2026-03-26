import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { emrRecords } from '../data/mockData';
import { ClipboardList, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const cols = [
  { key:'id',            label:'ID' },
  { key:'patient',       label:'Patient',      sortable:true },
  { key:'dob',           label:'DOB' },
  { key:'diagnosis',     label:'Diagnosis',    sortable:true },
  { key:'doctor',        label:'Doctor',       sortable:true },
  { key:'ward',          label:'Ward' },
  { key:'admissionDate', label:'Admitted',     sortable:true },
  { key:'dischargeDate', label:'Discharged',   sortable:true },
  { key:'status',        label:'Status' },
];
const fields = [
  { key:'patient',       label:'Patient Name',  type:'text', required:true },
  { key:'dob',           label:'Date of Birth', type:'date' },
  { key:'diagnosis',     label:'Diagnosis',     type:'text' },
  { key:'doctor',        label:'Attending MD',  type:'text' },
  { key:'ward',          label:'Ward',          type:'text' },
  { key:'admissionDate', label:'Admission Date',type:'date' },
  { key:'dischargeDate', label:'Discharge Date',type:'date' },
  { key:'status',        label:'Status',        type:'select', options:['Admitted','Under Observation','Recovering','Discharged','Critical'] },
];

export default function EMR() {
  const crud = useCRUD(emrRecords);
  const admitted   = emrRecords.filter(r => r.status === 'Admitted').length;
  const critical   = emrRecords.filter(r => r.status === 'Critical').length;
  const discharged = emrRecords.filter(r => r.status === 'Discharged').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Electronic Medical Records" subtitle="Inpatient records · Diagnosis · Discharge management" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Records"  value={emrRecords.length}  subtitle="all patients"   icon={ClipboardList} color="rose"   trend={3}  />
        <StatCard title="Admitted"       value={admitted}            subtitle="current"        icon={Clock}         color="amber"  trend={0}  />
        <StatCard title="Critical"       value={critical}            subtitle="needs attention"icon={AlertCircle}   color="red"    trend={-1} />
        <StatCard title="Discharged"     value={discharged}          subtitle="released"       icon={CheckCircle}   color="green"  trend={2}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search records…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Record</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit EMR Record' : 'Add EMR Record'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
