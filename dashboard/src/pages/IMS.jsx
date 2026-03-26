import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { inventoryItems, purchaseOrders } from '../data/mockData';
import { Package, AlertTriangle, ShoppingCart, DollarSign } from 'lucide-react';

const itemCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Item Name', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'quantity', label: 'Qty', sortable: true },
  { key: 'reorderLevel', label: 'Reorder At' },
  { key: 'price', label: 'Unit Price' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const itemFields = [
  { key: 'name',        label: 'Item Name',    type: 'text',   required: true },
  { key: 'sku',         label: 'SKU',          type: 'text',   required: true },
  { key: 'category',    label: 'Category',     type: 'select', options: ['Electronics','Furniture','Accessories','Stationery','Equipment'] },
  { key: 'quantity',    label: 'Quantity',     type: 'number' },
  { key: 'reorderLevel',label: 'Reorder Level',type: 'number' },
  { key: 'price',       label: 'Unit Price',   type: 'text' },
  { key: 'supplier',    label: 'Supplier',     type: 'text' },
  { key: 'status',      label: 'Status',       type: 'select', options: ['In Stock','Low Stock','Out of Stock'] },
];

const poCols = [
  { key: 'id', label: 'PO #' },
  { key: 'supplier', label: 'Supplier', sortable: true },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'date', label: 'Order Date', sortable: true },
  { key: 'deliveryDate', label: 'Delivery Date' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const poFields = [
  { key: 'supplier',     label: 'Supplier',       type: 'text',   required: true },
  { key: 'items',        label: 'Items (summary)', type: 'text' },
  { key: 'total',        label: 'Total Value',     type: 'text' },
  { key: 'date',         label: 'Order Date',      type: 'date' },
  { key: 'deliveryDate', label: 'Delivery Date',   type: 'date' },
  { key: 'status',       label: 'Status',          type: 'select', options: ['Pending','Approved','Shipped','Delivered','Cancelled'] },
];

function TabContent({ type }) {
  const isItems = type === 'items';
  const crud    = useCRUD(isItems ? inventoryItems : purchaseOrders);
  const cols    = isItems ? itemCols   : poCols;
  const fields  = isItems ? itemFields : poFields;
  const label   = isItems ? 'Item' : 'Purchase Order';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function IMS() {
  const [tab, setTab] = useState('items');
  const tabs = [
    { id: 'items', label: 'Inventory Items', count: inventoryItems.length },
    { id: 'po',    label: 'Purchase Orders', count: purchaseOrders.length },
  ];
  const inStock    = inventoryItems.filter(i => i.status === 'In Stock').length;
  const lowStock   = inventoryItems.filter(i => i.status === 'Low Stock').length;
  const outOfStock = inventoryItems.filter(i => i.status === 'Out of Stock').length;
  const pendingPO  = purchaseOrders.filter(p => p.status === 'Pending' || p.status === 'Approved').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Inventory Management System" subtitle="Items · Stock · Purchase Orders" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total SKUs"    value={inventoryItems.length} subtitle="items tracked"  icon={Package}       color="amber"  trend={3}  />
        <StatCard title="In Stock"      value={inStock}               subtitle="available"       icon={Package}       color="green"  trend={2}  />
        <StatCard title="Low / Out"     value={`${lowStock} / ${outOfStock}`} subtitle="need attention" icon={AlertTriangle} color="rose"   trend={-2} />
        <StatCard title="Pending POs"   value={pendingPO}             subtitle="in progress"     icon={ShoppingCart}  color="indigo" trend={0}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
