// ─── HMS ─────────────────────────────────────────────────────────────────────
export const patients = [
  { id:'P001', name:'James Wilson',    age:52, gender:'Male',   bloodType:'O+',  admissionDate:'2024-03-01', status:'Admitted',   doctor:'Dr. Sarah Lee',    ward:'Cardiology',  diagnosis:'Hypertension',      phone:'555-0101' },
  { id:'P002', name:'Priya Sharma',    age:34, gender:'Female', bloodType:'A+',  admissionDate:'2024-03-03', status:'Outpatient', doctor:'Dr. Raj Patel',    ward:'OPD',         diagnosis:'Migraine',          phone:'555-0102' },
  { id:'P003', name:'Carlos Rivera',   age:67, gender:'Male',   bloodType:'B-',  admissionDate:'2024-03-05', status:'Admitted',   doctor:'Dr. Amy Chen',     ward:'Orthopedics', diagnosis:'Fracture – R Femur',phone:'555-0103' },
  { id:'P004', name:'Linda Johnson',   age:45, gender:'Female', bloodType:'AB+', admissionDate:'2024-03-06', status:'Critical',   doctor:'Dr. Mark Davis',   ward:'ICU',         diagnosis:'Septicemia',        phone:'555-0104' },
  { id:'P005', name:'Ahmed Hassan',    age:29, gender:'Male',   bloodType:'O-',  admissionDate:'2024-03-07', status:'Discharged', doctor:'Dr. Sarah Lee',    ward:'General',     diagnosis:'Appendicitis',      phone:'555-0105' },
  { id:'P006', name:'Sophie Turner',   age:38, gender:'Female', bloodType:'A-',  admissionDate:'2024-03-08', status:'Admitted',   doctor:'Dr. Raj Patel',    ward:'Maternity',   diagnosis:'Prenatal Care',     phone:'555-0106' },
  { id:'P007', name:'David Park',      age:60, gender:'Male',   bloodType:'B+',  admissionDate:'2024-03-09', status:'Outpatient', doctor:'Dr. Amy Chen',     ward:'OPD',         diagnosis:'Diabetes T2',       phone:'555-0107' },
  { id:'P008', name:'Fatima Al-Rashid',age:41, gender:'Female', bloodType:'O+',  admissionDate:'2024-03-10', status:'Admitted',   doctor:'Dr. Mark Davis',   ward:'Neurology',   diagnosis:'Epilepsy',          phone:'555-0108' },
  { id:'P009', name:'Tom Bradley',     age:55, gender:'Male',   bloodType:'A+',  admissionDate:'2024-03-11', status:'Discharged', doctor:'Dr. Sarah Lee',    ward:'Cardiology',  diagnosis:'Angina',            phone:'555-0109' },
  { id:'P010', name:'Maria Garcia',    age:27, gender:'Female', bloodType:'B+',  admissionDate:'2024-03-12', status:'Admitted',   doctor:'Dr. Raj Patel',    ward:'Pulmonology', diagnosis:'Asthma – Acute',    phone:'555-0110' },
]

export const doctors = [
  { id:'D001', name:'Dr. Sarah Lee',   specialty:'Cardiology',   department:'Cardiology',   phone:'555-1001', email:'s.lee@hospital.com',     status:'Active',   patients:24, experience:'12 yrs' },
  { id:'D002', name:'Dr. Raj Patel',   specialty:'General OPD',  department:'OPD',          phone:'555-1002', email:'r.patel@hospital.com',   status:'Active',   patients:31, experience:'8 yrs'  },
  { id:'D003', name:'Dr. Amy Chen',    specialty:'Orthopedics',  department:'Orthopedics',  phone:'555-1003', email:'a.chen@hospital.com',     status:'Active',   patients:18, experience:'15 yrs' },
  { id:'D004', name:'Dr. Mark Davis',  specialty:'Neurology',    department:'Neurology',    phone:'555-1004', email:'m.davis@hospital.com',    status:'On Leave', patients:0,  experience:'20 yrs' },
  { id:'D005', name:'Dr. Priya Nair',  specialty:'Gynecology',   department:'Maternity',    phone:'555-1005', email:'p.nair@hospital.com',     status:'Active',   patients:15, experience:'10 yrs' },
  { id:'D006', name:'Dr. John Smith',  specialty:'Pulmonology',  department:'Pulmonology',  phone:'555-1006', email:'j.smith@hospital.com',    status:'Active',   patients:12, experience:'9 yrs'  },
  { id:'D007', name:'Dr. Lisa Brown',  specialty:'Dermatology',  department:'Dermatology',  phone:'555-1007', email:'l.brown@hospital.com',    status:'Active',   patients:20, experience:'7 yrs'  },
  { id:'D008', name:'Dr. Kevin Zhao',  specialty:'Oncology',     department:'Oncology',     phone:'555-1008', email:'k.zhao@hospital.com',     status:'Active',   patients:9,  experience:'17 yrs' },
]

export const appointments = [
  { id:'A001', patientName:'James Wilson',    doctorName:'Dr. Sarah Lee',  date:'2024-03-14', time:'09:00', type:'Follow-up',    status:'Confirmed',  notes:'ECG required' },
  { id:'A002', patientName:'Priya Sharma',    doctorName:'Dr. Raj Patel',  date:'2024-03-14', time:'09:30', type:'Consultation', status:'Pending',    notes:'' },
  { id:'A003', patientName:'Sophie Turner',   doctorName:'Dr. Priya Nair', date:'2024-03-14', time:'10:00', type:'Routine',      status:'Confirmed',  notes:'28-week check' },
  { id:'A004', patientName:'David Park',      doctorName:'Dr. Raj Patel',  date:'2024-03-14', time:'11:00', type:'Follow-up',    status:'Confirmed',  notes:'Blood sugar review' },
  { id:'A005', patientName:'Tom Bradley',     doctorName:'Dr. Sarah Lee',  date:'2024-03-15', time:'09:00', type:'Discharge',    status:'Completed',  notes:'' },
  { id:'A006', patientName:'Ahmed Hassan',    doctorName:'Dr. Amy Chen',   date:'2024-03-15', time:'10:30', type:'Consultation', status:'Cancelled',  notes:'' },
  { id:'A007', patientName:'Fatima Al-Rashid',doctorName:'Dr. Mark Davis', date:'2024-03-15', time:'11:00', type:'Review',       status:'Confirmed',  notes:'MRI results' },
  { id:'A008', patientName:'Maria Garcia',    doctorName:'Dr. John Smith', date:'2024-03-16', time:'09:30', type:'Follow-up',    status:'Pending',    notes:'Spirometry test' },
]

// ─── HRMS ─────────────────────────────────────────────────────────────────────
export const employees = [
  { id:'E001', name:'Alice Morgan',   department:'Engineering',   role:'Senior Engineer',     email:'alice@corp.com',   phone:'555-2001', salary:'$95,000', joinDate:'2021-06-15', status:'Active'   },
  { id:'E002', name:'Bob Chen',       department:'Marketing',     role:'Marketing Manager',   email:'bob@corp.com',     phone:'555-2002', salary:'$78,000', joinDate:'2020-03-10', status:'Active'   },
  { id:'E003', name:'Carla Davis',    department:'Finance',       role:'Financial Analyst',   email:'carla@corp.com',   phone:'555-2003', salary:'$70,000', joinDate:'2022-01-20', status:'Active'   },
  { id:'E004', name:'Daniel Lee',     department:'HR',            role:'HR Specialist',       email:'daniel@corp.com',  phone:'555-2004', salary:'$62,000', joinDate:'2019-09-05', status:'Active'   },
  { id:'E005', name:'Eva Patel',      department:'Engineering',   role:'DevOps Engineer',     email:'eva@corp.com',     phone:'555-2005', salary:'$88,000', joinDate:'2022-07-18', status:'On Leave' },
  { id:'E006', name:'Frank Torres',   department:'Sales',         role:'Sales Executive',     email:'frank@corp.com',   phone:'555-2006', salary:'$68,000', joinDate:'2021-11-30', status:'Active'   },
  { id:'E007', name:'Grace Kim',      department:'Design',        role:'UI/UX Designer',      email:'grace@corp.com',   phone:'555-2007', salary:'$73,000', joinDate:'2023-02-14', status:'Active'   },
  { id:'E008', name:'Henry Brown',    department:'Engineering',   role:'Backend Engineer',    email:'henry@corp.com',   phone:'555-2008', salary:'$91,000', joinDate:'2020-08-22', status:'Active'   },
  { id:'E009', name:'Irene Walsh',    department:'Operations',    role:'Operations Analyst',  email:'irene@corp.com',   phone:'555-2009', salary:'$65,000', joinDate:'2021-04-11', status:'Active'   },
  { id:'E010', name:'Jack Owens',     department:'Marketing',     role:'Content Strategist',  email:'jack@corp.com',    phone:'555-2010', salary:'$60,000', joinDate:'2023-05-01', status:'Active'   },
  { id:'E011', name:'Karen Singh',    department:'Finance',       role:'Controller',          email:'karen@corp.com',   phone:'555-2011', salary:'$98,000', joinDate:'2018-12-03', status:'Active'   },
  { id:'E012', name:'Leo Nguyen',     department:'Sales',         role:'Account Manager',     email:'leo@corp.com',     phone:'555-2012', salary:'$72,000', joinDate:'2022-09-25', status:'Resigned' },
]

export const departments = [
  { id:'DEP01', name:'Engineering',  head:'Alice Morgan',  employees:28, budget:'$2,400,000', location:'Floor 3', status:'Active' },
  { id:'DEP02', name:'Marketing',    head:'Bob Chen',      employees:12, budget:'$980,000',   location:'Floor 2', status:'Active' },
  { id:'DEP03', name:'Finance',      head:'Karen Singh',   employees:8,  budget:'$650,000',   location:'Floor 4', status:'Active' },
  { id:'DEP04', name:'HR',           head:'Daniel Lee',    employees:6,  budget:'$420,000',   location:'Floor 1', status:'Active' },
  { id:'DEP05', name:'Sales',        head:'Frank Torres',  employees:20, budget:'$1,200,000', location:'Floor 2', status:'Active' },
  { id:'DEP06', name:'Design',       head:'Grace Kim',     employees:7,  budget:'$560,000',   location:'Floor 3', status:'Active' },
]

export const leaveRequests = [
  { id:'LR001', employee:'Eva Patel',    type:'Medical',   from:'2024-03-01', to:'2024-03-14', days:10, status:'Approved',  applied:'2024-02-28' },
  { id:'LR002', employee:'Frank Torres', type:'Annual',    from:'2024-03-20', to:'2024-03-22', days:3,  status:'Pending',   applied:'2024-03-10' },
  { id:'LR003', employee:'Alice Morgan', type:'Annual',    from:'2024-04-01', to:'2024-04-05', days:5,  status:'Pending',   applied:'2024-03-11' },
  { id:'LR004', employee:'Bob Chen',     type:'Casual',    from:'2024-03-15', to:'2024-03-15', days:1,  status:'Approved',  applied:'2024-03-12' },
  { id:'LR005', employee:'Grace Kim',    type:'Annual',    from:'2024-04-10', to:'2024-04-14', days:5,  status:'Rejected',  applied:'2024-03-09' },
  { id:'LR006', employee:'Henry Brown',  type:'Paternity', from:'2024-04-20', to:'2024-05-04', days:15, status:'Approved',  applied:'2024-03-01' },
  { id:'LR007', employee:'Carla Davis',  type:'Casual',    from:'2024-03-18', to:'2024-03-18', days:1,  status:'Pending',   applied:'2024-03-13' },
  { id:'LR008', employee:'Leo Nguyen',   type:'Annual',    from:'2024-04-05', to:'2024-04-12', days:8,  status:'Approved',  applied:'2024-03-05' },
]

// ─── CRM ─────────────────────────────────────────────────────────────────────
export const leads = [
  { id:'L001', name:'TechNova Inc.',       contact:'Ryan Blake',    email:'ryan@technova.com',   phone:'555-3001', source:'Website',    status:'Qualified',   value:'$45,000',  assignedTo:'Frank Torres' },
  { id:'L002', name:'GlobalShip Ltd.',     contact:'Amanda Frost',  email:'a.frost@globalship.com',phone:'555-3002',source:'Referral', status:'New',         value:'$120,000', assignedTo:'Leo Nguyen'   },
  { id:'L003', name:'MediCare Systems',    contact:'Dr. Sam West',  email:'s.west@medicare.org', phone:'555-3003', source:'LinkedIn',   status:'Contacted',   value:'$78,000',  assignedTo:'Frank Torres' },
  { id:'L004', name:'EduPrime Corp.',      contact:'Nina Patel',    email:'nina@eduprime.edu',   phone:'555-3004', source:'Event',      status:'Qualified',   value:'$33,000',  assignedTo:'Leo Nguyen'   },
  { id:'L005', name:'FinServe Group',      contact:'Tom Hill',      email:'t.hill@finserve.com', phone:'555-3005', source:'Website',    status:'New',         value:'$200,000', assignedTo:'Frank Torres' },
  { id:'L006', name:'RetailMax',           contact:'Lisa Cong',     email:'l.cong@retailmax.com',phone:'555-3006', source:'Cold Call',  status:'Contacted',   value:'$55,000',  assignedTo:'Frank Torres' },
  { id:'L007', name:'CloudOps Ltd.',       contact:'Jed Murray',    email:'jed@cloudops.io',     phone:'555-3007', source:'LinkedIn',   status:'Lost',        value:'$90,000',  assignedTo:'Leo Nguyen'   },
  { id:'L008', name:'AutoDrive Co.',       contact:'Cara Lind',     email:'cara@autodrive.com',  phone:'555-3008', source:'Referral',   status:'Qualified',   value:'$67,000',  assignedTo:'Frank Torres' },
  { id:'L009', name:'SmartBuild AG',       contact:'Hans Muller',   email:'h.muller@smartbuild.de',phone:'555-3009',source:'Website',  status:'Contacted',   value:'$310,000', assignedTo:'Leo Nguyen'   },
  { id:'L010', name:'AquaFarm Ltd.',       contact:'Rosa Chan',     email:'r.chan@aquafarm.com', phone:'555-3010', source:'Event',      status:'New',         value:'$28,000',  assignedTo:'Frank Torres' },
]

export const contacts = [
  { id:'C001', name:'Ryan Blake',     company:'TechNova Inc.',   email:'ryan@technova.com',     phone:'555-3001', status:'Active',   lastActivity:'2024-03-10' },
  { id:'C002', name:'Amanda Frost',   company:'GlobalShip Ltd.', email:'a.frost@globalship.com',phone:'555-3002', status:'Active',   lastActivity:'2024-03-09' },
  { id:'C003', name:'Dr. Sam West',   company:'MediCare Systems',email:'s.west@medicare.org',   phone:'555-3003', status:'Active',   lastActivity:'2024-03-07' },
  { id:'C004', name:'Nina Patel',     company:'EduPrime Corp.',  email:'nina@eduprime.edu',     phone:'555-3004', status:'Inactive', lastActivity:'2024-02-20' },
  { id:'C005', name:'Tom Hill',       company:'FinServe Group',  email:'t.hill@finserve.com',   phone:'555-3005', status:'Active',   lastActivity:'2024-03-12' },
  { id:'C006', name:'Lisa Cong',      company:'RetailMax',       email:'l.cong@retailmax.com',  phone:'555-3006', status:'Active',   lastActivity:'2024-03-11' },
  { id:'C007', name:'Cara Lind',      company:'AutoDrive Co.',   email:'cara@autodrive.com',    phone:'555-3008', status:'Active',   lastActivity:'2024-03-08' },
  { id:'C008', name:'Hans Muller',    company:'SmartBuild AG',   email:'h.muller@smartbuild.de',phone:'555-3009', status:'Active',   lastActivity:'2024-03-13' },
]

export const deals = [
  { id:'DL001', title:'TechNova Enterprise License',  contact:'Ryan Blake',   value:'$45,000',  stage:'Negotiation', probability:'70%', closeDate:'2024-04-15', owner:'Frank Torres' },
  { id:'DL002', title:'GlobalShip Platform Upgrade',  contact:'Amanda Frost', value:'$120,000', stage:'Proposal',    probability:'50%', closeDate:'2024-05-01', owner:'Leo Nguyen'   },
  { id:'DL003', title:'MediCare CRM Module',          contact:'Dr. Sam West', value:'$78,000',  stage:'Qualified',   probability:'40%', closeDate:'2024-05-20', owner:'Frank Torres' },
  { id:'DL004', title:'FinServe Analytics Suite',     contact:'Tom Hill',     value:'$200,000', stage:'Proposal',    probability:'60%', closeDate:'2024-06-01', owner:'Frank Torres' },
  { id:'DL005', title:'RetailMax Inventory Sync',     contact:'Lisa Cong',    value:'$55,000',  stage:'Won',         probability:'100%',closeDate:'2024-03-10', owner:'Frank Torres' },
  { id:'DL006', title:'AutoDrive Fleet Integration',  contact:'Cara Lind',    value:'$67,000',  stage:'Negotiation', probability:'75%', closeDate:'2024-04-30', owner:'Frank Torres' },
  { id:'DL007', title:'SmartBuild ERP Connect',       contact:'Hans Muller',  value:'$310,000', stage:'Proposal',    probability:'45%', closeDate:'2024-07-01', owner:'Leo Nguyen'   },
  { id:'DL008', title:'CloudOps SSO Package',         contact:'Jed Murray',   value:'$90,000',  stage:'Lost',        probability:'0%',  closeDate:'2024-03-05', owner:'Leo Nguyen'   },
]

// ─── IMS (Inventory) ─────────────────────────────────────────────────────────
export const inventoryItems = [
  { id:'I001', name:'Laptop Dell XPS 15',    sku:'DELL-XPS-001', category:'Electronics',    quantity:45,  reorderLevel:10, price:'$1,299', supplier:'Dell Inc.',       status:'In Stock'   },
  { id:'I002', name:'Office Chair Ergo Pro', sku:'FURN-CHR-001', category:'Furniture',      quantity:12,  reorderLevel:5,  price:'$349',   supplier:'Office Depot',    status:'In Stock'   },
  { id:'I003', name:'USB-C Hub 7-Port',      sku:'ACC-USB-001',  category:'Accessories',    quantity:3,   reorderLevel:15, price:'$79',    supplier:'Anker',           status:'Low Stock'  },
  { id:'I004', name:'A4 Paper Ream (500)',    sku:'STAT-PAP-001', category:'Stationery',     quantity:200, reorderLevel:50, price:'$12',    supplier:'Staples',         status:'In Stock'   },
  { id:'I005', name:'HP LaserJet Pro M404',  sku:'PRNT-HP-001',  category:'Electronics',    quantity:0,   reorderLevel:2,  price:'$399',   supplier:'HP Inc.',         status:'Out of Stock'},
  { id:'I006', name:'Standing Desk 60"',     sku:'FURN-DSK-001', category:'Furniture',      quantity:8,   reorderLevel:3,  price:'$699',   supplier:'Autonomous',      status:'In Stock'   },
  { id:'I007', name:'Webcam 4K Logitech',    sku:'ACC-CAM-001',  category:'Accessories',    quantity:28,  reorderLevel:10, price:'$129',   supplier:'Logitech',        status:'In Stock'   },
  { id:'I008', name:'Notebook A5 Pack (5)',  sku:'STAT-NTB-001', category:'Stationery',     quantity:4,   reorderLevel:20, price:'$18',    supplier:'Moleskine',       status:'Low Stock'  },
  { id:'I009', name:'Monitor 27" 4K UHD',   sku:'DISP-MON-001', category:'Electronics',    quantity:15,  reorderLevel:5,  price:'$549',   supplier:'LG Electronics',  status:'In Stock'   },
  { id:'I010', name:'Keyboard Mechanical',   sku:'ACC-KBD-001',  category:'Accessories',    quantity:22,  reorderLevel:10, price:'$149',   supplier:'Logitech',        status:'In Stock'   },
  { id:'I011', name:'Whiteboard 48"x36"',   sku:'EQUP-WB-001',  category:'Equipment',      quantity:6,   reorderLevel:2,  price:'$89',    supplier:'MasterVision',    status:'In Stock'   },
  { id:'I012', name:'HDMI Cable 2m',         sku:'ACC-HDMI-001', category:'Accessories',    quantity:55,  reorderLevel:20, price:'$19',    supplier:'AmazonBasics',    status:'In Stock'   },
]

export const purchaseOrders = [
  { id:'PO001', supplier:'Dell Inc.',      items:'Laptop Dell XPS 15 (x10)',   total:'$12,990', status:'Approved',   date:'2024-03-01', deliveryDate:'2024-03-15' },
  { id:'PO002', supplier:'Anker',          items:'USB-C Hub 7-Port (x50)',      total:'$3,950',  status:'Pending',    date:'2024-03-08', deliveryDate:'2024-03-20' },
  { id:'PO003', supplier:'Logitech',       items:'Webcam 4K (x20), Keyboard (x15)', total:'$4,805', status:'Shipped', date:'2024-03-05', deliveryDate:'2024-03-14' },
  { id:'PO004', supplier:'HP Inc.',        items:'LaserJet Pro M404 (x5)',      total:'$1,995',  status:'Delivered',  date:'2024-02-20', deliveryDate:'2024-03-01' },
  { id:'PO005', supplier:'Office Depot',   items:'Ergo Chair (x10)',            total:'$3,490',  status:'Pending',    date:'2024-03-10', deliveryDate:'2024-03-25' },
  { id:'PO006', supplier:'Staples',        items:'A4 Paper (x100 reams)',       total:'$1,200',  status:'Approved',   date:'2024-03-09', deliveryDate:'2024-03-18' },
  { id:'PO007', supplier:'LG Electronics', items:'Monitor 27" 4K (x5)',         total:'$2,745',  status:'Delivered',  date:'2024-02-25', deliveryDate:'2024-03-08' },
]

// ─── FINANCE ─────────────────────────────────────────────────────────────────
export const accounts = [
  { id:'ACC01', name:'Primary Checking',    type:'Checking',  balance:'$248,720.50', currency:'USD', bank:'Chase',       status:'Active' },
  { id:'ACC02', name:'Operations Savings',  type:'Savings',   balance:'$125,000.00', currency:'USD', bank:'Chase',       status:'Active' },
  { id:'ACC03', name:'Payroll Account',     type:'Checking',  balance:'$89,450.00',  currency:'USD', bank:'Wells Fargo', status:'Active' },
  { id:'ACC04', name:'EUR Reserve',         type:'Savings',   balance:'€45,000.00',  currency:'EUR', bank:'Citibank',    status:'Active' },
  { id:'ACC05', name:'Investment Portfolio',type:'Investment', balance:'$580,250.00', currency:'USD', bank:'Fidelity',    status:'Active' },
  { id:'ACC06', name:'Petty Cash',          type:'Cash',      balance:'$2,400.00',   currency:'USD', bank:'—',           status:'Active' },
]

export const transactions = [
  { id:'TX001', date:'2024-03-13', description:'AWS Cloud Services',      type:'Expense',  amount:'-$3,200',  account:'Primary Checking',  category:'IT',       status:'Completed' },
  { id:'TX002', date:'2024-03-13', description:'Client Payment – TechNova',type:'Income',  amount:'+$45,000', account:'Primary Checking',  category:'Revenue',  status:'Completed' },
  { id:'TX003', date:'2024-03-12', description:'Payroll – March W2',       type:'Expense',  amount:'-$82,500', account:'Payroll Account',   category:'Payroll',  status:'Completed' },
  { id:'TX004', date:'2024-03-12', description:'Office Supplies – Staples', type:'Expense', amount:'-$1,200',  account:'Primary Checking',  category:'Office',   status:'Completed' },
  { id:'TX005', date:'2024-03-11', description:'Client Payment – RetailMax',type:'Income',  amount:'+$55,000', account:'Primary Checking',  category:'Revenue',  status:'Completed' },
  { id:'TX006', date:'2024-03-10', description:'Google Ads Campaign',       type:'Expense', amount:'-$4,800',  account:'Primary Checking',  category:'Marketing',status:'Completed' },
  { id:'TX007', date:'2024-03-10', description:'Software License – Figma',  type:'Expense', amount:'-$540',    account:'Primary Checking',  category:'IT',       status:'Completed' },
  { id:'TX008', date:'2024-03-09', description:'Dividend Income',           type:'Income',  amount:'+$1,850',  account:'Investment Portfolio',category:'Interest',status:'Completed' },
  { id:'TX009', date:'2024-03-08', description:'Insurance Premium – Q1',    type:'Expense', amount:'-$6,200',  account:'Operations Savings', category:'Insurance',status:'Completed' },
  { id:'TX010', date:'2024-03-07', description:'Laptop Purchase – Dell',    type:'Expense', amount:'-$12,990', account:'Primary Checking',  category:'Equipment',status:'Completed' },
  { id:'TX011', date:'2024-03-06', description:'Client Payment – MediCare', type:'Income',  amount:'+$78,000', account:'Primary Checking',  category:'Revenue',  status:'Pending'   },
  { id:'TX012', date:'2024-03-05', description:'Rent – March',              type:'Expense', amount:'-$18,500', account:'Primary Checking',  category:'Rent',     status:'Completed' },
]

export const invoices = [
  { id:'INV001', customer:'TechNova Inc.',  amount:'$45,000', issueDate:'2024-03-01', dueDate:'2024-03-31', status:'Paid'    },
  { id:'INV002', customer:'GlobalShip Ltd.',amount:'$28,500', issueDate:'2024-03-05', dueDate:'2024-04-05', status:'Pending' },
  { id:'INV003', customer:'MediCare Sys.',  amount:'$78,000', issueDate:'2024-03-06', dueDate:'2024-04-06', status:'Pending' },
  { id:'INV004', customer:'RetailMax',      amount:'$55,000', issueDate:'2024-02-28', dueDate:'2024-03-28', status:'Paid'    },
  { id:'INV005', customer:'EduPrime Corp.', amount:'$33,000', issueDate:'2024-03-08', dueDate:'2024-04-08', status:'Draft'   },
  { id:'INV006', customer:'AutoDrive Co.',  amount:'$67,000', issueDate:'2024-03-10', dueDate:'2024-04-10', status:'Pending' },
  { id:'INV007', customer:'CloudOps Ltd.',  amount:'$90,000', issueDate:'2024-02-10', dueDate:'2024-03-10', status:'Overdue' },
  { id:'INV008', customer:'SmartBuild AG',  amount:'$310,000',issueDate:'2024-03-12', dueDate:'2024-06-12', status:'Pending' },
]

// ─── LMS (Learning) ───────────────────────────────────────────────────────────
export const courses = [
  { id:'CRS01', title:'React Advanced Patterns',        instructor:'Alice Morgan',  category:'Engineering',  enrolled:128, completed:64,  rating:'4.8', duration:'12h', status:'Published' },
  { id:'CRS02', title:'Data Analysis with Python',      instructor:'Carla Davis',   category:'Data',         enrolled:204, completed:112, rating:'4.6', duration:'18h', status:'Published' },
  { id:'CRS03', title:'Leadership Essentials',          instructor:'Daniel Lee',    category:'Management',   enrolled:89,  completed:55,  rating:'4.9', duration:'8h',  status:'Published' },
  { id:'CRS04', title:'Digital Marketing Fundamentals', instructor:'Bob Chen',      category:'Marketing',    enrolled:156, completed:78,  rating:'4.5', duration:'10h', status:'Published' },
  { id:'CRS05', title:'Financial Modeling',             instructor:'Karen Singh',   category:'Finance',      enrolled:67,  completed:30,  rating:'4.7', duration:'15h', status:'Published' },
  { id:'CRS06', title:'UX Design Principles',           instructor:'Grace Kim',     category:'Design',       enrolled:93,  completed:40,  rating:'4.8', duration:'14h', status:'Published' },
  { id:'CRS07', title:'Cloud Architecture AWS',         instructor:'Eva Patel',     category:'Engineering',  enrolled:110, completed:0,   rating:'—',   duration:'20h', status:'Draft'     },
  { id:'CRS08', title:'Agile Project Management',       instructor:'Irene Walsh',   category:'Management',   enrolled:145, completed:98,  rating:'4.6', duration:'6h',  status:'Published' },
]

export const learners = [
  { id:'LRN01', name:'Oliver Grant',  email:'olivier@corp.com',   enrolled:3, completed:2, progress:'67%', status:'Active'   },
  { id:'LRN02', name:'Zara Khan',     email:'zara@corp.com',      enrolled:2, completed:1, progress:'50%', status:'Active'   },
  { id:'LRN03', name:'Marco Polo',    email:'marco@corp.com',     enrolled:4, completed:3, progress:'75%', status:'Active'   },
  { id:'LRN04', name:'Aisha Bakr',    email:'aisha@corp.com',     enrolled:1, completed:0, progress:'30%', status:'Active'   },
  { id:'LRN05', name:'Tom Hanks Jr.', email:'tomj@corp.com',      enrolled:2, completed:2, progress:'100%',status:'Active'   },
  { id:'LRN06', name:'Mei Lin',       email:'mei@corp.com',       enrolled:3, completed:1, progress:'45%', status:'Active'   },
  { id:'LRN07', name:'Raj Kumar',     email:'raj.k@corp.com',     enrolled:0, completed:0, progress:'0%',  status:'Inactive' },
  { id:'LRN08', name:'Sandra Miles',  email:'sandra@corp.com',    enrolled:5, completed:4, progress:'90%', status:'Active'   },
]

// ─── CMS ─────────────────────────────────────────────────────────────────────
export const cmsPages = [
  { id:'PG001', title:'Homepage',                slug:'/',              status:'Published', author:'Grace Kim',   created:'2024-01-15', modified:'2024-03-10', views:'12,430' },
  { id:'PG002', title:'About Us',               slug:'/about',         status:'Published', author:'Bob Chen',    created:'2024-01-16', modified:'2024-02-20', views:'3,210'  },
  { id:'PG003', title:'Products & Pricing',     slug:'/pricing',       status:'Published', author:'Frank Torres',created:'2024-01-20', modified:'2024-03-12', views:'8,750'  },
  { id:'PG004', title:'Blog – AI Trends 2024',  slug:'/blog/ai-2024',  status:'Published', author:'Bob Chen',    created:'2024-03-01', modified:'2024-03-05', views:'5,640'  },
  { id:'PG005', title:'Case Studies',           slug:'/case-studies',  status:'Draft',     author:'Jack Owens',  created:'2024-03-08', modified:'2024-03-08', views:'0'      },
  { id:'PG006', title:'Contact',                slug:'/contact',       status:'Published', author:'Grace Kim',   created:'2024-01-17', modified:'2024-02-01', views:'2,980'  },
  { id:'PG007', title:'Privacy Policy',         slug:'/privacy',       status:'Published', author:'Daniel Lee',  created:'2024-01-18', modified:'2024-03-01', views:'890'    },
  { id:'PG008', title:'Product Launch – Q2',   slug:'/launch-q2',     status:'Draft',     author:'Bob Chen',    created:'2024-03-13', modified:'2024-03-13', views:'0'      },
]

export const media = [
  { id:'M001', name:'hero-banner.jpg',    type:'Image', size:'2.4 MB', dimensions:'1920x1080', uploadedBy:'Grace Kim',   uploaded:'2024-02-10' },
  { id:'M002', name:'product-demo.mp4',  type:'Video', size:'45 MB',  dimensions:'1080p',      uploadedBy:'Alice Morgan', uploaded:'2024-02-15' },
  { id:'M003', name:'brand-logo.svg',    type:'SVG',   size:'24 KB',  dimensions:'640x160',    uploadedBy:'Grace Kim',   uploaded:'2024-01-25' },
  { id:'M004', name:'team-photo.jpg',    type:'Image', size:'3.1 MB', dimensions:'2400x1600',  uploadedBy:'Bob Chen',    uploaded:'2024-03-01' },
  { id:'M005', name:'case-study-pdf.pdf',type:'PDF',   size:'1.8 MB', dimensions:'—',          uploadedBy:'Jack Owens',  uploaded:'2024-03-08' },
  { id:'M006', name:'icon-pack.zip',     type:'ZIP',   size:'5.2 MB', dimensions:'—',          uploadedBy:'Grace Kim',   uploaded:'2024-03-09' },
]

export const cmsCategories = [
  { id:'CAT01', name:'Blog',         slug:'blog',          posts:24, status:'Active' },
  { id:'CAT02', name:'Products',     slug:'products',      posts:8,  status:'Active' },
  { id:'CAT03', name:'Case Studies', slug:'case-studies',  posts:5,  status:'Active' },
  { id:'CAT04', name:'News',         slug:'news',          posts:12, status:'Active' },
  { id:'CAT05', name:'Tutorials',    slug:'tutorials',     posts:18, status:'Active' },
]

// ─── OMS ─────────────────────────────────────────────────────────────────────
export const orders = [
  { id:'ORD001', customer:'RetailMax Corp.',   items:5, total:'$4,350',  status:'Delivered',   date:'2024-03-01', shipping:'FedEx',  trackingNo:'FX123456' },
  { id:'ORD002', customer:'TechNova Inc.',     items:3, total:'$2,890',  status:'Shipped',     date:'2024-03-05', shipping:'UPS',    trackingNo:'UP234567' },
  { id:'ORD003', customer:'Office World',      items:12,total:'$1,230',  status:'Processing',  date:'2024-03-08', shipping:'DHL',    trackingNo:'—'        },
  { id:'ORD004', customer:'AutoDrive Co.',     items:2, total:'$8,100',  status:'Processing',  date:'2024-03-10', shipping:'FedEx',  trackingNo:'—'        },
  { id:'ORD005', customer:'EduPrime Corp.',    items:8, total:'$3,640',  status:'Cancelled',   date:'2024-03-03', shipping:'—',      trackingNo:'—'        },
  { id:'ORD006', customer:'SmartBuild AG',     items:20,total:'$12,500', status:'Shipped',     date:'2024-03-11', shipping:'DHL',    trackingNo:'DH345678' },
  { id:'ORD007', customer:'MediCare Systems',  items:6, total:'$6,780',  status:'Delivered',   date:'2024-02-28', shipping:'UPS',    trackingNo:'UP456789' },
  { id:'ORD008', customer:'GlobalShip Ltd.',   items:15,total:'$9,250',  status:'Pending',     date:'2024-03-13', shipping:'—',      trackingNo:'—'        },
  { id:'ORD009', customer:'AquaFarm Ltd.',     items:4, total:'$1,870',  status:'Returned',    date:'2024-03-06', shipping:'FedEx',  trackingNo:'FX567890' },
  { id:'ORD010', customer:'CloudOps Ltd.',     items:1, total:'$15,000', status:'Processing',  date:'2024-03-12', shipping:'FedEx',  trackingNo:'—'        },
]

export const products = [
  { id:'PRD001', name:'Enterprise Suite',      sku:'SW-ENT-001', category:'Software',    price:'$2,499', stock:999, status:'Active'   },
  { id:'PRD002', name:'Pro Subscription',      sku:'SW-PRO-001', category:'Software',    price:'$499',   stock:999, status:'Active'   },
  { id:'PRD003', name:'Hardware Bundle A',     sku:'HW-BND-001', category:'Hardware',    price:'$1,299', stock:42,  status:'Active'   },
  { id:'PRD004', name:'Support Package 1yr',   sku:'SVC-SUP-001',category:'Service',     price:'$999',   stock:999, status:'Active'   },
  { id:'PRD005', name:'Analytics Add-on',      sku:'SW-ANA-001', category:'Software',    price:'$249',   stock:999, status:'Active'   },
  { id:'PRD006', name:'Hardware Bundle B',     sku:'HW-BND-002', category:'Hardware',    price:'$2,199', stock:8,   status:'Low Stock'},
  { id:'PRD007', name:'Legacy Connector Kit',  sku:'HW-LGY-001', category:'Hardware',    price:'$399',   stock:0,   status:'Out of Stock'},
  { id:'PRD008', name:'Training Package',      sku:'SVC-TRN-001',category:'Service',     price:'$1,500', stock:999, status:'Active'   },
  { id:'PRD009', name:'Data Migration Service',sku:'SVC-MIG-001',category:'Service',     price:'$3,500', stock:50,  status:'Active'   },
  { id:'PRD010', name:'API Access – Premium',  sku:'SW-API-001', category:'Software',    price:'$199',   stock:999, status:'Active'   },
]

export const customers = [
  { id:'CUS001', name:'RetailMax Corp.',   email:'billing@retailmax.com',   phone:'555-4001', orders:18, spent:'$84,200', since:'2022-01-15', status:'Active'   },
  { id:'CUS002', name:'TechNova Inc.',     email:'ops@technova.com',        phone:'555-4002', orders:12, spent:'$52,300', since:'2022-06-20', status:'Active'   },
  { id:'CUS003', name:'Office World',      email:'orders@officeworld.com',  phone:'555-4003', orders:31, spent:'$23,100', since:'2021-11-05', status:'Active'   },
  { id:'CUS004', name:'AutoDrive Co.',     email:'purchase@autodrive.com',  phone:'555-4004', orders:6,  spent:'$38,900', since:'2023-03-18', status:'Active'   },
  { id:'CUS005', name:'EduPrime Corp.',    email:'admin@eduprime.edu',      phone:'555-4005', orders:9,  spent:'$21,700', since:'2022-09-30', status:'Inactive' },
  { id:'CUS006', name:'GlobalShip Ltd.',   email:'logistics@globalship.com',phone:'555-4006', orders:22, spent:'$98,500', since:'2021-07-12', status:'Active'   },
  { id:'CUS007', name:'MediCare Systems',  email:'orders@medicare.org',     phone:'555-4007', orders:15, spent:'$69,200', since:'2022-04-28', status:'Active'   },
  { id:'CUS008', name:'SmartBuild AG',     email:'procurement@smartbuild.de',phone:'555-4008',orders:7, spent:'$44,800', since:'2023-08-15', status:'Active'   },
]

// ─── WMS ─────────────────────────────────────────────────────────────────────
export const warehouses = [
  { id:'WH001', name:'Central Hub – Chicago',  location:'Chicago, IL',     capacity:'50,000 sqft', used:'78%', manager:'Jake Liu',    status:'Active' },
  { id:'WH002', name:'East Coast – Newark',    location:'Newark, NJ',      capacity:'30,000 sqft', used:'62%', manager:'Sara Ng',     status:'Active' },
  { id:'WH003', name:'West Coast – LA',        location:'Los Angeles, CA',  capacity:'40,000 sqft', used:'91%', manager:'Mike Torres', status:'Active' },
  { id:'WH004', name:'South – Dallas',         location:'Dallas, TX',       capacity:'25,000 sqft', used:'45%', manager:'Amy Clark',   status:'Active' },
  { id:'WH005', name:'North – Minneapolis',    location:'Minneapolis, MN',  capacity:'20,000 sqft', used:'33%', manager:'Chris Dahl',  status:'Active' },
  { id:'WH006', name:'EU Hub – Frankfurt',     location:'Frankfurt, DE',    capacity:'35,000 sqft', used:'55%', manager:'Hans Weiss',  status:'Active' },
]

export const shipments = [
  { id:'SH001', from:'WH001 Chicago',   to:'RetailMax Corp. NY',    carrier:'FedEx', weight:'340 kg', status:'Delivered',  departure:'2024-03-01', arrival:'2024-03-03' },
  { id:'SH002', from:'WH002 Newark',    to:'TechNova Inc. Boston',  carrier:'UPS',   weight:'120 kg', status:'Shipped',    departure:'2024-03-05', arrival:'2024-03-07' },
  { id:'SH003', from:'WH003 LA',        to:'AutoDrive Co. Phoenix', carrier:'DHL',   weight:'780 kg', status:'In Transit', departure:'2024-03-10', arrival:'2024-03-14' },
  { id:'SH004', from:'WH001 Chicago',   to:'MediCare Sys. Denver',  carrier:'FedEx', weight:'95 kg',  status:'Delivered',  departure:'2024-02-28', arrival:'2024-03-02' },
  { id:'SH005', from:'WH006 Frankfurt', to:'SmartBuild AG Berlin',  carrier:'DHL',   weight:'1200 kg',status:'Shipped',    departure:'2024-03-11', arrival:'2024-03-15' },
  { id:'SH006', from:'WH004 Dallas',    to:'CloudOps Dallas Hub',   carrier:'FedEx', weight:'60 kg',  status:'Processing', departure:'—',          arrival:'—'          },
  { id:'SH007', from:'WH005 Minneapolis',to:'EduPrime Corp. MN',   carrier:'UPS',   weight:'220 kg', status:'Processing', departure:'—',          arrival:'—'          },
  { id:'SH008', from:'WH002 Newark',    to:'Office World NJ',       carrier:'UPS',   weight:'450 kg', status:'Returned',   departure:'2024-03-06', arrival:'2024-03-08' },
]

// ─── IAM ─────────────────────────────────────────────────────────────────────
export const iamUsers = [
  { id:'U001', name:'Alice Morgan',   email:'alice@corp.com',   role:'Developer',  department:'Engineering', status:'Active',   lastLogin:'2024-03-13 09:12', mfa:'Enabled'  },
  { id:'U002', name:'Bob Chen',       email:'bob@corp.com',     role:'Admin',      department:'Marketing',   status:'Active',   lastLogin:'2024-03-13 08:45', mfa:'Enabled'  },
  { id:'U003', name:'Carla Davis',    email:'carla@corp.com',   role:'Analyst',    department:'Finance',     status:'Active',   lastLogin:'2024-03-12 16:33', mfa:'Enabled'  },
  { id:'U004', name:'Daniel Lee',     email:'daniel@corp.com',  role:'HR Manager', department:'HR',          status:'Active',   lastLogin:'2024-03-13 10:02', mfa:'Disabled' },
  { id:'U005', name:'Eva Patel',      email:'eva@corp.com',     role:'DevOps',     department:'Engineering', status:'Disabled', lastLogin:'2024-03-01 11:00', mfa:'Enabled'  },
  { id:'U006', name:'Frank Torres',   email:'frank@corp.com',   role:'Sales Rep',  department:'Sales',       status:'Active',   lastLogin:'2024-03-13 07:55', mfa:'Disabled' },
  { id:'U007', name:'Grace Kim',      email:'grace@corp.com',   role:'Designer',   department:'Design',      status:'Active',   lastLogin:'2024-03-12 14:20', mfa:'Enabled'  },
  { id:'U008', name:'Henry Brown',    email:'henry@corp.com',   role:'Developer',  department:'Engineering', status:'Active',   lastLogin:'2024-03-13 09:50', mfa:'Enabled'  },
  { id:'U009', name:'Irene Walsh',    email:'irene@corp.com',   role:'Analyst',    department:'Operations',  status:'Active',   lastLogin:'2024-03-11 15:45', mfa:'Disabled' },
  { id:'U010', name:'Super Admin',    email:'superadmin@corp.com',role:'Super Admin',department:'IT',       status:'Active',   lastLogin:'2024-03-13 11:00', mfa:'Enabled'  },
]

export const roles = [
  { id:'R001', name:'Super Admin',  permissions:'Full Access',                     users:1,  description:'Complete system access' },
  { id:'R002', name:'Admin',        permissions:'Read, Write, Delete, Config',      users:3,  description:'Administrative access' },
  { id:'R003', name:'Developer',    permissions:'Read, Write, Deploy',             users:12, description:'Development team access' },
  { id:'R004', name:'Analyst',      permissions:'Read, Export, Reports',           users:8,  description:'Data analyst read access' },
  { id:'R005', name:'Sales Rep',    permissions:'Read CRM, Write Deals',           users:20, description:'CRM and sales module access' },
  { id:'R006', name:'HR Manager',   permissions:'Read/Write HRMS, Reports',        users:4,  description:'HR system full access' },
]

export const sessions = [
  { id:'S001', user:'Alice Morgan',   device:'Chrome/Win',   ip:'192.168.1.101', location:'Chicago, US',  started:'2024-03-13 09:12', status:'Active'  },
  { id:'S002', user:'Bob Chen',       device:'Safari/macOS', ip:'192.168.1.102', location:'New York, US', started:'2024-03-13 08:45', status:'Active'  },
  { id:'S003', user:'Carla Davis',    device:'Firefox/Win',  ip:'192.168.1.103', location:'Chicago, US',  started:'2024-03-12 16:33', status:'Expired' },
  { id:'S004', user:'Henry Brown',    device:'Chrome/macOS', ip:'192.168.1.108', location:'Chicago, US',  started:'2024-03-13 09:50', status:'Active'  },
  { id:'S005', user:'Frank Torres',   device:'Chrome/Win',   ip:'203.0.113.50',  location:'Miami, US',    started:'2024-03-13 07:55', status:'Active'  },
  { id:'S006', user:'Grace Kim',      device:'Safari/iOS',   ip:'192.168.1.107', location:'Chicago, US',  started:'2024-03-12 14:20', status:'Expired' },
  { id:'S007', user:'Super Admin',    device:'Chrome/Win',   ip:'10.0.0.1',      location:'Chicago, US',  started:'2024-03-13 11:00', status:'Active'  },
]

// ─── Workflow ─────────────────────────────────────────────────────────────────
export const workflowProcesses = [
  { id:'WP001', name:'Purchase Order Approval',   type:'Approval',   instances:45, completed:38, avgTime:'4h',  status:'Active'   },
  { id:'WP002', name:'Employee Onboarding',        type:'Automation', instances:12, completed:10, avgTime:'3d',  status:'Active'   },
  { id:'WP003', name:'Leave Request Approval',     type:'Approval',   instances:24, completed:20, avgTime:'6h',  status:'Active'   },
  { id:'WP004', name:'Invoice Processing',         type:'Automation', instances:88, completed:82, avgTime:'2h',  status:'Active'   },
  { id:'WP005', name:'IT Access Request',          type:'Approval',   instances:31, completed:28, avgTime:'8h',  status:'Active'   },
  { id:'WP006', name:'Contract Review',            type:'Approval',   instances:9,  completed:5,  avgTime:'2d',  status:'Active'   },
  { id:'WP007', name:'Expense Reimbursement',      type:'Approval',   instances:62, completed:55, avgTime:'1d',  status:'Active'   },
  { id:'WP008', name:'Product Change Request',     type:'Approval',   instances:18, completed:12, avgTime:'3d',  status:'Inactive' },
]

export const workflowTasks = [
  { id:'WT001', title:'Approve PO #PO002 – Anker',       assignee:'Karen Singh',  process:'Purchase Order Approval', status:'Pending',     priority:'High',   due:'2024-03-14' },
  { id:'WT002', title:'Onboard: Jack Owens – IT Setup',  assignee:'Eva Patel',    process:'Employee Onboarding',     status:'In Progress', priority:'Medium', due:'2024-03-16' },
  { id:'WT003', title:'Approve: Frank Torres Annual Leave',assignee:'Bob Chen',   process:'Leave Request Approval',  status:'Pending',     priority:'Low',    due:'2024-03-15' },
  { id:'WT004', title:'Process Invoice INV003',           assignee:'Carla Davis',  process:'Invoice Processing',      status:'Completed',   priority:'High',   due:'2024-03-13' },
  { id:'WT005', title:'Grant CRM Access – Irene Walsh',  assignee:'Daniel Lee',   process:'IT Access Request',       status:'Pending',     priority:'Medium', due:'2024-03-14' },
  { id:'WT006', title:'Review Contract – SmartBuild AG', assignee:'Karen Singh',  process:'Contract Review',         status:'In Progress', priority:'High',   due:'2024-03-20' },
  { id:'WT007', title:'Approve Expense: Alice – $340',   assignee:'Alice Morgan', process:'Expense Reimbursement',   status:'Completed',   priority:'Low',    due:'2024-03-12' },
  { id:'WT008', title:'Approve PO #PO005 – Office Depot',assignee:'Karen Singh',  process:'Purchase Order Approval', status:'Pending',     priority:'Medium', due:'2024-03-15' },
  { id:'WT009', title:'Approve PO #PO006 – Staples',     assignee:'Karen Singh',  process:'Purchase Order Approval', status:'Pending',     priority:'Low',    due:'2024-03-18' },
  { id:'WT010', title:'Onboard: Zara Khan – HR Profile', assignee:'Daniel Lee',   process:'Employee Onboarding',     status:'Completed',   priority:'Medium', due:'2024-03-10' },
]

// ─── Healthcare (EMR/LIS/Radiology) ──────────────────────────────────────────
export const emrRecords = [
  { id:'EMR001', patient:'James Wilson',    dob:'1972-04-12', provider:'Dr. Sarah Lee', visitDate:'2024-03-01', diagnosis:'Hypertension – Essential', icd:'I10',    medications:'Amlodipine 5mg', status:'Active' },
  { id:'EMR002', patient:'Priya Sharma',    dob:'1990-07-22', provider:'Dr. Raj Patel', visitDate:'2024-03-03', diagnosis:'Migraine without aura',    icd:'G43.009', medications:'Sumatriptan 50mg',status:'Active' },
  { id:'EMR003', patient:'Carlos Rivera',   dob:'1957-11-05', provider:'Dr. Amy Chen',  visitDate:'2024-03-05', diagnosis:'Femur Fracture',           icd:'S72.001', medications:'Oxycodone 5mg',   status:'Active' },
  { id:'EMR004', patient:'Linda Johnson',   dob:'1979-02-18', provider:'Dr. Mark Davis',visitDate:'2024-03-06', diagnosis:'Septicemia – Strep',       icd:'A40.0',   medications:'IV Penicillin',    status:'Critical'},
  { id:'EMR005', patient:'Ahmed Hassan',    dob:'1995-09-30', provider:'Dr. Sarah Lee', visitDate:'2024-03-07', diagnosis:'Acute Appendicitis',       icd:'K35.89',  medications:'Post-op ABX',      status:'Resolved'},
  { id:'EMR006', patient:'Sophie Turner',   dob:'1986-06-14', provider:'Dr. Priya Nair',visitDate:'2024-03-08', diagnosis:'Prenatal Care – 28W',      icd:'Z34.20',  medications:'Prenatal vitamins',status:'Active' },
  { id:'EMR007', patient:'David Park',      dob:'1964-01-28', provider:'Dr. Raj Patel', visitDate:'2024-03-09', diagnosis:'Type 2 Diabetes',          icd:'E11.9',   medications:'Metformin 500mg',  status:'Active' },
  { id:'EMR008', patient:'Maria Garcia',    dob:'1997-03-17', provider:'Dr. John Smith',visitDate:'2024-03-10', diagnosis:'Acute Asthma Exacerbation',icd:'J45.901', medications:'Salbutamol inhaler',status:'Active'},
]

export const labTests = [
  { id:'LT001', patient:'James Wilson',   test:'Lipid Panel',          orderedBy:'Dr. Sarah Lee',  ordered:'2024-03-01', status:'Completed', result:'LDL: 142 mg/dL (High)' },
  { id:'LT002', patient:'Linda Johnson',  test:'Blood Culture',         orderedBy:'Dr. Mark Davis', ordered:'2024-03-06', status:'Completed', result:'Strep pyogenes +ve' },
  { id:'LT003', patient:'David Park',     test:'HbA1c',                orderedBy:'Dr. Raj Patel',  ordered:'2024-03-09', status:'Completed', result:'7.8% (Above target)' },
  { id:'LT004', patient:'Carlos Rivera',  test:'Full Blood Count',      orderedBy:'Dr. Amy Chen',   ordered:'2024-03-05', status:'Completed', result:'Hb: 11.2 g/dL (Low)' },
  { id:'LT005', patient:'Maria Garcia',   test:'Spirometry',            orderedBy:'Dr. John Smith', ordered:'2024-03-10', status:'Pending',   result:'—' },
  { id:'LT006', patient:'Priya Sharma',   test:'MRI – Brain',           orderedBy:'Dr. Raj Patel',  ordered:'2024-03-03', status:'Completed', result:'No acute intracranial findings' },
  { id:'LT007', patient:'Sophie Turner',  test:'Glucose Tolerance Test',orderedBy:'Dr. Priya Nair', ordered:'2024-03-08', status:'Completed', result:'Within normal limits' },
  { id:'LT008', patient:'Fatima Al-Rashid',test:'EEG',                  orderedBy:'Dr. Mark Davis', ordered:'2024-03-10', status:'Pending',   result:'—' },
]

export const radiologyStudies = [
  { id:'RS001', patient:'James Wilson',   study:'Chest X-Ray',     modality:'XR',  orderedBy:'Dr. Sarah Lee',  date:'2024-03-01', status:'Reported',  radiologist:'Dr. Helen Fox' },
  { id:'RS002', patient:'Carlos Rivera',  study:'X-Ray Right Femur',modality:'XR', orderedBy:'Dr. Amy Chen',   date:'2024-03-05', status:'Reported',  radiologist:'Dr. Helen Fox' },
  { id:'RS003', patient:'Priya Sharma',   study:'MRI Brain',        modality:'MRI',orderedBy:'Dr. Raj Patel',  date:'2024-03-04', status:'Reported',  radiologist:'Dr. Sam Gold'  },
  { id:'RS004', patient:'Fatima Al-Rashid',study:'MRI Brain',       modality:'MRI',orderedBy:'Dr. Mark Davis', date:'2024-03-11', status:'Pending',   radiologist:'—' },
  { id:'RS005', patient:'David Park',     study:'Abdominal Ultrasound',modality:'US',orderedBy:'Dr. Raj Patel',date:'2024-03-09', status:'In Progress',radiologist:'Dr. Sam Gold' },
  { id:'RS006', patient:'Maria Garcia',   study:'CT Chest',         modality:'CT', orderedBy:'Dr. John Smith', date:'2024-03-10', status:'Reported',  radiologist:'Dr. Helen Fox' },
]

// ─── Logistics ────────────────────────────────────────────────────────────────
export const routes = [
  { id:'RT001', name:'Chicago – New York Express',   origin:'Chicago, IL',     destination:'New York, NY',   distance:'790 mi', vehicles:3, frequency:'Daily',  status:'Active' },
  { id:'RT002', name:'LA – San Francisco Coastal',   origin:'Los Angeles, CA', destination:'San Francisco, CA',distance:'382 mi',vehicles:2,frequency:'Daily',  status:'Active' },
  { id:'RT003', name:'Dallas – Houston',             origin:'Dallas, TX',      destination:'Houston, TX',    distance:'240 mi', vehicles:4, frequency:'Daily',  status:'Active' },
  { id:'RT004', name:'Newark – Boston',              origin:'Newark, NJ',      destination:'Boston, MA',     distance:'215 mi', vehicles:2, frequency:'Daily',  status:'Active' },
  { id:'RT005', name:'Chicago – Detroit',            origin:'Chicago, IL',     destination:'Detroit, MI',    distance:'280 mi', vehicles:1, frequency:'Weekly', status:'Inactive'},
  { id:'RT006', name:'Miami – Orlando',              origin:'Miami, FL',       destination:'Orlando, FL',    distance:'235 mi', vehicles:2, frequency:'Daily',  status:'Active' },
]

export const fleet = [
  { id:'FL001', vehicle:'Truck – Volvo FH',     plateNo:'IL-3421-TX', type:'Heavy',    driver:'Jim Stone',    capacity:'25 tons', mileage:'124,500 mi',status:'Active'      },
  { id:'FL002', vehicle:'Truck – Freightliner', plateNo:'NJ-8832-FL', type:'Heavy',    driver:'Dana Cruz',    capacity:'22 tons', mileage:'98,200 mi', status:'Active'      },
  { id:'FL003', vehicle:'Van – Ford Transit',   plateNo:'CA-1234-VN', type:'Light',    driver:'Mia Lin',      capacity:'2 tons',  mileage:'45,600 mi', status:'Active'      },
  { id:'FL004', vehicle:'Truck – Kenworth T680',plateNo:'TX-7651-KW', type:'Heavy',    driver:'Ron Hayes',    capacity:'30 tons', mileage:'210,000 mi',status:'Maintenance' },
  { id:'FL005', vehicle:'Van – Mercedes Sprinter',plateNo:'MN-4520-SP',type:'Light',   driver:'Sven Koch',    capacity:'3 tons',  mileage:'32,100 mi', status:'Active'      },
  { id:'FL006', vehicle:'Truck – Peterbilt 579', plateNo:'FL-6340-PT', type:'Heavy',   driver:'Carlos R.',    capacity:'28 tons', mileage:'88,900 mi', status:'Active'      },
  { id:'FL007', vehicle:'Van – Citroen Jumper',  plateNo:'DE-9010-CJ', type:'Light',   driver:'Hans Bauer',   capacity:'2.5 tons',mileage:'61,200 mi', status:'Active'      },
]

export const supplyChain = [
  { id:'SC001', supplier:'Dell Inc.',       category:'Electronics', country:'USA',        leadTime:'5 days',  reliability:'98%', status:'Active',   lastOrder:'2024-03-01' },
  { id:'SC002', supplier:'Foxconn Ltd.',    category:'Electronics', country:'Taiwan',     leadTime:'14 days', reliability:'94%', status:'Active',   lastOrder:'2024-02-20' },
  { id:'SC003', supplier:'BASF SE',         category:'Chemicals',   country:'Germany',    leadTime:'10 days', reliability:'96%', status:'Active',   lastOrder:'2024-03-05' },
  { id:'SC004', supplier:'Steel Corp USA',  category:'Raw Materials',country:'USA',       leadTime:'7 days',  reliability:'91%', status:'Active',   lastOrder:'2024-03-08' },
  { id:'SC005', supplier:'Textile World',   category:'Textiles',    country:'India',      leadTime:'20 days', reliability:'88%', status:'Review',   lastOrder:'2024-02-10' },
  { id:'SC006', supplier:'PackMaster Inc.', category:'Packaging',   country:'USA',        leadTime:'3 days',  reliability:'99%', status:'Active',   lastOrder:'2024-03-12' },
]

// ─── ECommerce (PIM + Payments) ───────────────────────────────────────────────
export const pimProducts = [
  { id:'PIM001', sku:'SW-ENT-001', name:'Enterprise Suite',  category:'Software',  brand:'Domains',  variants:3,  images:4, completeness:'95%', status:'Published' },
  { id:'PIM002', sku:'SW-PRO-001', name:'Pro Subscription',  category:'Software',  brand:'Domains',  variants:1,  images:2, completeness:'90%', status:'Published' },
  { id:'PIM003', sku:'HW-BND-001', name:'Hardware Bundle A', category:'Hardware',  brand:'Domains',  variants:2,  images:6, completeness:'100%',status:'Published' },
  { id:'PIM004', sku:'HW-BND-002', name:'Hardware Bundle B', category:'Hardware',  brand:'Domains',  variants:2,  images:6, completeness:'88%', status:'Published' },
  { id:'PIM005', sku:'SVC-SUP-001',name:'Support Package',   category:'Service',   brand:'Domains',  variants:2,  images:1, completeness:'75%', status:'Draft'     },
  { id:'PIM006', sku:'SW-ANA-001', name:'Analytics Add-on',  category:'Software',  brand:'Domains',  variants:1,  images:3, completeness:'92%', status:'Published' },
  { id:'PIM007', sku:'SVC-TRN-001',name:'Training Package',  category:'Service',   brand:'Domains',  variants:3,  images:2, completeness:'80%', status:'Published' },
]

export const paymentTransactions = [
  { id:'PT001', orderId:'ORD001', customer:'RetailMax Corp.',  amount:'$4,350',  method:'Credit Card', provider:'Stripe',    status:'Success', date:'2024-03-01', reference:'ch_001' },
  { id:'PT002', orderId:'ORD002', customer:'TechNova Inc.',    amount:'$2,890',  method:'ACH',         provider:'Stripe',    status:'Success', date:'2024-03-05', reference:'ch_002' },
  { id:'PT003', orderId:'ORD003', customer:'Office World',     amount:'$1,230',  method:'Credit Card', provider:'Stripe',    status:'Pending', date:'2024-03-08', reference:'ch_003' },
  { id:'PT004', orderId:'ORD004', customer:'AutoDrive Co.',    amount:'$8,100',  method:'Wire Transfer',provider:'Bank',     status:'Success', date:'2024-03-10', reference:'WT_004' },
  { id:'PT005', orderId:'ORD005', customer:'EduPrime Corp.',   amount:'$3,640',  method:'Credit Card', provider:'Stripe',    status:'Refunded',date:'2024-03-03', reference:'re_005' },
  { id:'PT006', orderId:'ORD006', customer:'SmartBuild AG',    amount:'$12,500', method:'Wire Transfer',provider:'Bank',     status:'Pending', date:'2024-03-11', reference:'WT_006' },
  { id:'PT007', orderId:'ORD007', customer:'MediCare Systems', amount:'$6,780',  method:'ACH',         provider:'Stripe',    status:'Success', date:'2024-02-28', reference:'ch_007' },
  { id:'PT008', orderId:'ORD009', customer:'AquaFarm Ltd.',    amount:'$1,870',  method:'Credit Card', provider:'Stripe',    status:'Refunded',date:'2024-03-06', reference:'re_008' },
  { id:'PT009', orderId:'ORD010', customer:'CloudOps Ltd.',    amount:'$15,000', method:'Wire Transfer',provider:'Bank',     status:'Pending', date:'2024-03-12', reference:'WT_009' },
]

// ─── Education ────────────────────────────────────────────────────────────────
export const students = [
  { id:'STU001', name:'Oliver Grant',   grade:'10', section:'A', rollNo:'1001', email:'oliver@school.edu',  phone:'555-6001', feeStatus:'Paid',    attendance:'92%', status:'Active'   },
  { id:'STU002', name:'Zara Khan',      grade:'11', section:'B', rollNo:'1101', email:'zara@school.edu',    phone:'555-6002', feeStatus:'Paid',    attendance:'88%', status:'Active'   },
  { id:'STU003', name:'Marco Polo Jr.', grade:'10', section:'A', rollNo:'1002', email:'marco@school.edu',   phone:'555-6003', feeStatus:'Pending', attendance:'79%', status:'Active'   },
  { id:'STU004', name:'Aisha Bakr',     grade:'12', section:'C', rollNo:'1201', email:'aisha@school.edu',   phone:'555-6004', feeStatus:'Paid',    attendance:'95%', status:'Active'   },
  { id:'STU005', name:'Tom Bradley Jr.',grade:'9',  section:'B', rollNo:'0901', email:'tomb@school.edu',    phone:'555-6005', feeStatus:'Overdue', attendance:'71%', status:'Active'   },
  { id:'STU006', name:'Mei Lin',        grade:'11', section:'A', rollNo:'1102', email:'mei@school.edu',     phone:'555-6006', feeStatus:'Paid',    attendance:'97%', status:'Active'   },
  { id:'STU007', name:'Raj Kumar',      grade:'10', section:'C', rollNo:'1003', email:'raj@school.edu',     phone:'555-6007', feeStatus:'Paid',    attendance:'85%', status:'Inactive' },
  { id:'STU008', name:'Sandra Miles',   grade:'12', section:'A', rollNo:'1202', email:'sandra@school.edu',  phone:'555-6008', feeStatus:'Paid',    attendance:'93%', status:'Active'   },
  { id:'STU009', name:'Pedro Silva',    grade:'9',  section:'A', rollNo:'0902', email:'pedro@school.edu',   phone:'555-6009', feeStatus:'Paid',    attendance:'89%', status:'Active'   },
  { id:'STU010', name:'Fatimah Noor',   grade:'11', section:'C', rollNo:'1103', email:'fatimah@school.edu', phone:'555-6010', feeStatus:'Pending', attendance:'82%', status:'Active'   },
]

export const exams = [
  { id:'EX001', name:'Mathematics – Mid Term',    class:'Grade 10', date:'2024-03-20', duration:'2h', totalMarks:100, venue:'Hall A', status:'Scheduled' },
  { id:'EX002', name:'Science – Mid Term',        class:'Grade 10', date:'2024-03-21', duration:'2h', totalMarks:100, venue:'Hall A', status:'Scheduled' },
  { id:'EX003', name:'English Literature – Final',class:'Grade 12', date:'2024-03-22', duration:'3h', totalMarks:100, venue:'Hall B', status:'Scheduled' },
  { id:'EX004', name:'Computer Science – Quiz',   class:'Grade 11', date:'2024-03-15', duration:'1h', totalMarks:50,  venue:'Lab 1',  status:'Completed' },
  { id:'EX005', name:'History – Mid Term',        class:'Grade 11', date:'2024-03-18', duration:'2h', totalMarks:100, venue:'Hall B', status:'Scheduled' },
  { id:'EX006', name:'Physics – Final Exam',      class:'Grade 12', date:'2024-04-05', duration:'3h', totalMarks:100, venue:'Hall A', status:'Scheduled' },
  { id:'EX007', name:'Mathematics – Final',       class:'Grade 9',  date:'2024-04-08', duration:'2h', totalMarks:100, venue:'Hall A', status:'Scheduled' },
]

export const educationCourses = [
  { id:'EC001', name:'Advanced Mathematics',    class:'Grade 10', teacher:'Mr. Robert Singh',  students:35, hours:'5/week', textbook:'Calculus Vol.2', status:'Active' },
  { id:'EC002', name:'Physics',                 class:'Grade 12', teacher:'Mrs. Anna Kowalski',students:28, hours:'4/week', textbook:'Halliday Physics',status:'Active' },
  { id:'EC003', name:'English Literature',      class:'Grade 12', teacher:'Ms. Lucy Turner',   students:30, hours:'4/week', textbook:'CBSE English',    status:'Active' },
  { id:'EC004', name:'Computer Science',        class:'Grade 11', teacher:'Mr. Neil Gupta',    students:25, hours:'3/week', textbook:'CS with Python',  status:'Active' },
  { id:'EC005', name:'History',                 class:'Grade 11', teacher:'Mrs. Pam Wilson',   students:32, hours:'3/week', textbook:'World History',   status:'Active' },
  { id:'EC006', name:'Biology',                 class:'Grade 10', teacher:'Dr. Kim Carter',    students:31, hours:'4/week', textbook:'NCERT Biology',   status:'Active' },
]

// ─── Audit Logs ───────────────────────────────────────────────────────────────
export const auditLogs = [
  { id:'AL001', user:'Super Admin',  action:'User Created',        resource:'User: Bob Chen',         ip:'10.0.0.1',      module:'IAM',      severity:'Info',    timestamp:'2024-03-13 11:05:32' },
  { id:'AL002', user:'Alice Morgan', action:'Login Success',        resource:'Auth Session',           ip:'192.168.1.101', module:'IAM',      severity:'Info',    timestamp:'2024-03-13 09:12:14' },
  { id:'AL003', user:'Unknown',      action:'Login Failed',         resource:'Email: hacker@evil.com', ip:'203.0.113.99',  module:'IAM',      severity:'Warning', timestamp:'2024-03-13 09:10:02' },
  { id:'AL004', user:'Carla Davis',  action:'Invoice Updated',      resource:'INV003',                 ip:'192.168.1.103', module:'Finance',  severity:'Info',    timestamp:'2024-03-12 16:45:01' },
  { id:'AL005', user:'Karen Singh',  action:'PO Approved',          resource:'PO001',                  ip:'192.168.1.111', module:'Finance',  severity:'Info',    timestamp:'2024-03-13 10:30:55' },
  { id:'AL006', user:'Bob Chen',     action:'Role Assigned',        resource:'User: Irene Walsh → Analyst',ip:'192.168.1.102',module:'IAM',  severity:'Info',    timestamp:'2024-03-13 09:55:40' },
  { id:'AL007', user:'Frank Torres', action:'Deal Stage Changed',   resource:'DL005 → Won',            ip:'203.0.113.50',  module:'CRM',      severity:'Info',    timestamp:'2024-03-10 14:22:18' },
  { id:'AL008', user:'Super Admin',  action:'Config Changed',       resource:'MFA Policy – All Users', ip:'10.0.0.1',      module:'IAM',      severity:'Warning', timestamp:'2024-03-12 08:00:00' },
  { id:'AL009', user:'Unknown',      action:'Brute Force Attempt',  resource:'Login Endpoint',         ip:'185.220.101.5', module:'IAM',      severity:'Error',   timestamp:'2024-03-11 02:33:47' },
  { id:'AL010', user:'Eva Patel',    action:'User Disabled',        resource:'User: Eva Patel',        ip:'10.0.0.1',      module:'IAM',      severity:'Info',    timestamp:'2024-03-01 09:00:00' },
  { id:'AL011', user:'Daniel Lee',   action:'Leave Approved',       resource:'LR006 – Henry Brown',    ip:'192.168.1.104', module:'HRMS',     severity:'Info',    timestamp:'2024-03-01 11:15:22' },
  { id:'AL012', user:'Alice Morgan', action:'File Exported',        resource:'Inventory Report Q1',    ip:'192.168.1.101', module:'IMS',      severity:'Info',    timestamp:'2024-03-12 15:30:00' },
]

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationTemplates = [
  { id:'NT001', name:'Welcome Email',          channel:'Email', trigger:'User Registration', status:'Active',   lastUsed:'2024-03-13' },
  { id:'NT002', name:'Password Reset OTP',     channel:'SMS',   trigger:'Password Reset',    status:'Active',   lastUsed:'2024-03-13' },
  { id:'NT003', name:'Order Confirmed',        channel:'Email', trigger:'Order Created',     status:'Active',   lastUsed:'2024-03-13' },
  { id:'NT004', name:'Shipment Dispatched',    channel:'Email', trigger:'Shipment Shipped',  status:'Active',   lastUsed:'2024-03-11' },
  { id:'NT005', name:'Invoice Due Reminder',   channel:'Email', trigger:'Invoice Due -3d',   status:'Active',   lastUsed:'2024-03-10' },
  { id:'NT006', name:'Leave Request Alert',    channel:'Push',  trigger:'Leave Requested',   status:'Active',   lastUsed:'2024-03-10' },
  { id:'NT007', name:'Low Stock Alert',        channel:'Email', trigger:'Stock < Reorder',   status:'Active',   lastUsed:'2024-03-08' },
  { id:'NT008', name:'Login Anomaly Alert',    channel:'Email', trigger:'Anomalous Login',   status:'Active',   lastUsed:'2024-03-13' },
  { id:'NT009', name:'Appointment Reminder',  channel:'SMS',   trigger:'Appointment -24h',  status:'Draft',    lastUsed:'—'          },
]

export const notificationLogs = [
  { id:'NL001', template:'Welcome Email',     recipient:'jack@corp.com',          channel:'Email', status:'Delivered', sentAt:'2024-03-13 09:00:01' },
  { id:'NL002', template:'Password Reset OTP',recipient:'+1-555-2013',            channel:'SMS',   status:'Delivered', sentAt:'2024-03-13 09:10:08' },
  { id:'NL003', template:'Order Confirmed',   recipient:'orders@officeworld.com', channel:'Email', status:'Delivered', sentAt:'2024-03-08 14:01:22' },
  { id:'NL004', template:'Login Anomaly Alert',recipient:'super@corp.com',        channel:'Email', status:'Delivered', sentAt:'2024-03-11 02:34:00' },
  { id:'NL005', template:'Low Stock Alert',   recipient:'warehouse@corp.com',     channel:'Email', status:'Delivered', sentAt:'2024-03-08 08:30:00' },
  { id:'NL006', template:'Invoice Due Reminder',recipient:'billing@cloudops.io',  channel:'Email', status:'Failed',    sentAt:'2024-03-10 09:00:00' },
  { id:'NL007', template:'Shipment Dispatched',recipient:'logistics@technova.com',channel:'Email', status:'Delivered', sentAt:'2024-03-05 18:30:01' },
  { id:'NL008', template:'Leave Request Alert',recipient:'bob@corp.com',          channel:'Push',  status:'Delivered', sentAt:'2024-03-10 14:02:35' },
]

// ─── SSO ──────────────────────────────────────────────────────────────────────
export const ssoApps = [
  { id:'SA001', name:'Google Workspace', protocol:'SAML 2.0', clientId:'gws.domains.app',  users:98, status:'Active',   lastSync:'2024-03-13' },
  { id:'SA002', name:'Slack',            protocol:'OIDC',      clientId:'slack.domains.app', users:87, status:'Active',   lastSync:'2024-03-13' },
  { id:'SA003', name:'GitHub',           protocol:'OIDC',      clientId:'gh.domains.app',    users:45, status:'Active',   lastSync:'2024-03-12' },
  { id:'SA004', name:'Jira Software',    protocol:'SAML 2.0', clientId:'jira.domains.app',  users:62, status:'Active',   lastSync:'2024-03-13' },
  { id:'SA005', name:'Salesforce',       protocol:'SAML 2.0', clientId:'sf.domains.app',    users:28, status:'Active',   lastSync:'2024-03-11' },
  { id:'SA006', name:'AWS Console',      protocol:'SAML 2.0', clientId:'aws.domains.app',   users:15, status:'Active',   lastSync:'2024-03-10' },
  { id:'SA007', name:'Internal HRM App', protocol:'OIDC',     clientId:'hrm.domains.app',   users:110,status:'Active',   lastSync:'2024-03-13' },
  { id:'SA008', name:'Legacy ERP Portal',protocol:'SAML 2.0', clientId:'erp.domains.app',   users:55, status:'Inactive', lastSync:'2024-02-01' },
]

export const ssoSessions = [
  { id:'SS001', user:'Alice Morgan',  app:'GitHub',           loginTime:'2024-03-13 09:12', ip:'192.168.1.101', mfa:'TOTP', status:'Active' },
  { id:'SS002', user:'Bob Chen',      app:'Slack',            loginTime:'2024-03-13 08:45', ip:'192.168.1.102', mfa:'Push', status:'Active' },
  { id:'SS003', user:'Grace Kim',     app:'Jira Software',    loginTime:'2024-03-13 09:20', ip:'192.168.1.107', mfa:'TOTP', status:'Active' },
  { id:'SS004', user:'Frank Torres',  app:'Salesforce',       loginTime:'2024-03-13 07:55', ip:'203.0.113.50',  mfa:'None', status:'Active' },
  { id:'SS005', user:'Carla Davis',   app:'Google Workspace', loginTime:'2024-03-12 16:33', ip:'192.168.1.103', mfa:'TOTP', status:'Expired'},
  { id:'SS006', user:'Henry Brown',   app:'AWS Console',      loginTime:'2024-03-13 09:50', ip:'192.168.1.108', mfa:'TOTP', status:'Active' },
  { id:'SS007', user:'Super Admin',   app:'Internal HRM App', loginTime:'2024-03-13 11:00', ip:'10.0.0.1',      mfa:'FIDO2',status:'Active' },
]

// ─── Chart data helpers ────────────────────────────────────────────────────────
export const monthlyRevenue = [
  { month:'Oct', revenue:182000 },
  { month:'Nov', revenue:195000 },
  { month:'Dec', revenue:220000 },
  { month:'Jan', revenue:198000 },
  { month:'Feb', revenue:215000 },
  { month:'Mar', revenue:241000 },
]

export const deptHeadcount = [
  { dept:'Eng',   count:28 },
  { dept:'Sales', count:20 },
  { dept:'Mktg',  count:12 },
  { dept:'Finance',count:8 },
  { dept:'HR',    count:6  },
  { dept:'Design',count:7  },
]

export const orderStatus = [
  { name:'Delivered',  value:38 },
  { name:'Shipped',    value:22 },
  { name:'Processing', value:28 },
  { name:'Cancelled',  value:7  },
  { name:'Returned',   value:5  },
]

export const attendanceTrend = [
  { month:'Oct', rate:91 },
  { month:'Nov', rate:89 },
  { month:'Dec', rate:87 },
  { month:'Jan', rate:90 },
  { month:'Feb', rate:92 },
  { month:'Mar', rate:93 },
]
