# PRD — Portfolio Management System (PMS - Finance)

## 1. Product Overview

A **Portfolio Management System (PMS)** in the financial domain is a platform used by investment managers, wealth managers, and financial institutions to manage investment portfolios — tracking asset allocation, performance, risk exposure, rebalancing, and reporting across equity, fixed income, alternatives, and other asset classes.

---

## 2. Goals & Objectives

- Provide real-time portfolio valuation and performance analytics
- Enable systematic portfolio construction and rebalancing
- Manage compliance with regulatory and mandate-based investment restrictions
- Deliver transparent, branded reporting to investors and clients
- Support multi-asset, multi-currency, multi-manager portfolios
- Reduce operational risk through automation of trade and settlement workflows

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Portfolio Manager | Strategy, allocation, trades |
| Research Analyst | Model portfolio, stock recommendations |
| Relationship Manager | Client communication, reporting |
| Risk Officer | Risk monitoring, limit management |
| Compliance Officer | SEBI/regulatory compliance |
| Operations / Back Office | Trade settlement, reconciliation |
| Client / Investor | Portfolio view, reports |

---

## 4. Scope

### In Scope
- Client and Account Onboarding
- Portfolio Construction and Model Portfolios
- Trade Order Management
- Asset Allocation and Rebalancing
- Performance Measurement
- Risk Analytics
- Compliance Management
- Fee and Billing
- Client Reporting
- Portfolio Accounting and Reconciliation

### Out of Scope
- Brokerage / execution infrastructure
- Tax return filing (integration only)
- Mutual fund distribution (advisory only)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Portfolio Manager | Full portfolio management |
| Research Analyst | Model portfolios, read-only on clients |
| Operations | Trade blotter, settlement |
| Compliance | Restriction monitoring, reports |
| Client Portal | Own portfolio view only |
| Risk Officer | Risk dashboards |

---

## 6. Functional Requirements

### 6.1 Client & Account Management
- Client onboarding with investment profile (risk appetite, horizon, goals)
- Investment mandate and IPS (Investment Policy Statement) setup
- Account types: PMS, AIF, Discretionary, Advisory
- Multi-account client (individual + family grouping)
- Client portal access provisioning

### 6.2 Portfolio Construction
- Model portfolio creation (benchmark-relative or absolute return)
- Asset class and sector allocation targets
- Security-level target weights
- Model portfolio versioning and approval
- Map client portfolios to models (discretionary)

### 6.3 Trade Order Management
- Order generation from rebalancing engine
- Block trading (one order for multiple client accounts)
- Order routing to broker systems
- Trade confirmation receipt
- Average price allocation across clients (fair allocation)
- Trade blotter view

### 6.4 Rebalancing
- Drift-based rebalancing (threshold breach)
- Cash deployment on inflow
- Tax-aware rebalancing (minimize tax impact)
- Rebalancing proposal for advisory clients
- Auto-execute for discretionary mandates
- Drift report

### 6.5 Performance Measurement
- Time-Weighted Return (TWR) calculation
- Money-Weighted Return (IRR / MWR)
- Benchmark comparison (Nifty, MSCI, custom)
- Attribution analysis (allocation vs. selection vs. interaction)
- Rolling period returns (1M, 3M, 6M, 1Y, 3Y, 5Y, inception)
- Portfolio contribution by security

### 6.6 Risk Analytics
- Portfolio beta and volatility
- Value at Risk (VaR) — parametric and historical
- Drawdown analysis (max drawdown, recovery period)
- Concentration risk (sector, security, geography)
- Stress testing (scenario analysis)
- Factor exposure (growth, value, momentum)

### 6.7 Compliance Management
- Pre-trade compliance check (investment restrictions)
- Post-trade breach detection
- Investment mandate guideline encoding
- SEBI PMS regulations compliance
- Restricted securities list management
- Compliance report generation

### 6.8 Fee and Billing
- Fee structure setup: management fee, performance fee (high watermark)
- Fee accrual and calculation
- Fee invoice generation
- Client-wise P&L net of fees
- Hurdle rate and clawback support

### 6.9 Client Reporting
- Monthly and quarterly portfolio report (PDF)
- Customizable report templates
- Holdings, transactions, performance, risk sections
- White-labeled report branding
- Automated scheduled report delivery

### 6.10 Accounting & Reconciliation
- Portfolio accounting (cost basis tracking, FIFO/LIFO)
- Cash and position reconciliation with custodian
- Corporate action processing (dividends, splits, bonus)
- Unrealized and realized gain/loss tracking
- NAV computation

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% |
| Performance | Portfolio valuation < 3 seconds |
| Scalability | 10,000+ client accounts, 100,000+ positions |
| Security | RBAC, data isolation per client |
| Compliance | SEBI PMS, MiFID II, GDPR |
| Market Data | Price feeds (NSE/BSE, Bloomberg, Reuters) |
| Audit | Immutable trade and order audit trail |

---

## 8. Key User Stories

- As a **portfolio manager**, I want to rebalance all drifted client portfolios with one click after generating trade orders.
- As a **client**, I want to see my portfolio performance against the benchmark in my online portal.
- As a **compliance officer**, I want pre-trade alerts when a trade would breach concentration limits.
- As a **RM**, I want to share a branded PDF report with a client showing their performance and holdings.
- As a **risk officer**, I want to see all portfolios with VaR exceeding their allowed limit today.
- As an **operations**, I want trade confirmations reconciled automatically against broker files.

---

## 9. Data Model (High-Level Entities)

```
Client
  - client_id (PK), name, risk_profile, mandate_id (FK), segment

Portfolio
  - portfolio_id (PK), client_id (FK), name, type, inception_date, benchmark_id, model_id

Position
  - position_id (PK), portfolio_id (FK), security_id (FK), quantity, avg_cost, current_value

Transaction (Trade)
  - txn_id (PK), portfolio_id (FK), security_id (FK), type (Buy/Sell), qty, price, date, broker, settlement_date

Security
  - security_id (PK), ticker, name, asset_class, exchange, sector, currency

PerformanceRecord
  - perf_id (PK), portfolio_id (FK), as_of_date, twr, benchmark_return, alpha

Compliance Rule
  - rule_id (PK), mandate_id (FK), rule_type, limit_value, asset_class

Fee
  - fee_id (PK), portfolio_id (FK), fee_type, rate, accrued, billed
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/clients                           - Onboard client
POST   /api/portfolios                        - Create portfolio
GET    /api/portfolios/{id}/holdings          - Get current holdings
GET    /api/portfolios/{id}/performance       - Get performance metrics
POST   /api/portfolios/{id}/rebalance         - Generate rebalancing orders
GET    /api/portfolios/{id}/risk              - Risk analytics
POST   /api/trades                            - Submit trade order
POST   /api/compliance/pre-trade-check        - Pre-trade compliance
GET    /api/reports/{portfolio_id}/quarterly  - Generate quarterly report
GET    /api/portfolios/{id}/nav               - Get portfolio NAV
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Client Portal | React.js (separate domain) |
| Backend | Python (quantitative analytics) + Java (operations) |
| Database | PostgreSQL + TimescaleDB (time-series) |
| Market Data | Bloomberg API / Refinitiv / NSE API |
| Cache | Redis |
| Queue | Apache Kafka |
| Auth | OAuth 2.0 + MFA |
| Deployment | Private cloud / AWS |

---

## 12. Security Considerations

- Client portfolio data completely isolated (no cross-client data access)
- All trades and orders are immutable once confirmed
- MFA for portfolio managers and compliance
- Data masking for client sensitive information
- Compliance pre-trade checks are non-bypassable
- SEBI audit log retention for 7+ years

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Portfolio alpha vs benchmark | > 2% p.a. |
| Compliance breach incidents | 0 per quarter |
| Client report accuracy | 100% |
| Rebalancing execution time | < 30 minutes |
| Reconciliation break rate | < 0.1% |
| Client portal adoption | > 80% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Client/portfolio setup, holdings, positions |
| Phase 2 | Month 3 | Trade OMS, performance calculation |
| Phase 3 | Month 4 | Risk analytics, compliance engine |
| Phase 4 | Month 5 | Rebalancing, fee billing |
| Phase 5 | Month 6 | Client portal, reporting automation |
| Go-Live | Month 7 | UAT, regulatory review, production |
