# PRD — Human Resource Management System (HRMS)

## 1. Product Overview

The **Human Resource Management System (HRMS)** is an enterprise-grade platform that manages the entire employee lifecycle — from recruitment and onboarding to payroll, performance management, and offboarding. It automates HR workflows, ensures compliance, and provides analytics for data-driven workforce decisions.

---

## 2. Goals & Objectives

- Automate end-to-end HR processes to reduce manual workload
- Provide accurate and timely payroll processing
- Enable self-service for employees and managers
- Centralize employee data with a single source of truth
- Support compliance with labor laws and tax regulations
- Deliver workforce analytics to leadership

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| HR Manager | Policy setup, approvals, reporting |
| Recruiter | Job postings, candidate management |
| Payroll Admin | Salary processing, tax, deductions |
| Department Manager | Team management, approvals, reviews |
| Employee | Self-service: leaves, payslips, requests |
| IT Admin | System access, integrations |
| Finance Team | Payroll cost reporting |
| CEO / Leadership | Workforce dashboards and analytics |

---

## 4. Scope

### In Scope
- Recruitment & Applicant Tracking
- Employee Onboarding & Offboarding
- Employee Information Management
- Attendance & Leave Management
- Payroll Processing
- Performance Management
- Training & Development
- Benefits Administration
- Compliance & Document Management
- Analytics & Reporting Dashboard

### Out of Scope
- ERP financial accounting integration (Phase 2)
- Third-party background verification (API integration Phase 2)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| HR Manager | All HR modules |
| Recruiter | Recruitment module only |
| Payroll Admin | Payroll, attendance, benefits |
| Department Manager | Team's attendance, leaves, performance |
| Employee | Self-service portal |

---

## 6. Functional Requirements

### 6.1 Recruitment & Applicant Tracking (ATS)
- Job requisition creation and approval workflow
- Job posting to careers page and job boards (LinkedIn, Naukri)
- Application tracking through pipeline stages (Applied → Screened → Interview → Offered → Hired)
- Interview scheduling with calendar integration
- Offer letter generation and e-signing
- Background verification initiation

### 6.2 Onboarding
- Digital onboarding checklist for new hires
- Document upload (ID proof, education, PAN, bank details)
- Account provisioning tasks (IT, email, access cards)
- Policy acknowledgment workflows
- Asset assignment tracking

### 6.3 Employee Information Management
- Comprehensive employee profiles (personal, emergency, work, education, bank)
- Organization chart
- Department, designation, and reporting hierarchy management
- Employee ID generation
- Document repository per employee

### 6.4 Attendance & Leave Management
- Biometric / RFID / app-based attendance capture
- Shift and roster management
- Leave types: casual, sick, earned, maternity, comp-off
- Leave application, approval, and balance tracking
- Holiday calendar management
- Overtime tracking

### 6.5 Payroll Processing
- Salary structure configuration (Basic, HRA, DA, allowances, deductions)
- Auto payroll calculation based on attendance
- Tax computation (TDS, EPF, ESI, PT)
- Payslip generation and distribution
- Bank transfer file generation (NEFT/RTGS)
- Full & Final settlement processing

### 6.6 Performance Management
- Goal setting and alignment (OKR / KPI)
- Mid-year and annual review cycles
- 360-degree feedback
- Performance ratings and normalization
- Increment and promotion workflows linked to appraisal

### 6.7 Training & Development
- Training needs analysis
- Course creation and assignment
- Training calendar and attendance
- Certification tracking
- Learning hours reporting

### 6.8 Benefits Administration
- Health insurance enrollment and tracking
- PF / Gratuity management
- Loan and advance requests
- Reimbursement claims (travel, medical)

### 6.9 Offboarding
- Resignation submission and approval
- NOC and clearance checklist
- Exit interview management
- Experience letter and relieving letter generation
- Full & Final calculation

### 6.10 Reports & Analytics
- Headcount and attrition reports
- Payroll cost analysis
- Attendance and leave reports
- Performance review summaries
- Diversity and compliance reports

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% uptime |
| Performance | Page load < 2 seconds |
| Scalability | Support 10,000+ employees |
| Security | RBAC, data encryption, SSO |
| Compliance | Labor laws, GDPR, PF/ESI/TDS |
| Audit | Full audit trail on all data changes |
| Integration | LDAP/AD, biometric devices, ERP, banks |

---

## 8. Key User Stories

- As an **employee**, I want to apply for leave online and track its approval status.
- As a **payroll admin**, I want the system to auto-calculate salary after attendance lock so payroll runs on time.
- As a **manager**, I want to set goals for my team and track performance progress.
- As an **HR manager**, I want to see real-time headcount and attrition dashboards.
- As a **recruiter**, I want to manage the entire hiring pipeline for a job position in one view.
- As an **employee**, I want to download my payslip from the self-service portal at any time.

---

## 9. Data Model (High-Level Entities)

```
Employee
  - employee_id (PK), emp_code, name, dob, gender, dept_id (FK), designation_id, manager_id

Department
  - dept_id (PK), name, head_id (FK)

Attendance
  - attendance_id (PK), employee_id (FK), date, check_in, check_out, hours_worked

Leave Request
  - leave_id (PK), employee_id (FK), leave_type, from_date, to_date, status, approver_id

Payroll
  - payroll_id (PK), employee_id (FK), month, year, gross, deductions, net_pay, status

Job Opening
  - job_id (PK), title, dept_id (FK), required_by, status

Candidate
  - candidate_id (PK), job_id (FK), name, email, stage, applied_date

Performance Review
  - review_id (PK), employee_id (FK), reviewer_id (FK), period, rating, comments
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/employees                     - Create employee
GET    /api/employees/{id}                - Get employee profile
PUT    /api/employees/{id}                - Update employee

POST   /api/leave-requests                - Apply for leave
PUT    /api/leave-requests/{id}/approve   - Approve leave
GET    /api/leave-requests?emp={id}       - Get leave history

GET    /api/attendance/{employee_id}      - Get attendance records
POST   /api/attendance/lock               - Lock attendance for payroll

POST   /api/payroll/run                   - Run payroll for a month
GET    /api/payroll/{employee_id}/payslip - Get payslip

POST   /api/jobs                          - Create job opening
POST   /api/candidates                    - Add candidate
PUT    /api/candidates/{id}/stage         - Move candidate stage

POST   /api/performance/reviews           - Submit performance review
GET    /api/reports/headcount             - Headcount analytics
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js / Vue.js |
| Backend | Java Spring Boot / Node.js |
| Database | PostgreSQL |
| Cache | Redis |
| Auth | SSO (SAML 2.0 / OAuth 2.0) |
| File Storage | AWS S3 |
| Email/SMS | SendGrid / Twilio |
| Deployment | Docker + Kubernetes |

---

## 12. Security Considerations

- Salary and personal data encrypted at rest (AES-256)
- Role-based access — employees cannot view peers' salaries
- Two-factor authentication for HR and Payroll admins
- Audit logs on all payroll and sensitive data changes
- GDPR compliance for employee data handling

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Payroll processing time | Reduced by 70% |
| Leave approval turnaround | < 24 hours |
| Employee self-service adoption | > 85% |
| Offer-to-join ratio | > 80% |
| Attrition tracking accuracy | 100% |
| Payroll error rate | < 0.5% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Employee master, attendance, leave |
| Phase 2 | Month 3–4 | Payroll, self-service portal |
| Phase 3 | Month 5–6 | Recruitment (ATS), onboarding |
| Phase 4 | Month 7–8 | Performance management |
| Phase 5 | Month 9 | Training, benefits, analytics |
| Go-Live | Month 10 | Full rollout and training |
