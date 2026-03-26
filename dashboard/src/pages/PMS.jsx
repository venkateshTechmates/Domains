import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { projects, projectTasks } from '../data/mockData';
import { FolderOpen, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

const projectCols = [
  { key:'id', label:'ID' },
  { key:'name', label:'Project', sortable:true },
  { key:'manager', label:'Manager', sortable:true },
  { key:'priority', label:'Priority', sortable:true, render: v => <Badge status={v} /> },
  { key:'status', label:'Status', sortable:true, render: v => <Badge status={v} /> },
  { key:'progress', label:'Progress', render: v => (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2 w-20">
        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${v}%` }} />
      </div>
      <span className="text-xs text-gray-600">{v}%</span>
    </div>
  )},
  { key:'dueDate', label:'Due Date', sortable:true },
  { key:'budget', label:'Budget' },
];
const projectFields = [
  { key:'name', label:'Project Name', type:'text', required:true },
  { key:'manager', label:'Manager', type:'text' },
  { key:'priority', label:'Priority', type:'select', options:['Critical','High','Medium','Low'] },
  { key:'status', label:'Status', type:'select', options:['Planning','In Progress','On Hold','Completed','Cancelled'] },
  { key:'startDate', label:'Start Date', type:'date' },
  { key:'dueDate', label:'Due Date', type:'date' },
  { key:'budget', label:'Budget', type:'text' },
  { key:'team', label:'Team Size', type:'number' },
];

const taskCols = [
  { key:'id', label:'ID' },
  { key:'title', label:'Task', sortable:true },
  { key:'project', label:'Project', sortable:true },
  { key:'assignee', label:'Assignee', sortable:true },
  { key:'priority', label:'Priority', render: v => <Badge status={v} /> },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
  { key:'dueDate', label:'Due Date', sortable:true },
];
const taskFields = [
  { key:'title', label:'Task Title', type:'text', required:true },
  { key:'project', label:'Project', type:'text' },
  { key:'assignee', label:'Assignee', type:'text' },
  { key:'priority', label:'Priority', type:'select', options:['Critical','High','Medium','Low'] },
  { key:'status', label:'Status', type:'select', options:['Planned','In Progress','Completed','Blocked'] },
  { key:'dueDate', label:'Due Date', type:'date' },
];

function TabContent({ type }) {
  const isProj = type === 'projects';
  const crud = useCRUD(isProj ? projects : projectTasks);
  const cols = isProj ? projectCols : taskCols;
  const fields = isProj ? projectFields : taskFields;
  const label = isProj ? 'Project' : 'Task';
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal-300" />
          <button onClick={crud.openAdd} className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add {label}</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function PMS() {
  const [tab, setTab] = useState('projects');
  const active = projects.filter(p => p.status === 'In Progress').length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const overdue = projects.filter(p => p.progress < 50 && p.priority === 'High').length;
  const tabs = [
    { id:'projects', label:'Projects', count: projects.length },
    { id:'tasks',    label:'Tasks',    count: projectTasks.length },
  ];
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Project Management" subtitle="Projects · Tasks · Timelines · Progress" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Projects"    value={projects.length}  subtitle="registered"  icon={FolderOpen}  color="teal"   trend={2}  />
        <StatCard title="In Progress"       value={active}           subtitle="active now"  icon={Clock}       color="indigo" trend={0}  />
        <StatCard title="Completed"         value={completed}        subtitle="finished"    icon={CheckSquare} color="green"  trend={1}  />
        <StatCard title="Needs Attention"   value={overdue}          subtitle="flagged"     icon={AlertTriangle}color="amber" trend={-1} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
