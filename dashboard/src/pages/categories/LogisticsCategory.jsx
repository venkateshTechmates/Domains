import { Truck, ShoppingCart, Warehouse, GitMerge } from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'OMS', description:'Order Management System — orders, products, customers',      icon:ShoppingCart,path:'/oms',color:'amber', stats:[{label:'Orders',val:'10'},{label:'Pending',val:'3'}] },
  { name:'WMS', description:'Warehouse Management — inventory locations and shipments',   icon:Warehouse,   path:'/wms',color:'amber', stats:[{label:'Warehouses',val:'6'},{label:'Shipments',val:'8'}] },
  { name:'FMS', description:'Fleet Management System — vehicles, drivers, maintenance',   icon:Truck,       path:'/fms',color:'amber', stats:[{label:'Vehicles',val:'7'},{label:'On Route',val:'3'}] },
  { name:'SCM', description:'Supply Chain Management — suppliers, contracts, logistics',  icon:GitMerge,    path:'/scm',color:'amber', stats:[{label:'Records',val:'6'},{label:'Active',val:'4'}] },
];

export default function LogisticsCategory() {
  return (
    <CategoryPage
      title="Logistics & Operations"
      subtitle="Order fulfilment, warehousing, fleet and supply chain management"
      icon={Truck}
      color="amber"
      modules={modules}
    />
  );
}
