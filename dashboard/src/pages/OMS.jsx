import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { orders, products, customers } from '../data/mockData';
import { ShoppingCart, Package, Users, DollarSign } from 'lucide-react';

const orderCols = [
  { key: 'id', label: 'Order #' },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'shipping', label: 'Carrier' },
  { key: 'trackingNo', label: 'Tracking #' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const orderFields = [
  { key: 'customer',   label: 'Customer',       type: 'text',   required: true },
  { key: 'items',      label: 'Items Count',    type: 'number' },
  { key: 'total',      label: 'Total',          type: 'text' },
  { key: 'shipping',   label: 'Carrier',        type: 'select', options: ['FedEx','UPS','DHL','USPS'] },
  { key: 'trackingNo', label: 'Tracking No.',   type: 'text' },
  { key: 'date',       label: 'Order Date',     type: 'date' },
  { key: 'status',     label: 'Status',         type: 'select', options: ['Pending','Processing','Shipped','Delivered','Cancelled','Returned'] },
];

const productCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Product', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const productFields = [
  { key: 'name',     label: 'Product Name', type: 'text',   required: true },
  { key: 'sku',      label: 'SKU',          type: 'text',   required: true },
  { key: 'category', label: 'Category',     type: 'select', options: ['Software','Hardware','Service'] },
  { key: 'price',    label: 'Price',        type: 'text' },
  { key: 'stock',    label: 'Stock',        type: 'number' },
  { key: 'status',   label: 'Status',       type: 'select', options: ['Active','Low Stock','Out of Stock','Discontinued'] },
];

const customerCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Company', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'orders', label: 'Orders', sortable: true },
  { key: 'spent', label: 'Total Spent', sortable: true },
  { key: 'since', label: 'Customer Since' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const customerFields = [
  { key: 'name',   label: 'Company Name', type: 'text',  required: true },
  { key: 'email',  label: 'Email',        type: 'email', required: true },
  { key: 'phone',  label: 'Phone',        type: 'text' },
  { key: 'status', label: 'Status',       type: 'select', options: ['Active','Inactive'] },
];

function TabContent({ type }) {
  const isOrders    = type === 'orders';
  const isProducts  = type === 'products';
  const crud        = useCRUD(isOrders ? orders : isProducts ? products : customers);
  const cols        = isOrders ? orderCols   : isProducts ? productCols   : customerCols;
  const fields      = isOrders ? orderFields : isProducts ? productFields : customerFields;
  const label       = isOrders ? 'Order'     : isProducts ? 'Product'     : 'Customer';
  const accentCls   = 'bg-teal-600 hover:bg-teal-700';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className={`${accentCls} text-white text-sm px-4 py-1.5 rounded-lg`}>
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

export default function OMS() {
  const [tab, setTab] = useState('orders');
  const tabs = [
    { id: 'orders',    label: 'Orders',    count: orders.length },
    { id: 'products',  label: 'Products',  count: products.length },
    { id: 'customers', label: 'Customers', count: customers.length },
  ];
  const processing   = orders.filter(o => o.status === 'Processing').length;
  const shipped      = orders.filter(o => o.status === 'Shipped').length;
  const totalRevenue = '$65,820';

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Order Management System" subtitle="Orders · Products · Customers" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders"  value={orders.length} subtitle="all time"         icon={ShoppingCart} color="teal"   trend={7}  />
        <StatCard title="Processing"    value={processing}     subtitle="in fulfillment"  icon={Package}      color="amber"  trend={2}  />
        <StatCard title="Shipped"       value={shipped}        subtitle="in transit"      icon={ShoppingCart} color="indigo" trend={5}  />
        <StatCard title="Revenue (Mo.)" value={totalRevenue}   subtitle="this month"      icon={DollarSign}   color="green"  trend={10} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
