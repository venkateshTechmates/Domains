import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { paymentTransactions } from '../data/mockData';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

const cols = [
  { key:'id',          label:'ID' },
  { key:'orderId',     label:'Order ID',     sortable:true },
  { key:'customer',    label:'Customer',     sortable:true },
  { key:'amount',      label:'Amount',       sortable:true },
  { key:'method',      label:'Method' },
  { key:'gateway',     label:'Gateway' },
  { key:'date',        label:'Date',         sortable:true },
  { key:'status',      label:'Status' },
];
const fields = [
  { key:'orderId',   label:'Order ID',       type:'text', required:true },
  { key:'customer',  label:'Customer',       type:'text', required:true },
  { key:'amount',    label:'Amount',         type:'text' },
  { key:'method',    label:'Payment Method', type:'select', options:['Credit Card','Debit Card','PayPal','Bank Transfer','Crypto','Wallet'] },
  { key:'gateway',   label:'Gateway',        type:'select', options:['Stripe','PayPal','Razorpay','Authorize.net','Square','Braintree'] },
  { key:'date',      label:'Transaction Date',type:'date' },
  { key:'status',    label:'Status',         type:'select', options:['Completed','Pending','Failed','Refunded','Disputed'] },
];

export default function PaymentGateway() {
  const crud = useCRUD(paymentTransactions);
  const completed = paymentTransactions.filter(t => t.status === 'Completed').length;
  const failed    = paymentTransactions.filter(t => t.status === 'Failed').length;
  const pending   = paymentTransactions.filter(t => t.status === 'Pending').length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Payment Gateway" subtitle="Transactions · Methods · Gateways · Refunds" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Transactions" value={paymentTransactions.length} subtitle="total"       icon={CreditCard}  color="pink"  trend={5}  />
        <StatCard title="Completed"    value={completed}                   subtitle="successful"  icon={CheckCircle} color="green" trend={4}  />
        <StatCard title="Pending"      value={pending}                     subtitle="processing"  icon={Clock}       color="amber" trend={0}  />
        <StatCard title="Failed"       value={failed}                      subtitle="issues"      icon={XCircle}     color="red"   trend={-2} />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search transactions…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          <button onClick={crud.openAdd} className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Record Transaction</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Transaction' : 'Add Transaction'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
