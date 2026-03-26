import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Tabs from '../components/Tabs';
import { useCRUD } from '../hooks/useCRUD';
import { cmsPages, media, cmsCategories } from '../data/mockData';
import { FileText, Image, FolderOpen, Eye } from 'lucide-react';

const pageCols = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Page Title', sortable: true },
  { key: 'slug', label: 'Slug' },
  { key: 'author', label: 'Author', sortable: true },
  { key: 'created', label: 'Created', sortable: true },
  { key: 'modified', label: 'Modified' },
  { key: 'views', label: 'Views', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const pageFields = [
  { key: 'title',  label: 'Page Title', type: 'text',   required: true },
  { key: 'slug',   label: 'URL Slug',   type: 'text',   required: true },
  { key: 'author', label: 'Author',     type: 'text' },
  { key: 'status', label: 'Status',     type: 'select', options: ['Published','Draft','Archived'] },
];

const mediaCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Filename', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'size', label: 'Size' },
  { key: 'dimensions', label: 'Size/Dims' },
  { key: 'uploadedBy', label: 'Uploaded By' },
  { key: 'uploaded', label: 'Date', sortable: true },
];
const mediaFields = [
  { key: 'name',       label: 'Filename',    type: 'text',   required: true },
  { key: 'type',       label: 'Type',        type: 'select', options: ['Image','Video','PDF','SVG','ZIP'] },
  { key: 'size',       label: 'File Size',   type: 'text' },
  { key: 'uploadedBy', label: 'Uploaded By', type: 'text' },
];

const catCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Category', sortable: true },
  { key: 'slug', label: 'Slug' },
  { key: 'posts', label: 'Posts', sortable: true },
  { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
];
const catFields = [
  { key: 'name',   label: 'Category Name', type: 'text', required: true },
  { key: 'slug',   label: 'Slug',          type: 'text' },
  { key: 'status', label: 'Status',        type: 'select', options: ['Active','Inactive'] },
];

function TabContent({ type }) {
  const isPages = type === 'pages';
  const isMedia = type === 'media';
  const crud    = useCRUD(isPages ? cmsPages : isMedia ? media : cmsCategories);
  const cols    = isPages ? pageCols   : isMedia ? mediaCols  : catCols;
  const fields  = isPages ? pageFields : isMedia ? mediaFields : catFields;
  const label   = isPages ? 'Page'     : isMedia ? 'Media'    : 'Category';

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

export default function CMS() {
  const [tab, setTab] = useState('pages');
  const tabs = [
    { id: 'pages',      label: 'Pages',      count: cmsPages.length },
    { id: 'media',      label: 'Media',       count: media.length },
    { id: 'categories', label: 'Categories', count: cmsCategories.length },
  ];
  const published = cmsPages.filter(p => p.status === 'Published').length;
  const drafts    = cmsPages.filter(p => p.status === 'Draft').length;
  const totalViews = cmsPages.reduce((s, p) => s + parseInt(p.views.replace(',','') || 0), 0).toLocaleString();

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Content Management System" subtitle="Pages · Media Library · Categories" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Pages"    value={cmsPages.length} subtitle="all pages"       icon={FileText}   color="orange" trend={3}  />
        <StatCard title="Published"      value={published}        subtitle="live"            icon={Eye}        color="green"  trend={2}  />
        <StatCard title="Drafts"         value={drafts}           subtitle="in progress"     icon={FileText}   color="amber"  trend={1}  />
        <StatCard title="Total Views"    value={totalViews}       subtitle="page impressions"icon={Eye}        color="indigo" trend={18} />
      </div>
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      <TabContent type={tab} />
    </div>
  );
}
