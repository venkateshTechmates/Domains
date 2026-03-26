# PRD — Loan Origination System (LOS)

## 1. Product Overview

A **Loan Origination System (LOS)** is a digital platform that manages the end-to-end process of creating a new loan — from initial loan application and document collection, through credit underwriting, approval, and final disbursement. It automates manual steps, enforces credit policies, and integrates with credit bureaus, banking systems, and legal/compliance tools.

---

## 2. Goals & Objectives

- Digitize and automate the loan application journey (borrower to disbursal)
- Reduce loan processing time from days to hours
- Enforce credit risk policies consistently via automated underwriting
- Provide a transparent, trackable workflow for all stakeholders
- Ensure regulatory compliance (KYC, AML, RBI / local norms)
- Reduce operational costs per loan originated

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Loan Applicant | Submit application, upload documents |
| Sales / DSA Agent | Assist applicants, submit applications |
| Credit Analyst | Review, evaluate, and recommend |
| Underwriter | Risk assessment and credit decision |
| Branch Manager | Approvals within authority matrix |
| Legal Officer | Property/collateral verification |
| Disbursement Officer | Fund transfer on sanction |
| Compliance Officer | KYC, AML validation |
| IT Administrator | System configuration, integrations |

---

## 4. Scope

### In Scope
- Loan Application (Self-Service and Agent-Assisted)
- Document Collection and Verification
- KYC / AML Checks
- Credit Bureau Integration (CIBIL, Equifax, Experian)
- Automated Credit Scoring
- Underwriting Workflow
- Credit Approval / Rejection
- Offer Generation and Acceptance
- Legal and Collateral Verification
- Loan Disbursement
- Audit Trail and Compliance Reporting

### Out of Scope
- Loan repayment and EMI collection (LMS — Loan Management)
- Core Banking System (integration only)
- Debt collection / recovery

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Applicant / Borrower | Application portal |
| DSA / Sales Agent | Submit applications, view pipeline |
| Credit Analyst | Review applications, run checks |
| Underwriter | Credit scoring, decision |
| Branch Manager / Approver | Approve within authority limit |
| Disbursement Officer | Initiate fund transfer |
| Compliance Officer | KYC/AML checks |

---

## 6. Functional Requirements

### 6.1 Loan Application
- Online application form (personal, employment, financial details)
- Product selection: Home Loan, Personal Loan, Business Loan, Auto Loan
- Co-applicant addition
- Application ID generation and status tracking
- Digital form with intelligent validation (e.g., PAN format, income checks)
- Save and resume draft application

### 6.2 Document Collection
- Required document checklist per loan type
- Upload interface (PDF, JPG, PNG) with size limits
- Document classification (ID Proof, Income Proof, Address Proof, Property Docs)
- OCR-based auto-fill from uploaded documents (Aadhar, PAN, salary slips)
- Document completeness check before submission

### 6.3 KYC / AML Verification
- e-KYC validation via Aadhaar OTP (India) or equivalent
- PAN/ID verification with government databases
- CKYC check
- AML screening against sanction lists (OFAC, UN, local)
- Negative list and politically exposed person (PEP) check

### 6.4 Credit Bureau Integration
- Pull credit report from CIBIL/Equifax/Experian
- Credit score display (CIBIL score, Experian score)
- Existing loan and EMI obligation view
- Delinquency history
- Bureau-based credit policy trigger (e.g., score < 650 → auto-reject)

### 6.5 Automated Credit Scoring
- In-house scoring model based on: income, obligations, employment type, bureau score
- Debt-to-Income (DTI) ratio calculation
- Loan-to-Value (LTV) ratio (for secured loans)
- Policy rule engine (age, income, location, employment)
- Auto-approve, refer, or reject based on score bands

### 6.6 Underwriting Workflow
- Application assigned to credit analyst / underwriter
- Checklist-based evaluation
- Field investigation (FI) initiation for physical verification
- Exception requests and deviations with approval
- Credit committee workflow for large-ticket loans

### 6.7 Approval & Rejection
- Authority matrix: auto, analyst, branch manager, regional, HO
- Credit sanction letter generation
- Rejection letter with reason codes
- Counter-offer generation (lower loan amount, higher rate)
- Applicant notification (SMS, email) at every stage

### 6.8 Legal & Collateral Verification
- Property document checklist (for home loans)
- Legal opinion request and outcome tracking
- Property valuation report upload
- Title search and encumbrance certificate
- Mortgage creation and registration

### 6.9 Loan Disbursement
- Sanction terms and conditions acceptance (e-sign)
- Loan Agreement generation and e-signing
- Disbursement initiation to Core Banking
- Partial disbursement handling (construction-linked)
- Disbursement confirmation and borrower notification
- Handoff to LMS (Loan Management System) for servicing

### 6.10 Audit Trail & Compliance
- Full activity log per application (who did what and when)
- Regulatory reports (Fair Lending, HMDA, RBI filing)
- SLA tracking per stage
- TAT (Turnaround Time) reports per product and stage

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.99% (critical financial system) |
| Performance | Application submission < 3 seconds, bureau check < 10 seconds |
| Scalability | Handle 50,000 applications/month |
| Security | AES-256 encryption, TLS 1.3, MFA for internal users |
| Compliance | RBI regulations, GDPR, ISO 27001 |
| Integration | CIBIL, Aadhaar, PAN service, Core Banking, e-sign |
| Audit | Immutable audit trail for all decisions |

---

## 8. Key User Stories

- As an **applicant**, I want to apply for a home loan from my phone with document upload so I don't need to visit a branch.
- As a **credit analyst**, I want the bureau report auto-fetched when an application is assigned so I save time.
- As an **underwriter**, I want the system to flag policy exceptions automatically so I review only critical cases.
- As a **compliance officer**, I want AML screening done before any approval so we stay compliant.
- As a **disbursement officer**, I want to initiate fund transfer with a single click once all conditions are met.
- As a **branch manager**, I want to track all pending applications in my queue with SLA timers.

---

## 9. Data Model (High-Level Entities)

```
LoanApplication
  - app_id (PK), applicant_id (FK), product_type, amount_requested, status, stage, created_at

Applicant
  - applicant_id (PK), name, dob, pan, aadhar, employment_type, monthly_income, credit_score

Document
  - doc_id (PK), app_id (FK), doc_type, file_url, verified, ocr_data

CreditBureauReport
  - report_id (PK), app_id (FK), bureau_name, score, report_date, data_json

CreditDecision
  - decision_id (PK), app_id (FK), decision (Approve/Refer/Reject), score, decided_by, decided_at, reason

SanctionLetter
  - sanction_id (PK), app_id (FK), amount_sanctioned, rate, tenure, conditions, issued_at

Disbursement
  - disb_id (PK), app_id (FK), amount, account_no, transaction_ref, disbursed_at

AuditLog
  - log_id (PK), app_id (FK), user_id, action, old_value, new_value, timestamp
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/applications                    - Submit loan application
GET    /api/applications/{id}               - Get application status
POST   /api/applications/{id}/documents     - Upload documents
POST   /api/applications/{id}/kyc           - Trigger KYC verification
POST   /api/applications/{id}/bureau-check  - Pull credit bureau report
POST   /api/applications/{id}/score         - Run credit scoring engine
PUT    /api/applications/{id}/decision      - Record credit decision
POST   /api/applications/{id}/sanction      - Generate sanction letter
PUT    /api/applications/{id}/accept        - Borrower acceptance of offer
POST   /api/applications/{id}/disburse      - Initiate disbursement
GET    /api/reports/tat                     - Turnaround time report
GET    /api/reports/pipeline                - Application pipeline report
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js (borrower portal + internal) |
| Mobile | React Native (agent app) |
| Backend | Java Spring Boot |
| Database | PostgreSQL + Oracle |
| Document Store | AWS S3 |
| OCR | AWS Textract / Google Document AI |
| Rules Engine | Drools / custom rule engine |
| Auth | OAuth 2.0 + MFA |
| Integration | REST APIs (bureau, e-KYC, CBS) |
| Deployment | Kubernetes on private cloud |

---

## 12. Security Considerations

- All PII (PAN, Aadhaar, bank details) encrypted at rest and in transit
- MFA mandatory for all internal users
- Immutable audit trail — credit decisions cannot be modified post-decision
- Masking of Aadhaar number in UI and logs (first 8 digits masked)
- Role-based access with least privilege
- Penetration testing quarterly (financial-grade requirement)

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Loan processing TAT | < 24 hours for personal loans |
| Auto-decisioning rate | > 60% of applications |
| Application drop-off rate | < 20% |
| Bureau check success rate | > 99% |
| Disbursement next day | > 80% of approved loans |
| KYC failure rate | < 5% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Application form, document upload, KYC |
| Phase 2 | Month 3 | Bureau integration, credit scoring engine |
| Phase 3 | Month 4 | Underwriting workflow, authority matrix |
| Phase 4 | Month 5 | Sanction, legal, e-sign integration |
| Phase 5 | Month 6 | Disbursement, CBS integration, compliance |
| Go-Live | Month 7 | Testing, UAT, regulatory sign-off |
