import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import { useCRUD } from '../hooks/useCRUD';
import { assets } from '../data/mockData';
import { Landmark, CheckCircle, Wrench, DollarSign } from 'lucide-react';

const columns = [
  { key:'id', label:'ID' },
  { key:'name', label:'Asset Name', sortable:true },
  { key:'type', label:'Type', sortable:true },
  { key:'assignedTo', label:'Assigned To', sortable:true },
  { key:'location', label:'Location' },
  { key:'value', label:'Value', sortable:true },
  { key:'purchaseDate', label:'Purchase Date', sortable:true },
  { key:'warranty', label:'Warranty Expiry' },
  { key:'status', label:'Status', render: v => <Badge status={v} /> },
];
const fields = [
  { key:'name',        label:'Asset Name',     type:'text', required:true },
  { key:'type',        label:'Type',           type:'select', options:['Hardware','Network','Mobile','Cloud','Furniture','Printer','Vehicle','Other'] },
  { key:'assignedTo',  label:'Assigned To',    type:'text' },
  { key:'location',    label:'Location',       type:'text' },
  { key:'value',       label:'Value',          type:'text' },
  { key:'purchaseDate',label:'Purchase Date',  type:'date' },
  { key:'warranty',    label:'Warranty Expiry',type:'text' },
  { key:'status',      label:'Status',         type:'select', options:['In Use','Available','Maintenance','Retired','Disposed'] },
];

export default function AMS() {
  const crud = useCRUD(assets);
  const inUse = assets.filter(a => a.status === 'In Use' || a.status === 'Active').length;
  const maintenance = assets.filter(a => a.status === 'Maintenance').length;
  const totalValue = assets.filter(a => !a.value.includes('/')).length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Asset Management" subtitle="Hardware · Cloud · Network · Furniture" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assets"  value={assets.length} subtitle="tracked"       icon={Landmark}   color="emerald" trend={2}  />
        <StatCard title="In Use"        value={inUse}         subtitle="deployed"      icon={CheckCircle}color="green"   trend={0}  />
        <StatCard title="Maintenance"   value={maintenance}   subtitle="being serviced"icon={Wrench}     color="amber"   trend={-1} />
        <StatCard title="Categories"    value={8}             subtitle="asset types"   icon={DollarSign} color="indigo"  trend={0}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search assets…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          <button onClick={crud.openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Asset</button>
        </div>
        <DataTable data={crud.data} columns={columns} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Asset' : 'Add Asset'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
