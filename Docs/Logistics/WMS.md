# PRD — Warehouse Management System (WMS)

## 1. Product Overview

A **Warehouse Management System (WMS)** is a software platform that controls and optimizes physical warehouse operations — from goods receipt and put-away, through storage, pick, pack, and ship. It provides real-time inventory visibility at the bin/location level and integrates with TMS, ERP, and OMS to orchestrate end-to-end supply chain execution.

---

## 2. Goals & Objectives

- Achieve 99%+ inventory accuracy through real-time bin-level tracking
- Optimize warehouse space utilization and slotting
- Accelerate order fulfillment with smart pick path optimization
- Reduce mis-picks and shipping errors
- Enable paperless operations via RF scanners and mobile devices
- Integrate with ERP, OMS, and TMS for end-to-end visibility

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Warehouse Manager | Overall warehouse operations, KPIs |
| Receiving Associate | Inbound goods receipt |
| Put-Away Associate | Bin assignment and storage |
| Pick Associate | Order picking |
| Pack Associate | Packing, label printing |
| Shipping / Outbound | Load dispatch, BOL |
| Inventory Controller | Cycle counts, adjustments |
| IT Administrator | System configuration, integrations |

---

## 4. Scope

### In Scope
- Warehouse and Location Master Management
- Inbound: Purchase Order Receipt, Advanced Shipping Notice (ASN)
- Put-Away Management
- Inventory Management at Bin Level
- Outbound: Pick, Pack, Ship
- Replenishment (pick face from reserve)
- Cycle Counting
- Returns Processing
- Labor Management
- Reports and Analytics
- RF / Mobile Scanner Support

### Out of Scope
- Procurement and PO creation (ERP scope)
- Transport routing (TMS scope)
- Manufacturing production orders

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Warehouse Manager | All modules |
| Supervisor | Zone/area operations |
| Receiving Associate | Inbound only |
| Pick/Pack Associate | Task queues for their zone |
| Inventory Controller | Cycle count module |
| Driver (Shipping) | Shipment confirmation |

---

## 6. Functional Requirements

### 6.1 Warehouse & Location Master
- Define warehouse structure: zones, aisles, bays, levels, bins
- Location types: bulk, shelving, floor, rack, refrigerated, hazmat
- Location attributes: weight capacity, dimension, temperature range
- Bin barcode label generation

### 6.2 Inbound / Goods Receipt
- Receive against PO or ASN (Advanced Shipping Notice)
- Blind receipt (no PO matching — count first)
- Barcode / RFID scanning on receipt
- Batch, serial number, and expiry date capture
- Quantity and condition verification
- Cross-docking (direct to outbound without put-away)
- GRN confirmation and ERP update

### 6.3 Put-Away Management
- System-directed put-away (optimal location suggestion)
- Fixed location vs. dynamic putaway rules
- Weight and dimension constraints for bin selection
- FIFO / FEFO-based slot allocation
- RF scanner-guided put-away confirmation
- Label printing on put-away

### 6.4 Inventory Management (Bin Level)
- Real-time stock balance per bin (item × location)
- Inventory holds (quality hold, damage hold)
- Bin-to-bin transfers
- Lot / batch / serial number tracking
- Inventory aging
- Real-time ERP stock synchronization

### 6.5 Outbound / Order Fulfillment
- Release orders from OMS/ERP into WMS
- Wave management (group orders for batch picking)
- Pick strategies: single-order pick, batch pick, zone pick, cluster pick
- Optimized pick path generation (shortest path routing)
- RF scanner confirmation on each pick
- Short-pick handling and backorder creation
- Pack station: scan-to-pack, pack list, cartonization
- Shipping label generation (carrier labels: FedEx, UPS, DTDC)
- Bill of Lading and packing list generation
- Truck load plan

### 6.6 Replenishment
- Pick face replenishment from reserve (min/max rules)
- Demand-based replenishment (based on today's orders)
- RF-directed replenishment tasks
- Forward area (pick face) vs. reserve area management

### 6.7 Cycle Counting
- Calendar-based cycle count schedule
- ABC count frequency (A items: daily, B: weekly, C: monthly)
- RF scanner-based count (scan bin, count qty)
- Variance review and approval before adjustment
- Zero-disruption counting (count while operations continue)

### 6.8 Returns Processing
- Return order receipt and inspection
- Return reason coding (damaged, wrong item, customer return)
- Disposition: restock, quarantine, dispose, return to vendor
- Credits triggered on confirmed returns
- Reverse logistics integration with TMS

### 6.9 Labor Management
- Task management and assignment per associate
- Productivity tracking (tasks per hour, pick rate)
- RF downtime logging
- Attendance and shift management
- Performance dashboards per shift

### 6.10 Reports & Analytics
- Inventory accuracy by zone and item
- Inbound dock-to-stock time
- Order fulfillment rate and SLA compliance
- Pick productivity and accuracy
- Space utilization by zone
- Returns processing report
- Labor efficiency report

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% (warehouse operates shift-based, 24 × 7) |
| Performance | Task generation < 2 seconds, RF response < 1 second |
| Scalability | Handle 500,000+ SKUs, 100,000 transactions/day |
| Integration | ERP (SAP/Oracle), OMS, TMS, Carrier, Barcode/RFID |
| Mobile / RF | Zebra / Honeywell RF scanner support |
| Offline | RF stations can operate offline with sync |
| Audit | Full transaction log per item movement |

---

## 8. Key User Stories

- As a **receiving associate**, I want to scan boxes as they arrive and the system to tell me exactly where to put them.
- As a **pick associate**, I want an optimized route through the warehouse so I don't walk empty aisles.
- As a **warehouse manager**, I want to see how many orders are not yet picked for today's shipment deadline.
- As an **inventory controller**, I want cycle count tasks assigned to my team automatically based on the schedule.
- As a **packing associate**, I want to scan items into a box and the system to auto-select the right carton size.
- As an **operations manager**, I want hourly pick productivity reports per associate.

---

## 9. Data Model (High-Level Entities)

```
Location
  - location_id (PK), warehouse_id, zone, aisle, bay, level, bin, type, capacity_kg, active

StockAtLocation
  - stock_id (PK), location_id (FK), item_id (FK), lot_no, qty, expiry_date, hold_status

InboundShipment (ASN / GRN)
  - shipment_id (PK), po_id (FK), supplier_id, received_date, status, grnno

PickTask
  - task_id (PK), wave_id (FK), order_line_id (FK), from_location_id (FK), item_id (FK), qty, assignee_id, status

PackStation
  - pack_id (PK), order_id (FK), carton_id, items[], packed_by, packed_at, shipping_label_url

OutboundShipment
  - shipment_id (PK), order_ids[], carrier, tracking_no, status, dispatched_at

CycleCount
  - count_id (PK), location_id (FK), item_id (FK), counted_qty, system_qty, variance, status

ReturnOrder
  - return_id (PK), order_id (FK), item_id (FK), qty, reason, disposition, processed_at
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/inbound/asn                     - Create ASN
POST   /api/inbound/receive                 - Receive goods against PO/ASN
GET    /api/putaway/task/{id}               - Get put-away task
POST   /api/putaway/confirm                 - Confirm put-away
GET    /api/inventory/bin/{location_id}     - Get stock at a bin
POST   /api/outbound/wave/release           - Release wave for picking
GET    /api/pick/task/{associate_id}        - Get next pick task
POST   /api/pick/confirm                    - Confirm pick
POST   /api/pack/confirm                    - Confirm pack and print label
POST   /api/ship/dispatch                   - Dispatch shipment
POST   /api/cycle-counts                    - Start cycle count task
GET    /api/reports/fulfillment             - Fulfillment rate report
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js (supervisor dashboard) |
| RF / Mobile | Android (Zebra/Honeywell) |
| Backend | Java Spring Boot |
| Database | PostgreSQL |
| Cache | Redis (task queues) |
| Queue | Apache Kafka |
| Auth | LDAP + JWT |
| Integration | REST APIs (ERP, OMS, TMS, carrier) |
| Deployment | On-premise / AWS |

---

## 12. Security Considerations

- Location-level access: associates see only tasks in their zone
- Inventory adjustments require supervisor approval
- All movement transactions are immutable (corrections via reversal)
- Audit trail: every stock change with operator, scanner ID, timestamp
- RF communication over WPA2/3 enterprise Wi-Fi security

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Inventory accuracy | > 99.5% |
| Order fulfillment rate | > 99% |
| Pick accuracy | > 99.8% |
| Dock-to-stock time | < 2 hours |
| Space utilization | > 85% |
| Pick productivity | Improved by 30% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Location master, item setup, inbound receipt |
| Phase 2 | Month 2 | Put-away, inventory management, bin tracking |
| Phase 3 | Month 3 | Outbound: pick, pack, ship |
| Phase 4 | Month 4 | Replenishment, cycle counting |
| Phase 5 | Month 5 | Returns, labor management, reports |
| Go-Live | Month 6 | ERP/OMS/TMS integration, training, production |
