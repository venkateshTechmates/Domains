# PRD — Fleet Management System (FMS)

## 1. Product Overview

A **Fleet Management System (FMS)** is a platform that manages the lifecycle and day-to-day operations of a vehicle fleet — covering vehicle acquisition, driver management, GPS tracking, telematics, maintenance scheduling, fuel management, compliance, insurance, and cost reporting. It enables organizations to maximize fleet uptime, minimize costs, and ensure driver safety and regulatory compliance.

---

## 2. Goals & Objectives

- Provide real-time GPS visibility into all fleet vehicles
- Reduce fuel costs through driver behavior monitoring and route optimization
- Maximize vehicle uptime with preventive maintenance scheduling
- Ensure regulatory compliance (VAHAN, PUC, insurance, permits)
- Reduce fleet operating costs by 20–25%
- Improve driver safety through telematics and behavior scoring

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Fleet Manager | Fleet operations, cost control |
| Driver | Vehicle operation, trip management |
| Maintenance Team | Scheduled and breakdown maintenance |
| Finance | Fleet cost reporting, fuel expenses |
| HR / Safety Officer | Driver compliance, safety scores |
| Operations | Dispatch, route planning |
| Compliance Officer | License/permit renewals, audits |

---

## 4. Scope

### In Scope
- Vehicle Master and Registration
- Driver Management
- GPS Real-time Tracking
- Telematics and Driver Behavior
- Trip Management
- Fuel Management
- Preventive and Corrective Maintenance
- Document and Compliance Management
- Accident and Incident Management
- Fleet Cost Analytics
- Mobile App for Drivers

### Out of Scope
- Route optimization (TMS scope — integration)
- Load management (TMS scope)
- Vehicle procurement and lease accounting (ERP scope)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Fleet Manager | All fleet operations |
| Dispatcher | Trip assignment and tracking |
| Driver | Mobile app — own trips and vehicle |
| Maintenance Manager | Maintenance module |
| Finance | Cost and fuel reports |
| Compliance | Documents and certificates |

---

## 6. Functional Requirements

### 6.1 Vehicle Master
- Vehicle registration with reg number, make, model, year, type, capacity
- Vehicle category (truck, van, car, 2-wheeler, heavy machinery)
- Ownership type (own/leased/hired)
- Asset tagging and GPS device assignment
- Vehicle photo and document storage
- Vehicle decommission and disposal workflow

### 6.2 Driver Management
- Driver profile: license, contact, address, emergency contact
- License validity tracking (DL expiry alerts)
- Driving history and experience
- Medical fitness certificate tracking
- Driver performance score
- Driver-vehicle assignment history

### 6.3 Real-time GPS Tracking
- Live vehicle map view with current location
- Current speed, heading, and status (moving/idle/stopped)
- Play-back trip history (replay route on map)
- Geo-fence creation (site boundaries, delivery zones)
- Geo-fence entry/exit alerts
- Nearest vehicle search

### 6.4 Telematics & Driver Behavior
- Harsh braking detection
- Harsh acceleration detection
- Overspeeding alerts (configurable speed limits per zone)
- Sharp cornering alerts
- Idling duration tracking
- Driver scorecard (composite safety/efficiency score)
- Dashcam event clip integration

### 6.5 Trip Management
- Trip creation and assignment to driver + vehicle
- Trip start / end via driver mobile app
- Stops and waypoints tracking
- Odometer reading capture
- Planned vs. actual mileage tracking
- Trip completion confirmation with POD

### 6.6 Fuel Management
- Fuel fill-up logging (quantity, cost, vendor, odometer)
- Vehicle-wise fuel consumption tracking
- Fuel efficiency (km per liter) per vehicle and driver
- Fuel card integration
- Fuel theft detection (refueling mismatch with sensor data)
- Fuel cost report

### 6.7 Maintenance Management
- Preventive maintenance schedule (by mileage and time interval)
- Service reminders (oil change, tire rotation, brake check)
- Work order creation for corrective maintenance
- Maintenance vendor management
- Parts and labor cost tracking per service
- Breakdown management and roadside assistance
- Maintenance history per vehicle

### 6.8 Document & Compliance Management
- Vehicle document tracker: RC, Insurance, PUC, Fitness, Permits (FCFS, National Permit)
- Driver document tracker: DL, Medical Certificate, PSV badge
- Expiry alerts (30/60/90-day reminders)
- Document upload and storage
- Compliance dashboard (all expired/expiring items)
- Automated renewal reminders to fleet manager

### 6.9 Accident & Incident Management
- Accident report filing (date, location, severity, description, photos)
- Insurance claim workflow initiation
- Third-party details capture
- Repair cost tracking
- Accident frequency reporting

### 6.10 Fleet Cost Analytics
- Total cost of ownership per vehicle
- Cost breakdown: fuel, maintenance, insurance, driver, tolls
- Fleet-wide cost dashboard
- Cost per kilometer per vehicle
- High-cost vehicle identification (candidates for decommission)
- Monthly and annual fleet P&L

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% |
| GPS Update Frequency | Every 30 seconds (configurable) |
| Performance | Map load < 2 seconds with 1000+ vehicles |
| Scalability | Handle 50,000+ vehicles |
| Mobile | iOS and Android driver app |
| Integration | GPS hardware (Teltonika, CalAmp, Concox), TMS, ERP |
| Offline | Driver app works offline with sync |

---

## 8. Key User Stories

- As a **fleet manager**, I want to see all vehicles on a live map with their current status at any time.
- As a **driver**, I want to start and end my trip from the mobile app and log my odometer reading.
- As a **fleet manager**, I want automated alerts 60 days before any vehicle permit expires.
- As a **finance controller**, I want monthly fuel cost vs. efficiency per vehicle report.
- As a **safety officer**, I want weekly driver behavior scorecards so I can coach high-risk drivers.
- As a **maintenance team**, I want automatic service reminders based on mileage thresholds.

---

## 9. Data Model (High-Level Entities)

```
Vehicle
  - vehicle_id (PK), reg_number, make, model, year, type, category, status, gps_device_id

Driver
  - driver_id (PK), name, license_no, license_expiry, contact, safety_score, status

Trip
  - trip_id (PK), vehicle_id (FK), driver_id (FK), start_time, end_time, start_location, end_location, distance_km, status

FuelLog
  - fuel_id (PK), vehicle_id (FK), driver_id (FK), date, quantity_liters, cost, odometer, vendor

MaintenanceOrder
  - wo_id (PK), vehicle_id (FK), type (preventive/corrective), due_date, completed_date, cost, items[]

VehicleDocument
  - doc_id (PK), vehicle_id (FK), doc_type, expiry_date, file_url, renewal_reminded

TelemticsEvent
  - event_id (PK), vehicle_id (FK), driver_id (FK), event_type, timestamp, speed, location_lat, location_lng

Accident
  - accident_id (PK), vehicle_id (FK), driver_id (FK), date, severity, location, description, repair_cost
```

---

## 10. API Design (Key Endpoints)

```
GET    /api/fleet/live-map                   - All vehicles live GPS data
GET    /api/vehicles/{id}/location           - Single vehicle location
GET    /api/vehicles/{id}/trip-history       - Trip playback data
POST   /api/trips                            - Create trip
PUT    /api/trips/{id}/start                 - Start trip
PUT    /api/trips/{id}/end                   - End trip
POST   /api/fuel-logs                        - Log fuel fill-up
POST   /api/maintenance/orders               - Create maintenance work order
GET    /api/compliance/expiry-alerts         - Expiring documents dashboard
GET    /api/drivers/{id}/scorecard           - Driver behavior scorecard
GET    /api/reports/cost-per-km             - Cost per kilometer report
POST   /api/accidents                        - Report accident
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Mobile | React Native (driver app) |
| Backend | Java Spring Boot / Node.js |
| Database | PostgreSQL + TimescaleDB (telematics) |
| Maps | Google Maps Platform / HERE |
| GPS Protocol | MQTT / TCP (device ingestion) |
| Queue | Apache Kafka |
| Cache | Redis |
| Auth | JWT + OAuth 2.0 |
| Deployment | AWS / Azure |

---

## 12. Security Considerations

- Driver location data encrypted and retained per privacy policy
- GPS device authentication (unique IMEI + token per device)
- Driver app requires app PIN + biometric authentication
- Administrative access protected with MFA
- Geo-fence and alert configurations not editable by drivers
- Personal driver data (license, medical) access-controlled

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Fleet availability | > 95% |
| Preventive maintenance compliance | > 90% |
| Fuel efficiency improvement | > 10% |
| Speeding incident reduction | > 50% |
| Document expiry compliance | 100% |
| Fleet cost per km | Reduced by 15% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Vehicle master, driver master, GPS tracking |
| Phase 2 | Month 2 | Trip management, driver mobile app |
| Phase 3 | Month 3 | Telematics, behavior scoring, alerts |
| Phase 4 | Month 4 | Maintenance, fuel management |
| Phase 5 | Month 5 | Compliance, documents, accident management |
| Go-Live | Month 6 | Reports, analytics, full deployment |
