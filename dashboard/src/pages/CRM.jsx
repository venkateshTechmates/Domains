import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { leads, contacts, deals } from '../data/mockData';
import { Target, Users, DollarSign, TrendingUp } from 'lucide-react';

const leadCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Company', sortable: true },
  { key: 'contact', label: 'Contact' },
  { key: 'email', label: 'Email' },
  { key: 'source', label: 'Source' },
  { key: 'value', label: 'Value', sortable: true },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const leadFields = [
  { key: 'name',       label: 'Company',      type: 'text',   required: true },
  { key: 'contact',    label: 'Contact Name', type: 'text',   required: true },
  { key: 'email',      label: 'Email',        type: 'email' },
  { key: 'phone',      label: 'Phone',        type: 'text' },
  { key: 'source',     label: 'Source',       type: 'select', options: ['Website','Referral','LinkedIn','Event','Cold Call'] },
  { key: 'value',      label: 'Est. Value',   type: 'text' },
  { key: 'assignedTo', label: 'Assigned To',  type: 'text' },
  { key: 'status',     label: 'Status',       type: 'select', options: ['New','Contacted','Qualified','Lost'] },
];

const contactCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'lastActivity', label: 'Last Activity', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const contactFields = [
  { key: 'name',    label: 'Name',    type: 'text',  required: true },
  { key: 'company', label: 'Company', type: 'text',  required: true },
  { key: 'email',   label: 'Email',   type: 'email', required: true },
  { key: 'phone',   label: 'Phone',   type: 'text' },
  { key: 'status',  label: 'Status',  type: 'select', options: ['Active','Inactive'] },
];

const dealCols = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Deal', sortable: true },
  { key: 'contact', label: 'Contact' },
  { key: 'value', label: 'Value', sortable: true },
  { key: 'stage', label: 'Stage', render: v => <Badge status={v} /> },
  { key: 'probability', label: 'Probability' },
  { key: 'closeDate', label: 'Close Date', sortable: true },
  { key: 'owner', label: 'Owner' },
];
const dealFields = [
  { key: 'title',       label: 'Deal Title',   type: 'text',   required: true },
  { key: 'contact',     label: 'Contact',      type: 'text',   required: true },
  { key: 'value',       label: 'Value',        type: 'text' },
  { key: 'stage',       label: 'Stage',        type: 'select', options: ['Qualified','Proposal','Negotiation','Won','Lost'] },
  { key: 'probability', label: 'Probability',  type: 'text' },
  { key: 'closeDate',   label: 'Close Date',   type: 'date' },
  { key: 'owner',       label: 'Owner',        type: 'text' },
];

function TabContent({ type }) {
  const isLeads    = type === 'leads';
  const isContacts = type === 'contacts';
  const crud       = useCRUD(isLeads ? leads : isContacts ? contacts : deals);
  const cols       = isLeads ? leadCols    : isContacts ? contactCols : dealCols;
  const fields     = isLeads ? leadFields  : isContacts ? contactFields : dealFields;
  const label      = isLeads ? 'Lead'      : isContacts ? 'Contact'   : 'Deal';
  const accentCls  = 'bg-indigo-600 hover:bg-indigo-700';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className={`${accentCls} text-white text-sm px-4 py-1.5 rounded-lg`}>
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

export default function CRM() {
  const [tab, setTab] = useState('leads');
  const tabs = [
    { id: 'leads',    label: 'Leads',    count: leads.length },
    { id: 'contacts', label: 'Contacts', count: contacts.length },
    { id: 'deals',    label: 'Deals',    count: deals.length },
  ];
  const qualified  = leads.filter(l => l.status === 'Qualified').length;
  const openDeals  = deals.filter(d => d.stage !== 'Won' && d.stage !== 'Lost').length;
  const wonDeals   = deals.filter(d => d.stage === 'Won').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Customer Relationship Management" subtitle="Leads · Contacts · Deals" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads"     value={leads.length}    subtitle="in pipeline"  icon={Target}     color="indigo" trend={12} />
        <StatCard title="Qualified Leads" value={qualified}       subtitle="ready to sell" icon={TrendingUp} color="green"  trend={8}  />
        <StatCard title="Open Deals"      value={openDeals}       subtitle="in progress"  icon={DollarSign} color="amber"  trend={3}  />
        <StatCard title="Won This Month"  value={wonDeals}        subtitle="closed"       icon={Users}      color="purple" trend={5}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
