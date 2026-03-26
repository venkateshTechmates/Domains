import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import { useCRUD } from '../hooks/useCRUD';
import { auditLogs } from '../data/mockData';
import { ClipboardList, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

const cols = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'timestamp', label: 'Timestamp', sortable: true },
  { key: 'user', label: 'Actor', sortable: true },
  { key: 'action', label: 'Action', sortable: true },
  { key: 'resource', label: 'Resource' },
  { key: 'module', label: 'Module', sortable: true },
  { key: 'ip', label: 'IP Address' },
  { key: 'severity', label: 'Severity', render: v => <Badge status={v} /> },
];

export default function AuditLogs() {
  const crud = useCRUD(auditLogs);

  const infos    = auditLogs.filter(l => l.severity === 'Info').length;
  const warnings = auditLogs.filter(l => l.severity === 'Warning').length;
  const errors   = auditLogs.filter(l => l.severity === 'Error').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Audit Logging" subtitle="Full audit trail of system events and user actions" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events"   value={auditLogs.length} subtitle="all time"      icon={ClipboardList}  color="slate"  trend={5}  />
        <StatCard title="Info"           value={infos}             subtitle="events"        icon={Info}           color="indigo" trend={4}  />
        <StatCard title="Warnings"       value={warnings}          subtitle="events"        icon={AlertTriangle}  color="amber"  trend={2}  />
        <StatCard title="Errors"         value={errors}            subtitle="events"        icon={AlertOctagon}   color="rose"   trend={1}  />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
              placeholder="Search logs…"
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md font-medium">{infos} Info</span>
            <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-md font-medium">{warnings} Warnings</span>
            <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded-md font-medium">{errors} Errors</span>
          </div>
        </div>
        <DataTable data={crud.data} columns={cols} />
      </div>
    </div>
  );
}
