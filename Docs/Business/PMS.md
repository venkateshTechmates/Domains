# PRD — Project Management System (PMS)

## 1. Product Overview

A **Project Management System (PMS)** is a collaborative platform for planning, executing, monitoring, and closing projects. It enables teams to define tasks, assign resources, track timelines, manage budgets, and communicate progress — ensuring projects are delivered on time, within scope, and within budget.

---

## 2. Goals & Objectives

- Provide a centralized workspace for all project planning and execution
- Improve team collaboration and task transparency
- Enable accurate project scheduling with dependencies and milestones
- Track budget vs. actuals in real time
- Identify and mitigate risks proactively
- Generate status reports automatically for stakeholders

---

## 3. Stakeholders

| Role | Responsibility |
|---|---|
| Project Manager | Plan, execute, monitor projects |
| Team Member | Execute tasks, update progress |
| Resource Manager | Resource allocation oversight |
| Client / Stakeholder | View reports, approve milestones |
| Finance Manager | Budget tracking and cost reporting |
| PMO Lead | Portfolio view, governance |

---

## 4. Scope

### In Scope
- Project and Portfolio Management
- Task & Work Item Management
- Gantt Chart and Timeline Planning
- Milestone Management
- Resource Allocation and Capacity Planning
- Budget Tracking
- Risk and Issue Management
- Document Management
- Time Tracking
- Reports and Dashboards
- Team Collaboration and Comments

### Out of Scope
- Billing and invoicing to clients (ERP scope)
- HR payroll
- Full IT service management (ITSM)

---

## 5. User Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| PMO Lead | All projects in portfolio |
| Project Manager | Full access to own projects |
| Team Member | Assigned tasks within a project |
| Viewer / Client | Read-only project status |
| Resource Manager | Resource availability and allocation |

---

## 6. Functional Requirements

### 6.1 Project Setup
- Create project with name, description, start/end date, budget
- Project templates for common project types
- Project phases and work breakdown structure (WBS)
- Tagging and categorization (department, type, priority)
- Client and stakeholder association

### 6.2 Task & Work Item Management
- Create tasks, subtasks, and checklists
- Task types: story, bug, milestone, task
- Priority levels: Critical, High, Medium, Low
- Assign to one or multiple team members
- Due dates, estimated effort, and actual hours
- Task dependencies (Finish-to-Start, Start-to-Start)
- Task status workflow (To Do → In Progress → Review → Done)
- Bulk task import from CSV/Excel

### 6.3 Views & Visualization
- Kanban board view
- List view
- Gantt chart (timeline) with drag-and-drop adjustments
- Calendar view
- Workload view per resource
- Sprint/iteration view for agile teams

### 6.4 Milestone Management
- Define project milestones with dates
- Milestone completion tracking
- Client-facing milestone approval workflow
- Milestone-based payment triggers (integration)

### 6.5 Resource Allocation & Capacity Planning
- Resource pool management (team members, contractors)
- Assign resources to tasks with start/end dates and allocation %
- Resource capacity calendar (available hours per day/week)
- Over-allocation detection and alerts
- Resource utilization report

### 6.6 Budget Tracking
- Project budget setup with cost categories
- Planned vs. actual cost tracking
- Time-and-material vs. fixed price project support
- Expense logging (travel, procurement, software)
- Budget burn rate dashboard
- Budget threshold alerts

### 6.7 Risk & Issue Management
- Risk register: identify, assess, and mitigate risks
- Risk probability and impact scoring (matrix)
- Issue log: capture, assign, and track resolution
- Blocked task flagging and escalation
- Risk/issue activity history

### 6.8 Document Management
- Project document repository
- Version-controlled file uploads
- Link documents to tasks or milestones
- Template library (SOW, project charter, status report)
- Access control per document

### 6.9 Time Tracking
- Daily/weekly timesheet submission
- Log hours against specific tasks
- Timer-based time entry (start/stop)
- Manager timesheet approval
- Time report for billing and resource analysis

### 6.10 Reports & Dashboards
- Project health dashboard (RAG status)
- Milestone completion report
- Budget vs. actual report
- Resource utilization report
- Task completion velocity
- Risk and issue summary
- Portfolio dashboard (all projects in one view)
- Exportable reports (PDF, Excel)

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Availability | 99.9% uptime |
| Performance | Gantt render for 500+ tasks < 3 seconds |
| Scalability | 1000+ concurrent users, 10,000+ tasks per project |
| Mobile | iOS and Android app for task management |
| Security | RBAC, project-level access isolation |
| Integration | Jira, GitHub, Slack, MS Teams, Google Workspace |
| Compliance | SOC 2 Type II for enterprise plans |

---

## 8. Key User Stories

- As a **project manager**, I want to see the critical path on the Gantt chart so I know which tasks cannot slip.
- As a **team member**, I want to receive task notifications when I'm assigned new work.
- As a **PMO lead**, I want a portfolio dashboard showing all projects' health (on-track, at-risk, delayed).
- As a **project manager**, I want to flag a risk when I see a dependency at risk of missing its date.
- As a **resource manager**, I want to see which team members are over-allocated next sprint.
- As a **finance manager**, I want to see current budget burn rate for all active projects.

---

## 9. Data Model (High-Level Entities)

```
Project
  - project_id (PK), name, description, start_date, end_date, budget, status, manager_id

Phase
  - phase_id (PK), project_id (FK), name, start_date, end_date, sequence

Task
  - task_id (PK), project_id (FK), phase_id (FK), title, type, priority, assignee_id, start, due_date, status, estimated_hrs

Task Dependency
  - dep_id (PK), task_id (FK), depends_on_task_id (FK), type

Milestone
  - milestone_id (PK), project_id (FK), name, due_date, completed, approved_by

Resource
  - resource_id (PK), user_id (FK), project_id (FK), allocation_pct, start_date, end_date

Time Entry
  - entry_id (PK), task_id (FK), user_id (FK), date, hours, notes, status

Risk
  - risk_id (PK), project_id (FK), description, probability, impact, mitigation, owner_id, status

Budget Item
  - budget_item_id (PK), project_id (FK), category, planned, actual
```

---

## 10. API Design (Key Endpoints)

```
POST   /api/projects                          - Create project
GET    /api/projects/{id}                     - Get project details
POST   /api/projects/{id}/tasks               - Create task
PUT    /api/tasks/{id}/status                 - Update task status
GET    /api/projects/{id}/gantt               - Get Gantt data
POST   /api/tasks/{id}/time-entries           - Log time
POST   /api/projects/{id}/risks               - Add risk
PUT    /api/risks/{id}                        - Update risk
GET    /api/projects/{id}/budget              - Get budget vs actual
GET    /api/portfolio/dashboard               - Portfolio health
GET    /api/reports/utilization               - Resource utilization
```

---

## 11. Tech Stack Recommendations

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Mobile | React Native |
| Backend | Node.js / Java Spring Boot |
| Database | PostgreSQL |
| Cache | Redis |
| Real-time | WebSocket (task updates, comments) |
| Auth | OAuth 2.0 + SSO |
| Storage | AWS S3 (documents) |
| Deployment | Kubernetes |

---

## 12. Security Considerations

- Project-level isolation: users cannot access projects they are not part of
- Role-based: team members cannot modify project setup or budget
- Document access control per file
- Audit log on all task and project changes
- Two-factor authentication for admin accounts

---

## 13. Success Metrics / KPIs

| Metric | Target |
|---|---|
| On-time project delivery rate | > 80% |
| Budget overrun rate | < 10% |
| Task completion on time | > 85% |
| Resource utilization | 75–85% |
| User adoption | > 90% of PM team |
| Report generation time | < 30 seconds |

---

## 14. Implementation Phases

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 | Month 1 | Project setup, tasks, Kanban |
| Phase 2 | Month 2 | Gantt chart, dependencies, milestones |
| Phase 3 | Month 3 | Resource planning, time tracking |
| Phase 4 | Month 4 | Budget tracking, risks and issues |
| Phase 5 | Month 5 | Portfolio dashboard, advanced reports |
| Go-Live | Month 6 | Deploy and team onboarding |
