# PRD — Inventory Management System (IMS)

## 1. Product Overview

An **Inventory Management System (IMS)** is a platform that tracks, controls, and optimizes stock across warehouses, stores, and supply points. It provides real-time visibility into inventory levels, automates replenishment, manages purchase orders, tracks product movement, and reduces shrinkage and carrying costs.

---

## 2. Goals & Objectives

- Provide real-time, accurate inventory visibility across all locations
- Automate reorder triggers to prevent stockouts and overstocking
- Track product movement (inbound, outbound, transfers) with full traceability
- Reduce inventory carrying costs and write-offs
- Support multi-location, multi-warehouse inventory management
- Integrate with ERP, POS, e-commerce, and procurement systems

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Inventory Manager | Policy, stock levels, reports |
| Warehouse Staff | GRN, picks, stock counts |
| Procurement Manager | Replenishment, PO approvals |
| Sales / Operations | Demand forecasting, stock availability |
| Finance | Valuation, write-offs, audit |
| IT Administrator | Integration, system configuration |

---

## 4. Scope

### In Scope
- Product / Item Master Management
- Multi-Location Stock Management
- Goods Receipt (Inbound)
- Goods Issue (Outbound)
- Stock Transfers
- Replenishment and Purchase Orders
- Physical Stock Count / Cycle Count
- Batch, Serial, and Expiry Tracking
- Inventory Valuation
- Reports and Analytics

### Out of Scope
- Full WMS (pick/pack/put-away optimization — separate WMS PRD)
- Manufacturing BOM and production orders
- Point of Sale (POS) system

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full access |
| Inventory Manager | All inventory modules |
| Warehouse Staff | GRN, issue, count — assigned location |
| Procurement | PO creation, vendor management |
| Viewer / Auditor | Read-only |
| Finance | Valuation, write-off reports |

---

## 6. Functional Requirements

### 6.1 Product / Item Master
- Create and manage products with category, unit of measure (UOM), SKU
- Product variants (size, color, weight class)
- Multiple UOM support with conversion factors
- Barcode and QR code assignment
- Min/max stock level configuration per location

### 6.2 Multi-Location Inventory
- Define warehouses, stores, bins
- Stock balance per location and product
- Consolidated multi-location stock view
- Location-level access permissions

### 6.3 Goods Receipt (Inbound)
- Receive against PO or direct (un-planned receipt)
- Scan barcode / serial number on receipt
- Batch and expiry date capture
- Capture supplier invoice and packing list
- Quality check step before stock acceptance
- Partial receipt handling

### 6.4 Goods Issue (Outbound)
- Issue against sales order, requisition, or production order
- Stock reservation on order creation
- FIFO / FEFO / LIFO picking rules
- Partial issue and backorder handling
- Negative stock prevention rule

### 6.5 Stock Transfers
- Inter-warehouse transfer requests
- Transfer in transit state (reduce source, add to transit)
- Transfer receipt at destination
- Reason codes for internal movements

### 6.6 Replenishment & Purchase Orders
- Auto-reorder point trigger when stock falls below minimum
- Suggested PO generation based on demand and lead time
- PO approval workflow
- Supplier price comparison before PO confirmation
- PO tracking (Pending → Partially Received → Closed)

### 6.7 Physical Stock Count / Cycle Count
- Plan and schedule full or cycle counts
- Count sheet generation per location
- Barcode scanning for count input
- Variance detection (system vs. physical)
- Approval workflow for adjustments
- Shrinkage reason categorization

### 6.8 Batch, Serial & Expiry Tracking
- Batch number assignment on receipt
- Serial number tracking per unit
- FEFO (First Expired First Out) enforcement
- Expiry alerts (30/60/90-day warnings)
- Batch recall tracking across locations

### 6.9 Inventory Valuation
- Costing methods: FIFO, Weighted Average, Standard Cost
- Landed cost allocation (freight, customs, duties)
- Period-end inventory valuation report
- Write-off and write-down recording
- Cost layer visibility per batch

### 6.10 Reports & Analytics
- Stock availability report (by item, location, category)
- Slow-moving and non-moving stock report
- Stock aging report
- Reorder alerts dashboard
- In-transit stock report
- Inventory valuation summary
- Inventory turnover ratio

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% |
| Performance | Stock query < 1 second |
| Scalability | Handle 100K+ SKUs, 50+ locations |
| Integration | ERP, WMS, POS, e-commerce, barcode scanners |
| Barcode | GS1 standard barcode support |
| Audit | Full movement history per item |
| Security | RBAC, location-level access control |

---

## 8. Key User Stories

- As a **warehouse staff**, I want to scan barcodes on received goods so GRN is created quickly and accurately.
- As an **inventory manager**, I want automatic reorder alerts when stock falls below minimum so I never run out.
- As a **finance team**, I want the system to value inventory using weighted average cost for accurate financial reporting.
- As a **warehouse manager**, I want to schedule cycle counts without halting operations.
- As a **procurement manager**, I want to compare supplier quotes before issuing a PO.
- As a **store manager**, I want to see which products are about to expire so I can take action before write-off.

---

## 9. Data Model (High-Level Entities)

```
Product
  - product_id (PK), sku, name, category_id, uom, min_stock, reorder_qty, cost_method

Location
  - location_id (PK), name, type (warehouse/store/bin), parent_id

Stock Balance
  - balance_id (PK), product_id (FK), location_id (FK), qty_on_hand, qty_reserved, qty_available

Stock Transaction
  - txn_id (PK), product_id (FK), location_id (FK), type (GRN/Issue/Transfer/Adjust), qty, batch_id, date, ref_id

Batch
  - batch_id (PK), product_id (FK), batch_no, expiry_date, received_qty, remaining_qty

Purchase Order
  - po_id (PK), supplier_id (FK), product_id (FK), qty, unit_cost, status, expected_date

Stock Count
  - count_id (PK), location_id (FK), product_id (FK), system_qty, physical_qty, variance, status
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/products                        - Create product
GET    /api/stock/{product_id}              - Get stock balance
GET    /api/stock?location={id}             - Stock at a location
POST   /api/grn                             - Create goods receipt
POST   /api/goods-issue                     - Create goods issue
POST   /api/transfers                       - Create stock transfer
POST   /api/purchase-orders                 - Create PO
GET    /api/reorder-alerts                  - Get reorder alerts
POST   /api/stock-counts                    - Start cycle count
PUT    /api/stock-counts/{id}/variance      - Submit variance
GET    /api/reports/slow-moving             - Slow-moving report
GET    /api/reports/valuation               - Inventory valuation
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Mobile/Scanner | React Native / Android (handheld) |
| Backend | Java Spring Boot / Node.js |
| Database | PostgreSQL |
| Cache | Redis |
| Queue | Kafka (movement events) |
| Search | Elasticsearch (product search) |
| Auth | JWT + RBAC |
| Deployment | Docker + Kubernetes |

---

## 12. Security Considerations

- Location-level access: users can only see/edit stock in their assigned locations
- Inventory adjustments require approval and are logged with reason
- All transactions are immutable — corrections done via reversal entries
- Audit trail: every stock change records user, timestamp, and reference
- Negative stock and large variance adjustments flagged for review

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Inventory accuracy | > 99% |
| Stockout rate | < 2% |
| Order fill rate | > 98% |
| Inventory turnover ratio | Improved by 20% |
| Slow-moving inventory write-off | Reduced by 30% |
| Cycle count discrepancy rate | < 0.5% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Product master, locations, stock balance |
| Phase 2 | Month 2 | GRN, goods issue, stock transfers |
| Phase 3 | Month 3 | Replenishment, PO workflow |
| Phase 4 | Month 4 | Batch/serial/expiry tracking, cycle counts |
| Phase 5 | Month 5 | Valuation, advanced reports, ERP integration |
| Go-Live | Month 6 | Full deployment and training |
