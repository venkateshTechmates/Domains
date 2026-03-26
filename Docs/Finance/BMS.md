# PRD — Banking Management System (BMS)

## 1. Product Overview

A **Banking Management System (BMS)** is a comprehensive platform that manages the core operations of a bank — including customer management, account operations, lending, treasury, teller operations, and regulatory compliance. It acts as the operational backbone of a bank, integrating front-office, mid-office, and back-office functions.

---

## 2. Goals & Objectives

- Centralize all banking operations in a unified platform
- Enable branch and digital banking operations seamlessly
- Ensure real-time transaction processing with core banking integration
- Maintain regulatory compliance (RBI, Basel III, AML, KYC)
- Provide leadership with real-time banking performance analytics
- Support multi-branch, multi-currency, multi-product banking

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Bank CEO / CFO | Performance dashboards, strategic decisions |
| Branch Manager | Branch operations, approvals |
| Teller | Counter transactions |
| Relationship Manager | Customer servicing, products |
| Credit Officer | Loan processing and approvals |
| Treasury Officer | Funds management |
| Compliance / Audit | Regulatory reporting, risk |
| IT Administrator | System management |

---

## 4. Scope

### In Scope
- Customer Information File (CIF) Management
- Account Management (Savings, Current, FD, RD)
- Teller Operations
- Lending (Retail & Corporate)
- Treasury Management
- Trade Finance
- Regulatory Reporting
- Branch Management
- General Ledger
- Digital Banking (Internet Banking, Mobile)

### Out of Scope
- Insurance underwriting
- Broking / stock trading
- Payment switch infrastructure

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Branch Manager | Branch-level all operations |
| Teller | Counter transactions only |
| Relationship Manager | Customer accounts and products |
| Credit Officer | Loan modules |
| Treasury officer | Treasury module |
| Compliance | Reports, audit trail |
| Customer (Digital) | Own accounts via portal/app |

---

## 6. Functional Requirements

### 6.1 Customer Information File (CIF)
- Single customer view across all products
- CIF creation with full KYC
- Customer segmentation (Retail, SME, Corporate, HNI)
- Relationship mapping (group entities, family accounts)
- 360-degree customer dashboard

### 6.2 Account Operations
- Account opening (Savings, Current, FD, RD, NRE, NRO)
- Account maintenance (nominee, address, mandate updates)
- Dormancy and re-activation management
- Account closure workflow
- (Detailed in AMS PRD)

### 6.3 Teller Operations
- Cash deposit and withdrawal with drawer management
- Cheque deposit, stop-payment
- Demand draft issuance
- Cash denomination tracking
- Vault opening/closing with dual control
- Teller cash balancing at end of day

### 6.4 Retail and Corporate Lending
- Loan origination integration (LOS)
- Loan account management (LMS)
- Credit limit management for corporate customers
- Working capital (OD, CC) management
- Trade and receivable financing

### 6.5 Treasury Management
- Liquidity and cash position view
- Interbank placements and borrowings
- Foreign exchange (FX) management
- Investment portfolio (G-Secs, T-Bills, Bonds)
- ALM (Asset Liability Management) data
- ALCO reporting

### 6.6 Trade Finance
- Letter of Credit (LC) issuance and advising
- Bank Guarantee (BG) issuance
- Documentary collections
- Import and export bill processing
- Trade limit tracking

### 6.7 General Ledger
- Chart of accounts for banking
- Automated posting from transactions
- Inter-branch reconciliation
- Daily balance sheet generation
- Month-end closing

### 6.8 Regulatory Reporting
- RBI returns (SLR, CRR, CRAR)
- Basel III capital adequacy computation
- CRILC / NPA reporting
- AML/CTF suspicious transaction reporting
- Annual and quarterly financial statements

### 6.9 Digital Banking
- Internet banking portal
- Mobile banking app
- UPI, NEFT, RTGS, IMPS
- Account statement, FD booking
- Loan EMI payment
- Bill payments and recharges

### 6.10 Branch Management
- Branch master and hierarchy
- Branch P&L
- Staff allocation per branch
- Branch-level KPI dashboard

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.999% (five nines) |
| Performance | Transaction < 1 second, GL posting < 2 seconds |
| Scalability | 100M+ transactions per day |
| Security | TLS 1.3, HSM for keys, MFA |
| Compliance | RBI, Basel III, FATCA, AML |
| Disaster Recovery | RPO < 15 min, RTO < 30 min |
| Integration | NPCI, SWIFT, CBS, payment gateways |

---

## 8. Key User Stories

- As a **teller**, I want to process a cash withdrawal in under 1 minute with a printed receipt.
- As a **RM**, I want a single 360-degree customer view across all their accounts and loans.
- As a **branch manager**, I want end-of-day cash balancing to happen automatically.
- As a **treasury officer**, I want to see the bank's daily liquidity position first thing in the morning.
- As a **compliance officer**, I want suspicious transactions flagged automatically for SAR filing.
- As a **CFO**, I want month-end P&L generated automatically without manual journal entries.

---

## 9. Data Model (High-Level Entities)

```
Customer (CIF)
  - cif_id (PK), cif_number, name, segment, kyc_status, risk_rating

Account
  - account_id (PK), account_no, cif_id (FK), type, product, balance, status, branch_id

Transaction
  - txn_id (PK), account_id (FK), date, type, amount, channel, reference, posting_date

Teller Session
  - session_id (PK), teller_id, branch_id, date, opening_cash, closing_cash, status

LoanAccount → see LMS PRD
FD → see AMS PRD

Treasury Deal
  - deal_id (PK), type, counterparty, amount, currency, rate, start_date, maturity_date

GL Entry
  - entry_id (PK), account_code, date, debit, credit, narration, reference

Branch
  - branch_id (PK), name, code, region_id, manager_id
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/cif                              - Create customer CIF
GET    /api/cif/{id}/360-view               - Customer 360 view
POST   /api/teller/deposit                   - Cash deposit
POST   /api/teller/withdrawal                - Cash withdrawal
POST   /api/transfers/neft                   - NEFT transfer initiation
GET    /api/accounts/{id}/balance            - Get balance
GET    /api/reports/branch-summary           - Branch daily summary
GET    /api/reports/liquidity                - Treasury liquidity position
GET    /api/reports/npa                      - NPA report
GET    /api/regulatory/rbi-returns           - RBI return data
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Core Banking | Finacle / Temenos / in-house Java |
| Frontend | React.js (staff) + React Native (mobile) |
| Backend | Java Spring Boot |
| Database | Oracle / DB2 |
| Messaging | IBM MQ |
| Auth | HSM-backed PKI + MFA |
| Integration | SWIFT, NPCI API gateway |
| Deployment | On-premise / private cloud |

---

## 12. Security Considerations

- Hardware Security Module (HSM) for cryptographic key management
- Dual control for vault operations and large transactions
- All transactions digitally signed
- SWIFT messaging secured with SWIFT CSP framework
- Penetration testing by RBI-approved firms
- SOC operations center for 24/7 threat monitoring

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Transaction STP rate | > 99% |
| End-of-day processing time | < 2 hours |
| CRAR compliance | > 15% |
| NPA ratio | < 3% |
| Digital transaction share | > 75% |
| Regulatory return filing on time | 100% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–3 | CIF, account management, teller ops |
| Phase 2 | Month 4–5 | Lending integration (LOS/LMS) |
| Phase 3 | Month 6–7 | GL, regulatory reporting |
| Phase 4 | Month 8–9 | Treasury, trade finance |
| Phase 5 | Month 10-11 | Digital banking (internet + mobile) |
| Go-Live | Month 12 | Full rollout and regulatory certification |
