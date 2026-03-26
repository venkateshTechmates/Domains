import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { exams } from '../data/mockData';
import { FileQuestion, Clock, CheckCircle, Users } from 'lucide-react';

const cols = [
  { key:'id',          label:'ID' },
  { key:'title',       label:'Exam Title',    sortable:true },
  { key:'subject',     label:'Subject',       sortable:true },
  { key:'date',        label:'Date',          sortable:true },
  { key:'duration',    label:'Duration' },
  { key:'totalMarks',  label:'Total Marks' },
  { key:'candidates',  label:'Candidates' },
  { key:'status',      label:'Status' },
];
const fields = [
  { key:'title',       label:'Exam Title',    type:'text', required:true },
  { key:'subject',     label:'Subject',       type:'text' },
  { key:'date',        label:'Exam Date',     type:'date' },
  { key:'duration',    label:'Duration (min)',type:'number' },
  { key:'totalMarks',  label:'Total Marks',   type:'number' },
  { key:'passingMarks',label:'Passing Marks', type:'number' },
  { key:'candidates',  label:'Candidates',    type:'number' },
  { key:'venue',       label:'Venue',         type:'text' },
  { key:'status',      label:'Status',        type:'select', options:['Scheduled','Ongoing','Completed','Cancelled','Postponed'] },
];

export default function ExamMgmt() {
  const crud = useCRUD(exams);
  const scheduled  = exams.filter(e => e.status === 'Scheduled').length;
  const completed  = exams.filter(e => e.status === 'Completed').length;
  const candidates = exams.reduce((sum, e) => sum + (parseInt(e.candidates) || 0), 0);
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Exam Management System" subtitle="Scheduling · Candidates · Grading · Results" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Exams"  value={exams.length} subtitle="all tests"       icon={FileQuestion} color="yellow" trend={1}  />
        <StatCard title="Scheduled"    value={scheduled}     subtitle="upcoming"        icon={Clock}        color="amber"  trend={0}  />
        <StatCard title="Completed"    value={completed}     subtitle="finished"        icon={CheckCircle}  color="green"  trend={2}  />
        <StatCard title="Candidates"   value={candidates}    subtitle="total registered"icon={Users}        color="indigo" trend={3}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search exams…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
          <button onClick={crud.openAdd} className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Schedule Exam</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Exam' : 'Schedule Exam'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
