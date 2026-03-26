import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { supplyChain } from '../data/mockData';
import { Network, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const cols = [
  { key:'id',           label:'ID' },
  { key:'supplier',     label:'Supplier',     sortable:true },
  { key:'item',         label:'Item',         sortable:true },
  { key:'quantity',     label:'Quantity' },
  { key:'unitCost',     label:'Unit Cost' },
  { key:'orderDate',    label:'Order Date',   sortable:true },
  { key:'deliveryDate', label:'Delivery',     sortable:true },
  { key:'origin',       label:'Origin' },
  { key:'status',       label:'Status' },
];
const fields = [
  { key:'supplier',     label:'Supplier',      type:'text', required:true },
  { key:'item',         label:'Item/Material', type:'text', required:true },
  { key:'quantity',     label:'Quantity',      type:'number' },
  { key:'unitCost',     label:'Unit Cost',     type:'text' },
  { key:'orderDate',    label:'Order Date',    type:'date' },
  { key:'deliveryDate', label:'Delivery Date', type:'date' },
  { key:'origin',       label:'Country of Origin',type:'text' },
  { key:'status',       label:'Status',        type:'select', options:['Ordered','In Transit','At Customs','Delivered','Cancelled'] },
];

export default function SCM() {
  const crud = useCRUD(supplyChain);
  const inTransit = supplyChain.filter(s => s.status === 'In Transit' || s.status === 'Ordered').length;
  const delivered = supplyChain.filter(s => s.status === 'Delivered').length;
  const suppliers = [...new Set(supplyChain.map(s => s.supplier))].length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Supply Chain Management" subtitle="Procurement · Inventory · Supplier network · Delivery" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Orders"     value={supplyChain.length} subtitle="all"          icon={Network}     color="amber"  trend={2}  />
        <StatCard title="In Transit" value={inTransit}           subtitle="on the way"   icon={Clock}       color="indigo" trend={0}  />
        <StatCard title="Delivered"  value={delivered}           subtitle="completed"    icon={CheckCircle} color="green"  trend={3}  />
        <StatCard title="Suppliers"  value={suppliers}           subtitle="unique vendors"icon={TrendingUp}  color="violet" trend={1}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search supply chain…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-300" />
          <button onClick={crud.openAdd} className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Order</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Order' : 'New Supply Order'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
