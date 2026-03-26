# PRD — Radiology Information System (RIS)

## 1. Product Overview

A **Radiology Information System (RIS)** is a software platform that manages radiology department workflows — from imaging order creation and patient scheduling, through examination performance and reporting, to result delivery and billing. It works in concert with PACS (for image storage and viewing) and the EMR to support medical imaging operations.

---

## 2. Goals & Objectives

- Streamline radiology workflows from order to report delivery
- Reduce patient wait times through smart scheduling and worklist management
- Enable digital radiology reporting with voice dictation support
- Integrate with PACS for seamless image access from reports
- Deliver reports electronically to referring physicians
- Support billing and RVU (Relative Value Unit) tracking for radiologists

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Referring Physician | Order imaging, review reports |
| Radiologist | Read and report imaging studies |
| Radiology Technologist | Perform imaging examinations |
| Scheduler | Book appointments, manage modality slots |
| Radiology Nurse | Pre-procedure assessment, sedation |
| Billing Staff | Charge capture, claims |
| Patient | Scheduling, report access (portal) |
| PACS Administrator | Image storage and viewer integration |

---

## 4. Scope

### In Scope
- Imaging Order Management
- Appointment Scheduling per Modality
- Patient Check-In and Pre-Procedure Workflow
- Exam Worklist Management
- Radiology Report Authoring (Voice Dictation)
- Report Review and Sign-Off
- Critical Finding Management
- Report Distribution
- PACS Integration
- Billing and Charge Capture
- Radiation Dose Tracking

### Out of Scope
- Medical image storage (PACS)
- Clinical diagnosis EMR
- Telemedicine radiology (Teleradiology — integration only)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Radiologist | Full radiology reporting |
| Radiology Technologist | Exam worklist, exam completion |
| Scheduler | Appointment scheduling |
| Referring Physician | Order placement, result viewing |
| Billing | Charge capture module |
| Patient (Portal) | Own reports |

---

## 6. Functional Requirements

### 6.1 Imaging Order Management
- Receive imaging orders from EMR or manual entry
- Order types: X-Ray, CT, MRI, Ultrasound, Mammography, Nuclear Medicine
- Clinical indication and reason for exam
- Order priority: Routine, Urgent, STAT, Outpatient
- Insurance pre-authorization check before scheduling
- Order modification and cancellation
- Order history and tracking

### 6.2 Appointment Scheduling
- Modality-specific scheduling (CT Scanner 1, MRI Room 2)
- Patient demographics and order linked to appointment
- Special instructions (NPO, contrast preparation, pregnancy screening)
- SMS/email appointment reminders
- Waitlist management
- Multi-site scheduling support
- Reschedule and cancel workflow

### 6.3 Patient Check-In & Pre-Procedure
- Arrival confirmation and check-in
- Patient ID verification (barcode / biometric)
- Pre-procedure questionnaire (allergy to contrast, claustrophobia, pacemaker)
- Consent for contrast/sedation procedures
- Preparation instructions review
- Pregnancy screening for female patients

### 6.4 Exam Worklist
- Modality worklist (MWL) generation per scanner
- Modality Worklist standard (DICOM MWL) push to scanner
- Technologist assignment to exam
- Exam start and completion timestamp
- Technical quality check before sending to radiologist
- Retake request workflow

### 6.5 Radiology Report Authoring
- Voice dictation with speech-to-text transcription
- Structured reporting templates per body part and modality
- Macro and findings library for fast text insertion
- Image linking within report body
- Prior study comparison in report
- Radiologist signature and credentials on report

### 6.6 Report Review & Sign-Off
- Preliminary read by resident / trainee
- Final sign-off by attending radiologist
- Addendum capability after sign-off
- Report correction workflow
- Two-radiologist review for critical cases

### 6.7 Critical Finding Management
- Flag critical finding during reporting
- Immediate notification to ordering physician (phone + electronic)
- Critical finding acknowledgment tracking
- Escalation workflow if not acknowledged in X minutes
- Critical finding registry for compliance

### 6.8 Report Distribution
- Auto-push to ordering physician's EMR
- Patient portal delivery
- Secure email / fax to external providers
- Report download (PDF) with embedded images (optional)
- CD burning for patient copies

### 6.9 PACS Integration
- DICOM worklist integration (study sent to PACS on order)
- Image retrieval from PACS viewer within RIS
- Study status synchronization (images received, exam complete)
- Prior study retrieval for comparison
- Report attachment to DICOM study in PACS

### 6.10 Billing & Charge Capture
- Auto-charge on exam completion (CPT/procedure codes)
- Technical and professional component separation
- Radiologist RVU tracking
- Insurance claim generation
- Modifier management (contrast/non-contrast, laterality)
- Revenue cycle integration

### 6.11 Radiation Dose Tracking
- Radiation dose capture per procedure (RDSR from CT/fluoroscopy)
- Patient cumulative dose profile
- Dose reference alerts above DRL (Diagnostic Reference Level)
- Dose optimization reports

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% |
| Performance | Worklist load < 2 seconds, report open < 3 seconds |
| Scalability | 2,000+ studies/day per site |
| Standards | DICOM, HL7 v2 / FHIR, ICD-10, CPT, SNOMED CT |
| Security | PHI-compliant, HIPAA, RBAC |
| Dictation | Integrated speech recognition (real-time) |
| Integration | PACS, EMR, billing, scheduling |

---

## 8. Key User Stories

- As a **radiologist**, I want to dictate my report and have it structured automatically so reporting is faster.
- As a **technologist**, I want my exam worklist to show as soon as the patient is checked in.
- As a **referring doctor**, I want to receive the radiology report immediately when it is signed.
- As a **scheduler**, I want to see which modality slots are available and book the patient in under 2 minutes.
- As a **radiologist**, I want to compare the current study with the prior study side-by-side in the PACS viewer.
- As a **billing staff**, I want CPT codes to auto-populate from the exam type performed.

---

## 9. Data Model (High-Level Entities)

```
ImagingOrder
  - order_id (PK), patient_id (FK), exam_type, modality, priority, clinical_indication, ordered_by, status

Appointment
  - appt_id (PK), order_id (FK), modality_id (FK), scheduled_time, room, status, pre_check_complete

Exam (Study)
  - exam_id (PK), order_id (FK), appt_id (FK), technologist_id, start_time, end_time, accession_number, pacs_study_uid

RadiologyReport
  - report_id (PK), exam_id (FK), radiologist_id (FK), findings, impression, status (Preliminary/Final), signed_at, critical_flag

CriticalFinding
  - finding_id (PK), report_id (FK), description, notified_to, notified_at, acknowledged_at

ChargeCaptured
  - charge_id (PK), exam_id (FK), cpt_code, quantity, technical_component, professional_component

DoseRecord
  - dose_id (PK), exam_id (FK), patient_id (FK), dose_value, unit, modality, drl_exceeded
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/imaging-orders                  - Create imaging order
GET    /api/worklist?modality={id}          - Get technologist worklist
POST   /api/appointments                    - Schedule appointment
POST   /api/checkin/{order_id}              - Patient check-in
PUT    /api/exams/{id}/complete             - Mark exam complete
POST   /api/reports                         - Create/start report
PUT    /api/reports/{id}/finalize           - Sign off report
POST   /api/reports/{id}/critical           - Flag critical finding
GET    /api/patients/{id}/reports           - Patient report history
POST   /api/charges/{exam_id}               - Capture exam charges
GET    /api/reports/{id}/pdf                - Download report PDF
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Voice Dictation | Nuance Dragon / AWS Transcribe Medical |
| Backend | Java Spring Boot |
| Database | PostgreSQL |
| DICOM | Orthanc / dcm4che |
| HL7 | Mirth Connect |
| Auth | OAuth 2.0 + LDAP |
| Storage | AWS S3 (reports) |
| Deployment | On-premise / hybrid |

---

## 12. Security Considerations

- Patient imaging data is PHI — fully encrypted at rest and in transit
- Radiologist e-signature is legally binding and tamper-evident
- Reports locked after final sign-off — addendum required for changes
- Audit trail: every report access, view, and modification logged
- Critical finding acknowledgment is legally required and auditable
- PACS integration over secure, encrypted DICOM TLS

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Report turnaround time (TAT) | < 1 hour (STAT), < 24 hours (routine) |
| Critical finding notification time | < 10 minutes after detection |
| Equipment utilization | > 80% |
| Report accuracy (amendment rate) | < 1% |
| Billing capture rate | > 99% |
| Patient exam wait time | < 20 minutes |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Order management, scheduling, patient check-in |
| Phase 2 | Month 2 | Worklist, DICOM MWL, exam workflow |
| Phase 3 | Month 3 | Report authoring, voice dictation, sign-off |
| Phase 4 | Month 4 | PACS integration, critical findings |
| Phase 5 | Month 5 | Billing, dose tracking, report distribution |
| Go-Live | Month 6 | UAT, radiologist training, production launch |
