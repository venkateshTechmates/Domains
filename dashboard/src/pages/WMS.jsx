import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { warehouses, shipments } from '../data/mockData';
import { Warehouse, Truck, Package, AlertTriangle } from 'lucide-react';

const whCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Warehouse', sortable: true },
  { key: 'location', label: 'Location' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'used', label: 'Utilization', sortable: true },
  { key: 'manager', label: 'Manager' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const whFields = [
  { key: 'name',     label: 'Warehouse Name', type: 'text',   required: true },
  { key: 'location', label: 'Location',       type: 'text',   required: true },
  { key: 'capacity', label: 'Capacity',       type: 'text' },
  { key: 'manager',  label: 'Manager',        type: 'text' },
  { key: 'status',   label: 'Status',         type: 'select', options: ['Active','Inactive'] },
];

const shipCols = [
  { key: 'id', label: 'ID' },
  { key: 'from', label: 'Origin', sortable: true },
  { key: 'to', label: 'Destination', sortable: true },
  { key: 'carrier', label: 'Carrier' },
  { key: 'weight', label: 'Weight' },
  { key: 'departure', label: 'Departure' },
  { key: 'arrival', label: 'Arrival' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const shipFields = [
  { key: 'from',      label: 'Origin',      type: 'text',   required: true },
  { key: 'to',        label: 'Destination', type: 'text',   required: true },
  { key: 'carrier',   label: 'Carrier',     type: 'select', options: ['FedEx','UPS','DHL','USPS'] },
  { key: 'weight',    label: 'Weight',      type: 'text' },
  { key: 'departure', label: 'Departure',   type: 'date' },
  { key: 'arrival',   label: 'Est. Arrival',type: 'date' },
  { key: 'status',    label: 'Status',      type: 'select', options: ['Processing','Shipped','In Transit','Delivered','Returned'] },
];

function TabContent({ type }) {
  const isWH   = type === 'warehouses';
  const crud   = useCRUD(isWH ? warehouses : shipments);
  const cols   = isWH ? whCols   : shipCols;
  const fields = isWH ? whFields : shipFields;
  const label  = isWH ? 'Warehouse' : 'Shipment';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function WMS() {
  const [tab, setTab] = useState('warehouses');
  const tabs = [
    { id: 'warehouses', label: 'Warehouses', count: warehouses.length },
    { id: 'shipments',  label: 'Shipments',  count: shipments.length },
  ];
  const inTransit  = shipments.filter(s => s.status === 'In Transit' || s.status === 'Shipped').length;
  const delivered  = shipments.filter(s => s.status === 'Delivered').length;
  const highUtil   = warehouses.filter(w => parseInt(w.used) > 80).length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Warehouse Management System" subtitle="Warehouses · Inventory · Shipments" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Warehouses"    value={warehouses.length} subtitle="locations"     icon={Warehouse}    color="cyan"   trend={0}  />
        <StatCard title="High Util. WHs" value={highUtil}         subtitle="> 80% capacity"icon={AlertTriangle}color="amber"  trend={1}  />
        <StatCard title="In Transit"    value={inTransit}         subtitle="shipments"     icon={Truck}        color="indigo" trend={5}  />
        <StatCard title="Delivered"     value={delivered}         subtitle="this month"    icon={Package}      color="green"  trend={8}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
