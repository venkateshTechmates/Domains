import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { students, exams, educationCourses } from '../data/mockData';
import { Users, BookOpen, ClipboardList, GraduationCap } from 'lucide-react';

const studentCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'grade', label: 'Grade', sortable: true },
  { key: 'section', label: 'Section' },
  { key: 'rollNo', label: 'Roll No.' },
  { key: 'email', label: 'Email' },
  { key: 'attendance', label: 'Attendance', sortable: true },
  { key: 'feeStatus', label: 'Fee Status', render: v => <Badge status={v} /> },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const studentFields = [
  { key: 'name',      label: 'Full Name',   type: 'text',   required: true },
  { key: 'grade',     label: 'Grade',       type: 'select', options: ['9','10','11','12'] },
  { key: 'section',   label: 'Section',     type: 'select', options: ['A','B','C','D'] },
  { key: 'rollNo',    label: 'Roll No.',    type: 'text' },
  { key: 'email',     label: 'Email',       type: 'email' },
  { key: 'phone',     label: 'Phone',       type: 'text' },
  { key: 'feeStatus', label: 'Fee Status',  type: 'select', options: ['Paid','Pending','Overdue'] },
  { key: 'status',    label: 'Status',      type: 'select', options: ['Active','Inactive'] },
];

const examCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Exam Name', sortable: true },
  { key: 'class', label: 'Class', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'duration', label: 'Duration' },
  { key: 'totalMarks', label: 'Max Marks' },
  { key: 'venue', label: 'Venue' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const examFields = [
  { key: 'name',       label: 'Exam Name',  type: 'text',   required: true },
  { key: 'class',      label: 'Class',      type: 'text',   required: true },
  { key: 'date',       label: 'Exam Date',  type: 'date',   required: true },
  { key: 'duration',   label: 'Duration',   type: 'text' },
  { key: 'totalMarks', label: 'Max Marks',  type: 'number' },
  { key: 'venue',      label: 'Venue',      type: 'text' },
  { key: 'status',     label: 'Status',     type: 'select', options: ['Scheduled','Completed','Cancelled'] },
];

const courseCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Course Name', sortable: true },
  { key: 'class', label: 'Class', sortable: true },
  { key: 'teacher', label: 'Teacher', sortable: true },
  { key: 'students', label: 'Students', sortable: true },
  { key: 'hours', label: 'Hrs/Week' },
  { key: 'textbook', label: 'Textbook' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const courseEduFields = [
  { key: 'name',     label: 'Course Name', type: 'text',   required: true },
  { key: 'class',    label: 'Class',       type: 'text',   required: true },
  { key: 'teacher',  label: 'Teacher',     type: 'text' },
  { key: 'students', label: 'Students',    type: 'number' },
  { key: 'hours',    label: 'Hrs/Week',    type: 'text' },
  { key: 'textbook', label: 'Textbook',    type: 'text' },
  { key: 'status',   label: 'Status',      type: 'select', options: ['Active','Inactive'] },
];

function TabContent({ type }) {
  const isStudents = type === 'students';
  const isExams    = type === 'exams';
  const crud       = useCRUD(isStudents ? students : isExams ? exams : educationCourses);
  const cols       = isStudents ? studentCols : isExams ? examCols : courseCols;
  const fields     = isStudents ? studentFields : isExams ? examFields : courseEduFields;
  const label      = isStudents ? 'Student' : isExams ? 'Exam' : 'Course';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function Education() {
  const [tab, setTab] = useState('students');
  const tabs = [
    { id: 'students', label: 'Students', count: students.length },
    { id: 'exams',    label: 'Exams',    count: exams.length },
    { id: 'courses',  label: 'Courses',  count: educationCourses.length },
  ];
  const active    = students.filter(s => s.status === 'Active').length;
  const feePaid   = students.filter(s => s.feeStatus === 'Paid').length;
  const upcoming  = exams.filter(e => e.status === 'Scheduled').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Education Management" subtitle="Students · Exams · Courses" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={students.length} subtitle="enrolled"       icon={Users}        color="yellow"  trend={4}  />
        <StatCard title="Active"         value={active}           subtitle="currently"     icon={GraduationCap}color="green"   trend={3}  />
        <StatCard title="Fees Paid"      value={feePaid}          subtitle="students"      icon={BookOpen}     color="emerald" trend={2}  />
        <StatCard title="Upcoming Exams" value={upcoming}         subtitle="scheduled"     icon={ClipboardList}color="amber"   trend={0}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
