<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# CityLaila Reference Material

All reference files live in `references/`. Always consult these before writing or changing any UI.

## Reference Files

| File | Description |
|---|---|
| `references/view-source_https___www.citylaila.com.html` | Full HTML source of the live citylaila.com homepage (Chrome view-source format) |
| `references/screenshot-scroll-0.png` | Hero section — top of page |
| `references/screenshot-scroll-1.png` | Summer Offers + Why Book with City Laila + Top trending cities |
| `references/screenshot-scroll-2.png` | Exclusive Deals on Dubai's Top Experiences + Combo Tours |
| `references/screenshot-scroll-3.png` | Exclusive Deal (wide cards) + Travel Guides & Trending Experiences |
| `references/screenshot-scroll-4.png` | More blog posts + Ticket Seller Partners + Musement at a glance + Loved by Travellers |
| `references/screenshot-scroll-5.png` | Testimonials continued + Footer |
| `references/searchpage/screenshot-scroll-1.png` | Search results page — top: filter sidebar + Sort By + first 3 results |
| `references/searchpage/screenshot-scroll-2.png` | Search results page — bottom: remaining results + pagination |

---

## Homepage Section Order (top → bottom)

Derived from screenshots and HTML source. Implement sections **in this exact order**:

1. **Header** — sticky, white bg
2. **Hero / Banner** — illustrated (NOT photo), animated 3D character, search bar, CTA
3. **Award Bar** — "Proud Winner of The 2024 Best Customer Satisfaction Award in ME"
4. **Summer Offers** — 3 promotional banner cards (carousel/slider)
5. **Why Book with City Laila?** — 4 horizontal cards (icon-left + text-right)
6. **Top things to do in trending cities** — horizontal city slider
7. **Exclusive Deals on Dubai's Top Experiences** — horizontal `AttractionCard` carousel + "View All"; arrows overlay left/right edges (`cl-carousel-shell` pattern)
8. **Combo Tours** — horizontal `AttractionCard` carousel + "View All"; arrows overlay left/right edges
9. **Exclusive Deal** — horizontal carousel of image cards with bottom-overlay title + price + "Book Now"
10. **CityLaila Travel Guides & Trending Experiences** — blog post list (left) + featured image (right)
11. **Ticket Seller Partner** — horizontal logo slider
12. **Musement at a glance** — 4 stat counters
13. **Loved by Travellers. Trusted by Many** — dark-bg testimonial carousel
14. **Footer** — white background, 4 columns

---

## Header (screenshot-scroll-0.png)

- **Logo**: CDN image (`/assets/WhitelableLogo/1/2/logo.webp`). The pink-red wordmark only appears as a fallback in the mobile-drawer header.
- **Nav links** (left to right): Home · Activities · Packages · Visa · All Categories ▼ · Contact Us
- **Right side**: language dropdown · currency dropdown · cart icon (0) · "Log in / sign up" button (orange, pill-shaped)
  - **Language dropdown** (`react-bootstrap` `Dropdown` with `.cl-header-dd` chrome): shows `🇦🇪 EN ▾`; menu items list English (🇦🇪 EN), Arabic (🇸🇦 AR), Russian (🇷🇺 RU), Spanish (🇪🇸 ES), Chinese (🇨🇳 ZH), and French (🇫🇷 FR). Active item is highlighted in `cl-bg-light` with primary-blue text.
  - **Currency dropdown**: shows `AED ▾`; menu lists 12 currencies — AED, USD, EUR, GBP, SAR, INR, MYR, OMR, THB, NZD, EGP, KWD. Each row shows code (bold) + full name (secondary grey) on the left, and the **actual currency symbol** right-aligned (`.cl-currency-symbol`) — e.g. `AED  UAE Dirham                                  د.إ`. No em-dash separator.
  - Selections are component-local state (`useState`) today; no global currency conversion yet.
- **Search bar**: Full-width bar BELOW the nav, inside a white strip — placeholder "Find your activities", orange search button on right
- There is NO secondary service nav bar. The search bar sits directly below the main nav.

---

## Hero / Banner (screenshot-scroll-0.png)

- **Background**: Illustrated/cartoon world map background — light blue and cream colours — NOT a photo
- **3D animated character**: Woman in hijab holding suitcase, right side of hero
- **Headline**: "Discover the Top Things to Do & Plan Your Perfect Trip"
- **Subtext**: "Instant confirmed tickets. Trusted experiences. Expert-planned holidays in 44+ countries."
- **CTA button**: "PLAN MY TRIP" — teal/blue colour, rounded, centred
- **Trust badges below CTA**: `⭐ 4.8 Rated  |  👥 1M+ Travelers  |  ✓ Instant Confirmation`
- Layout: text + CTA left/centre, 3D character right side

---

## Award Bar (screenshot-scroll-0.png)

- White background section immediately below hero
- Heading: **"Proud Winner of The 2024 Best Customer Satisfaction Award in ME"**
- Subtext: "Honoured For Achieving One of The Highest Travellers Ratings Globally • A Remarkable 4.8/5 Across All Major Review Platforms"
- Review platform logos in a row: **Facebook** (Excellent, 35K+ Reviews, 5.0) · **Google** (1000+ Reviews, 4.9) · **Trustpilot** (1000+ Reviews, 4.7) · **IATA** logo

---

## Summer Offers (screenshot-scroll-1.png)

- Section heading: **"Summer Offers"**
- 3 wide promotional banner cards in a row (or slider):
  - Card 1: "SUMMER SALE — up to 45% off" (Ferrari World imagery)
  - Card 2: "COMBO OFFER — up to 55% off"
  - Card 3: "SUMMER DEAL — Buy 1 & Get 1 Attraction FREE"
- Each card has a colourful background image and bold overlaid text

---

## Why Book with City Laila? (screenshot-scroll-1.png)

- Section heading: **"Why Book with City Laila?"** (left-aligned, `cl-section-title`)
- 4 **horizontal cards** (`Col xs=12 sm=6 lg=3`), each laid out as **icon-left + text-right** — *not* a centered vertical stack
- Card chrome (`.cl-whybook-card`): white bg, 1px `cl-border-light` border, `border-radius: .5rem`, padding `.85rem 1rem`, subtle `0 0 6px rgba(0,0,0,.04)` shadow
- Icon (`.cl-whybook-icon`): **48×48** CDN PNG (`/assets/static-banner/WebsiteWiseContentImage//2/...`), `object-fit: contain`, `flex: 0 0 48px`
- Body copy (`.cl-whybook-text`): 12px, `line-height: 1.5`, `cl-text-muted`
- Verbatim copy (4 items):
  1. "98% of bookings receive instant confirmation via Email & WhatsApp backed by 24/7 customer support."
  2. "Get unbeatable prices on UAE attractions, global tours & holiday packages. 95% of our products are listed at the lowest price in the market."
  3. "Rated 4.9 for fast service, trusted booking experience and personalised recommendations for every traveller."
  4. "Personalised recommendations for your budget & travel style + 24/7 WhatsApp support before, during & after your trip."

---

## Top Trending Cities (screenshot-scroll-1.png)

- Section heading: **"Top things to do in trending cities"**
- Horizontal **slider/carousel** (owl carousel) — NOT a static grid
- Left/right arrow navigation
- City cards visible: Dubai · Abu Dhabi · Bangkok · Pattaya (+ many more from HTML: Los Angeles, Las Vegas, Baku, Bali, London, Paris, etc.)
- Each city card: landscape photo, city name overlaid at bottom

---

## Attraction Card Design (screenshot-scroll-2.png)

Critical differences from current implementation:

- **Discount badge**: Coloured pill at the **top** of the image (e.g. "AED 100 off" in green/teal)
- **"Lowest Price Deal" badge**: Orange badge at the **bottom-left** of the image
- **Card body**: White, below image
  - Title (bold)
  - Star rating + review count + "booked" count (e.g. "45 Reviews / (150 booked)")
  - "Available Today"
  - "from" + **price in bold**
  - "Book Now" button (orange, right-aligned)
- No tags/pill badges visible on cards

---

## Exclusive Deals on Dubai's Top Experiences (screenshot-scroll-2.png)

- Section heading: **"Exclusive Deals on Dubai's Top Experiences"** + "View All →" link (right side, in the header)
- **Horizontal `AttractionCard` carousel** — *not* a 4-col grid. Cards are `cl-card-track-item` (`width: clamp(220px, 24vw, 280px)`), wrapped in `cl-card-track` (horizontal flex), inside `cl-hslider-viewport` (native horizontal scroll). Same pattern as Combo Tours, Destinations, Partner Logos, and Exclusive Deal carousels.
- Prev/Next arrows overlay the left and right edges of the viewport (`.cl-carousel-shell` + `.cl-carousel-arrow` — see [Carousel arrow pattern](#carousel-arrow-pattern) below).
- Attractions shown: Morning Safari · Desert Safari · The Dubai Balloon at Atlantis · Big Bus Tour Sightseeing Dubai · Hatta Wadi Ultimate Package · Jebel Jais Zipline · Helicopter Ride · Gyrocopter · Skydive Dubai

---

## Combo Tours (screenshot-scroll-2.png)

- Section heading: **"Combo Tours"** + "View All →" link (right side, in the header)
- **Horizontal `AttractionCard` carousel** — same card design and carousel pattern as the Exclusive Deals section above. Tinted `cl-bg-grey` section background.
- Prev/Next arrows overlay the left and right edges of the viewport (`.cl-carousel-shell` + `.cl-carousel-arrow`).
- Combos: Desert Safari + Frame + Dhow Cruise (Save 194 AED) · Aquarium + Green Planet (Save 146 AED) · Aquarium + Ski Dubai · Dubai Frame + City Tour + IMG (Save 314 AED) · IMG + Legoland Waterpark (Save 400 AED) · etc.

---

## Exclusive Deal — Carousel (screenshot-scroll-3.png)

- Section heading: **"Exclusive Deal"** (no other header controls)
- **Horizontal carousel**, ~3 cards visible per viewport on desktop. Native horizontal scroll + arrow controls overlaying the viewport's left/right edges (`.cl-carousel-shell` + `.cl-carousel-arrow` — same pattern as Destinations / Partner Logos / Exclusive Deals / Combo Tours) — *not* a vertical stack of wide image+text rows
- Each card:
  - Tall image, `aspect-ratio: 4 / 3`, width `clamp(260px, 32vw, 380px)`
  - Translucent **overlay panel at the bottom** of the image: title (white, 2-line clamp) + "from + price + strikethrough original" + orange "Book Now" button
  - Subtle image zoom on hover
- Products: Yas Island 3 parks + 1 FREE · Yas Island 4 parks + 1 free · Dubai Safari Park + Train Safari Tour · Dubai Aquarium · Aquaventure · IMG Buy 1 Get 1 · Louvre Abu Dhabi · Miracle Garden · View at The Palm · Yas Island 1 day

---

## Travel Guides & Blog (screenshot-scroll-3, screenshot-scroll-4.png)

- Section heading: **"CityLaila Travel Guides & Trending Experiences"**
- Left column: list of blog post rows (thumbnail + title)
- Right column: single large featured image with title overlay
- Posts: "Best Places for Ramadan Shopping in Dubai 2026" · "Dubai Shopping Festival 2025–26: Ultimate Guide" · "Complete Travel Guide: Planning Your Dubai & Abu Dhabi Holiday for Christmas and New Year 2026" · "Qasr Al Watan – Explore the Presidential Palace of Abu Dhabi" · "Unveiling the Remarkable Journey of City Laila"

---

## Ticket Seller Partners (screenshot-scroll-4.png)

- Section heading: **"Ticket Seller partner"**
- Horizontal logo slider with left/right arrows
- Partner logos visible: Big Bus · Ain Dubai · Museum of the Future · Global Fiesta · (more)

---

## Musement at a Glance / Stats (screenshot-scroll-4.png)

- Section heading: **"Musement at a glance"** (centred)
- 4 stat items in a row, each with an **orange icon** above the number:
  - 🗺 **20K+** Attractions
  - 🌍 **44+** Countries
  - 👥 **1M+** Happy Customers
  - 🏆 **5+** Awards
- White/light background, orange accent colour for numbers and icons

---

## Testimonials (screenshot-scroll-4.png, screenshot-scroll-5.png)

- Section heading: **"Loved by Travellers. Trusted by Many"**
- **Dark navy background** (`#002248` or similar)
- Heading text: white, left-aligned, large
- Subtext: "Loved by Travellers. Trusted by Many" repeated as tagline
- Testimonial cards: 2 per row visible, white cards on dark bg, slide navigation (< >) below
- Reviewers from HTML: Obaid Malik · Rinat Cohen · Nikhil Nerurkar · Kohila Ranjitkumar · AMARDEEPU N · Joel Guyomard · Kenny Ponce · Chang Wei · Fahad al-Habib · Dasha K
- Sample review text: "Motiongate Dubai was an unforgettable experience, filled with an abundance of amazing attractions..." / "Very fast service - great value."

---

## Footer (screenshot-scroll-5.png)

- **Background**: **White** (`#ffffff`) — the dark-navy belongs to the Testimonials section above; the Footer is light. They are two distinct sections.
- **Logo**: CDN logo image `assets/WhitelableLogo/1/2/logo.webp`
- **4 columns**:

  **Col 1 — Company Info:**
  - "Global Headquarters: CityLaila FZ-LLC, Al Moosa Tower 1, Maple Heights Business Center 16th Floor, Sheikh Zayed Rd – Metro Station – near emirates Tower – Dubai – United Arab Emirates"
  - Phone / WhatsApp: (+971)506800227
  - Phone: (+971)44511625
  - Mail: info@citylaila.com
  - "Our International Offices":
    - Egypt: Alexandria, Egypt — (+20)1129090043
    - Singapore: Singapore city — (+65)92310720
    - India: HSR, Bangalore — (+91)9591052942

  **Col 2 — WHY CITYLAILA?** (list with arrow → bullets):
  - Instant confirmation. Purchase anytime you need it, anywhere you want it.
  - 1M+ Happy customers
  - 20000+ attractions from 80+ Countries
  - Get the lowest prices and last-minute deals
  - Have a question? Live chat with our experts 24×7
  - World's safest payment gateway
  - 3000+ reviews on Google & Trustpilot with 4.8★

  **Col 3 — Useful Links:**
  - Home · About CityLaila · Privacy Policy · Terms And Conditions · Contact Us · Agent Signup · Our Blog · FAQ

  **Col 4 — We Accept + Follow Us:**
  - Payment icons: Visa · Mastercard · AmEx · Diners · tabby · Apple Pay · Google Pay
  - Social icons: Facebook · LinkedIn · Instagram · YouTube

- **Bottom bar**: "CityLaila © 2026 All rights reserved" | "Design and Developed by Kztar Technologies" (link href `#`)
- All footer text: white or light grey on dark navy

---

## Navigation Routes (from HTML source)

| Label | URL |
|---|---|
| Home | `/` |
| Activities | `/` |
| Packages | (dropdown) |
| Visa | `https://visa.citylaila.com/` |
| All Categories | (dropdown) |
| Contact Us | `/contact-us` |
| Combo Deals | `/combo-deals` |
| Free Ticket Offer | `/Free-Ticket-Offer` |
| Water Sports | `/WaterSports` |
| Car Booking | `/carbooking` |
| Theme Parks | `/city-tours/tours-by-type/Theme-Parks-11692.aspx` |
| City Tours | `/city-tours/tours-by-type/city-tours-290159.aspx` |
| Adventure Tours | `/city-tours/tours-by-type/Adventure-Tours-290170.aspx` |
| Desert Safari | `/city-tour/tour-details/Desert-Safari-Dubai-Online-Tickets-13247.aspx` |
| Dhow Cruise | `/city-tours/tours-by-type/Dhow-Cruise-289851.aspx` |
| Blog | `/blogs` |
| About CityLaila | `/about-us` |
| FAQ | `/faq` |
| Agent Signup | `https://b2b.citylaila.com/` |

---

## CDN Asset URLs

Base: `https://d3gvlpbdidhqp.cloudfront.net/`

| Asset | URL |
|---|---|
| Logo | `assets/WhitelableLogo/1/2/logo.webp` |
| Favicon | `assets/WhitelableLogo/1/2/favicon.ico` |
| Destination image (ID-based) | `assets/whitelable1/img/destinationimages/{id}.jpg` |

---

## Current Build Status

The codebase has been fully migrated from **Tailwind CSS v4** to **Bootstrap 5.3 / react-bootstrap 2.10**. All 16 prior content corrections remain in place.

### Styling Stack

- **Bootstrap 5.3.3** — imported once in `src/app/globals.css` (`@import "bootstrap/dist/css/bootstrap.min.css"`).
- **bootstrap-icons 1.11.3** — CSS-only, available as `<i class="bi bi-...">`.
- **react-bootstrap 2.10.5** — used for `Container`, `Row`, `Col`, `Carousel`, `Form`, `Accordion`, `Button`.
- **CityLaila design tokens** — declared as `--cl-*` CSS custom properties in `globals.css`. They drive a small set of project-specific utility classes (`.cl-text-dark`, `.cl-bg-soft`, `.btn-cta`, `.cl-section-title`, `.cl-card`, `.cl-page-hero`, etc.). Use these alongside Bootstrap utilities — do **not** add Tailwind-style arbitrary classes.
- **No Tailwind, no Embla.** `tailwindcss`, `@tailwindcss/postcss`, `tailwind-merge`, `embla-carousel-react`, and `embla-carousel-autoplay` were removed. `postcss.config.mjs` was deleted.
- **`cn()` helper** — `src/lib/utils.ts` now wraps `clsx` only (no `tailwind-merge`).

### Implemented Components (current state)

| Component | File | Notes |
|---|---|---|
| Header | `src/components/Header.tsx` | Idiomatic react-bootstrap: `Form` + `InputGroup` (with `InputGroup.Text` icon prefix and inline submit `Button`) for search; `Button as={Link}` for login/sign-up (desktop + mobile); `Button variant="link"` with `Badge pill` for the cart counter; `Dropdown` for language + currency selectors (`.cl-header-dd` chrome); custom `.cl-header` (fixed position), `.cl-nav-link`, `.cl-mobile-drawer` |
| HeroSection | `src/components/HeroSection.tsx` | `react-bootstrap` `Carousel` with `fade`, `interval={5000}`, real CDN banner images |
| AwardBar | `src/components/AwardBar.tsx` | `Container` + flex utilities, 4 CDN review platform logos |
| SummerOffers | `src/components/SummerOffers.tsx` | `Container` + `Row`/`Col` (xs=12/sm=4), 3 CDN promo banner cards |
| WhyBookSection | `src/components/WhyBookSection.tsx` | `Row`/`Col` (xs=12/sm=6/lg=3) of `.cl-whybook-card` (icon-left 48×48 + text-right, white card, border + soft shadow), verbatim copy + CDN icons |
| DestinationsSection | `src/components/DestinationsSection.tsx` | Native horizontal scroll; `.cl-destination-card` for image+overlay; uses `.cl-carousel-shell` edge-overlay arrows |
| ExclusiveDealsSection | `src/components/ExclusiveDealsSection.tsx` | Horizontal `AttractionCard` carousel (`cl-card-track` + `cl-card-track-item`); "View All" in header, edge-overlay arrows (`.cl-carousel-shell`) |
| ComboToursSection | `src/components/ComboToursSection.tsx` | Horizontal `AttractionCard` carousel (`cl-card-track`), `cl-bg-grey` section tint; "View All" in header, edge-overlay arrows |
| ExclusiveDealWide | `src/components/ExclusiveDealWide.tsx` | Horizontal scroll carousel with `.cl-exclusive-card` (4:3 image + bottom overlay panel); edge-overlay arrows |
| TravelGuidesSection | `src/components/TravelGuidesSection.tsx` | `Row` 2-column (lg=6/lg=6); blog list + featured image |
| PartnerLogosSection | `src/components/PartnerLogosSection.tsx` | Native horizontal scroll, `.cl-partner-logo` (grayscale → colour on hover); edge-overlay arrows |
| StatsBar | `src/components/StatsBar.tsx` | `Row`/`Col` (xs=6/sm=3), CDN orange icons, 4 stats (20K+/44+/1M+/5+) |
| TestimonialsSection | `src/components/TestimonialsSection.tsx` | `react-bootstrap` `Carousel` with 2 review cards per slide, dark navy `cl-bg-dark` background |
| Footer | `src/components/Footer.tsx` | `cl-footer` **white** background (testimonials above is dark navy — they must read as distinct sections), `Row`/`Col` 4-column layout, CDN logo image, dark text, blue contact icons |
| AttractionCard | `src/components/AttractionCard.tsx` | `.cl-card` wrapper, `.cl-pill-savings` (green, top), `.cl-pill-lpd` (orange, bottom-left), no tag pills |
| SearchPageTemplate | `src/components/SearchPageTemplate.tsx` | Canonical listing template — client component. Left sidebar (refine-search input + `Accordion`: Price / Popular Filters / Tour Category) + right column (Sort By tab-bar + vertical list of `SearchResultRow` + Bootstrap `Pagination`, 20/page default). Manages all filter/sort/page state internally. Used by `/search`; reserved for F3 category-link pages. Props: `title`, `subtitle?`, `attractions`, `emptyMessage?`, `pageSize?`. |
| SearchResultRow | `src/components/SearchResultRow.tsx` | Horizontal listing card used inside `SearchPageTemplate`. 3-column CSS Grid (180px image | content | 200px action). Title + ★rating + reviews + booked count + info pills (Description/Timings/Inclusion); right column shows "Get Instant Confirm" + From-price + strikethrough original + Book Now. Stacks vertically below `md`. |
| CategoryPills | `src/components/CategoryPills.tsx` | Bootstrap `sticky-top`, scrollable pill row, `btn-cta` for active state |

### Pages

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Assembles 13 sections in section-order |
| `/about-us` | `src/app/about-us/page.tsx` | `Container` + `Row`/`Col`, hero with overlay, stats strip, story, values |
| `/contact-us` | `src/app/contact-us/page.tsx` | `react-bootstrap` `Form` (`Form.Control`, `Form.Select`), 4 office cards |
| `/faqs` | `src/app/faqs/page.tsx` | `react-bootstrap` `Accordion` |
| `/category/[slug]` | `src/app/category/[slug]/page.tsx` | `cl-page-hero` + `CategoryPills` + 4-col `Row`/`Col` grid |
| `/search` | `src/app/search/page.tsx` (server, `metadata`) + `src/app/search/SearchResults.tsx` (client, `useSearchParams`) | Reads `?q=` and renders `SearchPageTemplate`. Wrapped in `<Suspense>` (required by Next 16 static export when consuming `useSearchParams`). |

### Homepage Section Order (implemented in `src/app/page.tsx`)

Sections are rendered in this exact order, matching the live site:

1. HeroSection
2. AwardBar
3. SummerOffers
4. WhyBookSection
5. DestinationsSection
6. ExclusiveDealsSection
7. ComboToursSection
8. ExclusiveDealWide
9. TravelGuidesSection
10. PartnerLogosSection
11. StatsBar
12. TestimonialsSection
*(Footer renders directly after — no app-download banner between Testimonials and Footer.)*

### Layout

- `src/app/layout.tsx` uses `paddingTop: "110px"` (inline style) on `<main>` to clear the two-row fixed header (58px nav row + ~52px search strip).

### Carousel library

The hero and testimonials use `react-bootstrap`'s `Carousel`. Multi-card horizontal sliders (destinations, partner logos, exclusive deals, combo tours, exclusive deal wide) use native `overflow-x: auto` with arrow buttons that call `scrollBy({ behavior: "smooth" })` — Bootstrap Carousel's full-slide step doesn't fit a multi-card track.

<a id="carousel-arrow-pattern"></a>
### Carousel arrow pattern

All five multi-card carousels share one DOM pattern:

```tsx
<div className="cl-carousel-shell">
  <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
    <div className="cl-hslider-track">{/* or cl-card-track */}
      {/* items */}
    </div>
  </div>
  <button className="cl-carousel-arrow prev" onClick={() => scroll("prev")} aria-label="Previous">
    <ChevronLeft size={18} />
  </button>
  <button className="cl-carousel-arrow next" onClick={() => scroll("next")} aria-label="Next">
    <ChevronRight size={18} />
  </button>
</div>
```

- `.cl-carousel-shell` → `position: relative` wrapper
- `.cl-carousel-arrow` → 36×36 round button, white bg, light border, soft drop shadow, vertically centred via `top: 50%; transform: translateY(-50%)`
- `.prev` sits at `left: -18px`, `.next` at `right: -18px` — they bleed slightly outside the viewport (matches the live site).
- On `<576px` they shift inward to `left/right: 4px` so they stay on screen.

Section headers carry **only** the title (and "View All" link, where applicable) — the chevron buttons are *never* duplicated in the header.
