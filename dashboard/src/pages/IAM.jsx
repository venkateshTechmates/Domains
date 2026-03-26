import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { iamUsers, roles, sessions } from '../data/mockData';
import { Shield, Users, Key, Lock } from 'lucide-react';

const userCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'department', label: 'Department' },
  { key: 'lastLogin', label: 'Last Login', sortable: true },
  { key: 'mfa', label: 'MFA', render: v => <Badge status={v} /> },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const userFields = [
  { key: 'name',       label: 'Full Name',   type: 'text',   required: true },
  { key: 'email',      label: 'Email',       type: 'email',  required: true },
  { key: 'role',       label: 'Role',        type: 'select', options: ['Super Admin','Admin','Developer','Analyst','Sales Rep','HR Manager','Designer','DevOps'] },
  { key: 'department', label: 'Department',  type: 'select', options: ['Engineering','Marketing','Finance','HR','Sales','Design','Operations','IT'] },
  { key: 'mfa',        label: 'MFA',         type: 'select', options: ['Enabled','Disabled'] },
  { key: 'status',     label: 'Status',      type: 'select', options: ['Active','Disabled','Pending'] },
];

const roleCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Role Name', sortable: true },
  { key: 'permissions', label: 'Permissions' },
  { key: 'users', label: 'Users', sortable: true },
  { key: 'description', label: 'Description' },
];
const roleFields = [
  { key: 'name',        label: 'Role Name',    type: 'text',     required: true },
  { key: 'permissions', label: 'Permissions',  type: 'textarea', required: true },
  { key: 'description', label: 'Description',  type: 'textarea' },
];

const sessionCols = [
  { key: 'id', label: 'ID' },
  { key: 'user', label: 'User', sortable: true },
  { key: 'device', label: 'Device' },
  { key: 'ip', label: 'IP Address' },
  { key: 'location', label: 'Location' },
  { key: 'started', label: 'Started', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];

function TabContent({ type }) {
  const isUsers    = type === 'users';
  const isRoles    = type === 'roles';
  const crud       = useCRUD(isUsers ? iamUsers : isRoles ? roles : sessions);
  const cols       = isUsers ? userCols   : isRoles ? roleCols   : sessionCols;
  const fields     = isUsers ? userFields : isRoles ? roleFields : [];
  const label      = isUsers ? 'User'     : isRoles ? 'Role'     : 'Session';
  const canEdit    = type !== 'sessions';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          {canEdit && (
            <button onClick={crud.openAdd} className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-1.5 rounded-lg">
              + Add {label}
            </button>
          )}
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={canEdit ? crud.openEdit : undefined} onDelete={crud.remove} />
      </div>
      {canEdit && (
        <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
          fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
      )}
    </>
  );
}

export default function IAM() {
  const [tab, setTab] = useState('users');
  const tabs = [
    { id: 'users',    label: 'Users',    count: iamUsers.length },
    { id: 'roles',    label: 'Roles',    count: roles.length },
    { id: 'sessions', label: 'Sessions', count: sessions.length },
  ];
  const activeUsers  = iamUsers.filter(u => u.status === 'Active').length;
  const mfaEnabled   = iamUsers.filter(u => u.mfa === 'Enabled').length;
  const activeSess   = sessions.filter(s => s.status === 'Active').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Identity & Access Management" subtitle="Users · Roles · Sessions" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users"   value={iamUsers.length} subtitle="registered"    icon={Users}  color="violet" trend={2}  />
        <StatCard title="Active Users"  value={activeUsers}      subtitle="currently"     icon={Shield} color="green"  trend={1}  />
        <StatCard title="MFA Enabled"   value={mfaEnabled}       subtitle="users"         icon={Lock}   color="indigo" trend={3}  />
        <StatCard title="Active Sessions" value={activeSess}     subtitle="live sessions" icon={Key}   color="amber"  trend={0}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
