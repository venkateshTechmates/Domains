import { DollarSign, PiggyBank, TrendingUp, FileBarChart, BarChart2, Landmark, Wallet } from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'Finance',         description:'Core accounts, transactions and invoices',                   icon:DollarSign,   path:'/finance',      color:'emerald', stats:[{label:'Accounts',val:'6'},{label:'Invoices',val:'8'}] },
  { name:'AMS',             description:'Asset Management — hardware, cloud, furniture tracking',     icon:Landmark,     path:'/ams',          color:'emerald', stats:[{label:'Assets',val:'12'},{label:'In Use',val:'10'}] },
  { name:'BFSI',            description:'Banking, Financial Services & Insurance — accounts, policies',icon:PiggyBank,   path:'/bfsi',         color:'emerald', stats:[{label:'Accounts',val:'8'},{label:'Policies',val:'6'}] },
  { name:'BMS',             description:'Budget Management — allocations, spending, expense tracking', icon:Wallet,       path:'/bms',          color:'emerald', stats:[{label:'Budgets',val:'8'},{label:'Over Budget',val:'1'}] },
  { name:'LMS Finance',     description:'Loan Management — active loans, repayment schedules',        icon:FileBarChart,  path:'/lms-finance',  color:'emerald', stats:[{label:'Loans',val:'10'},{label:'Active',val:'9'}] },
  { name:'LOS',             description:'Loan Origination System — applications, approvals, review',  icon:BarChart2,    path:'/los',          color:'emerald', stats:[{label:'Applications',val:'10'},{label:'Approved',val:'4'}] },
  { name:'PMS Finance',     description:'Portfolio Management — assets, holdings, returns',           icon:TrendingUp,   path:'/pms-finance',  color:'emerald', stats:[{label:'Portfolios',val:'8'},{label:'Total Value','val':'$18M'}] },
];

export default function FinanceCategory() {
  return (
    <CategoryPage
      title="Finance & Banking"
      subtitle="Financial management, loans, assets and portfolio systems"
      icon={DollarSign}
      color="emerald"
      modules={modules}
    />
  );
}
