import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { patients, doctors, appointments } from '../data/mockData';
import { Building2, Users, Calendar, Heart } from 'lucide-react';

const patientCols = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Patient Name', sortable: true },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'bloodType', label: 'Blood' },
  { key: 'ward', label: 'Ward' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];

const patientFields = [
  { key: 'name',         label: 'Patient Name',    type: 'text',   required: true  },
  { key: 'age',          label: 'Age',             type: 'number', required: true  },
  { key: 'gender',       label: 'Gender',          type: 'select', options: ['Male', 'Female', 'Other'] },
  { key: 'bloodType',    label: 'Blood Type',      type: 'select', options: ['A+','A-','B+','B-','O+','O-','AB+','AB-'] },
  { key: 'ward',         label: 'Ward',            type: 'select', options: ['General','ICU','Cardiology','Orthopedics','Neurology','Maternity','OPD','Pulmonology'] },
  { key: 'doctor',       label: 'Doctor',          type: 'select', options: ['Dr. Sarah Lee','Dr. Raj Patel','Dr. Amy Chen','Dr. Mark Davis','Dr. Priya Nair','Dr. John Smith'] },
  { key: 'diagnosis',    label: 'Diagnosis',       type: 'text'   },
  { key: 'phone',        label: 'Phone',           type: 'text'   },
  { key: 'status',       label: 'Status',          type: 'select', options: ['Admitted','Outpatient','Discharged','Critical'] },
];

const doctorCols = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'specialty', label: 'Specialty' },
  { key: 'department', label: 'Department' },
  { key: 'patients', label: 'Patients', sortable: true },
  { key: 'experience', label: 'Experience' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];

const doctorFields = [
  { key: 'name',        label: 'Full Name',     type: 'text',   required: true },
  { key: 'specialty',   label: 'Specialty',     type: 'text',   required: true },
  { key: 'department',  label: 'Department',    type: 'text'   },
  { key: 'phone',       label: 'Phone',         type: 'text'   },
  { key: 'email',       label: 'Email',         type: 'email'  },
  { key: 'status',      label: 'Status',        type: 'select', options: ['Active', 'On Leave', 'Inactive'] },
];

const apptCols = [
  { key: 'id', label: 'ID' },
  { key: 'patientName', label: 'Patient', sortable: true },
  { key: 'doctorName', label: 'Doctor', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'time', label: 'Time' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];

const apptFields = [
  { key: 'patientName', label: 'Patient Name',  type: 'text',   required: true },
  { key: 'doctorName',  label: 'Doctor',         type: 'select', options: ['Dr. Sarah Lee','Dr. Raj Patel','Dr. Amy Chen','Dr. Mark Davis','Dr. Priya Nair','Dr. John Smith'] },
  { key: 'date',        label: 'Date',           type: 'date',   required: true },
  { key: 'time',        label: 'Time',           type: 'text'   },
  { key: 'type',        label: 'Type',           type: 'select', options: ['Consultation','Follow-up','Routine','Discharge','Review'] },
  { key: 'notes',       label: 'Notes',          type: 'textarea' },
  { key: 'status',      label: 'Status',         type: 'select', options: ['Confirmed','Pending','Cancelled','Completed'] },
];

function TabContent({ type }) {
  const isPatients  = type === 'patients';
  const isDoctors   = type === 'doctors';

  const crud = useCRUD(isPatients ? patients : isDoctors ? doctors : appointments);
  const cols   = isPatients ? patientCols   : isDoctors ? doctorCols   : apptCols;
  const fields = isPatients ? patientFields : isDoctors ? doctorFields : apptFields;
  const label  = isPatients ? 'Patient'     : isDoctors ? 'Doctor'     : 'Appointment';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input
            value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button onClick={crud.openAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg">
            + Add {label}
          </button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal
        isOpen={crud.modalOpen}
        title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={fields}
        initial={crud.editing}
        onSave={crud.save}
        onClose={crud.closeModal}
      />
    </>
  );
}

export default function HMS() {
  const [tab, setTab] = useState('patients');
  const tabs = [
    { id: 'patients',     label: 'Patients',     count: patients.length },
    { id: 'doctors',      label: 'Doctors',      count: doctors.length },
    { id: 'appointments', label: 'Appointments', count: appointments.length },
  ];
  const admitted  = patients.filter(p => p.status === 'Admitted').length;
  const critical  = patients.filter(p => p.status === 'Critical').length;
  const activeDrs = doctors.filter(d => d.status === 'Active').length;
  const todayAppt = appointments.filter(a => a.status !== 'Cancelled').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Hospital Management System" subtitle="Patients · Doctors · Appointments" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients"   value={patients.length}  subtitle="registered" icon={Users}      color="blue"   trend={8}  />
        <StatCard title="Admitted"         value={admitted}          subtitle="currently"  icon={Building2}  color="indigo" trend={-3} />
        <StatCard title="Active Doctors"   value={activeDrs}         subtitle="on duty"    icon={Heart}      color="rose"   trend={0}  />
        <StatCard title="Today's Appts."   value={todayAppt}         subtitle="scheduled"  icon={Calendar}   color="green"  trend={5}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
