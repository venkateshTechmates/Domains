# PRD — Order Management System (OMS)

## 1. Product Overview

An **Order Management System (OMS)** is a platform that manages the complete lifecycle of a customer order — from order capture through fulfillment, shipping, and post-delivery. It acts as the orchestration layer between sales channels (e-commerce, ERP, CRM), inventory systems (WMS, IMS), and logistics (TMS), ensuring that every order is fulfilled accurately, on time, and at the lowest cost.

---

## 2. Goals & Objectives

- Provide a single system of record for all customer orders across all channels
- Orchestrate multi-location, multi-channel order fulfillment intelligently
- Reduce order fulfillment errors and customer complaints
- Enable real-time order visibility for customers and operations teams
- Support flexible fulfillment: ship-from-warehouse, ship-from-store, buy-online-pickup-in-store (BOPIS)
- Automate post-order workflows: returns, exchanges, and cancellations

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Customer | Place orders, track, return |
| Sales / CSR | Order management, issue resolution |
| Warehouse / Fulfillment Team | Pick, pack, ship |
| Inventory Manager | Stock availability, reservation |
| Finance | Invoice, payments, refunds |
| Logistics / TMS Team | Carrier selection, tracking |
| IT Administrator | Integration, system config |

---

## 4. Scope

### In Scope
- Order Capture (multi-channel)
- Order Validation and Fraud Check
- Inventory Availability Check and Reservation
- Fulfillment Routing (intelligent order routing)
- Warehouse Instruction (WMS integration)
- Carrier Selection and Shipment Creation
- Order Tracking
- Invoice and Payments
- Returns, Exchanges, and Cancellations
- Customer Notifications
- Reporting and Analytics

### Out of Scope
- E-Commerce storefront / product catalog (integration only)
- Warehouse pick/pack operations (WMS scope)
- Transport route planning (TMS scope)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Operations Manager | All orders, routing rules |
| CSR | View and manage customer orders |
| Warehouse (via integration) | Fulfillment tasks |
| Finance | Invoices, payments, refunds |
| Customer | Own orders (self-service portal) |

---

## 6. Functional Requirements

### 6.1 Order Capture
- Receive orders via:
  - E-Commerce API (Shopify, WooCommerce, Magento)
  - ERP/B2B EDI
  - Manual entry by CSR
  - Mobile app / POS
- Order attributes: customer, items, quantities, shipping address, payment method, SLA
- Order reference number generation
- Duplicate order detection
- Order hold capability (manual or automated)

### 6.2 Order Validation & Fraud Check
- Address validation (pincode service ability check)
- Payment authorization confirmation from payment gateway
- Fraud scoring (velocity checks, address mismatch, CVV fail)
- Auto-cancel on failed payment
- High-risk order flagging for manual review

### 6.3 Inventory Availability & Reservation
- Real-time inventory check across all fulfillment nodes
- Soft reservation on order capture (hold stock for order)
- Hard commit on order confirmation
- Backorder handling (accept order even if out of stock, with promise date)
- Splitting orders if stock is across multiple locations

### 6.4 Intelligent Order Routing
- Fulfillment node selection: nearest warehouse, lowest cost, SLA-based
- Configurable routing rules (business rules engine)
- Split shipment: send partial from stock, rest on restock
- Store fulfillment routing (ship-from-store)
- BOPIS (Buy Online, Pickup In Store) routing

### 6.5 Warehouse Instruction (WMS Integration)
- Push pick/pack instruction to WMS
- Receive fulfillment status from WMS (Picked, Packed, Staged)
- Packing list and shipping label generation
- ASN to carrier

### 6.6 Carrier Selection & Shipment
- Auto-select carrier based on: weight, cost, SLA, pincode
- Multi-carrier support (FedEx, UPS, Delhivery, Bluedart)
- Carrier API integration for label and tracking number
- Freight cost calculation per order
- Last-mile delivery assignment
- Failed delivery reattempt management

### 6.7 Order Tracking
- Real-time shipment tracking from carrier
- Order status webhooks to e-commerce channels
- Customer-facing tracking page
- Email/SMS proactive notifications (Shipped, Out for Delivery, Delivered)
- Failed delivery alert

### 6.8 Invoice and Payments
- Auto-generate invoice on order confirmation
- Support for: prepaid, COD, credit, EMI payment types
- Payment capture on dispatch (for pre-auth payments)
- Tax calculation (GST slabs per item category)
- Partial payment and pending balance tracking
- COD reconciliation workflow

### 6.9 Returns, Exchanges & Cancellations
- Return request submission (customer or CSR)
- Return eligibility check (return window, condition)
- Reverse pickup scheduling (carrier integration)
- Return item inspection and disposition
- Refund initiation (original payment method or store credit)
- Exchange order creation on return approval
- Order cancellation and stock release

### 6.10 Reporting & Analytics
- Order volume by channel, region, and product
- Fulfillment SLA compliance report
- Carrier performance report
- Returns and refund analysis
- Backorder and stock-out impact
- Revenue by order type

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% (including peak sale events) |
| Performance | Order capture < 2 seconds, routing < 3 seconds |
| Scalability | Handle 100,000+ orders/day during peak |
| Throughput | 1000 concurrent order submissions |
| Integration | E-commerce, WMS, TMS, payment gateways, carriers |
| Mobile | CSR mobile app for order management |
| Audit | All order state changes immutably logged |

---

## 8. Key User Stories

- As a **customer**, I want to see the real-time status of my order with delivery estimate.
- As a **CSR**, I want to view a customer's full order history in one view when they call me.
- As an **operations manager**, I want orders to be automatically routed to the nearest stocked warehouse.
- As a **finance team**, I want COD orders to be reconciled daily from the courier's remittance.
- As a **customer**, I want to initiate a return from my account page and schedule a reverse pickup.
- As an **inventory manager**, I want the OMS to reserve stock the moment an order is placed.

---

## 9. Data Model (High-Level Entities)

```
Order
  - order_id (PK), channel, customer_id (FK), status, created_at, sla_date, total_amount, payment_method

OrderLine
  - line_id (PK), order_id (FK), sku, qty_ordered, qty_fulfilled, price, tax

Customer
  - customer_id (PK), name, email, phone, default_address

Address
  - address_id (PK), customer_id (FK), line1, city, state, pincode, country

FulfillmentInstruction
  - fulfillment_id (PK), order_id (FK), warehouse_id (FK), lines[], status, wms_ref

Shipment
  - shipment_id (PK), order_id (FK), carrier, tracking_no, shipped_at, status, delivery_date

Return
  - return_id (PK), order_id (FK), lines[], reason, status, refund_amount, refund_method

Invoice
  - invoice_id (PK), order_id (FK), amount, tax, status, issued_at
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/orders                          - Create order
GET    /api/orders/{id}                     - Get order details
PUT    /api/orders/{id}/confirm             - Confirm order
PUT    /api/orders/{id}/cancel              - Cancel order
GET    /api/orders/{id}/tracking            - Real-time tracking
POST   /api/orders/{id}/return              - Initiate return
POST   /api/orders/{id}/exchange            - Initiate exchange
GET    /api/customers/{id}/orders           - Customer order history
GET    /api/fulfillment/queue               - Pending fulfillment queue
POST   /api/shipments                       - Create shipment with carrier
GET    /api/reports/fulfillment-sla         - SLA report
GET    /api/reports/returns-analysis        - Returns analytics
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Mobile | React Native (CSR app) |
| Backend | Java Spring Boot / Node.js |
| Database | PostgreSQL |
| Cache | Redis (inventory reservation) |
| Queue | Apache Kafka (order events) |
| Rules Engine | Drools (routing rules) |
| Auth | OAuth 2.0 |
| Integration | REST / Webhook |
| Deployment | AWS ECS / Kubernetes |

---

## 12. Security Considerations

- Payment data (card numbers) — PCI DSS compliance; never stored
- Customer addresses and contact details — GDPR compliant
- Order data isolated per customer for self-service portal
- Fraud scoring engine running on every order — prevent chargebacks
- All order status transitions logged for audit
- CSR access limited to view-only unless specific escalation

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Order fulfillment rate | > 99% |
| On-time delivery rate | > 95% |
| Order processing time | < 2 minutes |
| Return processing time | < 3 days |
| Carrier SLA compliance | > 95% |
| Order cancellation rate | < 2% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Order capture, validation, inventory check |
| Phase 2 | Month 2 | Routing engine, WMS integration |
| Phase 3 | Month 3 | Carrier integration, shipment tracking |
| Phase 4 | Month 4 | Returns, exchanges, refunds |
| Phase 5 | Month 5 | Analytics, invoicing, CSR portal |
| Go-Live | Month 6 | All channel integration, production launch |
