# Design Direction

**Product:** Education discovery & lead-generation platform (working name — brand TBD)
**Document status:** v2 (approved 2026-10-08). The v2 visual language is merged into this document.
**History:** the v2 proposal and its reasoning are in [DESIGN-DIRECTION-V2.md](DESIGN-DIRECTION-V2.md). Where v1 and v2 differ, this document already reflects v2.
**Inputs:** [BRD.md](BRD.md) · [PRD.md](PRD.md) · [PHASE-ROADMAP.md](PHASE-ROADMAP.md) · [CLAUDE.md](../CLAUDE.md)
**Process:** Global Designer workflow. The UX structure came from `ui-ux-pro-max`; the visual direction came from `frontend-design` and then went through a human-judgement review (§19). An `impeccable` review follows implementation.

This document sets direction. It is not a pixel spec. Hex values, sizes and fonts are starting values to verify in the browser, especially for contrast and glyph support.

### The two registers (v2)

> **Calm, but not plain. Trustworthy, but not institutional. Product-like, but not SaaS-generic. Memorable, but not decorative.**

| Register | Where | Visual vocabulary |
|---|---|---|
| **Invite** | Homepage; article index; empty states where appropriate | Composition, cards, purposeful illustration, supporting-colour surfaces, the homepage's single dark moment, live product artefacts |
| **Evaluate** | Listings; detail pages; comparison; dense factual modules (key facts, fees, offerings) | Entity-specific rows, tables, restraint, paper and white surfaces. Identity comes from the highlighter, monograms and sample labels |

Each page and module knows which register it is in. The IA, listings, search, filters, URL state, pagination, compare state and data contracts are the same in both. The registers differ only in presentation.

---

## 1. Design Principles

1. **Facts before persuasion.** The things a family uses to decide (fees, mode, duration, approvals, eligibility) are always the most visible content on any module. Promotional language never outranks a fact.
2. **Right treatment for the content (v2).** Choose the form per section: illustration, diagram, card, list, table, split, asymmetric, coloured or dark surface. The test is whether it makes the content faster to understand or more inviting to explore. In the **Evaluate** register, facts that users compare sit in aligned rows and tables. In the **Invite** register, cards and compositions are welcome.
3. **One clear next step.** Each view has one primary action. Secondary actions look secondary. Utility actions (compare, share) look like tools, not CTAs.
4. **Guidance, not pressure.** Enquiry is offered as help where a question naturally comes up. Nothing interrupts, counts down or invents scarcity.
5. **Honest visuals (v2).** Every visual either shows real (demo-labelled) product data or explains a concept. Demo data is labelled, missing data is hidden rather than padded, and approvals are stated plainly, not decorated as badges.
6. **One bold move per section (v2).** Each section gets a single focal point: an illustration, a dark surface, a large number or a product artefact. Never several at once. Across the site, the highlighter (§3) remains the signature device and keeps its strict meaning.
7. **Mobile is the primary context.** Every pattern is designed for 360px first, then given more room.
8. **Show the product, not promises (v2).** The strongest visuals are real interface artefacts built from data (a course card, a comparison sheet with highlighted differences). No abstract dashboards, no claimed outcomes.
9. **Stationery, not ornament (v2).** The visual world comes from the student's desk: blue ink, highlighter, ruled sheets, index cards and brown-paper notebook covers. Motifs are used where they mean something.

## 2. Product Personality

**A well-organised senior who has been through admissions: calm, specific, plainspoken, on your side.**

| Is | Is not |
|---|---|
| Specific ("₹1.2–1.8 lakh per year, 2 years, online") | Vague or salesy ("Top-ranked world-class programmes!") |
| Calm and orderly | Busy, urgent, flashing |
| Plain English, sentence case | Jargon, ALL CAPS, exclamation marks |
| Trustworthy because it shows its working | Trustworthy because it claims to be |
| Contemporary and product-like | Government portal, coaching-institute flyer, SaaS dashboard |

**Voice rules:** active verbs on buttons, and the same action keeps the same name through a flow ("Send enquiry" leads to "Enquiry sent"). Errors explain cause and fix. Empty states give a next step. No hype adjectives.

## 3. Visual Identity

The identity draws on two objects every Indian student knows: **the blue-ink pen** and **the highlighter**.

- **Blue ink** is the primary colour. It is the colour of exam answer sheets and filled-in admission forms: serious, personal, familiar. It reads as "education" without the institutional coldness of a navy corporate blue or a government portal.
- **The highlighter** is the single accent and the identity's one bold device. Students highlight the facts that matter, and the product does the same:
  - matched text in search suggestions
  - differences in the comparison table
  - the key-facts summary on detail pages (used sparingly, for one fact at most)
  - the selected state of "Add to compare"
  - the focus ring on dark surfaces

  It is **never** used as decoration, button fill, section background or a gradient.
- **Paper** is the ground: a cool, very light paper white, not cream. Content sits on it as ruled rows, the way a well-made prospectus or fee schedule lists facts.
- **Typography from an Indian type foundry** (§5) has a width axis, which handles very long Indian institution names gracefully, and has sibling Indic scripts for future localisation.
- **No stock campus photos for fictional institutions**: showing a real campus for a fictional institution would mislead. Institutions are represented by an **ink monogram tile** (initials).

### 3.1 Imagery and illustration (v2)

**Rules:**
- No stock campus images for fictional institutions.
- No people or faces, no testimonials, no stock "smiling student" or "counsellor" photos.
- No copyrighted, scraped or reference-site assets.
- Never use imagery merely to fill whitespace.
- **Phase 1 article covers are illustration-first** (kraft covers, §14). No stock photography. Licensed photography can be reconsidered once a real editorial strategy exists.

**In-house illustration style: "Ink on paper"**
- **Line:** `ink` or `ink-900` strokes at 2px (or Lucide icons at 1.75px), round caps.
- **Fills:** flat, from `ink-50`, `green-50` or `kraft-100`, with at most one supporting family per illustration.
- **Highlighter as a mark only:** it may mark *the* point of an illustration (the difference, the selected option), never decorate it.
- **Subjects:**

  | Subject | Used for |
  |---|---|
  | Index cards | Courses |
  | Ruled sheet with highlighted rows | Comparison |
  | Notebooks, a screen and printed modules | Study modes |
  | A drawn route | The guidance journey |
  | Brown-paper covers with a ruled label | Articles |
  | Simple line glyphs | Streams and recognition bodies |

- **Never:** people, mascots, isometric 3D, blobs, gradients, floating abstract shapes, fake logos or campuses, or icon-in-coloured-circle feature cards.
- **Format:** inline SVG or Lucide components. Decorative ones are `aria-hidden`. Diagrams carry their meaning in real text.

**Product artefacts** (preferred over illustration): real UI fragments rendered from demo data through the service layer, labelled "Sample data". When they duplicate a feature shown elsewhere on the page, they are `aria-hidden` and contain no focusable elements.

## 4. Colour System

Starting values. Verify every pairing marked † with a contrast checker during implementation.

| Token | Value | Purpose | Rules |
|---|---|---|---|
| `ink` (primary) | `#2140A0` | Primary buttons, links, active nav, key headings accents, monogram tiles | White text on it (~9:1 †). Hover/pressed `ink-700 #18307D` |
| `ink-50` (secondary surface) | `#ECEFF9` | Selected rows, active filter options, the demo-data strip, subtle bands (used at most once per page) | Not a button colour |
| `ink-100` | `#D9DFF3` | Table header rows, hover on rows | |
| `highlight` (accent) | `#FFE36E` | The highlighter (see §3 for its uses) | Always paired with ink text. **Never the only signal**: it always comes with text or an icon, because it has low contrast against white |
| `paper` (background) | `#F6F7FB` | Page background | |
| `surface` | `#FFFFFF` | Raised content: listing area, panels, dialogs, sheets, tables | |
| `text` | `#172036` | Body and headings: a blue-black ink, consistent with the pen idea | ~15:1 on white † |
| `text-muted` | `#4A5468` | Metadata, helper text, labels | ~7:1 on white and paper † |
| `border` | `#DDE1EA` | Hairline rules between rows and sections (decorative) | Never the only boundary of an input |
| `border-strong` | `#7D8699` | Input and checkbox borders (non-text UI ≥ 3:1) | ~3.6:1 on white † |
| `success` | `#1C7A4A` (tint `#E6F4EC`) | Form success, confirmation | With an icon and text |
| `warning` | `#8A5300` (tint `#FFF3D6`) | Demo notices in context, cautions | Text, not fill, carries the meaning |
| `error` | `#B42318` (tint `#FDECEA`) | Validation errors | With an icon and message |
| `focus` | `#2140A0` 2px outline, 2px offset; `highlight` on dark/ink surfaces | Keyboard focus | Must stay visible against every surface (≥ 3:1) |
| `whatsapp` | WhatsApp brand green, icon only | WhatsApp icon glyph | Follow WhatsApp brand guidance. Never use it as a page accent |

Rules:

- **No gradients.** Depth comes from surface steps and the two shadows. The footer is `surface` or `paper` with a top rule and is never dark.
- Colour never carries meaning alone: approvals, differences, errors and selection all have text or icon equivalents.
- The palette is light-mode only for Phase 1. Dark mode is out of scope; the tokens are named semantically so it can be added later.

### 4.1 Supporting colour families (v2)

These are for **surfaces, illustration fills and strokes, and visual grouping only**. They are never action colours (the primary action is always `ink`) and never carry meaning on their own.

| Family | Tokens | Used for | Never used for |
|---|---|---|---|
| **Deep ink** | `ink-900` #14265E; on it: `white`, `ink-100` #D9DFF3, `on-ink-muted` #B9C3E6 | The homepage comparison band (the single dark moment); illustration strokes | A universal page component; CTA fill (it separates from `ink` at only 1.57:1); large text blocks |
| **Trust green** | `green-700` #1E6656, `green-50` #E4F1EC | Trust, recognition and verification-related **explanatory** content: the approvals explainer, "check before you apply" notes, recognition-body glyphs | Meaning *verified by this platform*, *approved by the platform*, factual confirmation of demo data, or success. Form success always uses `success` (green is only 1.27:1 from it, so they must never share a role) |
| **Kraft** | `kraft-700` #7A5230, `kraft-100` #EEE2CC, `kraft-50` #F6EFE3 | Editorial content: article covers, the articles band, guide callouts | Page background (it would read as the generic cream look); buttons; facts |

**Computed contrast (re-verify in the browser):**

| Pair | Ratio |
|---|---|
| White on `ink-900` | 14.3 |
| `ink-100` on `ink-900` | 10.8 |
| `on-ink-muted` on `ink-900` | 8.2 |
| Highlight on `ink-900` | 11.2 |
| `green-700` on white | 6.8 |
| `green-700` on `green-50` | 5.9 |
| Body on `green-50` | 14.0 |
| Muted on `green-50` | 6.6 |
| `kraft-700` on `kraft-50` | 6.0 |
| Body on `kraft-100` | 12.6 |
| Muted on `kraft-100` | 5.9 |
| `ink` on `kraft-100` | 7.1 |

**Rules:**
- One supporting family per section at most.
- Supporting colours may colour headings (`green-700`, `kraft-700`) but not body copy.
- On `ink-900`, the primary button inverts to a white fill with ink text.
- The highlighter keeps its meaning on every surface, and on dark surfaces it is also the focus ring.

### 4.2 Surface strategy (v2)

| Surface | Token | Role |
|---|---|---|
| Paper | `paper` | Default page and rest sections |
| Surface | `surface` | Cards, sheets, panels, index band |
| Ink tint | `ink-50` | Brand moments: hero artefact panel, study modes, listing header band |
| Trust green tint | `green-50` | Trust and recognition explanatory content |
| Kraft tint | `kraft-50` / `kraft-100` | Editorial content |
| Deep ink | `ink-900` | The homepage comparison only (§8.5) |

- At most four surface treatments per page, not counting paper.
- Every coloured surface has a content reason that matches its family.
- Section edges are crisp colour changes: no fades, no wave or angled dividers.
- **Dark sections:** approved for the homepage comparison only. Not a universal component. Detail pages do not automatically get one; dark treatments are re-evaluated per content when detail pages are designed.

## 5. Typography

**Family: Anek Latin** (Ek Type, Mumbai; variable weight and **width**; Google Fonts). One family, used with two widths.

| Why this family | |
|---|---|
| Long names | Indian institution names are often long. A semi-condensed width lets headings and list-row titles wrap less, without shrinking the size |
| Local and future-ready | Indian foundry, with sibling Anek Devanagari, Tamil, Bangla and others for possible regional-language phases |
| Not a default | It avoids the Inter, Roboto and IBM Plex look shared by most generated and SaaS sites |

**Verify before committing (implementation step 1):** the ₹ (U+20B9) glyph renders, tabular figures (`tnum`) exist for fee columns, and text renders well at 14–16px. **Fallback if any check fails:** Mukta (Ek Type) for body with Anek Latin for headings, or Noto Sans throughout. The decision is recorded in CLAUDE.md.

| Role | Mobile | Desktop | Line height | Weight / width | Notes |
|---|---|---|---|---|---|
| H1 (page title) | 30px | 40px | 1.15 | 600, semi-condensed | One per page. Institution names may wrap to 3 lines on mobile; that is acceptable |
| H2 (section) | 23px | 28px | 1.25 | 600, semi-condensed | |
| H3 (subsection / row title) | 18px | 20px | 1.3 | 600, normal width | Listing row titles use H3 |
| Body | 16px | 17px | 1.6 | 400 | Never smaller than 16px on mobile (also avoids iOS input zoom) |
| Article body | 18px | 19px | 1.7 | 400 | Measure 62–70 characters |
| Small | 14px | 14px | 1.5 | 400 | Helper text, secondary row text |
| Metadata / fact label | 14px | 14px | 1.4 | 500, `text-muted` | Sentence case. **No all-caps eyebrow labels** |
| Fact value | 17px | 18px | 1.3 | 600, tabular figures | Fees, duration, counts |
| Button | 16px | 16px | 1 | 600 | Sentence case |
| Caption (rare) | 13px | 13px | 1.4 | 400 | Table footnotes only. Nothing smaller |

**Homepage hero display style (approved after Milestone 1 review)**

| Name | Mobile | Tablet (≥768) | Desktop (≥1024) | Line height | Weight / width | Colour | Usage |
|---|---|---|---|---|---|---|---|
| `type-display` | 36px | 46px | 56px | ≈1.15 | 600, semi-condensed | `ink` | **Homepage hero H1 only**, unless explicitly extended later. All other pages use H1 |

The hero needs a clear focal point above the section H2s. Setting the question in blue ink carries the identity into the first viewport without decoration.

**Invite-register additions (v2)**

| Name | Mobile / Tablet / Desktop | Line height | Weight / width | Usage |
|---|---|---|---|---|
| `type-section` | 28 / 34 / 40px | 1.1 | 600, semi-condensed | Homepage (Invite) section headings, as H2. Listings and detail pages keep H2 |
| `type-lead` | 18 / 18 / 20px | 1.5 | 400; `muted` on light, `ink-100` on dark | One lead paragraph under a section heading |
| `type-numeral` | 56 / 64 / 72px | 1 | 600, width 75%, tabular | Step numbers in a real sequence (the guidance journey) |

Weight usage: 400 for reading, 500 for labels, 600 for headings, fact values and buttons. 700 is not used. Size and spacing carry the hierarchy, not extra weight.

Typographic rules:

- Left-aligned everywhere. Nothing is centred except single-line empty-state headings.
- No accented single words in headlines (no one italic or coloured word).
- Meta information is shown as **labelled facts** ("Duration 2 years"), not strings joined by middle dots.
- No trailing arrows appended to link or button text.
- Rupee amounts use Indian grouping via `Intl.NumberFormat('en-IN')` and plain-language units ("₹1.2 lakh", or "₹1,20,000" in tables). Choose one convention per context and keep it consistent.

## 6. Spacing & Layout System

- **Base unit 4px.** Scale: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96.
- **Container:** max 1240px content width. Side gutters: 16px (<640), 24px (640–1023), 32px (≥1024).
- **Reading measure:** 680px max (about 68ch) for prose: overviews, articles, About.
- **Grid:** 12 columns at desktop. Listing pages use filter rail 280px + results (fluid). Detail pages use main column (≈ 760px) + side rail (≈ 320px) at ≥1024px.
- **Section spacing:** 48px mobile, 64px tablet, 80–96px desktop between major homepage sections; 40–48px between detail-page sections.
- **List rows:** 16px vertical padding mobile, 20px desktop. Rows are separated by a hairline `border` rule, not by gaps between boxes.
- **Fact groups:** 16px column gap, 12px row gap. Label sits 4px above value.
- **Forms:** label → input 6px; field → field 20px; groups separated by 32px. Input height 48px. Single column, including on desktop.
- **Touch:** interactive targets ≥ 44×44px, with ≥ 8px between adjacent targets.

## 7. Surface & Component Principles

| Element | Treatment | Reason |
|---|---|---|
| **Radius** | Three tiers: 6px for controls (buttons, inputs, chips); 10px for floating layers (dialogs, sheets, popovers, typeahead); 8px for monogram tiles. List rows and tables have **no radius** | Radius signals what kind of element it is (control, layer or content) instead of being one value on everything |
| **Borders** | Hairline rules separate rows and sections. Panels use a border **or** elevation, never both | Rules organise information. Boxes around everything fragment it |
| **Shadows** | Two levels only: `raised` for sticky bars and typeahead; `overlay` for dialogs and sheets. Static content has no shadow | Shadow means "this floats above the page", nothing else |
| **Cards** | Invite register (v2): homepage discovery modules, teasers, featured institutions, article cards, guidance modules. `surface`, 1px `rule`, radius `layer`, padding 20/24px, no resting shadow, ink border on hover or focus-within. One link per card, with the whole card clickable through an expanded link target | Cards invite; rows let people evaluate (§7.1) |
| **List rows** | The main listing pattern. Title, identity line, aligned fact columns, actions on the right (desktop) or bottom (mobile) | Facts can be scanned vertically across results |
| **Tables** | Horizontal rules only, `ink-100` header row, sticky header where long, tabular figures, a caption | Fees and offerings are tabular data |
| **Filters** | Fieldsets with checkbox lists (5 visible + "Show all N"); fee as preset bands (radio); location as a searchable select | Presets match how families think about budget, and are accessible. Range sliders are imprecise and hard for keyboard users |
| **Chips** | Used only for *applied filters* (removable) and search suggestions. Never as decoration on content | Keeps "pill" usage tied to a function |
| **Approvals** | Plain text in the facts list ("Approvals: UGC, AICTE, NAAC A") with a small info control explaining each. No coloured badges | Approvals are facts to read, not medals. Badges would overstate demo data |
| **Buttons** | Primary: ink fill, white text. Secondary: ink 1.5px outline. Tertiary: ink text link with underline on hover/focus. Toggle (compare): outline that becomes highlighter-filled with a check icon and "Added" when on | Three clear levels, plus a toggle that looks distinct from a CTA |
| **Dialogs** | `surface`, 10px radius, `overlay` shadow, 520px max width, scrim `#172036` at 50% | |
| **Bottom sheets (mobile)** | Full width, 10px top radius, drag handle *plus* a visible close button, max height 90dvh, sticky action footer | Dragging is never the only way to dismiss |
| **Sticky elements** | `surface` with a hairline rule, plus `raised` shadow only while stuck. Account for safe-area insets | |
| **Monogram tile** | 48/56/72px squares, `ink-50` fill, ink initials in Anek semi-condensed 600 | Gives each institution a recognisable mark without a fake logo or photo |
| **Icons** | Lucide (ships with shadcn/ui), 1.75 stroke, 20px default. Decorative icons beside text are hidden from screen readers. No emoji | One consistent set |

**z-index layers:** content 0 · sticky header/section nav 20 · bottom action bar / compare tray 30 · typeahead popover 40 · sheet/dialog 50 · toast 60.

### 7.1 Card vs row strategy (v2)

| Use cards for (Invite) | Use rows or tables for (Evaluate) |
|---|---|
| Homepage discovery modules (stream tiles, mode panels) | Listings (universities, colleges, courses) |
| Course teasers on the homepage | Comparison (desktop table / mobile list) |
| Featured institutions on the homepage | Dense factual data (key facts, fees) |
| Article teasers and the featured article | Offerings ("where to study") |
| Guidance modules and the CTA panel | Search results, filters, chips, pagination |
| Empty-state suggestions (≤3); related items on detail pages (≤4) | Anything users scan *down* to compare |

- If users will compare more than four items on the same attributes, use rows.
- Facts inside cards use the same labelled-fact pattern as rows.
- No badges ("Top", "Best", "Popular").

## 8. Homepage Composition (v2)

The homepage answers the family's questions in order: where do I start, what should I study, what options exist, where can I study it, can I compare, can I trust this, can someone help, where can I learn more. It is the main **Invite** page.

```text
1 Hero ........... paper + ink-50 artefact panel ... split: search left, live product artefact right
2 Streams ........ surface band .................... index tiles with line glyphs
3 Study modes .... ink-50 band ..................... three illustrated panels, rows aligned across
4 Courses ........ paper ........................... teaser cards (tabs: courses, universities, colleges)
5 Comparison ..... ink-900 (the dark moment) ....... copy left, white comparison sheet right
6 Trust .......... green-50 ........................ recognition diagram + "how to check" steps
7 Guidance ....... paper ........................... drawn route with three stations + CTA panel
8 Articles ....... kraft-50 ........................ illustrated kraft covers, asymmetric
  Footer ......... paper + top rule ................ unchanged
```

| # | Section | Question | Treatment | Primary action |
|---|---|---|---|---|
| 1 | **Hero** | Where do I start? | **Left:** `type-display` H1 as the search label, a `type-lead` sentence, the hero search, popular searches. **Right (≥1024px):** a live artefact on an `ink-50` panel. A course teaser card and a compact comparison sheet built from service data overlap slightly like papers on a desk. The highlighter sweeps once across the differing rows. It is labelled "Sample data", is `aria-hidden` and contains nothing focusable. A visible link "See how comparison works" jumps to §5. On mobile, the compact sheet follows the popular searches | Search |
| 2 | **Streams** | What should I study? | Index tiles: 2 / 3 / 5 columns, each with a line glyph (Lucide), name and course count. Border `rule`; hover turns the border ink. Not icon-in-circle cards | Pick a stream |
| 3 | **Study modes** | What options are available? | Three panels (regular, online, distance), each headed by a small ink-on-paper illustration. The **same labelled rows in the same order** are aligned across panels (CSS subgrid) so they can be compared. "Check before you apply" sits in a `green-50` strip at each panel's foot | See courses in a mode |
| 4 | **Courses** | Where can I study it? | Teaser cards: level and duration, short name (H3), full name, then modes, total fee range and number of institutions. The Universities and Colleges tabs use featured institution cards. **Listings keep rows** | View course |
| 5 | **Comparison** | Can I compare them? | Full-bleed `ink-900`. Heading and lead on the left; on the right a **white comparison sheet** (the real ComparisonTable, highlighter differences) with `shadow-overlay`. Inverted primary button "Start your own comparison" | Start a comparison |
| 6 | **Trust** | Can I trust the information? | `green-50`. A recognition diagram: three bodies, each with what it checks (the university, the technical programme, institutional quality) and where to check it. A numbered "how to check" sequence. A side note that this demo verifies nothing and its data is fictional. All meaning is in real text | Read the approvals guide |
| 7 | **Guidance** | Can someone help me? | A drawn ink route connecting three stations (`type-numeral` numbers, a small glyph, a title, one sentence), then a CTA panel with **Get guidance** (primary), **Chat on WhatsApp** (tertiary) and the demo note | Get guidance |
| 8 | **Articles** | Where can I learn more? | `kraft-50` band. A featured article card with a large illustrated kraft cover (left, wide) and three article cards with small covers (right) | Read |

### 8.1 Section rhythm (preference, not a rule)
- **Prefer** variation in surface and composition between neighbouring sections when it improves hierarchy, understanding or pace. Do **not** add artificial variation just to make neighbours different.
- One dark band on the homepage, mid-page, never next to the footer.
- Section padding follows weight: compact modules about 48–64px; feature moments (comparison, guidance) up to 96–112px on desktop.
- Section openings may vary: heading only, heading and lead, or visual first.
- Evaluate pages (listings, detail, compare) use a calmer rhythm: a header area, then paper.

The "Get guidance" header CTA is available on every page, so the homepage keeps exactly one in-page conversion section (§7 Guidance).

**Homepage interaction rule: one search per screen.** On desktop (≥1024), the header's search field is hidden while the hero search is in view. It reappears once the hero search scrolls out of view, and it is always visible on other pages. Hidden means visibility hidden, so it also leaves the tab order and accessibility tree. Below 1024 the header shows only a search icon, so the rule does not apply.

## 9. Discovery / Listing Patterns

**Shared page frame:** H1 with the result count ("42 universities"), the keyword field (`?q=`), sort select, applied-filter chips, results, and pagination. Filter rail on the left at ≥1024px; a "Filters (3)" button that opens a sheet below that.

**Decision: numbered pagination, 20 per page** (not "Load more"). It keeps the URL as the single state (`?page=3`), makes Back/Forward and sharing exact, and keeps the footer reachable.

Each entity has its own row design, because each answers a different question:

### Universities: *profile row* (expanded)
```text
[MN]  Meridian National University                         [Compare ☐]
      Pune, Maharashtra   Private university
      Modes  Regular, Online    Courses  38    Fees  ₹80k – ₹4.2L / yr
      Approvals  UGC, AICTE, NAAC A
      Popular here: MBA, B.Tech CSE, BBA                    View university
```
The richest row. People evaluate a university as a whole: its identity, recognition and breadth.

### Colleges: *compact row*
```text
[SC]  St. Clement's College of Commerce                    [Compare ☐]
      Kochi, Kerala   Private   Affiliated to Meridian National University
      Streams  Commerce, Management     Fees  ₹45k – ₹1.1L / yr     View college
```
Denser. The defining facts are affiliation and stream. Colleges usually come in larger numbers and need scanning, not browsing.

### Courses: *ledger row* (aligned columns)
```text
Desktop:
Course                       Level  Duration  Modes              Fees (range)       Offered at
MBA — Master of Business…    PG     2 years   Regular, Online    ₹1.2L – ₹9L total  14 institutions   [Compare ☐]
Mobile:
MBA — Master of Business Administration
PG   2 years   Regular, Online
Fees ₹1.2L – ₹9L total   Offered at 14          [Compare]
```
A course is an abstract programme, so its row reads like a catalogue line. Aligned columns on desktop let users scan duration and fees down the page.

### When to use each pattern

| Pattern | Use for |
|---|---|
| Profile row | University listing |
| Compact row | College listing, search results, related institutions on detail pages |
| Ledger row | Course listing, homepage popular courses |
| Table | Offerings ("where to study") on desktop, fees, comparison, homepage mode explainer |
| Card | Invite register only: homepage teasers, featured institutions, articles, related items (≤4). See §7.1. Never in listings |
| Inline metadata | Identity line under titles (location, type); always labelled where meaning is ambiguous |
| Filter panel | Listings only. Not on search results, which use type tabs instead |

**States:**
- Loading: row-shaped skeletons that match the final layout (no layout shift).
- Empty: "No universities match these filters" plus the filters that most narrow results (each removable in one tap), "Clear all filters", and "Tell us what you need" (enquiry).
- Error: plain message with a "Try again" button.

## 10. Detail-Page Patterns

Hierarchy: **Key information → Supporting → Evaluation → Related → Enquiry**, applied to one shared frame:

```text
Desktop ≥1024
┌ breadcrumbs ───────────────────────────────────────────────┐
│ [MN] Meridian National University (H1)                     │
│      Pune, Maharashtra   Private university   [Compare ☐] │
├──────────────────────────────────────────┬─────────────────┤
│ KEY FACTS (ruled grid, 4–6 facts)        │ Questions about  │
│ Modes | Courses | Fees | Approvals | Est.│ this university? │
├──────────────────────────────────────────┤ [Get guidance]   │
│ Overview · Courses & fees · Admission ·  │ Chat on WhatsApp │
│ Approvals · FAQs   ← sticky section nav  │ (sticky panel)   │
│ ... sections ...                         │                  │
│ Related                                  │                  │
└──────────────────────────────────────────┴─────────────────┘
Mobile
 breadcrumbs (collapsed to "‹ Universities")
 [MN] H1
 identity line
 key facts (2-column grid)
 sticky section nav (horizontal scroll, under header)
 sections…
 ┌ bottom action bar: [Get guidance (primary)] [WhatsApp] ┐
```

| Element | Decision | Rationale |
|---|---|---|
| **Header** | Monogram, H1, identity line (location, type), compare toggle. No hero image | The name and identity are what users came to confirm. Images of fictional campuses would mislead |
| **Key facts** | A ruled definition-list grid directly under the header: 4–6 facts with label above value, tabular figures. A "Sample data" marker sits beside the group heading (§17) | Answers the main questions (cost, duration, mode, recognition) without scrolling, which matters most for parents (J5) |
| **Section nav** | Sticky horizontal anchor bar with scroll-spy (current section underlined). Hidden sections don't appear | Long pages stay navigable. Users jump straight to "Fees" or "Admission" |
| **Section content** | Short by default. Long prose collapses after about 6 lines behind "Read more" (a button, `aria-expanded`). Fees and offerings are tables | Keeps pages decision-length rather than SEO-length |
| **Courses & fees / Where to study** | Table on desktop, stacked rows on mobile. Filter by level or stream within the section. Each row has Compare and "Ask about this" (opens enquiry pre-filled with the offering) | The most decision-critical content. The action belongs on the row it relates to |
| **Sticky CTA** | Desktop: a side-rail panel ("Questions about {name}?") with **Get guidance** (primary) and **Chat on WhatsApp** (tertiary link). Mobile: a bottom action bar with the same two actions | Always reachable, never covering content |
| **Compare** | A toggle in the header and on each offering row. Styled as a utility, not a CTA | Resolves the PRD §3 vs §11.1 tension: primary = Get guidance, secondary = WhatsApp, Compare = utility toggle |
| **FAQs** | Accordion (one open at a time is *not* enforced), questions as buttons | Scannable, accessible |
| **Related** | Compact rows or ≤4 compact cards: affiliated colleges, similar institutions, related courses and articles | Keeps the journey moving (J1/J2) without dead ends |
| **Enquiry** | No enquiry form at the page bottom (avoids repetition); the rail/bar CTA is always reachable. A single sentence before Related: "Still deciding? A counsellor can help you compare." with a text link | One CTA presence, not three |

**Entity emphasis:**
- **University:** breadth (courses, streams), approvals, affiliated colleges.
- **College:** affiliation (linked prominently in the identity line), streams, courses.
- **Course:** what it is and who it suits, specializations, eligibility, and **Where to study** (the offerings table), which is promoted to directly after Overview.

## 11. Comparison UX

### Selection and compare tray
- The toggle is **"Compare"** (outline). When added it becomes **"Added"** with a check and highlighter fill, with `aria-pressed`. A live region announces "Meridian National University added to comparison, 2 of 3".
- **Tray (desktop):** docked to the bottom, full container width, `raised` shadow, collapsible to a single line. It shows 3 slots: filled slots have the name and a remove button; empty slots read "Add another university". Its button reads "Compare 2 universities" and is disabled with an explanation ("Add at least 2 to compare") when only 1 is selected.
- **Tray (mobile):** merges into the bottom action bar as one segment, "Compare (2)", which opens a sheet with the slots and the compare button. There are never two stacked bottom bars.
- **Fourth item:** the toggle is disabled with the explanation "You can compare up to 3", plus a "Manage" link to the tray.
- **Different type:** a confirm dialog: "Your comparison has universities. Start a new comparison with courses?" with the options "Start new" or "Keep current".

### Compare page
- H1: "Comparing 3 universities". Each item's header shows the monogram, name, a remove/replace control, and **Get guidance** (secondary style, so three items don't create three primary buttons).
- **Desktop:** a real `<table>`. The first column (attribute labels) is sticky, the item header row is sticky, and rows are grouped by category (Basics, Fees, Recognition, Courses).
- **"Highlight differences"** toggle (on by default): rows whose values differ get a highlighter fill on the values **and** a "Differs" text marker in the label cell. Animation: a short left-to-right highlighter sweep (≈200ms), instant under reduced motion.
- **"Show only differences"** toggle: hides identical rows.
- Missing values show "Not available", never blank and never invented.
- **Mobile (360–767):** two items side by side. Each attribute label is a full-width row above its pair of values, so labels aren't squeezed into a third column. With 3 items, a segmented control above the table chooses which pair is shown ("A vs B", "A vs C", "B vs C"). No horizontal swipe is required; that avoids gesture conflicts and stays accessible.
- **Empty or invalid URL:** "Nothing to compare yet", with links to the listings.

## 12. Search & Filter UX

### Search entry points
| Breakpoint | Header search | Homepage |
|---|---|---|
| ≥1024 | Visible field (≈ 320px) in the header; the typeahead popover opens beneath it | Large hero field |
| <1024 | Search icon button → **full-screen overlay**: input with autofocus, close button, then popular searches when empty | Hero field. Tapping it opens the same overlay on mobile so suggestions have room |

### Typeahead
- Debounced at about 150ms after 2 characters. Grouped as Courses, Universities, Colleges, Articles, up to 5 each, each with a type label and one identifying fact (e.g. "PG, 2 years").
- The matched substring is wrapped in `<mark>` with the highlighter style, so the device tells the user *why* something matched.
- The last option is always "See all results for 'mba'".
- ARIA combobox pattern: arrow keys move through options, Enter opens one, Esc closes, and a live region announces "12 suggestions".
- Recent searches (overlay, empty state) are kept in `localStorage` with a "Clear" control. This is a convenience only.

### Results page `/search?q=`
- H1: "Results for 'mba'". Type tabs with counts (All 23, Courses 6, Universities 9…) implemented as links that update the URL.
- The "All" tab shows the top 3–5 per group with "See all 9 universities", which links to `/universities?q=mba`.
- **No results:** "No results for 'mbaa'" + spelling-tolerant suggestion if one exists + popular streams + "Tell us what you're looking for" (opens enquiry pre-filled with the query).

### Listing filters
- **Desktop:** a left rail. Changes apply instantly. The result count updates in the H1 and is announced politely.
- **Mobile/tablet:** a "Filters (n)" button (sticky under the header with the sort control) opens a **bottom sheet**. It has facet sections, "Clear all", and a sticky footer button **"Show 24 results"** that updates live. Changes apply when the user presses it.
- **Dismissing the sheet** (the visible close button, Esc or tapping outside): with no unapplied changes, it closes immediately. With unapplied changes, a confirmation dialog asks **"Discard filter changes?"** with **Keep editing** and **Discard**.
  - Keep editing (or Esc in the confirmation) returns to the sheet with focus where it was.
  - Discard closes the sheet without applying anything, and focus returns to the Filters button.
- **Applied chips:** shown above the results ("Online ×", "Maharashtra ×") with "Clear all". Chips wrap onto new lines and are never clipped.
- **Option counts** are shown next to every facet option ("Online (12)"). Options that would return zero results are disabled, with the count shown as (0).
- Facets are defined in PRD §9. Fee bands are presets: Under ₹1 lakh, ₹1–3 lakh, ₹3–5 lakh, Over ₹5 lakh (per year or total, stated in the facet label).
- **Fee bands are single-select radio options** with an "Any" option, so they are an exception to the OR-within-a-facet rule. Every other facet is multi-select, using checkboxes and OR within the facet.

## 13. Enquiry UX

| Context | Container |
|---|---|
| Desktop / tablet | Centred dialog, 520px |
| Mobile | Bottom sheet, up to 90dvh, sticky submit footer |
| `/contact` | Full page: the form in the main column, with WhatsApp, phone and email (placeholders) in the side rail / below |

**Structure:**
1. Title: **"Get guidance"**, followed by one line: "A counsellor will call you to talk through your options. It's free." (The "free" claim needs client confirmation; remove it if unconfirmed.)
2. **Context line** (pre-filled): "About: MBA at Meridian National University", with a **Change** control that turns it into an editable "Interested in" field. Leave it blank if there is no context.
3. Fields as defined in PRD §13.2: visible labels, "Optional" marked on optional fields (rather than asterisks on required ones, since most fields are required), `autocomplete` attributes, `inputmode="numeric"` and a fixed "+91" prefix for mobile.
4. Consent checkbox, unchecked by default, with a link to Privacy.
5. **Send enquiry** (primary, full width on mobile). A WhatsApp text link below: "Prefer WhatsApp? Chat with us".

**Validation:**
- Validate on blur and on submit. Inline errors sit below the field with an icon and cause-plus-fix text ("Enter a 10-digit mobile number, without +91").
- On a failed submit with 2 or more errors, a focusable error summary at the top links to each field. With 1 error, focus moves to that field.
- Values entered are kept when the dialog is closed and reopened in the same session (in memory only).

**Pending → confirmation:**
- The button shows a spinner and "Sending…" and is disabled for about 800ms (simulated).
- Confirmation replaces the form in the same container: success icon, **"Enquiry sent"**, and "In the live service, a counsellor would contact you on +91 98xxx xxx12 within one working day." (The timeline needs client confirmation.)
- A **demo notice** in a warning-tinted panel: "This is a demo. Nothing was sent or stored."
- Actions: "Back to browsing" (closes) and "Chat on WhatsApp".

**Never:** a popup on page load, exit-intent, timers or countdowns, "Only 3 seats left", pre-ticked consent, or repeated full forms on the same page.

## 14. Article UX

**Covers (v2):** Phase 1 covers are **illustration-first kraft covers**: a `kraft-100` field, a ruled label carrying the category, and a category line illustration in ink. No stock photography. The article index and the homepage articles band are **Invite**; the article body is a reading surface.

- **Listing `/articles`:** H1 "Guides and articles". Category filter as a row of links with `aria-current` (horizontally scrollable on mobile, with a fade edge as the scroll hint).
  - **Featured article:** a horizontal composition (16:9 licensed image left, title, excerpt and metadata right); stacked on mobile.
  - **List:** text rows with category, title (H2/H3), a 2-line excerpt, then date and reading time as labelled metadata. A small thumbnail on the right on ≥640 only.
  - Numbered pagination.
- **Detail `/articles/:slug`:**
  - Breadcrumb, category link, H1, standfirst (one-paragraph summary, 19–20px), then metadata: author (demo), published and updated dates, reading time.
  - Body in the 680px reading measure at 18–19px.
  - **Table of contents** for articles with 4 or more H2s. On ≥1280 it is a sticky right-rail "On this page" list with scroll-spy. Below that, a collapsible "On this page" disclosure sits under the standfirst.
  - Content blocks: headings, lists, quote, callout (`ink-50` with a left rule; used for "Key point" or "Check this"), table (scrollable container), and image with caption.
  - **End of article:** "Courses mentioned in this guide" (compact ledger rows), a contextual enquiry line ("Considering an MBA? Get guidance"), then 3 related articles as a list.
- **Trust signals:** an updated date that is always visible, author attribution (demo author clearly labelled), and no fabricated "reviewed by expert" badges.

## 15. Responsive Behaviour

| Area | 360 | 390 | 768 | 1024 | 1280 | 1440+ |
|---|---|---|---|---|---|---|
| **Header** | Logo, search icon, menu button (drawer). Hides on scroll down, shows on scroll up | Same | Logo, search icon, "Get guidance" button, menu | Full nav + header search field + Get guidance | Same, more spacing | Same; container capped at 1240 |
| **Search** | Full-screen overlay | Overlay | Overlay | Header field + popover | Same | Same |
| **Filters** | Sheet via "Filters (n)" | Sheet | Sheet | Left rail 260px | Rail 280px | Rail 280px |
| **Listings** | Stacked rows; facts in a 2-col grid; actions at the bottom of the row | Same | Rows with facts in one line where they fit | Profile/compact rows with right-aligned actions | Course ledger shows all columns | Same |
| **Detail** | Single column; facts 2-col; bottom action bar | Same | Facts 3-col; bottom action bar | Main + sticky side rail (CTA panel) | Same | Same |
| **Comparison** | 2 items + pair switcher; labels as full-width rows | Same | 3 items fit; label column narrow (labels above values) | Full table with sticky label column | Same | Same |
| **Sticky CTAs** | Bottom action bar (guidance + WhatsApp + compare segment when active) | Same | Same | Side-rail panel; compare tray docked bottom | Same | Same |
| **Enquiry** | Bottom sheet | Bottom sheet | Dialog | Dialog | Dialog | Dialog |
| **Tables** | Become stacked rows (offerings) or scroll in a container with a fade edge (fees) | Same | Table, scrolling in its container if needed | Full table | Full | Full |
| **Density** | Comfortable: 16px gutters, larger tap targets | Same | 24px gutters | 32px gutters, denser rows | Same | Same |
| **Homepage stream index** | 2 cols | 2 cols | 3 cols | 4 cols | 4 cols | 4 cols |

Sticky priority on mobile (top to bottom): header (auto-hiding) → section nav / filter bar (sticky) → content → bottom action bar (one bar, never more). The WhatsApp button never floats over content; it lives in the bottom bar, the header menu, the CTA panel and the footer.

## 16. Accessibility Direction (WCAG 2.2 AA)

| Area | Requirement |
|---|---|
| **Focus** | A visible 2px ink outline with 2px offset on every interactive element; the highlighter outline on ink or dark surfaces. Sticky header, bottom bar and tray must never hide the focused element (scroll-padding equal to the sticky heights) |
| **Keyboard** | Everything is operable by keyboard; tab order follows the visual order; skip link "Skip to main content"; Esc closes overlays; no keyboard traps outside modals |
| **Headings** | One H1 per page; H2 per section; listing row titles are H3; no skipped levels. Section nav links target the H2 IDs |
| **Contrast** | Text ≥ 4.5:1 (all tokens in §4 are chosen for this; verify †). Non-text UI (input borders, icons with meaning, focus) ≥ 3:1. The highlighter is never the only signal |
| **Forms** | Visible labels; optional fields marked; helper text linked via `aria-describedby`; errors inline plus a summary; `autocomplete`; correct `type`/`inputmode`; consent as a real checkbox |
| **Search combobox** | WAI-ARIA combobox with listbox; `aria-activedescendant`; group labels; results count in a polite live region |
| **Dialogs / sheets** | `role="dialog"`, labelled by title, focus moves in and is trapped, Esc and a visible close button, focus returns to the trigger, background inert. Sheets can be dismissed without dragging |
| **Filter sheet** | Fieldset/legend per facet; the result count in the apply button updates and is announced politely |
| **Tables** | `<caption>`; `th scope="col"/"row"`; the "Differs" marker is in text; sticky columns don't break reading order |
| **Toggles** | Compare and "Highlight differences" use `aria-pressed` or a switch role, with text that changes ("Added") |
| **Touch targets** | ≥ 44×44px with 8px spacing (above the WCAG 2.2 AA minimum of 24px) |
| **Reduced motion** | All transitions are reduced to an instant change or opacity; no highlighter sweep; no smooth scrolling |
| **Route change** | Focus moves to the H1; `document.title` updates to "{Page} — {Brand}" |
| **Language** | `lang="en-IN"` |
| **v2: dark band** | White and `ink-100` text only (muted no lower than `on-ink-muted`, 8.2:1); highlighter focus ring via `.on-ink`; inverted primary button keeps a visible focus |
| **v2: illustrations and artefacts** | Decorative SVG is `aria-hidden`. Diagrams carry their meaning in text. The hero artefact is `aria-hidden` with no focusable content, and a visible text link leads to the real comparison |
| **v2: motion** | The hero highlighter sweep runs once and is instant under `prefers-reduced-motion`. No scroll-triggered entrances |

## 17. Demo-Data Presentation

Goal: no one mistakes a fictional institution, fee or approval for a real one, and the design still looks finished.

| Layer | Treatment |
|---|---|
| **Site-wide strip** | A slim strip (36px, `ink-50`, 14px text) above the header on every page: "Demo site: institutions, fees and approvals shown are fictional." It is not dismissible and not sticky (it scrolls away). Uses ink, not the highlighter |
| **Contextual markers** | A small "Sample data" label with an info icon beside fact-heavy headings: Key facts, Fees, Approvals, comparison table caption. Activating it opens a popover that explains, reachable by keyboard |
| **Names** | Fictional institution names that are plausible but checked not to match real institutions. Monogram tiles instead of logos or photos |
| **Enquiry** | The confirmation shows the demo notice (§13) |
| **Footer** | A repeat statement plus a link to an "About this demo" paragraph on the About page |
| **Search engines** | `noindex` (technical, not visual) |

The labels are restrained and consistent: one style, used only on facts. They don't damage the design and stay clear. The strip and labels are removed in Phase 2 when real, verified data arrives.

## 18. Anti-Patterns to Avoid

**Layout and composition**
- Hero image + headline + "Get started" button, then 3 feature cards, 3 more cards, then a dark CTA band
- Card grids for listings or comparable facts
- Centre-aligned body text and section intros
- Ornamental section dividers, blobs, abstract illustrations, decorative icons on every heading

**Visual**
- Gradients, glassmorphism, blur used as decoration
- Coloured approval or "Top rated" badges; pill clusters on every row
- One radius and one soft shadow on everything
- Warm cream backgrounds with a serif display and terracotta accent; dark mode with an acid accent; newspaper hairline pastiche
- All-caps eyebrow labels, single-word headline accents, middle-dot meta strings, arrows appended to link text, monospace for data labels

**Content and conversion**
- Invented statistics ("10 lakh+ students helped"), testimonials, partner logos, rankings, placement numbers
- Fake urgency, countdowns, seat counters, page-load or exit-intent popups
- More than one primary CTA in view; full enquiry forms repeated down the page
- Stock photos of real campuses attached to fictional institutions; smiling-counsellor stock photography

**Interaction**
- Hover-only information (tooltips are only for supplementary detail, and are also reachable by focus or tap)
- Swipe-only comparison or dismissal
- Scroll-triggered fade-ins on every section
- Range sliders as the only fee filter

**v2 additions**
- **Rainbow page:** two supporting families in one section, or saturated colour on every band.
- **Supporting colours as CTAs or status:** green or kraft buttons; green as success; green implying the platform verified anything.
- **Highlighter as decoration:** yellow backgrounds or headings; highlighting text that isn't a match, difference or selection.
- **Dark site with a neon accent:** the dark band is one moment with a white sheet.
- **Kraft as page background.**
- **Illustration filler:** blobs, waves, isometric scenes, mascots, people; any illustration that explains nothing.
- **Cards in the Evaluate register** (listings, comparison, dense facts).
- **Statistics bands, logo walls, testimonial carousels, "trusted by" strips.**
- **Artificial variation:** changing a surface or composition only to differ from the neighbouring section.

## 19. Design Decisions & Rationale

### 19.1 First pass vs. revised plan (human-judgement review)

The first instinct for "trustworthy education site" was checked against what a generic generator would produce. Every default that turned up was revised:

| First-pass default | Problem | Revised decision |
|---|---|---|
| Corporate sky/navy blue + green CTA (the `ui-ux-pro-max` default) or teal + amber (its LMS default) | Appears on every trust site, and a second CTA colour competes with the primary | Blue-ink primary taken from the student's world. A single highlighter accent that only marks information. CTAs use ink |
| Inter or IBM Plex Sans | The most common generated and SaaS faces; nothing specific to India; poor fit for long names | Anek Latin: an Indian foundry, a width axis for long institution names, Indic siblings for the future |
| Campus-photo hero with headline and stats | Photos of fictional institutions mislead; stats would be invented | Search field as hero, with the H1 as its label |
| Card grid listings with coloured badges | Facts scatter across cards, and badges overstate demo data | Entity-specific rows with aligned facts; approvals as plain text |
| Floating WhatsApp bubble + sticky enquiry + compare tray | Three overlapping layers on mobile, and content gets covered | One bottom action bar that holds all three |
| Horizontal-swipe comparison on mobile | Gesture conflicts; columns get squeezed | Two items at a time, a pair switcher, labels as full-width rows |
| "Load more" listings | URL state and footer access get harder | Numbered pagination |

### 19.2 Key decisions

| Decision | Reasoning (audience, hierarchy, trust, usability) |
|---|---|
| **Search is the homepage hero** | Most visitors already have a course or institution in mind. It removes a step and makes no visual claims. Information-first audiences (parents) see function immediately |
| **Questions as section headings** | Headings mirror how students and parents think ("Regular, online or distance?"), which makes the homepage easy to scan and builds trust through relevance |
| **Rows and tables over cards** | Decisions depend on comparing fees, duration and mode across options. Aligned facts can be scanned vertically; cards make the eye hunt |
| **Distinct row per entity** | Universities are evaluated holistically, colleges by affiliation and stream, courses as catalogue entries. One generic card would hide what matters for each |
| **Key facts directly under the H1** | Parents and time-poor professionals (J5) get cost, duration, mode and recognition without scrolling. This replaces the overlong pages seen in the category |
| **Highlighter as the only accent** | One memorable, subject-grounded device that always carries meaning (match, difference, selection), so emphasis stays trustworthy |
| **Ink-blue CTAs, no separate CTA colour** | Primary actions stand out through fill and position, not a loud colour. This matches "confidence without pressure" |
| **One conversion section on Home + persistent header CTA** | Respects the user's pace. Guidance is always reachable but never repeated |
| **Compare as a utility toggle** | Settles the CTA-count tension in the PRD; keeps "Get guidance" as the one primary action |
| **Fee bands, not sliders** | Families think in budget brackets. Bands are keyboard-friendly and honest with sparse demo data |
| **Monograms, no institution imagery** | Avoids misleading visuals for fictional data. Consistent, quick to load, and recognisable in rows |
| **Explicit, restrained demo labelling** | Protects users and the client's credibility. Using a single style keeps the visual quality |
| **Anek Latin, semi-condensed headings** | Long Indian institution names wrap less; the Indian foundry and Indic siblings suit the market and a later regional-language phase |
| **Low motion** | Information products benefit from stability. Motion only confirms user actions (sheet open, highlighter sweep on toggle) |

### 19.3 Unresolved design questions

1. **Brand name and logo.** The wordmark, favicon and title pattern depend on them. Until then use a neutral placeholder wordmark set in Anek semi-condensed.
2. **Font verification.** Anek Latin's ₹ glyph, tabular figures and small-size rendering need checking (fallback defined in §5).
3. **Fee convention.** Show per year or total programme fee by default? (Recommendation: total for courses, per-year range for institutions, always labelled.) Needs client input.
4. **"Free" guidance and the response time claim** in the enquiry copy need client confirmation; otherwise remove them.
5. **Article imagery.** Use a licensed stock source, or text-only covers for Phase 1?
6. **Approvals explainer content** on Home needs a factual review (it can be written from official public definitions, but should be checked).
7. **Desktop compare tray**: always docked or collapsed by default? Validate in the prototype.
8. **The exact colour values** must pass contrast checks in the browser (†) before tokens are frozen.

### 19.4 v2 decisions (approved 2026-10-08)

1. **Two registers (Invite / Evaluate).** The v1 restraint was right for evaluating options but made the homepage plain.
2. **Supporting families:** deep ink, trust green and kraft, for surfaces and illustration only. Ink stays the only action colour; the highlighter stays the only semantic accent.
3. **Green means trust- and recognition-related explanatory content**, never platform verification, approval, confirmation of demo data, or success.
4. **Live product artefact hero:** real demo data, `aria-hidden`, one highlighter sweep.
5. **One dark moment:** the homepage comparison. Not a universal component; detail pages are evaluated per content.
6. **Homepage cards, listing rows.**
7. **Illustration-first article covers in Phase 1.** No stock photography.
8. **Section variation is a preference**, used when it improves hierarchy, understanding or rhythm.
