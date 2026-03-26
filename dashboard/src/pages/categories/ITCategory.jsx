import { Shield, Key, GitBranch, Bell, ClipboardList } from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'IAM',           description:'Identity & Access Management — users, roles, sessions',         icon:Shield,       path:'/iam',          color:'violet', stats:[{label:'Users',val:'10'},{label:'Roles',val:'6'}] },
  { name:'SSO',           description:'Single Sign-On — application federation, SSO sessions',         icon:Key,          path:'/sso',          color:'violet', stats:[{label:'Apps',val:'8'},{label:'Sessions',val:'7'}] },
  { name:'Workflow',      description:'Workflow & Process Automation — processes, tasks, approvals',   icon:GitBranch,    path:'/workflow',     color:'violet', stats:[{label:'Processes',val:'8'},{label:'Tasks',val:'10'}] },
  { name:'Notifications', description:'Notification System — templates, channels, delivery logs',      icon:Bell,         path:'/notifications',color:'violet', stats:[{label:'Templates',val:'9'},{label:'Logs',val:'8'}] },
  { name:'Audit Logs',    description:'Security Audit Trail — all system events and anomalies',        icon:ClipboardList,path:'/audit',        color:'violet', stats:[{label:'Events',val:'12'},{label:'Warnings',val:'3'}] },
];

export default function ITCategory() {
  return (
    <CategoryPage
      title="IT & Security"
      subtitle="Identity, access control, automation and compliance systems"
      icon={Shield}
      color="violet"
      modules={modules}
    />
  );
}
