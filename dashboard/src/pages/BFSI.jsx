import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { bankAccounts, insurancePolicies } from '../data/mockData';
import { PiggyBank, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const accountCols = [
  { key:'id', label:'ID' },
  { key:'accountNo', label:'Account No.' },
  { key:'holder', label:'Account Holder', sortable:true },
  { key:'type', label:'Type', sortable:true },
  { key:'balance', label:'Balance', sortable:true },
  { key:'bank', label:'Bank', sortable:true },
  { key:'branch', label:'Branch' },
  { key:'openDate', label:'Opened', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const accountFields = [
  { key:'accountNo', label:'Account No.', type:'text' },
  { key:'holder',    label:'Account Holder', type:'text', required:true },
  { key:'type',      label:'Type', type:'select', options:['Savings','Current','Fixed Deposit','Money Market','Corporate'] },
  { key:'balance',   label:'Balance', type:'text' },
  { key:'bank',      label:'Bank', type:'text' },
  { key:'branch',    label:'Branch', type:'text' },
  { key:'status',    label:'Status', type:'select', options:['Active','Frozen','Closed'] },
];

const policyCols = [
  { key:'id', label:'ID' },
  { key:'policyNo', label:'Policy No.' },
  { key:'holder', label:'Holder', sortable:true },
  { key:'type', label:'Type', sortable:true },
  { key:'premium', label:'Premium' },
  { key:'coverage', label:'Coverage' },
  { key:'startDate', label:'Start', sortable:true },
  { key:'endDate', label:'Expiry', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const policyFields = [
  { key:'policyNo', label:'Policy Number', type:'text' },
  { key:'holder',   label:'Policy Holder', type:'text', required:true },
  { key:'type',     label:'Insurance Type', type:'select', options:['Health Insurance','Life Insurance','Auto Insurance','Property Insurance','Business Insurance'] },
  { key:'premium',  label:'Premium', type:'text' },
  { key:'coverage', label:'Coverage Amount', type:'text' },
  { key:'startDate',label:'Start Date', type:'date' },
  { key:'endDate',  label:'End Date', type:'date' },
  { key:'status',   label:'Status', type:'select', options:['Active','Expired','Expiring','Cancelled'] },
];

function TabContent({ type }) {
  const isAccounts = type === 'accounts';
  const crud = useCRUD(isAccounts ? bankAccounts : insurancePolicies);
  const cols = isAccounts ? accountCols : policyCols;
  const fields = isAccounts ? accountFields : policyFields;
  const label = isAccounts ? 'Account' : 'Policy';
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          <button onClick={crud.openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add {label}</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${label}` : `Add ${label}`}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function BFSI() {
  const [tab, setTab] = useState('accounts');
  const activeAcc = bankAccounts.filter(a => a.status === 'Active').length;
  const activePol = insurancePolicies.filter(p => p.status === 'Active').length;
  const expiring = insurancePolicies.filter(p => p.status === 'Expiring').length;
  const tabs = [
    { id:'accounts', label:'Bank Accounts', count: bankAccounts.length },
    { id:'policies', label:'Insurance Policies', count: insurancePolicies.length },
  ];
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="BFSI – Banking, Financial Services & Insurance" subtitle="Accounts · Insurance Policies" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Bank Accounts"    value={bankAccounts.length}      subtitle="total"         icon={PiggyBank}    color="emerald" trend={1}  />
        <StatCard title="Active Accounts"  value={activeAcc}                subtitle="open"          icon={CheckCircle}  color="green"   trend={0}  />
        <StatCard title="Active Policies"  value={activePol}                subtitle="insured"       icon={Shield}       color="indigo"  trend={2}  />
        <StatCard title="Expiring Soon"    value={expiring}                  subtitle="needs renewal" icon={AlertTriangle}color="amber"   trend={-1} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
