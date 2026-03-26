import { GraduationCap, Users, ClipboardCheck, BookOpen } from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'SMS',              description:'Student Management System — enrollment, profiles, attendance', icon:Users,        path:'/sms',   color:'yellow', stats:[{label:'Students',val:'10'},{label:'Active',val:'8'}] },
  { name:'Exam Management',  description:'Exam planning, scheduling, results and reporting',             icon:ClipboardCheck,path:'/exam-management',color:'yellow', stats:[{label:'Exams',val:'7'},{label:'Upcoming',val:'3'}] },
  { name:'EMS Education',    description:'Education Management — courses, programs, faculty',            icon:BookOpen,     path:'/edu-ems',color:'yellow', stats:[{label:'Courses',val:'6'},{label:'Active',val:'5'}] },
];

export default function EducationCategory() {
  return (
    <CategoryPage
      title="Education"
      subtitle="Student management, examination and academic program systems"
      icon={GraduationCap}
      color="yellow"
      modules={modules}
    />
  );
}
