import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { workflowProcesses, workflowTasks } from '../data/mockData';
import { GitBranch, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

const processCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Process Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'instances', label: 'Total', sortable: true },
  { key: 'completed', label: 'Completed', sortable: true },
  { key: 'avgTime', label: 'Avg. Time' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const processFields = [
  { key: 'name',   label: 'Process Name', type: 'text',   required: true },
  { key: 'type',   label: 'Type',         type: 'select', options: ['Approval','Automation','Notification','Integration'] },
  { key: 'avgTime',label: 'Avg. Time',    type: 'text' },
  { key: 'status', label: 'Status',       type: 'select', options: ['Active','Inactive','Draft'] },
];

const taskCols = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Task', sortable: true },
  { key: 'assignee', label: 'Assignee', sortable: true },
  { key: 'process', label: 'Process' },
  { key: 'priority', label: 'Priority', render: v => <Badge status={v} /> },
  { key: 'due', label: 'Due Date', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const taskFields = [
  { key: 'title',    label: 'Task Title', type: 'text',   required: true },
  { key: 'assignee', label: 'Assignee',   type: 'text',   required: true },
  { key: 'process',  label: 'Process',    type: 'text' },
  { key: 'priority', label: 'Priority',   type: 'select', options: ['High','Medium','Low'] },
  { key: 'due',      label: 'Due Date',   type: 'date' },
  { key: 'status',   label: 'Status',     type: 'select', options: ['Pending','In Progress','Completed','Cancelled'] },
];

function TabContent({ type }) {
  const isProcess = type === 'processes';
  const crud      = useCRUD(isProcess ? workflowProcesses : workflowTasks);
  const cols      = isProcess ? processCols   : taskCols;
  const fields    = isProcess ? processFields : taskFields;
  const label     = isProcess ? 'Process'     : 'Task';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-slate-600 hover:bg-slate-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function Workflow() {
  const [tab, setTab] = useState('processes');
  const tabs = [
    { id: 'processes', label: 'Processes', count: workflowProcesses.length },
    { id: 'tasks',     label: 'Tasks',     count: workflowTasks.length },
  ];
  const activeProc  = workflowProcesses.filter(p => p.status === 'Active').length;
  const pendingTasks = workflowTasks.filter(t => t.status === 'Pending').length;
  const highPriority = workflowTasks.filter(t => t.priority === 'High').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Workflow Management" subtitle="Processes · Tasks · Approvals" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Processes"  value={workflowProcesses.length} subtitle="configured"     icon={GitBranch}   color="slate"   trend={0}  />
        <StatCard title="Active Processes" value={activeProc}               subtitle="running"        icon={GitBranch}   color="green"   trend={1}  />
        <StatCard title="Pending Tasks"    value={pendingTasks}             subtitle="awaiting action"icon={Clock}       color="amber"   trend={3}  />
        <StatCard title="High Priority"    value={highPriority}             subtitle="tasks"          icon={AlertTriangle}color="rose"   trend={1}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
