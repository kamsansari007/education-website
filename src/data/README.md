# Demo data (Phase 1)

All institutions, fees, establishment years and approval holdings in this folder are **fictional**.
Institution names were checked against web search (Oct 2026) to avoid matching real institutions.

Rules (see CLAUDE.md §13):

- One source per entity; relationships by ID.
- Derived values (fee ranges, modes, counts) are computed in `src/services/static`, not stored here.
- Only `src/services/static` may import from this folder.
