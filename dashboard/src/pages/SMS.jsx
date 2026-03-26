import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { students } from '../data/mockData';
import { Users, GraduationCap, CheckCircle, Award } from 'lucide-react';

const cols = [
  { key:'id',          label:'ID' },
  { key:'name',        label:'Student',      sortable:true },
  { key:'class',       label:'Class/Grade',  sortable:true },
  { key:'rollNo',      label:'Roll No.' },
  { key:'dob',         label:'DOB' },
  { key:'guardian',    label:'Guardian' },
  { key:'contact',     label:'Contact' },
  { key:'attendance',  label:'Attendance %' },
  { key:'status',      label:'Status' },
];
const fields = [
  { key:'name',        label:'Full Name',     type:'text', required:true },
  { key:'class',       label:'Class/Grade',   type:'text' },
  { key:'rollNo',      label:'Roll Number',   type:'text' },
  { key:'dob',         label:'Date of Birth', type:'date' },
  { key:'guardian',    label:'Guardian Name', type:'text' },
  { key:'contact',     label:'Contact Email', type:'email' },
  { key:'phone',       label:'Phone',         type:'text' },
  { key:'attendance',  label:'Attendance %',  type:'number' },
  { key:'status',      label:'Status',        type:'select', options:['Active','Inactive','Graduated','Transferred','Suspended'] },
];

export default function SMS() {
  const crud = useCRUD(students);
  const active    = students.filter(s => s.status === 'Active').length;
  const graduated = students.filter(s => s.status === 'Graduated').length;
  const avgAtt    = Math.round(students.reduce((sum, s) => sum + (parseFloat(s.attendance) || 0), 0) / students.length);
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Student Management System" subtitle="Enrollment · Attendance · Grades · Records" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Students"   value={students.length} subtitle="enrolled"       icon={Users}        color="yellow" trend={3}  />
        <StatCard title="Active"     value={active}           subtitle="current"        icon={CheckCircle}  color="green"  trend={2}  />
        <StatCard title="Graduated"  value={graduated}        subtitle="completed"      icon={GraduationCap}color="indigo" trend={1}  />
        <StatCard title="Avg Attend."value={`${avgAtt}%`}     subtitle="attendance rate"icon={Award}        color="amber"  trend={0}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search students…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
          <button onClick={crud.openAdd} className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Enroll Student</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Student' : 'Add Student'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
