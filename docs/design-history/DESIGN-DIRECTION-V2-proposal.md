# Design Direction v2

**Status:** Approved on 2026-10-08 with four decisions, and merged into [DESIGN-DIRECTION.md](DESIGN-DIRECTION.md), which is now the source of truth. This file is kept as the proposal and its reasoning.

> **Decisions applied in the merge (they override this proposal where they differ):**
> 1. **Green family:** kept, but it means *trust, recognition and verification-related explanatory content*. It does **not** imply attestation by Indian authorities, verification or approval by this platform, confirmation of demo data, or success.
> 2. **Article imagery:** illustration-first kraft covers in Phase 1. No stock photography.
> 3. **Dark sections:** approved for the homepage comparison only. Not a universal component; re-evaluate per content when detail pages are designed.
> 4. **Section variation:** "no two adjacent sections share a surface or composition" is a **preference**, not a rule. Vary only when it improves hierarchy, understanding or rhythm.
**On approval:** the sections marked "supersedes" replace their v1 counterparts. Everything not mentioned here stays as in v1.
**Inputs:**
- CLAUDE.md, BRD, PRD, PHASE-ROADMAP and DESIGN-DIRECTION v1
- A review of the implemented Milestone 1–2 UI at 360–1440px
- The `ui-ux-pro-max` style, palette and section-pattern guidance
- The `frontend-design` two-pass review against generic defaults (§17.1)

**Scope:** visual composition and presentation. The IA, data architecture, discovery UX, filters, URL state, pagination, comparison logic and accessibility targets are **unchanged**.

> **Calm, but not plain. Trustworthy, but not institutional. Product-like, but not SaaS-generic. Memorable, but not decorative.**

---

## 1. What is wrong with the current visual experience

The implementation follows v1 faithfully. The problem is v1 itself: it reduced risk by subtracting, and it subtracted too much.

| Symptom | Where it shows | Cause in v1 |
|---|---|---|
| **Every section starts the same way:** rule → H2 → muted sentence → content | Homepage after the hero; listings | "Hierarchy through type and spacing, not decoration" applied uniformly, with no compositional variety |
| **Almost no visual anchors.** After the hero, the eye has nothing to land on except text and hairlines | Homepage sections 2, 3, 6, 7, 8 | Illustration effectively banned; imagery limited to article covers, which don't exist yet |
| **One surface colour.** Paper/white everywhere, with one `ink-50` band per page | Whole site | "At most one tinted band per page" |
| **The identity appears twice and then disappears.** Blue ink shows in the hero H1 and buttons; the highlighter only in the comparison | Homepage | The highlighter's strict semantics are right, but nothing else carries the brand |
| **Tables used as presentation.** The study-modes section is a correct table, but it reads like a policy document | Homepage §3 | "Rows and tables over cards" applied to the homepage as well as to listings |
| **Large inert areas.** The right half of the desktop hero is empty, and section padding is generous with nothing inside it | Hero at ≥1024px | "No image, no visual claims" was right for photos, but left the composition unbalanced |
| **No change in tempo.** No dark moment, no full-bleed module, no asymmetric composition. The page has one speed | Homepage | No surface or dark-section strategy existed |
| **The homepage looks like the listings.** The same rows appear in both places | Homepage "Courses" tab | A deliberate reuse that removed the difference between *browsing* and *invitation* |

**Diagnosis:** v1 is a sound **operate** design (catalogue, comparison) applied to a page that also has to **persuade** (the homepage). Listings should stay as they are. The homepage, and the shared visual vocabulary, needs a second register.

## 2. What remains (non-negotiable)

- **Blue-ink brand concept:** ink is the primary colour and the only CTA colour.
- **Highlighter as a semantic device:** it marks match, difference, selection or focus on dark. It never becomes a surface or decoration.
- **Anek Latin**, including the semi-condensed headings and the `type-display` hero.
- **Fact-first hierarchy:** fees, mode, duration and recognition stay the most legible things on any module.
- **Entity-specific listing rows** (profile, compact, ledger). Listings are unchanged.
- **Comparison-led UX:** the comparison stays the signature feature.
- **Calm CTA philosophy:** one primary per view; Compare is a utility; WhatsApp is secondary; no repeated forms.
- **No fake urgency, statistics, testimonials or rankings**, and no misleading campus photography.
- **Mobile-first** and **WCAG 2.2 AA**.
- **Demo-data labelling.**

## 3. What changes

| v1 constraint | v2 decision | Why |
|---|---|---|
| One accent colour (highlighter) | **Keep** a single *semantic* accent. **Add** three *supporting families* for surfaces, illustration and grouping, never for actions or meaning | Colour variety was missing from surfaces and visuals, not from semantics |
| One tinted band per page | **Relaxed.** A planned surface sequence (§11) with up to four surface treatments on the homepage, and never two identical surfaces adjacent | Gives the page tempo and grouping |
| Illustration effectively excluded | **Allowed and encouraged** in a defined in-house style (§7), when it explains something real | Visual anchors are needed. Explanatory illustration is honest; decorative illustration is not |
| Cards only for teasers (≤4) | **Cards are the homepage vocabulary** for invitations. **Rows and tables stay the listing and comparison vocabulary** (§10) | Separates inviting from evaluating |
| No strong hero visual | **Split hero:** search on the left; a **live product artefact** on the right, built from real demo data (§8.1) | Shows the product working in the first viewport, with no claims |
| Mostly paper/white | **Light-dominant with one dark moment** (§12) | A single dark band creates a focal point and a change of pace |
| Section rhythm undefined | **Explicit rhythm** (§9) | Prevents heading → paragraph → table repetition |
| Motion: transitions only | **One orchestrated moment:** the highlighter sweep in the hero artefact | A memorable signature tied to the core device |

## 4. New visual principles (supersedes v1 §1 principles 2, 5 and 6)

1. **Right treatment for the content.** Choose the form per section: illustration, diagram, card, list, table, split, asymmetric, coloured or dark surface. The test is whether it makes the content faster to understand or more inviting to explore.
2. **Two registers.** *Invite* (homepage, article index, empty states) uses composition, cards, illustration and surface colour. *Evaluate* (listings, comparison, detail facts) uses rows, tables and restraint. Each page knows which register it is in.
3. **Show the product, not promises.** The strongest visuals are real interface artefacts built from the data: a course card, a comparison sheet with highlighted differences, a fee band. No abstract dashboards, no claimed outcomes.
4. **Stationery, not ornament.** The visual world comes from the Indian student's desk: blue ink, highlighter, ruled sheets, index cards, brown-paper notebook covers, the green ink and stamp of an attested document. Motifs are used where they mean something.
5. **One bold move per section.** Each section gets a single focal point: an illustration, a dark surface, a large number or an artefact. Never several at once.
6. **Semantics are protected.** Ink means action and brand. Highlighter means "look here, this differs or matches". Supporting colours mean grouping and nothing more.
7. **Honest visuals.** Every visual either shows real (demo-labelled) product data or explains a concept. Nothing implies real institutions, people or outcomes.

## 5. Supporting colour strategy (extends v1 §4)

**Roles:**
- **Primary (unchanged):** `ink` #2140A0. Actions, links, brand marks.
- **Semantic accent (unchanged):** `highlight` #FFE36E. Matches, differences, selection, and focus on dark surfaces.
- **Three supporting families**, each with a specific purpose:

| Family | Tokens | Grounding | Used for | Never used for |
|---|---|---|---|---|
| **Deep ink** (dark) | `ink-900` #14265E · text `white`, `ink-100` #D9DFF3, muted `#B9C3E6` | Ink in the bottle, the darkest blue of the pen | The single dark section per page; illustration shadows and strokes; footer accents | Large text blocks; more than one band per page; CTA fill (it separates from `ink` at only 1.57:1) |
| **Green ink** (attestation) | `green-700` #1E6656 · `green-50` #E4F1EC | Indian officials attest documents in green ink; it signals *verified by an authority* | The trust and approvals section; recognition diagrams; "how to check" checklists; the stamp motif | Success or validation states (too close to `success` at 1.27:1); buttons; any claim that the *platform* verified something in Phase 1 |
| **Kraft** (editorial) | `kraft-700` #7A5230 · `kraft-100` #EEE2CC · `kraft-50` #F6EFE3 | Brown-paper notebook covers every Indian student has wrapped | Article covers and category illustrations; the editorial band; guide callouts | Page background (it would read as the generic cream-and-clay look); buttons; facts |

**Verified contrast (computed):**

| Pair | Ratio |
|---|---|
| White on `ink-900` | 14.3 |
| `ink-100` on `ink-900` | 10.8 |
| Muted on `ink-900` | 8.2 |
| Highlight on `ink-900` | 11.2 |
| `green-700` on white | 6.8 |
| `green-700` on `green-50` | 5.9 |
| Body on `green-50` | 14.0 |
| Muted on `green-50` | 6.6 |
| `kraft-700` on `kraft-50` | 6.0 |
| Body on `kraft-100` | 12.6 |
| Muted on `kraft-100` | 5.9 |
| `ink` on `kraft-100` | 7.1 |

All AA. Re-verify in the browser on implementation.

**Rules:**
- A section uses **one** supporting family at most. No section mixes green and kraft.
- Supporting colours appear as **surfaces, illustration fills and strokes**, never as text colour for body copy (headings in `green-700` or `kraft-700` are fine), and never as buttons.
- **Primary action is always ink.** On `ink-900` it inverts to a white fill with ink text, because ink on deep ink lacks separation.
- The highlighter keeps its meaning on every surface. On dark it is also the focus ring.
- No gradients, still. Depth comes from surface steps and the two existing shadows.

## 6. Typography refinements (extends v1 §5)

Anek Latin stays. No technical problem exists.

| Change | Spec | Reason |
|---|---|---|
| **Stronger section headings on the homepage** | New `type-section` (Invite register only): 28 / 34 / 40px, line height 1.1, 600, semi-condensed (87.5%). Listings and detail pages keep `type-h2` | The H2s now act as transitions between compositions and need more weight than 28px |
| **Lead paragraph** | `type-lead`: 18 / 20px, line height 1.5, `muted` on light, `ink-100` on dark | A second step between heading and body, so sections don't jump straight from a heading to small text |
| **Condensed numerals as visual anchors** | Step numbers and fact highlights in modules: 56–72px, 600, width 75% (Anek's narrowest), tabular | Uses the font's distinctive axis as a graphic element instead of icons |
| **Unchanged** | `type-display`, H1/H2/H3, body, meta, fact and caption | Already working |

Still banned: all-caps eyebrow labels, single-word headline accents, middle-dot meta strings, arrows appended to link text.

## 7. Imagery and illustration direction (supersedes v1 §3's imagery rules)

**Rules kept:**
- No stock campus images for fictional institutions.
- No people or faces as testimonials, and no stock "smiling student" or "counsellor" photos.
- No copyrighted, scraped or reference-site assets.
- Licensed editorial imagery only where it helps an article.
- Never use imagery merely to fill whitespace.

**In-house illustration style: "Ink on paper"**
- **Line:** ink strokes (`ink` or `ink-900`) at 2px with round caps, matching the Lucide icon stroke.
- **Fills:** flat, from `ink-50`, `green-50` or `kraft-100`, with at most one family per illustration.
- **Highlighter as a mark only:** a single highlighter swipe or underline marks *the* point of the illustration (the difference, the right option), just as in the UI.
- **Subjects are stationery and documents:**

  | Subject | Used for |
  |---|---|
  | Index cards | Courses |
  | Ruled sheet with a highlighted row | Comparison |
  | Attested document with a green stamp | Recognition |
  | Three notebooks of different thickness | Study modes |
  | A route drawn in ink | The guidance journey |
  | A brown-paper cover with a ruled label | Articles |

- **Never:** people, faces, mascots, isometric 3D, blobs, gradients, floating abstract shapes, fake logos or fake campuses.
- **Format:** inline SVG components that scale and respond to tokens. Decorative ones are `aria-hidden`. Explanatory diagrams have a text equivalent next to them or in a `figcaption`.

**Product artefacts** (preferred over illustration wherever possible): real UI fragments rendered from demo data, such as a course card, a comparison sheet or a fee-band selector. They're labelled as samples and link into the real feature.

**Editorial imagery:** licensed photography is permitted for article covers only, showing places, objects or study scenes with no identifiable claims. Until licensing is decided, kraft covers with category illustrations are the default.

## 8. Homepage visual direction (supersedes v1 §8 visual treatments; questions and order unchanged)

### 8.1 Hero: split composition
```text
Desktop ≥1024
┌──────────────────────────────────────────────────────────────────────────────┐
│ What do you want to study?          │  ┌ ink-50 panel, faint ruled lines ─┐ │
│ (type-display, ink)                 │  │  ┌ Course card: MBA ──────────┐  │ │
│ lead sentence                       │  │  │ PG  2 years  ₹0.7–11.8 lakh │  │ │
│ [ search ......................][Search] │  └─────────────────────────────┘  │ │
│ Popular: Online MBA  BCA  B.Com …   │  │    ┌ Comparison sheet ───────┐    │ │
│ This demo lists 31 courses… (sample)│  │    │ Location ▓Mysuru▓ ▓Gurugram▓│ │ │
│                                     │  │    │ Fees     ▓…▓      ▓…▓     │    │ │
│                                     │  │    └──────────────────────────┘    │ │
│                                     │  └──────────────── Sample data ─────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
Mobile: search first (unchanged first viewport); the artefact follows as a single
compact comparison sheet after the popular searches.
```
- **Left:** unchanged content and priority. The search stays the primary action and the first focusable element after the header.
- **Right:** a **live artefact stack** built from service data. One course card and one compact comparison sheet overlap slightly, like papers on a desk, using `shadow-raised`; this is the only resting shadow on the page. It's labelled "Sample data".
  - **The signature moment:** on first load, the highlighter sweeps across the differing rows once (≈600ms total, staggered). It is instant under reduced motion.
- **Behaviour:** the artefact is decorative duplication of real features, so it is `aria-hidden`. A single visible link below it ("See how comparison works") jumps to the comparison section.
- **Why:** the empty right half becomes a demonstration of the product's two core ideas (structured facts and highlighted differences) without photos, statistics or fake dashboards.

### 8.2 Streams: index tiles
- An editorial index becomes **index tiles**: a 2-column (mobile) to 5-column (desktop) grid of compact tiles on a `surface` band.
- Each tile has a **stream glyph** (an in-house ink line icon, 28px), the name and a course count. Border `rule`, radius `layer`; on hover the border turns ink and the glyph gets a highlighter underline.
- **Why:** it keeps index speed but adds a recognisable visual anchor per stream, and the glyphs aid scanning. Not image cards.

### 8.3 Study modes: three notebooks
- Three **panels** side by side (stacked on mobile), each headed by a notebook illustration whose thickness and binding encode the mode:
  - Regular: a bound book.
  - Online: a notebook with a screen tab.
  - Distance: a parcel of printed modules.
- The **same row labels in the same order** in every panel ("How you study", "Schedule", "Often suits", "Exams"), aligned by a shared grid on desktop, so panels can still be compared across.
- "Check before you apply" sits at the panel foot in a `green-50` strip with a stamp glyph. This ties forward to the trust section.
- Surface: `ink-50` band; panels are `surface`.
- **Why:** it keeps the scannability of a table and adds identity and memorability. The illustration *encodes* the difference, so it isn't decoration.

### 8.4 Courses and where to study them: course cards (homepage only)
- The tabs stay. The Courses tab becomes **course teaser cards**: 3 per row on desktop, 2 on tablet, 1 on mobile, showing 4 cards then "See all courses".
- **Card content:**
  - level and duration as plain text
  - short name (H3)
  - full name
  - a fact strip: modes, total fee range, number of institutions offering it
  - footer link "Where to study"
- The Universities and Colleges tabs use **featured institution cards**: monogram, name, place and type, plus two facts.
- Cards: `surface`, border `rule`, radius `layer`, no resting shadow; the hover border turns ink.
- **Listings keep the ledger and profile rows.**
- **Why:** the homepage invites and the listing evaluates. Cards are the right container for a small, curated set that leads into the catalogue.

### 8.5 Comparison: the dark moment
- A full-bleed `ink-900` band, with the heading and lead in white and `ink-100`.
- The comparison table sits on it as a **white sheet** (radius `layer`, `shadow-overlay`), the same component with the highlighter difference marks. Supporting copy is on the left; the sheet is on the right, offset upward into the band edge (asymmetric).
- The CTA "Start your own comparison" is an inverted button (white fill, ink text).
- **Why:** comparison is the signature feature, so it gets the page's single highest-contrast moment. The highlighted differences on a white sheet against deep ink are the brand's most memorable image.

### 8.6 Trust and approvals: an attestation diagram
- Surface `green-50`.
- A **diagram**: three linked nodes, each with what it does and how to check it.
  - UGC recognises *the university*.
  - AICTE approves *technical programmes*.
  - NAAC accredits *institutional quality*.
- Each node uses a green-ink stamp glyph. A short "how to check, in three steps" checklist sits beside it.
- The "How information is shown here" text is kept as a narrow side column.
- The diagram has a full text equivalent: the node labels and descriptions *are* the text.
- **Why:** the three bodies are routinely confused, and a diagram separates their roles in one glance. Green ink carries the cultural meaning of attestation without claiming the platform verifies anything.

### 8.7 Guidance: a journey
- A horizontal **ink route** on desktop (vertical on mobile) connects three stations.
- Each station has a large condensed numeral (72px), a small illustration (form, phone, shortlist card), a title and one sentence.
- A **CTA panel** closes the sequence: `surface` with an ink border, containing "Get guidance" (primary) and "Chat on WhatsApp" (tertiary), plus the demo note.
- Surface: `paper`, which is light after the green trust section.
- **Why:** it really is a sequence, so a drawn route is honest structure. It gives the conversion section a visual payoff instead of three paragraphs.

### 8.8 Articles: an editorial band
- Surface `kraft-50`.
- The **featured article** is a large card with a **kraft cover** (`kraft-100`, category illustration, title on the cover in `ink-900`), excerpt and metadata.
- **Three article cards** each have a small cover (the same system, smaller illustration).
- Asymmetric layout: featured 7 columns, list 5 columns.
- **Why:** articles are content, and a cover system gives them editorial presence before licensed imagery exists. Kraft carries the "study notebook" identity.

## 9. Section rhythm (new)

```text
1 Hero ........... paper + ink-50 artefact panel ... split, open, live product
2 Streams ........ surface band .................... tiles grid (index)
3 Study modes .... ink-50 band ..................... three illustrated panels
4 Courses ........ paper ........................... cards (invitation)
5 Comparison ..... INK-900 (dark) .................. asymmetric, white sheet
6 Trust .......... green-50 ........................ diagram + checklist
7 Guidance ....... paper ........................... drawn journey + CTA panel
8 Articles ....... kraft-50 ........................ editorial covers, asymmetric
  Footer ......... paper + top rule ................ unchanged
```

Rules:
- **No two adjacent sections share a surface.** Paper may return after a coloured band.
- **No two adjacent sections share a composition type** (grid, panels, cards, split, diagram, journey, editorial).
- **One dark band per page.** It is never next to the footer, and the footer is never dark.
- **Section padding varies with weight:** dense modules (streams) 56–64px; feature moments (comparison, guidance) 96–112px on desktop.
- **Section openings vary.** Not every section needs a description line; some open with the visual (comparison, guidance), some with the heading only.
- **Listings, detail and compare pages** use a calmer rhythm: one header band (`surface` or `ink-50`), then paper. Their identity comes from the artefacts (highlighter, monograms, sample labels), not from colour.

## 10. Card vs row strategy (supersedes v1 §7 "Cards" and §9 usage table)

| Use cards for | Use rows or tables for |
|---|---|
| Homepage discovery modules (stream tiles, mode panels) | Listings (universities, colleges, courses) |
| Course teasers on the homepage | Comparison (desktop table / mobile list) |
| Featured institutions on the homepage | Dense factual data (key facts, fees) |
| Article teasers and the featured article | Offerings ("where to study") |
| Guidance modules and the CTA panel | Search results |
| Empty-state suggestions (≤3) | Filters, chips, pagination |
| Related items on detail pages (≤4) | Anything users scan *down* to compare |

Rules:
- **Cards invite; rows let people evaluate.** If users will compare more than four items on the same attributes, use rows.
- **Card anatomy:** `surface`, 1px `rule` border, radius `layer` (10px), padding 20/24px, no resting shadow, ink border on hover or focus-within. One primary link per card; the whole card is clickable via an expanded link target, not nested links.
- **Facts inside cards** use the same labelled-fact pattern as rows, so the visual language stays shared.
- **No badges** on cards ("Top", "Best", "Popular"). Level and mode are plain text.

## 11. Surface strategy (supersedes v1 §4's "one tinted band" rule)

| Surface | Token | Role |
|---|---|---|
| Paper | `paper` #F6F7FB | Default page and rest sections |
| Surface | `surface` #FFFFFF | Cards, sheets, panels, index band |
| Ink tint | `ink-50` | Brand moments: hero artefact panel, study modes, listing header band |
| Green tint | `green-50` | Trust and recognition content only |
| Kraft tint | `kraft-50` / `kraft-100` | Editorial content only (articles, guides) |
| Deep ink | `ink-900` | One dark moment per page |

- At most **four surface treatments per page**, not counting paper.
- Every coloured surface has a **content reason** that matches its family's purpose.
- Section edges are crisp: a hard colour change, no fades, no wave dividers.

## 12. Dark and light strategy (new)

- **Light-dominant.** A dark band is a spotlight. On the homepage it's the comparison; on detail pages (later) it could be the "Where to study" offerings or the enquiry panel, never both.
- **On `ink-900`:**
  - Text is white (headings) and `ink-100` (body).
  - The primary button is inverted (white fill, ink text).
  - Links are white and underlined.
  - The focus ring is the highlighter (existing `.on-ink` rule).
  - Content that needs reading density (tables) sits on a white sheet *within* the dark band; it is not set in light-on-dark.
- No dark mode in Phase 1 (unchanged). The dark band is a composition device, not a theme.

## 13. Responsive implications

| Element | Mobile (360–767) | Tablet (768–1023) | Desktop (≥1024) |
|---|---|---|---|
| Hero | Search first viewport (unchanged); compact comparison sheet after popular searches; no overlap stack | Same as mobile, sheet at 2/3 width | Split 7/5 columns with an overlapping artefact stack |
| Stream tiles | 2 columns | 3 columns | 5 columns |
| Mode panels | Stacked, each a full-width panel; labels inline | Stacked or 3 columns from 900px | 3 columns, shared row grid |
| Course cards | 1 column, 4 cards | 2 columns | 3 columns |
| Comparison band | Full-bleed dark; sheet full width (mobile list version); copy above | Copy above, sheet below | Asymmetric: copy 4 columns, sheet 8 columns offset |
| Trust diagram | Vertical chain of nodes | Vertical, with checklist beside | Horizontal chain plus checklist |
| Guidance journey | Vertical route on the left edge | Vertical | Horizontal route |
| Articles | Featured card, then list cards | Featured full, 2 columns below | 7/5 asymmetric |

- Never introduce swipe-only carousels. Everything stacks or wraps.
- Illustrations scale down or simplify on mobile (fewer elements), and never push the search or the first fact below the first viewport.
- The touch-target, overflow and 200% text rules are unchanged.

## 14. Accessibility implications

- **Contrast:** every supporting pairing in §5 passes AA. Re-measure the implemented colours in the browser. Text on illustrated surfaces sits on solid fills, never over illustration.
- **Dark band:** the focus ring switches to the highlighter; the inverted button keeps a visible focus; there is no light-grey-on-dark small text (minimum muted `#B9C3E6`, 8.2:1).
- **Illustrations:** decorative ones are `aria-hidden`. Explanatory diagrams (trust) put their meaning in real text, with SVG used for connectors only. Mode notebooks are decorative because the panels carry the text.
- **Hero artefact:** `aria-hidden`, because it duplicates real features further down, with a visible text link to the comparison section. It must not receive focus.
- **Cards:** one link per card with an expanded hit area; headings stay in order (cards use H3 under the section H2).
- **Motion:** the single highlighter sweep is skipped under `prefers-reduced-motion`, and the final state renders immediately. No scroll-triggered entrances.
- **Colour is never the only signal.** Surface families group content but carry no meaning that isn't also in text.

## 15. Anti-patterns (extends v1 §18)

- **Rainbow page:** every section a different saturated colour, or two supporting families in one section.
- **Supporting colours as CTAs or status:** green buttons, kraft buttons, green as "success".
- **Highlighter as decoration:** yellow backgrounds, yellow headings, highlighter on text that isn't a match, difference or selection.
- **Dark + single neon accent as a theme:** the dark band is one moment with a white sheet, never a dark site with yellow text.
- **Kraft as the page background:** it would produce the generic cream-and-clay look.
- **Illustration filler:** blobs, waves, isometric scenes, mascots, people, floating shapes, illustrations that explain nothing.
- **Cards in listings or comparison:** the evaluate register stays rows and tables.
- **Statistics bands, logo walls, testimonial carousels, "trusted by" strips.** Still banned; nothing to show truthfully.
- **Wave or angled section dividers, gradient fades between bands.**
- **Every card with an icon in a coloured circle:** the generic feature-card look. Glyphs only where they aid recognition (streams).
- **Template chrome:** all-caps eyebrows, `01 / 02 / 03` numbering on non-sequences, arrows appended to links.

## 16. Explicit comparison with v1

| Aspect | v1 (current) | v2 (proposed) |
|---|---|---|
| Accent colours | Ink (primary) + highlighter (semantic) | Same two, **plus** three supporting families (deep ink, green ink, kraft) for surfaces and illustration only |
| Surfaces per page | Paper/white + one `ink-50` band | Up to four treatments with a planned sequence; one dark band |
| Hero | Left-aligned search, empty right half | Split: search left, live product artefact right; one signature highlighter sweep |
| Streams | Text index with rules | Index tiles with stream glyphs |
| Study modes | Comparison table (stacked blocks on mobile) | Three illustrated notebook panels with aligned rows |
| Homepage courses | Ledger rows (same as listing) | Course teaser cards; listings keep ledger rows |
| Comparison section | `ink-50` band, table | Dark `ink-900` band with a white comparison sheet, asymmetric |
| Trust | Two text columns | Attestation diagram (green ink) + checklist |
| Guidance | Three numbered text columns | Drawn ink route with stations + CTA panel |
| Articles | Text list + ruled featured item | Kraft cover system, asymmetric editorial band |
| Illustration | None | In-house "ink on paper" line style with stationery subjects |
| Cards | Teasers only (≤4) | Homepage invitation vocabulary; rows remain for evaluation |
| Section headings | 28px H2 everywhere | Homepage `type-section` up to 40px; `type-lead` paragraph |
| Motion | Transitions only | Plus one orchestrated highlighter sweep (hero) |
| Listings / filters / compare logic | — | **Unchanged** |

### 16.1 First-pass defaults rejected in this exercise (`frontend-design` review)

| Generic first idea | Rejected because | v2 choice |
|---|---|---|
| Hero illustration of students with books, or a gradient blob scene | People imagery and blobs are the category default and say nothing about *this* product | Live artefact stack from real data |
| Teal + amber or orange secondary palette (the library's LMS default) | Generic edtech; amber competes with the highlighter | Deep ink, green ink and kraft, all from Indian stationery and documents |
| Dark CTA band before a dark footer | The classic template ending | A dark band only for the comparison, mid-page; light footer |
| Colourful icon-in-circle feature cards for study modes | The SaaS feature-card kit | Illustrated notebooks whose form encodes the difference |
| A statistics band ("10,000+ students") for trust | Invented numbers | A diagram of what each approval body actually does |
| A cream background for warmth | AI-default look | Kraft restricted to editorial covers |

## 17. Rationale for each significant change

1. **Supporting palette:** surfaces need colour to create grouping and tempo. Each family comes from the student's real world (ink bottle, attested document, notebook cover) and has a single job, so variety doesn't dilute meaning or compete with CTAs.
2. **Live artefact hero:** the strongest honest visual for a discovery product is the product itself. It balances the composition, shows the two core ideas immediately, and makes no claims.
3. **Dark comparison band:** a single high-contrast moment gives the page a focal point and pace, and spends it on the feature that sets the product apart.
4. **Cards on the homepage, rows in listings:** inviting and evaluating are different tasks. Separating the registers lets the homepage feel compelling without weakening the catalogue's scannability.
5. **Illustration in an "ink on paper" style:** visual anchors were the biggest gap. A disciplined in-house style can explain things (modes, recognition, journey) and carry identity without stock imagery or fake people.
6. **Attestation diagram:** trust is earned by clarity. A diagram makes the three bodies' different roles obvious, and green ink adds cultural resonance without implying platform verification.
7. **Explicit rhythm rules:** they prevent the heading → paragraph → table repetition that made v1 feel plain, and they stop v2 from tipping into the opposite failure (a rainbow page).
8. **`type-section` and `type-lead`:** larger, condensed section headings mark the transitions between richer compositions. The lead size fills the jump between heading and body.
9. **One orchestrated motion:** a single highlighter sweep gives the brand a signature moment tied to its meaning. Scattered entrances would read as generated.

## 18. Adoption plan (for approval)

1. Review this proposal. Decide on the three supporting families and the dark band.
2. On approval:
   - Merge v2 into DESIGN-DIRECTION.md (sections marked "supersedes") and record the change in CLAUDE.md.
   - Add the tokens (`ink-900`, `green-*`, `kraft-*`, `type-section`, `type-lead`).
   - Build the illustration set (stream glyphs, three notebooks, stamp, route stations, kraft covers) as SVG components.
3. Re-implement the homepage sections in the §9 order. Listings change only in their header band.
4. Run an `impeccable` review and a contrast re-check, then fix the important findings.

**Open questions:**
- (a) Is green ink's cultural reading right for your audience, or would the client prefer a neutral slate for the trust surface?
- (b) Is licensed editorial photography for article covers in scope for the demo, or should all covers be illustrated?
- (c) Should the dark band also appear on detail pages later (offerings), or stay homepage-only?
