# Phase Roadmap

**Product:** Education discovery & lead-generation platform (working name — brand TBD)
**Document status:** Draft v0.1 — sequencing is directional; timelines to be set per phase
**Related documents:** [BRD.md](BRD.md) · [PRD.md](PRD.md)

---

## Overview

```text
Phase 1            Phase 2               Phase 3              Phase 4                    Phase 5
Static demo   →    Real backend     →    Admin + leads   →    Student / counsellor  →    Automation,
(validate)         (go live)             (operate)            / applications (scale)     analytics, AI (optimise)
```

Each phase must deliver something usable and stable before the next phase begins. Later phases are re-planned using what was learned in earlier ones. **Phase scope is not committed until that phase starts.**

---

## Phase 1 — Static Frontend Demonstration

**Objective:** Validate the product direction with the client through a polished, responsive demo, and lay a frontend foundation that is ready for the backend.

**Scope:** As defined in [PRD.md](PRD.md):

- Home, university/college/course listings and details, search, filters, basic comparison, enquiry (simulated), WhatsApp link, articles, About, Contact
- React 18 + Vite + TypeScript + Tailwind + React Router (+ shadcn/ui where useful)
- Static, typed, fictional/labelled demo data behind an async data access layer
- Design workflow: UX structure → visual direction → build → `impeccable` review
- Hosted on Vercel, `noindex`

**Out of scope:** backend, database, auth, real leads, payments, messaging APIs, AI.

**Exit criteria:**
- The client signs off on the IA, journeys, visual direction and enquiry approach
- The PRD Definition of Done is met
- Open questions (BRD §13) are answered or carried into Phase 2 planning

---

## Phase 2 — Node.js + Express + MySQL Backend

**Objective:** Make the platform real. It serves real, verified content and captures real enquiries.

**Scope:**
- Node.js + Express REST API matching the Phase 1 data-layer contract (PRD §18, §20)
- MySQL schema: streams, courses, specializations, institutions (universities/colleges), affiliations, offerings, approvals, locations, articles, FAQs, enquiries, consent records
- Migrations and seed data; parameterised queries only
- Server-side search, filtering, facet counts, pagination
- `POST /api/enquiries`: server validation, consent capture, storage, notification to the business (e.g. email), rate limiting / spam protection
- Swap the frontend data layer from static to API implementation
- **SEO go-live decision and implementation:** prerender/SSG for content pages *or* migration to an SSR framework; sitemap, structured data, remove `noindex`
- Real content loading (initially via seed scripts/imports, since the admin arrives in Phase 3)
- Privacy policy and terms (legal-reviewed), DPDP-aligned consent
- Basic privacy-respecting analytics (page views, enquiry conversions)
- Environments (dev/staging/prod), backend hosting decision, backups, logging, error monitoring

**Key decisions to make at start:** backend hosting, SEO rendering strategy, how content is sourced and verified, and the notification channel for leads.

**Exit criteria:** Real content is live and indexable; enquiries are reliably stored and delivered; there is a basic security review; and backups have been verified.

---

## Phase 3 — Admin + Lead Management

**Objective:** Let the business operate the platform themselves: manage content and work leads.

**Scope:**
- Admin authentication, role-based access (Super admin, Content editor, Counsellor manager, Counsellor), audit log
- Content CMS: CRUD for all entities, draft/publish, SEO fields, media library, "last verified" tracking for facts
- Lead CRM: list, filters, status pipeline, lead detail with full context, notes
- Lead assignment (manual first, then rule-based / round-robin)
- Follow-up tasks, reminders, duplicate detection
- Basic operational reports (leads by source/course/institution/counsellor) and CSV export
- Consent and data-retention handling

**Exit criteria:** The content team can publish without developer help; counsellors work every lead inside the system; managers can see the pipeline.

---

## Phase 4 — Student, Counsellor & Application Features

**Objective:** Extend from lead capture into an ongoing relationship with the student and support for the application.

**Scope:**
- Student accounts (likely OTP-based mobile login; to be decided), profile
- Saved colleges/courses, saved and advanced comparison (cross-institution offerings, richer attributes)
- Counsellor workspace: assigned students, communication history, appointments
- Application tracking (status per institution/programme)
- Document upload: secure storage, type/size validation, access control, retention policy
- Payments (e.g. application or service fees): payment-gateway integration, reconciliation, receipts. The business model must be confirmed first.

**Key considerations:** handling personal data (documents) securely, payment compliance, and whether partner institutions need any portal access.

**Exit criteria:** A student can register, save, compare, apply (tracked) and upload documents; counsellors manage these from their workspace; payments are reconciled.

---

## Phase 5 — Automation, Analytics & AI

**Objective:** Improve conversion, response time and personalisation using the data and workflows built in Phases 2–4.

**Scope:**
- WhatsApp Business API and SMS: instant enquiry acknowledgement, follow-up sequences, reminders. Uses approved templates and consent-aware opt-in/opt-out.
- Analytics: funnel (discover → enquire → apply → enrol), source/campaign attribution, counsellor performance, content performance, zero-result search insight
- AI recommendations: course/institution suggestions from stated preferences and behaviour. Must be explainable, must have an evaluation set, and must have deterministic filters (eligibility, budget, mode) applied before any model ranking.
- AI chatbot: answers grounded only in the platform's verified content (retrieval-based), with clear hand-off to a human counsellor. Must not invent fees, approvals or admission guarantees. Needs evaluation and monitoring before launch.

**Key considerations:** messaging costs and template approval; AI accuracy and liability for education advice; privacy of student data used for personalisation.

**Exit criteria:** Each automation or AI feature shows a measured improvement against a baseline, and has guardrails and human fallback in place.

---

## Cross-Phase Principles

- **Contracts first.** The Phase 1 data-layer types become the API contract. Changes to them are deliberate.
- **Verified facts only.** Fees, approvals and rankings shown in production need a source and a verification date.
- **Trust over pressure.** No dark patterns, fake urgency or invented social proof, in any phase.
- **Privacy by design.** Consent is captured from the first real enquiry (Phase 2) and respected by every later feature.
- **Earn complexity.** New libraries, services and infrastructure are added only when a phase genuinely needs them.
