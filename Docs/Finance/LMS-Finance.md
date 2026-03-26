# PRD — Loan Management System (LMS - Finance)

## 1. Product Overview

A **Loan Management System (LMS)** in the financial domain manages the post-disbursement lifecycle of a loan — covering EMI scheduling, repayment processing, interest calculation, prepayments, missed payments, collections, NOC generation, and loan closure. It is the servicing engine that operates after the Loan Origination System (LOS) has sanctioned and disbursed a loan.

---

## 2. Goals & Objectives

- Automate EMI schedules, repayment processing, and interest calculations
- Provide real-time loan account visibility to borrowers and staff
- Manage collections for overdue accounts efficiently
- Support prepayment, part-payment, and loan restructuring
- Generate regulatory and compliance reports
- Reduce default rates through proactive communication and alerts

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Borrower / Customer | EMI payment, account statements, NOC |
| Collections Agent | Chase overdue EMIs, manage NPAs |
| Branch / Relationship Manager | Customer loan account servicing |
| Finance / Accounting | Interest income, provisions, reconciliation |
| Compliance Officer | NPA classification, RBI reporting |
| IT Administrator | System management, integrations |
| Leadership | Portfolio dashboards, risk metrics |

---

## 4. Scope

### In Scope
- Loan Account Activation (from LOS)
- EMI Schedule Generation
- Repayment Processing (ECS, NACH, UPI, manual)
- Interest Calculation (flat, reducing balance)
- Part Payment and Prepayment
- Overdue and NPA Management
- Collections Workflow
- Loan Restructuring
- Foreclosure Processing
- NOC and Closure Letter Generation
- Reports and Portfolio Analytics

### Out of Scope
- New loan origination (LOS scope)
- KYC and credit bureau checks (LOS scope)
- Core banking (integration only)
- Investment and wealth management

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Borrower | Self-service portal |
| Collections Agent | Overdue accounts assigned to them |
| Branch Manager | Loans in their branch |
| Finance Admin | All accounts, reconciliation |
| Compliance | NPA reports, audit trail |
| Viewer | Read-only dashboard |

---

## 6. Functional Requirements

### 6.1 Loan Account Activation
- Receive loan data from LOS on disbursement
- Create loan account with unique Loan Account Number (LAN)
- Set sanction terms: amount, rate, tenure, EMI, moratorium
- Generate amortization schedule (principal + interest breakup per EMI)
- Send welcome communication to borrower

### 6.2 EMI Schedule Generation
- Amortization schedule computation
  - Reducing balance method
  - Flat rate method
- EMI date configuration (1st, 5th, 15th of month)
- Step-up / Step-down EMI schedules
- Moratorium period handling (interest accrual without repayment)

### 6.3 Repayment Processing
- Payment channels: NACH/ECS mandate, UPI auto-pay, NEFT, cheque, cash
- Real-time payment confirmation and allocation
- Allocation order: Penalties → Interest → Principal
- Bounced payment recording and penalty trigger
- Payment receipts and SMS/email notifications

### 6.4 Interest Calculation
- Daily interest accrual on outstanding principal
- Rate change handling (floating rate loans)
- Penalty interest on overdue days (per policy)
- Compound interest rule compliance
- Interest income posting to GL

### 6.5 Part Payment & Prepayment
- Part-payment with option to reduce EMI or reduce tenure
- Prepayment penalty calculation per terms
- Revised amortization schedule post prepayment
- Minimum prepayment amount validation
- No-cost prepayment handling (as per RBI guidelines)

### 6.6 Overdue & NPA Management
- DPD (Days Past Due) tracking per account
- Bucket classification: Regular → SMA-0 → SMA-1 → SMA-2 → NPA
- NPA classification as per RBI norms (90+ DPD → NPA)
- Provision calculation per NPA category
- Automatic recall notice generation

### 6.7 Collections Workflow
- Overdue account assignment to collections agents
- Delinquency history and contact attempt log
- Promise-to-pay (PTP) recording
- Field visit scheduling
- Settlement offer workflow (OTS — One-Time Settlement)
- Legal escalation trigger (SARFAESI, DRT filing)
- Collections performance dashboard

### 6.8 Loan Restructuring
- Principal balance modification
- Rate revision
- Tenure extension
- EMI holiday (temporary suspension)
- Moratorium during COVID-type scenarios
- Restructured account tagging and reporting

### 6.9 Foreclosure
- Foreclosure request from borrower
- Outstanding balance calculation (principal + interest + penalty − prepayment)
- NOC eligibility check (all dues cleared)
- Foreclosure charge calculation per terms
- Final settlement confirmation
- Charge release (hypothecation, mortgage)

### 6.10 Reports & Analytics
- Portfolio outstanding report (by product, region, branch)
- NPA and provision report
- DPD bucket aging report
- Payment efficiency report (NACh success rate)
- Early delinquency alert
- Collections recovery efficiency
- Prepayment analysis

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.99% |
| Performance | EMI schedule calc < 2 seconds, payment processing < 5 seconds |
| Scalability | Handle 1M+ active loan accounts |
| Security | AES-256 encryption, MFA, all data masked in UI |
| Compliance | RBI IRAC norms, IND-AS 109, GDPR |
| Integration | Core Banking, NACH/ECS, Payment gateways, LOS |
| Audit | Immutable ledger for all financial entries |

---

## 8. Key User Stories

- As a **borrower**, I want to view my amortization schedule so I understand my upcoming EMI payments.
- As a **borrower**, I want to make a part-payment and see the revised schedule immediately.
- As a **collections agent**, I want to see all accounts overdue by 30+ days assigned to me with contact history.
- As a **finance head**, I want the NPA provisioning report auto-generated on the last day of every quarter.
- As a **RM**, I want to initiate a customer's foreclosure request and receive the final settlement statement.
- As a **compliance officer**, I want the system to classify NPAs correctly per RBI norms without manual intervention.

---

## 9. Data Model (High-Level Entities)

```
LoanAccount
  - account_id (PK), lan, customer_id (FK), product_type, principal, rate, tenure_months, emi_amount, status

AmortizationSchedule
  - schedule_id (PK), account_id (FK), installment_no, due_date, emi, principal_component, interest_component, balance

Payment
  - payment_id (PK), account_id (FK), amount, paid_date, channel, status, receipt_no

AllocationBreakup
  - alloc_id (PK), payment_id (FK), installment_no, principal_allocated, interest_allocated, penalty_allocated

DPDRecord
  - dpd_id (PK), account_id (FK), as_of_date, days_past_due, bucket, classification

CollectionActivity
  - activity_id (PK), account_id (FK), agent_id (FK), date, type (call/visit), outcome, ptp_date

ForeclosureRequest
  - request_id (PK), account_id (FK), requested_on, settlement_amount, status
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/loans/activate                    - Activate loan from LOS
GET    /api/loans/{account_id}                - Get loan account details
GET    /api/loans/{account_id}/schedule       - Get amortization schedule
POST   /api/payments                          - Record payment
GET    /api/payments/{account_id}/history     - Payment history
POST   /api/loans/{account_id}/partpayment    - Apply part payment
GET    /api/loans/{account_id}/dpd            - Get DPD status
POST   /api/loans/{account_id}/restructure    - Initiate restructuring
POST   /api/loans/{account_id}/foreclosure    - Request foreclosure
GET    /api/reports/npa                       - NPA report
GET    /api/reports/portfolio                 - Portfolio analytics
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js (internal) / Angular (borrower portal) |
| Backend | Java Spring Boot |
| Database | Oracle / PostgreSQL |
| Cache | Redis |
| Messaging | Apache Kafka |
| Payment Gateway | Razorpay / BillDesk / NPCI NACH |
| Auth | OAuth 2.0 + MFA |
| Deployment | Private cloud / on-premise |

---

## 12. Security Considerations

- All financial transactions are immutable once posted
- Loan account data access restricted by branch/region
- MFA for all internal users
- Complete audit trail for every payment, allocation, and status change
- Data encryption at rest (AES-256) and TLS 1.3 in transit
- Regular penetration testing (financial sector requirement)

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| NPA rate | < 3% of portfolio |
| NACH mandate success rate | > 92% |
| Collections recovery rate | > 70% |
| Foreclosure TAT | < 7 business days |
| Amortization accuracy | 100% |
| Portfolio report generation time | < 2 minutes |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Loan activation, EMI schedule, account view |
| Phase 2 | Month 3 | Payment processing, NACH integration |
| Phase 3 | Month 4 | DPD, NPA classification, overdue management |
| Phase 4 | Month 5 | Collections workflow, part payment, prepayment |
| Phase 5 | Month 6 | Foreclosure, restructuring, reports |
| Go-Live | Month 7 | UAT, regulatory sign-off, production |
