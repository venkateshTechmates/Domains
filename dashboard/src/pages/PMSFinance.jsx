import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { portfolios, holdings } from '../data/mockData';
import { TrendingUp, DollarSign, BarChart2, AlertTriangle } from 'lucide-react';

const portfolioCols = [
  { key:'id', label:'ID' },
  { key:'name', label:'Portfolio', sortable:true },
  { key:'manager', label:'Manager', sortable:true },
  { key:'value', label:'Value', sortable:true },
  { key:'returnPct', label:'Return', sortable:true, render: v => (
    <span className={`font-semibold ${v.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{v}</span>
  )},
  { key:'risk', label:'Risk', sortable:true, render: v => <Badge status={v} /> },
  { key:'assets', label:'# Assets' },
  { key:'lastRebalance', label:'Last Rebalance', sortable:true },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const portfolioFields = [
  { key:'name',          label:'Portfolio Name', type:'text', required:true },
  { key:'manager',       label:'Manager',        type:'text' },
  { key:'value',         label:'AUM Value',      type:'text' },
  { key:'returnPct',     label:'Return %',       type:'text' },
  { key:'risk',          label:'Risk Level',     type:'select', options:['Low','Moderate','High'] },
  { key:'assets',        label:'Number of Assets',type:'number' },
  { key:'lastRebalance', label:'Last Rebalance', type:'date' },
  { key:'status',        label:'Status',         type:'select', options:['Active','Under Review','Closed'] },
];

const holdingsCols = [
  { key:'id', label:'ID' },
  { key:'portfolio', label:'Portfolio', sortable:true },
  { key:'asset', label:'Asset', sortable:true },
  { key:'type', label:'Type', sortable:true },
  { key:'quantity', label:'Qty' },
  { key:'avgPrice', label:'Avg Price' },
  { key:'currentPrice', label:'Current Price' },
  { key:'value', label:'Value', sortable:true },
  { key:'gain', label:'Gain/Loss', render: v => (
    <span className={`font-semibold ${v.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{v}</span>
  )},
];
const holdingsFields = [
  { key:'portfolio',    label:'Portfolio',     type:'text' },
  { key:'asset',        label:'Asset Name',    type:'text', required:true },
  { key:'type',         label:'Type',          type:'select', options:['Equity','Bond','ETF','REIT','Commodity','Crypto'] },
  { key:'quantity',     label:'Quantity',      type:'number' },
  { key:'avgPrice',     label:'Avg Buy Price', type:'text' },
  { key:'currentPrice', label:'Current Price', type:'text' },
  { key:'value',        label:'Market Value',  type:'text' },
];

function TabContent({ type }) {
  const isPf = type === 'portfolios';
  const crud = useCRUD(isPf ? portfolios : holdings);
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder={`Search ${isPf ? 'portfolio' : 'holding'}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          <button onClick={crud.openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-lg">
            + Add {isPf ? 'Portfolio' : 'Holding'}
          </button>
        </div>
        <DataTable data={crud.data} columns={isPf ? portfolioCols : holdingsCols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? `Edit ${isPf ? 'Portfolio' : 'Holding'}` : `Add ${isPf ? 'Portfolio' : 'Holding'}`}
        fields={isPf ? portfolioFields : holdingsFields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </>
  );
}

export default function PMSFinance() {
  const [tab, setTab] = useState('portfolios');
  const active = portfolios.filter(p => p.status === 'Active').length;
  const underReview = portfolios.filter(p => p.status === 'Under Review').length;
  const tabs = [
    { id:'portfolios', label:'Portfolios', count: portfolios.length },
    { id:'holdings',   label:'Holdings',   count: holdings.length },
  ];
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Portfolio Management System" subtitle="Portfolios · Holdings · Returns · Risk" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Portfolios"    value={portfolios.length} subtitle="managed"       icon={BarChart2}    color="emerald" trend={1}  />
        <StatCard title="Active"        value={active}            subtitle="performing"    icon={TrendingUp}   color="green"   trend={2}  />
        <StatCard title="Under Review"  value={underReview}       subtitle="attention"     icon={AlertTriangle}color="amber"   trend={0}  />
        <StatCard title="Holdings"      value={holdings.length}   subtitle="tracked assets"icon={DollarSign}   color="indigo"  trend={3}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
