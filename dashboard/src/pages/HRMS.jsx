import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { employees, departments, leaveRequests } from '../data/mockData';
import { Users, Building2, Calendar, DollarSign } from 'lucide-react';

const empCols = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'email', label: 'Email' },
  { key: 'salary', label: 'Salary', sortable: true },
  { key: 'joinDate', label: 'Joined', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const empFields = [
  { key: 'name',       label: 'Full Name',   type: 'text',   required: true },
  { key: 'department', label: 'Department',  type: 'select', options: ['Engineering','Marketing','Finance','HR','Sales','Design','Operations'] },
  { key: 'role',       label: 'Role',        type: 'text',   required: true },
  { key: 'email',      label: 'Email',       type: 'email',  required: true },
  { key: 'phone',      label: 'Phone',       type: 'text' },
  { key: 'salary',     label: 'Salary',      type: 'text' },
  { key: 'joinDate',   label: 'Join Date',   type: 'date' },
  { key: 'status',     label: 'Status',      type: 'select', options: ['Active','On Leave','Resigned','Pending'] },
];

const deptCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Department', sortable: true },
  { key: 'head', label: 'Head' },
  { key: 'employees', label: 'Employees', sortable: true },
  { key: 'budget', label: 'Budget' },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const deptFields = [
  { key: 'name',      label: 'Department Name', type: 'text',   required: true },
  { key: 'head',      label: 'Head',            type: 'text' },
  { key: 'employees', label: 'Employees',       type: 'number' },
  { key: 'budget',    label: 'Budget',          type: 'text' },
  { key: 'location',  label: 'Location',        type: 'text' },
  { key: 'status',    label: 'Status',          type: 'select', options: ['Active','Inactive'] },
];

const leaveCols = [
  { key: 'id', label: 'ID' },
  { key: 'employee', label: 'Employee', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'from', label: 'From', sortable: true },
  { key: 'to', label: 'To' },
  { key: 'days', label: 'Days' },
  { key: 'applied', label: 'Applied On' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const leaveFields = [
  { key: 'employee', label: 'Employee',   type: 'text',   required: true },
  { key: 'type',     label: 'Leave Type', type: 'select', options: ['Annual','Medical','Casual','Maternity','Paternity'] },
  { key: 'from',     label: 'From',       type: 'date',   required: true },
  { key: 'to',       label: 'To',         type: 'date',   required: true },
  { key: 'days',     label: 'Days',       type: 'number' },
  { key: 'status',   label: 'Status',     type: 'select', options: ['Pending','Approved','Rejected'] },
];

function TabContent({ type }) {
  const isEmp  = type === 'employees';
  const isDept = type === 'departments';
  const crud   = useCRUD(isEmp ? employees : isDept ? departments : leaveRequests);
  const cols   = isEmp ? empCols   : isDept ? deptCols   : leaveCols;
  const fields = isEmp ? empFields : isDept ? deptFields : leaveFields;
  const label  = isEmp ? 'Employee' : isDept ? 'Department' : 'Leave Request';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input
            value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button onClick={crud.openAdd} className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function HRMS() {
  const [tab, setTab] = useState('employees');
  const tabs = [
    { id: 'employees', label: 'Employees', count: employees.length },
    { id: 'departments', label: 'Departments', count: departments.length },
    { id: 'leave', label: 'Leave Requests', count: leaveRequests.length },
  ];
  const active     = employees.filter(e => e.status === 'Active').length;
  const onLeave    = employees.filter(e => e.status === 'On Leave').length;
  const totalDepts = departments.length;
  const pendingLeave = leaveRequests.filter(l => l.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="HR Management System" subtitle="Employees · Departments · Leave" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Employees" value={employees.length} subtitle="registered" icon={Users}     color="purple" trend={4}  />
        <StatCard title="Active"          value={active}           subtitle="currently"  icon={Users}     color="green"  trend={2}  />
        <StatCard title="Departments"     value={totalDepts}       subtitle="teams"      icon={Building2} color="indigo" trend={0}  />
        <StatCard title="Pending Leaves"  value={pendingLeave}     subtitle="awaiting"   icon={Calendar}  color="amber"  trend={-1} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
