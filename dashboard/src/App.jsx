import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import HMS from './pages/HMS'
import HRMS from './pages/HRMS'
import CRM from './pages/CRM'
import ERP from './pages/ERP'
import IMS from './pages/IMS'
import Finance from './pages/Finance'
import LMS from './pages/LMS'
import CMS from './pages/CMS'
import OMS from './pages/OMS'
import WMS from './pages/WMS'
import IAM from './pages/IAM'
import Workflow from './pages/Workflow'
import Healthcare from './pages/Healthcare'
import Logistics from './pages/Logistics'
import ECommerce from './pages/ECommerce'
import Education from './pages/Education'
import AuditLogs from './pages/AuditLogs'
import Notifications from './pages/Notifications'
import SSO from './pages/SSO'

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hms" element={<HMS />} />
          <Route path="/hrms" element={<HRMS />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/erp" element={<ERP />} />
          <Route path="/ims" element={<IMS />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/lms" element={<LMS />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/oms" element={<OMS />} />
          <Route path="/wms" element={<WMS />} />
          <Route path="/iam" element={<IAM />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/ecommerce" element={<ECommerce />} />
          <Route path="/education" element={<Education />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/sso" element={<SSO />} />
        </Routes>
      </Layout>
    </AppProvider>
  )
}
