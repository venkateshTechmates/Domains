# PRD — Student Management System (SMS)

## 1. Product Overview

A **Student Management System (SMS)** is a comprehensive software platform for educational institutions — schools, colleges, and universities — to manage the complete student lifecycle: from admissions and enrollment through academic tracking, attendance, fees, examinations, and alumni management. It connects administrators, teachers, students, and parents on a single unified platform.

---

## 2. Goals & Objectives

- Digitize and centralize all student records and academic data
- Streamline admissions and enrollment processes
- Automate attendance tracking and reporting
- Simplify fee collection and financial management
- Enable seamless communication between institution, students, and parents
- Provide data-driven insights for academic and institutional improvement
- Integrate with examination systems, LMS, and third-party tools

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| School / University Admin | Institution-wide configuration, reporting |
| Principal / Dean | Academic oversight, approvals |
| Teacher / Faculty | Class management, grades, attendance |
| Student | Access records, fees, communication |
| Parent / Guardian | Track ward's progress, fee payment |
| Finance Officer | Fee management, accounts |
| IT Administrator | System setup, integrations |

---

## 4. Scope

### In Scope
- Admissions and enrollment management
- Student profile and records management
- Class, batch, and section management
- Attendance tracking (manual, biometric, RFID)
- Timetable management
- Fee collection and management
- Academic performance and grade management
- Parent and student communication portal
- Library management (basic)
- Transport module
- Hostel management
- Document and certificate management
- Mobile app (student and parent)

### Out of Scope
- Full Learning Management System (LMS) — separate product
- Examination system (separate module)
- HR and payroll (separate HRMS)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | All modules, all institutions (SaaS) |
| School Admin | All modules for own institution |
| Principal | Academic reports, approvals, all classes |
| Teacher / Faculty | Own classes, attendance, grades |
| Student | Own records, schedule, fees, messages |
| Parent | Ward's records, attendance, fees, messages |
| Finance Officer | Fee management, payment reports |
| Librarian | Library module |

---

## 6. Functional Requirements

### 6.1 Admissions & Enrollment
- Online admission application form (configurable per institution)
- Document upload (birth certificate, transfer certificate, photos)
- Application review and approval workflow
- Merit list generation (for competitive admissions)
- Enrollment confirmation and fee payment
- Student ID generation on confirmation
- Waitlist management
- Bulk student import (CSV) for existing records

### 6.2 Student Profile & Records Management
- Comprehensive student profile: personal, academic, family, health, emergency contacts
- Photo and document storage
- Academic history (class-wise performance)
- Disciplinary records
- Achievements and extracurricular activities
- Transfer certificate and leaving certificate generation
- Unique student ID assigned across academic career

### 6.3 Class, Batch & Section Management
- Create and manage classes, batches, sections
- Assign students and teachers to sections
- Subject allocation per class
- Academic year and semester configuration
- Promotion / progression of students to next grade
- Rolling enrollment for mid-year joiners

### 6.4 Attendance Management
- Teacher marks daily attendance (per subject / per day)
- Biometric/RFID integration for automated attendance
- Mobile app attendance marking (geo-fenced)
- Real-time parent notifications on absence
- Attendance reports: student, class, daily, monthly
- Leave application and approval workflow
- Attendance eligibility check for exams (configurable %)

### 6.5 Timetable Management
- Manual timetable creation with conflict detection
- Automatic timetable generation (configurable constraints)
- Section-wise and teacher-wise timetable views
- Substitute teacher assignment
- Special class / event scheduling
- Timetable published to student and parent apps

### 6.6 Fee Management
- Flexible fee structure (annual, term, monthly) per class or student group
- Online fee payment (UPI, netbanking, card, wallet)
- Offline fee payment recording
- Automated fee reminders (SMS, email, push notification)
- Dues and arrears tracking
- Fee concession management (scholarship, sibling discount)
- Receipt generation and download
- Refund processing
- Financial summary and collection reports

### 6.7 Academic Performance & Gradebook
- Subject-wise marks entry by teachers
- Grade calculation with configurable grading scales (marks, GPA, percentage)
- Class rank computation
- Progress report / report card generation (printable PDF)
- Term and cumulative performance charts
- Below-average alert to parents

### 6.8 Communication Portal
- Announcements (institution-wide, class-wise, group-wise)
- SMS, email, and push notification broadcasting
- Internal messaging (teacher-student, teacher-parent)
- Event calendar (holidays, exams, activities)
- Parent feedback and grievance submission
- Notice board module

### 6.9 Library Management
- Book catalog management
- Issue and return tracking
- Overdue alerts and fine calculation
- Student book borrowing history
- Low-stock reporting

### 6.10 Transport & Hostel
- Transport route management; student route allocation
- Bus tracking (GPS integration)
- Daily boarding notifications to parents
- Hostel room allocation and student-room mapping
- Hostel fee management
- Hostel warden portal

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% uptime |
| Performance | Page load < 2 seconds |
| Scalability | Support 10,000+ students per institution |
| Multi-tenancy | SaaS model supporting multiple institutions |
| Security | Role-based access, data encryption at rest & transit |
| Mobile | iOS and Android apps with offline capability |
| Compliance | DPDP Act (India), FERPA (US) for student data |

---

## 8. Key User Stories

- As a **parent**, I want instant SMS/push notifications when my child is marked absent so I can act immediately.
- As a **student**, I want to view my timetable, attendance, and report card from my mobile app anytime.
- As a **teacher**, I want to mark attendance for the entire class in under 2 minutes.
- As a **finance officer**, I want to see all fee dues with automated reminders so I don't need manual follow-up.
- As an **admin**, I want to generate class-wise attendance and performance reports with a single click.
- As a **parent**, I want to pay school fees securely online without visiting the campus.

---

## 9. Data Model (High-Level Entities)

```
Institution
  - institution_id, name, type, address, logo, academic_year

Student
  - student_id (PK), name, dob, gender, photo, guardian_id, class_id, roll_no, status, enrolled_at

Guardian
  - guardian_id (PK), student_id (FK), name, relation, phone, email, occupation

ClassSection
  - class_id (PK), grade, section, teacher_id (FK), academic_year, strength

Attendance
  - attendance_id (PK), student_id (FK), class_id (FK), date, status (present/absent/late), marked_by

Fee
  - fee_id (PK), student_id (FK), amount, category, due_date, paid_date, status, receipt_no

AcademicRecord
  - record_id (PK), student_id (FK), subject_id (FK), term, marks, grade

Timetable
  - slot_id (PK), class_id (FK), subject_id (FK), teacher_id (FK), day, start_time, end_time

Message
  - message_id (PK), sender_id, recipient_type, content, sent_at, channel
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/v1/admissions                    - Submit admission application
GET    /api/v1/students/{id}                 - Get student profile
PUT    /api/v1/students/{id}                 - Update student record
POST   /api/v1/attendance                    - Mark attendance
GET    /api/v1/attendance/{student_id}       - Get attendance records
POST   /api/v1/fees/collect                  - Record fee payment
GET    /api/v1/fees/dues/{student_id}        - Get fee dues
GET    /api/v1/grades/{student_id}           - Get academic performance
GET    /api/v1/timetable/{class_id}          - Get class timetable
POST   /api/v1/messages/broadcast            - Send announcement
GET    /api/v1/reports/attendance            - Attendance report
GET    /api/v1/reports/collection            - Fee collection report
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend (Web) | React + TypeScript |
| Mobile App | React Native (iOS + Android) |
| Backend | Node.js / Django REST Framework |
| Database | PostgreSQL (multi-tenant) |
| File Storage | AWS S3 / Azure Blob |
| Notifications | Firebase (push) + Twilio (SMS) + SendGrid (email) |
| Auth | OAuth 2.0 / JWT |
| Deployment | AWS ECS / Azure App Service |
| Reporting | Jasper Reports / React-PDF |

---

## 12. Security Considerations

- Role-based access control with data isolation per institution (multi-tenancy)
- Student and guardian PII encrypted at rest (AES-256)
- Secure document storage with access-controlled signed URLs
- All API endpoints authenticated with JWT
- Parent can only see their own ward's data
- GDPR / DPDP compliant data handling, consent, and deletion
- Audit log of all significant record changes
- Password policies and MFA for admin accounts

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Attendance marking time | < 2 min per class |
| Fee payment online adoption | > 80% |
| Parent portal login rate | > 70% |
| Parent response time to absence notifications | < 30 min |
| Report card generation time | < 5 min per class |
| System uptime | > 99.9% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Student profiles, class management, enrollment |
| Phase 2 | Month 3 | Attendance, timetable, teacher portal |
| Phase 3 | Month 4 | Fee management, online payments |
| Phase 4 | Month 5 | Gradebook, report cards, academic records |
| Phase 5 | Month 6 | Mobile apps, communication module |
| Phase 6 | Month 7 | Library, transport, hostel |
| Go-Live | Month 8 | Pilot with one institution, full rollout |
