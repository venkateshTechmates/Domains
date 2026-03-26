import {
  Building2, Users, Handshake, Layers, GraduationCap, FileText,
  Package, FolderOpen, ClipboardList, Briefcase
} from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'HMS',  description:'Hospital Management System — patients, doctors, appointments',        icon:Building2,    path:'/hms',  color:'blue',   stats:[{label:'Patients',val:'10'},{label:'Doctors',val:'8'}] },
  { name:'HRMS', description:'Human Resource Management — employees, leave, departments',           icon:Users,        path:'/hrms', color:'purple', stats:[{label:'Employees',val:'12'},{label:'Departments',val:'6'}] },
  { name:'CRM',  description:'Customer Relationship Management — leads, contacts, deals',           icon:Handshake,    path:'/crm',  color:'indigo', stats:[{label:'Leads',val:'10'},{label:'Deals',val:'8'}] },
  { name:'ERP',  description:'Enterprise Resource Planning — departments, KPIs, analytics',         icon:Layers,       path:'/erp',  color:'sky',    stats:[{label:'Departments',val:'6'},{label:'Revenue','val':'$241K'}] },
  { name:'LMS',  description:'Learning Management System — courses and learners',                   icon:GraduationCap,path:'/lms',  color:'green',  stats:[{label:'Courses',val:'8'},{label:'Learners',val:'8'}] },
  { name:'CMS',  description:'Content Management — pages, media, categories',                       icon:FileText,     path:'/cms',  color:'orange', stats:[{label:'Pages',val:'8'},{label:'Media',val:'6'}] },
  { name:'IMS',  description:'Inventory Management — stock items and purchase orders',              icon:Package,      path:'/ims',  color:'amber',  stats:[{label:'SKUs',val:'12'},{label:'POs',val:'7'}] },
  { name:'PMS',  description:'Project Management System — projects, tasks, timelines',              icon:FolderOpen,   path:'/pms',  color:'teal',   stats:[{label:'Projects',val:'10'},{label:'Tasks',val:'8'}] },
  { name:'TMS',  description:'Ticket Management System — bug tracking, feature requests',           icon:ClipboardList,path:'/tms',  color:'rose',   stats:[{label:'Open Tickets',val:'8'},{label:'Critical',val:'2'}] },
  { name:'EMS',  description:'Employee Engagement & Management — reviews, training, recognition',   icon:Briefcase,    path:'/ems',  color:'violet', stats:[{label:'Records',val:'10'},{label:'Flagged',val:'2'}] },
];

const colorMap = {
  blue:'indigo', purple:'violet', indigo:'indigo', sky:'indigo', green:'emerald',
  orange:'amber', amber:'amber', teal:'emerald', rose:'rose', violet:'violet',
};

export default function BusinessCategory() {
  return (
    <CategoryPage
      title="Business Systems"
      subtitle="Core enterprise management modules"
      icon={Building2}
      color="indigo"
      modules={modules.map(m => ({ ...m, color: colorMap[m.color] || 'indigo' }))}
    />
  );
}
