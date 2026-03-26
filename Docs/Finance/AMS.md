# PRD — Account Management System (AMS)

## 1. Product Overview

An **Account Management System (AMS)** in the banking and financial context is a platform that manages customer financial accounts — savings, current, fixed deposits, recurring deposits, and credit accounts. It handles account opening, balance management, transaction processing, statements, and account servicing across all banking channels.

---

## 2. Goals & Objectives

- Provide a digital, paperless account opening and servicing experience
- Maintain accurate real-time account balances and transaction ledgers
- Support multi-channel banking (branch, online, mobile, ATM)
- Ensure compliance with KYC, AML, and regulatory requirements
- Deliver self-service capabilities to reduce branch workload
- Integrate seamlessly with Core Banking Systems (CBS)

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Customer / Account Holder | Open accounts, transactions, statements |
| Branch Manager / RM | Account servicing, approvals |
| Teller | Counter transactions, account operations |
| Operations / Back Office | Account maintenance, documentation |
| Compliance Officer | KYC, AML, dormancy |
| Finance / Accounting | Balance reconciliation, GL postings |
| IT Administrator | System configuration, integrations |

---

## 4. Scope

### In Scope
- Account Opening (Savings, Current, FD, RD)
- KYC and Document Management
- Account Profile Management
- Transaction Processing (Deposits, Withdrawals, Transfers)
- Interest Calculation and Posting
- Account Statements
- Account Servicing (address change, mandate, nominee update)
- Dormant Account Management
- Account Closure
- Reports and Audit

### Out of Scope
- Loan management (LMS scope)
- Credit card management
- Treasury and investment products
- Core Banking System (integration only)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Customer (Online Banking) | Own accounts only |
| Branch Manager | All accounts at branch |
| Teller | Counter transactions |
| Operations Officer | Account maintenance |
| Compliance | KYC, AML, dormancy |
| Auditor | Read-only complete audit |

---

## 6. Functional Requirements

### 6.1 Account Opening
- Digital account opening form (personal, address, employment, financial details)
- Account type selection: Savings, Current, FD, RD
- Nominee addition
- KYC document upload and verification
- e-KYC (Aadhaar OTP-based)
- Account number generation
- Debit card issuance trigger
- Welcome kit dispatch

### 6.2 KYC & Compliance
- PAN, Aadhaar verification with government systems
- CDD (Customer Due Diligence) forms
- Risk category classification (Low / Medium / High)
- Periodic KYC renewal reminders and workflow
- AML transaction monitoring (unusual activity flags)
- FATCA / CRS compliance

### 6.3 Account Profile Management
- View and update personal details (address, phone, email)
- Nominee management (add, modify, delete)
- Joint account holder management
- Mandate and auto-debit registration
- Change of signature registration
- Account type upgrade/downgrade

### 6.4 Transaction Processing
- Cash deposit and withdrawal at counter
- Internal fund transfers (between own accounts)
- NEFT, RTGS, IMPS outward payments
- Inward credit posting
- Cheque deposit and clearing tracking
- Stop payment instructions
- Transaction reference tracking

### 6.5 Interest Calculation
- Savings account: daily balance method
- Fixed Deposit: compound/simple interest per product
- Recurring Deposit: maturity amount calculation
- Quarterly/monthly interest credit
- TDS deduction on interest (15G / 15H check)

### 6.6 Account Statements
- On-demand statement generation (date range)
- Mini statement (last 10 transactions)
- Monthly e-statement delivery by email
- PDF and CSV download
- Passbook update simulation (online)

### 6.7 Fixed & Recurring Deposits
- FD booking with tenor, rate, payout option (monthly/quarterly/maturity)
- Auto-renewal setup
- Premature withdrawal with penalty calculation
- RD installment collection and schedule
- Maturity alert and proceeds credit

### 6.8 Dormant Account Management
- Identify accounts with no transaction for 12/24 months
- Dormant notification letters
- Dormant activation request workflow
- Unclaimed deposit transfer to RBI (10-year rule)

### 6.9 Account Closure
- Closure request submission
- Balance settlement (withdraw remaining balance)
- Standing instructions cancellation
- Demat/locker de-linking
- Closure confirmation letter

### 6.10 Reports & Audit
- Account opening TAT
- Daily transaction summary per branch
- Dormant accounts report
- KYC expiry report
- Interest payout report
- AML flagged transaction report
- Balance sheet reconciliation

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.99% |
| Performance | Transaction processing < 2 seconds |
| Scalability | 10M+ accounts |
| Security | AES-256 encryption, MFA, session management |
| Compliance | RBI, KYC/AML, FATCA, GDPR |
| Integration | CBS, payment rails (NEFT/RTGS/UPI), e-KYC |
| Audit | Immutable transaction ledger |

---

## 8. Key User Stories

- As a **customer**, I want to open a savings account digitally from home without visiting a branch.
- As a **teller**, I want to process a cash deposit and print a receipt in under 2 minutes.
- As a **customer**, I want to download my 6-month account statement as a PDF at any time.
- As a **compliance officer**, I want a report of all accounts with expired KYC so I can initiate renewal.
- As an **RM**, I want to see a 360-degree view of a customer's accounts when they call me.
- As a **customer**, I want to book an FD online and see my maturity date and amount immediately.

---

## 9. Data Model (High-Level Entities)

```
Customer
  - customer_id (PK), cif_number, name, kyc_status, risk_category, created_at

Account
  - account_id (PK), account_number, customer_id (FK), type, product_code, status, opened_date, branch_id

Balance
  - balance_id (PK), account_id (FK), available_balance, ledger_balance, last_updated

Transaction
  - txn_id (PK), account_id (FK), date, type (CR/DR), amount, description, channel, reference_no, balance_after

FixedDeposit
  - fd_id (PK), account_id (FK), principal, rate, tenor_days, start_date, maturity_date, payout_option, status

Document
  - doc_id (PK), customer_id (FK), doc_type, file_url, verified, expiry_date

AMLFlag
  - flag_id (PK), account_id (FK), txn_id (FK), rule_triggered, flagged_at, reviewed, resolution
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/customers                        - Create customer (CIF)
POST   /api/accounts                         - Open account
GET    /api/accounts/{id}/balance            - Get account balance
POST   /api/transactions                     - Post transaction
GET    /api/accounts/{id}/transactions       - Get transaction history
GET    /api/accounts/{id}/statement          - Download statement (date range)
POST   /api/fixed-deposits                   - Book FD
PUT    /api/fixed-deposits/{id}/redeem       - Redeem FD
POST   /api/accounts/{id}/transfer           - Fund transfer
PUT    /api/accounts/{id}/dormant-activate   - Activate dormant account
GET    /api/reports/kyc-expiry               - KYC expiry report
GET    /api/reports/aml-flags                - AML flagged transactions
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js (internet banking) |
| Mobile | React Native (mobile banking) |
| Backend | Java Spring Boot |
| Database | Oracle / PostgreSQL |
| Cache | Redis |
| Messaging | IBM MQ / Apache Kafka |
| Auth | OAuth 2.0 + MFA (OTP) |
| Core Banking | Finacle / Temenos (integration) |
| Deployment | Private cloud / co-location |

---

## 12. Security Considerations

- All transactions require re-authentication above threshold amount
- Account balances masked in UI — only partial display
- AML rule engine for transaction monitoring
- Failed login lockout after 3 attempts
- Immutable ledger — all entries are append-only
- Segregation of duties for account opening and approval

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Account opening TAT | < 1 business day |
| KYC compliance rate | 100% |
| Transaction processing time | < 2 seconds |
| Statement availability | Real-time |
| AML flag false positive rate | < 10% |
| Digital channel adoption | > 70% of transactions |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Account opening, KYC, customer master |
| Phase 2 | Month 3 | Transaction processing, statements |
| Phase 3 | Month 4 | FD/RD, interest calculations |
| Phase 4 | Month 5 | Dormant management, closure, compliance |
| Phase 5 | Month 6 | AML, reports, CBS integration |
| Go-Live | Month 7 | UAT and production launch |
