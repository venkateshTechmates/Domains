# PRD — Supply Chain Management (SCM)

## 1. Product Overview

A **Supply Chain Management (SCM)** system is a platform that plans, coordinates, and optimizes the end-to-end flow of goods, information, and finances — from raw material suppliers through manufacturing, distribution, and retail to the end customer. It provides demand planning, supply planning, procurement, production scheduling, distribution, and supply chain analytics.

---

## 2. Goals & Objectives

- Achieve end-to-end supply chain visibility from supplier to customer
- Improve demand forecast accuracy to reduce stockouts and overstock
- Optimize inventory levels and working capital across the network
- Reduce supply chain lead times and costs
- Enable proactive risk management and disruption response
- Support sustainable and ethical supply chain practices

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Supply Chain Director | Strategy, network design, KPIs |
| Demand Planner | Forecast creation and consensus |
| Supply Planner | Production and procurement plans |
| Procurement Manager | Supplier management, POs |
| Logistics Manager | Distribution, freight |
| Warehouse Manager | DC operations |
| Finance | Cost, working capital |
| IT Administrator | Integration, system config |

---

## 4. Scope

### In Scope
- Demand Planning and Forecasting
- Supply Planning (S&OP)
- Procurement and Supplier Management
- Inventory Optimization
- Production Planning (MPS / MRP)
- Distribution Network Management
- Inbound and Outbound Logistics Coordination
- Supply Chain Control Tower (visibility)
- Risk Management
- Analytics and Reporting

### Out of Scope
- Warehouse physical operations (WMS scope)
- In-transit tracking (TMS scope)
- Financial accounting (ERP scope)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Supply Chain Director | All modules, dashboards |
| Demand Planner | Demand planning module |
| Supply Planner | Supply plan, inventory |
| Procurement Manager | Procurement, suppliers |
| Logistics Coordinator | Distribution, carrier planning |
| Finance Analyst | Cost and working capital reports |
| Viewer | Read-only dashboards |

---

## 6. Functional Requirements

### 6.1 Demand Planning & Forecasting
- Statistical baseline forecast (moving average, exponential smoothing, ARIMA)
- ML-based demand prediction (seasonality, trends, events)
- Demand sensing (short-horizon POS/order data)
- Collaborative forecasting (commercial + operations consensus)
- Promotional event planning (demand uplift modeling)
- New product introduction (NPI) forecasting
- Forecast accuracy tracking (MAPE, WMAPE, bias)

### 6.2 Sales & Operations Planning (S&OP)
- Monthly S&OP process workflow
- Demand review → Supply review → Financial review → Executive approval
- Scenario planning (best case / base case / worst case)
- Demand-supply gap analysis
- Rolling 12-month plan
- Minutes and action items tracking per S&OP cycle

### 6.3 Supply Planning
- Constrained supply plan (against production and supplier capacity)
- Safety stock calculation per product per location
- Replenishment plan generation (DRP — Distribution Requirements Planning)
- Planned order generation (MPS / MRP)
- Supply exception management (shortage, overstock alerts)

### 6.4 Procurement & Supplier Management
- Supplier master and qualification
- Supplier performance scorecard (OTD, quality, cost)
- RFQ / RFP management
- Contract management (pricing, terms, lead time)
- PO creation from supply plan
- PO acknowledgment and confirmation tracking
- Supplier collaboration portal
- Supplier risk assessment (single source, country risk)

### 6.5 Inventory Optimization
- Multi-echelon inventory optimization
- ABC-XYZ segmentation
- Optimal safety stock and reorder points calculation
- Excess and obsolete (E&O) inventory identification
- Inventory health score per category / location
- Slow-moving inventory disposition recommendations

### 6.6 Production Planning (MPS / MRP)
- Master Production Schedule (MPS) creation
- Material Requirements Planning (MRP) explosion
- Capacity requirements planning (CRP)
- Production work order release
- Production schedule adjustments on constraint
- BOM and routing management

### 6.7 Distribution Network Management
- Distribution Center (DC) network design analysis
- Allocation and deployment planning (push vs. pull)
- Inter-DC and DC-to-store replenishment planning
- Hub-and-spoke vs. direct distribution modeling
- Service level zoning

### 6.8 Supply Chain Control Tower
- End-to-end visibility: purchase orders, in-transit, DC stock, store stock
- Exception and alert management (late POs, stockouts, over-stock)
- KPI dashboards (OTIF, fill rate, days of supply)
- Root cause analysis on supply chain failures
- External event feed (weather, port disruptions, supplier news)

### 6.9 Risk Management
- Supply risk register (supplier, region, commodity)
- Risk scoring and mitigation planning
- Business continuity planning (alternate sourcing)
- Disruption response workflows
- Single-source dependency alerts

### 6.10 Analytics & Reporting
- Supply chain performance dashboard (OTIF, service level, costs)
- Demand vs. supply gap reports
- Inventory days of supply (DOS)
- Forecast accuracy reports (MAPE trend)
- Procurement savings and spend analytics
- Carbon footprint tracking

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% |
| Performance | Forecast computation for 10K SKUs < 30 minutes |
| Scalability | Handle global multi-node supply chains |
| Integration | ERP, WMS, TMS, supplier portals, IoT sensors |
| Data Volume | Handle 5 years of history for forecasting |
| Security | RBAC, data encryption, audit trail |
| Compliance | GDPR, data residency requirements |

---

## 8. Key User Stories

- As a **demand planner**, I want an AI-assisted forecast that adjusts for seasonality and promotions, so I spend time reviewing exceptions rather than building models.
- As a **supply planner**, I want a constrained supply plan considering both demand and supplier lead times automatically.
- As a **procurement manager**, I want supplier risk scores visible before creating a single-source PO.
- As a **supply chain director**, I want a control tower showing all supply chain exceptions with impact scores.
- As a **finance analyst**, I want to see working capital tied up in inventory vs. the target.
- As a **logistics coordinator**, I want allocation plans that account for both service levels and freight efficiency.

---

## 9. Data Model (High-Level Entities)

```
Product
  - product_id (PK), sku, name, category, uom, lead_time, abc_class, xyz_class

Forecast
  - forecast_id (PK), product_id (FK), location_id (FK), period, stat_forecast, consensus_forecast, actual_demand

SupplyPlan
  - plan_id (PK), product_id (FK), location_id (FK), period, planned_order_qty, safety_stock

Supplier
  - supplier_id (PK), name, country, lead_time, moq, payment_terms, risk_score

PurchaseOrder
  - po_id (PK), supplier_id (FK), product_id (FK), qty, unit_cost, issue_date, expected_date, status

ProductionOrder
  - prod_id (PK), product_id (FK), plant_id, qty, start_date, end_date, bom_id, status

Inventory
  - inv_id (PK), product_id (FK), location_id (FK), qty_on_hand, qty_in_transit, days_of_supply

SCExceptionAlert
  - alert_id (PK), type, severity, product_id (FK), location_id (FK), message, raised_at, resolved
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/forecast/generate                - Generate statistical forecast
GET    /api/forecast/{product_id}            - Get product forecast
POST   /api/supply-plan/run                  - Run supply plan
GET    /api/supply-plan/{product_id}         - Get supply plan
GET    /api/inventory/health                 - Inventory health dashboard
GET    /api/suppliers/{id}/scorecard         - Supplier performance
POST   /api/purchase-orders                  - Create PO from plan
GET    /api/control-tower/exceptions         - All active exceptions
GET    /api/reports/otif                     - On-time in-full KPI
GET    /api/reports/forecast-accuracy        - Forecast accuracy trends
GET    /api/reports/working-capital          - Inventory working capital
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Python (forecasting/ML) + Java (operations) |
| Database | PostgreSQL + TimescaleDB |
| ML / Forecasting | Prophet / scikit-learn / AWS Forecast |
| Big Data | Apache Spark (historical analysis) |
| Cache | Redis |
| Queue | Apache Kafka |
| Integration | REST / EDI |
| Deployment | AWS / Azure |

---

## 12. Security Considerations

- Supplier portal access isolated per supplier (cannot view competitor data)
- Forecast and supply plan data — confidential, RBAC enforced
- PO and pricing data encrypted at rest
- Supplier collaboration portal with MFA
- Audit trail on all plan changes and PO approvals
- GDPR for any supplier personal data

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Forecast accuracy (MAPE) | < 20% for fast movers |
| OTIF (On-Time In-Full) | > 95% |
| Stockout rate | < 2% |
| Inventory days of supply | Reduced by 15% |
| Supply chain cost as % of revenue | Reduced by 10% |
| Supplier lead time variance | < 5% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Product/supplier master, inventory baseline |
| Phase 2 | Month 3–4 | Demand planning, forecasting engine |
| Phase 3 | Month 5–6 | Supply planning (MPS/MRP), procurement |
| Phase 4 | Month 7–8 | Control tower, exceptions, risk management |
| Phase 5 | Month 9–10 | Distribution planning, analytics |
| Go-Live | Month 11 | Full integration, training, production launch |
