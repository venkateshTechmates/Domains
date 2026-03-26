# PRD — Medical Image System / PACS (Picture Archiving and Communication System)

## 1. Product Overview

A **PACS (Picture Archiving and Communication System)** is the medical image management infrastructure that stores, retrieves, manages, and distributes medical images (X-Rays, CT scans, MRIs, Ultrasounds, PET scans) across a healthcare organization. It replaces physical film with digital image storage and provides radiologists and clinicians with web and workstation-based image viewing and comparison tools.

---

## 2. Goals & Objectives

- Provide filmless, digital image storage and retrieval for all imaging modalities
- Enable radiologists to access studies from any workstation or remote location
- Support multi-site image sharing and teleradiology workflows
- Integrate with RIS for study management and report association
- Deliver fast, diagnostic-quality image viewing on web and workstation
- Ensure long-term image retention and compliance with legal hold requirements

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Radiologist | Diagnostic workstation reading |
| Radiology Technologist | Acquire and push images to PACS |
| Clinician | View images at point of care |
| PACS Administrator | Storage, archive, system maintenance |
| IT / Infrastructure | DICOM network, storage hardware |
| Patient | Access own images (CD / portal) |
| Teleradiology Service | Remote reading of studies |

---

## 4. Scope

### In Scope
- DICOM Image Ingestion (from modalities)
- Image Archive (online, nearline, offline tiers)
- Diagnostic Workstation Viewer (zero-footprint web)
- Clinical Viewer (lightweight web viewer for wards)
- Study Management and Worklist
- Prior Study Retrieval and Hanging Protocols
- Image Annotation and Measurements
- Report Association (from RIS)
- Multi-Site Image Sharing / Federation
- Patient CD Burning / Image Export
- Teleradiology Support
- DICOM QC (Quality Control)
- Long-term Archive and Compliance

### Out of Scope
- Radiology report authoring (RIS scope)
- 3D rendering / AI diagnostic tools (third-party integrations)
- Nuclear medicine dose management

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system |
| Radiologist | Full diagnostic viewer, study management |
| Clinician | Clinical viewer (view only) |
| Technologist | Push studies, QC failed studies |
| PACS Admin | Storage management, archive |
| Patient (Portal) | Own studies only |
| Teleradiologist | Remote viewing (study-specific token) |

---

## 6. Functional Requirements

### 6.1 DICOM Image Ingestion
- Receive DICOM images from modalities (CT, MRI, CR, DX, US, MG, NM, PET, Fluoroscopy)
- DICOM C-Store SCP endpoint
- DICOM Modality Worklist (MWL) — send study info to modality
- DICOM storage commitment
- Auto-routing rules (send study to correct worklist/archive by modality, body part, priority)
- Image deduplication and QC on arrival

### 6.2 Image Archive
- Three-tier storage architecture:
  - **Online (Hot)**: fast SSD/SAN for recent studies (last 6 months)
  - **Nearline (Warm)**: object storage for 6 months–7 years
  - **Offline (Cold)**: tape / glacier for older studies
- Auto-migration between tiers based on age and access pattern
- Retention policy management (per regulation: 7–10 years minimum)
- Disaster recovery and geo-redundant backup

### 6.3 Diagnostic Workstation Viewer
- Zero-footprint web viewer (no local install required)
- Support for DICOM Part 10 files, WADO-RS, DICOMweb
- Multi-monitor layout support
- Tools: window/level, zoom, pan, magnify, cine (for CT/MRI stack)
- Annotations and measurements: ruler, angle, region of interest (ROI), Cobb angle
- Multiplanar Reconstruction (MPR) — axial, coronal, sagittal views
- Hanging protocols (pre-configured layout per exam type)
- Side-by-side comparison with prior studies
- 3D volume rendering (if integrated with 3D server)

### 6.4 Clinical Viewer
- Lightweight viewer for non-radiologist clinicians
- Single-click access from EMR patient chart
- View without specialized tools
- Responsive web — accessible on tablets at bedside

### 6.5 Study Management
- Study list with filters (patient, date, modality, status, site)
- Study status tracking (Received → Complete → Read → Reported)
- Merge and split studies (patient demographic correction)
- Delete and anonymize studies
- Study assignment and reassignment between radiologists

### 6.6 Prior Study Retrieval
- Automatically load prior studies for comparison
- Relevant priors by body part and modality
- Cross-enterprise query (IHE XCA) for off-site priors
- Study prefetch based on RIS appointment schedule

### 6.7 Report Association
- Link RIS report to PACS study
- Display report alongside images in viewer
- Final report PDF embedded in DICOM Structured Report (SR)

### 6.8 Multi-Site Image Sharing
- Federated PACS — query across multiple hospital sites
- IHE XDS-I.b / DICOMweb federation
- Study sharing via secure token URL
- Cross-site worklist for radiologists

### 6.9 Patient Image Export
- CD/DVD burning with DICOM viewer
- Download as DICOM or JPEG
- Secure patient portal access to own studies
- Image sharing link (time-limited, token-secured)

### 6.10 DICOM QC
- Patient demographic mismatch detection
- Corrupted series detection
- Incomplete study detection (missing DICOM series)
- Worklist reconciliation (study received vs. ordered by RIS)
- QC operator review and correction queue

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.99% (imaging is emergency-critical) |
| Performance | First image display < 3 seconds, full series < 10 seconds |
| Scalability | 100TB+ image archive, 1M+ studies |
| Standards | DICOM PS3, IHE Radiology profiles (MWL, XCA, XDS-I) |
| Security | HIPAA, PHI-compliant, TLS DICOM, RBAC |
| Retention | 7–10 years minimum per jurisdiction |
| DR | RPO < 15 min, RTO < 2 hours |

---

## 8. Key User Stories

- As a **radiologist**, I want prior studies loaded automatically on my workstation when I open a new study.
- As a **radiologist**, I want to read studies from home on a secure web viewer without installing software.
- As a **technologist**, I want failed-quality studies to be flagged immediately so I can retake the image.
- As a **clinician**, I want to view a patient's CT from the EMR without leaving the patient chart.
- As a **patient**, I want to download my own scan images and reports from the patient portal.
- As a **PACS admin**, I want old studies to automatically migrate from expensive SAN to object storage.

---

## 9. Data Model (High-Level Entities)

```
Study
  - study_uid (PK), patient_id, accession_number, modality, body_part, study_date, description, status, site_id

Series
  - series_uid (PK), study_uid (FK), modality, body_part, series_number, num_instances, description

Instance (Image)
  - sop_uid (PK), series_uid (FK), filename, storage_tier, file_size, storage_path

Patient (DICOM)
  - patient_id (PK), name, dob, gender, mrn (linked to EMR patient_id)

StorageNode
  - node_id (PK), name, type (hot/warm/cold), capacity, used_space, location

AccessLog
  - log_id (PK), study_uid (FK), user_id, action (view/download/export), timestamp, ip_address

RetentionPolicy
  - policy_id (PK), modality, min_retention_years, auto_delete
```

---

## 10. API Design (Key Endpoints)

```
# DICOMweb (WADO-RS, STOW-RS, QIDO-RS)
GET    /wado/studies/{studyUID}                - Retrieve study
GET    /wado/studies/{studyUID}/series         - List series
GET    /wado/studies/{studyUID}/series/{seriesUID}/instances - List instances
POST   /stow/studies                           - Store DICOM instances
GET    /qido/studies?PatientID={id}            - Query studies

# Proprietary REST
GET    /api/studies/{id}                       - Study metadata
POST   /api/studies/{id}/share                 - Generate patient share link
GET    /api/worklist?radiologist={id}          - Reading worklist
PUT    /api/studies/{id}/status                - Update study status
GET    /api/storage/dashboard                  - Storage usage dashboard
POST   /api/migration/trigger                  - Trigger tier migration
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| DICOM Server | Orthanc / DCM4CHEE |
| Web Viewer | Cornerstone.js / OsiriX Web / Synapse |
| Backend API | Java Spring Boot |
| Database | PostgreSQL (metadata) |
| Hot Storage | NetApp SAN / Pure Storage |
| Warm Storage | AWS S3 / MinIO |
| Cold Storage | AWS Glacier / Tape (LTO) |
| Auth | OAuth 2.0 + TLS mutual auth (DICOM) |
| Deployment | On-premise + cloud hybrid |

---

## 12. Security Considerations

- All DICOM transmissions over TLS (DICOM TLS)
- Patient image access requires authentication and audit log
- Study sharing URLs are time-limited and single-use by default
- DICOM data de-identification before external sharing
- Physical media (CD) encrypted
- HIPAA BAA required for cloud storage providers

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| First image display time | < 3 seconds |
| Image availability (uptime) | > 99.99% |
| Storage tier migration accuracy | 100% |
| Study QC pass rate | > 99% |
| DICOM ingestion failure rate | < 0.01% |
| Patient portal adoption | > 40% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | DICOM C-Store, archive, study management |
| Phase 2 | Month 2 | Diagnostic web viewer, prior study fetch |
| Phase 3 | Month 3 | RIS integration, worklist, MWL |
| Phase 4 | Month 4 | Multi-site federation, clinical viewer |
| Phase 5 | Month 5 | Patient portal, CD export, tiered storage |
| Go-Live | Month 6 | Go-live, DR testing, radiologist training |
