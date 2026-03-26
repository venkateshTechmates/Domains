import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { ssoApps, ssoSessions } from '../data/mockData';
import { Key, Shield, Globe, Activity } from 'lucide-react';

const appCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Application', sortable: true },
  { key: 'protocol', label: 'Protocol', sortable: true },
  { key: 'clientId', label: 'Client ID' },
  { key: 'users', label: 'Users', sortable: true },
  { key: 'lastSync', label: 'Last Sync', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const appFields = [
  { key: 'name',     label: 'App Name',   type: 'text',   required: true },
  { key: 'protocol', label: 'Protocol',   type: 'select', options: ['SAML 2.0','OIDC','OAuth 2.0','LDAP'] },
  { key: 'clientId', label: 'Client ID',  type: 'text' },
  { key: 'status',   label: 'Status',     type: 'select', options: ['Active','Inactive'] },
];

const sessionCols = [
  { key: 'id', label: 'ID' },
  { key: 'user', label: 'User', sortable: true },
  { key: 'app', label: 'Application', sortable: true },
  { key: 'ip', label: 'IP Address' },
  { key: 'mfa', label: 'MFA Method' },
  { key: 'loginTime', label: 'Login Time', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];

function TabContent({ type }) {
  const isApps = type === 'apps';
  const crud   = useCRUD(isApps ? ssoApps : ssoSessions);
  const cols   = isApps ? appCols : sessionCols;
  const label  = isApps ? 'Application' : 'Session';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          {isApps && (
            <button onClick={crud.openAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg">
              + Add Application
            </button>
          )}
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={isApps ? crud.openEdit : undefined} onDelete={crud.remove} />
      </div>
      {isApps && (
        <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Application' : 'Add Application'}
          fields={appFields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
      )}
    </>
  );
}

export default function SSO() {
  const [tab, setTab] = useState('apps');
  const tabs = [
    { id: 'apps',     label: 'Applications', count: ssoApps.length },
    { id: 'sessions', label: 'SSO Sessions',  count: ssoSessions.length },
  ];
  const active    = ssoApps.filter(a => a.status === 'Active').length;
  const totalUsers = ssoApps.reduce((s, a) => s + a.users, 0);
  const activeSess = ssoSessions.filter(s => s.status === 'Active').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Single Sign-On (SSO)" subtitle="Applications · Sessions · Identity Federation" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Connected Apps"  value={ssoApps.length} subtitle="configured"    icon={Globe}    color="indigo" trend={1}  />
        <StatCard title="Active Apps"     value={active}          subtitle="enabled"       icon={Shield}   color="green"  trend={0}  />
        <StatCard title="Federated Users" value={totalUsers}      subtitle="SSO enabled"   icon={Key}      color="violet" trend={5}  />
        <StatCard title="Live Sessions"   value={activeSess}      subtitle="current"       icon={Activity} color="amber"  trend={2}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
