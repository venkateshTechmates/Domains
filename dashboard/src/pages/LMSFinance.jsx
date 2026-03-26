import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useCRUD } from '../hooks/useCRUD';
import { loans } from '../data/mockData';
import { FileBarChart, DollarSign, CheckCircle, Clock } from 'lucide-react';

const columns = [
  { key:'id', label:'ID' },
  { key:'borrower', label:'Borrower', sortable:true },
  { key:'type', label:'Loan Type', sortable:true },
  { key:'amount', label:'Amount', sortable:true },
  { key:'rate', label:'Rate' },
  { key:'term', label:'Term' },
  { key:'balance', label:'Balance', sortable:true },
  { key:'startDate', label:'Start Date', sortable:true },
  { key:'nextPayment', label:'Next Payment', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const fields = [
  { key:'borrower',    label:'Borrower Name',   type:'text',   required:true },
  { key:'type',        label:'Loan Type',        type:'select', options:['Personal Loan','Business Loan','Mortgage','Auto Loan','Education Loan','Home Equity'] },
  { key:'amount',      label:'Amount',           type:'text' },
  { key:'rate',        label:'Interest Rate',    type:'text' },
  { key:'term',        label:'Term',             type:'text' },
  { key:'startDate',   label:'Start Date',       type:'date' },
  { key:'balance',     label:'Outstanding Balance',type:'text' },
  { key:'nextPayment', label:'Next Payment Date',type:'date' },
  { key:'status',      label:'Status',           type:'select', options:['Active','Closed','Defaulted','In Grace'] },
];

export default function LMSFinance() {
  const crud = useCRUD(loans);
  const active = loans.filter(l => l.status === 'Active').length;
  const closed = loans.filter(l => l.status === 'Closed').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Loan Management System" subtitle="Active Loans · Repayments · Schedules" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Loans"     value={loans.length} subtitle="all time"     icon={FileBarChart} color="emerald" trend={2}  />
        <StatCard title="Active Loans"    value={active}       subtitle="outstanding"  icon={Clock}        color="indigo"  trend={0}  />
        <StatCard title="Closed Loans"    value={closed}       subtitle="repaid"       icon={CheckCircle}  color="green"   trend={1}  />
        <StatCard title="Loan Types"      value={6}            subtitle="categories"   icon={DollarSign}   color="amber"   trend={0}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search loans…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          <button onClick={crud.openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Loan</button>
        </div>
        <DataTable data={crud.data} columns={columns} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Loan' : 'Add Loan'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
