# Product Requirements Document (PRD)

**Product:** Education discovery & lead-generation platform (working name — brand TBD)
**Document status:** Draft v0.1 — for client review
**Scope of this PRD:** Phase 1 (static frontend demonstration), plus the boundaries that later phases must respect
**Related documents:** [BRD.md](BRD.md) · [PHASE-ROADMAP.md](PHASE-ROADMAP.md)

---

## 1. Product Objective

Build a polished, responsive, frontend-only demo that shows the complete student journey:

> **Discover → Search/Browse → Filter → View Details → Compare → Enquire**

The demo must:

- feel like a real, intentionally designed product, not a template
- be credible enough for client validation, using clearly labelled demo data
- be built so that static data can later be replaced by a Node.js/MySQL API without restructuring the UI

## 2. Target Users

| Persona | Context | What they need from the product |
|---|---|---|
| **School leaver (UG seeker)** | Mostly mobile, often browses with parents | Courses by stream, eligibility, fees, location, approvals |
| **Graduate (PG seeker)** | Mobile and desktop, compares actively | Specializations, fees, mode, comparison |
| **Working professional** | Time-poor, interested in online/distance | Mode filter, duration, total fee, recognition of the degree |
| **Parent / guardian** | Trust-focused, financial decision-maker | Approvals, fees, clear facts, a human contact |

Design priority: **mobile-first** (assumed to be the majority of traffic in this category; confirm with analytics in Phase 2).

## 3. Design Approach (required process)

This is a greenfield product. Implementation must follow the global designer workflow:

```text
Understand brief → UX structure (ui-ux-pro-max) → Visual direction (frontend-design)
→ Human design judgement / client review → Implementation → Quality review (impeccable) → Fix important issues
```

Design constraints:

- Must not read as a generic AI template. Avoid by default: the hero + 3 cards + 3 cards + dark section pattern, excessive gradients or glassmorphism, excessive pills or badges, unnecessary borders, card grids for all content, and decoration without a purpose.
- Use hierarchy (size, spacing, alignment, contrast) rather than decoration.
- Trust and clarity come before urgency. No fake scarcity ("seats filling fast"), no invented statistics, testimonials, partners or outcomes.
- Keep CTAs few and contextual. Each page has one primary CTA and at most one secondary CTA in view.
- Any motion uses CSS transitions, has a purpose, and respects `prefers-reduced-motion`. No motion library unless it is genuinely needed.

The visual direction (typography, palette, composition) is established in the design step before implementation. It is not defined in this PRD.

## 4. Information Architecture

```text
Home
├── Universities ── University detail
├── Colleges ────── College detail
├── Courses ─────── Course detail
├── Search (results across all types)
├── Compare (universities | colleges | courses)
├── Articles ────── Article detail
├── About
├── Contact
└── Utility: Privacy (placeholder), Terms (placeholder), 404
Global: header nav, search entry, compare tray, enquiry dialog, WhatsApp CTA, footer
```

### 4.1 Entity model (conceptual)

```text
Stream (e.g. Management, Engineering)
   └── Course (generic programme, e.g. MBA, B.Tech) ── level, duration, eligibility
          └── Specialization (optional, e.g. Marketing)

University ──< College (affiliation, optional)
University / College ──< Offering >── Course
                           (institution-specific: fee, mode, seats*, specializations, duration)

Article ── tags/category ── related Courses / Institutions
Approval/Accreditation (e.g. UGC, AICTE, NAAC grade) ── attached to institutions
Location (state, city)
```

\* only shown when demo data provides it; never invented for real institutions.

The **Offering** concept matters. It lets a course page list "where you can study this", lets an institution page list "what you can study here", and lets fees and mode live where they actually belong.

### 4.2 Primary navigation

- Header: Universities · Colleges · Courses · Articles · (search entry) · primary CTA "Get guidance" (opens enquiry)
- Mobile: compact header with a search icon, a menu drawer, and a persistent but unobtrusive WhatsApp/enquiry access point
- Footer: discovery links (by stream, by mode, popular courses), company (About, Contact), legal placeholders, contact details (placeholders), and a demo-data notice

## 5. Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | |
| `/universities` | University listing | Filters and sort reflected in query params |
| `/universities/:slug` | University detail | |
| `/colleges` | College listing | Filters in query params |
| `/colleges/:slug` | College detail | |
| `/courses` | Course listing | Filters in query params |
| `/courses/:slug` | Course detail | |
| `/search?q=` | Global search results | Grouped by type |
| `/compare?type=university&items=a,b,c` | Comparison | URL is shareable; `type` ∈ university, college, course |
| `/articles` | Article listing | `?category=` |
| `/articles/:slug` | Article detail | |
| `/about` | About | |
| `/contact` | Contact | Includes the enquiry form |
| `/privacy`, `/terms` | Legal placeholders | Clearly marked as placeholder text |
| `*` | 404 | Offers search and links to the main sections |

Rules:

- Slugs are lowercase and hyphenated. IDs are not exposed in URLs.
- Listing filter, sort and page state lives in the URL, so it can be shared and Back/Forward restores it.
- Vercel needs an SPA rewrite (all paths → `index.html`).

## 6. Public Pages

| Page | Purpose | Key content | Primary CTA |
|---|---|---|---|
| **Home** | Orient the user and start discovery fast | Prominent search; entry points by goal (stream, level, mode); featured courses and institutions (demo); how the guidance service works; selected articles | Search / browse |
| **Listings** (×3) | Narrow options | Filters, sort, result count, useful cards, empty state | View details / add to compare |
| **Details** (×3) | Help the user decide | Key facts first, structured sections, related items | Enquire |
| **Search** | Find anything by name or keyword | Grouped results, suggestions on no results | Open result |
| **Compare** | Side-by-side decision | Attribute table, highlighted differences | Enquire about a compared item |
| **Articles** | Inform, build trust, SEO | Category filter, list, article detail with related links | Read / continue to related course |
| **About** | Explain who we are and how we work | Mission, approach, how guidance works. **Placeholder copy only until the client supplies it** | Contact |
| **Contact** | Direct contact | Enquiry form, WhatsApp, phone/email (placeholders) | Submit enquiry |

Home must not be a generic stack of card grids. Its sections must answer real user questions, such as "What should I study?", "Where can I study it?", "Is it recognised?" and "Who can help me?".

## 7. User Journeys

### J1 — Course-first (most common)
Home → search "MBA" or browse Courses → filter by mode/level → Course detail → "Where to study" offerings → Institution detail → Enquire

### J2 — Institution-first
Home → Universities → filter by state + approval → University detail → courses offered → Add to compare → Compare (2–3) → Enquire

### J3 — Content-led
Article (arrives from search engine/social) → related course link → Course detail → Enquire / WhatsApp

### J4 — Quick contact
Any page → WhatsApp CTA (pre-filled message containing page context) **or** "Get guidance" → enquiry dialog → confirmation

### J5 — Parent verification
University detail → approvals & key facts → fees → Contact a counsellor

Each journey must be completable on a 360px-wide device without horizontal scroll or dead ends.

## 8. Search

**Phase 1 behaviour (client-side):**

- Global search entry in the header (expanding field on desktop, full-screen overlay on mobile) and a prominent search on Home.
- Matches name, short name/abbreviation, city/state, stream, course names and specializations. Case-insensitive and tolerant of extra whitespace. Simple token matching; no fuzzy-search dependency unless testing shows it is clearly needed.
- **Typeahead suggestions** (debounced), grouped by type (Courses / Universities / Colleges / Articles) with a maximum of about 5 per group. Fully keyboard operable (combobox pattern).
- Submitting goes to `/search?q=` with grouped results and "see all in {type}" links to the listing pre-filtered with that query.
- **No results:** show the query, suggest popular courses and streams, and offer the enquiry CTA ("Tell us what you're looking for").
- Listing pages have their own in-list keyword filter (`?q=`).

**Future (Phase 2+):** server-side search (MySQL full-text first; a dedicated search engine only if justified), synonyms (e.g. "btech" → "B.Tech"), and analytics on zero-result queries.

## 9. Filtering

Filters must reflect real decision factors and only filter on fields that exist in the data.

| Listing | Filters | Sort |
|---|---|---|
| **Universities** | State/city · Type (Central / State / Private / Deemed) · Mode (Regular / Online / Distance) · Approvals (UGC, AICTE, NAAC grade, …) · Streams offered · Fee range | Relevance · Name A–Z · Fees low→high |
| **Colleges** | State/city · Ownership (Government / Private) · Stream · Affiliated university · Approvals · Fee range | Relevance · Name A–Z · Fees low→high |
| **Courses** | Level (UG / PG / Diploma / Certificate / Doctorate) · Stream · Mode · Duration · Fee range (across offerings) | Relevance · Name A–Z · Duration |

Behaviour:

- Desktop: persistent filter sidebar. Mobile/tablet: a "Filters" button opens a sheet with an "Apply"/"Show N results" action.
- Applied filters appear as removable chips above results, plus "Clear all".
- Multi-select within a facet uses OR; across facets uses AND. **Exception: fee range is single-select.** It uses four preset bands as radio options (Under ₹1 lakh, ₹1–3 lakh, ₹3–5 lakh, Over ₹5 lakh, plus "Any"): per year for institutions, total for courses. See DESIGN-DIRECTION.md §12.
- Show result counts. Disable or hide options that would return zero results.
- State lives in the URL (see §5).
- No ranking-based sort (e.g. "Top rated" or NIRF rank) unless verified data exists. Rankings are factual claims.

## 10. Listing Pages

**Card content (designed per entity, not one generic card):**

| Entity | Card shows |
|---|---|
| University | Name, city/state, type, key approvals, modes, fee range (from offerings), number of courses, actions: View · Compare |
| College | Name, city/state, ownership, affiliated university, streams, fee range, actions: View · Compare |
| Course | Name, level, stream, typical duration, modes, fee range across institutions, number of institutions offering, actions: View · Compare |

Requirements:

- Show the result count and active filters.
- Use a list layout where scanning and comparing facts matters. Don't default to a 3-column card grid.
- Pagination or "Load more" (choose in UX step). Preserve scroll and filter state on Back.
- Loading skeletons are structured so a future async API needs no layout change.
- Empty state gives a useful recovery: clear filters, broaden the location, or enquire.
- "Compare" toggles add the item to the compare tray (§12).

## 11. Detail Pages

Avoid the overlong, single-scroll pattern seen in the category. Put **key facts first**, followed by structured sections with in-page navigation (sticky section nav on desktop, horizontally scrollable on mobile).

### 11.1 University detail
1. Header: name, location, type, approvals, established year (demo), primary CTA (Enquire), secondary (Compare, WhatsApp)
2. Key facts: modes, course count, fee range, approvals
3. Overview
4. Courses & fees: the institution's offerings, filterable by level/stream
5. Admission process & eligibility (general)
6. Approvals & accreditations (with what each means, in plain language)
7. Facilities / campus (only if data exists)
8. FAQs
9. Related: affiliated colleges, similar universities

### 11.2 College detail
Same structure, with the affiliated university linked and the courses offered listed.

### 11.3 Course detail
1. Header: course name, level, stream, duration, modes, CTA
2. Key facts: duration, eligibility, fee range, modes
3. Overview: what the course is and who it suits
4. Specializations
5. Eligibility & admission
6. Typical curriculum outline (demo)
7. Career paths (general, non-quantified unless sourced)
8. **Where to study:** offerings table/list with institution, mode, fee, duration, and Compare/Enquire actions
9. FAQs · related articles · related courses

Common requirements:

- An enquiry CTA is always reachable: a sticky bottom bar on mobile and a sticky side panel or header CTA on desktop. It opens the enquiry dialog pre-filled with this entity.
- Breadcrumbs.
- Sections without data are hidden, never filled with invented content.
- Every fact that would need verification in production (fees, approvals) carries "demo data" labelling in Phase 1.

## 12. Comparison

**Phase 1 (basic):**

- Users add items from listings or detail pages. Up to **3 items of the same type**.
- A **compare tray** (persistent, collapsible, bottom of viewport) shows the selected items, with remove and "Compare now". Adding a different type prompts the user to start a new comparison.
- Selection persists across navigation via `localStorage` (convenience only). The comparison page itself is driven by the URL so it can be shared.
- Compare page: a column per item, rows grouped by attribute category, an option to highlight differences, a per-item Enquire CTA, and a "remove/replace" action.
- Mobile: two columns visible with a sticky item header and horizontal swipe; or an item switcher. Final pattern chosen in the UX step.

**Attributes:**

| Type | Attributes |
|---|---|
| University | Location, type, established, approvals, modes, fee range, number of courses, streams |
| College | Location, ownership, affiliation, approvals, streams, fee range |
| Course | Level, stream, duration, eligibility, modes, fee range, specializations, number of institutions |

Future: cross-type comparison of offerings (e.g. "MBA at X vs MBA at Y"), saved comparisons (requires accounts), and a richer attribute set.

## 13. Enquiry Flow

### 13.1 Entry points
- Header "Get guidance" · detail page sticky CTA · offering rows · compare page · search no-results · Contact page · article end
- **WhatsApp CTA:** `https://wa.me/<number>?text=<prefilled message with page context>`. The number is a placeholder until supplied. Opens in a new tab. On listings and details it does not cover content or overlap the compare tray.

### 13.2 Form
A dialog (a bottom sheet on mobile) with a full-page version on `/contact`.

| Field | Required | Notes |
|---|---|---|
| Full name | Yes | |
| Mobile number | Yes | India format: 10 digits, `+91` prefix displayed |
| Email | No | Validated if provided |
| State / city | Yes | |
| Interested in | Pre-filled | The course or institution from context; editable |
| Preferred mode | No | Regular / Online / Distance / Not sure |
| Message | No | |
| Consent | Yes | Checkbox: agree to be contacted by call/WhatsApp/SMS/email; links to Privacy |

Hidden context (included in the payload contract): source page, entity type and ID, compare set (if any), and a timestamp. UTM parameters will be added in Phase 2.

Final field list is subject to client confirmation (BRD §13).

### 13.3 Behaviour
- Inline, accessible validation (on blur and on submit). Errors are announced to screen readers.
- Keep the form short. A multi-step flow is not used in Phase 1.
- **Phase 1 submit:** client-side validation, then a short simulated pending state, then a confirmation screen. The confirmation explains what happens next and includes a clear "This is a demo — no data was sent or stored" notice. **No network request, no persistence.**
- The submit handler calls a single `submitEnquiry(payload)` function in the data/service layer. In Phase 2 its implementation becomes a `POST` to the API.
- No popups on page load, no exit-intent modals, no timed interruptions.

## 14. Blog / Articles

- **Listing:** category filter (e.g. Admissions, Courses, Careers, Online Learning), featured article, and a chronological list with title, excerpt, category, date and reading time.
- **Detail:** title, category, author (demo), published/updated dates, reading time, table of contents for long articles, body, related courses/institutions, related articles, and an enquiry CTA at the end.
- **Content format:** typed structured content blocks (heading, paragraph, list, quote, image, callout, table) rendered by our own components. This avoids adding a Markdown/MDX dependency in Phase 1. Revisit when a CMS is introduced.
- Demo articles are generic, educational, and clearly sample content. They make no factual claims about real institutions.

## 15. Responsive Requirements

- Mobile-first. Validate at around 360px, 390px, 768px, 1024px, 1280px and 1440px+.
- Use Tailwind's default breakpoints unless the design step identifies a concrete need for something else.
- No horizontal page scroll. Wide tables (offerings, comparison) scroll within their container, with visible affordance.
- Touch targets ≥ 44×44px. Filters and enquiry use bottom sheets on mobile.
- Sticky elements (header, CTA bar, compare tray) must not stack into an unusable viewport on small screens. Define their priority in the UX step.
- Images are responsive, sized to prevent layout shift, and lazy-loaded below the fold.

## 16. Accessibility

Target: **WCAG 2.2 AA**.

- Semantic landmarks, one `h1` per page, logical heading order
- Full keyboard operability, visible focus, skip-to-content link
- Accessible combobox for search, and accessible dialogs/sheets (focus trap, Esc, focus return). Use shadcn/ui (Radix) primitives where they help.
- Labelled form controls, errors linked via `aria-describedby`, and live-region announcements for result counts and form status
- Colour contrast ≥ 4.5:1 for text. Never use colour alone to convey state (e.g. approvals, differences in comparison).
- Data tables use proper `th`/`scope` markup
- Respect `prefers-reduced-motion`
- Route changes move focus to the page heading and update `document.title`

## 17. SEO

Phase 1 is a client-side SPA demo. Full SEO is a Phase 2 concern, but the foundations are laid now:

- Per-route `<title>` and meta description, canonical and Open Graph tags, set by a small in-house hook or component (no dependency unless needed)
- Clean, descriptive slugs and breadcrumbs
- Semantic HTML and a proper heading structure
- Structured data shapes planned for later: `CollegeOrUniversity`, `Course`, `Article`, `BreadcrumbList`, `FAQPage`
- **The demo deployment must be `noindex`** (robots meta and `robots.txt`), so that demo data is not indexed

**Phase 2 decision:** SPA content is not reliably indexable at scale. Before go-live, choose between prerendering/SSG for content pages, or migrating to an SSR-capable framework. Keeping routes and components framework-agnostic (§19) keeps both options open.

## 18. Static Data Strategy

- Demo data lives in typed TypeScript modules under `src/data/` (or JSON with TypeScript types). It is normalised like a database: entities reference each other by ID (e.g. an offering references a course ID and an institution ID).
- **Fictional institutions** (or explicitly labelled samples) are used, to avoid publishing inaccurate facts about real ones. A visible site-wide "Demo data" notice appears in the footer and on fact-heavy sections.
- **Volume:** enough to make filters, pagination and comparison meaningful. Indicatively about 12–20 universities, 20–30 colleges, 25–40 courses, 80+ offerings, 8–12 articles. To be confirmed in the UX step.
- Images: royalty-free or neutral placeholders with proper licensing. Nothing is taken from the reference sites.
- **The UI never imports data files directly.** All reads go through a data access layer (§19):

```ts
// shape only — illustrative
getUniversities(params: ListParams): Promise<Paginated<UniversitySummary>>
getUniversityBySlug(slug: string): Promise<UniversityDetail | null>
getCourses(params), getCourseBySlug(slug), getColleges(params), getCollegeBySlug(slug)
search(q: string): Promise<GroupedSearchResults>
getArticles(params), getArticleBySlug(slug)
getFilterOptions(type): Promise<FilterOptions>
submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult>
```

- These functions are **async** even when they are static, so that switching to `fetch` in Phase 2 changes only the implementation, not the callers.
- Types are designed as the API contract: summary DTOs for lists, detail DTOs for pages.

## 19. Frontend Architecture

**Stack:** React 18 · Vite · TypeScript (strict) · Tailwind CSS · React Router · shadcn/ui where it genuinely helps (dialog, sheet, combobox/command, select, checkbox, accordion, tabs, tooltip).

**Not used in Phase 1:** Redux or any global state library, a data-fetching library, form libraries, animation libraries, or a Markdown parser. Each needs a demonstrated need before it is added.

**State approach:**

| State | Where |
|---|---|
| Filters, sort, page, search query, compare set (on compare page) | URL search params |
| Compare tray selection | React context + `localStorage` |
| Enquiry dialog open/context | React context |
| Server-like data | Data access layer + small local hooks (loading/error/data) |

**Indicative structure** (finalised at implementation):

```text
src/
  app/            router, layout, providers
  pages/          route-level components
  features/       search, filters, compare, enquiry, articles (feature UI + hooks)
  components/     shared UI (incl. shadcn/ui generated components)
  data/           static demo datasets
  services/       data access layer (static impl now, API impl later)
  types/          domain + DTO types
  lib/            utilities (formatting INR, slugs, seo helpers)
```

Other requirements:

- Route-level code splitting (`React.lazy`)
- Error boundary per route, plus a 404 page
- Design tokens (colour, type, spacing, radius) defined once in Tailwind config / CSS variables
- INR formatting via `Intl.NumberFormat('en-IN')`
- Environment config through Vite env variables (e.g. future `VITE_API_BASE_URL`, WhatsApp number). No secrets in the frontend, ever.
- Linting/formatting (ESLint + Prettier) and type-check in the build

## 20. Future Backend Boundary

| Concern | Phase 1 (frontend) | Phase 2+ (backend) |
|---|---|---|
| Content data | Static modules via data layer | REST API (Node/Express) backed by MySQL |
| Search & filters | Client-side over static data | Server-side queries, pagination, facet counts |
| Enquiry | Validate → simulated confirmation | `POST /api/enquiries`: server validation, consent record, storage, notification, spam protection (rate limit/captcha) |
| Compare | URL + localStorage | Unchanged; saved comparisons need accounts (Phase 4) |
| SEO | Client meta tags, noindex | Prerender/SSR, sitemap, structured data |
| Auth | None | Admin auth (Phase 3), student auth (Phase 4) |

Indicative API shape (to be finalised in Phase 2):

```text
GET  /api/universities?state=&type=&mode=&approval=&q=&sort=&page=
GET  /api/universities/:slug
GET  /api/colleges…   GET /api/courses…   GET /api/articles…
GET  /api/search?q=
GET  /api/filters/:type
POST /api/enquiries
```

Rule: **the backend is the source of truth for validation and security.** Frontend validation is a UX aid only.

## 21. Phase 1 Non-Goals

- Real enquiry submission, storage, email or CRM delivery
- Backend, API, database, authentication, user accounts
- Saved items, personalised recommendations
- Payments, document upload, application tracking
- WhatsApp Business API / SMS. Only a `wa.me` link is used.
- AI chatbot or recommendations
- CMS / admin interface
- Production SEO (indexing, SSR, sitemap)
- Multilingual support
- Real institution data or rankings
- Analytics tracking (may add a privacy-respecting page-view tool only if the client asks for demo metrics)

## 22. Future Admin Requirements (Phase 3, captured for direction)

- **Authentication & roles:** Super admin, Content editor, Counsellor manager, Counsellor. Role-based permissions and an audit log.
- **Content management:** CRUD for universities, colleges, courses, specializations, offerings, approvals, locations, streams, articles, FAQs. Draft/publish workflow, slug management, SEO fields, media library.
- **Data integrity:** source and "last verified" date per fact (fees, approvals), and validation of relationships.
- **Lead management:** lead list with filters and status pipeline (New → Contacted → Interested → Applied → Enrolled / Lost); lead detail with full context (source page, entity, compare set, UTM); assignment (manual, then rules/round-robin); notes; follow-up tasks and reminders; duplicate detection by mobile number; export.
- **Compliance:** consent records, data retention, and data-principal requests (DPDP Act 2023), with legal review.
- **Reporting:** leads by source, course, institution and counsellor; conversion by stage.

## 23. Definition of Done (Phase 1)

A page or feature is done when:

- [ ] It matches the agreed UX structure and visual direction (design workflow §3 followed)
- [ ] It works at mobile, tablet and desktop widths with no horizontal page scroll
- [ ] Keyboard and screen-reader basics are verified (focus order, labels, dialogs, headings)
- [ ] It reads data only through the data access layer and is fully typed (no `any` in domain code)
- [ ] Loading, empty and error states exist where data is "fetched"
- [ ] URL state works (refresh, share, Back/Forward) for listings, search and compare
- [ ] No invented factual claims, and demo data is labelled
- [ ] `tsc`, lint and production build pass with no console errors

Phase 1 is done when:

- [ ] All routes in §5 are implemented, and journeys J1–J5 are completable end to end
- [ ] The enquiry flow (dialog + contact page) validates and confirms, with no data transmitted
- [ ] The WhatsApp CTA works with a configurable number and context message
- [ ] An `impeccable` quality review has been run, and important findings are fixed
- [ ] It is deployed to Vercel with an SPA rewrite and `noindex`
- [ ] A Lighthouse check has been run on key pages (Home, a listing, a detail) and the results recorded. Targets: Accessibility ≥ 95, Best Practices ≥ 95, Performance ≥ 85 on mobile
- [ ] The client walkthrough is completed and feedback captured for Phase 2
