# PRD — Payment Gateway System

## 1. Product Overview

A **Payment Gateway System** is the technology infrastructure that securely processes payment transactions between customers (buyers), merchants, and financial institutions (banks, card networks). It handles payment initiation, authorization, authentication, settlement, and reconciliation — supporting multiple payment methods (cards, UPI, net banking, wallets, BNPL, EMI) across web, mobile, and in-store channels.

---

## 2. Goals & Objectives

- Process payment transactions securely and reliably at high throughput
- Support all popular payment methods in the target market
- Achieve the highest possible authorization success rates
- Protect merchants and customers from fraud
- Provide real-time transaction visibility and merchant dashboard
- Enable seamless settlement and reconciliation for merchants
- Maintain PCI DSS Level 1 compliance at all times

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Customer / Payer | Initiate payments, refunds |
| Merchant | Accept payments, manage payouts |
| Acquirer Bank | Settlement processing |
| Issuer Bank | Customer account, authorization |
| Card Networks | Visa, Mastercard, RuPay — transaction routing |
| Risk / Fraud Team | Fraud scoring and risk management |
| Compliance Officer | PCI DSS, RBI, regulatory |
| IT / Engineering | Integration and reliability |

---

## 4. Scope

### In Scope
- Payment Initiation via APIs (web, mobile, server-to-server)
- Payment Methods: Cards (Debit/Credit), UPI, Net Banking, Wallets, BNPL, EMI
- 3D Secure / OTP Authentication
- Authorization and Response Handling
- Payment Page (Hosted) and JS SDK (Embedded)
- Refunds and Partial Refunds
- Recurring Payments and Subscriptions
- Payment Links
- Fraud Detection and Risk Management
- Settlement and Payouts
- Merchant Dashboard
- Webhooks and Notifications
- Reporting and Reconciliation

### Out of Scope
- Core banking system
- Merchant acquiring infrastructure (integration only)
- Cross-border SWIFT remittances (Level 2)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system, all merchants |
| Merchant Admin | Own transactions, refunds, payouts |
| Merchant Finance | Reports and reconciliation |
| Risk Analyst | Fraud alert management |
| Compliance | Audit logs, regulatory reports |
| Developer (Merchant) | API keys, webhooks |
| Customer | Masked transaction view (receipt portal) |

---

## 6. Functional Requirements

### 6.1 Payment Initiation
- REST API for payment creation (Order ID, amount, currency, method)
- Hosted payment page (redirect flow)
- Embedded payment UI (JS SDK with iFrame)
- Mobile SDK (iOS, Android)
- QR code for UPI and in-store
- Payment link generation (share via SMS/email/WhatsApp)

### 6.2 Payment Methods
- **Cards**: Visa, Mastercard, Amex, RuPay (Debit + Credit)
- **UPI**: Collect and intent flows, UPI Autopay
- **Net Banking**: 50+ banks
- **Wallets**: Paytm, PhonePe, Amazon Pay
- **BNPL**: ZestMoney, Simpl, LazyPay
- **EMI**: Bank EMI and cardless EMI
- **Pay Later** / credit instruments
- **International Cards**: via global acquirer routing

### 6.3 Authentication
- 3D Secure 2.0 (frictionless and challenge flows)
- OTP-based authentication for UPI and Net Banking
- Biometric authentication support on mobile SDK
- Risk-based authentication (skip 3DS for low-risk transactions)

### 6.4 Authorization & Routing
- Smart routing engine: select best acquirer per card BIN and transaction type
- Automatic failover to backup acquirer on decline
- Soft decline retry logic (insufficient funds, technical error distinction)
- BIN-based issuer identification
- Dynamic currency conversion (DCC) for international cards

### 6.5 Refunds
- Full and partial refund initiation via API and dashboard
- Refund tracking (initiated → processed → settled)
- Refund timeline per payment method (card: 5–7 days, UPI: instant)
- Instant refund (via UPI) where eligible
- Bulk refund upload

### 6.6 Recurring Payments & Subscriptions
- Mandate creation (UPI, NACH, credit card)
- Recurring charge execution (daily, weekly, monthly)
- Mandate amendment and cancellation
- Pre-debit notification to customer (RBI mandate rules)
- Failed recurring transaction retry
- Subscription management API

### 6.7 Fraud Detection & Risk Management
- Real-time transaction scoring (rule-based + ML model)
- Risk signals: high velocity, unusual amount, suspicious IP/device
- Block list management (cards, IPs, emails, devices)
- 3DS step-up for medium-risk transactions
- Merchant-defined risk rules
- Chargeback management workflow
- Fraud analytics dashboard

### 6.8 Settlement & Payouts
- T+1 / T+2 settlement cycle to merchant bank account
- Settlement file generation (batch)
- Merchant account balance view
- Payout scheduling (automatic or manual trigger)
- Marketplace split settlement (marketplace → seller payout)
- Failed settlement retry and alert

### 6.9 Merchant Dashboard
- Real-time transaction view (search, filter, export)
- Refund initiation UI
- Settlement and payout history
- API key management
- Webhook configuration
- Dispute and chargeback management
- Analytics: volume, success rate, method-wise breakdown

### 6.10 Webhooks & Notifications
- Real-time webhooks on: payment success, failure, refund, chargeback
- Retry logic for failed webhook deliveries (exponential backoff)
- Webhook signature verification (HMAC)
- Customer-facing notifications: SMS, email, WhatsApp on payment events

### 6.11 Reporting & Reconciliation
- Transaction report (date range, filter by method, status, merchant)
- Settlement report (mapping payments to settlement batches)
- Chargeback report
- Tax (TDS) report
- Daily reconciliation file export (download for accounting)

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.99% (four nines) |
| Throughput | 5,000+ TPS (transactions per second) |
| Latency | API response < 300ms P99 |
| Security | PCI DSS Level 1, TLS 1.3, tokenization |
| Fraud | < 0.05% fraud rate on processed volume |
| Compliance | RBI payment guidelines, PCI DSS, GDPR |
| Scalability | Auto-scale during peak sale events |
| DR | RPO < 1 min, RTO < 5 min |

---

## 8. Key User Stories

- As a **customer**, I want to pay with UPI in under 5 seconds without leaving the merchant's app.
- As a **merchant**, I want refunds to be processed with a single API call so my support team can resolve issues fast.
- As a **risk analyst**, I want high-risk transactions flagged automatically before they are processed.
- As a **merchant finance**, I want a daily reconciliation file so I can match my sales with settlements.
- As a **developer**, I want a sandbox environment identical to production for testing all payment flows.
- As a **customer**, I want to set up a monthly subscription and receive a notification 24 hours before each charge.

---

## 9. Data Model (High-Level Entities)

```
Merchant
  - merchant_id (PK), name, business_type, bank_account, api_key, settlement_cycle

PaymentOrder
  - order_id (PK), merchant_id (FK), amount, currency, method, customer_id, status, created_at

Transaction
  - txn_id (PK), order_id (FK), payment_method, amount, bank_ref, acquirer_id, auth_code, status, processed_at

Refund
  - refund_id (PK), txn_id (FK), amount, reason, status, refund_ref, initiated_at, settled_at

Subscription / Mandate
  - subscription_id (PK), customer_id (FK), merchant_id (FK), amount, frequency, next_charge_date, status

FraudScore
  - score_id (PK), txn_id (FK), risk_score, signals[], action (allow/block/review)

Settlement
  - settlement_id (PK), merchant_id (FK), period, gross_amount, fees, net_amount, status, settled_at

Chargeback
  - cb_id (PK), txn_id (FK), merchant_id (FK), reason, status, due_date, resolution
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/v1/orders                        - Create payment order
GET    /api/v1/orders/{id}                   - Get order status
POST   /api/v1/payments                      - Initiate payment
GET    /api/v1/payments/{id}                 - Get transaction details
POST   /api/v1/refunds                       - Initiate refund
GET    /api/v1/refunds/{id}                  - Refund status
POST   /api/v1/subscriptions                 - Create subscription mandate
DELETE /api/v1/subscriptions/{id}            - Cancel subscription
GET    /api/v1/settlements                   - Settlement history
POST   /api/v1/webhooks                      - Register webhook endpoint
GET    /api/v1/reports/transactions          - Transaction report
GET    /api/v1/reports/reconciliation        - Settlement reconciliation
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| API Gateway | Kong / AWS API Gateway |
| Backend | Java Spring Boot / Go |
| Database | PostgreSQL (transactions) + Cassandra (high write) |
| Cache | Redis (session, rate limits, token) |
| Queue | Apache Kafka |
| Fraud Engine | Python ML model + rule engine |
| Card Tokenization | Vault (HashiCorp) / HSM |
| Auth | OAuth 2.0 + API Key + HMAC |
| Deployment | Kubernetes (multi-AZ, multi-region) |
| Monitoring | Prometheus + Grafana + PagerDuty |

---

## 12. Security Considerations

- **PCI DSS Level 1 compliance**: all card data vaulted and tokenized immediately
- No card numbers ever stored in application database — only tokens
- All communication over TLS 1.3 (no TLS 1.0/1.1)
- 3D Secure 2.0 for card-not-present authentication
- API keys hashed and never stored in plaintext
- HSM-backed cryptographic key management
- IP whitelisting for server-to-server merchant API calls
- DDoS protection via CDN and WAF
- Penetration testing quarterly + PCI annual audit

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Payment success rate | > 95% |
| API availability | > 99.99% |
| Authorization latency (P99) | < 300ms |
| Fraud rate | < 0.05% |
| Chargeback rate | < 0.1% |
| Settlement on time | > 99.5% |
| Time to first API integration | < 2 hours for developer |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Card payment, UPI, hosted page, API |
| Phase 2 | Month 3 | Net banking, wallets, refunds |
| Phase 3 | Month 4 | 3DS 2.0, fraud detection, smart routing |
| Phase 4 | Month 5 | Recurring payments, subscriptions |
| Phase 5 | Month 6 | Settlement, payouts, merchant dashboard |
| Phase 6 | Month 7 | Payment links, BNPL, EMI |
| Go-Live | Month 8 | PCI audit, load testing, production launch |
