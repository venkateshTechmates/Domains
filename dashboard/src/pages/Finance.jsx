import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { accounts, transactions, invoices } from '../data/mockData';
import { Banknote, TrendingUp, FileText, AlertTriangle } from 'lucide-react';

const accountCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Account Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'balance', label: 'Balance', sortable: true },
  { key: 'currency', label: 'Currency' },
  { key: 'bank', label: 'Bank' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const accountFields = [
  { key: 'name',     label: 'Account Name', type: 'text',   required: true },
  { key: 'type',     label: 'Type',         type: 'select', options: ['Checking','Savings','Investment','Cash'] },
  { key: 'balance',  label: 'Balance',      type: 'text' },
  { key: 'currency', label: 'Currency',     type: 'select', options: ['USD','EUR','GBP','JPY'] },
  { key: 'bank',     label: 'Bank',         type: 'text' },
  { key: 'status',   label: 'Status',       type: 'select', options: ['Active','Inactive'] },
];

const txCols = [
  { key: 'id', label: 'ID' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { key: 'type', label: 'Type', render: v => <Badge status={v} /> },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'account', label: 'Account' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const txFields = [
  { key: 'date',        label: 'Date',        type: 'date',   required: true },
  { key: 'description', label: 'Description', type: 'text',   required: true },
  { key: 'type',        label: 'Type',        type: 'select', options: ['Income','Expense'] },
  { key: 'amount',      label: 'Amount',      type: 'text' },
  { key: 'account',     label: 'Account',     type: 'select', options: accounts.map(a => a.name) },
  { key: 'category',    label: 'Category',    type: 'select', options: ['Revenue','Payroll','IT','Marketing','Office','Equipment','Insurance','Rent','Interest'] },
  { key: 'status',      label: 'Status',      type: 'select', options: ['Completed','Pending'] },
];

const invCols = [
  { key: 'id', label: 'Invoice #' },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'issueDate', label: 'Issued', sortable: true },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const invFields = [
  { key: 'customer',  label: 'Customer',    type: 'text',   required: true },
  { key: 'amount',    label: 'Amount',      type: 'text',   required: true },
  { key: 'issueDate', label: 'Issue Date',  type: 'date' },
  { key: 'dueDate',   label: 'Due Date',    type: 'date' },
  { key: 'status',    label: 'Status',      type: 'select', options: ['Draft','Pending','Paid','Overdue'] },
];

function TabContent({ type }) {
  const isAcc = type === 'accounts';
  const isTx  = type === 'transactions';
  const crud  = useCRUD(isAcc ? accounts : isTx ? transactions : invoices);
  const cols  = isAcc ? accountCols : isTx ? txCols : invCols;
  const flds  = isAcc ? accountFields : isTx ? txFields : invFields;
  const label = isAcc ? 'Account'    : isTx ? 'Transaction' : 'Invoice';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-lg">
            + Add {label}
          </button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={flds} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function Finance() {
  const [tab, setTab] = useState('accounts');
  const tabs = [
    { id: 'accounts',     label: 'Accounts',     count: accounts.length },
    { id: 'transactions', label: 'Transactions', count: transactions.length },
    { id: 'invoices',     label: 'Invoices',     count: invoices.length },
  ];
  const overdue   = invoices.filter(i => i.status === 'Overdue').length;
  const pending   = invoices.filter(i => i.status === 'Pending').length;
  const income    = transactions.filter(t => t.type === 'Income').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Finance Management" subtitle="Accounts · Transactions · Invoices" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Accounts"   value={accounts.length}       subtitle="active accounts"   icon={Banknote}     color="emerald" trend={0}  />
        <StatCard title="Monthly Income"   value={income}                subtitle="transactions"      icon={TrendingUp}   color="green"   trend={12} />
        <StatCard title="Pending Invoices" value={pending}               subtitle="awaiting payment"  icon={FileText}     color="amber"   trend={-3} />
        <StatCard title="Overdue"          value={overdue}               subtitle="past due date"     icon={AlertTriangle}color="rose"    trend={1}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
