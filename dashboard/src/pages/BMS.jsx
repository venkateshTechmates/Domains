import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { budgets, budgetExpenses } from '../data/mockData';
import { Wallet, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

const budgetCols = [
  { key:'id', label:'ID' },
  { key:'department', label:'Department', sortable:true },
  { key:'allocated', label:'Allocated', sortable:true },
  { key:'spent', label:'Spent', sortable:true },
  { key:'remaining', label:'Remaining', sortable:true },
  { key:'utilization', label:'Utilization %', sortable:true, render: v => (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${v > 100 ? 'bg-red-500' : v > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(v,100)}%` }} />
      </div>
      <span className="text-xs font-medium">{v}%</span>
    </div>
  )},
  { key:'period', label:'Period' },
  { key:'owner', label:'Owner', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const budgetFields = [
  { key:'department', label:'Department', type:'text', required:true },
  { key:'allocated',  label:'Allocated',  type:'text' },
  { key:'spent',      label:'Spent',      type:'text' },
  { key:'remaining',  label:'Remaining',  type:'text' },
  { key:'period',     label:'Period',     type:'text' },
  { key:'owner',      label:'Owner',      type:'text' },
  { key:'status',     label:'Status',     type:'select', options:['On Track','Warning','Over Budget','Closed'] },
];

const expenseCols = [
  { key:'id', label:'ID' },
  { key:'department', label:'Department', sortable:true },
  { key:'description', label:'Description', sortable:true },
  { key:'amount', label:'Amount', sortable:true },
  { key:'category', label:'Category', sortable:true },
  { key:'date', label:'Date', sortable:true },
  { key:'approvedBy', label:'Approved By' },
];
const expenseFields = [
  { key:'department',  label:'Department',   type:'text', required:true },
  { key:'description', label:'Description',  type:'text', required:true },
  { key:'amount',      label:'Amount',       type:'text' },
  { key:'category',    label:'Category',     type:'select', options:['Infrastructure','Advertising','Equipment','Software','Training','Events','Benefits','Travel','Other'] },
  { key:'date',        label:'Date',         type:'date' },
  { key:'approvedBy',  label:'Approved By',  type:'text' },
];

function TabContent({ type }) {
  const isBudget = type === 'budgets';
  const crud = useCRUD(isBudget ? budgets : budgetExpenses);
  const cols = isBudget ? budgetCols : expenseCols;
  const fields = isBudget ? budgetFields : expenseFields;
  const label = isBudget ? 'Budget' : 'Expense';
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

export default function BMS() {
  const [tab, setTab] = useState('budgets');
  const overBudget = budgets.filter(b => b.status === 'Over Budget').length;
  const warning = budgets.filter(b => b.status === 'Warning').length;
  const onTrack = budgets.filter(b => b.status === 'On Track').length;
  const tabs = [
    { id:'budgets',  label:'Department Budgets', count: budgets.length },
    { id:'expenses', label:'Expenses',           count: budgetExpenses.length },
  ];
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Budget Management" subtitle="Departments · Allocations · Expenses" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Budgets"  value={budgets.length} subtitle="departments"   icon={Wallet}       color="emerald" trend={0}  />
        <StatCard title="On Track"       value={onTrack}        subtitle="healthy"       icon={TrendingUp}   color="green"   trend={1}  />
        <StatCard title="Warning"        value={warning}        subtitle="near limit"    icon={AlertTriangle}color="amber"   trend={-1} />
        <StatCard title="Over Budget"    value={overBudget}     subtitle="exceeded"      icon={DollarSign}   color="red"     trend={-1} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
