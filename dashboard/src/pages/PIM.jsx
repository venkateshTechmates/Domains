import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { pimProducts } from '../data/mockData';
import { Package, CheckCircle, AlertCircle, Tag } from 'lucide-react';

const cols = [
  { key:'id',          label:'ID' },
  { key:'name',        label:'Product',      sortable:true },
  { key:'sku',         label:'SKU' },
  { key:'category',    label:'Category',     sortable:true },
  { key:'brand',       label:'Brand' },
  { key:'price',       label:'Price',        sortable:true },
  { key:'stock',       label:'Stock' },
  { key:'status',      label:'Status' },
];
const fields = [
  { key:'name',        label:'Product Name', type:'text', required:true },
  { key:'sku',         label:'SKU',          type:'text' },
  { key:'category',    label:'Category',     type:'text' },
  { key:'brand',       label:'Brand',        type:'text' },
  { key:'price',       label:'Price',        type:'text' },
  { key:'stock',       label:'Stock Qty',    type:'number' },
  { key:'description', label:'Description',  type:'textarea' },
  { key:'status',      label:'Status',       type:'select', options:['Active','Draft','Discontinued','Out of Stock'] },
];

export default function PIM() {
  const crud = useCRUD(pimProducts);
  const active   = pimProducts.filter(p => p.status === 'Active').length;
  const outOfStock = pimProducts.filter(p => p.status === 'Out of Stock').length;
  const categories = [...new Set(pimProducts.map(p => p.category))].length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Product Information Management" subtitle="Product catalog · Attributes · Categories · Enrichment" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Products"    value={pimProducts.length} subtitle="total catalog" icon={Package}     color="pink"   trend={3}  />
        <StatCard title="Active"      value={active}              subtitle="live products" icon={CheckCircle} color="green"  trend={2}  />
        <StatCard title="Out of Stock"value={outOfStock}           subtitle="unavailable"  icon={AlertCircle} color="red"    trend={-1} />
        <StatCard title="Categories"  value={categories}           subtitle="distinct"     icon={Tag}         color="violet" trend={1}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search products…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          <button onClick={crud.openAdd} className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Product</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Product' : 'Add Product'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
