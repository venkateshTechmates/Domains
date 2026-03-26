import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { ehrRecords, prescriptions } from '../data/mockData';
import { FileText, Pill, Users, Activity } from 'lucide-react';

const ehrCols = [
  { key:'id', label:'ID' },
  { key:'patient', label:'Patient', sortable:true },
  { key:'dob', label:'DOB', sortable:true },
  { key:'bloodType', label:'Blood Type' },
  { key:'allergies', label:'Allergies' },
  { key:'conditions', label:'Conditions' },
  { key:'medications', label:'Medications' },
  { key:'primaryCare', label:'Primary Care', sortable:true },
  { key:'insurance', label:'Insurance' },
  { key:'lastVisit', label:'Last Visit', sortable:true },
];
const ehrFields = [
  { key:'patient',    label:'Patient Name',   type:'text', required:true },
  { key:'dob',        label:'Date of Birth',  type:'date' },
  { key:'bloodType',  label:'Blood Type',     type:'select', options:['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
  { key:'allergies',  label:'Allergies',      type:'text' },
  { key:'conditions', label:'Conditions',     type:'textarea' },
  { key:'medications',label:'Medications',    type:'text' },
  { key:'primaryCare',label:'Primary Care MD',type:'text' },
  { key:'insurance',  label:'Insurance',      type:'text' },
];

const rxCols = [
  { key:'id', label:'ID' },
  { key:'patient', label:'Patient', sortable:true },
  { key:'medication', label:'Medication', sortable:true },
  { key:'prescribedBy', label:'Prescribed By', sortable:true },
  { key:'date', label:'Date', sortable:true },
  { key:'duration', label:'Duration' },
  { key:'refills', label:'Refills' },
  { key:'pharmacy', label:'Pharmacy' },
  { key:'status', label:'Status' },
];
const rxFields = [
  { key:'patient',     label:'Patient',       type:'text', required:true },
  { key:'medication',  label:'Medication',    type:'text', required:true },
  { key:'prescribedBy',label:'Prescribed By', type:'text' },
  { key:'date',        label:'Date',          type:'date' },
  { key:'duration',    label:'Duration',      type:'text' },
  { key:'refills',     label:'Refills',       type:'number' },
  { key:'pharmacy',    label:'Pharmacy',      type:'text' },
  { key:'status',      label:'Status',        type:'select', options:['Active','Completed','Cancelled'] },
];

function TabContent({ type }) {
  const isEhr = type === 'ehr';
  const crud = useCRUD(isEhr ? ehrRecords : prescriptions);
  const cols = isEhr ? ehrCols : rxCols;
  const fields = isEhr ? ehrFields : rxFields;
  const label = isEhr ? 'EHR Record' : 'Prescription';
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add {label}</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function EHR() {
  const [tab, setTab] = useState('ehr');
  const activeRx = prescriptions.filter(r => r.status === 'Active').length;
  const tabs = [
    { id:'ehr',          label:'Health Records',  count: ehrRecords.length },
    { id:'prescriptions',label:'Prescriptions',   count: prescriptions.length },
  ];
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Electronic Health Records" subtitle="Patient History · Conditions · Prescriptions" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="EHR Records"      value={ehrRecords.length}    subtitle="patients"      icon={FileText}  color="rose"   trend={2}  />
        <StatCard title="Patients"         value={ehrRecords.length}    subtitle="registered"    icon={Users}     color="indigo" trend={1}  />
        <StatCard title="Prescriptions"    value={prescriptions.length} subtitle="issued"        icon={Pill}      color="amber"  trend={0}  />
        <StatCard title="Active Rx"        value={activeRx}             subtitle="current drugs" icon={Activity}  color="green"  trend={2}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
