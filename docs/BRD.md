# Business Requirements Document (BRD)

**Product:** Education discovery & lead-generation platform (working name — brand TBD)
**Document status:** Draft v0.1 — for client review
**Phase covered in detail:** Phase 1 (static frontend demonstration)
**Related documents:** [PRD.md](PRD.md) · [PHASE-ROADMAP.md](PHASE-ROADMAP.md)

---

## 1. Business Context

The business wants to operate an education-focused website where students and parents can discover universities, colleges and courses, evaluate options, and submit enquiries. Those enquiries (leads) are the commercial output of the platform: they are later handled by counsellors and, over time, by a full lead-management and application workflow.

The client supplied two reference products for **category and user-flow understanding only**:

- `findmycollege.com`
- `learningshala.com`

These are not design, copy, branding or implementation sources. The platform must establish its own identity.

### 1.1 Observations from category research

Observed on learningshala.com. findmycollege.com could not be fetched for automated review (it returned an empty response), so it still needs a manual review in a browser.

| Observation | Implication for this product |
|---|---|
| Entities are courses, specializations, universities, university-specific course offerings and approvals/accreditations | The data model must separate a *course* (e.g. MBA) from an *offering* of that course at an institution |
| Learning **mode** (online / distance / regular) is a primary way to segment | Mode must be a first-class filter |
| Approvals and accreditations (e.g. UGC, AICTE, NAAC) are major trust signals | Show them prominently and make them filterable, but use only verified data |
| Listing pages are thin: no filters, and fees and approvals are missing from cards | **Opportunity:** strong filtering and useful listing cards set us apart |
| Detail pages are very long (15+ sections) and dense | **Opportunity:** structured, scannable detail pages with in-page navigation |
| A dozen or more CTAs per page, repeated counsellor carousels and urgency messaging | **Opportunity:** fewer, well-placed CTAs that build trust and still convert |
| Comparison is a strong feature (up to 3 institutions, many attributes) and acts as a lead-capture point | Comparison belongs in the core journey |

## 2. Business Problem

Students and parents choosing higher education face:

1. **Fragmented information.** Fees, approvals, eligibility and course details are spread across many institution sites.
2. **Low trust.** Many aggregator sites are cluttered, aggressive with CTAs, and unclear about how reliable their data is.
3. **Difficult comparison.** Options are hard to compare side by side on the attributes that matter.
4. **No easy route to human guidance.** Users lack a low-friction, trustworthy way to reach a counsellor at the moment they are ready.

The business currently has **no platform** that captures this demand and turns it into qualified enquiries.

## 3. Business Goals

| # | Goal | Phase |
|---|---|---|
| G1 | Validate the product direction and experience with the client through a polished demo | 1 |
| G2 | Establish a frontend that can connect to a real backend without being rewritten | 1 |
| G3 | Capture qualified enquiries (leads) with useful context: what the user viewed and was interested in | 2+ |
| G4 | Give counsellors a way to manage, assign and follow up leads | 3 |
| G5 | Support the student journey through to application | 4 |
| G6 | Improve conversion and efficiency through automation, analytics and AI | 5 |
| G7 | Build organic acquisition through discoverable content and pages (SEO) | 2+ (foundations in 1) |

## 4. Target Users

| User | Description | Primary need |
|---|---|---|
| **Student (primary)** | Typically 16–30. Includes school leavers looking for UG, graduates looking for PG, and working professionals looking for online or distance programmes | Find suitable courses and institutions, understand fees and eligibility, get guidance |
| **Parent / guardian** | Often a co-decision-maker and frequently the financial decision-maker | Trust signals, fees, approvals, outcomes, a person to talk to |
| **Counsellor (internal, future)** | Business staff who handle enquiries | Context-rich leads, assignment and follow-up tools (Phase 3+) |
| **Content / admin team (internal, future)** | Maintains institutions, courses and articles | Content management (Phase 3) |
| **Client stakeholders (Phase 1)** | Business owners evaluating the demo | A believable, end-to-end experience to validate direction |

## 5. Business Journey

```text
Awareness            Discovery              Evaluation               Conversion            (Future) Fulfilment
(search, social,  →  (browse, search,   →   (detail pages,       →   (enquiry form,    →   (counsellor follow-up,
 articles)            filter)                compare)                 WhatsApp)              application, admission)
```

Core product journey: **Discover → Search/Browse → Filter → View Details → Compare → Enquire**

The business outcome is that the user **enquires**. Every page should offer a clear, non-intrusive path to enquiry that fits the context.

## 6. Phase 1 Scope

Phase 1 is a **frontend-only, static React demonstration** hosted on Vercel, using structured demo data.

In scope:

- Homepage
- University discovery (listing, search, filters) and university detail
- College discovery (listing, search, filters) and college detail
- Course discovery (listing, search, filters) and course detail
- Global search
- Basic comparison (side by side, same entity type)
- Enquiry experience (form with validation and a confirmation state; **no real submission or storage**)
- WhatsApp CTA (deep link to a placeholder or demo number)
- Articles/blog listing and article detail
- About and Contact pages
- Responsive mobile, tablet and desktop experience
- A frontend architecture that is ready for a future API

## 7. Future Scope (not Phase 1)

Student accounts · saved colleges/courses · advanced comparison · counsellor management · lead CRM · lead assignment · follow-up management · application tracking · document uploads · payments · WhatsApp/SMS automation · analytics · AI recommendations · AI chatbot.

These are sequenced in [PHASE-ROADMAP.md](PHASE-ROADMAP.md).

## 8. Exclusions (Phase 1)

- Backend, API server or database
- Authentication or user accounts
- Real lead capture, storage or delivery (email, CRM or otherwise)
- Production CRM or counsellor tools
- Payment integration
- WhatsApp Business API or SMS (only a simple `wa.me` link is used)
- AI features
- Real institution data presented as fact
- Production SEO indexing of the demo (the demo should not be indexed)
- Copying branding, copy, assets, layouts or implementation from the reference sites

## 9. Business Value

| Value | How Phase 1 delivers it |
|---|---|
| **Reduced investment risk** | The product direction is validated visually before backend spend |
| **Faster stakeholder alignment** | A clickable demo replaces abstract discussion |
| **Reusable foundation** | The routes, components, data contracts and design system carry forward into Phase 2 |
| **Differentiation** | Cleaner discovery, useful filters, honest trust signals and calmer CTAs set the product apart from cluttered competitors |
| **Defined lead contract** | The enquiry data shape is agreed early, so Phase 2 lead capture is straightforward |

## 10. Success Criteria (Phase 1)

1. The client can complete the full core journey (Discover → Enquire) on mobile and desktop without dead ends.
2. The client signs off on the product direction: IA, page set, visual identity and enquiry approach.
3. The demo is deployed on Vercel at a shareable URL.
4. No invented factual claims appear. All sample content is clearly identified as demo data.
5. The frontend data layer is separated from UI, so swapping static data for API calls is localised (see PRD §18).
6. The accessibility baseline is met: keyboard navigable, visible focus, labelled forms, adequate contrast (WCAG 2.2 AA target).
7. Responsive quality has been checked at mobile, tablet and desktop widths.
8. The client's feedback is captured and folded into the Phase 2 requirements.

## 11. Assumptions

| # | Assumption | Needs client confirmation |
|---|---|---|
| A1 | **India** is the primary market (both reference sites are Indian; approvals such as UGC, AICTE and NAAC are relevant) | Yes |
| A2 | The platform covers **regular (on-campus), online and distance** education. The relative emphasis is to be confirmed | Yes |
| A3 | The site is in English. Currency is INR | Yes |
| A4 | Demo data uses **fictional institutions** (or clearly labelled samples) so that we do not publish inaccurate facts about real institutions | Yes |
| A5 | The brand name, logo, WhatsApp number, phone and email are not yet available. Placeholders will be used | Yes. Please supply them |
| A6 | Revenue model is lead-based (enquiries passed to or handled by counsellors). The platform UX should stay honest and avoid dark patterns | Yes |
| A7 | "University" means a degree-granting institution. "College" means an institution (often affiliated to a university) that offers programmes | Confirm with client's domain team |
| A8 | Comparison in Phase 1 is limited to items of the **same type** (university vs university, etc.), up to 3 items | Yes |
| A9 | Enquiries will in future need consent capture, in line with India's Digital Personal Data Protection Act, 2023 | Legal review required before Phase 2 |
| A10 | Vercel is acceptable for Phase 1 hosting. Phase 2 backend hosting is undecided | Yes |

## 12. Future Expansion

- **Phase 2:** Node.js + Express + MySQL backend; real content and lead capture; SEO-capable rendering.
- **Phase 3:** Admin CMS, lead CRM, assignment and follow-ups, roles and permissions.
- **Phase 4:** Student accounts, saved items, advanced comparison, counsellor workspace, applications, documents, payments.
- **Phase 5:** WhatsApp/SMS automation, analytics, AI recommendations, AI chatbot.

See [PHASE-ROADMAP.md](PHASE-ROADMAP.md) for objectives, deliverables and exit criteria per phase.

## 13. Open Questions for the Client

1. Brand name, logo and any existing brand guidelines?
2. Focus: on-campus, online/distance, or both equally?
3. Are there specific institutions or partners the business already works with? Can their real data be used, and who verifies it?
4. Which enquiry fields are needed for counsellors to act on a lead?
5. The WhatsApp number and the business contact details to show?
6. Geographic focus (all-India, or particular states or cities)?
7. Will counsellors be in-house, partner-based, or both? (Affects Phase 3 design.)
