# Product Requirements Document (PRD)
# Content Management System (CMS)

---

**Version:** 2.0  
**Status:** Final Draft  
**Date:** March 2026  
**Owner:** Product Team  
**Stakeholders:** Engineering · Design · QA · Marketing · Content · SEO · DevOps

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Goals & Objectives](#3-goals--objectives)
4. [Success Metrics / KPIs](#4-success-metrics--kpis)
5. [Stakeholders](#5-stakeholders)
6. [Assumptions & Constraints](#6-assumptions--constraints)
7. [Scope — In Scope & Out of Scope](#7-scope)
8. [Complete Feature List](#8-complete-feature-list)
9. [User Roles & Permissions Matrix](#9-user-roles--permissions-matrix)
10. [End-to-End Screen Flows](#10-end-to-end-screen-flows)
    - 10.1 [Authentication & Onboarding Flow](#101-authentication--onboarding-flow)
    - 10.2 [Dashboard Flow](#102-dashboard-flow)
    - 10.3 [Content Creation & Editing Flow](#103-content-creation--editing-flow)
    - 10.4 [Content Workflow & Approval Flow](#104-content-workflow--approval-flow)
    - 10.5 [Media Library Flow](#105-media-library-flow)
    - 10.6 [SEO Management Flow](#106-seo-management-flow)
    - 10.7 [Versioning & Rollback Flow](#107-versioning--rollback-flow)
    - 10.8 [Multi-language & Translation Flow](#108-multi-language--translation-flow)
    - 10.9 [Navigation & Menus Flow](#109-navigation--menus-flow)
    - 10.10 [Forms & Landing Pages Flow](#1010-forms--landing-pages-flow)
    - 10.11 [Settings & Administration Flow](#1011-settings--administration-flow)
    - 10.12 [Analytics Flow](#1012-analytics-flow)
    - 10.13 [API & Headless CMS Flow](#1013-api--headless-cms-flow)
11. [Functional Requirements](#11-functional-requirements)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Key User Stories](#13-key-user-stories)
14. [Data Model](#14-data-model)
15. [API Design](#15-api-design)
16. [Tech Stack](#16-tech-stack)
17. [Security Considerations](#17-security-considerations)
18. [Error Handling & Edge Cases](#18-error-handling--edge-cases)
19. [Accessibility Requirements](#19-accessibility-requirements)
20. [Implementation Phases & Roadmap](#20-implementation-phases--roadmap)
21. [Open Questions & Risks](#21-open-questions--risks)

---

## 1. Executive Summary

This document defines the complete product requirements for a **Content Management System (CMS)** — a platform that enables non-technical users to create, manage, publish, and organize digital content without writing code.

**The Problem:** Content teams currently depend on developers to publish, update, or roll back any digital content, causing delays, bottlenecks, and increased operational costs.

**The Solution:** A self-service, workflow-driven CMS with built-in approval workflows, SEO tools, versioning, multi-language support, and a headless API layer for decoupled frontend delivery.

| Key Fact | Detail |
|----------|--------|
| Target Go-Live | Month 6 from project kickoff |
| Primary Users | Content Editors, Publishers, SEO Specialists, Web Admins |
| Core Goal | Reduce content publishing time by 60% |
| Architecture | API-first / Headless CMS with optional decoupled frontend |
| Compliance | GDPR-ready with cookie consent and data deletion |

---

## 2. Product Overview

A CMS is a platform enabling non-technical users to create, manage, publish, and organize digital content — web pages, blogs, media, and documents — without writing code. It provides structured workflows for content creation, review, versioning, and publication across websites, portals, and digital channels.

**Key Differentiators:**
- API-first / Headless architecture supporting JAMstack frontends
- Structured multi-step approval workflows with notifications
- Full content versioning with side-by-side diff and one-click rollback
- Built-in SEO toolkit (meta, OG tags, sitemaps, JSON-LD, SERP preview)
- Multi-language and multi-site content management
- Drag-and-drop block editor — no code required
- Real-time auto-save with conflict detection

---

## 3. Goals & Objectives

| # | Goal | Objective |
|---|------|-----------|
| G1 | Reduce IT dependency | Empower content teams to publish without developer help |
| G2 | Structured workflows | Enforce Draft → Review → Approved → Published pipeline |
| G3 | Multi-channel publishing | Support web, mobile, and social delivery via API |
| G4 | Content safety | Full versioning, rollback, and audit trail |
| G5 | SEO performance | Built-in tools to optimize every page for search |
| G6 | Global reach | Multi-language content and translation workflow |
| G7 | Developer enablement | REST + GraphQL APIs for custom frontend builds |
| G8 | Compliance | GDPR-ready cookie consent and data deletion |

---

## 4. Success Metrics / KPIs

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Content publishing time | 3–5 days (via dev) | Reduced by 60% | CMS time tracking |
| Non-technical user adoption | 0% self-service | > 90% of content team | User activity logs |
| Page SEO score average | Unknown | > 85 / 100 | Lighthouse / SEMrush |
| API response time (P99) | N/A | < 200ms | APM monitoring |
| Content rollback success rate | N/A | 100% | Version audit logs |
| Broken link rate | Unknown | 0% | Automated link checker |
| System uptime | N/A | 99.9% | Infrastructure monitoring |
| Media upload success rate | N/A | > 99.5% | Upload logs |
| Form submission capture rate | N/A | 100% | Form audit logs |
| Time-to-first-publish (new user) | N/A | < 30 minutes | Onboarding funnel |

---

## 5. Stakeholders

| Role | Team | Responsibility |
|------|------|----------------|
| Product Owner | Product | Define requirements, prioritize backlog |
| Content Editor | Content Team | Create and edit content |
| Content Reviewer | Editorial Team | Review, annotate, and comment on drafts |
| Content Publisher | Marketing Lead | Approve and trigger final publication |
| SEO Specialist | SEO Team | Manage metadata, keywords, sitemaps |
| Web Administrator | IT / Web Ops | Templates, menus, site settings |
| Developer | Engineering | Custom templates, API integrations |
| QA Engineer | QA Team | Test all workflows and regression |
| Security / Compliance | InfoSec | RBAC review, GDPR compliance |
| End User (Web Visitor) | Public | Consume published content |

---

## 6. Assumptions & Constraints

### Assumptions
- Users have modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- All users authenticated via organization's identity provider (SSO / OAuth 2.0)
- Media files stored on AWS S3 and served via CloudFront CDN
- Initial launch is English-first; multi-language enabled from Phase 4
- CMS admin panel is desktop-first (tablet support is secondary)
- Email notification service (SendGrid or SES) available at project start

### Constraints
- 6-month delivery timeline to go-live
- Must comply with GDPR and data residency requirements
- API must be backward-compatible; breaking changes require versioning
- Uploaded media must pass virus scanning before becoming accessible
- No real-time co-editing in v1 (future consideration)

### Dependencies
| Dependency | Owner | Required By |
|------------|-------|-------------|
| AWS S3 + CloudFront setup | Infra team | Phase 1 |
| OAuth 2.0 / SSO integration | IT / Security | Phase 1 |
| Email notification service | DevOps | Phase 2 |
| CDN configuration and caching rules | DevOps | Phase 5 |
| Google Search Console integration | SEO Team | Phase 3 |

---

## 7. Scope

### In Scope
| # | Feature Area |
|---|-------------|
| 1 | Page and Blog Post Management |
| 2 | Media Library (images, videos, documents) |
| 3 | Content Workflow (Draft → Review → Approved → Published) |
| 4 | User and Role Management |
| 5 | SEO Management (meta, OG, sitemaps, JSON-LD, redirects) |
| 6 | Versioning and Content History with rollback |
| 7 | Multi-language and Translation Workflow |
| 8 | Menus and Navigation Management |
| 9 | Forms and Landing Pages |
| 10 | API-first / Headless CMS (REST + GraphQL) |
| 11 | Analytics Integration (Google Analytics / Tag Manager) |
| 12 | Scheduled Publishing |
| 13 | Email Notifications |
| 14 | Audit Log |
| 15 | GDPR Compliance Tools |

### Out of Scope (v1)
| # | Feature | Reason |
|---|---------|--------|
| 1 | E-Commerce checkout and payments | Separate product domain |
| 2 | CRM functionality | Out of product scope |
| 3 | Custom application development | Developer self-service |
| 4 | Native mobile app for CMS admin | Phase 2 consideration |
| 5 | Real-time collaborative editing | Future roadmap |
| 6 | AI content generation | Future roadmap |
| 7 | A/B testing | Phase 2 consideration |

---

## 8. Complete Feature List

### F1 — Authentication & User Management
- [ ] F1.1 Email + password login
- [ ] F1.2 SSO / OAuth 2.0 login
- [ ] F1.3 Two-factor authentication (2FA)
- [ ] F1.4 Forgot password / reset password flow
- [ ] F1.5 User invite via email with role pre-assignment
- [ ] F1.6 User profile setup (name, language, notification preferences)
- [ ] F1.7 Session management (timeout, logout all devices)
- [ ] F1.8 User deactivation (preserves audit trail)
- [ ] F1.9 Role assignment and change by Super Admin

### F2 — Dashboard
- [ ] F2.1 Role-aware summary widgets (drafts, pending review, scheduled, published)
- [ ] F2.2 Quick action bar (New Page, New Post, Upload Media)
- [ ] F2.3 Notification center (bell icon with unread count)
- [ ] F2.4 Left sidebar navigation (collapsible)
- [ ] F2.5 Recent activity feed
- [ ] F2.6 Content status overview (count by status)

### F3 — Content Creation & Editing
- [ ] F3.1 WYSIWYG rich text editor
- [ ] F3.2 Drag-and-drop block/modular page builder
- [ ] F3.3 Block types: Text, Heading, Image, Video, Quote, Code, Columns, Embed, CTA, Card, Divider
- [ ] F3.4 Content templates (Page, Blog, Landing Page, FAQ, Case Study)
- [ ] F3.5 Custom content types with JSON schema field builder
- [ ] F3.6 Inline media picker from editor
- [ ] F3.7 Code block with syntax highlighting
- [ ] F3.8 Auto-save every 30 seconds with visual indicator
- [ ] F3.9 Live full-page preview (opens in new tab)
- [ ] F3.10 Duplicate content item
- [ ] F3.11 URL slug auto-generation (editable)
- [ ] F3.12 Category and tag assignment
- [ ] F3.13 Author assignment per content item
- [ ] F3.14 Scheduled publish date/time picker
- [ ] F3.15 Featured image and thumbnail assignment

### F4 — Content Workflow & Approval
- [ ] F4.1 State machine: Draft → In Review → Approved → Published → Archived
- [ ] F4.2 Assign reviewer per content item
- [ ] F4.3 Assign publisher per content item
- [ ] F4.4 Threaded inline comments on content blocks
- [ ] F4.5 Annotation/markup on specific content areas
- [ ] F4.6 Email notification on every state change
- [ ] F4.7 Publisher: Send back to draft with comment
- [ ] F4.8 Scheduled publishing with cron-based trigger
- [ ] F4.9 Unpublish content (moves to Archived)
- [ ] F4.10 Workflow queue dashboard (items grouped by state)
- [ ] F4.11 Bulk approve action for Publisher role
- [ ] F4.12 Publish failure alert (email to Admin + Publisher)

### F5 — Media Library
- [ ] F5.1 Drag-and-drop file upload
- [ ] F5.2 Multi-file upload with per-file progress
- [ ] F5.3 Automatic image optimization and resizing
- [ ] F5.4 Virus scanning on upload (blocks infected files)
- [ ] F5.5 File type whitelist enforcement
- [ ] F5.6 Folder creation, rename, delete, move
- [ ] F5.7 Tag-based asset organization (multi-tag)
- [ ] F5.8 Search and filter (by name, type, tag, date)
- [ ] F5.9 Grid and list view toggle
- [ ] F5.10 Alt text field (required for images, validated on publish)
- [ ] F5.11 Title, caption, and description fields
- [ ] F5.12 CDN URL auto-generation per asset
- [ ] F5.13 Replace file (preserves URL, creates version)
- [ ] F5.14 Asset version history
- [ ] F5.15 Bulk move, tag, and delete with confirmation
- [ ] F5.16 Export asset metadata as CSV
- [ ] F5.17 Inline picker modal (called from content editor)

### F6 — SEO Management
- [ ] F6.1 Meta title field (with character counter: 50–60 chars)
- [ ] F6.2 Meta description field (with character counter: 150–160 chars)
- [ ] F6.3 Canonical URL (auto-generated or manual override)
- [ ] F6.4 Open Graph title, description, image fields
- [ ] F6.5 Twitter Card fields
- [ ] F6.6 JSON-LD structured data editor (raw JSON)
- [ ] F6.7 URL slug editor with auto-301 redirect on change
- [ ] F6.8 No-index toggle per page
- [ ] F6.9 Live SERP preview (desktop + mobile rendering)
- [ ] F6.10 Social share preview (Facebook + Twitter card)
- [ ] F6.11 SEO health score with actionable recommendations
- [ ] F6.12 XML sitemap auto-generation on publish
- [ ] F6.13 Sitemap include/exclude per page
- [ ] F6.14 Sitemap change frequency settings
- [ ] F6.15 Robots.txt editor with validation
- [ ] F6.16 Robots.txt change history
- [ ] F6.17 Redirect manager (301 / 302)
- [ ] F6.18 Bulk redirect import via CSV
- [ ] F6.19 Redirect conflict detection
- [ ] F6.20 Site-wide SEO dashboard (missing fields, broken links)

### F7 — Versioning & Content History
- [ ] F7.1 Full version history per content item
- [ ] F7.2 Version metadata: author, timestamp, status
- [ ] F7.3 Side-by-side diff view (color-coded: added/removed/changed)
- [ ] F7.4 Toggle: all content vs. changes only
- [ ] F7.5 Version preview (full rendered page)
- [ ] F7.6 One-click rollback (creates new draft, preserves history)
- [ ] F7.7 Rollback confirmation modal
- [ ] F7.8 Retain minimum 50 versions per content item
- [ ] F7.9 Auto-save draft versioning (every 30s save creates version entry)

### F8 — Multi-language & Localization
- [ ] F8.1 Enable/disable languages site-wide (Admin)
- [ ] F8.2 Set default/primary language
- [ ] F8.3 Create language variant per content item
- [ ] F8.4 Side-by-side translation editor (source language reference)
- [ ] F8.5 Translation status per field (Not Started / In Progress / Complete)
- [ ] F8.6 Translation review workflow (same as content workflow)
- [ ] F8.7 hreflang tags auto-injected in published HTML
- [ ] F8.8 Language switcher widget on published site
- [ ] F8.9 Localized URL structure (e.g., /fr/page-slug)
- [ ] F8.10 Untranslated content fallback to default language

### F9 — Navigation & Menus
- [ ] F9.1 Create and manage: Header, Footer, Mobile, Sidebar menus
- [ ] F9.2 Menu item types: Internal page, External URL, Anchor
- [ ] F9.3 Drag-and-drop menu item ordering and nesting
- [ ] F9.4 Mega menu support with rich layout (columns, images)
- [ ] F9.5 Open in new tab toggle per item
- [ ] F9.6 Icon assignment per menu item
- [ ] F9.7 Breadcrumb configuration
- [ ] F9.8 Live preview overlay of menu changes
- [ ] F9.9 Save & publish (changes go live immediately)

### F10 — Forms & Landing Pages
- [ ] F10.1 Drag-and-drop form builder
- [ ] F10.2 Field types: Text, Email, Phone, Number, Date, Dropdown, Checkbox, Radio, Textarea, File, Rating
- [ ] F10.3 Field settings: Label, Placeholder, Required, Validation, Help text
- [ ] F10.4 Conditional field logic (show/hide based on values)
- [ ] F10.5 Form submission capture to database
- [ ] F10.6 Admin email notification on submission
- [ ] F10.7 Success message or redirect URL configuration
- [ ] F10.8 reCAPTCHA integration (toggle per form)
- [ ] F10.9 GDPR consent checkbox (required, non-removable)
- [ ] F10.10 Submissions table view with filter by date
- [ ] F10.11 Export submissions to CSV / Excel
- [ ] F10.12 Delete individual submission (GDPR compliance)
- [ ] F10.13 Mark submission as Spam / Archive
- [ ] F10.14 Embed code generator (HTML snippet)
- [ ] F10.15 Landing page builder (full-width, no standard header/footer)
- [ ] F10.16 Embed form blocks directly in landing pages

### F11 — API-first / Headless CMS
- [ ] F11.1 REST API for all content types
- [ ] F11.2 GraphQL API with schema introspection
- [ ] F11.3 JWT-secured content API
- [ ] F11.4 Public read-only endpoints for published content
- [ ] F11.5 API key generation and revocation
- [ ] F11.6 API usage metrics dashboard
- [ ] F11.7 Webhooks for content events (publish, update, delete)
- [ ] F11.8 Webhook signing secret for verification
- [ ] F11.9 Webhook delivery log with retry
- [ ] F11.10 JAMstack / decoupled frontend documentation
- [ ] F11.11 Rate limiting per API key

### F12 — Analytics
- [ ] F12.1 Google Analytics 4 integration (OAuth)
- [ ] F12.2 Google Tag Manager container ID input
- [ ] F12.3 Per-page view tracking
- [ ] F12.4 Content performance report (views, bounce rate, time on page)
- [ ] F12.5 SEO performance tab (impressions, clicks, CTR, avg. position via GSC)
- [ ] F12.6 Top pages by traffic
- [ ] F12.7 Export analytics data as CSV
- [ ] F12.8 Environment-aware tracking (disable on staging)

### F13 — Settings & Administration
- [ ] F13.1 Site name, tagline, favicon, logo
- [ ] F13.2 Default language and time zone
- [ ] F13.3 Cookie consent banner configuration (GDPR)
- [ ] F13.4 Default SEO fallback (title, description, OG image)
- [ ] F13.5 SMTP / email provider configuration
- [ ] F13.6 Notification template editor per workflow event
- [ ] F13.7 Audit log (all actions: who / what / when)
- [ ] F13.8 Audit log export to CSV
- [ ] F13.9 Environment management (staging vs. production)

---

## 9. User Roles & Permissions Matrix

| Feature | Super Admin | Editor | Reviewer | Publisher | SEO Mgr | Developer | Viewer |
|---------|:-----------:|:------:|:--------:|:---------:|:-------:|:---------:|:------:|
| Create content | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit own content | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit any content | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Submit for review | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Review & comment | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Approve content | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Publish content | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Unpublish content | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Schedule publish | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Manage media | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage SEO fields | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Manage menus | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage forms | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View submissions | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Access API keys | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Manage webhooks | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Manage users | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage content types | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View analytics | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Rollback versions | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Preview content | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| System settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View audit log | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 10. End-to-End Screen Flows

> **Screen ID Convention:** S-XX where XX is the screen number.
> Each flow begins with an entry point and ends with a terminal action or handoff to the next flow.

---

### 10.1 Authentication & Onboarding Flow

**Entry Point:** Invite email link OR direct CMS URL

```
╔══════════════════════════════════════════════════════════════════╗
║              AUTHENTICATION & ONBOARDING FLOW                   ║
╚══════════════════════════════════════════════════════════════════╝

[S-01: Login Screen]
  Fields: Email, Password
  Links:  "Forgot Password" | "Sign in with SSO"
  │
  ├── PATH A: New User (Invite)
  │     User clicks "Accept Invite" in email
  │     │
  │     ▼
  │   [S-02: Set Password]
  │     - Enter new password (min 8 chars, 1 uppercase, 1 number, 1 symbol)
  │     - Confirm password
  │     - Checkbox: Accept Terms of Service
  │     - [Set Password & Continue]
  │     │
  │     ▼
  │   [S-03: Profile Setup]
  │     - Full name (pre-filled from invite)
  │     - Role (pre-assigned, read-only display)
  │     - Preferred language (dropdown)
  │     - Email notifications: All / Assigned only / None
  │     - [Complete Setup]
  │     │
  │     ▼
  │   [S-07: Dashboard] ───────────────────────────────────────────►
  │
  ├── PATH B: Existing User (Email + Password)
  │     [S-01: Login Screen]
  │     │
  │     ├── FAIL: "Invalid credentials" toast
  │     │     - Retry up to 5 times
  │     │     - 6th fail: Account locked, email sent to user
  │     │
  │     └── SUCCESS
  │           │
  │           ├── 2FA Disabled → [S-07: Dashboard]
  │           │
  │           └── 2FA Enabled
  │                 ▼
  │               [S-04: Two-Factor Auth]
  │                 - Enter 6-digit code (TOTP app or SMS)
  │                 - [Verify] | [Resend Code]
  │                 │
  │                 ├── FAIL → "Invalid code" → Retry (3 attempts)
  │                 └── SUCCESS → [S-07: Dashboard]
  │
  ├── PATH C: SSO / OAuth Login
  │     [S-01] → "Sign in with SSO" button
  │     → Redirect to Identity Provider (Google / Okta / Azure AD)
  │     │
  │     ├── SUCCESS → Redirect back → [S-07: Dashboard]
  │     └── FAIL → Error screen with helpdesk link
  │
  └── PATH D: Forgot Password
        [S-05: Forgot Password]
          - Enter registered email
          - [Send Reset Link]
          - Toast: "If this email exists, a reset link has been sent"
          │
          ▼
        [S-06: Reset Password] (via time-limited email link, 1 hour TTL)
          - New password
          - Confirm password
          - [Reset Password]
          │
          ▼
        [S-01: Login Screen] with "Password reset successful" toast

─────────────────────────────────────────────────────────────────
SCREENS: S-01 Login | S-02 Set Password | S-03 Profile Setup
         S-04 Two-Factor Auth | S-05 Forgot Password | S-06 Reset Password
```

---

### 10.2 Dashboard Flow

**Entry Point:** Post-login redirect

```
╔══════════════════════════════════════════════════════════════════╗
║                        DASHBOARD FLOW                           ║
╚══════════════════════════════════════════════════════════════════╝

[S-07: Dashboard]
  │
  ├── TOP BAR
  │     - Site name + logo
  │     - Search bar (global content search)
  │     - 🔔 Notifications bell (badge count)
  │     - User avatar → Profile / Logout
  │
  ├── LEFT SIDEBAR NAVIGATION (collapsible)
  │     ├── 🏠 Dashboard
  │     ├── 📄 Content
  │     │     ├── Pages
  │     │     ├── Blog Posts
  │     │     ├── Landing Pages
  │     │     └── Custom Types (dynamic from content type config)
  │     ├── 🖼 Media Library
  │     ├── 📋 Forms
  │     ├── 🔗 Menus
  │     ├── 🔍 SEO
  │     ├── 📊 Analytics
  │     └── ⚙ Settings (Super Admin only)
  │
  ├── SUMMARY WIDGETS (role-aware)
  │     ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
  │     │ My Drafts  │ │Pending     │ │ Scheduled  │ │ Published  │
  │     │    12      │ │ Review  5  │ │ Today   3  │ │ This Week 8│
  │     └────────────┘ └────────────┘ └────────────┘ └────────────┘
  │     ┌────────────┐ ┌────────────┐
  │     │Media Usage │ │ Form Subs  │
  │     │ 4.2 GB/10  │ │ Today  24  │
  │     └────────────┘ └────────────┘
  │
  ├── QUICK ACTIONS BAR
  │     [+ New Page] → [S-10] Content Type Selector
  │     [+ New Blog Post] → [S-11] Content Editor (Blog type)
  │     [Upload Media] → [S-21] Media Upload Panel
  │     [View Analytics] → [S-50] Analytics Dashboard
  │
  ├── RECENT ACTIVITY FEED
  │     - "Jane published 'Summer Campaign'" — 5 min ago
  │     - "John submitted 'New FAQ' for review" — 1 hr ago
  │     - "System: Scheduled post 'Black Friday Sale' published" — 2 hrs ago
  │
  └── [S-08: Notifications Panel] (slide-out from bell icon)
        - Workflow state changes (assigned to me)
        - Review assignments
        - Publish confirmations
        - System alerts
        - Mark all as read

─────────────────────────────────────────────────────────────────
SCREENS: S-07 Dashboard | S-08 Notifications Panel
```

---

### 10.3 Content Creation & Editing Flow

**Entry Point:** Dashboard Quick Actions → or → Sidebar → Content → [Type]

```
╔══════════════════════════════════════════════════════════════════╗
║              CONTENT CREATION & EDITING FLOW                    ║
╚══════════════════════════════════════════════════════════════════╝

[S-09: Content List Screen]
  ┌──────────────────────────────────────────────────────────────┐
  │ Filter: [Type ▼] [Status ▼] [Author ▼] [Date Range ▼]  [🔍] │
  │ Bulk: [Select All] [Archive] [Delete] [Export]               │
  ├──────────────────────────────────────────────────────────────┤
  │ Title          │ Type  │ Status    │ Author  │ Last Modified │
  │ Summer Camp... │ Page  │ Published │ Jane D. │ Mar 10, 2026  │
  │ New FAQ Pag... │ FAQ   │ In Review │ John A. │ Mar 12, 2026  │
  │ Black Friday.. │ Blog  │ Scheduled │ Jane D. │ Mar 15, 2026  │
  └──────────────────────────────────────────────────────────────┘
        │
        ├── [+ New Content] button
        │       │
        │       ▼
        │   [S-10: Select Content Type]
        │       - Page | Blog Post | Landing Page | FAQ | Case Study | Custom...
        │       │
        │       ▼
        │   [S-11: Content Editor] ──────────────────────────────►
        │
        └── [Click existing row] → [S-11: Content Editor] (pre-loaded)


[S-11: Content Editor]
  ┌──────────────────────────────────────────────────────────────┐
  │ TOP BAR                                                       │
  │  ← Back | [Title Field — click to edit]                      │
  │  Status Badge: DRAFT | [Preview] [Save Draft] [Submit ▼]     │
  │  [Version History 🕐] [More ⋯]                               │
  ├───────────────────────────────────┬──────────────────────────┤
  │ EDITOR CANVAS (left ~70%)         │ RIGHT PANEL (30%)        │
  │                                   │                          │
  │  [+ Add Block]                    │ Tab: Content Settings    │
  │                                   │  - URL Slug              │
  │  ┌─────────────────────────────┐  │  - Publish Date          │
  │  │ 📝 Heading Block             │  │  - Author                │
  │  │ H1 / H2 / H3 selector       │  │  - Category / Tags       │
  │  └─────────────────────────────┘  │  - Featured Image        │
  │                                   │                          │
  │  ┌─────────────────────────────┐  │ Tab: SEO                 │
  │  │ 📄 Text Block                │  │  - Meta Title [__/60]   │
  │  │ Rich text / WYSIWYG area     │  │  - Meta Desc [__/160]   │
  │  └─────────────────────────────┘  │  - Canonical URL         │
  │                                   │  - OG Image              │
  │  ┌─────────────────────────────┐  │  - JSON-LD               │
  │  │ 🖼 Image Block               │  │  - SEO Score: 78/100 🟡  │
  │  │ [Select from Media Library] │  │                          │
  │  └─────────────────────────────┘  │ Tab: Localization        │
  │                                   │  - EN (default) ✅        │
  │  ┌─────────────────────────────┐  │  - FR (not started) ⬜   │
  │  │ 🎬 Video Block               │  │  - DE (in progress) 🔵  │
  │  │ Embed URL / Upload          │  │                          │
  │  └─────────────────────────────┘  │ Tab: Versions            │
  │                                   │  - v5 (current)          │
  │  [Drag blocks to reorder]         │  - v4, v3, v2, v1...     │
  └───────────────────────────────────┴──────────────────────────┘
  │
  ├── [Auto-Save] → "Draft saved 2 min ago" indicator (top bar)
  │
  ├── [Preview] → New browser tab → Rendered page with draft content
  │
  ├── [Save Draft] → Saves, stays on editor, status = Draft
  │
  └── [Submit for Review] → Assign reviewer modal → State = In Review
                             → Email sent to reviewer

─────────────────────────────────────────────────────────────────
SCREENS: S-09 Content List | S-10 Type Selector | S-11 Content Editor
         S-12 Live Preview
```

---

### 10.4 Content Workflow & Approval Flow

**Entry Point:** Editor submits content → Reviewer receives email

```
╔══════════════════════════════════════════════════════════════════╗
║              CONTENT WORKFLOW & APPROVAL FLOW                   ║
╚══════════════════════════════════════════════════════════════════╝

STATE MACHINE:
┌──────────┐    Submit     ┌───────────┐   Approve   ┌──────────┐
│  DRAFT   │ ────────────► │ IN REVIEW │ ──────────► │ APPROVED │
└──────────┘               └───────────┘             └──────┬───┘
     ▲                          │                           │
     │                   Request Changes                    │ Publisher action
     │                          │                           │
     └──────────────────────────┘              ┌────────────▼──────────┐
                                               │                       │
                                        [Publish Now]        [Schedule Publish]
                                               │                       │
                                               ▼                       ▼
                                        ┌──────────┐        ┌─────────────────┐
                                        │PUBLISHED │        │   SCHEDULED     │
                                        └────┬─────┘        └────────┬────────┘
                                             │                       │ (cron fires)
                                        [Unpublish]                  ▼
                                             │               ┌──────────┐
                                             ▼               │PUBLISHED │
                                        ┌──────────┐         └──────────┘
                                        │ ARCHIVED │
                                        └──────────┘


[S-13: Workflow Queue Dashboard]
  ┌──────────────────────────────────────────────────────────────┐
  │  Columns: Draft (12) | In Review (5) | Approved (3) | Pub.. │
  │  Filter: [Assignee ▼] [Content Type ▼] [Date ▼]            │
  │  [Bulk Approve] (Publisher only)                            │
  └──────────────────────────────────────────────────────────────┘


[S-14: Review Screen] (Reviewer opens assigned content)
  ┌──────────────────────────────────────────────────────────────┐
  │  TOP: Content title | Assigned by | Date | Status: IN REVIEW │
  ├───────────────────────────────────┬──────────────────────────┤
  │  CONTENT VIEW (read-only render)  │  COMMENT PANEL           │
  │                                   │                          │
  │  [Highlight any text/block        │  Thread 1:               │
  │   to add inline comment]          │  Jane: "Update the CTA"  │
  │                                   │  John: "Done, see v6"    │
  │                                   │                          │
  │                                   │  Thread 2:               │
  │                                   │  Jane: "Fix heading H2"  │
  │                                   │  [Reply...]              │
  │                                   │                          │
  │                                   │  [+ Add Comment]         │
  └───────────────────────────────────┴──────────────────────────┘
  │
  ACTION BAR:
  ├── [Request Changes] → Modal: Enter comment → Email to Editor → State: Draft
  ├── [Approve] → State: Approved → Email to Publisher
  └── [Reject] → Modal: Enter reason → Email to Editor → State: Draft


[S-15: Publish Screen] (Publisher reviews approved content)
  ┌──────────────────────────────────────────────────────────────┐
  │  Content preview | SEO summary | Status: APPROVED            │
  ├──────────────────────────────────────────────────────────────┤
  │  [Publish Now]  ──────────────────────► State: Published     │
  │                                         Notification: Editor │
  │  [Schedule Publish] ──────────────────► [S-16: Date picker]  │
  │                                                              │
  │  [Request Changes] ───────────────────► Back to Draft        │
  └──────────────────────────────────────────────────────────────┘


[S-16: Schedule Publisher]
  - Date picker (future dates only)
  - Time picker (with timezone display)
  - [Confirm Schedule] → State: Scheduled
  - Cron job fires at scheduled time → State: Published → Notifications sent
  - If publish fails → Admin + Publisher email: "[ALERT] Scheduled publish failed"


EMAIL NOTIFICATION TEMPLATES:
  ┌─────────────────────────────────────────────────────────────┐
  │ Event                         │ Recipients                   │
  │───────────────────────────────│─────────────────────────────│
  │ Submitted for review          │ Assigned Reviewer            │
  │ Changes requested             │ Content Editor               │
  │ Content approved              │ Assigned Publisher           │
  │ Published successfully        │ Editor + Publisher           │
  │ Scheduled for [date]          │ Editor + Publisher           │
  │ Scheduled publish FAILED      │ Admin + Publisher            │
  │ Unpublished                   │ Editor + Publisher           │
  └─────────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────────
SCREENS: S-13 Workflow Queue | S-14 Review Screen | S-15 Publish Screen
         S-16 Schedule Publisher
```

---

### 10.5 Media Library Flow

**Entry Point:** Sidebar → Media Library OR inline picker from Content Editor

```
╔══════════════════════════════════════════════════════════════════╗
║                      MEDIA LIBRARY FLOW                         ║
╚══════════════════════════════════════════════════════════════════╝

[S-20: Media Library]
  ┌──────────────────────────────────────────────────────────────┐
  │  [+ Upload] [🔍 Search] Filter: [Type ▼] [Tag ▼] [Date ▼]   │
  │  View: [▦ Grid] [☰ List]                                     │
  ├────────────────────┬─────────────────────────────────────────┤
  │  FOLDER TREE       │  MEDIA GRID / LIST                       │
  │  📁 All Media      │                                          │
  │  📁 Images         │  [img1.jpg] [img2.png] [video1.mp4]     │
  │  📁 Videos         │  [doc1.pdf] [img3.jpg] [img4.png]       │
  │  📁 Documents      │                                          │
  │  📁 Campaigns 2026 │  (Hover: filename, size, date)           │
  │    📁 Summer       │  (Click: opens S-22 Asset Detail)        │
  │    📁 Black Friday │                                          │
  │  [+ New Folder]    │  Bulk checkbox (select multiple)         │
  └────────────────────┴─────────────────────────────────────────┘


[S-21: Upload Panel] (drag-and-drop overlay or click to browse)
  ┌──────────────────────────────────────────────────────────────┐
  │         ☁ Drop files here or click to browse                 │
  │         Allowed: JPG, PNG, GIF, SVG, MP4, PDF, DOCX         │
  │         Max size: 100MB per file                             │
  ├──────────────────────────────────────────────────────────────┤
  │  Uploading:                                                   │
  │  ✅ banner.jpg      1.2 MB   ████████████ 100% Complete      │
  │  🔵 video.mp4      45 MB    ██████░░░░░░  60% Uploading...   │
  │  ⚠ virus.exe      —         Blocked (virus scan failed)     │
  │  ❌ hack.sh        —         Rejected (file type not allowed) │
  └──────────────────────────────────────────────────────────────┘
  │
  POST-UPLOAD (per file):
  - Image → Auto-optimized and resized → CDN URL generated
  - Video → Transcoding queued (if applicable)
  - All → Version entry created


[S-22: Asset Detail] (side panel or modal)
  ┌──────────────────────────────────────────────────────────────┐
  │  [Image preview / video player / PDF icon]                   │
  ├──────────────────────────────────────────────────────────────┤
  │  Filename:  summer-banner.jpg                                │
  │  CDN URL:   https://cdn.example.com/media/summer-banner.jpg  │
  │             [Copy URL]                                        │
  │  Size:      1.2 MB  |  Dimensions: 1920×1080  |  Type: JPEG │
  │  Uploaded:  Mar 10, 2026 by Jane D.                          │
  ├──────────────────────────────────────────────────────────────┤
  │  Alt Text:  [                               ] (required)     │
  │  Title:     [                               ]                │
  │  Caption:   [                               ]                │
  │  Tags:      [campaign] [summer] [+add tag]                   │
  │  Folder:    [Campaigns 2026 / Summer ▼]                     │
  ├──────────────────────────────────────────────────────────────┤
  │  [Save Metadata]   [Replace File]   [View History]           │
  │  [Delete] (confirmation modal)                               │
  └──────────────────────────────────────────────────────────────┘


[Inline Picker Modal] (called from Content Editor block)
  - Same as S-20 Media Library in modal overlay
  - [Select] button on asset → Inserts into content block
  - [Upload new] → S-21 inline upload → returns to picker

─────────────────────────────────────────────────────────────────
SCREENS: S-20 Media Library | S-21 Upload Panel | S-22 Asset Detail
```

---

### 10.6 SEO Management Flow

**Entry Point:** Sidebar → SEO OR Content Editor → SEO Tab

```
╔══════════════════════════════════════════════════════════════════╗
║                     SEO MANAGEMENT FLOW                         ║
╚══════════════════════════════════════════════════════════════════╝

[S-30: SEO Dashboard]
  ┌──────────────────────────────────────────────────────────────┐
  │  SITE SEO HEALTH: 72/100 🟡                                  │
  ├──────────────────────────────────────────────────────────────┤
  │  Issues:                                                      │
  │  ⚠ 8 pages missing meta title                               │
  │  ⚠ 14 pages missing meta description                         │
  │  ❌ 3 pages with duplicate canonical URLs                     │
  │  ❌ 2 broken internal links detected                          │
  │  ✅ Sitemap up to date (last generated: Mar 15, 2026 09:00)  │
  └──────────────────────────────────────────────────────────────┘
  │
  ├── Click issue row → Opens list of affected pages
  │     Each row → Click → Opens [S-31: Per-Page SEO Editor]
  │
  ├── [S-32: Sitemap Manager]
  │     - Current sitemap preview (XML view)
  │     - Toggle include/exclude per page
  │     - Set change frequency (always/hourly/daily/weekly/monthly)
  │     - [Regenerate Sitemap] button
  │     - [Submit to Google Search Console] link
  │
  ├── [S-33: Robots.txt Editor]
  │     - Raw text editor with monospace font
  │     - [Validate] → Inline error highlighting
  │     - [Save] → Creates change history entry
  │     - [View History] → Timestamped list of previous versions
  │
  └── [S-34: Redirect Manager]
        - Table: Source URL | Type | Destination URL | Created
        - [+ Add Redirect]:
            Source: /old-page
            Type: 301 Permanent / 302 Temporary
            Destination: /new-page
            [Save]
        - [Bulk Import CSV]
        - Conflict detection (source matches existing redirect → warning)
        - Auto-redirect toggle: "Redirect automatically when slug changes"


[S-31: Per-Page SEO Editor]
  ┌──────────────────────────────────────────────────────────────┐
  │  Page: "Summer Campaign 2026"                                 │
  ├──────────────────────────────────────────────────────────────┤
  │  Meta Title:       [Summer Sale 2026 | Brand Name  ] 38/60   │
  │  Meta Description: [Explore our summer collection ...] 142/160│
  │  Canonical URL:    [● Auto] [○ Manual: https://...]          │
  │  URL Slug:         /summer-sale-2026   [Edit]                 │
  │  No-index:         [○ Off  ● On]                             │
  ├──────────────────────────────────────────────────────────────┤
  │  Open Graph:                                                  │
  │  OG Title:         [Summer Sale 2026                ]        │
  │  OG Description:   [Discover amazing deals...       ]        │
  │  OG Image:         [summer-og.jpg  🖼] [Change]              │
  ├──────────────────────────────────────────────────────────────┤
  │  Twitter Card:     [Summary with Large Image ▼]              │
  │  TW Title:         [Summer Sale 2026                ]        │
  ├──────────────────────────────────────────────────────────────┤
  │  JSON-LD:          [{ "@context": "schema.org", ...   }]    │
  ├──────────────────────────────────────────────────────────────┤
  │  SERP PREVIEW:                      SOCIAL PREVIEW:          │
  │  ┌────────────────────────────┐     ┌───────────────────┐    │
  │  │ example.com/summer-sale    │     │ [OG Image]        │    │
  │  │ Summer Sale 2026 | Brand   │     │ Summer Sale 2026  │    │
  │  │ Discover amazing deals in  │     │ Discover amazing  │    │
  │  └────────────────────────────┘     └───────────────────┘    │
  │  [Desktop] [Mobile]                 [Facebook] [Twitter]     │
  ├──────────────────────────────────────────────────────────────┤
  │  SEO Score: 88/100 ✅   [Save SEO Settings]                  │
  └──────────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────────
SCREENS: S-30 SEO Dashboard | S-31 Per-Page SEO | S-32 Sitemap
         S-33 Robots.txt | S-34 Redirect Manager
```

---

### 10.7 Versioning & Rollback Flow

**Entry Point:** Content Editor → Version History button (top bar)

```
╔══════════════════════════════════════════════════════════════════╗
║                  VERSIONING & ROLLBACK FLOW                     ║
╚══════════════════════════════════════════════════════════════════╝

[S-40: Version History Panel] (slide-out from top bar)
  ┌──────────────────────────────────────────────────────────────┐
  │  Version │ Author      │ Date/Time            │ Status        │
  │──────────┼─────────────┼──────────────────────┼──────────────│
  │  v7 ●   │ Jane D.     │ Mar 15, 2026  14:32   │ 🟢 Published │
  │  v6      │ John A.     │ Mar 14, 2026  09:10   │ ⬜ Draft     │
  │  v5      │ Jane D.     │ Mar 13, 2026  16:55   │ ⬜ Archived  │
  │  v4      │ John A.     │ Mar 12, 2026  11:00   │ ⬜ Archived  │
  │  v3      │ Jane D.     │ Mar 10, 2026  09:30   │ ⬜ Archived  │
  └──────────────────────────────────────────────────────────────┘
       │
       ├── [Click any row]
       │       ▼
       │   [S-41: Version Preview]
       │       - Full rendered preview of that version
       │       - Metadata snapshot: title, slug, SEO, word count
       │       - [Compare with Current] → [S-42]
       │       - [Restore This Version] → [S-43]
       │
       ├── [Compare] (select two rows)
       │       ▼
       │   [S-42: Diff Viewer]
       │   ┌──────────────────────┬─────────────────────────────┐
       │   │  v5 (Mar 13, 16:55)  │  v7 (Mar 15, 14:32) CURRENT│
       │   ├──────────────────────┴─────────────────────────────┤
       │   │  🟢 + Added text shows in green                    │
       │   │  🔴 - Removed text shows in red                    │
       │   │  🟡 ~ Changed text shows in yellow                 │
       │   ├──────────────────────────────────────────────────  │
       │   │  Toggle: [All Content] [Changes Only]              │
       │   └─────────────────────────────────────────────────── ┘
       │
       └── [Restore This Version]
               ▼
           [S-43: Restore Confirmation Modal]
           ┌──────────────────────────────────────────────────┐
           │  ⚠  Restore Version v5?                           │
           │                                                   │
           │  This creates a new DRAFT from Version v5         │
           │  (Mar 13, 2026 16:55 by Jane D.)                  │
           │  Current version v7 is preserved in history.      │
           │                                                   │
           │      [Cancel]          [Restore as Draft]         │
           └──────────────────────────────────────────────────┘
                   │
                   ▼
           New draft v8 created → Auto-saved
           → Toast: "Version v5 restored as new draft v8"
           → Returns to Content Editor (S-11)
           → Workflow restarts from Draft state

─────────────────────────────────────────────────────────────────
SCREENS: S-40 Version History | S-41 Version Preview | S-42 Diff Viewer
         S-43 Restore Confirmation
```

---

### 10.8 Multi-language & Translation Flow

**Entry Point:** Content Editor → Localization Tab OR Settings → Languages

```
╔══════════════════════════════════════════════════════════════════╗
║                MULTI-LANGUAGE & TRANSLATION FLOW                ║
╚══════════════════════════════════════════════════════════════════╝

[S-60: Language Settings] (Admin → Settings → Languages)
  - Language list: English (default) | French | German | Spanish | ...
  - [Enable/Disable] toggle per language
  - [Set as Default] button
  - Assign translator users per language
  - Fallback: Show default language if translation unavailable → [toggle]


[S-11: Content Editor → Localization Tab]
  Language Variants:
  ┌──────────────────────────────────────────┐
  │  🇬🇧 English (Default)  ✅ Published       │
  │  🇫🇷 French              🔵 In Progress    │  [Open Editor]
  │  🇩🇪 German              ⬜ Not Started    │  [Start Translation]
  │  🇪🇸 Spanish             🟡 In Review      │  [View]
  └──────────────────────────────────────────┘
  [+ Add Language]


[S-61: Translation Editor]
  ┌──────────────────────────────────────────────────────────────┐
  │  TOP: Translating to: 🇫🇷 French | Source: 🇬🇧 English       │
  ├─────────────────────────┬────────────────────────────────────┤
  │  SOURCE (read-only)     │  TRANSLATION (editable)            │
  │  🇬🇧 English             │  🇫🇷 French                        │
  │                         │                                    │
  │  Title:                 │  Title:                            │
  │  "Summer Sale 2026"     │  [Soldes d'Été 2026        ]      │
  │                         │  Status: ✅ Complete               │
  │  Body: [paragraph...]   │  Body: [paragraph...]              │
  │                         │  Status: 🔵 In Progress            │
  │  Meta Title:            │  Meta Title:                       │
  │  "Summer Sale | Brand"  │  [Soldes Été | Marque      ]      │
  │                         │  Status: ⬜ Not Started            │
  └─────────────────────────┴────────────────────────────────────┘
  [Save Progress]  [Mark as Ready for Review]


[S-62: Translation Review]
  - Same source + translation side-by-side (read-only for reviewer)
  - [Approve Translation] → Published in French → hreflang tags updated
  - [Request Changes] → Back to translator


PUBLISHED OUTPUT:
  - /summer-sale-2026 (English)
  - /fr/soldes-ete-2026 (French)
  - <link rel="alternate" hreflang="fr" href="/fr/soldes-ete-2026">
  - Language switcher dropdown visible on all published pages

─────────────────────────────────────────────────────────────────
SCREENS: S-60 Language Settings | S-61 Translation Editor | S-62 Translation Review
```

---

### 10.9 Navigation & Menus Flow

**Entry Point:** Sidebar → Menus

```
╔══════════════════════════════════════════════════════════════════╗
║                   NAVIGATION & MENUS FLOW                       ║
╚══════════════════════════════════════════════════════════════════╝

[S-70: Menus List]
  ┌──────────────────────────────────────────────────────────────┐
  │  Menu Name     │  Location  │  Items │  Last Modified        │
  │  Main Header   │  Header    │  8     │  Mar 10, 2026         │
  │  Footer Nav    │  Footer    │  12    │  Mar 05, 2026         │
  │  Mobile Menu   │  Mobile    │  6     │  Mar 01, 2026         │
  │  [+ New Menu]                                                │
  └──────────────────────────────────────────────────────────────┘
       │
       └── [Click menu row] → [S-71: Menu Editor]


[S-71: Menu Editor]
  ┌──────────────────────────────────────────────────────────────┐
  │  Menu: Main Header Nav         Location: Header              │
  ├──────────────────────────────────────────────────────────────┤
  │  MENU TREE (drag-and-drop)                                   │
  │                                                              │
  │  ☰ Home                                        [Edit] [✕]   │
  │  ☰ About                                       [Edit] [✕]   │
  │     └── ☰ Our Team                             [Edit] [✕]   │
  │     └── ☰ Our History                          [Edit] [✕]   │
  │  ☰ Products          ★ Mega Menu               [Edit] [✕]   │
  │     └── [Mega Menu Content Editor]                           │
  │         Columns / Featured images / Links grid               │
  │  ☰ Blog                                        [Edit] [✕]   │
  │  ☰ Contact                                     [Edit] [✕]   │
  │                                                              │
  │  [+ Add Menu Item]                                           │
  │    Label: [          ]                                       │
  │    Link:  ○ Internal Page [Search pages...]                  │
  │           ○ External URL [https://...]                       │
  │           ○ Anchor [#section-id]                             │
  │    Open in new tab: [☐]                                      │
  │    Icon: [None ▼]                                            │
  ├──────────────────────────────────────────────────────────────┤
  │  [Preview Menu]    [Save & Publish]                          │
  └──────────────────────────────────────────────────────────────┘

  [Preview Menu] → Live overlay on published site showing menu changes
  [Save & Publish] → Changes applied to live site immediately

─────────────────────────────────────────────────────────────────
SCREENS: S-70 Menus List | S-71 Menu Editor
```

---

### 10.10 Forms & Landing Pages Flow

**Entry Point:** Sidebar → Forms

```
╔══════════════════════════════════════════════════════════════════╗
║                   FORMS & LANDING PAGES FLOW                    ║
╚══════════════════════════════════════════════════════════════════╝

[S-80: Forms List]
  ┌──────────────────────────────────────────────────────────────┐
  │  Form Name        │ Type        │ Submissions │ Status       │
  │  Contact Us       │ Contact     │ 1,240       │ 🟢 Active    │
  │  Newsletter Sub   │ Newsletter  │ 3,400       │ 🟢 Active    │
  │  Event Survey     │ Survey      │ 89          │ 🔴 Inactive  │
  │  [+ New Form]                                                │
  └──────────────────────────────────────────────────────────────┘


[S-81: Form Builder]
  ┌──────────────────────────────────────────────────────────────┐
  │  Form Name: [Contact Us                   ]                  │
  ├────────────────────────┬─────────────────────────────────────┤
  │  FIELD PALETTE         │  FORM CANVAS                         │
  │                        │                                      │
  │  Drag to add:          │  ┌─────────────────────────────┐    │
  │  [T] Short Text        │  │ Full Name *        [Edit][✕] │    │
  │  [📧] Email            │  │ [Text field preview]        │    │
  │  [📞] Phone            │  └─────────────────────────────┘    │
  │  [#] Number            │  ┌─────────────────────────────┐    │
  │  [📅] Date             │  │ Email Address *   [Edit][✕] │    │
  │  [▼] Dropdown          │  │ [Email field preview]       │    │
  │  [☐] Checkbox          │  └─────────────────────────────┘    │
  │  [●] Radio             │  ┌─────────────────────────────┐    │
  │  [📄] File Upload      │  │ Message            [Edit][✕] │    │
  │  [★] Rating            │  │ [Textarea preview]          │    │
  │  [GDPR] Consent        │  └─────────────────────────────┘    │
  │                        │  ┌─────────────────────────────┐    │
  │                        │  │ ☐ I agree to Privacy Policy │    │
  │                        │  │   (GDPR — cannot remove)    │    │
  │                        │  └─────────────────────────────┘    │
  └────────────────────────┴─────────────────────────────────────┘
  │
  FORM SETTINGS TAB:
  ├── Submit button label: [Send Message]
  ├── On success: ○ Show message: [Thank you!] ○ Redirect to: [URL]
  ├── Admin notification: [admin@example.com]
  ├── reCAPTCHA: [☑ Enable]
  ├── Embed Code: [<div id="cms-form-1">...</div>] [Copy]
  │
  ├── [Conditional Logic]
  │     IF [Dropdown field] = "Other"
  │     THEN [Show: "Specify" text field]
  │
  └── [Save Form] | [Preview Form]


[S-82: Submissions Viewer]
  ┌──────────────────────────────────────────────────────────────┐
  │  Form: Contact Us  |  Total: 1,240  |  Filter: [Date ▼]    │
  │  [Export CSV] [Export Excel]                                  │
  ├──────────────────────────────────────────────────────────────┤
  │  # │ Date        │ Name     │ Email           │ Status       │
  │  1 │ Mar 15 14:32│ John Doe │ john@example.com│ ✅ Received  │
  │  2 │ Mar 15 13:10│ Jane     │ jane@mail.com   │ ⚠ Spam      │
  └──────────────────────────────────────────────────────────────┘
  │
  Actions per row: [View Full] [Mark Spam] [Archive] [Delete (GDPR)]


[S-83: Landing Page Builder]
  - Uses same block editor as Content Editor (S-11)
  - Full-width canvas (no site header/footer)
  - Optimized for conversion pages
  - Embed form block → select form → renders inline
  - [Publish Landing Page] → unique URL generated

─────────────────────────────────────────────────────────────────
SCREENS: S-80 Forms List | S-81 Form Builder | S-82 Submissions
         S-83 Landing Page Builder
```

---

### 10.11 Settings & Administration Flow

**Entry Point:** Sidebar → Settings (Super Admin only)

```
╔══════════════════════════════════════════════════════════════════╗
║                SETTINGS & ADMINISTRATION FLOW                   ║
╚══════════════════════════════════════════════════════════════════╝

[S-90: Settings Hub]
  Left nav: User Mgmt | Site Settings | Content Types | API & Webhooks
            Email | Audit Log

├── [S-91: User Management]
│     ┌──────────────────────────────────────────────────────────┐
│     │  [+ Invite User]  Search: [      ]  Filter: [Role ▼]    │
│     ├──────────────────────────────────────────────────────────┤
│     │  Name      │ Email           │ Role       │ Status       │
│     │  Jane D.   │ jane@co.com     │ Publisher  │ 🟢 Active    │
│     │  John A.   │ john@co.com     │ Editor     │ 🟢 Active    │
│     │  Bob T.    │ bob@co.com      │ Viewer     │ 🔴 Inactive  │
│     └──────────────────────────────────────────────────────────┘
│     [Invite User Modal]:
│       Email: [           ]  Role: [Editor ▼]  [Send Invite]
│     [Edit User]: Change role, reset password, deactivate


├── [S-92: Site Settings]
│     - Site name, tagline
│     - Favicon [Upload]  |  Logo [Upload]
│     - Default language [English ▼]
│     - Time zone [UTC+5:30 ▼]
│     - Cookie consent: ○ Disabled ● Enabled (Banner text editor)
│     - Default SEO meta (fallback title, description, OG image)
│     - [Save Changes]


├── [S-93: Content Types]
│     System Types: Page | Blog Post | Landing Page (read-only schema)
│     Custom Types:
│     ┌───────────┬────────┬───────────┐
│     │ FAQ       │ 5 items│ [Edit][✕] │
│     │ Case Study│ 12 items│[Edit][✕] │
│     └───────────┴────────┴───────────┘
│     [+ New Content Type]
│       Name: [          ]  Slug: [auto]  Icon: [📋 ▼]
│       FIELD BUILDER:
│         [+ Add Field]
│           Type: [Text ▼]  Name: [       ]  Required: [☐]
│           Unique: [☐]  Default: [       ]
│       [Save Content Type]
│     ⚠ Editing schema: "Changes may require data migration. Proceed?"


├── [S-94: API & Webhooks]
│     API KEYS:
│     ┌─────────────────────────────────────────────────────────┐
│     │  Key Name     │ Key (masked)         │ Created │ Actions │
│     │  Frontend App │ cms_••••••••••1a2b   │ Jan 2026│[Revoke] │
│     │  Mobile App   │ cms_••••••••••3c4d   │ Feb 2026│[Revoke] │
│     │  [+ Generate New Key]                                    │
│     └─────────────────────────────────────────────────────────┘
│     API USAGE: Requests today: 24,300 | Avg response: 87ms
│
│     WEBHOOKS:
│     [+ Add Webhook]
│       URL: [https://your-app.com/webhook]
│       Events: [☑ content.published] [☑ content.updated] [☐ media.uploaded]
│       Signing Secret: [auto-generated]  [Copy]
│       [Save Webhook]
│     DELIVERY LOG:
│       ✅ Mar 15 14:32 | content.published | 200 OK | 120ms
│       ❌ Mar 15 13:10 | content.updated   | 500 Error | [Retry]


├── [S-95: Email Notifications]
│     Provider: ○ SMTP ○ SendGrid ● AWS SES
│     Config: [API Key / SMTP credentials]
│     From: [noreply@example.com]
│     [Test Email] → [Enter email] → [Send]
│     TEMPLATES:
│       - Content Submitted for Review → [Edit Template]
│       - Changes Requested → [Edit Template]
│       - Content Approved → [Edit Template]
│       - Content Published → [Edit Template]


└── [S-96: Audit Log]
      ┌──────────────────────────────────────────────────────────┐
      │  Filter: [User ▼] [Action ▼] [Date Range ▼]  [Export]  │
      ├──────────────────────────────────────────────────────────┤
      │  Timestamp         │ User   │ Action                      │
      │  Mar 15 14:32:01   │ Jane D.│ Published "Summer Campaign" │
      │  Mar 15 13:00:12   │ John A.│ Created content "New FAQ"   │
      │  Mar 15 11:45:33   │ Admin  │ Invited user bob@co.com     │
      │  Mar 15 09:10:05   │ Jane D.│ Deleted media "old-logo.png"│
      └──────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────────
SCREENS: S-90 Settings Hub | S-91 Users | S-92 Site Settings
         S-93 Content Types | S-94 API & Webhooks | S-95 Notifications
         S-96 Audit Log
```

---

### 10.12 Analytics Flow

**Entry Point:** Sidebar → Analytics

```
╔══════════════════════════════════════════════════════════════════╗
║                        ANALYTICS FLOW                           ║
╚══════════════════════════════════════════════════════════════════╝

[S-50: Analytics Dashboard]
  ┌──────────────────────────────────────────────────────────────┐
  │  Date Range: [Last 30 Days ▼]    [Connect GA4] / [Connected] │
  ├──────────────────────────────────────────────────────────────┤
  │  ┌────────────┐ ┌─────────────┐ ┌───────────┐ ┌───────────┐ │
  │  │ Page Views │ │  Visitors   │ │ Avg. Time │ │   Bounce  │ │
  │  │  124,300   │ │   38,900    │ │   2m 34s  │ │   47.2%   │ │
  │  └────────────┘ └─────────────┘ └───────────┘ └───────────┘ │
  ├──────────────────────────────────────────────────────────────┤
  │  TOP 5 PAGES                                                  │
  │  1. /summer-sale-2026       34,200 views                     │
  │  2. /blog/how-to-use        18,900 views                     │
  │  3. /about                  12,300 views                     │
  └──────────────────────────────────────────────────────────────┘
  │
  ├── [S-51: Content Performance Report]
  │     ┌────────────────────────────────────────────────────────┐
  │     │ Title         │ Views   │ Bounce │ Avg Time │ Conv. │  │
  │     │ Summer Sale.. │ 34,200  │ 42%    │ 3m 10s   │ 3.2%  │  │
  │     │ How to use... │ 18,900  │ 55%    │ 1m 45s   │ 1.1%  │  │
  │     │ Filter: [Type ▼] [Author ▼] [Date ▼]   [Export CSV]   │
  │     └────────────────────────────────────────────────────────┘
  │
  ├── [S-52: SEO Performance] (via Google Search Console)
  │     - Impressions | Clicks | CTR | Avg. Position
  │     - Per-page breakdown
  │     - Top search queries
  │
  └── [S-53: GA / GTM Integration Setup]
        - [Connect Google Analytics] → OAuth flow → GA4 property select
        - GTM Container ID: [GTM-XXXXXXX]
        - Environment: ● Production ○ Staging (disable tracking on staging)
        - [Save Integration]

─────────────────────────────────────────────────────────────────
SCREENS: S-50 Analytics Dashboard | S-51 Content Performance
         S-52 SEO Performance | S-53 GA/GTM Setup
```

---

### 10.13 API & Headless CMS Flow

**Entry Point:** Developer accesses API docs or builds external frontend

```
╔══════════════════════════════════════════════════════════════════╗
║                   API & HEADLESS CMS FLOW                       ║
╚══════════════════════════════════════════════════════════════════╝

DEVELOPER JOURNEY:
  1. Admin generates API key → [S-94: API & Webhooks]
  2. Developer receives key → Reads API docs
  3. Developer calls endpoints from external frontend

REST API FLOW:
  External App
    │
    ├── GET /api/content/blog
    │     → Returns: list of published blog posts (paginated)
    │     → Headers: Authorization: Bearer {jwt_token}
    │
    ├── GET /api/content/blog/summer-sale-2026
    │     → Returns: full content item (body, SEO meta, locales)
    │
    ├── GET /api/content/{id}/versions
    │     → Returns: version history (id, author, timestamp)
    │
    └── POST /api/forms/{form_id}/submit
          → Submits form data
          → Triggers: DB write + Admin email notification


GRAPHQL API FLOW:
  External App → POST /graphql
  Query: {
    contentItem(slug: "summer-sale-2026") {
      title
      body
      seo { metaTitle metaDescription }
      locale(lang: "fr") { title body }
    }
  }
  → Returns: typed JSON response


WEBHOOK FLOW:
  CMS Event: "summer-sale-2026" published
    → CMS sends POST to: https://your-app.com/webhook
    → Payload: { event: "content.published", id: "123", slug: "..." }
    → Signed with HMAC-SHA256 using webhook secret
    → Your app: validates signature → triggers rebuild (Next.js ISR / Gatsby)


AUTHENTICATION:
  - API Key in header: Authorization: Bearer cms_xxxxxxxxxxxxxx
  - JWT for user sessions (15 min access token, 7 day refresh token)
  - Public endpoints (read published content): No auth required
  - Write endpoints: API key required
  - Admin endpoints: Admin JWT required

─────────────────────────────────────────────────────────────────
SCREENS: S-94 API Settings | External: API Documentation site
```

---

## 11. Functional Requirements

### 11.1 Content Creation & Editing

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-01 | WYSIWYG rich text editor with formatting toolbar | Must Have | Bold, italic, underline, lists, links, headings |
| FR-02 | Drag-and-drop block/modular page builder | Must Have | Reorder blocks via drag handle |
| FR-03 | Block types: Text, Heading, Image, Video, Quote, Code, Columns, Embed, CTA | Must Have | Extensible block system |
| FR-04 | Content templates for Page, Blog, Landing Page, FAQ, Case Study | Must Have | Preloaded block structures |
| FR-05 | Custom content types with JSON schema field builder | Must Have | Admins define fields |
| FR-06 | Inline media picker (opens Media Library in modal) | Must Have | From image/video blocks |
| FR-07 | Code block with syntax highlighting | Should Have | Supports 20+ languages |
| FR-08 | Auto-save every 30 seconds with visual indicator | Must Have | Toast: "Draft saved 2 min ago" |
| FR-09 | Live full-page preview in new browser tab | Must Have | Renders draft content |
| FR-10 | URL slug auto-generation from title (editable) | Must Have | Lowercase, hyphenated |
| FR-11 | Duplicate content item | Should Have | Creates new draft copy |
| FR-12 | Category and tag assignment | Must Have | Multi-select |
| FR-13 | Scheduled publish date/time picker | Must Have | Publisher role only |

### 11.2 Content Workflow & Approval

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-20 | State machine: Draft → In Review → Approved → Published → Archived | Must Have | State transitions enforced |
| FR-21 | Assign reviewer per content item | Must Have | From Editor or Admin |
| FR-22 | Assign publisher per content item | Must Have | From Admin |
| FR-23 | Threaded inline comments on content areas | Must Have | Reviewer adds comments |
| FR-24 | Email notification on every workflow state change | Must Have | Configurable per user |
| FR-25 | Scheduled publishing with cron-based execution | Must Have | Publisher sets date/time |
| FR-26 | Unpublish and archive functionality | Must Have | Publisher role |
| FR-27 | Publisher can send content back to draft with comment | Must Have | Approval rejection path |
| FR-28 | Workflow queue dashboard grouped by state | Should Have | Pipeline view |
| FR-29 | Bulk approve action | Should Have | Publisher role |
| FR-30 | Publish failure alert via email | Must Have | Admin + Publisher recipients |

### 11.3 Media Library

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-40 | Drag-and-drop multi-file upload | Must Have | With per-file progress |
| FR-41 | Automatic image optimization and resizing | Must Have | Lossy compression, responsive sizes |
| FR-42 | Virus scan on all uploads | Must Have | Block infected files with error |
| FR-43 | File type whitelist enforcement | Must Have | JPG, PNG, GIF, SVG, MP4, PDF, DOCX |
| FR-44 | Folder create, rename, delete, move | Must Have | Hierarchical folder tree |
| FR-45 | Tag-based asset organization | Must Have | Multi-tag, searchable |
| FR-46 | Search and filter (name, type, tag, date) | Must Have | Grid and list view |
| FR-47 | Alt text field (required for images, validated on publish) | Must Have | Accessibility requirement |
| FR-48 | CDN URL auto-generation per asset | Must Have | CloudFront / Cloudflare |
| FR-49 | Replace file (preserves URL, creates version entry) | Should Have | |
| FR-50 | Asset version history | Should Have | |
| FR-51 | Bulk move, tag, delete with confirmation | Should Have | |
| FR-52 | Export asset metadata as CSV | Nice to Have | |

### 11.4 Versioning & Content History

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-60 | Full version history per content item | Must Have | Author, timestamp, status |
| FR-61 | Side-by-side diff view (color-coded) | Must Have | Added/removed/changed |
| FR-62 | Toggle: all content vs. changes only | Should Have | |
| FR-63 | Version preview (full rendered page) | Should Have | |
| FR-64 | One-click rollback creates new draft | Must Have | Preserves full history |
| FR-65 | Rollback confirmation modal | Must Have | |
| FR-66 | Retain minimum 50 versions per content item | Should Have | Configurable by Admin |

### 11.5 SEO Management

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-70 | Meta title field with character counter (50–60 chars) | Must Have | |
| FR-71 | Meta description field with character counter (150–160 chars) | Must Have | |
| FR-72 | Canonical URL (auto or manual override) | Must Have | |
| FR-73 | Open Graph fields (title, description, image) | Must Have | |
| FR-74 | Twitter Card fields | Should Have | |
| FR-75 | JSON-LD structured data editor | Should Have | Raw JSON |
| FR-76 | URL slug editor with auto-301 redirect on change | Must Have | |
| FR-77 | No-index toggle per page | Must Have | |
| FR-78 | Live SERP preview (desktop + mobile) | Should Have | |
| FR-79 | Social share preview (Facebook + Twitter) | Should Have | |
| FR-80 | XML sitemap auto-generation on publish | Must Have | |
| FR-81 | Robots.txt editor with validation | Must Have | |
| FR-82 | Redirect manager (301 / 302) with bulk CSV import | Must Have | |
| FR-83 | Site-wide SEO health dashboard | Must Have | Missing fields, broken links |

### 11.6 Multi-language

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-90 | Enable/disable languages site-wide | Must Have | Admin only |
| FR-91 | Create language variant per content item | Must Have | |
| FR-92 | Side-by-side translation editor | Must Have | Source read-only reference |
| FR-93 | Translation status per field | Must Have | Not Started / In Progress / Complete |
| FR-94 | Translation review workflow | Should Have | Same as content workflow |
| FR-95 | hreflang tags auto-injected in published HTML | Must Have | |
| FR-96 | Language switcher on published site | Must Have | |
| FR-97 | Localized URL structure (/fr/, /de/, etc.) | Must Have | |
| FR-98 | Fallback to default language if translation unavailable | Should Have | Configurable |

### 11.7 Forms & Landing Pages

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-100 | Drag-and-drop form builder | Must Have | |
| FR-101 | Field types: Text, Email, Phone, Number, Date, Dropdown, Checkbox, Radio, Textarea, File, Rating | Must Have | |
| FR-102 | Conditional field logic | Should Have | Show/hide based on values |
| FR-103 | Form submission capture to database | Must Have | |
| FR-104 | Admin email notification on submission | Must Have | Configurable per form |
| FR-105 | reCAPTCHA integration | Must Have | Spam prevention |
| FR-106 | GDPR consent checkbox (required, non-removable) | Must Have | Legal requirement |
| FR-107 | Submissions table with filter and export | Must Have | CSV + Excel |
| FR-108 | Delete individual submission (GDPR) | Must Have | |
| FR-109 | Embed code generator | Must Have | HTML snippet |
| FR-110 | Landing page builder (full-width) | Must Have | |

### 11.8 API & Headless CMS

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-120 | REST API for all content types | Must Have | |
| FR-121 | GraphQL API with schema introspection | Must Have | |
| FR-122 | JWT-secured content API | Must Have | |
| FR-123 | Public endpoints for published content (no auth) | Must Have | |
| FR-124 | API key generation and revocation | Must Have | |
| FR-125 | Webhooks for content events | Must Have | publish, update, delete |
| FR-126 | Webhook delivery log with retry | Should Have | |
| FR-127 | Rate limiting per API key | Must Have | |

---

## 12. Non-Functional Requirements

| ID | Requirement | Specification | Priority |
|----|-------------|---------------|----------|
| NFR-01 | Availability | 99.9% uptime (< 8.7 hrs downtime/year) | Must Have |
| NFR-02 | Page load performance | < 1.5 seconds P95 | Must Have |
| NFR-03 | API response time | < 200ms P99 | Must Have |
| NFR-04 | Scalability — pages | Handle 100K+ published pages | Must Have |
| NFR-05 | Scalability — traffic | 10K concurrent visitors | Must Have |
| NFR-06 | Security — auth | RBAC enforced at API level | Must Have |
| NFR-07 | Security — content | XSS prevention (sanitize all HTML) | Must Have |
| NFR-08 | Security — API | CSRF protection on all state-changing endpoints | Must Have |
| NFR-09 | Security — media | Virus scanning on all uploads | Must Have |
| NFR-10 | CDN | All media and published content via CDN | Must Have |
| NFR-11 | Compliance | GDPR: cookie consent, user data export/deletion | Must Have |
| NFR-12 | SEO output | Semantic HTML, canonical tags, valid structured data | Must Have |
| NFR-13 | Browser support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | Must Have |
| NFR-14 | Admin UX | Desktop-first (1280px+ minimum) | Must Have |
| NFR-15 | Backup | Daily automated database backups, 30-day retention | Must Have |
| NFR-16 | Disaster recovery | RTO < 4 hours, RPO < 1 hour | Should Have |
| NFR-17 | Rate limiting | API: 1000 req/min per key; Upload: 100 req/min | Must Have |
| NFR-18 | Audit trail | All write operations logged with user + timestamp | Must Have |

---

## 13. Key User Stories

### Content Editor
- As a **content editor**, I want a drag-and-drop page builder so I can create pages without developer help.
- As a **content editor**, I want auto-save so I never lose my work if the browser crashes.
- As a **content editor**, I want to preview my content before submitting so I can catch formatting issues.
- As a **content editor**, I want to roll back a published page to a previous version when a mistake is found.
- As a **content editor**, I want to create content in multiple languages from the same editor.

### Publisher
- As a **publisher**, I want a clear approval workflow so I know exactly when content is ready to go live.
- As a **publisher**, I want to schedule content to publish automatically on Black Friday at 12:00 AM.
- As a **publisher**, I want to unpublish a page instantly if incorrect information was found post-launch.
- As a **publisher**, I want to bulk-approve multiple reviewed articles so I can clear the queue quickly.

### SEO Specialist
- As an **SEO specialist**, I want to set custom meta titles and descriptions per page to optimize search ranking.
- As an **SEO specialist**, I want a live SERP preview so I can see exactly how the page appears in Google results.
- As an **SEO specialist**, I want automatic 301 redirects when a URL slug changes so SEO equity is preserved.
- As an **SEO specialist**, I want a dashboard showing all pages missing meta data so I can fix them proactively.
- As an **SEO specialist**, I want to manage robots.txt and sitemaps without involving a developer.

### Developer
- As a **developer**, I want a RESTful API to retrieve published content so I can build a decoupled Next.js frontend.
- As a **developer**, I want webhook support so my frontend auto-rebuilds when content is published.
- As a **developer**, I want GraphQL so I can query only the fields I need, reducing payload size.
- As a **developer**, I want to define custom content types with a schema builder so product content fits the data model.

### Web Administrator
- As a **web admin**, I want to manage header and footer menus without touching code.
- As a **web admin**, I want to invite users with specific roles so access is controlled from day one.
- As a **web admin**, I want an audit log of all actions so I can investigate any content changes.

### Reviewer
- As a **reviewer**, I want to leave inline comments on specific paragraphs so my feedback is clear and contextual.
- As a **reviewer**, I want email alerts when content is assigned to me so I never miss a review task.

---

## 14. Data Model

### Core Entities

```
User
  - user_id (PK, UUID)
  - name (VARCHAR 255)
  - email (VARCHAR 255, UNIQUE)
  - password_hash (VARCHAR)
  - role (ENUM: super_admin, editor, reviewer, publisher, seo_manager, developer, viewer)
  - status (ENUM: active, inactive, locked)
  - preferred_language (VARCHAR 5)
  - notification_preference (ENUM: all, assigned, none)
  - created_at (TIMESTAMP)
  - last_login (TIMESTAMP)

ContentItem
  - content_id (PK, UUID)
  - type (FK → ContentType.type_id)
  - title (VARCHAR 500)
  - slug (VARCHAR 500, UNIQUE per site)
  - status (ENUM: draft, in_review, approved, scheduled, published, archived)
  - author_id (FK → User.user_id)
  - reviewer_id (FK → User.user_id, nullable)
  - publisher_id (FK → User.user_id, nullable)
  - scheduled_at (TIMESTAMP, nullable)
  - published_at (TIMESTAMP, nullable)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)

ContentVersion
  - version_id (PK, UUID)
  - content_id (FK → ContentItem.content_id)
  - version_number (INT)
  - body (JSONB)              -- block editor content
  - metadata (JSONB)          -- title, tags, category at time of version
  - author_id (FK → User.user_id)
  - created_at (TIMESTAMP)

ContentComment
  - comment_id (PK, UUID)
  - content_id (FK → ContentItem.content_id)
  - parent_comment_id (FK → ContentComment.comment_id, nullable)
  - author_id (FK → User.user_id)
  - block_ref (VARCHAR, nullable)   -- reference to specific block
  - body (TEXT)
  - created_at (TIMESTAMP)

Media
  - media_id (PK, UUID)
  - filename (VARCHAR 500)
  - cdn_url (VARCHAR 1000)
  - alt_text (VARCHAR 500)
  - title (VARCHAR 500)
  - caption (TEXT)
  - tags (TEXT[])
  - size (BIGINT)             -- bytes
  - type (ENUM: image, video, document)
  - mime_type (VARCHAR 100)
  - folder_id (FK → MediaFolder.folder_id, nullable)
  - uploaded_by (FK → User.user_id)
  - created_at (TIMESTAMP)

MediaFolder
  - folder_id (PK, UUID)
  - name (VARCHAR 255)
  - parent_folder_id (FK → MediaFolder.folder_id, nullable)
  - created_by (FK → User.user_id)
  - created_at (TIMESTAMP)

ContentType
  - type_id (PK, UUID)
  - name (VARCHAR 255)
  - slug (VARCHAR 255, UNIQUE)
  - icon (VARCHAR 50)
  - fields (JSONB)            -- field schema definition
  - is_system (BOOLEAN)       -- true for Page, Blog, Landing
  - created_at (TIMESTAMP)

SEOMeta
  - seo_id (PK, UUID)
  - content_id (FK → ContentItem.content_id, UNIQUE)
  - meta_title (VARCHAR 70)
  - meta_description (VARCHAR 170)
  - canonical_url (VARCHAR 500)
  - og_title (VARCHAR 200)
  - og_description (VARCHAR 300)
  - og_image_id (FK → Media.media_id, nullable)
  - twitter_card (VARCHAR 50)
  - twitter_title (VARCHAR 200)
  - json_ld (JSONB)
  - no_index (BOOLEAN, DEFAULT false)
  - updated_at (TIMESTAMP)

Menu
  - menu_id (PK, UUID)
  - name (VARCHAR 255)
  - location (ENUM: header, footer, mobile, sidebar)
  - items (JSONB)             -- nested tree structure
  - updated_by (FK → User.user_id)
  - updated_at (TIMESTAMP)

Redirect
  - redirect_id (PK, UUID)
  - source_url (VARCHAR 500, UNIQUE)
  - destination_url (VARCHAR 500)
  - type (ENUM: 301, 302)
  - created_by (FK → User.user_id)
  - created_at (TIMESTAMP)

Form
  - form_id (PK, UUID)
  - name (VARCHAR 255)
  - fields (JSONB)            -- field schema
  - settings (JSONB)          -- success message, redirect, notifications
  - status (ENUM: active, inactive)
  - submissions_count (INT, DEFAULT 0)
  - created_by (FK → User.user_id)
  - created_at (TIMESTAMP)

FormSubmission
  - submission_id (PK, UUID)
  - form_id (FK → Form.form_id)
  - data (JSONB)
  - ip_address (VARCHAR 45)
  - status (ENUM: received, spam, archived)
  - submitted_at (TIMESTAMP)

ContentLocale
  - locale_id (PK, UUID)
  - content_id (FK → ContentItem.content_id)
  - language_code (VARCHAR 5)
  - title (VARCHAR 500)
  - slug (VARCHAR 500)
  - body (JSONB)
  - seo_meta (JSONB)
  - status (ENUM: not_started, in_progress, in_review, complete)
  - translator_id (FK → User.user_id, nullable)
  - updated_at (TIMESTAMP)

AuditLog
  - log_id (PK, UUID)
  - user_id (FK → User.user_id)
  - action (VARCHAR 100)      -- e.g., "content.published"
  - entity_type (VARCHAR 50)  -- e.g., "ContentItem"
  - entity_id (UUID)
  - metadata (JSONB)          -- additional context
  - ip_address (VARCHAR 45)
  - created_at (TIMESTAMP)

APIKey
  - key_id (PK, UUID)
  - name (VARCHAR 255)
  - key_hash (VARCHAR 255)    -- stored as hash, never plaintext
  - user_id (FK → User.user_id)
  - status (ENUM: active, revoked)
  - last_used_at (TIMESTAMP)
  - created_at (TIMESTAMP)

Webhook
  - webhook_id (PK, UUID)
  - url (VARCHAR 1000)
  - events (TEXT[])
  - signing_secret_hash (VARCHAR 255)
  - status (ENUM: active, inactive)
  - created_by (FK → User.user_id)
  - created_at (TIMESTAMP)
```

---

## 15. API Design

### Authentication
All write endpoints require: `Authorization: Bearer {token}`  
Published content read endpoints are publicly accessible (no auth).

### Content Endpoints

```
# Content CRUD
GET    /api/v1/content/{type}                    List content items by type (paginated)
GET    /api/v1/content/{type}/{slug}             Get content item by slug
POST   /api/v1/content                           Create content item
PUT    /api/v1/content/{id}                      Update content item
DELETE /api/v1/content/{id}                      Archive content item

# Workflow
PUT    /api/v1/content/{id}/submit-review        Submit for review
PUT    /api/v1/content/{id}/approve              Approve content
PUT    /api/v1/content/{id}/reject               Reject (back to draft)
PUT    /api/v1/content/{id}/publish              Publish content
PUT    /api/v1/content/{id}/schedule             Schedule publish (body: { scheduled_at })
PUT    /api/v1/content/{id}/unpublish            Unpublish → archived

# Versions
GET    /api/v1/content/{id}/versions             Get version history
GET    /api/v1/content/{id}/versions/{vid}       Get specific version
PUT    /api/v1/content/{id}/rollback             Rollback to version (body: { version_id })

# Comments
GET    /api/v1/content/{id}/comments             Get all comments
POST   /api/v1/content/{id}/comments             Add comment
DELETE /api/v1/content/{id}/comments/{cid}       Delete comment

# Localization
GET    /api/v1/content/{id}/locales              Get all locale variants
GET    /api/v1/content/{id}/locales/{lang}       Get specific locale
PUT    /api/v1/content/{id}/locales/{lang}       Update locale content

# Media
POST   /api/v1/media/upload                      Upload media file (multipart)
GET    /api/v1/media                             List media (filter by type/tag/folder)
GET    /api/v1/media/{id}                        Get media asset details
PUT    /api/v1/media/{id}                        Update media metadata
DELETE /api/v1/media/{id}                        Delete media asset
POST   /api/v1/media/folders                     Create media folder

# SEO
GET    /api/v1/seo/{content_id}                  Get SEO metadata for content
PUT    /api/v1/seo/{content_id}                  Update SEO metadata
GET    /api/v1/seo/sitemap                       Get sitemap XML
POST   /api/v1/seo/sitemap/regenerate            Trigger sitemap regeneration
GET    /api/v1/seo/redirects                     List all redirects
POST   /api/v1/seo/redirects                     Create redirect
DELETE /api/v1/seo/redirects/{id}                Delete redirect

# Menus
GET    /api/v1/menus/{location}                  Get navigation menu by location
PUT    /api/v1/menus/{id}                        Update menu items

# Forms
GET    /api/v1/forms                             List all forms
POST   /api/v1/forms                             Create form
GET    /api/v1/forms/{id}                        Get form schema
PUT    /api/v1/forms/{id}                        Update form
POST   /api/v1/forms/{id}/submit                 Submit form (public endpoint)
GET    /api/v1/forms/{id}/submissions            Get submissions (paginated)
DELETE /api/v1/forms/{id}/submissions/{sid}      Delete submission (GDPR)

# Users
GET    /api/v1/users                             List users
POST   /api/v1/users/invite                      Invite user
PUT    /api/v1/users/{id}                        Update user role/status
DELETE /api/v1/users/{id}                        Deactivate user

# Audit
GET    /api/v1/audit                             Get audit log (paginated, filtered)
```

### GraphQL Schema (Excerpt)

```graphql
type ContentItem {
  id: ID!
  type: String!
  title: String!
  slug: String!
  status: ContentStatus!
  body: JSON!
  author: User!
  seo: SEOMeta
  locale(lang: String!): ContentLocale
  publishedAt: DateTime
}

enum ContentStatus {
  DRAFT
  IN_REVIEW
  APPROVED
  SCHEDULED
  PUBLISHED
  ARCHIVED
}

type Query {
  contentItem(slug: String!, type: String!): ContentItem
  contentItems(type: String!, limit: Int, offset: Int): [ContentItem!]!
  menu(location: String!): Menu
}
```

---

## 16. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend Admin | React.js + TypeScript | Component ecosystem, type safety |
| Frontend Delivery | Next.js / Gatsby (JAMstack) | SSG/ISR for performance and SEO |
| Backend | Node.js (Express) or Go | Node: rich ecosystem; Go: performance |
| Primary Database | PostgreSQL | Relational data, ACID compliance |
| Document Store | MongoDB | Flexible block editor content (JSONB) |
| Media Storage | AWS S3 | Durable, scalable object storage |
| CDN | AWS CloudFront / Cloudflare | Global edge delivery |
| Cache | Redis | Session cache, API response cache |
| Search | Elasticsearch / Algolia | Full-text content search |
| Auth | JWT + OAuth 2.0 | Stateless auth, SSO support |
| Email | SendGrid / AWS SES | Transactional email notifications |
| Queue | AWS SQS / Bull | Async jobs (virus scan, image resize) |
| Monitoring | Datadog / New Relic | APM, error tracking |
| CI/CD | GitHub Actions | Automated build, test, deploy |
| Infrastructure | AWS (ECS/EKS) or GCP | Container orchestration |

---

## 17. Security Considerations

| Area | Requirement | Implementation |
|------|-------------|----------------|
| XSS Prevention | Sanitize all user-generated HTML | DOMPurify on input; CSP headers on output |
| CSRF Protection | All state-changing API endpoints | CSRF tokens or SameSite cookies |
| RBAC | Role enforcement at API level | Middleware validates role before every handler |
| Media Security | Type whitelist, size limits, virus scan | ClamAV integration; reject before CDN |
| Password Policy | Min 8 chars, uppercase, number, symbol | bcrypt hashing (cost factor 12) |
| API Rate Limiting | 1000 req/min per key | Redis-backed rate limiter |
| Session Security | JWT: 15-min access, 7-day refresh | Refresh token rotation; invalidation on logout |
| Account Lockout | Lock after 5 failed login attempts | Notify user via email; Admin can unlock |
| GDPR | Cookie consent, data export, deletion | Consent banner; API endpoints for data rights |
| Audit Logging | All write operations logged | Immutable audit_log table |
| Secrets Management | No secrets in code | AWS Secrets Manager / environment variables |
| TLS | HTTPS only | TLS 1.2+ enforced; HSTS headers |

---

## 18. Error Handling & Edge Cases

| Scenario | Handling |
|----------|----------|
| Auto-save fails | Toast: "Save failed. Check connection." Retry every 60s |
| Scheduled publish fails | Email alert to Admin + Publisher; content stays in Scheduled state |
| File upload: virus detected | Block file, show error: "File rejected: security risk detected" |
| File upload: type not allowed | Block file, show error with allowed types list |
| Concurrent edit conflict | "This content was updated by [User] at [time]. Refresh to see latest." |
| Slug change: redirect creation | Auto-create 301 redirect; warn if destination already exists |
| API key revoked mid-session | 401 response with message: "API key revoked. Generate a new key." |
| Webhook delivery failure | Retry 3× (exponential backoff: 1min, 5min, 30min); log failure |
| Version rollback: content in workflow | "Cannot rollback while content is In Review or Approved. Recall first." |
| Form submission: reCAPTCHA fail | Show inline error; do not submit |
| Empty trash: media in use | Warn: "This asset is used in 3 pages. Remove from pages first." |
| DB connection timeout | Graceful degradation: read from cache; write queue for retry |
| CDN propagation delay post-publish | Toast: "Published. CDN propagation may take up to 60 seconds." |

---

## 19. Accessibility Requirements

| Standard | Requirement |
|----------|-------------|
| WCAG 2.1 AA | All admin screens must meet WCAG 2.1 Level AA |
| Keyboard navigation | Full keyboard accessibility for all editor actions |
| Screen reader | ARIA labels on all interactive elements |
| Color contrast | Minimum 4.5:1 ratio for text |
| Focus indicators | Visible focus ring on all focusable elements |
| Alt text | Enforced for all images before publish |
| Error messages | Descriptive, not just color-based |
| Form labels | All form fields have associated label elements |

---

## 20. Implementation Phases & Roadmap

| Phase | Duration | Features | Deliverables |
|-------|----------|----------|--------------|
| **Phase 1** | Month 1 | Authentication, User Management, Dashboard, Content Types, WYSIWYG Editor, Block Builder, Media Library | Core CMS shell — create and save content |
| **Phase 2** | Month 2 | Workflow (Draft→Review→Approved→Published), Versioning, Auto-save, Scheduled Publishing, Email Notifications | End-to-end publishing pipeline |
| **Phase 3** | Month 3 | SEO Management (meta, OG, sitemap, robots.txt, redirects), Menus & Navigation, Live Preview | SEO tools live; menus managed |
| **Phase 4** | Month 4 | Forms & Landing Pages, Multi-language & Translation, Headless REST & GraphQL APIs, Webhooks | International content + headless delivery |
| **Phase 5** | Month 5 | Analytics Integration (GA4, GSC), CDN optimization, Performance tuning, Audit Log, Security hardening | Analytics live; performance targets met |
| **Go-Live** | Month 6 | QA regression, UAT, content migration, staff training, production deployment | ✅ Live in production |

### Post Go-Live Roadmap (v2)
- Real-time collaborative editing
- AI content suggestions (grammar, readability, SEO)
- A/B testing for landing pages
- Native mobile app for CMS admin
- Advanced analytics (cohort analysis, conversion funnels)
- E-commerce integration (separate product stream)

---

## 21. Open Questions & Risks

### Open Questions
| # | Question | Owner | Due |
|---|----------|-------|-----|
| Q1 | Which OAuth provider will be used for SSO? (Okta, Google, Azure AD) | IT / Security | Phase 1 |
| Q2 | What is the maximum media storage quota per account? | Product | Phase 1 |
| Q3 | Should form submissions be stored indefinitely or auto-purged after X days? | Legal / Product | Phase 2 |
| Q4 | Will the CMS support multiple sites (multi-tenant) in v1? | Product | Phase 1 |
| Q5 | What virus scanning service will be used? (ClamAV vs. third-party SaaS) | Infra | Phase 1 |
| Q6 | Is Google Search Console integration required at launch or can it be Phase 2? | SEO Team | Phase 3 |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Block editor complexity causes timeline slip | Medium | High | Use proven open-source base (TipTap / Slate.js) |
| Performance targets not met at scale | Medium | High | Load test from Phase 3; Redis caching from Phase 1 |
| GDPR scope creep from Legal | Low | Medium | Lock GDPR requirements in Phase 1; legal sign-off |
| API breaking changes post-launch | Medium | High | Version APIs (v1) from day 1; deprecation policy defined |
| CDN invalidation bugs causing stale content | Low | High | Cache-busting strategy defined before Phase 5 |
| SEO disruption during content migration | Medium | High | Migration plan with URL mapping + 301 redirects in Phase 6 |
| User adoption resistance | Medium | Medium | UX testing in Phase 4; training materials in Phase 6 |

---

*End of Document*

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Product Team | Initial draft |
| 2.0 | Mar 2026 | Product Team | Added screen flows, feature list, edge cases, data model expansion, API v1 spec |