# CLAUDE.md — Education Discovery Platform

Permanent product and development context for this repository.

**Product source of truth:** [docs/BRD.md](docs/BRD.md) · [docs/PRD.md](docs/PRD.md) · [docs/PHASE-ROADMAP.md](docs/PHASE-ROADMAP.md).
If this file and the docs disagree, the docs win. Flag the conflict; don't silently pick one. Don't edit the docs unless a real contradiction has to be resolved.

---

## 1. Project Identity

- **What it is:** a website where students and parents discover universities, colleges and courses, evaluate and compare them, and submit enquiries. The working name is TBD, so use a placeholder brand.
- **Target users:** school leavers (UG), graduates (PG), working professionals (online/distance), and parents/guardians (PRD §2). Mobile-first.
- **Business objective:** generate qualified enquiries (leads), which counsellors later act on (BRD §3).
- **Market (assumed, BRD §11):** India; English; INR; Indian approvals (UGC, AICTE, NAAC). Covers regular, online and distance modes.
- **Reference sites** (`findmycollege.com`, `learningshala.com`) are for category understanding only. **Never** copy their branding, copy, assets, layouts or implementation.

## 2. Current Phase

**We are currently in Phase 1 — Static Frontend Demonstration.**

- Purpose: **client validation and demonstration** of the intended product experience.
- Output: a polished, responsive, frontend-only React app with structured demo data.
- Hosting: **Vercel** (SPA rewrite to `index.html`, `noindex`).
- **Milestone status:**
  - Milestone 1 is complete: foundation, global shell, homepage, core design system.
  - Milestone 2 is complete: `/universities`, `/colleges` and `/courses` with search, filters, sort, pagination and compare selection with the tray.
  - The **Pathways, marked up** design was adopted on 2026-10-10/11 (homepage rebuilt; shell and listings re-skinned; the temporary design lab removed after integration).
  - Milestone 3A is complete: `/universities/:slug` and `/colleges/:slug` detail pages, plus the shared enquiry dialog.
  - All other routes in PRD §5 still render `PlaceholderPage`.

### Detail pages and enquiry (Milestone 3A)
- **Services:** `getUniversityBySlug` / `getCollegeBySlug` return `UniversityDetail` / `CollegeDetail`, or `null` for an unknown slug (`src/services/static/detail.ts`). Offerings, approvals, affiliations, similar or sibling institutions and related articles are all derived from existing data. There is no FAQ data, so the FAQ section is hidden.
- **Layout** (`src/features/institutions/detail/`): night title band → key facts → sticky section nav → sections. From 1024px a sticky `GuidancePanel` sits beside the content. Below 1024px a single `DetailActionBar` holds guidance, WhatsApp and (below 768px) Compare (n).
- **Bottom layers:** the compare tray publishes `--compare-tray-height` and the action bar publishes `--action-bar-height`; html `scroll-padding-bottom` uses both. The action bar sits on top of the docked tray. Below 768px the tray hides while an action bar is registered (`registerActionBar`), and the bar opens the tray's sheet (`sheetOpen` lives in `CompareProvider`).
- **Enquiry:** one `EnquiryProvider` in `RootLayout`. `useEnquiry().open(context)` / `GuidanceButton`. The draft is kept in memory until a successful submit. `submitEnquiry` is simulated: 800ms, no network, no storage. The confirmation says "This is a demo. Nothing was sent or stored." It makes no response-time or "free" claims.

### Discovery listings (Milestone 2)
- **Service contract:** `getUniversities` / `getColleges` / `getCourses(query: ListQuery): Promise<ListResult<T>>` (`src/types/listing.ts`).
  - The result carries items, paging, **facets with counts** and sort options. The facet counts stand in for a separate `getFilterOptions`, because counts depend on the current query.
  - The static engine is `src/services/static/listing.ts`, a generic engine with no UI knowledge. Entity definitions live in `src/services/static/discovery.ts`.
- **Search:** token matching in `textSearch.ts`. It is case-insensitive and ignores punctuation (`btech` = `B.Tech`), and every token must match.
- **Filters:** OR within a facet, AND across facets. **Exception: fee bands are single-select radios** (four bands plus "Any"). The facet declares `selection: 'single'`. A facet's counts ignore that facet's own selection. Zero-count options are disabled. Unknown URL values are dropped.
- **URL state:** `useListingParams` writes `q`, one comma-separated param per facet, `sort` and `page`. A second fee value in the URL is ignored. The mobile filter sheet asks "Discard filter changes?" before closing with unapplied changes.
  - Every change pushes history. Any change other than the page resets to page 1.
  - The page size is 20 (`PAGE_SIZE`), and out-of-range pages are clamped.
- **Frame:** `ListingPage` is the shared frame (night title band, then the paper workspace). Rows stay entity-specific: `UniversityRow` (profile), `CollegeRow` (compact) and `CourseLedger` with `showCompare` (listing layout: aligned columns from 1280px, with the level under the name).
- **Compare:** `CompareProvider` (context + localStorage + live announcements + type-switch dialog), `CompareToggle` (`aria-pressed`, highlighter when added) and `CompareTray` (docked ≥768px, compact bar plus sheet below).
  - The tray links to `/compare?type=…&items=slug,…`. The compare page is a later milestone.
- **Demo data:** 14 universities, 24 colleges, 31 courses and about 140 offerings, all fictional. Names were checked by web search; one was renamed after a near-match with a real university.

### Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Format check / write | `npm run format:check` / `npm run format` |
| Production build | `npm run build` (runs `tsc -b` first) |
| Preview build | `npm run preview` |

Environment variables are documented in `.env.example` (`VITE_SITE_NAME`, `VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER`).

## 3. Phase 1 Hard Boundaries

Do **NOT** implement any of the following, even partially or "for later":

- Backend · Node/Express API · MySQL or any database
- Authentication · user accounts · admin panel · CRM
- Real lead storage · email delivery
- WhatsApp Business API · SMS
- Payments · document uploads
- AI features (chatbot, recommendations)
- Production analytics
- Production SEO/indexing

Specifically:

- **Enquiry is simulated.** Validate on the client, show a pending state, then a confirmation with a visible "demo — nothing was sent or stored" notice. No network request. No persistence (PRD §13.3).
- **WhatsApp** is only a `https://wa.me/<number>?text=<context>` link. The number comes from a Vite env variable or config and is a placeholder until the client supplies it.

If a request would cross these boundaries, stop and say so instead of implementing it.

## 4. Technology

Stack (PRD §19):

- React 18 · Vite · TypeScript (`strict`) · Tailwind CSS · React Router
- shadcn/ui (Radix) **only where it genuinely helps**: dialog, sheet, combobox/command, select, checkbox, accordion, tabs, tooltip
- ESLint + Prettier

Dependency rules:

- Don't add a library without a concrete requirement that existing tools can't meet.
- Not allowed without a demonstrated need (state it explicitly first): Redux or any global state library, a data-fetching library, a form library, an animation library, a Markdown/MDX parser, a fuzzy-search library, a meta/head library.
- No secrets in the frontend. Configuration goes through `VITE_*` env variables (e.g. the WhatsApp number, and later `VITE_API_BASE_URL`).
- **Installed versions:** Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript 5.9, ESLint 9, `react-router-dom` **6.30**.
  - Router 7.18+ requires React 19, so it can't be used with the approved React 18.
  - React Router 6.x has a moderate open-redirect advisory (GHSA-wrjc-x8rr-h8h6). Mitigation: **never pass user input as a navigation target**. Build search URLs with `searchPath()` in `src/lib/searchPath.ts`.
  - Revisit if the stack moves to React 19.
- **shadcn/ui usage:** Radix Dialog only (`@radix-ui/react-dialog`), wrapped in `src/components/ui/Sheet.tsx`. It was written by hand rather than with the shadcn CLI, to avoid `class-variance-authority` and `tailwind-merge`. `cn()` in `src/lib/cn.ts` is a plain class joiner.
- Icons come from `lucide-react` (stroke 1.75).
- Animation: `motion` 14 (`motion/react`), production dependency (see §7 Motion). Font: `@fontsource/kalam` (annotations only).

## 5. Architecture

Preserve the future backend boundary (PRD §18, §20). Data flows in one direction:

```text
UI components
   → pages / features
      → services (data-access layer, async interface)
         → static implementation (reads src/data/*)
```

Rules:

- **UI, pages and features never import from `src/data/` directly.** Only the static service implementation does.
- `CourseSummary` includes `streamSlug` (for stream line colours). `HomeHighlights.routes` holds the curated illustrative course paths (`data/curation.ts`).
- **Every service function is `async`** (returns a `Promise`) even though Phase 1 data is static. In Phase 2 the implementation is swapped for `fetch` calls to the Node/Express API, and callers don't change.
- Service functions cover listing (with params), get-by-slug, search, filter options and `submitEnquiry(payload)` (shape in PRD §18).
- **Typed domain models and DTOs.** Use summary DTOs for listings and detail DTOs for detail pages. These types are the future API contract, so change them deliberately.
- **No `any` in domain code.** Prefer `unknown` plus narrowing at boundaries.
- Small local hooks wrap service calls and expose `loading / error / data`. Pages must render loading, empty and error states as though the data were remote.
- Route-level code splitting (`React.lazy`), an error boundary per route, and a 404 route.
- Structure (established in Milestone 1):

  | Folder | Contents |
  |---|---|
  | `src/app` | Router, root layout, route error, route focus |
  | `src/pages` | Route components |
  | `src/features/<area>` | Feature UI: home, search, courses, institutions, compare, articles |
  | `src/components/layout` | Shell: header, footer, nav, section primitives |
  | `src/components/ui` | Generic UI: Button, Sheet, Tabs, FactGroup, Monogram, SampleDataLabel, query states |
  | `src/services` | Public async API in `index.ts`; static implementation in `src/services/static` |
  | `src/data` | Fictional data |
  | `src/types` | `domain.ts` and `dto.ts` |
  | `src/lib` | Formatting, labels, `useServiceQuery`, `usePageMeta`, site config |

- **Enforced by ESLint:** importing `src/data` from anywhere except `src/services/static` is an error.
- Read data with `useServiceQuery(key, () => serviceFn())` and render the `loading` / `error` / `success` states.
- Routes are defined in PRD §5. URLs use slugs, never internal IDs. This includes the compare URL: `items=` takes slugs.

## 6. State

Keep global state minimal.

| State | Location |
|---|---|
| Search query, filters, sort, pagination | URL search params |
| Compare page item set and type | URL search params (shareable) |
| Compare tray selection | React context + `localStorage` (convenience only) |
| Enquiry dialog open/context | React context |
| Entity data | Service layer + local hooks; not global state |

URL state must survive refresh and sharing, and Back/Forward must restore it.

Wrap every `localStorage` access in `try/catch`. The app must work when storage is unavailable.

## 7. Design

**The approved design is "Pathways, marked up" (2026-10-11): [docs/DESIGN-DIRECTION.md](docs/DESIGN-DIRECTION.md).** It is Routes (primary identity and information structure) plus Margin Notes (a selective supporting language). Earlier directions (v1, v2 and the v2 proposal) are history in [docs/design-history/](docs/design-history/). **Do not revert to the old minimalist look**, and don't add tactile decoration beyond the rules below.

Workflow (the `global-designer` skill): for substantial new UI, reason about UX structure (`ui-ux-pro-max`) and visual direction (`frontend-design`) within this direction, implement, then run `impeccable` and fix the important findings. For small changes: inspect → design → implement → verify.

### The language in one screen
- **Routes:** streams are coloured lines, courses are stops, next steps are illustrative routes (always captioned as **not admission requirements**), trust is checkpoints, guidance is a journey.
- **Margin Notes:** paper surfaces, a few paper notes, tape and brief blue-pen annotations: the "marking up" layer.
- **Two registers. Decide which one you are in first:**

  | Register | Where | Vocabulary |
  |---|---|---|
  | **Invite** | Homepage; article index; empty states where appropriate | Night hero with route map and taped annotation, wide display type, line index, paper surfaces, course-teaser notes, annotated comparison sheet, checkpoints, guidance route, illustrated covers, purposeful motion |
  | **Evaluate** | Listings; detail pages; comparison page; dense facts | Night title band, then paper/white with entity-specific rows and tables. **No card grids, paper notes, tape or handwriting** |

- **Colour roles:** each role has one job. Never give a section an arbitrary new colour.

  | Role | Token | Notes |
  |---|---|---|
  | Action | `ink` (cobalt #2147E8) | The only action and link colour. On night it inverts to white (`variant="inverse"`) |
  | Brand surface | `ink-900` (night #0B1638) | Header, hero, listing title bands, footer. Muted text on it uses `on-ink-muted` |
  | Semantic highlight | `highlight` (yellow #FFD23F) | Meaningful differences, matches and selections, and focus on dark. Always with text. **Never a button; never on paper colours** (it's invisible there) |
  | Stream lines | `line-saffron`, `line-teal`, `line-rose`, `line-violet`, `line-green` | `streamColor(streamSlug)` in `src/lib/streamLines.ts`. Lines, dots, strips only; never text; always next to the stream name; only for streams |
  | Paper surfaces | `paper-peri` (discovery), `paper-mint` (checking), `paper-coral` (people and reading) | Surfaces only. Text on them is `body`, `muted` or `ink` |
  | Neutrals and status | `ink-50` (mist), `ink-100`, `paper`, `surface`, `body`, `muted`, `rule`, `rule-strong`, `success`, `warning`, `error` (+ `-tint`) | |

  Retired: the v2 trust-green and kraft families, and `board`. Tailwind's default palette is removed, so only tokens exist.
- **Dark surfaces** carry `on-ink`, which switches focus rings to yellow. Section tones: `plain`, `surface`, `tint` (mist), `night`. There is no dark comparison band.
- **Restraint (DESIGN-DIRECTION.md §7.1):**
  - **`.paper-note`** (outline + offset shadow): only the hero annotation, homepage course teasers, the comparison sheet and the featured article cover.
  - **`.tape`:** only the hero annotation, the comparison sheet and the featured cover.
  - **Tilt:** only the hero annotation and the featured cover.
  - Everything else uses plain cards (`cardClass` in `src/components/ui/cardStyles.ts`) or plain paper surfaces.
- **Typography:** Anek Latin for everything functional; wide setting (112.5%) for display and headings.
  - `type-display`: homepage hero only, 40/56/76px.
  - `type-section`: homepage H2s.
  - `type-h1` / `type-h2`: page and section titles.
  - Also: `type-h3`, `type-lead`, `type-small`, `type-meta`, `type-fact`, `type-caption`.
  - **Kalam** (`.hand`, `@fontsource/kalam/latin-400.css`, homepage only): at most two short decorative annotations per page, in cobalt, `aria-hidden` when duplicated in text. Never facts, labels or controls.
- **Comparison:** the annotated comparison sheet (`src/features/compare/ComparisonSheet.tsx`): a real table, yellow highlighter strokes and "Differs" labels on differing values, and one handwritten margin note.
- **Shapes:** radii `control` 6, `layer` 10, `tile` 8, `card` 20; pills for tabs, chips and station labels. Shadows `shadow-raised`, `shadow-overlay`. Containers `max-w-page`, `max-w-measure`.
- **Honesty:** routes are captioned as illustrative; demo data is labelled; no stock photos, people, campuses or fake logos.
- **One search per viewport:** while the hero search is visible, the header's desktop search field is hidden (`src/lib/heroSearchVisibility.ts`).

### Motion
- `motion` (Motion for React) is a production dependency, imported from `motion/react` and loaded with the homepage only.
- **Used for:**
  - route drawing (hero map, line index);
  - the one-time hero annotation placement;
  - comparison highlighting (CSS sweep triggered by `useInView`);
  - the tab pill and panel crossfade.
- Sheets, dialogs and hover use CSS.
- **Every animation needs a reduced-motion path** (`MotionConfig reducedMotion="user"` + `useReducedMotion()`), and everything must work without animation.
- Nothing loops; no scroll-reveal on every section; no motion on Evaluate pages beyond state feedback.

### Never by default
- hero + 3 cards + 3 cards + dark CTA section
- decorative gradients · glassmorphism · blobs
- excessive pills/badges · stats bands · logo walls · testimonials
- decorative UI without a purpose; stream or paper colours outside their roles; tactile treatments outside the restraint rules

**Trust and clarity matter more than aggressive conversion.** No fake urgency, no fake scarcity, no invented social proof.

## 8. Content Integrity

- **Never invent factual claims:** no statistics, testimonials, people, partners, outcomes, rankings or dates presented as real.
- Phase 1 uses **fictional institutions or clearly labelled demo data**. Never present real institutions' fees, approvals, rankings, placements or outcomes as fact unless the client has supplied and verified them.
- Demo-data labelling stays visible: a site-wide notice in the footer, and labels on fact-heavy sections (fees, approvals) (PRD §11, §18).
- Hide sections that have no data. Never pad them with invented content.
- About, Privacy and Terms carry **placeholder copy**, clearly marked, until the client supplies content.
- No ranking-based sorting unless verified ranking data exists (PRD §9).
- Images must be properly licensed placeholders. Never use assets from the reference sites.

## 9. UX Principles

Primary journey: **Discover → Search/Browse → Filter → View Details → Compare → Enquire.** Every page should support it naturally. The user journeys J1–J5 are in PRD §7.

- CTAs are contextual and few: one clear primary action per view (PRD §3). The enquiry opens pre-filled with the current entity's context.
- An enquiry CTA is always reachable on detail pages: a sticky bar on mobile, a sticky panel or header CTA on desktop.
- **Never use** popups on page load, exit-intent modals, timed interruptions, or CTA spam.
- The WhatsApp CTA must not cover content or overlap the compare tray.
- Empty and no-result states always offer a recovery path: clear filters, suggestions, or enquire.
- Feature specs are in the PRD: search §8, filtering §9, listings §10, details §11, comparison §12, enquiry §13, articles §14.

## 10. Responsive Behaviour

Mobile-first. Validate at about **360, 390, 768, 1024, 1280 and 1440+ px** (PRD §15).

- No horizontal page scroll. Wide tables (offerings, comparison) scroll inside their own container, with a visible affordance.
- Touch targets ≥ 44×44px. Filters and enquiry use bottom sheets on mobile.
- Sticky layers (header, CTA bar, compare tray, WhatsApp) must not crowd small viewports. Decide their priority in the UX step.
- Use Tailwind's default breakpoints unless the design step justifies changing them.
- Images are responsive, sized to avoid layout shift, and lazy-loaded below the fold.

## 11. Accessibility

Target **WCAG 2.2 AA** (PRD §16):

- Semantic landmarks, one `h1` per page, logical heading order, skip link
- Full keyboard operation with visible focus
- Accessible combobox (search), and dialogs/sheets with focus trap, Esc and focus return
- Labelled form controls, errors linked via `aria-describedby`, live regions for result counts and form status
- Text contrast ≥ 4.5:1. Never use colour alone to convey state.
- Real `<table>` markup with `th`/`scope` for comparison and offerings
- On route change, move focus to the page heading and update `document.title`

## 12. SEO

Phase 1 is a client-side SPA demo. Lay the foundations (PRD §17), but **keep the demo `noindex`** with both a robots meta tag and `robots.txt`.

- Per-route title, meta description, canonical and Open Graph tags via a small in-house hook or component
- Clean slugs, breadcrumbs, semantic HTML
- No SSR, prerendering, sitemap or structured-data rollout in Phase 1. Those are Phase 2 decisions.

## 13. Data

Structured, typed static data in `src/data/`, **normalised like a database** (PRD §4.1, §18). Core entities:

- Streams · Courses · Specializations · Institutions (universities and colleges) · Offerings · Approvals · Locations · Articles · FAQs

Rules:

- **One source per entity. No duplicated entity data across files.** Relationships use IDs (e.g. an offering references `courseId` and `institutionId`; a college references its affiliated university).
- An **Offering** (a course at an institution) holds the institution-specific facts: fee, mode, duration, specializations. Derive course- and institution-level fee ranges and counts from offerings rather than storing them separately.
- Articles use typed structured content blocks (heading, paragraph, list, quote, image, callout, table), not Markdown (PRD §14).
- Currency is formatted with `Intl.NumberFormat('en-IN')`.
- Volume should make filters, pagination and comparison meaningful (indicative counts in PRD §18; final counts set in the UX step).

## 14. Future Readiness

- **Don't over-engineer Phase 1.** Don't build Phase 2+ architecture (API clients, auth scaffolding, repositories for a database, admin types, retry/caching layers) just because it is planned.
- **Do preserve** the contracts and boundaries that make Phase 2 a swap rather than a rewrite: the async service interface, DTO types, URL-driven state, the `submitEnquiry` payload, and routes.
- The roadmap is in [docs/PHASE-ROADMAP.md](docs/PHASE-ROADMAP.md). Scope for later phases isn't committed until that phase starts.

## 15. Quality Checklist

Before considering a feature complete:

- [ ] Typecheck passes (`tsc`, strict)
- [ ] Lint passes
- [ ] Production build passes
- [ ] No console errors or warnings in the browser
- [ ] Responsive behaviour checked at the widths in §10
- [ ] Important interaction states checked (hover, focus, active, disabled, open/closed)
- [ ] Accessibility basics checked (keyboard, focus, labels, headings, dialogs)
- [ ] Loading, empty and error states present where data is "fetched"
- [ ] URL state verified (refresh, share, Back/Forward)
- [ ] No invented factual claims; demo labelling present
- [ ] Data accessed only through the service layer; no `any` in domain code
- [ ] Temporary and debug code removed

For substantial UI work, run the `impeccable` skill and fix the important findings. The full Phase 1 Definition of Done is in PRD §23.

When reporting work, state clearly what was **verified**, **inferred**, **assumed** and **not verified**.

## 16. Working Conventions

- Git is managed manually by the user. Don't add, commit, branch, push or otherwise run git operations unless asked.
- Keep changes scoped to the request. Mention unrelated issues briefly rather than fixing them silently.
- Open client questions are listed in BRD §13. Use placeholders until they are answered, and never guess the answers into the product as facts.
