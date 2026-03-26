import { ShoppingBag, LayoutList, CreditCard } from 'lucide-react';
import CategoryPage from '../../components/CategoryPage';

const modules = [
  { name:'PIM',             description:'Product Information Management — catalog, attributes, pricing', icon:LayoutList, path:'/pim',             color:'pink', stats:[{label:'Products',val:'7'},{label:'Published',val:'5'}] },
  { name:'Payment Gateway', description:'Payment processing — transactions, methods, refunds',           icon:CreditCard, path:'/payment-gateway',  color:'pink', stats:[{label:'Transactions',val:'9'},{label:'Completed',val:'7'}] },
];

export default function ECommerceCategory() {
  return (
    <CategoryPage
      title="E-Commerce"
      subtitle="Product catalogue management and payment processing modules"
      icon={ShoppingBag}
      color="pink"
      modules={modules}
    />
  );
}
