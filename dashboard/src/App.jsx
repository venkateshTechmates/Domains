import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'

// Core
import Dashboard from './pages/Dashboard'

// Category home pages
import BusinessCategory  from './pages/categories/BusinessCategory'
import FinanceCategory   from './pages/categories/FinanceCategory'
import HealthcareCategory from './pages/categories/HealthcareCategory'
import ITCategory        from './pages/categories/ITCategory'
import LogisticsCategory from './pages/categories/LogisticsCategory'
import ECommerceCategory from './pages/categories/ECommerceCategory'
import EducationCategory from './pages/categories/EducationCategory'

// Business modules
import HMS        from './pages/HMS'
import HRMS       from './pages/HRMS'
import CRM        from './pages/CRM'
import ERP        from './pages/ERP'
import IMS        from './pages/IMS'
import LMS        from './pages/LMS'
import CMS        from './pages/CMS'
import PMS        from './pages/PMS'
import TMS        from './pages/TMS'
import EMS        from './pages/EMS'

// Finance modules
import Finance    from './pages/Finance'
import AMS        from './pages/AMS'
import BFSI       from './pages/BFSI'
import BMS        from './pages/BMS'
import LMSFinance from './pages/LMSFinance'
import LOS        from './pages/LOS'
import PMSFinance from './pages/PMSFinance'

// Healthcare modules
import Healthcare from './pages/Healthcare'
import EHR        from './pages/EHR'
import EMR        from './pages/EMR'
import LIS        from './pages/LIS'
import PACS       from './pages/PACS'
import RIS        from './pages/RIS'

// IT & Security modules
import IAM           from './pages/IAM'
import SSO           from './pages/SSO'
import Workflow      from './pages/Workflow'
import Notifications from './pages/Notifications'
import AuditLogs     from './pages/AuditLogs'

// Logistics modules
import OMS        from './pages/OMS'
import WMS        from './pages/WMS'
import Logistics  from './pages/Logistics'
import FMS        from './pages/FMS'
import SCM        from './pages/SCM'

// E-Commerce modules
import ECommerce      from './pages/ECommerce'
import PIM            from './pages/PIM'
import PaymentGateway from './pages/PaymentGateway'

// Education modules
import Education from './pages/Education'
import EduEMS    from './pages/EduEMS'
import ExamMgmt  from './pages/ExamMgmt'
import SMS       from './pages/SMS'

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/"               element={<Dashboard />} />

          {/* Category home pages */}
          <Route path="/cat/business"   element={<BusinessCategory />} />
          <Route path="/cat/finance"    element={<FinanceCategory />} />
          <Route path="/cat/healthcare" element={<HealthcareCategory />} />
          <Route path="/cat/it"         element={<ITCategory />} />
          <Route path="/cat/logistics"  element={<LogisticsCategory />} />
          <Route path="/cat/ecommerce"  element={<ECommerceCategory />} />
          <Route path="/cat/education"  element={<EducationCategory />} />

          {/* Business modules */}
          <Route path="/hms"   element={<HMS />} />
          <Route path="/hrms"  element={<HRMS />} />
          <Route path="/crm"   element={<CRM />} />
          <Route path="/erp"   element={<ERP />} />
          <Route path="/ims"   element={<IMS />} />
          <Route path="/lms"   element={<LMS />} />
          <Route path="/cms"   element={<CMS />} />
          <Route path="/pms"   element={<PMS />} />
          <Route path="/tms"   element={<TMS />} />
          <Route path="/ems"   element={<EMS />} />

          {/* Finance modules */}
          <Route path="/finance"      element={<Finance />} />
          <Route path="/ams"          element={<AMS />} />
          <Route path="/bfsi"         element={<BFSI />} />
          <Route path="/bms"          element={<BMS />} />
          <Route path="/lms-finance"  element={<LMSFinance />} />
          <Route path="/los"          element={<LOS />} />
          <Route path="/pms-finance"  element={<PMSFinance />} />

          {/* Healthcare modules */}
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/ehr"        element={<EHR />} />
          <Route path="/emr"        element={<EMR />} />
          <Route path="/lis"        element={<LIS />} />
          <Route path="/pacs"       element={<PACS />} />
          <Route path="/ris"        element={<RIS />} />

          {/* IT & Security modules */}
          <Route path="/iam"           element={<IAM />} />
          <Route path="/sso"           element={<SSO />} />
          <Route path="/workflow"      element={<Workflow />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/audit"         element={<AuditLogs />} />

          {/* Logistics modules */}
          <Route path="/oms"      element={<OMS />} />
          <Route path="/wms"      element={<WMS />} />
          <Route path="/logistics"element={<Logistics />} />
          <Route path="/fms"      element={<FMS />} />
          <Route path="/scm"      element={<SCM />} />

          {/* E-Commerce modules */}
          <Route path="/ecommerce"      element={<ECommerce />} />
          <Route path="/pim"            element={<PIM />} />
          <Route path="/payment-gateway"element={<PaymentGateway />} />

          {/* Education modules */}
          <Route path="/education"      element={<Education />} />
          <Route path="/edu-ems"        element={<EduEMS />} />
          <Route path="/exam-management"element={<ExamMgmt />} />
          <Route path="/sms"            element={<SMS />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
