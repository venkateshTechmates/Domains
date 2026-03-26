import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { courses, learners } from '../data/mockData';
import { GraduationCap, Users, Star, Clock } from 'lucide-react';

const courseCols = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Course Title', sortable: true },
  { key: 'instructor', label: 'Instructor', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'enrolled', label: 'Enrolled', sortable: true },
  { key: 'completed', label: 'Completed', sortable: true },
  { key: 'rating', label: 'Rating' },
  { key: 'duration', label: 'Duration' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const courseFields = [
  { key: 'title',      label: 'Course Title', type: 'text',   required: true },
  { key: 'instructor', label: 'Instructor',   type: 'text',   required: true },
  { key: 'category',   label: 'Category',     type: 'select', options: ['Engineering','Data','Management','Marketing','Finance','Design'] },
  { key: 'duration',   label: 'Duration (h)', type: 'text' },
  { key: 'status',     label: 'Status',       type: 'select', options: ['Published','Draft','Archived'] },
];

const learnerCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'enrolled', label: 'Enrolled', sortable: true },
  { key: 'completed', label: 'Completed', sortable: true },
  { key: 'progress', label: 'Progress' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const learnerFields = [
  { key: 'name',   label: 'Full Name', type: 'text',  required: true },
  { key: 'email',  label: 'Email',     type: 'email', required: true },
  { key: 'status', label: 'Status',    type: 'select', options: ['Active','Inactive'] },
];

function TabContent({ type }) {
  const isCourse = type === 'courses';
  const crud     = useCRUD(isCourse ? courses : learners);
  const cols     = isCourse ? courseCols   : learnerCols;
  const fields   = isCourse ? courseFields : learnerFields;
  const label    = isCourse ? 'Course'     : 'Learner';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg">
            + Add {label}
          </button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function LMS() {
  const [tab, setTab] = useState('courses');
  const tabs = [
    { id: 'courses',  label: 'Courses',  count: courses.length },
    { id: 'learners', label: 'Learners', count: learners.length },
  ];
  const published   = courses.filter(c => c.status === 'Published').length;
  const totalEnroll = courses.reduce((s, c) => s + c.enrolled, 0);
  const avgRating   = (courses.filter(c => c.rating !== '—').reduce((s, c) => s + parseFloat(c.rating), 0) / courses.filter(c => c.rating !== '—').length).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Learning Management System" subtitle="Courses · Learners · Enrollments" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Courses"    value={courses.length}  subtitle="in catalog"     icon={GraduationCap} color="green"  trend={5}  />
        <StatCard title="Published"        value={published}        subtitle="live courses"  icon={GraduationCap} color="emerald"trend={3}  />
        <StatCard title="Total Enrollments"value={totalEnroll}      subtitle="all courses"   icon={Users}         color="indigo" trend={12} />
        <StatCard title="Avg. Rating"      value={avgRating}        subtitle="out of 5"      icon={Star}          color="amber"  trend={2}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
