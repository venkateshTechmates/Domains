# PRD — Learning Management System (LMS)

## 1. Product Overview

A **Learning Management System (LMS)** is a platform for creating, delivering, managing, and tracking educational and training content. It serves corporate training, academic institutions, and online course providers — enabling instructors to author courses and learners to access, complete, and get certified on structured learning paths.

---

## 2. Goals & Objectives

- Centralize all training and learning content in one platform
- Deliver consistent training experiences to distributed teams or students
- Track learner progress, completion, and assessment scores
- Reduce training costs by replacing in-person sessions with digital courses
- Enable certification and compliance tracking
- Provide analytics to L&D managers on learning effectiveness

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| L&D Manager | Course planning, programs, reporting |
| Instructor / Trainer | Course creation, assessment, feedback |
| Learner / Employee / Student | Access courses, take assessments |
| Department Manager | Assign training to team, track compliance |
| HR Admin | Mandatory compliance training tracking |
| IT Administrator | System setup, SSO, integrations |

---

## 4. Scope

### In Scope
- Course Authoring and Management
- Learner Enrollment and Progress Tracking
- Assessments and Quizzes
- Learning Paths and Programs
- Certifications and Badges
- Discussion Forums and Collaboration
- Notifications and Reminders
- Reports and Analytics
- SCORM / xAPI content support
- Mobile Learning

### Out of Scope
- Live video conferencing (integration only with Zoom/Teams)
- College ERP administrative functions
- Recruitment or HRMS features

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Instructor | Create courses, manage assessments |
| L&D Manager | All courses, enroll learners, reports |
| Learner | Access assigned courses, take assessments |
| Manager | Assign training to team, view team progress |
| Guest | Preview only (public courses) |

---

## 6. Functional Requirements

### 6.1 Course Authoring
- Course builder with modules, lessons, and topics
- Content types: video, PDF, SCORM, xAPI, text, slides, audio
- Drag-and-drop lesson ordering
- Pre-requisite lesson/module gating
- Inline quizzes embedded within lessons
- Content versioning for course updates

### 6.2 Enrollment Management
- Manual enrollment by admin/manager
- Self-enrollment from course catalog
- Auto-enrollment based on role/department/onboarding trigger
- Enrollment approval workflow (optional)
- Waitlist management for instructor-led sessions

### 6.3 Learner Portal
- Personalized dashboard (enrolled, in-progress, completed)
- Learning path view with milestones
- Resume course from last position
- Bookmarks and notes within course
- Course search and catalog browse
- Certificate download after completion

### 6.4 Assessments & Quizzes
- Question types: MCQ, True/False, Short Answer, Match the Following, Fill-in-Blank
- Question bank management
- Randomized question order and answer shuffling
- Time-limited assessments
- Auto-grading for objective questions
- Manual grading workflow for subjective answers
- Attempt limits and retake policies
- Feedback and correct answers after submission

### 6.5 Learning Paths & Programs
- Curated sequences of courses as a program
- Mandatory vs elective courses within a program
- Progress milestones and checkpoints
- Program-level certification upon completion

### 6.6 Certifications & Badges
- Auto-issue certificates on course/program completion (PDF)
- Configurable certificate templates
- Expiry dates and renewal reminders for compliance certs
- Digital badges (Open Badges standard)
- Badge sharing to LinkedIn

### 6.7 Discussions & Collaboration
- Course-level discussion forums
- Q&A threads per lesson
- Instructor and peer replies
- Announcement posts by instructors
- Cohort groups for collaborative learning

### 6.8 Notifications & Reminders
- Enrollment confirmation emails
- Deadline reminders for due training
- Certificate issuance notifications
- Course completion congratulations
- Upcoming session reminders (ILT)

### 6.9 Compliance Training Management
- Mandatory training assignment with due date
- Compliance completion tracking per employee
- Escalations to manager/HR if not completed on time
- Audit-ready compliance reports

### 6.10 Reports & Analytics
- Course completion rates
- Assessment score distribution
- Learner progress report (by person, dept, course)
- Time spent per course/module
- Overdue training compliance report
- Course effectiveness (completion + score + feedback)

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% uptime |
| Performance | Video streaming with < 3-second buffer |
| Scalability | Support 100,000+ learners |
| Mobile | iOS and Android apps |
| Standards | SCORM 1.2, SCORM 2004, xAPI (Tin Can) |
| Accessibility | WCAG 2.1 AA compliant |
| Security | RBAC, SSO (SAML 2.0), content DRM |

---

## 8. Key User Stories

- As a **learner**, I want to resume a course from where I left off so I don't lose progress.
- As an **instructor**, I want to create a quiz with randomized questions so learners cannot share answers.
- As an **L&D manager**, I want to assign mandatory compliance training to all employees and track completion.
- As a **learner**, I want to download my certificate after completing a course to share it on LinkedIn.
- As a **department manager**, I want to see a report of which team members have completed mandatory training.
- As a **mobile learner**, I want to access courses offline when I don't have internet access.

---

## 9. Data Model (High-Level Entities)

```
Course
  - course_id (PK), title, description, instructor_id (FK), status, duration_hours, thumbnail

Module
  - module_id (PK), course_id (FK), title, sequence, is_prerequisite_of

Lesson
  - lesson_id (PK), module_id (FK), title, type (video/pdf/scorm/text), content_url, duration

Enrollment
  - enrollment_id (PK), learner_id (FK), course_id (FK), enrolled_at, status, progress_pct, completed_at

Assessment
  - assessment_id (PK), lesson_id/course_id (FK), pass_score, time_limit, attempts_allowed

Question
  - question_id (PK), assessment_id (FK), text, type, options[], correct_answer

Attempt
  - attempt_id (PK), enrollment_id (FK), assessment_id (FK), score, passed, started_at, submitted_at

Certificate
  - cert_id (PK), enrollment_id (FK), issued_at, expiry_date, pdf_url
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/courses                          - Create course
GET    /api/courses                          - List course catalog
POST   /api/courses/{id}/publish             - Publish course
POST   /api/enrollments                      - Enroll learner
GET    /api/enrollments/{learner_id}         - Get learner's courses
PUT    /api/enrollments/{id}/progress        - Update lesson progress
POST   /api/assessments/{id}/attempt         - Start assessment attempt
POST   /api/assessments/attempts/{id}/submit - Submit answers
GET    /api/certificates/{enrollment_id}     - Download certificate
GET    /api/reports/compliance               - Compliance training report
GET    /api/reports/course/{id}              - Course analytics
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Mobile | React Native |
| Backend | Node.js / Java Spring Boot |
| Database | PostgreSQL |
| Video Streaming | AWS CloudFront + S3 / Vimeo |
| Cache | Redis |
| Search | Elasticsearch |
| Auth | SAML 2.0 (SSO) + JWT |
| Deployment | AWS ECS / Kubernetes |

---

## 12. Security Considerations

- Course content hosted on CDN with signed URLs (not publicly guessable)
- SCORM/xAPI data stored securely per learner session
- RBAC: learners cannot access unenrolled course content
- Assessment integrity: randomized questions, time limits
- Data privacy: learner performance data handled per GDPR
- SSO integration for enterprise identity management

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| Course completion rate | > 75% |
| Compliance training completion | 100% on time |
| Assessment pass rate (1st attempt) | > 70% |
| Learner satisfaction (NPS) | > 70 |
| Time to course creation | < 1 week |
| Mobile learner adoption | > 40% |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Course authoring, enrollment, learner portal |
| Phase 2 | Month 2 | Assessments, certifications, learning paths |
| Phase 3 | Month 3 | Compliance tracking, notifications |
| Phase 4 | Month 4 | Discussions, badges, SCORM/xAPI support |
| Phase 5 | Month 5 | Analytics, mobile app |
| Go-Live | Month 6 | Full deployment and content migration |
