# PRD — Hospital Management System (HMS)

## 1. Product Overview

The **Hospital Management System (HMS)** is an integrated software platform that digitizes and streamlines all administrative, clinical, and financial operations of a hospital or clinic. It connects departments — from OPD registration and inpatient management to billing, pharmacy, and lab — into a single unified system.

---

## 2. Goals & Objectives

- Eliminate paper-based workflows across all hospital departments
- Reduce patient wait times through digital appointment and queue management
- Ensure accurate, real-time billing and insurance claim processing
- Provide centralized patient records accessible to authorized staff
- Meet regulatory compliance (HIPAA, HL7, FHIR) standards
- Improve operational efficiency and reporting for hospital administration

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Hospital Administrator | System owner, approves configuration and reports |
| Doctors / Physicians | Clinical workflows, prescriptions, notes |
| Nurses | Patient care, vitals, ward management |
| Receptionist / Front Desk | Patient registration, appointments |
| Billing Staff | Invoice generation, payments, insurance |
| Lab / Radiology Technician | Test management, report uploads |
| Pharmacist | Dispense medicines, inventory |
| IT Administrator | System setup, user management |
| Patients | Appointment booking, reports (portal) |

---

## 4. Scope

### In Scope
- Patient Registration & OPD Management
- Appointment Scheduling
- Inpatient (IPD) Management
- Electronic Medical Records (EMR)
- Pharmacy Management
- Laboratory & Radiology Management
- Billing & Insurance
- Operations Theater (OT) Management
- Staff & HR Management
- Reports & Analytics Dashboard

### Out of Scope
- Telemedicine (separate module)
- Medical equipment procurement
- External insurance carrier integrations (Phase 2)

---

## 5. User Roles & Permissions

| Role | Access Level |
|---|---|
| Super Admin | Full system access |
| Doctor | Patient records, prescriptions, lab orders |
| Nurse | Patient vitals, ward notes |
| Receptionist | Registration, appointments, billing view |
| Billing Staff | Invoices, payments, insurance claims |
| Lab Technician | Test requests, results upload |
| Pharmacist | Dispense, inventory view |
| Patient (Portal) | Appointments, reports, bills |

---

## 6. Functional Requirements

### 6.1 Patient Registration & OPD
- Register new patients with unique Patient ID (MRN)
- Capture demographics: name, age, gender, address, contact, insurance
- Walk-in and online appointment booking
- Token/queue number generation
- OPD visit tracking with consultation fee collection

### 6.2 Appointment Scheduling
- View doctor availability and slots
- Book, reschedule, cancel appointments
- SMS/email reminders to patients
- Multi-doctor, multi-location support

### 6.3 Inpatient (IPD) Management
- Admit patients to wards/rooms
- Bed allocation and availability view
- Transfer between wards
- Daily nursing notes and vitals charting
- Discharge summary generation

### 6.4 Electronic Medical Records (EMR)
- Patient history, allergies, chronic conditions
- Consultation notes (SOAP format)
- Prescription creation and management
- Lab order generation from consultation
- Diagnosis coding (ICD-10)

### 6.5 Pharmacy Management
- Prescription fulfilment against doctor orders
- Drug inventory tracking (batch, expiry)
- Stock alerts and reorder management
- Billing integration

### 6.6 Laboratory Management
- Test request from doctor/OPD
- Sample collection tracking
- Result entry and approval workflow
- Auto-delivery of results to EMR and patient portal

### 6.7 Radiology Management
- Radiology request creation
- PACS integration for image storage
- Report upload and attachment to patient record

### 6.8 Billing & Finance
- Auto-generate invoice from services rendered
- Package/tariff setup (service charges)
- Insurance claims filing and tracking
- Partial payments, advance collection
- Receipt printing and PDF export

### 6.9 OT Management
- OT scheduling and booking
- Pre-op, intra-op, post-op notes
- Anesthesia records
- OT inventory consumption

### 6.10 Reports & Analytics
- Patient census reports
- Revenue and collection reports
- Doctor-wise consultation summary
- Bed occupancy report
- Lab and pharmacy turnover reports

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% uptime |
| Performance | Page load < 2 seconds |
| Scalability | Support 500+ concurrent users |
| Security | Role-based access, audit trails, data encryption (AES-256) |
| Compliance | HIPAA, HL7 FHIR |
| Backup | Daily automated backups, 30-day retention |
| Audit | All data modifications logged with user + timestamp |

---

## 8. Key User Stories

- As a **receptionist**, I want to register a new patient in under 2 minutes so that queues are managed efficiently.
- As a **doctor**, I want to view a patient's full history before the consultation so I can provide better care.
- As a **billing staff**, I want the system to auto-generate charges based on services rendered so errors are minimized.
- As a **lab technician**, I want to receive test requests digitally and upload results directly to the patient record.
- As a **patient**, I want to book an appointment online and receive a confirmation SMS.
- As an **administrator**, I want daily revenue and patient census reports to track hospital performance.

---

## 9. Data Model (High-Level Entities)

```
Patient
  - patient_id (PK), mrn, name, dob, gender, contact, insurance_id

Appointment
  - appointment_id (PK), patient_id (FK), doctor_id (FK), date, time, status

Admission (IPD)
  - admission_id (PK), patient_id (FK), ward_id (FK), bed_id (FK), admit_date, discharge_date

Consultation
  - consultation_id (PK), patient_id (FK), doctor_id (FK), date, notes, diagnosis_code

Prescription
  - prescription_id (PK), consultation_id (FK), drug_name, dosage, frequency, duration

Lab Test
  - test_id (PK), patient_id (FK), test_name, ordered_by, result, status

Invoice
  - invoice_id (PK), patient_id (FK), admission_id (FK), amount, paid_amount, status

Doctor
  - doctor_id (PK), name, specialization, department_id (FK), schedule

Ward / Bed
  - ward_id (PK), name, type; bed_id (PK), ward_id (FK), status
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/patients                    - Register patient
GET    /api/patients/{id}               - Get patient details
POST   /api/appointments                - Book appointment
GET    /api/appointments?doctor={id}    - Get doctor appointments
POST   /api/admissions                  - Admit patient
PUT    /api/admissions/{id}/discharge   - Discharge patient
POST   /api/consultations               - Create consultation note
POST   /api/prescriptions               - Create prescription
POST   /api/lab-tests                   - Order lab test
PUT    /api/lab-tests/{id}/result       - Upload test result
POST   /api/invoices                    - Generate invoice
POST   /api/payments                    - Record payment
GET    /api/reports/census              - Patient census report
GET    /api/reports/revenue             - Revenue summary
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js / Angular |
| Backend | Java Spring Boot / Node.js |
| Database | PostgreSQL / MySQL |
| Cache | Redis |
| File Storage | AWS S3 / Azure Blob |
| Search | Elasticsearch (patient search) |
| Messaging | RabbitMQ / Kafka (lab results async) |
| Auth | JWT + OAuth 2.0 |
| Deployment | Docker + Kubernetes |

---

## 12. Security Considerations

- All PHI (Protected Health Information) encrypted at rest and in transit
- Role-based access control (RBAC) with least privilege principle
- Session timeout after inactivity
- Complete audit log of all record accesses and modifications
- HIPAA-compliant data handling and BAA with cloud providers

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Patient registration time | < 3 minutes |
| Billing error rate | < 1% |
| System uptime | > 99.9% |
| Lab result turnaround | < 2 hours |
| User adoption rate | > 90% in 3 months |
| Insurance claim rejection rate | < 5% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Patient Registration, OPD, Appointment |
| Phase 2 | Month 3–4 | IPD, Billing, Pharmacy |
| Phase 3 | Month 5–6 | Lab, Radiology, EMR |
| Phase 4 | Month 7–8 | OT Management, HR, Analytics |
| Phase 5 | Month 9 | Patient Portal, Mobile App |
| UAT & Go-Live | Month 10 | Full deployment and training |
