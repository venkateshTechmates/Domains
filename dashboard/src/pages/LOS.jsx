import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useCRUD } from '../hooks/useCRUD';
import { loanApplications } from '../data/mockData';
import { BarChart2, CheckCircle, Clock, XCircle } from 'lucide-react';

const columns = [
  { key:'id', label:'ID' },
  { key:'applicant', label:'Applicant', sortable:true },
  { key:'type', label:'Loan Type', sortable:true },
  { key:'amount', label:'Amount', sortable:true },
  { key:'income', label:'Annual Income' },
  { key:'creditScore', label:'Credit Score', sortable:true, render: v => (
    <span className={`font-semibold ${v >= 750 ? 'text-green-600' : v >= 680 ? 'text-amber-600' : 'text-red-600'}`}>{v}</span>
  )},
  { key:'submitted', label:'Submitted', sortable:true },
  { key:'officer', label:'Loan Officer', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const fields = [
  { key:'applicant',   label:'Applicant',      type:'text',   required:true },
  { key:'type',        label:'Loan Type',       type:'select', options:['Personal Loan','Mortgage','Business Loan','Auto Loan','Education Loan','Home Equity'] },
  { key:'amount',      label:'Loan Amount',     type:'text' },
  { key:'income',      label:'Annual Income',   type:'text' },
  { key:'creditScore', label:'Credit Score',    type:'number' },
  { key:'submitted',   label:'Submitted Date',  type:'date' },
  { key:'officer',     label:'Loan Officer',    type:'text' },
  { key:'status',      label:'Status',          type:'select', options:['Under Review','Approved','Rejected','Pending Documents','Additional Docs Reqd','Disbursed'] },
];

export default function LOS() {
  const crud = useCRUD(loanApplications);
  const approved = loanApplications.filter(a => a.status === 'Approved').length;
  const reviewing = loanApplications.filter(a => a.status === 'Under Review').length;
  const rejected = loanApplications.filter(a => a.status === 'Rejected').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Loan Origination System" subtitle="Applications · Review · Approval Pipeline" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Applications" value={loanApplications.length} subtitle="all time"       icon={BarChart2}  color="emerald" trend={3}  />
        <StatCard title="Approved"           value={approved}               subtitle="ready to disburse"icon={CheckCircle}color="green"   trend={2}  />
        <StatCard title="Under Review"       value={reviewing}              subtitle="in pipeline"     icon={Clock}      color="amber"   trend={0}  />
        <StatCard title="Rejected"           value={rejected}               subtitle="declined"        icon={XCircle}    color="red"     trend={-1} />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search applications…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          <button onClick={crud.openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-lg">+ New Application</button>
        </div>
        <DataTable data={crud.data} columns={columns} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Application' : 'New Application'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
