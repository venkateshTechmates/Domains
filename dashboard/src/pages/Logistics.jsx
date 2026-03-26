import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { routes, fleet, supplyChain } from '../data/mockData';
import { Truck, MapPin, Package, Activity } from 'lucide-react';

const routeCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Route Name', sortable: true },
  { key: 'origin', label: 'Origin', sortable: true },
  { key: 'destination', label: 'Destination' },
  { key: 'distance', label: 'Distance' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'frequency', label: 'Frequency' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const routeFields = [
  { key: 'name',        label: 'Route Name',   type: 'text',   required: true },
  { key: 'origin',      label: 'Origin',       type: 'text',   required: true },
  { key: 'destination', label: 'Destination',  type: 'text',   required: true },
  { key: 'distance',    label: 'Distance',     type: 'text' },
  { key: 'frequency',   label: 'Frequency',    type: 'select', options: ['Daily','Weekly','Monthly'] },
  { key: 'status',      label: 'Status',       type: 'select', options: ['Active','Inactive'] },
];

const fleetCols = [
  { key: 'id', label: 'ID' },
  { key: 'vehicle', label: 'Vehicle', sortable: true },
  { key: 'plateNo', label: 'Plate No.' },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'driver', label: 'Driver' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'mileage', label: 'Mileage', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const fleetFields = [
  { key: 'vehicle',  label: 'Vehicle Model', type: 'text',   required: true },
  { key: 'plateNo',  label: 'Plate No.',     type: 'text',   required: true },
  { key: 'type',     label: 'Type',          type: 'select', options: ['Heavy','Light','Van'] },
  { key: 'driver',   label: 'Driver',        type: 'text' },
  { key: 'capacity', label: 'Capacity',      type: 'text' },
  { key: 'status',   label: 'Status',        type: 'select', options: ['Active','Maintenance','Inactive'] },
];

const scmCols = [
  { key: 'id', label: 'ID' },
  { key: 'supplier', label: 'Supplier', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'country', label: 'Country' },
  { key: 'leadTime', label: 'Lead Time' },
  { key: 'reliability', label: 'Reliability', sortable: true },
  { key: 'lastOrder', label: 'Last Order' },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const scmFields = [
  { key: 'supplier',    label: 'Supplier Name', type: 'text',   required: true },
  { key: 'category',    label: 'Category',      type: 'text',   required: true },
  { key: 'country',     label: 'Country',       type: 'text' },
  { key: 'leadTime',    label: 'Lead Time',     type: 'text' },
  { key: 'reliability', label: 'Reliability',   type: 'text' },
  { key: 'status',      label: 'Status',        type: 'select', options: ['Active','Review','Inactive'] },
];

function TabContent({ type }) {
  const isRoute = type === 'routes';
  const isFleet = type === 'fleet';
  const crud    = useCRUD(isRoute ? routes : isFleet ? fleet : supplyChain);
  const cols    = isRoute ? routeCols  : isFleet ? fleetCols  : scmCols;
  const fields  = isRoute ? routeFields : isFleet ? fleetFields : scmFields;
  const label   = isRoute ? 'Route'    : isFleet ? 'Vehicle'   : 'Supplier';

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}s…`}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={crud.openAdd} className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-1.5 rounded-lg">
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

export default function Logistics() {
  const [tab, setTab] = useState('routes');
  const tabs = [
    { id: 'routes', label: 'Routes',       count: routes.length },
    { id: 'fleet',  label: 'Fleet',        count: fleet.length },
    { id: 'scm',    label: 'Supply Chain', count: supplyChain.length },
  ];
  const activeRoutes  = routes.filter(r => r.status === 'Active').length;
  const activeFleet   = fleet.filter(f => f.status === 'Active').length;
  const maintenance   = fleet.filter(f => f.status === 'Maintenance').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Logistics Management" subtitle="Routes · Fleet · Supply Chain" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Routes"    value={routes.length}      subtitle="configured"    icon={MapPin}    color="orange" trend={0}  />
        <StatCard title="Active Routes"   value={activeRoutes}        subtitle="in operation"  icon={Activity}  color="green"  trend={2}  />
        <StatCard title="Fleet Vehicles"  value={fleet.length}        subtitle="registered"    icon={Truck}     color="amber"  trend={1}  />
        <StatCard title="In Maintenance"  value={maintenance}         subtitle="vehicles"      icon={Package}   color="rose"   trend={0}  />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
