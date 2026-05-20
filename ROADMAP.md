# Roadmap — Features to Build

> **Purpose**: A backlog of features observed on the live https://www.citylaila.com/ site that the clone does **not** yet implement. This file is for *upcoming* work; use [ISSUES.md](ISSUES.md) for bugs in code that already exists.
>
> **Source**: 2026-05-20 walk-through of the live site by the project owner.

---

## Format

Each item has:
- **What** — a short description of the feature
- **Behaviour on the live site** — concrete user-visible behaviour
- **What we need to build** — components, routes, data, state
- **Dependencies** — other items in this file (or existing code) it relies on

Tick items off (`[ ]` → `[x]`) and move them to the **Done** section when shipped.

---

## Open

### F1. `/packages` page (Header → Packages tab)

- **What**: Holiday-packages landing page
- **Behaviour on the live site**: Clicking the **Packages** nav link goes to `https://www.citylaila.com/holidays`. The page reuses several homepage components (banners, deal carousels, etc.) but is package-focused rather than attractions-focused.
- **What we need to build**:
  - New route at `src/app/packages/page.tsx` (or `holidays/page.tsx` if we match the live URL — *decide before starting*).
  - Reuse from homepage where possible: `HeroSection` (with a packages-specific banner), `SummerOffers`, `ExclusiveDealWide`, `TravelGuidesSection`, `PartnerLogosSection`, `StatsBar`, `TestimonialsSection`.
  - New section variants needed: a holiday-package card (currently we have `AttractionCard` — packages have different metadata: nights, destinations, inclusions).
  - Update [Header.tsx](src/components/Header.tsx) `navLinks` — the "Packages" entry currently points to `/packages`; align this with whichever route we ship.
- **Dependencies**: None

### ~~F2. Search Page Template + `/search` route~~ — moved to **Done** below ✅

### F3. Category-dropdown destination pages (Header → All Categories ▾)

- **What**: 6 of the 7 items in the **All Categories** dropdown lead to listing pages that share the **Search Page Template** (F2). The 7th item (Desert Safari Tours) is a single-attraction detail page, not a listing.

| # | Dropdown label | Live URL | Template |
|---|---|---|---|
| a | City Tours | `/city-tours/tours-by-type/city-tours-290159.aspx` | Search Page Template |
| b | Adventure Tours | `/city-tours/tours-by-type/adventure-tours-290170.aspx` | Search Page Template |
| c | Dhow Cruise | `/city-tours/tours-by-type/dhow-cruise-289851.aspx` | Search Page Template |
| d | **Desert Safari Tours** | `/city-tour/tour-details/desert-safari-dubai-online-tickets-13247.aspx` | **Attraction Detail Page** (different — see F3.d) |
| e | Private Airport Transfer | `/city-tours/tours-by-type/airport-transfers-290165.aspx` | Search Page Template |
| f | Cruise and Boat Tours | `/city-tours/tours-by-type/cruise-and-boat-tours-290172.aspx` | Search Page Template |
| g | Water Activities | `/city-tours/tours-by-type/water-activities-289867.aspx` | Search Page Template |

- **What we need to build**:
  - Decide on a clean URL strategy. Two viable options:
    - (i) Replicate the live URLs verbatim (`/city-tours/tours-by-type/[slug].aspx`) using a catch-all dynamic route. Painful but mimics the upstream.
    - (ii) Use our own clean URLs (`/category/city-tours`, etc.) and keep the dropdown labels mapped via the existing `categoryDropdown` array in [Header.tsx](src/components/Header.tsx). **Recommended**.
  - For options **a, b, c, e, f, g**: a single shared route renders the Search Page Template seeded with the right `attractions` subset and title.
  - For option **d (Desert Safari Tours)**: a separate **Attraction Detail Page** (not yet built). This is its own feature — track it as **F3.d** below.
- **Dependencies**: **F2** must be built first.

### F3.d. Attraction Detail Page

- **What**: Single-attraction details page (gallery, description, tickets/variants picker, price calculator, reviews). Surfaces under Desert Safari Tours today, but the template will power every attraction detail page across the site.
- **Behaviour on the live site**: `https://www.citylaila.com/city-tour/tour-details/desert-safari-dubai-online-tickets-13247.aspx`
- **What we need to build**: New route at `src/app/attractions/[slug]/page.tsx` (the slug-style URL already exists in `AttractionCard` links). Components: gallery, sticky booking sidebar, tabs (Overview / Highlights / Inclusions / Reviews / Location).
- **Dependencies**: None — independent template.

### F4. Language translation (i18n)

- **What**: Selecting an entry in the header language dropdown should translate page copy into that language. Currently the dropdown only updates local state.
- **Behaviour on the live site**: The live site uses Weglot (`wg_537da8d89bb5411280498c92482119934`) — clicking a language re-renders the page in that locale.
- **What we need to build**:
  - Pick an approach:
    - (i) **Weglot** — drop-in JS widget that mirrors the live site exactly. Smallest engineering effort, but external dependency + recurring cost.
    - (ii) **next-intl** or **next-i18next** — first-party React i18n with message catalogues per locale. More work upfront (extracting strings to `messages/<locale>.json`), but no third-party JS at runtime, full SSG-friendly, free.
  - 6 locales are already wired in the [Header.tsx](src/components/Header.tsx) `languages` array: EN, AR, RU, ES, ZH, FR. **AR requires RTL** (toggle `dir="rtl"` on `<html>` and audit any direction-sensitive CSS — flexbox, icons, carousels).
- **Dependencies**: None, but it touches every component that renders user-facing text. Best done before too many more strings are added.

### F5. Currency conversion

- **What**: Selecting an entry in the header currency dropdown should re-display every price across the site in that currency. Currently the dropdown only updates local state.
- **Behaviour on the live site**: Live site converts on the fly (presumably via a daily-snapshot FX-rate table; values are not real-time).
- **What we need to build**:
  - A `CurrencyContext` (React context) holding the active currency and the FX-rate table (base = AED).
  - A `<Price value={…} currency="AED" />` component that reads the context and renders the converted amount with the correct symbol — already inventoried in `currencies` in [Header.tsx](src/components/Header.tsx).
  - Replace all hard-coded "AED 123" renderings in [AttractionCard.tsx](src/components/AttractionCard.tsx), [ExclusiveDealWide.tsx](src/components/ExclusiveDealWide.tsx), `ExclusiveDealsSection`, `ComboToursSection`, etc. with `<Price>`.
  - FX-rate source: either a hard-coded snapshot JSON in `src/data/fx.json` (refreshed manually) or a build-time fetch from a public API. **Hard-coded snapshot is recommended for an SSG-only site.**
- **Dependencies**: None.

---

## Observations — known-broken links on the **live site**

Recorded so we know not to "fix" them by faithfully matching the upstream:

- **Visa** (`navLinks` Visa entry → `https://visa.citylaila.com/`) — opens a Cloudflare default page (`/cgi-sys/defaultwebpage.cgi`) showing a SORRY message. Upstream is down. **Action**: leave our link pointing to the same upstream URL; do not implement a Visa subdomain ourselves.
- **Contact Us** on the live site (`https://www.citylaila.com/contact-us`) — hangs and eventually returns "The page isn't working" in the browser. Our local [`/contact-us`](src/app/contact-us/page.tsx) already works.

---

## Done

### F2. Search Page Template + `/search` route ✅ (2026-05-20, redesigned 2026-05-20)

- Canonical reusable listing template: [src/components/SearchPageTemplate.tsx](src/components/SearchPageTemplate.tsx) — client component (needs interactive state)
  - Props: `title`, `subtitle?`, `attractions`, `emptyMessage?`, `pageSize?` (default **20**).
  - Layout (matches live citylaila.com search page per `references/searchpage/`):
    - **Left sidebar** (`Col md=4 lg=3`, sticky): "Search Your Tour" input + Bootstrap `Accordion` with three sections — **Price** (dual-handle range slider above MIN/MAX number inputs; slider bounds derived from the actual `priceFrom` min/max in the current attraction set), **Popular Filters** (checkboxes: Today Available, Instant Confirm — stub, not yet wired to data), **Tour Category** (checkboxes generated from categories present in the result set).
    - **Right column** (`Col md=8 lg=9`): subtle title/subtitle, **Sort By** inline-tab bar (Most Popular / Lowest Price / Highest Price / Recommended — active option filled with dark navy), vertical list of `SearchResultRow`s, **pagination** (Bootstrap `Pagination` with first/last + current ± 1 + ellipses, only shown when `totalPages > 1`).
  - Internal state: `filterText`, `priceMin/Max`, `popularFilters: Set<string>`, `selectedCategories: Set<string>`, `sortBy`, `page`. All filter changes reset `page` to 1.
  - Sort handlers: `popular` & `recommended` → bookedCount desc; `price-asc`/`price-desc` → priceFrom.
- Card component: [src/components/SearchResultRow.tsx](src/components/SearchResultRow.tsx) — grid (180px image | content | 200px action column). Title, ★rating + reviews + booked count, three pill links (Description / Timings / Inclusion — visual only for now, link to attraction-detail page), "Get Instant Confirm" badge (orange ⚡), "From" + price + strikethrough original + "Book Now" CTA.
- Route: [src/app/search/page.tsx](src/app/search/page.tsx) — server component, exports `metadata`, wraps `<SearchResults />` in `<Suspense>` (required by Next 16 + static export when using `useSearchParams`).
- Client component: [src/app/search/SearchResults.tsx](src/app/search/SearchResults.tsx) — reads `?q=…` via `useSearchParams()`, tokenises the query (`split /\s+/`) and does a "contains-all" match across `name`, `category` (de-slugged), `city`, and `tags`. Renders the template with a results-count subtitle.
- URL shape: settled on `/search?q=…` (recommended option from the original spec); we did **not** mirror the live site's `/water%20sports-tours` path style.
- Wired up: the header search handler already pushes to `/search?q=…`; no change needed.
- Notes / known gaps:
  - **Popular Filters checkboxes are visual stubs** — `Attraction` doesn't have `instantConfirm` / `availableToday` fields yet, so toggling them currently has no effect. Add those fields (or wire to a synthetic rule) when needed.
  - The sidebar "Search Your Tour" input narrows results **on top of** the URL `?q=` (additive, not URL-syncing). Decide later whether to push back to URL.
  - "Description / Timings / Inclusion" pills on each card are visual only; will become real anchors when F3.d (Attraction Detail Page) lands.
- Build verification: `npm run build` ✓ — 17 static pages.