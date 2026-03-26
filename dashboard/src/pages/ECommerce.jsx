import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { pimProducts, paymentTransactions } from '../data/mockData';
import { ShoppingBag, Package, CreditCard, DollarSign } from 'lucide-react';

const pimCols = [
  { key: 'id', label: 'ID' },
  { key: 'sku', label: 'SKU', sortable: true },
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'brand', label: 'Brand' },
  { key: 'variants', label: 'Variants' },
  { key: 'images', label: 'Images' },
  { key: 'completeness', label: 'Completeness', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const pimFields = [
  { key: 'name',         label: 'Product Name',  type: 'text',   required: true },
  { key: 'sku',          label: 'SKU',            type: 'text',   required: true },
  { key: 'category',     label: 'Category',       type: 'select', options: ['Software','Hardware','Service'] },
  { key: 'brand',        label: 'Brand',          type: 'text' },
  { key: 'variants',     label: 'Variants',       type: 'number' },
  { key: 'completeness', label: 'Completeness %', type: 'text' },
  { key: 'status',       label: 'Status',         type: 'select', options: ['Published','Draft','Archived'] },
];

const paymentCols = [
  { key: 'id', label: 'ID' },
  { key: 'orderId', label: 'Order #', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'method', label: 'Method' },
  { key: 'provider', label: 'Provider' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'reference', label: 'Reference' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const paymentFields = [
  { key: 'orderId',   label: 'Order ID',   type: 'text',   required: true },
  { key: 'customer',  label: 'Customer',   type: 'text',   required: true },
  { key: 'amount',    label: 'Amount',     type: 'text' },
  { key: 'method',    label: 'Method',     type: 'select', options: ['Credit Card','ACH','Wire Transfer','PayPal'] },
  { key: 'provider',  label: 'Provider',   type: 'select', options: ['Stripe','PayPal','Bank','Square'] },
  { key: 'date',      label: 'Date',       type: 'date' },
  { key: 'status',    label: 'Status',     type: 'select', options: ['Success','Pending','Failed','Refunded'] },
];

function TabContent({ type }) {
  const isPIM  = type === 'pim';
  const crud   = useCRUD(isPIM ? pimProducts : paymentTransactions);
  const cols   = isPIM ? pimCols    : paymentCols;
  const fields = isPIM ? pimFields  : paymentFields;
  const label  = isPIM ? 'Product'  : 'Payment';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function ECommerce() {
  const [tab, setTab] = useState('pim');
  const tabs = [
    { id: 'pim',      label: 'Product Catalog (PIM)', count: pimProducts.length },
    { id: 'payments', label: 'Payment Transactions',  count: paymentTransactions.length },
  ];
  const published  = pimProducts.filter(p => p.status === 'Published').length;
  const successPay = paymentTransactions.filter(t => t.status === 'Success').length;
  const pendingPay = paymentTransactions.filter(t => t.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="E-Commerce Management" subtitle="Product Information (PIM) · Payment Gateway" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products"    value={pimProducts.length}       subtitle="in catalog"     icon={Package}   color="pink"   trend={2}  />
        <StatCard title="Published"         value={published}                  subtitle="live"           icon={ShoppingBag}color="green" trend={1}  />
        <StatCard title="Payments Success"  value={successPay}                 subtitle="transactions"   icon={CreditCard}color="emerald"trend={5} />
        <StatCard title="Pending Payments"  value={pendingPay}                 subtitle="awaiting"       icon={DollarSign}color="amber"  trend={2}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
