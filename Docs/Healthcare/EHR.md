# PRD — Electronic Health Records (EHR)

## 1. Product Overview

An **Electronic Health Records (EHR)** system is an interoperable digital platform that captures and shares a patient's longitudinal health information across multiple healthcare providers, organizations, and care settings. Unlike an EMR (which is internal to a single provider), an EHR is designed for health information exchange — enabling coordinated, patient-centered care across hospitals, clinics, labs, pharmacies, and specialists.

---

## 2. Goals & Objectives

- Create a comprehensive, lifelong health record accessible to authorized providers
- Enable secure health information exchange (HIE) between care organizations
- Support care coordination, reduce duplicate testing, and prevent adverse events
- Empower patients to access and control their own health data
- Enable population health management and public health reporting
- Comply with HL7 FHIR, HL7 v2, and national health IT standards

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Primary Care Physician | Comprehensive patient health record |
| Specialist Physician | Access shared records for consultations |
| Nurse / Care Manager | Care coordination, chronic disease management |
| Lab / Radiology | Share results to the EHR network |
| Pharmacist | Access medication history across providers |
| Patient | View, download, and share own health data |
| Public Health Authority | Population health and disease surveillance |
| Health Information Exchange (HIE) Operator | Network governance and data exchange |

---

## 4. Scope

### In Scope
- Unified Patient Health Record (longitudinal)
- Health Information Exchange (FHIR APIs)
- Patient Demographics and Identity Matching
- Clinical Summary (CCD/C-CDA)
- Medication History (from all providers)
- Immunization Records
- Allergy and Adverse Reaction History
- Chronic Disease Management
- Care Plans
- Patient Portal with OpenID access
- Consent Management
- Population Health Analytics

### Out of Scope
- Hospital billing and claims (HMS scope)
- Clinical note authoring (EMR scope within provider)
- Real-time triage or emergency protocols

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | System-level access |
| Provider (Physician / Nurse) | Patient records they are authorized for |
| Organization Admin | Records within their registered care org |
| Pharmacist | Medication records (read) |
| Patient | Full view of own record + consent control |
| Public Health | De-identified population data |
| HIE Admin | Network management |

---

## 6. Functional Requirements

### 6.1 Patient Identity Management
- Master Patient Index (MPI)
- Demographic matching algorithm (probabilistic + deterministic)
- Merge and unlink duplicate records
- National Health ID (ABHA / NHS ID) support
- Patient verification during provider access

### 6.2 Unified Health Record
- Longitudinal health timeline (all encounters across all providers)
- Structured clinical data: diagnoses, medications, allergies, vitals, procedures
- Unstructured data: notes, reports, images (as attachments)
- Source attribution for each data element (which provider added it)

### 6.3 Clinical Summary (CCD / C-CDA)
- Summary document: active problems, medications, allergies, immunizations, recent results
- CCD generation on demand
- Continuity of Care Document (CCD) sharing on referral or transfer
- Structured format per HL7 CCD standard

### 6.4 Medication History
- Aggregated medication view from all prescribers
- Current active medications and discontinued medications
- Prescription-level detail: dose, route, frequency, prescriber, pharmacy
- Drug interaction check across cross-provider medications

### 6.5 Immunization Registry
- Vaccination history from all sources
- National immunization schedule tracking (age-appropriate reminders)
- Missing or overdue immunization alerts
- Provider-to-registry submission

### 6.6 Allergy & Adverse Reaction Record
- Aggregated allergy list across providers
- Allergy reconciliation on conflict detection
- Drug, food, and environmental allergy types
- Source provider and recorded date

### 6.7 Chronic Disease Management
- Disease registry (Diabetes, Hypertension, COPD, etc.)
- Patient enrollment in disease management programs
- Care gap identification (missed HbA1c, eye exams, etc.)
- Clinical measures tracking (LDL, HbA1c trend over time)
- Care team alerts for deteriorating patients

### 6.8 Care Plans
- Structured care plan creation per condition
- Goal setting, interventions, and follow-up schedules
- Multi-provider collaborative care plan editing
- Patient view and acknowledgment

### 6.9 Health Information Exchange (FHIR APIs)
- HL7 FHIR R4 APIs for all clinical resources
- Patient $everything operation (full record export)
- Bulk FHIR export for analytics
- SMART on FHIR app authorization
- Push-based notifications (subscription API)
- Query-based exchange (CCD pull on care transition)

### 6.10 Consent Management
- Patient consent capture (digital, with timestamp)
- Granular consent control (which org can access which data)
- Consent revocation workflow
- Consent audit trail (who accessed what and when)
- GDPR / HIPAA-compliant consent records

### 6.11 Patient Portal
- Patient login and authentication (OpenID Connect)
- View full health record (diagnoses, meds, labs, visits)
- Download personal health record (Blue Button / CCDA)
- Share records with a provider via access code
- Appointment and care plan view
- Message care team (secure messaging)

### 6.12 Population Health Analytics
- Disease prevalence and incidence reports
- Vaccination coverage rates
- Care gap analysis at population level
- Risk stratification (identify high-risk patients)
- Reportable condition reporting to public health authority

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% |
| Performance | FHIR API response < 500ms, summary load < 3 seconds |
| Scalability | 100M+ patients in national deployment |
| Standards | HL7 FHIR R4, ICD-10, SNOMED CT, LOINC, HL7 v2 |
| Security | HIPAA, GDPR, OAuth 2.0, SMART on FHIR |
| Interoperability | HL7 FHIR-compliant APIs for all resources |
| Audit | All record access logged with purpose of use |

---

## 8. Key User Stories

- As a **specialist**, I want to view a patient's full medication list from their primary care physician before prescribing.
- As a **patient**, I want to download my complete health record and share it with a new doctor.
- As a **pharmacist**, I want to check a patient's allergy history before dispensing a prescription.
- As a **care manager**, I want to see which diabetic patients have not had an HbA1c test in the past 6 months.
- As a **patient**, I want to control which providers can access my mental health records (consent granularity).
- As a **public health official**, I want vaccination coverage reports by region to guide immunization campaigns.

---

## 9. Data Model (High-Level Entities)

```
Patient (MPI)
  - patient_id (PK), national_health_id, name, dob, gender, identifiers[], consent_profile_id

Condition (Diagnosis)
  - condition_id (PK), patient_id (FK), code (ICD-10), onset_date, status, source_provider_id

Medication Statement
  - med_id (PK), patient_id (FK), drug_code, drug_name, dose, route, frequency, prescriber_id, status

AllergyIntolerance
  - allergy_id (PK), patient_id (FK), substance, type, severity, recorder_id, onset

Immunization
  - immunization_id (PK), patient_id (FK), vaccine_code, date, dose_number, administered_by

Observation (Vitals / Labs)
  - obs_id (PK), patient_id (FK), loinc_code, value, unit, date, source_id

Consent
  - consent_id (PK), patient_id (FK), actor_org, data_scope, granted, expires_at

CarePlan
  - careplan_id (PK), patient_id (FK), condition_id (FK), goals[], activities[], status
```

---

## 10. API Design (FHIR R4 Endpoints)

```
GET    /fhir/Patient/{id}                   - Get patient
GET    /fhir/Patient/{id}/$everything       - Full patient record bundle
GET    /fhir/Condition?patient={id}         - Get diagnoses
GET    /fhir/MedicationStatement?patient    - Get medications
POST   /fhir/MedicationStatement            - Add medication
GET    /fhir/Immunization?patient={id}      - Get immunizations
GET    /fhir/AllergyIntolerance?patient     - Get allergies
GET    /fhir/Observation?patient={id}       - Get lab results / vitals
POST   /fhir/Consent                        - Record patient consent
GET    /fhir/CarePlan?patient={id}          - Get care plans
POST   /fhir/Subscription                   - Subscribe to patient data updates
GET    /fhir/Group/$export                  - Bulk FHIR export
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| FHIR Server | HAPI FHIR / Azure Health Data Services |
| Backend | Java Spring Boot |
| Database | PostgreSQL + FHIR-native store |
| Identity / Auth | Keycloak + SMART on FHIR |
| MPI Engine | OpenEMPI |
| Search | Elasticsearch |
| Messaging | HL7 v2 messaging (Mirth Connect) |
| Deployment | Government / sovereign cloud |

---

## 12. Security Considerations

- All PHI encrypted at rest (AES-256) and in transit (TLS 1.3)
- SMART on FHIR for patient and provider authorizations
- Consent-enforced access: API returns only consented data
- Break-the-glass emergency access with full audit logging
- HIPAA-compliant audit trail for every data access
- Annual third-party security audits

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Patient record completeness | > 90% |
| Duplicate patient rate | < 0.1% |
| FHIR API uptime | > 99.9% |
| Provider participation | > 80% of networked providers |
| Patient portal adoption | > 50% |
| Care gap closure rate | > 30% improvement |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Patient MPI, demographics, FHIR server |
| Phase 2 | Month 3–4 | Clinical resources (meds, allergies, conditions) |
| Phase 3 | Month 5 | Lab/radiology result integration |
| Phase 4 | Month 6 | Immunization registry, care plans |
| Phase 5 | Month 7–8 | Consent management, patient portal |
| Phase 6 | Month 9–10 | Population health, HIE network onboarding |
| Go-Live | Month 11 | National / regional rollout |
