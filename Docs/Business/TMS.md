# PRD — Transport Management System (TMS)

## 1. Product Overview

A **Transport Management System (TMS)** is a logistics platform that plans, executes, and optimizes the physical movement of goods. It covers freight planning, carrier management, shipment tracking, route optimization, freight audit, and delivery confirmation, giving shippers real-time visibility into their supply chain.

---

## 2. Goals & Objectives

- Automate shipment planning and carrier selection
- Reduce freight costs through route optimization and load consolidation
- Provide real-time shipment visibility to all stakeholders
- Streamline freight billing and audit
- Improve on-time delivery performance
- Integrate with WMS, ERP, and carrier APIs

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Logistics Manager | Planning, carrier management, cost oversight |
| Dispatcher / Planner | Load planning, route assignment, dispatch |
| Driver / Field Agent | Pickup, delivery, real-time updates |
| Warehouse Manager | Outbound handoff, inbound receiving |
| Finance / Billing | Freight invoice audit and payment |
| Customer | Shipment tracking, delivery confirmation |
| Carrier / Transporter | Accepting loads, updating status |

---

## 4. Scope

### In Scope
- Order-to-Shipment Planning
- Carrier and Fleet Management
- Route Optimization
- Load Building and Consolidation
- Dispatch Management
- Real-time Shipment Tracking
- Proof of Delivery (POD)
- Freight Billing & Audit
- Returns Management
- Reports & Analytics

### Out of Scope
- Warehouse operations (WMS)
- Procurement of vehicles (asset management)
- Customs & trade compliance (separate module)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Logistics Planner | All planning and dispatch |
| Driver | Mobile app — assigned loads only |
| Customer | Tracking portal — own shipments |
| Finance | Billing and audit module |
| Carrier Admin | Accept loads, update pod |
| Viewer | Read-only reports |

---

## 6. Functional Requirements

### 6.1 Order Management
- Import orders from ERP / OMS via API or file
- Order validation (address, weight, dimensions)
- Order pooling and consolidation rules
- Priority and SLA flag per order

### 6.2 Load Planning & Optimization
- Group orders into loads based on route, capacity, and weight
- Truck/vehicle type selection per load
- Multi-stop trip planning
- Volume and weight optimization per vehicle
- Day-wise and week-wise planning board

### 6.3 Route Optimization
- Shortest/fastest route calculation (Google Maps/HERE API)
- Multi-drop delivery sequencing
- Traffic and time-window constraints
- Return trip optimization (backhaul)
- Geo-fencing for delivery zones

### 6.4 Carrier & Fleet Management
- Carrier and transporter onboarding
- Vehicle master (type, capacity, dimensions, registration)
- Driver master (license, availability, assignment)
- Carrier rate card management
- Carrier performance scorecard (OTD, damage rate)
- Carrier selection: rule-based or auction/spot booking

### 6.5 Dispatch Management
- Assign load to driver + vehicle
- Digital dispatch sheet / manifests
- Driver mobile app: accept, navigate, capture POD
- Exception management (delay, breakdown, reroute)
- SLA breach alerts

### 6.6 Real-time Tracking
- GPS-based vehicle tracking (via driver app or tracker device)
- Milestone-based tracking (Dispatched → In Transit → Out for Delivery → Delivered)
- Customer tracking portal with live map
- ETA prediction and updates
- Geo-fence alerts at key locations

### 6.7 Proof of Delivery (POD)
- Digital POD capture (signature, photo, OTP)
- Exception POD (partial delivery, damaged goods)
- Automatic POD sync to ERP/OMS/WMS
- POD retrieval and audit

### 6.8 Freight Billing & Audit
- Freight cost calculation per shipment (rate × weight/distance)
- Accessorial charges (fuel surcharge, waiting, re-delivery)
- Carrier invoice upload and 3-way match (PO ↔ Delivery ↔ Invoice)
- Dispute management
- Payment processing and remittance to carriers

### 6.9 Returns Management
- Return order creation and routing
- Reverse pickup scheduling
- Return shipment tracking
- Return receipt confirmation at origin warehouse

### 6.10 Reports & Analytics
- On-time delivery (OTD) performance
- Freight cost per unit and per lane
- Carrier performance comparison
- Load utilization report
- Exception and delay analysis
- CO2 emissions tracking

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% uptime |
| Performance | Route calculation < 5 seconds |
| Scalability | Handle 100,000+ shipments/month |
| GPS Accuracy | ± 10 meters |
| Mobile | Driver app for iOS and Android |
| Integration | ERP, WMS, OMS, Carrier APIs, GPS hardware |
| Security | RBAC, API authentication, encrypted location data |

---

## 8. Key User Stories

- As a **logistics planner**, I want to auto-generate optimized trips for tomorrow's orders so I minimize freight cost.
- As a **driver**, I want turn-by-turn navigation with delivery stops listed in optimized order.
- As a **customer**, I want to track my shipment in real-time and get ETA updates on my phone.
- As a **logistics manager**, I want alerts when a shipment is running late so I can proactively notify the customer.
- As a **finance team**, I want to auto-match carrier invoices to shipments and flag any discrepancies.
- As a **carrier**, I want to accept digitally assigned loads and submit POD photos directly from my phone.

---

## 9. Data Model (High-Level Entities)

```
Shipment Order
  - order_id (PK), origin, destination, weight, volume, priority, sla_date, source_system_id

Trip / Load
  - trip_id (PK), vehicle_id (FK), driver_id (FK), planned_date, status, stops[]

Vehicle
  - vehicle_id (PK), reg_number, type, capacity_kg, capacity_cbm, carrier_id (FK)

Driver
  - driver_id (PK), name, license, phone, carrier_id (FK), availability

Carrier
  - carrier_id (PK), name, contact, rate_card_id (FK), performance_score

Route Stop
  - stop_id (PK), trip_id (FK), order_id (FK), sequence, address, eta, actual_arrival, pod_status

POD
  - pod_id (PK), stop_id (FK), signature_url, photo_url, delivered_at, status

Freight Invoice
  - invoice_id (PK), carrier_id (FK), trip_id (FK), amount, status, matched
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/orders                          - Create shipment order
POST   /api/trips/plan                      - Auto-plan trips from orders
GET    /api/trips/{id}                      - Get trip details
PUT    /api/trips/{id}/dispatch             - Dispatch trip
GET    /api/tracking/{shipment_id}          - Real-time tracking
POST   /api/pod/{stop_id}                   - Submit POD
GET    /api/vehicles                        - List vehicles
GET    /api/carriers/{id}/performance       - Carrier scorecard
POST   /api/freight-invoices                - Upload carrier invoice
GET    /api/reports/otd                     - On-time delivery report
GET    /api/reports/freight-cost            - Freight cost analytics
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js (planner web) |
| Mobile | React Native (driver app) |
| Backend | Java Spring Boot / Go |
| Database | PostgreSQL + TimescaleDB (GPS) |
| Maps | Google Maps Platform / HERE Maps |
| Queue | Apache Kafka (real-time events) |
| Cache | Redis |
| Auth | JWT + OAuth 2.0 |
| Deployment | Kubernetes on AWS |

---

## 12. Security Considerations

- Driver location data encrypted and retained per policy
- Customer tracking links are token-secured (not guessable)
- Role isolation: drivers see only their own trips
- Carrier API keys rotated and access-scoped
- All financial data (rate cards, invoices) access-logged

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| On-time delivery rate | > 95% |
| Freight cost per unit | Reduced by 15% |
| Vehicle utilization | > 85% |
| Carrier invoice processing time | Reduced by 70% |
| Customer tracking adoption | > 80% |
| Exception resolution time | < 2 hours |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Order management, vehicle/carrier master |
| Phase 2 | Month 3–4 | Load planning, route optimization, dispatch |
| Phase 3 | Month 5 | Driver mobile app, GPS tracking, POD |
| Phase 4 | Month 6 | Freight billing, audit, customer portal |
| Phase 5 | Month 7 | Analytics, returns, carrier performance |
| Go-Live | Month 8 | Full deployment and team training |
