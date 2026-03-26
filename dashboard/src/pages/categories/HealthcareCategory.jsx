import { Heart, FileText, FlaskConical, Image, Radio } from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'EHR',  description:'Electronic Health Records — full patient health history, prescriptions', icon:FileText,     path:'/ehr',  color:'rose', stats:[{label:'Records',val:'8'},{label:'Prescriptions',val:'8'}] },
  { name:'EMR',  description:'Electronic Medical Records — clinical notes, diagnoses, vitals',         icon:Heart,        path:'/emr',  color:'rose', stats:[{label:'EMR Records',val:'8'},{label:'Active',val:'6'}] },
  { name:'LIS',  description:'Laboratory Information System — test orders, results, reports',          icon:FlaskConical, path:'/lis',  color:'rose', stats:[{label:'Lab Tests',val:'8'},{label:'Pending',val:'3'}] },
  { name:'PACS', description:'Picture Archiving & Communication — imaging studies, modalities',        icon:Image,        path:'/pacs', color:'rose', stats:[{label:'Studies',val:'6'},{label:'Reviewed',val:'4'}] },
  { name:'RIS',  description:'Radiology Information System — exam orders, scheduling, reports',        icon:Radio,        path:'/ris',  color:'rose', stats:[{label:'Orders',val:'8'},{label:'Completed',val:'5'}] },
];

export default function HealthcareCategory() {
  return (
    <CategoryPage
      title="Healthcare"
      subtitle="Clinical information systems for patient care and diagnostics"
      icon={Heart}
      color="rose"
      modules={modules}
    />
  );
}
