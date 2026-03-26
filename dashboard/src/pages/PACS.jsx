import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useCRUD } from '../hooks/useCRUD';
import { radiologyStudies } from '../data/mockData';
import { Image, Scan, CheckCircle, Clock } from 'lucide-react';

const cols = [
  { key:'id',          label:'ID' },
  { key:'studyId',     label:'Study ID',   sortable:true },
  { key:'patient',     label:'Patient',    sortable:true },
  { key:'modality',    label:'Modality',   sortable:true },
  { key:'bodyPart',    label:'Body Part' },
  { key:'date',        label:'Date',       sortable:true },
  { key:'radiologist', label:'Radiologist',sortable:true },
  { key:'status',      label:'Status' },
];
const fields = [
  { key:'studyId',     label:'Study ID',   type:'text', required:true },
  { key:'patient',     label:'Patient',    type:'text', required:true },
  { key:'modality',    label:'Modality',   type:'select', options:['X-Ray','CT Scan','MRI','Ultrasound','PET','Fluoroscopy'] },
  { key:'bodyPart',    label:'Body Part',  type:'text' },
  { key:'date',        label:'Study Date', type:'date' },
  { key:'radiologist', label:'Radiologist',type:'text' },
  { key:'status',      label:'Status',     type:'select', options:['Pending','Acquired','Reported','Reviewed','Filed'] },
];

export default function PACS() {
  const crud = useCRUD(radiologyStudies);
  const pending  = radiologyStudies.filter(s => s.status === 'Pending' || s.status === 'Acquired').length;
  const reported = radiologyStudies.filter(s => s.status === 'Reported' || s.status === 'Reviewed').length;
  const modalities = [...new Set(radiologyStudies.map(s => s.modality))].length;
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Picture Archiving & Communication System" subtitle="Radiology images · Modality management · Digital archiving" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Studies"   value={radiologyStudies.length} subtitle="total images"   icon={Image}       color="rose"   trend={2}  />
        <StatCard title="Pending"   value={pending}                  subtitle="awaiting report" icon={Clock}       color="amber"  trend={0}  />
        <StatCard title="Reported"  value={reported}                 subtitle="with findings"  icon={CheckCircle} color="green"  trend={3}  />
        <StatCard title="Modalities"value={modalities}               subtitle="imaging types"  icon={Scan}        color="violet" trend={0}  />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <input value={crud.search} onChange={e => crud.setSearch(e.target.value)} placeholder="Search studies…"
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          <button onClick={crud.openAdd} className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-1.5 rounded-lg">+ Add Study</button>
        </div>
        <DataTable data={crud.data} columns={cols} onEdit={crud.openEdit} onDelete={crud.remove} />
      </div>
      <Modal isOpen={crud.modalOpen} title={crud.editing ? 'Edit Study' : 'New Study'}
        fields={fields} initial={crud.editing} onSave={crud.save} onClose={crud.closeModal} />
    </div>
  );
}
