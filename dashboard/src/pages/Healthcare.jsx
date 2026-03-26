import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { emrRecords, labTests, radiologyStudies } from '../data/mockData';
import { Heart, ClipboardList, Activity, AlertTriangle } from 'lucide-react';

const emrCols = [
  { key: 'id', label: 'ID' },
  { key: 'patient', label: 'Patient', sortable: true },
  { key: 'dob', label: 'DOB' },
  { key: 'provider', label: 'Provider', sortable: true },
  { key: 'visitDate', label: 'Visit Date', sortable: true },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'icd', label: 'ICD Code' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const emrFields = [
  { key: 'patient',     label: 'Patient Name', type: 'text',  required: true },
  { key: 'dob',         label: 'Date of Birth',type: 'date' },
  { key: 'provider',    label: 'Provider',     type: 'text' },
  { key: 'visitDate',   label: 'Visit Date',   type: 'date' },
  { key: 'diagnosis',   label: 'Diagnosis',    type: 'text' },
  { key: 'icd',         label: 'ICD Code',     type: 'text' },
  { key: 'medications', label: 'Medications',  type: 'textarea' },
  { key: 'status',      label: 'Status',       type: 'select', options: ['Active','Resolved','Critical'] },
];

const labCols = [
  { key: 'id', label: 'ID' },
  { key: 'patient', label: 'Patient', sortable: true },
  { key: 'test', label: 'Test', sortable: true },
  { key: 'orderedBy', label: 'Ordered By' },
  { key: 'ordered', label: 'Order Date', sortable: true },
  { key: 'result', label: 'Result' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const labFields = [
  { key: 'patient',   label: 'Patient',    type: 'text', required: true },
  { key: 'test',      label: 'Test Name',  type: 'text', required: true },
  { key: 'orderedBy', label: 'Ordered By', type: 'text' },
  { key: 'ordered',   label: 'Order Date', type: 'date' },
  { key: 'status',    label: 'Status',     type: 'select', options: ['Pending','In Progress','Completed'] },
  { key: 'result',    label: 'Result',     type: 'textarea' },
];

const radCols = [
  { key: 'id', label: 'ID' },
  { key: 'patient', label: 'Patient', sortable: true },
  { key: 'study', label: 'Study', sortable: true },
  { key: 'modality', label: 'Modality' },
  { key: 'orderedBy', label: 'Ordered By' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'radiologist', label: 'Radiologist' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const radFields = [
  { key: 'patient',     label: 'Patient',     type: 'text',   required: true },
  { key: 'study',       label: 'Study Name',  type: 'text',   required: true },
  { key: 'modality',    label: 'Modality',    type: 'select', options: ['XR','CT','MRI','US','NM','PET'] },
  { key: 'orderedBy',   label: 'Ordered By',  type: 'text' },
  { key: 'date',        label: 'Study Date',  type: 'date' },
  { key: 'radiologist', label: 'Radiologist', type: 'text' },
  { key: 'status',      label: 'Status',      type: 'select', options: ['Pending','In Progress','Reported'] },
];

function TabContent({ type }) {
  const isEMR = type === 'emr';
  const isLab = type === 'lab';
  const crud  = useCRUD(isEMR ? emrRecords : isLab ? labTests : radiologyStudies);
  const cols  = isEMR ? emrCols  : isLab ? labCols  : radCols;
  const flds  = isEMR ? emrFields : isLab ? labFields : radFields;
  const label = isEMR ? 'EMR Record' : isLab ? 'Lab Test' : 'Radiology Study';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">
            + Add {label}
          </button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={flds} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function Healthcare() {
  const [tab, setTab] = useState('emr');
  const tabs = [
    { id: 'emr', label: 'EMR / EHR',  count: emrRecords.length },
    { id: 'lab', label: 'Laboratory', count: labTests.length },
    { id: 'rad', label: 'Radiology',  count: radiologyStudies.length },
  ];
  const active   = emrRecords.filter(e => e.status === 'Active').length;
  const critical = emrRecords.filter(e => e.status === 'Critical').length;
  const pending  = labTests.filter(l => l.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Healthcare Systems" subtitle="EMR · EHR · Laboratory · Radiology" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="EMR Records"   value={emrRecords.length}       subtitle="total records"  icon={Heart}        color="rose"   trend={3}  />
        <StatCard title="Active Cases"  value={active}                   subtitle="ongoing"        icon={Activity}     color="indigo" trend={2}  />
        <StatCard title="Critical"      value={critical}                 subtitle="ICU / critical" icon={AlertTriangle}color="red"    trend={1}  />
        <StatCard title="Pending Tests" value={pending}                  subtitle="lab tests"      icon={ClipboardList}color="amber"  trend={-1} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
