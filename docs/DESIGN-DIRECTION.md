# Design Direction — Pathways, marked up

**Product:** Education discovery & lead-generation platform (working name — brand TBD)
**Status:** **Pathways, marked up** — approved 2026-10-11. This is the design source of truth.
**What it combines:** **Routes** (primary identity and information structure) with **Margin Notes** (a supporting visual language of paper, tape and brief annotations, used selectively).
**History:** [design-history/](design-history/) holds the earlier directions: v1 + v2 ("blue ink and highlighter", restrained) and the v2 proposal (`DESIGN-DIRECTION-V2-proposal.md`). They are superseded. **Do not follow their minimalism rules.**
**Inputs:** [BRD.md](BRD.md) · [PRD.md](PRD.md) · [PHASE-ROADMAP.md](PHASE-ROADMAP.md) · [CLAUDE.md](../CLAUDE.md)
**Implementation:** tokens, type and paper styles in `src/styles/index.css`; stream lines in `src/lib/streamLines.ts`.

> **Discover the paths, then mark them up.** Routes shows how courses connect. Margin Notes is how a student and their family review, annotate and compare those options. Confident on the homepage; calm and precise wherever people evaluate.

---

## 0. Two registers

| Register | Where | Vocabulary |
|---|---|---|
| **Invite** | Homepage; article index; empty states where appropriate | Night hero with the route map and a taped annotation, wide display type, the line index, paper surfaces, course-teaser notes, the annotated comparison sheet, checkpoints, the guidance route, illustrated covers, purposeful motion |
| **Evaluate** | Listings; detail pages; comparison page; dense factual modules | Night title band, then paper and white with entity-specific rows and tables. Brand comes from tokens, type, monograms, the highlighter and line dots. **No paper-note treatments, tape or handwriting** |

The IA, search, filters, URL state, pagination, compare state and data contracts are identical in both. **Listings stay information-first: never turn them into card grids.**

## 1. Principles

1. **Facts before persuasion.** Fees, mode, duration and recognition are always the most legible things on any module.
2. **Routes for structure, notes for warmth.** Streams are lines, courses are stops, next steps are illustrative routes, trust is checkpoints, guidance is a journey. Paper notes, tape and handwriting add the human "marking up" layer, but only on a few chosen elements.
3. **Colour has a job.** Cobalt means "act". Yellow means "this matters: it differs, matches or is selected". A line colour means "this stream". A paper colour means "this kind of content". Nothing gets an arbitrary colour.
4. **Restraint in the tactile layer.** The strong paper-note treatment (outline, offset shadow, tape, tilt) is reserved for the hero annotation, homepage course teasers, the comparison sheet and the featured article cover. Everything else uses plain surfaces.
5. **Calm conversion.** One primary action per view, contextual enquiry, no urgency, no invented proof.
6. **Honest visuals.** Paths are illustrative, not admission requirements. Demo data is labelled. Every visual is built from real (demo) data or explains a concept.
7. **Motion means something.** It happens once, explains a change, and has a reduced-motion path.
8. **Mobile first.** Every pattern is designed for 360px first.

## 2. Personality

Confident, clear, encouraging, precise. Like a well-signed metro system: bold at a glance, unambiguous up close. Never a government portal, a coaching-institute flyer, a SaaS dashboard or a template.

## 3. Visual identity

### 3.1 Routes (primary identity and structure)
- **The route map** (homepage hero): from "After Class 12", lines run through an undergraduate course to a related postgraduate one, one line per stream family. The stations are real course links. A taped note sits beside it saying the paths are **examples, not admission requirements, and eligibility varies by course**.
- **Stream lines:** five line colours group the ten streams (§4.2), consistently everywhere.
- **The line index:** the whole catalogue as parallel lines; every course is a stop.
- **Checkpoints** (trust) and the **guidance route** reuse the line language.
- **Wide signage type:** Anek Latin at 112.5% width for display and headings.

### 3.2 Margin Notes (supporting language)
- **Paper surfaces** in three roles (§4.3): periwinkle (discovery), mint (checking), coral (people and reading).
- **Paper notes:** a lightly hand-drawn outline (uneven radii) plus a solid 4px offset shadow (`.paper-note`). Reserved (§7.1).
- **Tape** (`.tape`): at most on the hero annotation, the comparison sheet and the featured article cover.
- **Blue-pen annotations** (`.hand`, Kalam, cobalt): at most two short decorative phrases per page, never facts or controls (§5).
- **The highlighter mark:** the semantic yellow stroke on differences in the comparison sheet.

### 3.3 Imagery
No stock photography, no people, no campuses, no fake logos. Illustrations are line glyphs (Lucide, stroke 1.75–2) and route motifs.

## 4. Colour system

### 4.1 Roles and tokens

| Role | Token | Value | Use | Contrast (verified) |
|---|---|---|---|---|
| **Action** | `ink` (cobalt) | #2147E8 | Primary buttons, links, active controls, focus ring on light | White on it 6.7; on white 6.7; on paper 6.2 |
| Action hover | `ink-700` | #1834B8 | Hover and pressed | |
| **Brand surface** | `ink-900` (night) | #0B1638 | Header, homepage hero, listing title bands, footer | White 17.7; `on-ink-muted` 10.5 |
| Muted on night | `on-ink-muted` | #B9C6F5 | Secondary text on night | 10.5 |
| **Attention** | `highlight` (signal yellow) | #FFD23F | You-are-here, differences, selection ("Added"), focus ring on dark surfaces | Body text on it 12.4; on night 13.1 |
| Mist | `ink-50` | #E9EDFF | Comparison band, notes, icon tiles | |
| Mist strong | `ink-100` | #D4DCFA | Hover fills, table headers | |
| Paper / Surface | `paper` / `surface` | #F5F6FA / #FFF | Page and cards | |
| Text | `body` / `muted` | #0E1530 / #4A5272 | Text | Muted on white 7.7 |
| Rules | `rule` / `rule-strong` | #DDE1EA / #7D8699 | Dividers / input borders (3.7) | |
| Status | `success`, `warning`, `error` (+ tints) | unchanged | Form states only | |

**Rules:**
- **Primary actions are cobalt.** On night or cobalt surfaces they **invert to a white fill with ink text**, because cobalt on night separates at only 2.6:1.
- **Yellow is a semantic highlight, never an action.** It marks meaningful differences, matches and selections (and is the focus ring on dark surfaces). It is always paired with text ("Differs", "Added", "After Class 12"). **On paper colours it is nearly invisible (about 1.1:1), so highlights only ever sit on white or night.**
- **No gradients** as decoration. Depth comes from surfaces, the hairline card ring and two shadows.

### 4.2 Stream lines

| Line | Token | Value | Streams |
|---|---|---|---|
| Saffron | `line-saffron` | #E8730C | Management, Commerce |
| Teal | `line-teal` | #0E8C8C | Engineering and technology, Computer applications |
| Rose | `line-rose` | #D6336C | Health sciences |
| Violet | `line-violet` | #6E4FE0 | Arts and humanities, Law, Education |
| Green | `line-green` | #2B8A4B | Design, Science |

- **Lines, dots, strips and markers only. Never text** (saffron is 3.05:1 on white, which is fine for a line but not for text).
- **Always shown with the stream name** next to it, so colour never carries meaning alone.
- **Only for streams.** Not for categories, status, trust or decoration. Article covers, checkpoints and guidance use night, cobalt and yellow instead.
- The mapping lives in one place (`src/lib/streamLines.ts`).

### 4.3 Paper colours (Margin Notes)

| Paper | Token | Value | Role (only) | Used on |
|---|---|---|---|---|
| Periwinkle | `paper-peri` | #DCE2FF | Discovery | Study-mode panels, homepage course-teaser notes |
| Mint | `paper-mint` | #CDEFDF | Checking | Trust checkpoint cards, "check before you apply" notes, the hero's "good to know" note |
| Coral | `paper-coral` | #FFD9D2 | People and reading | Guidance steps, article covers |

- **Verified contrast:** text on every paper is always `body` (13.8–14.6:1), `muted` (5.9–6.2:1) or `ink` (5.1–5.4:1). No other text colour.
- **Surfaces only.** Never buttons, never status, never a section background.
- **One paper per element.** The only nesting allowed is a mint "check" note inside a periwinkle mode panel, because checking always uses mint.

### 4.4 Surfaces (homepage rhythm)

```text
Header + Hero ..... night (route map + mint annotation)
Line index ........ surface (white)
Study modes ....... paper (page), periwinkle panels
Courses ........... surface, periwinkle course notes; plain institution cards
Comparison ........ mist, white annotated sheet
Checkpoints ....... paper, mint cards
Guidance .......... surface, coral steps
Guides ............ paper, coral covers
Footer ............ night
```

There is no dark section beyond the brand bands (header, hero, footer). In particular, the comparison stays a light paper sheet.

## 5. Typography

**Anek Latin variable** (Ek Type) is the primary and functional font: every fact, label, control and heading. It is self-hosted and verified for the ₹ glyph, tabular figures, weight 100–800 and width 75–125.

| Style | Size (mobile / tablet / desktop) | Line height | Weight / width | Use |
|---|---|---|---|---|
| `type-display` | 40 / 56 / 76px | 1.0 | 760 / 112.5% | Homepage hero H1 only. Capped so the search stays the dominant control |
| `type-section` | 32 / 42 / 52px | 1.05 | 720 / 112.5% | Homepage section H2s |
| `type-h1` | 32 / 32 / 44px | 1.08 | 720 / 112.5% | Page titles (listings, detail) |
| `type-h2` | 24 / 24 / 30px | 1.15 | 700 / 112.5% | Section headings on Evaluate pages |
| `type-h3` | 18 / 18 / 20px | 1.3 | 600 | Row and card titles |
| `type-lead` | 18 / 18 / 20px | 1.5 | 400 | One lead paragraph |
| Body | 16 / 16 / 17px | 1.6 | 400 | Reading |
| `type-meta`, `type-small`, `type-caption` | 14 / 14 / 13px | 1.4–1.5 | 500 / 400 | Labels, metadata |

**Kalam** (`.hand`, Latin 400 only, loaded with the homepage) is for **brief decorative annotations only**: at most two phrases per page (currently the hero's "Good to know" and the comparison sheet's margin note), in cobalt, `aria-hidden` when the same information is in text. Never for facts, prices, labels, controls or anything that must be read.

Sentence case everywhere. No all-caps eyebrows, no single-word accent colours in headlines.

## 6. Spacing and layout

Unchanged system: 4px base; container 1240px with 16/24/32px gutters; reading measure 680px. Invite sections use generous feature spacing (80–112px desktop). Evaluate pages use the denser listing rhythm.

## 7. Components and surfaces

| Element | Treatment |
|---|---|
| Radius | `control` 6px · `layer` 10px · `tile` 8px · `card` 20px. Pills (`rounded-full`) for tab pills, chips and station labels. Paper notes use the uneven `.paper-note` radii |
| Plain card (default Invite card) | White, 1px `rule` ring, radius 20px, no resting shadow. Hover lifts 4px. One stretched link per card; a focus ring wraps the card (`cardClass` / `stretchedLink`) |
| Paper surface | A paper colour fill at radius 20px, no outline, no shadow (study modes, checkpoints, guidance steps, non-featured covers) |
| Paper note (reserved, §7.1) | `.paper-note`: paper or white fill, 1.5px body outline with uneven radii, 4px solid offset shadow; hover shifts by 2px |
| Course teaser (homepage) | Periwinkle paper note: stream dot plus stream name, level and duration; wide course name; a white fact panel |
| Institution teaser (homepage) | Plain card with a night monogram tile |
| Rows and tables (Evaluate) | Unchanged entity-specific rows: profile (universities), compact (colleges), ledger (courses) |
| Buttons | Primary cobalt; inverse white on night; secondary outline; tertiary text link |
| Search | Hero: white card on night, 64px tall, cobalt button, yellow focus ring around the card. Elsewhere the standard field |
| Header / footer | Night. Nav at 80% white, active page underlined in yellow; inverse "Get guidance" |
| Dialogs and sheets | White surfaces, radius `layer`, `shadow-overlay`; cobalt actions; CSS enter and exit |

### 7.1 Where the full paper-note treatment is allowed

| Treatment | Allowed on | Nowhere else |
|---|---|---|
| Outline + offset shadow | Hero annotation, homepage course teasers, comparison sheet, featured article cover | |
| Tape | Hero annotation, comparison sheet, featured article cover | |
| Tilt | Hero annotation (−2°), featured cover (−1°) | Cards, tables, listings |
| Handwriting | Hero annotation title, comparison margin note | |

Adding a new paper note anywhere else is a design change. Justify it against hierarchy first.

## 8. Homepage composition

| # | Section | Question | Treatment |
|---|---|---|---|
| 1 | Hero (night) | Where do I start? | `type-display` H1 labelling the search; lead; hero search card; popular searches; demo count. The route map (≥768px) or route rows (<768px), plus the taped mint "Good to know" note saying the paths are illustrative |
| 2 | Line index (white) | What should I study? | Five vertical stream lines with every course as a stop. Stream names link to filtered listings |
| 3 | Study modes (paper) | What options exist? | Three periwinkle panels: glyph, wide title, the same four labelled rows aligned across panels (subgrid), a mint "check before you apply" note, and a link |
| 4 | Courses and where to study (white) | Where can I study it? | Tab pills; periwinkle course-teaser notes; plain institution cards |
| 5 | Comparison (mist) | Can I compare? | Heading, lead, sample label, cobalt CTA; the annotated comparison sheet |
| 6 | Checkpoints (paper) | Can I trust this? | Night line with three checkpoint markers; mint cards with question, body, summary and where to check; a sentence that the demo verifies nothing |
| 7 | Guidance (white) | Can someone help? | Three coral steps on a dashed route; cobalt "Get guidance", WhatsApp link, demo note |
| 8 | Guides (paper) | Where can I learn more? | Featured card (taped, tilted coral cover) plus three cards with plain coral covers |

The one-search-per-screen rule applies: while the hero search is visible, the header's desktop search field is hidden.

### 8.3 Evaluate pages

Listing (and later detail) pages open with a **night title band** (H1, description, sample-data label, search), then the paper workspace (filters, rows, pagination). Their behaviour is unchanged.

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

### 11.0 The annotated comparison sheet

One metaphor: **a comparison sheet you've marked up.**
- A real table (`<table>` with `th scope` on ≥640px; a `<dl>` with the label above the paired values below 640px) on white paper (`.paper-note`, two pieces of tape).
- Values that differ get a **yellow highlighter stroke** and a **"Differs"** label. The stroke sweeps in once when the sheet scrolls into view; under reduced motion it appears instantly.
- **Highlight differences** (`aria-pressed`, on by default) turns the marking on and off.
- One blue-pen margin note summarises ("4 of 7 differ"). It is decorative because the same count is stated in text above the sheet.
- **Not used:** dark boards, graph paper, red-pen circles or sticky notes on the comparison.

### Selection and compare tray
- The toggle is **"Compare"** (outline). When added it becomes **"Added"** with a check and highlighter fill, with `aria-pressed`. A live region announces "Meridian National University added to comparison, 2 of 3".
- **Tray (desktop):** docked to the bottom, full container width, `raised` shadow, collapsible to a single line. It shows 3 slots: filled slots have the name and a remove button; empty slots read "Add another university". Its button reads "Compare 2 universities" and is disabled with an explanation ("Add at least 2 to compare") when only 1 is selected.
- **Tray (mobile):** merges into the bottom action bar as one segment, "Compare (2)", which opens a sheet with the slots and the compare button. There are never two stacked bottom bars.
- **Fourth item:** the toggle is disabled with the explanation "You can compare up to 3", plus a "Manage" link to the tray.
- **Different type:** a confirm dialog: "Your comparison has universities. Start a new comparison with courses?" with the options "Start new" or "Keep current".

### Compare page (Milestone 3)
- H1: "Comparing 3 universities". Each item's header shows the monogram, name, a remove/replace control, and **Get guidance** (secondary style, so three items don't create three primary buttons).
- **Presentation:** the annotated comparison sheet (§11.0) scaled up to 2–3 columns, as a desktop `<table>`: The first column (attribute labels) is sticky, the item header row is sticky, and rows are grouped by category (Basics, Fees, Recognition, Courses).
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

**Covers:** Phase 1 covers are illustrated, never stock photography: coral paper (people and reading) with the category's line glyph. Only the featured cover gets the paper-note outline, tape and a −1° tilt. Covers never use stream line colours.

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

Sticky priority on mobile (top to bottom): header (auto-hiding) → section nav / filter bar (sticky) → content → bottom action bar (one bar, never more). The WhatsApp button never floats over content; it lives in the bottom bar, the header menu, the CTA panel and the footer.

**Routes homepage specifics:**
- Hero: route map from 768px; route rows below. The annotation note sits under the map.
- Line index: 1 column on phones, 2 on tablets, 5 on desktop.
- Cards: 1 / 2 / 3 columns.
- Comparison sheet: a table from 640px; labels above paired values below.
- Checkpoints and guidance lines: vertical on phones, horizontal from 768px.
- Never swipe-only carousels.

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
| **Night and cobalt surfaces** | Carry `on-ink`, so the focus ring is signal yellow. Text is white or `on-ink-muted` (≥ 10:1). Primary buttons invert to white |
| **Stream colours** | Lines and markers only, always next to the stream name. Never text, never the only signal |
| **Paper colours** | Text on them is only `body`, `muted` or `ink` (≥ 5.1:1). Highlights never sit on paper |
| **Handwriting** | Decorative only, `aria-hidden` where the same information exists in text; never a control, fact or label |
| **Route map** | Stations are real links with "then" relationships for screen readers; the SVG is `aria-hidden`. The "illustrative paths" caption is visible text |
| **Motion** | Every animation has a reduced-motion path that renders the final state immediately (`MotionConfig reducedMotion="user"` + `useReducedMotion`). Nothing loops; nothing hides content until it animates |

## 17. Motion (Motion for React)

`motion` is a production dependency, imported from `motion/react`, and loaded only with the homepage. It is used for a small, coordinated set:

| Moment | Behaviour |
|---|---|
| Route drawing | Hero lines draw from "After Class 12" (≈1.1s, staggered), then the stations appear. The line index draws down once in view |
| Hero annotation | The taped note settles into place once after the routes draw (spring, about 1.4s delay) |
| Comparison highlighting | Highlighter strokes sweep across differing values once when the sheet comes into view (CSS transition triggered by `useInView`) |
| Tabs | The selected pill slides; the panel crossfades (0.25s) |
| Sheets, dialogs, cards | CSS: sheet and dialog enter/exit; a 2–4px lift on hover |

- **Reduced motion:** wrap pages in `MotionConfig reducedMotion="user"` and use `useReducedMotion()` to skip draws and placements. Every element renders in its final state, and everything works without animation.
- **Not allowed:** constant or looping movement, scroll-reveal on every section, parallax, long delays before content is readable, motion on Evaluate pages beyond state feedback.

## 18. Demo-Data Presentation

Goal: no one mistakes a fictional institution, fee or approval for a real one, and the design still looks finished.

| Layer | Treatment |
|---|---|
| **Site-wide strip** | A slim strip (36px, `ink-50`, 14px text) above the header on every page: "Demo site: institutions, fees and approvals shown are fictional." It is not dismissible and not sticky (it scrolls away). Uses mist (`ink-50`) with body text, never the highlighter |
| **Contextual markers** | A small "Sample data" label with an info icon beside fact-heavy headings: Key facts, Fees, Approvals, comparison table caption. Activating it opens a popover that explains, reachable by keyboard |
| **Names** | Fictional institution names that are plausible but checked not to match real institutions. Monogram tiles instead of logos or photos |
| **Enquiry** | The confirmation shows the demo notice (§13) |
| **Footer** | A repeat statement plus a link to an "About this demo" paragraph on the About page |
| **Search engines** | `noindex` (technical, not visual) |

The labels are restrained and consistent: one style, used only on facts. They don't damage the design and stay clear. The strip and labels are removed in Phase 2 when real, verified data arrives.

## 19. Anti-Patterns to Avoid

- **Rainbow UI:** line colours on anything that isn't a stream; paper colours outside their roles; a new colour per section.
- **Tactile overload:** outlines, offset shadows, tape, tilt or handwriting on elements outside §7.1; any of them in listings, rows or tables.
- **Highlighter on paper colours,** or yellow as a button or decoration; cobalt buttons on night (use inverse).
- **Handwriting for facts,** prices, labels or controls; more than two annotations per page.
- **Extra dark bands for variety,** including a dark comparison.
- **Admission-guarantee framing:** routes presented as requirements or outcomes.
- **Promotional cards in listings, comparison or detail facts.**
- **Stats bands, logo walls, testimonials, countdowns, urgency bars, "trusted by" marquees.**
- **Stock photography, people, campuses, fake logos;** decorative gradients, glassmorphism, blobs, wave dividers.
- **Animating everything on scroll;** looping motion; motion without a reduced-motion path.
- **Template chrome:** all-caps eyebrows, coloured single-word headline accents, `01/02/03` on non-sequences, arrows appended to links.
- **Copying the reference sites** (FindMyCollege, LearningShala).

## 20. Decisions

1. **Routes approved (2026-10-10).** It replaced the v2 visual language after prototyping.
2. **Pathways, marked up approved (2026-10-11).** Routes stays the identity and structure; Margin Notes is added as a selective supporting language.
3. **Colour roles:** night = brand surface, cobalt = action, yellow = semantic highlight, line colours = streams, paper colours = content groups (periwinkle discovery, mint checking, coral people and reading).
4. **Restraint:** the full paper-note treatment is limited to four element types (§7.1).
5. **Comparison is an annotated paper sheet** with highlighter marks. The departure board is retired, and no dark comparison band is used.
6. **Fonts:** Anek for everything functional. Kalam for at most two decorative annotations; Baloo 2 is not adopted.
7. **Motion for React** is a production dependency for route drawing, the hero annotation, comparison highlighting and tabs. CSS handles sheets, dialogs and hover.
8. **Listings keep their rows;** they gain only the night title band and tokens.
9. **Retired:** the v2 trust-green and kraft families, the departure board and the `board` token.

