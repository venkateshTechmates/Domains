import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { educationCourses } from '../data/mockData';
import { BookOpen, Users, CheckCircle, BarChart } from 'lucide-react';

const cols = [
  { key:'id',          label:'ID' },
  { key:'title',       label:'Course/Program',  sortable:true },
  { key:'instructor',  label:'Instructor',      sortable:true },
  { key:'category',    label:'Category',        sortable:true },
  { key:'duration',    label:'Duration' },
  { key:'enrolled',    label:'Enrolled' },
  { key:'completion',  label:'Completion %' },
  { key:'status',      label:'Status' },
];
const fields = [
  { key:'title',       label:'Course Title',    type:'text', required:true },
  { key:'instructor',  label:'Instructor',      type:'text' },
  { key:'category',    label:'Category',        type:'text' },
  { key:'duration',    label:'Duration (hrs)',  type:'number' },
  { key:'enrolled',    label:'Enrolled Count',  type:'number' },
  { key:'completion',  label:'Completion %',    type:'number' },
  { key:'description', label:'Description',     type:'textarea' },
  { key:'status',      label:'Status',          type:'select', options:['Active','Draft','Archived','Upcoming'] },
];

export default function EduEMS() {
  const crud = useCRUD(educationCourses);
  const active   = educationCourses.filter(c => c.status === 'Active').length;
  const enrolled = educationCourses.reduce((sum, c) => sum + (parseInt(c.enrolled) || 0), 0);
  const categories = [...new Set(educationCourses.map(c => c.category))].length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Education Management System" subtitle="Courses · Programs · Instructors · Enrollment" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Courses"     value={educationCourses.length} subtitle="total"         icon={BookOpen}    color="yellow" trend={2}  />
        <StatCard title="Active"      value={active}                   subtitle="running now"   icon={CheckCircle} color="green"  trend={1}  />
        <StatCard title="Enrolled"    value={enrolled}                 subtitle="total students"icon={Users}       color="indigo" trend={4}  />
        <StatCard title="Categories"  value={categories}               subtitle="subjects"      icon={BarChart}    color="violet" trend={0}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search courses…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
          <button onClick={crud.openAdd} className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Course</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Course' : 'Add Course'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
