import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { fleet } from '../data/mockData';
import { Truck, CheckCircle, Wrench, MapPin } from 'lucide-react';

const cols = [
  { key:'id',           label:'ID' },
  { key:'vehicle',      label:'Vehicle',      sortable:true },
  { key:'type',         label:'Type',         sortable:true },
  { key:'driver',       label:'Driver',       sortable:true },
  { key:'plate',        label:'Plate No.' },
  { key:'route',        label:'Current Route' },
  { key:'lastService',  label:'Last Service', sortable:true },
  { key:'nextService',  label:'Next Service', sortable:true },
  { key:'status',       label:'Status' },
];
const fields = [
  { key:'vehicle',     label:'Vehicle Name',  type:'text', required:true },
  { key:'type',        label:'Vehicle Type',  type:'select', options:['Truck','Van','Cargo','Trailer','Pickup','Refrigerated'] },
  { key:'driver',      label:'Driver',        type:'text' },
  { key:'plate',       label:'Plate Number',  type:'text' },
  { key:'route',       label:'Current Route', type:'text' },
  { key:'lastService', label:'Last Service',  type:'date' },
  { key:'nextService', label:'Next Service',  type:'date' },
  { key:'status',      label:'Status',        type:'select', options:['Active','In Transit','Maintenance','Idle','Retired'] },
];

export default function FMS() {
  const crud = useCRUD(fleet);
  const active  = fleet.filter(v => v.status === 'Active' || v.status === 'In Transit').length;
  const maint   = fleet.filter(v => v.status === 'Maintenance').length;
  const types   = [...new Set(fleet.map(v => v.type))].length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Fleet Management System" subtitle="Vehicles · Drivers · Routes · Maintenance" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Fleet Size"   value={fleet.length} subtitle="vehicles"      icon={Truck}        color="amber"  trend={0}  />
        <StatCard title="Active"       value={active}        subtitle="operational"   icon={CheckCircle}  color="green"  trend={2}  />
        <StatCard title="Maintenance"  value={maint}         subtitle="off-road"      icon={Wrench}       color="red"    trend={-1} />
        <StatCard title="Types"        value={types}         subtitle="vehicle classes"icon={MapPin}       color="indigo" trend={0}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search fleet…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-300" />
          <button onClick={crud.openAdd} className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Vehicle</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Vehicle' : 'Add Vehicle'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
