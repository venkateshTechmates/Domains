# PRD — Laboratory Information System (LIS)

## 1. Product Overview

A **Laboratory Information System (LIS)** is a software platform that manages the complete workflow of a clinical or diagnostic laboratory — from test ordering and sample collection, through processing and analysis, to result entry, validation, and reporting. It interfaces with laboratory analyzers, the EMR/EHR, and radiology systems to deliver accurate, timely test results.

---

## 2. Goals & Objectives

- Automate and streamline the end-to-end lab testing workflow
- Reduce sample handling errors through barcode-based tracking
- Provide fast and accurate test results to clinicians
- Ensure critical value alerting and result acknowledgment
- Manage lab inventory (reagents, consumables)
- Support multi-lab, multi-location operations
- Comply with CAP/NABL/ISO 15189 accreditation requirements

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Physician / Clinician | Test ordering, result review |
| Lab Manager | Workflow oversight, QC, accreditation |
| Lab Technician | Sample processing, analyzer operation |
| Phlebotomist | Sample collection, labeling |
| Pathologist | Result validation and reporting |
| Billing Staff | Test billing and insurance claims |
| Patient | Sample collection, result portal |
| IT Administrator | System management, analyzer interface |

---

## 4. Scope

### In Scope
- Test Order Management
- Sample Collection and Tracking
- Worklist and Specimen Processing
- Analyzer Interface (ASTM/HL7)
- Result Entry and Validation
- Critical Value Management
- Quality Control (QC)
- Lab Inventory Management
- Report Generation
- Billing Integration
- Patient Result Portal
- Accreditation and Audit Support

### Out of Scope
- Radiology and imaging (PACS/RIS)
- Pharmacy management
- Medical imaging devices

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full access |
| Lab Manager | All tests, QC, reports |
| Pathologist | Result validation and approval |
| Lab Technician | Assigned workstation tests |
| Phlebotomist | Sample collection module |
| Billing Staff | Billing module |
| Physician (EMR integrated) | View results for own patients |
| Patient (Portal) | Own test results |

---

## 6. Functional Requirements

### 6.1 Test Order Management
- Receive orders from EMR or manual entry
- Test catalog maintenance (test code, method, TAT, reference range)
- Order types: routine, urgent, STAT
- Panel/profile orders (group tests)
- Add-on test ordering on existing sample
- Order cancellation and modification
- Outpatient and inpatient order distinction

### 6.2 Sample Collection & Tracking
- Specimen registration with unique barcode (LIS barcode generation)
- Phlebotomist assignment by patient location
- Collection tubes required per test (VACUTAINER type, volume)
- Pre-analytical checklist (fasting status, sample quality)
- Sample timestamp and collector identity tracking
- Sample rejection workflow (hemolysis, insufficient volume)
- Sample routing to correct lab section

### 6.3 Worklist Management
- Auto-generated worklist per analyzer / lab section
- Priority-based queue (STAT at top)
- Test status tracking (Ordered → Collected → In Process → Resulted → Validated)
- Batch tests management
- Manual re-run flag

### 6.4 Analyzer Interface
- Bidirectional interface with analyzers (ASTM E1381/E1394, HL7)
- Auto-download of results from analyzer
- QC sample transmission to analyzer
- Barcode-based order routing to multiple analyzers
- Delta check (comparison with previous result)
- Auto-verification rules for within-normal-range results

### 6.5 Result Entry & Validation
- Result entry (manual for non-interfaced tests)
- Reference ranges by age, gender, and sample type
- Auto-flagged abnormal values (H / L / Critical)
- Two-level validation (technician review → pathologist approval)
- Comment and interpretation addition
- Free text and structured result formats

### 6.6 Critical Value Management
- Configurable critical value thresholds per test
- Immediate notification to ordering physician (phone + digital)
- Acknowledgment tracking (who received, time, action taken)
- Escalation if unacknowledged in X minutes
- Critical value log for compliance

### 6.7 Quality Control (QC)
- Levey-Jennings chart for QC material tracking
- Westgard rules violation detection
- Daily, weekly, monthly QC review
- QC failure blocking (analyzer locked until corrected)
- External QA program (proficiency testing) tracking

### 6.8 Lab Inventory Management
- Reagent master and lot management
- Stock level tracking (quantity on hand)
- Reagent expiry alerts
- Purchase requisition on reorder point
- Lot-to-lot tracking for QC troubleshooting
- Consumables (syringes, tubes, slides) tracking

### 6.9 Report Generation
- Auto-generate test reports on validation
- Branded lab report (logo, header, reference ranges)
- Cumulative report (all results over time for a patient)
- Deliver to EMR via HL7 ORU message
- Print, email, and portal delivery
- Digital signature on validated reports

### 6.10 Billing
- Auto-generate charges on test completion
- Insurance pre-authorization for high-cost tests
- Discount and package pricing
- Integration with HMS/billing system
- Lab-specific revenue report

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% (lab operates 24x7) |
| Performance | Result auto-transmission < 30 seconds after analyzer |
| Scalability | Handle 10,000+ tests/day |
| Standards | HL7 v2, ASTM, LOINC, ICD-10 |
| Security | RBAC, PHI encryption, audit trail |
| Compliance | NABL, CAP, ISO 15189 |
| Integration | Analyzers, EMR, billing, patient portal |

---

## 8. Key User Stories

- As a **physician**, I want to order a lab test from the EMR and see results appear automatically.
- As a **lab technician**, I want the analyzer results to auto-transfer to the LIS without manual re-entry.
- As a **pathologist**, I want to approve validated results and have the report instantly delivered to the ordering doctor.
- As a **lab manager**, I want QC violations to halt testing automatically until corrected.
- As a **phlebotomist**, I want my daily collection list with patient location and required tubes pre-printed.
- As a **patient**, I want to receive my lab report via email/SMS as soon as it is approved.

---

## 9. Data Model (High-Level Entities)

```
TestOrder
  - order_id (PK), patient_id (FK), encounter_id (FK), test_code, priority, ordered_by, ordered_at, status

Sample
  - sample_id (PK), order_id (FK), barcode, tube_type, collected_at, collected_by, status, rejection_reason

Test / Catalog
  - test_id (PK), code, name, method, sample_type, tat_hours, loinc_code, reference_ranges[]

Result
  - result_id (PK), order_id (FK), sample_id (FK), test_id (FK), value, unit, flag (H/L/Critical), status

QCRecord
  - qc_id (PK), test_id (FK), analyzer_id, date, level, expected_value, actual_value, within_rules

Reagent
  - reagent_id (PK), name, lot_no, expiry, quantity, reorder_level

ReportDelivery
  - delivery_id (PK), order_id (FK), delivered_to, channel (EMR/email/portal), delivered_at
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/test-orders                     - Create test order
GET    /api/test-orders/{id}/status         - Get test status
GET    /api/worklist?section={lab_section}  - Get worklist
POST   /api/samples                         - Register sample collection
PUT    /api/samples/{id}/reject             - Reject sample
POST   /api/results                         - Enter result manually
PUT    /api/results/{id}/validate           - Pathologist validation
POST   /api/critical-alerts/{result_id}     - Trigger critical alert
GET    /api/reports/{order_id}              - Download validated report
GET    /api/patients/{id}/cumulative-report - All historical results
GET    /api/qc/chart/{test_id}              - Levey-Jennings chart
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Mobile (Phlebotomist) | Android app |
| Backend | Java Spring Boot |
| Database | PostgreSQL |
| Analyzer Interface | ASTM E1381 / HL7 v2 driver module |
| HL7 Engine | Mirth Connect |
| Auth | RBAC + LDAP/SSO |
| Storage | AWS S3 (reports) |
| Deployment | On-premise (hospital network) |

---

## 12. Security Considerations

- Patient lab data is PHI — encrypted at rest and in transit
- Result delivery to EMR over secured HL7 channel
- Lab reports are digitally signed and tamper-evident
- Audit trail for all result access and modifications
- RBAC: technicians cannot validate; pathologist validation required
- External result access requires patient authentication

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Lab turnaround time (TAT) | ≤ defined TAT per test type |
| Critical value notification time | < 5 minutes after result |
| Sample rejection rate | < 2% |
| Result accuracy | > 99.9% |
| Auto-verification rate | > 60% of routine tests |
| QC violation rate | < 1 per week per analyzer |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Test catalog, order management, sample tracking |
| Phase 2 | Month 2 | Analyzer interface, result entry, validation |
| Phase 3 | Month 3 | Critical value alerts, QC management |
| Phase 4 | Month 4 | Report generation, EMR integration |
| Phase 5 | Month 5 | Inventory, billing, patient portal |
| Go-Live | Month 6 | NABL audit readiness and production launch |
