# PRD — Exam Management System

## 1. Product Overview

An **Exam Management System** is a specialized software platform that handles the complete lifecycle of academic examinations — from question paper creation and exam scheduling through student registration, hall ticket generation, invigilation, result processing, and grade publication. It serves both traditional pen-and-paper examinations and online (computer-based) tests across schools, universities, and competitive examination boards.

---

## 2. Goals & Objectives

- Digitize and automate the end-to-end examination process
- Reduce manual effort and human error in result processing
- Ensure integrity and confidentiality of question papers
- Enable fair and transparent examination scheduling and seating
- Support both offline (OMR, written) and online (CBT) examination modes
- Deliver results quickly and accurately with automated grade computation
- Provide certificate and marksheet generation

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Examination Controller | Exam scheduling, policy configuration |
| Question Paper Setter | Create and upload question papers |
| Faculty / Subject Expert | Review and approve questions |
| Invigilator | Conduct examinations, attendance |
| Student | Register, appear, view results |
| Admin / COE | Central management and reporting |
| Parent | View result notifications |
| IT Administrator | System operations |

---

## 4. Scope

### In Scope
- Exam scheduling and configuration
- Student exam registration and eligibility checking
- Hall ticket (admit card) generation
- Question bank management
- Question paper creation and scrambling
- Seating arrangement generation
- Online exam (CBT) — MCQ, short answer, coding
- OMR sheet management (offline exams)
- Invigilation management
- Answer sheet scanning and evaluation
- Result processing, grade computation
- Result publishing and student notification
- Marksheet and certificate generation
- Re-evaluation and re-checking workflow
- Analytics and pass/fail statistics

### Out of Scope
- Learning Management System (LMS) content delivery
- Student enrollment (handled by SMS)
- HR management of examiners

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | All institutions (SaaS) |
| Exam Controller | Full exam management for institution |
| Faculty / Paper Setter | Question bank, assigned subjects only |
| Invigilator | Seating chart, attendance marking, CBT monitoring |
| Student | Registration, hall ticket, results |
| Parent | View ward's results and notifications |
| Result Processing Staff | Marks entry, OMR processing |

---

## 6. Functional Requirements

### 6.1 Exam Configuration & Scheduling
- Create exam types: Internal, External, Semester, Annual, Competitive
- Configure exam schedule (date, time, duration, venue)
- Define eligibility criteria (attendance %, previous result)
- Subject-wise exam slot management
- Exam calendar for students and faculty
- Academic year and semester mapping

### 6.2 Student Registration & Eligibility
- Automatic eligibility checking against criteria (attendance %)
- Bulk registration based on enrollment
- Manual override for special cases (with approval)
- Registration period window with cut-off
- Exam fee collection for individual registration
- Registration validation and confirmation notification

### 6.3 Hall Ticket (Admit Card) Generation
- Automated hall ticket generation post-registration
- Hall ticket contains: student name, roll no, exam schedule, venue, photo
- Digital hall ticket download (PDF, mobile)
- Physical hall ticket printing (bulk PDF)
- Admit card blocking for fee defaulters
- Duplicate hall ticket reprint request

### 6.4 Question Bank Management
- Subject-wise, topic-wise question storage
- Question types: MCQ, True/False, Short Answer, Long Answer, Coding
- Difficulty tagging: Easy, Medium, Hard
- Bloom's Taxonomy classification
- Question approval workflow (setter → reviewer)
- Import questions from Word/Excel templates
- Version control for questions (prevent reuse)

### 6.5 Question Paper Generation
- Manual question paper compilation
- Auto-generation from question bank (by difficulty, topic, marks)
- Multiple paper sets (Set A, B, C) with scrambled order
- OMR answer key generation
- Question paper encryption until exam date
- Sealed paper access only on exam day (time-locked download)
- Watermarking to deter leaks

### 6.6 Seating Arrangement
- Automated random seat allocation (student to hall/room/seat)
- Configurable shuffling to separate students from same class/section
- Seating plan printout per hall
- Invigilator allocation per hall
- Reserve seats for special needs students
- Vacant seat tracking

### 6.7 Online Exam (CBT) Module
- Secure browser / lockdown browser support
- Student login with OTP-based session
- Question display: single, paged, or all at once (configurable)
- MCQ, drag-and-drop, fill-in-the-blank, code editor (for programming exams)
- Auto-submit on time expiry
- Periodic auto-save (every 30 seconds)
- Proctoring: webcam snapshot, screen lock, copy-paste disable
- AI-based suspicious behavior flagging
- Offline fallback mode with sync on reconnect

### 6.8 Invigilation Management
- Invigilator assignment to halls
- Digital attendance marking for students (vs. hall ticket)
- Malpractice incident logging
- Flying squad report submission
- Invigilation duty report

### 6.9 Result Processing
- OMR scanning and auto-grading
- Manual marks entry interface (per subject, per student)
- Marks moderation and scaling
- Grace marks application (configurable)
- Grade computation (marks → grade/GPA per configured scale)
- Internal and external marks aggregation
- Auto-calculation of total, percentage, rank
- Fail / pass determination
- Arrear (back paper) tracking

### 6.10 Result Publication & Certificates
- Bulk result upload and publish
- Real-time result notification to students (SMS, email, push)
- Online result lookup (roll number or student ID)
- Marksheet generation (PDF) — downloadable and printable
- Grade card / transcript generation
- Provisional and original certificate generation
- Stamp and signature digital overlay
- Re-evaluation request submission workflow

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% (99.99% on exam days) |
| CBT Concurrency | 10,000+ simultaneous students per deployment |
| Latency | Question load < 1 second |
| Security | Encrypted question papers, lockdown browser |
| Scalability | Horizontal scaling on CBT servers |
| Data Retention | Exam records retained 10+ years |
| Compliance | UGC / university regulations, accessibility standards |

---

## 8. Key User Stories

- As a **student**, I want to download my hall ticket digitally so I can use it on my phone at the exam hall.
- As an **exam controller**, I want automated seating arrangements generated in minutes to save days of manual work.
- As a **faculty**, I want to build a question bank and auto-generate three scrambled sets for fairness.
- As a **student**, I want to take my CBT exam with auto-save so a network glitch won't cost me my answers.
- As an **admin**, I want result marksheets generated automatically so we can publish results the same day.
- As a **student**, I want to apply for re-evaluation online and track the status without visiting the office.

---

## 9. Data Model (High-Level Entities)

```
ExamSchedule
  - exam_id (PK), institution_id, name, type, academic_year, date, duration, subject_id, venue

StudentRegistration
  - reg_id (PK), student_id (FK), exam_id (FK), roll_no, hall_ticket_no, eligibility, status

Question
  - question_id (PK), subject_id (FK), text, type, difficulty, options[], correct_answer, marks

QuestionPaper
  - paper_id (PK), exam_id (FK), set_name, questions[], total_marks, created_by, locked_at

SeatAllocation
  - seat_id (PK), exam_id (FK), student_id (FK), hall, room, seat_no

ExamSession (CBT)
  - session_id (PK), student_id (FK), exam_id (FK), start_time, end_time, status, answers[]

Result
  - result_id (PK), student_id (FK), exam_id (FK), subject_id (FK), marks_obtained, grade, pass_fail

Marksheet
  - sheet_id (PK), student_id (FK), academic_year, subjects_results[], total, percentage, rank, issued_at
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/v1/exams                         - Create exam schedule
GET    /api/v1/exams/{id}                    - Get exam details
POST   /api/v1/registrations                 - Register student for exam
GET    /api/v1/hall-tickets/{student_id}     - Get hall ticket PDF
POST   /api/v1/questions                     - Add question to bank
POST   /api/v1/papers/generate               - Auto-generate question paper
GET    /api/v1/seating/{exam_id}             - Get seating arrangement
POST   /api/v1/cbtsessions/start             - Start CBT exam session
PUT    /api/v1/cbtsessions/{id}/answer       - Submit answer
POST   /api/v1/cbtsessions/{id}/submit       - Final submit
POST   /api/v1/results/upload                - Upload marks
GET    /api/v1/results/{student_id}          - Get results
GET    /api/v1/marksheets/{student_id}       - Download marksheet PDF
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend (Web) | React + TypeScript |
| Mobile App | React Native |
| Backend | Node.js / Spring Boot |
| CBT Engine | Go (high concurrency) |
| Database | PostgreSQL + Redis (session) |
| File/PDF Gen | Jasper Reports / Puppeteer |
| Proctoring | WebRTC + AI (face detection) |
| Auth | JWT + OTP (CBT session) |
| Deployment | Kubernetes (auto-scale on exam days) |
| OMR Processing | OpenCV-based image processing |

---

## 12. Security Considerations

- Question papers encrypted at rest and only decryptable on exam day (time-locked keys)
- CBT lockdown browser blocks external URLs, alt-tab, copy-paste
- Unique session tokens per CBT session — cannot share links
- AI proctoring captures webcam frames and flags suspicious activity
- All result data encrypted at rest; marksheets digitally signed
- Role-based access: paper setters cannot view other subject papers
- Penetration testing before each major examination cycle
- Audit logs for all question access, paper creation, result modification

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Seating arrangement generation time | < 5 min for 5,000 students |
| CBT system uptime on exam day | 99.99% |
| Results published within | 24 hours of exam completion |
| Marksheet generation time | < 10 min for entire batch |
| Manual data entry errors | 0% (via OMR auto-grading) |
| Student hall ticket download rate | > 95% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1–2 | Exam config, student registration, hall ticket |
| Phase 2 | Month 3 | Question bank, question paper generation |
| Phase 3 | Month 4 | Seating arrangement, invigilation module |
| Phase 4 | Month 5 | OMR processing, marks entry, result processing |
| Phase 5 | Month 6 | CBT module (online exam) with proctoring |
| Phase 6 | Month 7 | Marksheet, certificates, re-evaluation workflow |
| Go-Live | Month 8 | Pilot exam cycle, full institution rollout |
