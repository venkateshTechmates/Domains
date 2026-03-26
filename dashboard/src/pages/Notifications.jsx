import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { notificationTemplates, notificationLogs } from '../data/mockData';
import { Bell, CheckCircle, XCircle, Send } from 'lucide-react';

const templateCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Template Name', sortable: true },
  { key: 'channel', label: 'Channel', sortable: true },
  { key: 'trigger', label: 'Trigger Event' },
  { key: 'lastUsed', label: 'Last Used', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const templateFields = [
  { key: 'name',    label: 'Template Name',  type: 'text',   required: true },
  { key: 'channel', label: 'Channel',        type: 'select', options: ['Email','SMS','Push','In-App'] },
  { key: 'trigger', label: 'Trigger Event',  type: 'text' },
  { key: 'status',  label: 'Status',         type: 'select', options: ['Active','Draft','Inactive'] },
];

const logCols = [
  { key: 'id', label: 'ID' },
  { key: 'template', label: 'Template', sortable: true },
  { key: 'recipient', label: 'Recipient', sortable: true },
  { key: 'channel', label: 'Channel', sortable: true },
  { key: 'sentAt', label: 'Sent At', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];

function TabContent({ type }) {
  const isTemplates = type === 'templates';
  const crud        = useCRUD(isTemplates ? notificationTemplates : notificationLogs);
  const cols        = isTemplates ? templateCols : logCols;
  const fields      = isTemplates ? templateFields : [];
  const label       = isTemplates ? 'Template' : 'Log';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          {isTemplates && (
            <button onClick={crud.openAdd} className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1.5 rounded-lg">
              + Add Template
            </button>
          )}
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={isTemplates ? crud.openEdit : undefined} onDelete={crud.remove} />
      </div>
      {isTemplates && (
        <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Template' : 'Add Template'}
          fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
      )}
    </>
  );
}

export default function Notifications() {
  const [tab, setTab] = useState('templates');
  const tabs = [
    { id: 'templates', label: 'Templates',     count: notificationTemplates.length },
    { id: 'logs',      label: 'Send Logs',      count: notificationLogs.length },
  ];
  const active    = notificationTemplates.filter(t => t.status === 'Active').length;
  const delivered = notificationLogs.filter(l => l.status === 'Delivered').length;
  const failed    = notificationLogs.filter(l => l.status === 'Failed').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Notification System" subtitle="Templates · Email · SMS · Push" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Templates"       value={notificationTemplates.length} subtitle="configured"  icon={Bell}        color="yellow"  trend={1}  />
        <StatCard title="Active Templates" value={active}                       subtitle="enabled"     icon={Bell}        color="green"   trend={0}  />
        <StatCard title="Delivered"        value={delivered}                    subtitle="logs"        icon={CheckCircle} color="indigo"  trend={8}  />
        <StatCard title="Failed"           value={failed}                       subtitle="logs"        icon={XCircle}     color="rose"    trend={-1} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
