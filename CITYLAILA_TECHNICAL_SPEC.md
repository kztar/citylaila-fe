# CityLaila Frontend Technical Specification

> **Source**: Reverse-engineered from https://www.citylaila.com/ (live site + CDN CSS assets + member portal HTML)
> **Date**: 2026-05-01
> **Purpose**: Reference document for building a Next.js / React clone of CityLaila

---

## 1. Business Overview

**CityLaila** is an Online Travel Agency (OTA) and attractions-booking platform founded in 2019, operating as **CityLaila FZ-LLC** out of Dubai, UAE.

| Field | Value |
|---|---|
| Tagline | "We Cover. You Discover." |
| Page Title | "Tour and Attractions Booking make easy - CityLaila" |
| Founded | 2019 |
| HQ | Al Moosa Tower 1, Sheikh Zayed Road, Dubai, UAE |
| Primary Focus | UAE attractions (Dubai + Abu Dhabi), 20,000+ globally |
| Customers | 1M+ |
| Ratings | 4.8★ across Google & Trustpilot (3,000+ reviews) |

### Sub-domains
| Subdomain | Purpose |
|---|---|
| `member.citylaila.com` | Customer account / booking portal |
| `b2b.citylaila.com` | B2B / trade partner portal |
| `visa.citylaila.com` | Visa services |
| `blog.citylaila.com` | Blog |

---

## 2. Design System

### 2.1 Color Palette

Extracted directly from `/assets/whitelable1/css/Theme1/common.css`:

```css
:root {
  --primary-color:          #0b79c5;   /* Main blue — nav active, links, accents */
  --secondary-color:        #0F75BC;   /* Slightly darker blue — subheadings, footer h4 */
  --primary-text-color:     #002248;   /* Dark navy — body headings, footer text */
  --secondary-text-color:   #000000;   /* Pure black — body copy */
  --hover-text-color:       #000000;   /* Hover states */
  --white-background-color: #ffffff;   /* Card/header backgrounds */
  --border-color:           #e9f1ff;   /* Dividers, card borders, input borders */
  --btn-color:              #f55c2c;   /* Primary CTA button — orange/coral */
  --color:                  #ffffff;   /* Text on colored backgrounds */
  --hover:                  #0b79c5;   /* Button hover state */
}
```

**Additional colors found in CSS:**
- `#ff9d7e` — breadcrumb text (light coral)
- `#fffaf0` — explore section background (warm off-white)
- `#f1f6ff` — secondary background, bottom footer bar
- `#c7dded` — scrollbar track
- `#e9f6ff` — profile language pill background
- `#badcf3` — language divider
- `#9a9a9a` — secondary caption text
- `#4c4c4c` — secondary UI text ("don't have account")
- `#292929` — dark grey for nav link text
- `rgba(0,0,0,0.15)` — card box-shadow

### 2.2 Typography

**Primary Font**: `Inter` (loaded via `@font-face` from CDN)

| Weight | Usage |
|---|---|
| 400 (Regular) | Body text, captions |
| 500 (Medium) | Labels, table headers, footer links |
| 600 (SemiBold) | Nav links, card titles, buttons, section headings |
| 700 (Bold) | Stats numbers, attraction prices, hero headings |

**Font sizes:**
| Element | Size |
|---|---|
| Hero h1/h2 | 50px (desktop), 17px–25px (mobile) |
| Section headings | 20px–24px |
| Card titles | 16px |
| Body / nav links | 14px–15px |
| Breadcrumbs | 13px |
| Captions / badges | 11px–12px |

**Font stack fallback:**
```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
             Roboto, "Helvetica Neue", Arial, sans-serif;
```

### 2.3 Spacing & Layout

- Header height: `min-height: 60px` (fixed, `position: fixed; top: 0`)
- Section top margin: `margin-top: 60px`
- Card border-radius: `10px`
- Button border-radius: `5px` (standard) / `80px` (pill-style)
- Footer padding: `40px 0 0` desktop, `10px 0 0` mobile
- Bottom footer bar: `padding: 11px 0`, background `#f1f6ff`
- Container: Bootstrap 5 12-column grid via `<Container>` / `<Row>` / `<Col>` from `react-bootstrap`

### 2.4 Shadows & Borders

```css
/* Card shadow */
box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);

/* Holiday card shadow */
box-shadow: rgba(0,0,0,.02) 0 1px 3px 0, rgba(27,31,35,.15) 0 0 0 1px;

/* Header border */
border-bottom: 1px solid #EFEFEF;

/* Dropdown top accent */
border-top: 5px solid var(--primary-color);
```

---

## 3. Page Structure & Routing

### 3.1 Navigation

**Primary top nav** (fixed header):
```
Logo | [Home] [About Us] [Blog] [Contact Us] | [Register Now ▶]
```

**Header secondary menu** (sub-nav bar, background = `--btn-color` orange):
- Transfers
- Hotels
- Tours
- Visa Services
- International Holidays

**Category pills** (scrollable row below hero):
| Label | Slug |
|---|---|
| Adventure | `/category/adventure` |
| Cruises & Boat Tours | `/category/cruises-boat-tours` |
| Food & Drinks | `/category/food-drinks` |
| Local Attractions | `/category/local-attractions` |
| Theme Parks | `/category/theme-parks` |
| Water Park & Sports | `/category/water-park-and-sports` |
| Kid Friendly | `/category/kid-friendly` |
| Desert & Outdoor Activities | `/category/desert-outdoor-activities` |
| Free Ticket Offer | `/category/free-ticket-offer` |

**Profile dropdown** (authenticated):
- My Bookings
- My Account
- Cart (icon with count badge)

**Header utilities (anonymous, always visible on desktop)** — all rendered with `react-bootstrap` components:
- Language selector — `Dropdown` rendered with `.cl-header-dd` chrome (no Bootstrap caret, plain text toggle). Items: 6 languages (EN/AR/RU/ES/ZH/FR). State held locally in `Header.tsx`; the original site wires this to Weglot.
- Currency selector — `Dropdown` with `.cl-header-dd` + `.cl-currency-menu` chrome. 12 items (AED/USD/EUR/GBP/SAR/INR/MYR/OMR/THB/NZD/EGP/KWD); each row has code + name on the left and the actual symbol right-aligned (`.cl-currency-symbol`).
- Cart icon — `<Button variant="link" className="cl-cart-btn">` wrapping the lucide `ShoppingCart`. When `cartCount > 0`, a `<Badge pill>` with `.cl-cart-badge` (orange `--cl-cta` bg, white text, absolutely positioned `top: -2px; right: -2px`) sits on top of the icon.
- "Log in / sign up" pill button — `<Button as={Link as unknown as "a"} href="/login" className="btn-cta btn-cta-pill">`. The double cast is needed because `react-bootstrap`'s `Button.as` is typed against `keyof IntrinsicElements`, not `React.ComponentType` — a known interop quirk with Next.js `Link`.

### 3.2 Pages / Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/about-us` | About Us |
| `/contact-us` | Contact Us |
| `/faqs` | FAQs |
| `/category/[slug]` | Category listing |
| `/[attraction-slug]` | Attraction detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/bookings` | My bookings (auth) |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms & Conditions |
| `/cancellation-policy` | Cancellation Policy |
| `/cookie-policy` | Cookie Policy |

---

## 4. Homepage Sections

### Section 1: Hero / Banner

**Layout**: Full-width image carousel — text and CTA are baked into the banner image itself, not rendered as DOM overlays.

**Aspect ratio**: **4 : 1** (locked). Derived from the source asset `bannerimg/1/Discover.webp`, which is exactly **1224 × 306px** (height = 25% of width). The hero must scale proportionally with viewport width — never set a fixed pixel height.

| Viewport width | Hero rendered height |
|---|---|
| 1920px | 480px |
| 1440px | 360px |
| 1280px | 320px |
| 768px  | 192px |
| 375px  | 94px |

**CSS** (`src/app/globals.css`):
```css
.cl-hero { aspect-ratio: 4 / 1; }
.cl-hero .carousel,
.cl-hero .carousel-inner,
.cl-hero .carousel-item { height: 100%; }
```

**Implementation** (`src/components/HeroSection.tsx`): `react-bootstrap` `Carousel` with `fade`, `interval={5000}`, `pause={false}`. Each slide is a `<Carousel.Item>` containing an `<a>` wrapping `next/image` with `fill` + `object-fit: cover` — no overlay text or DOM CTA, since the banner image already includes the headline ("Discover the Top Things to Do & Plan Your Perfect Trip"), subtext, and "PLAN MY TRIP" button.

**Slides** (3 total, all sourced from `assets/bannerimg/1/`):
1. `Discover.webp` → `/`
2. `IMG.webp` → `/city-tours/tours-by-type/Theme-Parks-11692.aspx`
3. `Yas island banner.webp` → `/city-tour/tour-details/yas-island-1-day-any-1-park-online-tickets-14514.aspx`

**Note on the search form**: The site-wide search lives in the **header strip below the nav row**, not inside the hero. Do not re-add a search form inside the hero.

### Section 1.5: Award Bar

Sits directly under the hero. White background, bottom border, generous vertical padding so it reads as a substantial section rather than a thin strip.

**Sizing** (`src/components/AwardBar.tsx`):

| Element | Value |
|---|---|
| Section padding (top + bottom) | `64px` each side (inline style — Bootstrap `py-5` = 48px is too small) |
| Heading font size | `28px` (`fw-bold`, `cl-text-dark`) |
| Subtitle font size | `16px` (`text-secondary`) |
| Heading → subtitle gap | `mb-3` |
| Subtitle → logos gap | `mb-5` |
| Logo card | `240 × 150px` (`object-fit: contain`, `opacity: 0.95`) |
| Logo gap | `gap-4` mobile / `gap-sm-5` ≥sm |

The logo cards are not bare logos — they are **rating widgets** (Google "1000+ Reviews 4.9", Facebook "Excellent 35K+ Reviews 5.0", Trustpilot "1000+ Reviews 4.7", IATA "Accredited Agent"). The 240×150 size keeps the rating text legible without being cramped.

**Copy**:
- H2: "Proud Winner of The 2024 Best Customer Satisfaction Award in ME"
- Subtitle: "Honoured For Achieving One of The Highest Travellers Ratings Globally • A Remarkable 4.8/5 Across All Major Review Platforms"

### Section 2: Category Pills (scrollable)

```
[ 🏄 Adventure ] [ 🚢 Cruises & Boat Tours ] [ 🍽️ Food & Drinks ] [ 🏛️ Local Attractions ]
[ 🎡 Theme Parks ] [ 💦 Water Park & Sports ] [ 👨‍👩‍👧 Kid Friendly ] [ 🏜️ Desert & Outdoor ]
[ 🎫 Free Ticket Offer ]
```
- Horizontal scroll on mobile
- Active state: `background: var(--btn-color)`, white text
- Default state: `border: 1px solid #dae7ff`, `background: #f1f6ff`, dark text

### Section 3: Stats / Social Proof Bar

Full-width bar, background `var(--secondary-color)` (#0F75BC), white text:

```
[ 1M + Happy Customers ]  [ 20000+ attractions from 80+ Countries ]
[ 3000+ reviews · 4.8★ ]  [ World's safest payment gateway ]  [ Live chat 24×7 ]
```

### Section 4: Featured Attractions (Card Grid)

**Card component spec:**
```
┌─────────────────────────┐
│   [Attraction Image]    │ height: 200px, object-fit: cover, border-radius: 10px 10px 0 0
├─────────────────────────┤
│  Name (h5, 16px, 600)   │ border-radius: 0 0 10px 10px, background: #fff
│  [tag] [tag] [tag]      │ pill badges: border 1px #e9f1ff, color --primary-color
│  From AED XXX           │ font-weight: 700, color: --primary-color
│  [ Book Now ]           │ background: --btn-color (#f55c2c), full-width, 30px height
└─────────────────────────┘
```
- Grid: 4 columns desktop, 2 tablet, 1 mobile (used by the legacy `FeaturedAttractions` component and category-listing pages)
- Box-shadow: `0 0 8px rgba(0,0,0,0.15)`

**Homepage layout — carousel, not grid**: on the homepage, both **Exclusive Deals on Dubai's Top Experiences** and **Combo Tours** render `AttractionCard` inside a **horizontal carousel**, not a 4-col grid. See Section 4.5 below.

### Section 4.5: Homepage Attraction Carousels (Exclusive Deals & Combo Tours)

Per `screenshot-scroll-2.png`, both sections are horizontal scroll carousels using the same `AttractionCard` body.

**Section header** (both sections):
- Left: `<h2 class="cl-section-title">` — "Exclusive Deals on Dubai's Top Experiences" / "Combo Tours"
- Right: "View All →" link (`cl-view-all`). **No chevron buttons in the header** — the prev/next arrows live on the carousel viewport itself (see Section 4.6 below).

**Track**:
```
<div class="cl-hslider-viewport scrollbar-hide" style="overflow-x: auto">
  <div class="cl-card-track">
    <div class="cl-card-track-item"><AttractionCard /></div>
    ...
  </div>
</div>
```

**`.cl-card-track`**: `display: flex; gap: 1.25rem`.

**`.cl-card-track-item`**: `flex: 0 0 auto; width: clamp(220px, 24vw, 280px)` — fits ~4 items on a desktop viewport, fewer on narrower screens.

**Arrow behaviour**: `trackRef.current.scrollBy({ left: ±clientWidth * 0.9, behavior: "smooth" })`. Same handler shape used by `DestinationsSection`, `PartnerLogosSection`, and `ExclusiveDealWide`.

**Section background**:
- ExclusiveDealsSection: `bg-white`
- ComboToursSection: `cl-bg-grey` (`#f9f9f9`)

### Section 4.6: Carousel Arrow Pattern (shared across all multi-card carousels)

Applies to: **DestinationsSection**, **PartnerLogosSection**, **ExclusiveDealsSection**, **ComboToursSection**, **ExclusiveDealWide**.

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

```css
.cl-carousel-shell { position: relative; }
.cl-carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e7e7e7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--cl-text-muted);
}
.cl-carousel-arrow:hover { background: var(--cl-bg-light); color: var(--cl-primary); }
.cl-carousel-arrow.prev { left: -18px; }
.cl-carousel-arrow.next { right: -18px; }
@media (max-width: 575px) {
  .cl-carousel-arrow.prev { left: 4px; }
  .cl-carousel-arrow.next { right: 4px; }
}
```

**Rules**:
- The arrows **bleed ~18px outside** the viewport on desktop. On mobile (`<576px`) they sit just inside it (`left/right: 4px`) so they don't get clipped by the page edge.
- Section headers must carry **only** the title (and "View All" link where applicable). Chevron buttons are **never** duplicated in the header.
- `scroll(dir)` always uses `node.scrollBy({ left: ±node.clientWidth * 0.9, behavior: "smooth" })`. Same handler shape across all five components.
- The testimonials section (Section 11.5) is a different pattern — its prev/next live on the left column beneath the heading, *not* overlaying the cards.

**Sample attractions (Dubai):**
| Name | Price | Category |
|---|---|---|
| Atlantis Aquaventure Waterpark | From AED 249 | Water Park |
| Ski Dubai – Snow Classic | From AED 180 | Snow/Adventure |
| Museum of the Future | From AED 149 | Local Attraction |
| Motiongate Dubai | From AED 268 | Theme Park |
| IMG World of Adventure | From AED 184 | Theme Park |
| Dubai Frame | AED 50 (adult) / AED 25 (child) | Local Attraction |
| Wild Wadi Waterpark | From AED 199 | Water Park |
| Dubai Aquarium & Underwater Zoo | From AED 99 | Local Attraction |
| Burj Khalifa (At the Top) | From AED 149 | Local Attraction |
| Miracle Garden | From AED 78 | Outdoor |
| Global Village | From AED 99 | Theme Park |
| Ferrari World Abu Dhabi | From AED 278 | Theme Park |
| Yas Waterworld | From AED 240 | Water Park |
| Warner Bros. World Abu Dhabi | From AED 280 | Theme Park |
| La Perle by Dragone | From AED 185 | Show |
| Desert Safari (Red Dune) | From AED 99 | Desert |
| Dubai Dolphinarium | From AED 60 | Local Attraction |
| Legoland Dubai | From AED 200 | Theme Park |
| KidZania Dubai | From AED 150 | Kid Friendly |
| SeaWorld Abu Dhabi | From AED 260 | Local Attraction |

### Section 5: Top Destinations / City Selector

Horizontal card row showing cities/regions:
- Dubai
- Abu Dhabi
- Saudi Arabia
- (Expanding to 80+ countries)

### Section 6: Why Book With CityLaila (Value Props)

4 **horizontal cards** in a `Row` of `Col xs=12 sm=6 lg=3` (`src/components/WhyBookSection.tsx`). Each card is icon-on-the-left + text-on-the-right — *not* a centered vertical stack. Section heading "Why Book with City Laila?" is left-aligned (`cl-section-title`).

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│ [icon] copy line 1          │  │ [icon] copy line 1          │
│        copy line 2 ...      │  │        copy line 2 ...      │
└─────────────────────────────┘  └─────────────────────────────┘
┌─────────────────────────────┐  ┌─────────────────────────────┐
│ [icon] copy ...             │  │ [icon] copy ...             │
└─────────────────────────────┘  └─────────────────────────────┘
```

**Card** (`.cl-whybook-card`):

| Property | Value |
|---|---|
| Display | `flex; align-items: flex-start; gap: .75rem` |
| Background | `#fff` |
| Border | `1px solid var(--cl-border-light)` |
| Border-radius | `.5rem` (8px) |
| Padding | `.85rem 1rem` |
| Shadow | `0 0 6px rgba(0,0,0,.04)` |
| Height | `100%` (so a `Row` of cards aligns) |

**Icon** (`.cl-whybook-icon`):
- `position: relative; flex: 0 0 48px; width: 48px; height: 48px`
- `next/image` with `fill` + `object-fit: contain`, `unoptimized`
- Source: `/assets/static-banner/WebsiteWiseContentImage//2/*.webp` (CDN)

**Body** (`.cl-whybook-text`):
- `font-size: 12px; line-height: 1.5; color: var(--cl-text-muted)`
- Verbatim copy from the live site (4 propositions):
  1. "98% of bookings receive instant confirmation via Email & WhatsApp backed by 24/7 customer support."
  2. "Get unbeatable prices on UAE attractions, global tours & holiday packages. 95% of our products are listed at the lowest price in the market."
  3. "Rated 4.9 for fast service, trusted booking experience and personalised recommendations for every traveller."
  4. "Personalised recommendations for your budget & travel style + 24/7 WhatsApp support before, during & after your trip."

### Section 7: Holidays / Packages Banner

Side-by-side layout:
- Left: Large image + package info
- Right: Slider of holiday package cards

```css
.holidays_banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  background: #fffaf0;  /* warm off-white */
}
```

### Section 8: Trending / Popular Section

Owl Carousel slider with attraction cards (same card component as Section 4)

### Section 8.5: Exclusive Deal (Carousel)

Implemented in `src/components/ExclusiveDealWide.tsx`. Sits between Combo Tours and Travel Guides on the homepage (per `screenshot-scroll-3.png`).

**Layout** — horizontal carousel, **~3 cards visible per viewport on desktop**. Not a vertical stack of wide image-left/text-right rows (that was an earlier incorrect interpretation). Uses native horizontal scroll + arrow buttons in the section header, same pattern as `DestinationsSection` and `PartnerLogosSection`.

**Section header**:
- `<h2 class="cl-section-title">Exclusive Deal</h2>` (left-aligned, no "View All" link, no chevron buttons in the header)

**Carousel controls**: arrows overlay the left and right edges of the viewport via `.cl-carousel-shell` + `.cl-carousel-arrow` — see Section 4.6 for the shared pattern.

**Card** (`.cl-exclusive-card`):

| Property | Value |
|---|---|
| Display | `block`, `flex: 0 0 auto` |
| Width | `clamp(260px, 32vw, 380px)` |
| Aspect ratio | `4 / 3` |
| Border-radius | `0.75rem` (12px) |
| Image | `next/image` `fill` + `object-fit: cover`, `unoptimized` (CityLaila CDN) |
| Image hover | `transform: scale(1.05)` |

**Bottom overlay panel** (`.cl-exclusive-card-overlay`) — *inside* each card, absolutely positioned:

| Property | Value |
|---|---|
| Position | `absolute`, `left/right: .75rem`, `bottom: .75rem` |
| Background | `rgba(0,0,0,.55)` + `backdrop-filter: blur(2px)` |
| Padding | `.75rem 1rem` |
| Border-radius | `0.5rem` |
| Title | white, 13px, `fw-semibold`, 2-line clamp |
| "from" label | `text-white-50`, 11px |
| Price | white, 16px, `fw-bold` (e.g. "AED 740.00") |
| Original price (if discounted) | `text-decoration-line-through`, `text-white-50`, 12px |
| CTA | `btn btn-cta btn-cta-md` (orange "Book Now") |

**Sample products** (in order): Yas Island 3 parks + 1 FREE · Yas Island 4 parks + 1 free · Dubai Safari Park + Train Explorer · Dubai Aquarium · Aquaventure Atlantis · IMG World Buy 1 Get 1.

### Section 9: International Attractions

Grid of international destination cards:
```css
.international_block img {
  height: 200px;
  border-radius: 10px;
  aspect-ratio: 3/4;
}
```

### Section 10: ~~App Download Banner~~ (NOT present on live site)

The original draft of this spec listed an app-download banner ("Your all-in-one travel app" with Google Play / App Store buttons) between Testimonials and Footer, but inspection of `screenshot-scroll-5.png` shows the live site goes **straight from the Testimonials section to the Footer** — there is no app-download banner. Do **not** add one. If a future redesign reintroduces it, this section can be revived.

### Section 11: Blog/Articles Teaser

Latest 3 blog post cards with thumbnail + title + excerpt

### Section 11.5: Testimonials — "Loved by Travellers. Trusted by Many"

Dark-navy section, **two-column** layout. Heading on the left, testimonial cards on the right.

**Layout** (`src/components/TestimonialsSection.tsx`):

| Element | Value |
|---|---|
| Section background | `var(--cl-text-dark)` (`#002248`) — `cl-bg-dark` class |
| Section padding (top + bottom) | `72px` each side (inline style) |
| Layout | `Container > Row > Col(lg=4) | Col(lg=8)` — left = heading + nav, right = carousel |

**Left column — heading + controls**:
- H2 colour: **orange** `var(--cl-cta)` (`#f55c2c`) — *not* white
- H2 size: `36px`, `fw-bold`, `line-height: 1.15`
- H2 copy: line-broken
  ```
  Loved by Travellers.
  Trusted by Many
  ```
- Sub-tagline: white-50, 14px, repeats "Loved by Travellers. Trusted by Many"
- Prev/Next buttons: `.cl-slider-btn.outline-light` (transparent fill, white border, white chevron) — sit **below the heading on the left column**, never below or beside the cards

**Right column — testimonial cards**:
- `react-bootstrap` `Carousel`, `interval={5000}`, `controls={false}`, `indicators={false}`, `touch` enabled
- Carousel is driven by a `useRef<CarouselRef>` so the left-column buttons step it via `.prev()` / `.next()`
- Each `Carousel.Item` renders a `Row` with **2 cards** (`Col xs=12 md=6`) — i.e. group reviews in pairs
- Cards are **translucent**, *not* white:
  ```css
  background: rgba(255,255,255,.06);
  border:     1px solid rgba(255,255,255,.08);
  border-radius: .75rem;
  padding: 1.5rem;
  ```
- Star row at the top (yellow `cl-star`, fill)
- Review body: `text-white-50`, 14px, line-height 1.6, `cl-line-clamp-4`
- Avatar: 44×44 rounded, `rgba(255,255,255,.1)` fallback bg
- Reviewer name: white, 14px, `fw-semibold`. Country (when present): white-50, 12px

### Section 12: Footer

**Background**: **white** (`#ffffff`) — *not* dark navy. The Testimonials section directly above it (dark navy) and the Footer must read as two visually distinct sections.

**Text colour**: dark text (`cl-text-dark`) for headings, links, contact rows; muted (`text-secondary`) for body copy that should recede. Decorative icons (`MapPin`, `Phone`, `Mail`) use `cl-text-primary` (blue) so they stay visible on white.

**4-column grid layout** (`react-bootstrap` `Row` + `Col xs=12 sm=6 lg=3`):

**Column 1 — Company Info + Contact**
- Logo: CDN image `assets/WhitelableLogo/1/2/logo.webp` (no DOM wordmark — the live site uses the actual image asset)
- "Global Headquarters :" — dark bold, 13px
- Address block with `MapPin` icon (blue)
- Phone block (`Phone` icon, two `tel:` links)
- Email block (`Mail` icon, `mailto:` link)
- "Our International Offices" — dark bold, 13px
- Egypt / Singapore / India lines with embedded `tel:` links

**Column 2 — WHY CITYLAILA?** (heading uppercase, `<h4>`)
- 7 bullet items with orange `›` glyph + secondary-grey copy
- Bullets verbatim from the live site (instant confirmation, 1M+ happy customers, …)

**Column 3 — Useful Links** (heading uppercase, `<h4>`)
- 8 links (Home, About CityLaila, Privacy Policy, Terms And Conditions, Contact Us, Agent Signup → external, Our Blog → external, FAQ) in `cl-text-dark`

**Column 4 — We Accept + Follow Us** (two stacked `<h4>` headings)
- Payment pills (`.cl-payment-pill`): light-blue background (`cl-bg-light`), dark text, light border — listing Visa, Mastercard, American Express, Diners Club, tabby, Apple Pay, Google Pay
- Social icons (`.cl-social-icon`): 32×32 rounded, blue glyph on light-blue background; hover fills the icon with the platform brand colour (Facebook #1877f2, LinkedIn #0077b5, Instagram #e1306c, YouTube #ff0000)

**Bottom bar** (`.cl-footer-bottom`):
- Background: `var(--cl-bg-light)` (`#f1f6ff`)
- Top border: `1px solid var(--cl-border-light)` (`#e9f1ff`)
- Left: "CityLaila © 2026 All rights reserved" (`text-secondary`, 12px)
- Right: "Design and Developed by Kztar Technologies" — `Kztar Technologies` rendered as a placeholder link (`href="#"`) in `cl-text-primary`

---

## 5. Component Specifications

### 5.1 Header Component

```tsx
// Structure
<header className="header_block"> // position: fixed, z-index: 9
  <div className="header_section"> // flex, min-height: 60px
    <Logo />
    <PrimaryNav /> // Home, About Us, Blog, Contact Us
    <ProfileMenu /> // Cart, Language, Currency, Register/Login
  </div>
  <SecondaryNav /> // Transfers, Hotels, Tours, Visa, Holidays
</header>
```

**Sticky behavior**: `position: fixed; top: 0; left: 0; right: 0; z-index: 9`
**Background**: white (`#fff`) with `border-bottom: 1px solid #EFEFEF`
**Mobile**: Hamburger menu (`toggle_icon`), full-screen slide-in nav (left: -100% → 0)

**Language & Currency dropdowns** (`react-bootstrap` `Dropdown` in `Header.tsx`):

```tsx
<Dropdown align="end" className="cl-header-dd">
  <Dropdown.Toggle
    as="button"
    className="cl-nav-link cl-header-dd-toggle d-inline-flex align-items-center gap-1 border-0 bg-transparent"
    style={{ fontSize: 12 }}
  >
    {language.flag} {language.code} <ChevronDown size={11} />
  </Dropdown.Toggle>
  <Dropdown.Menu className="cl-header-dd-menu">
    {languages.map((lang) => (
      <Dropdown.Item active={lang.code === language.code} onClick={() => setLanguage(lang)}>
        <span className="me-2">{lang.flag}</span>{lang.label} <span className="text-secondary ms-1">({lang.code})</span>
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>
```

**CSS** (in `globals.css`):

| Selector | Rule |
|---|---|
| `.cl-header-dd .cl-header-dd-toggle` | `padding: 0; color: var(--cl-text-muted); font-weight: 600; cursor: pointer` |
| `.cl-header-dd .cl-header-dd-toggle:hover` / `.cl-header-dd.show .cl-header-dd-toggle` | `color: var(--cl-primary)` |
| `.cl-header-dd .cl-header-dd-toggle::after` | `display: none` — Bootstrap's built-in caret is hidden; the lucide `ChevronDown` icon inside the toggle is used instead |
| `.cl-header-dd .cl-header-dd-toggle:focus` | `outline: none; box-shadow: none` |
| `.cl-header-dd-menu` | `font-size: 13px; min-width: 200px; padding: .35rem 0; border: 1px solid var(--cl-border-light); border-radius: .5rem; box-shadow: 0 8px 20px rgba(0,0,0,.08)` |
| `.cl-header-dd-menu .dropdown-item` | `padding: .5rem 1rem; color: var(--cl-text-dark); font-size: 13px` |
| `.cl-header-dd-menu .dropdown-item:hover` / `:focus` | `background: var(--cl-bg-light); color: var(--cl-primary)` |
| `.cl-header-dd-menu .dropdown-item.active` | `background: var(--cl-bg-light); color: var(--cl-primary); font-weight: 600` |

**Data** (inline arrays in `Header.tsx`):
- `languages`: `[{ code: "EN", flag: "🇦🇪", label: "English" }, { code: "AR", flag: "🇸🇦", label: "العربية" }, { code: "RU", flag: "🇷🇺", label: "Русский" }, { code: "ES", flag: "🇪🇸", label: "Español" }, { code: "ZH", flag: "🇨🇳", label: "中文" }, { code: "FR", flag: "🇫🇷", label: "Français" }]`
- `currencies` (12 entries, shape `{ code, name, symbol }`):
  `AED د.إ` · `USD $` · `EUR €` · `GBP £` · `SAR ر.س` · `INR ₹` · `MYR RM` · `OMR ر.ع.` · `THB ฿` · `NZD NZ$` · `EGP E£` · `KWD د.ك`
- Each `Dropdown.Item` is `d-flex align-items-center`. Left span: `code` (bold) + `name` (secondary grey). Right span: `.cl-currency-symbol` (right-aligned via `ms-auto`, `min-width: 36px`, `text-align: right`, hover/active state turns it primary-blue).
- Menu width override: `.cl-currency-menu { min-width: 240px }` (the language menu stays at the default 200px).

**Selection** is local React state (`useState`). No global currency conversion or i18n yet — this is a UI-only stub matching the live site's chrome.

### 5.2 Search Form Component

Header search bar (`Header.tsx`). All three pieces (icon, input, submit) sit inside a single Bootstrap `InputGroup` so they share the input-group's connected borders:

```tsx
<Form onSubmit={handleSearch}>
  <InputGroup className="cl-search-group">
    <InputGroup.Text className="cl-search-icon" aria-hidden="true">
      <Search size={15} />
    </InputGroup.Text>
    <Form.Control
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Find your activities"
      aria-label="Find your activities"
    />
    <Button type="submit" className="btn-cta cl-search-submit" aria-label="Search">
      <Search size={18} />
    </Button>
  </InputGroup>
</Form>
```

**CSS** (`globals.css`):

| Selector | Rule |
|---|---|
| `.cl-search-group` | `border-radius: .375rem; overflow: hidden` (clips children to the group's rounded corners) |
| `.cl-search-group .cl-search-icon` | `background: var(--cl-bg-grey); border: 1px solid #e3e3e3; border-right: 0; padding-left: .85rem` — icon "chip" looks contiguous with the input |
| `.cl-search-group .form-control` | `background: var(--cl-bg-grey); border: 1px solid #e3e3e3; border-left: 0; border-right: 0; font-size: 14px` |
| `.cl-search-group .form-control:focus` | `border-color: var(--cl-primary); box-shadow: none` (no halo) |
| `.cl-search-group:focus-within .cl-search-icon` | `border-color: var(--cl-primary)` — icon border tracks the input's focus state |
| `.cl-search-group .cl-search-submit` | `padding: .5rem .85rem; border: 0` |

**Note**: do **not** absolutely-position the icon inside the input; the icon is a real DOM sibling rendered via `InputGroup.Text`, the idiomatic Bootstrap prefix-slot pattern.

### 5.3 Attraction Card Component

```tsx
interface AttractionCard {
  image: string;
  name: string;
  tags: string[];       // ["Mobile Ticket", "Instant Confirmation", "Flexible Duration"]
  priceFrom: number;
  currency: string;     // "AED"
  slug: string;
  discountPercent?: number;
}
```

**Card badges** (shown on individual product listings):
- Mobile Ticket
- Flexible Duration
- Instant Confirmation
- Lowest Price Deal
- Free Cancellation

### 5.4 Stats Bar Component

```tsx
const stats = [
  { value: "1M+",    label: "Happy Customers" },
  { value: "20000+", label: "Attractions from 80+ Countries" },
  { value: "3000+",  label: "Reviews with 4.8★" },
  { value: "🔒",     label: "World's Safest Payment Gateway" },
  { value: "24×7",   label: "Live Chat with Our Experts" },
];
```

### 5.5 Category Pills Component

Horizontal scrollable row built with Bootstrap utilities + a tiny custom CSS shim. The pills themselves are `<button>` / `<Link>` elements with `btn` + a custom `cl-bg-light` (inactive) or `btn-cta` (active) class:

```tsx
const baseClass =
  "btn d-inline-flex align-items-center gap-1 px-3 py-1 rounded-2 fw-semibold flex-shrink-0 text-nowrap";
const inactive = "cl-bg-light text-dark border";
const active   = "btn-cta";
```

The viewport gets `overflow-auto scrollbar-hide` (custom utility that hides the scrollbar) so the row scrolls horizontally without showing a scrollbar. The container uses `sticky-top` with `top: 60px` to pin under the header.

### 5.6 Login Modal

```
Tab 1: Login       Tab 2: Register
─────────────────────────────────
[Username / Email field]
[Password field]
[Remember me] ............. [Forgot?]
[LOGIN BUTTON – orange, full width]
───── or ─────
[Google] [Facebook]
Don't have an account? Register
```

---

## 6. Content: About Us Page

**URL**: `/about-us`
**Title**: "About Citylaila - We Cover, You Discover - CityLaila"

**Hero**: "We Cover. You Discover."

**Body copy (verbatim)**:

> "We make planning activities convenient and a pleasant experience for all. Tickets should be more accessible, and we provide many ways to ensure it remains that way for you to have a joyful vacation. We believe having fun is the only thing that should matter."

> "City Laila makes its mission to help you find and book tickets for a humongous array of recognizable top attractions of the most popular cities so that you can create lifelong memories with your friends and family. We prioritise complete customisable options for your travel itinerary, catering to your comforts, preferences, and budget."

> "We believe that wasting a fortune on pre-decided tour plans with nothing suited to your taste isn't what you signed up for. With us, you can enjoy only the most exclusive handpicked tours carefully designed by travel experts or get to choose from our curated selection of all the top activities from around the world."

**Company milestones:**
- Founded 2019
- 1M+ happy customers
- 300+ attractions (Dubai & Abu Dhabi)
- 20,000+ global attractions
- 80+ countries
- 2023 Travel Innovation Award
- $2M USD funding raised

---

## 7. Content: FAQ Page

**URL**: `/faqs`
**Title**: "FAQs - CityLaila"

| Question | Answer |
|---|---|
| How will I get my booked tickets? | Via email and/or WhatsApp immediately after payment. Contact 24/7 support if not received. |
| What is CityLaila's refund and cancellation policy? | Refunds for attractions/tours within 7 working days. Partner products follow partner policy (4 working days after partner initiates). Each product has its own policy viewable on the site. |
| What payment methods are available? | Debit cards, Visa, Mastercard. Described as "World's safest payment gateway." |
| What is the cancellation window? | Up to 72 hours after payment for eligible products. |
| How does 24/7 support work? | Via WhatsApp and phone, around the clock. |

---

## 8. Content: Contact Us Page

**URL**: `/contact-us`
**Title**: "Get in Touch with CityLaila - CityLaila"

### Contact Form Fields
```
Name (text)
Email (email)
Phone (tel)
Subject / Inquiry Type (select)
Message (textarea)
[Send Message] button
```

### Contact Details

| Type | Value |
|---|---|
| Phone 1 | +971 506 800 227 |
| Phone 2 | +971 44511625 |
| Email (support) | hello@citylaila.com |
| Email (info) | info@citylaila.com |
| Email (business) | debo@citylaila.com |

### Office Addresses

**Dubai HQ:**
```
CityLaila FZ-LLC
Al Moosa Tower 1, Maple Heights Business Center
16th Floor, Sheikh Zayed Road
Dubai, UAE
```

**International:**
- Egypt
- Singapore
- India

---

## 9. Social Media Links

| Platform | URL |
|---|---|
| Instagram | https://www.instagram.com/citylailaa/ |
| Facebook | https://www.facebook.com/CityLaila/ |
| LinkedIn | https://www.linkedin.com/company/city-laila |
| Twitter/X | https://x.com/CityLailaa |
| YouTube | (channel exists, URL TBC) |
| Linktree | https://linktr.ee/CityLaila |

---

## 10. Third-Party Integrations

| Service | Purpose |
|---|---|
| Cloudflare | CDN + WAF |
| Weglot (`wg_537da8d89bb5411280498c92482119934`) | Language switching (EN/AR) |
| Trustpilot (`J3AyWQ83zwECWBBh`) | Review widget |
| AiSensy WhatsApp Widget | Live chat |
| Google Tag Manager | Analytics |
| jQuery UI Datepicker | Date selection |
| Owl Carousel | Image sliders |

---

## 11. Technology Stack (Implemented)

The clone is built on **Bootstrap 5.3 / React-Bootstrap 2.10**, not Tailwind. The earlier Tailwind v4 stack was migrated out — see Section 11.4 for the migration record.

```
Framework:        Next.js 16.2 (App Router, RSC by default)
Language:         TypeScript 5
Styling:          Bootstrap 5.3.3 (CSS) imported globally in src/app/globals.css
UI Components:    react-bootstrap 2.10.5 (Carousel, Navbar, Form, Container/Row/Col, Accordion)
Icons:            lucide-react + react-icons (Fa6 set) + bootstrap-icons (CSS)
Fonts:            next/font with Google Fonts (Inter)
Carousel/Slider:  Bootstrap Carousel (hero, testimonials)
                  + native horizontal-scroll snap (destinations, partner logos)
HTTP Client:      Native fetch (when needed; pages are SSG today)
Image Handling:   next/image with `unoptimized` for the CityLaila CDN
SEO:              Next.js Metadata API
```

No Tailwind, no `@tailwindcss/postcss`, no `tailwind-merge`, no Embla.

### 11.1 Design Tokens — CSS Custom Properties

All CityLaila colours live in `:root` inside `src/app/globals.css`. They drive the custom utility classes (`.cl-text-dark`, `.cl-bg-soft`, `.btn-cta`, …) used alongside Bootstrap utilities.

```css
:root {
  --cl-primary:       #0b79c5;
  --cl-secondary:     #0F75BC;
  --cl-text-dark:     #002248;
  --cl-cta:           #f55c2c;
  --cl-cta-hover:     #d94d20;
  --cl-success:       #00a651;
  --cl-border-light:  #e9f1ff;
  --cl-bg-light:      #f1f6ff;
  --cl-bg-soft:       #f8fbff;
  --cl-bg-grey:       #f9f9f9;
  --cl-pink:          #d63260;

  /* Bootstrap variable overrides */
  --bs-body-font-family: Inter, system-ui, sans-serif;
  --bs-body-font-size:   14px;
  --bs-body-color:       var(--cl-text-body);
  --bs-link-decoration:  none;
}
```

### 11.2 Bootstrap Class → Layout Mapping

| Layout intent | Bootstrap classes |
|---|---|
| Section width container | `<Container>` (max-width follows Bootstrap defaults) |
| 4-column attraction grid | `<Row className="g-4">` + `<Col xs={12} sm={6} md={4} lg={3}>` |
| 3-column promo cards | `<Row className="g-3">` + `<Col xs={12} sm={4}>` |
| Why-Book 4-column | `<Col xs={12} sm={6} lg={3}>` |
| Footer 4-column | `<Col xs={12} sm={6} lg={3}>` |
| Flex row, space-between | `d-flex align-items-center justify-content-between` |
| Vertical stack with gap | `d-flex flex-column gap-3` |
| Button (primary CTA) | `<Button className="btn-cta">` (custom class layered on Bootstrap) |
| Pill button | `.btn-cta.btn-cta-pill` (`border-radius: 999px`) |
| Hide/show responsive | `d-none d-lg-flex` / `d-lg-none` |
| Sticky pill bar | `sticky-top` with custom `top` offset |
| Border / shadow | `border`, `shadow-sm`, `rounded-3` |

### 11.3 React-Bootstrap Component Inventory

| Component | Where used |
|---|---|
| `Carousel` | `HeroSection`, `TestimonialsSection` |
| `Container`, `Row`, `Col` | Every section |
| `Form`, `Form.Control`, `Form.Select`, `InputGroup` | `Header` search bar, `ContactUsPage` |
| `Accordion` | `FAQsPage` |
| `Button` | Header search submit, contact form submit |

### 11.4 Migration Record (Tailwind → Bootstrap)

Removed: `tailwindcss`, `@tailwindcss/postcss`, `tailwind-merge`, `embla-carousel-react`, `embla-carousel-autoplay`, `postcss.config.mjs`.
Added:   `bootstrap` (^5.3.3), `react-bootstrap` (^2.10.5), `bootstrap-icons` (^1.11.3).
Modified: `globals.css` (Tailwind directives → Bootstrap import + custom-property tokens), `src/lib/utils.ts` (`twMerge` removed; `cn()` is now plain `clsx`).

---

## 12. Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| `max-width: 767px` (mobile) | Hamburger nav, single column, hero h1 at 17px, footer stacked |
| `max-width: 991px` (tablet) | Compact nav text (12px), banner at 30px padding, 2-col grid |
| `max-width: 1199px` (large tablet) | Secondary nav overflows with scroll, some font size reductions |
| `min-width: 1200px` (desktop) | Full 4-column grids, full header menu |

Mobile-specific:
- Nav slides in from left (`left: -100%` → `left: 0`)
- Logo max-height: `31px`
- Footer columns stack vertically
- Category pills scroll horizontally

---

## 13. Animations & Interactions

| Element | Interaction |
|---|---|
| Nav dropdown | `opacity: 0 → 1, visibility: hidden → visible`, transition `0.4s ease-out` |
| Register button hover | `background: var(--cl-cta-hover)` (#d94d20), transition `0.3s` |
| Menu link hover | `padding-left: 25px`, transition `0.3s` |
| Mobile nav | Slide in from left, `transition: 0.3s` (custom `.cl-mobile-drawer`) |
| Login button hover | `background: var(--cl-cta-hover)` |
| Hero carousel | **Bootstrap Carousel** (`react-bootstrap` `Carousel`, `fade`, `interval={5000}`) |
| Testimonials carousel | **Bootstrap Carousel** (`interval={5000}`, `controls={false}`, custom prev/next via `useRef<CarouselRef>`) |
| Destination / partner sliders | Native horizontal scroll (`overflow-x: auto` + `scrollBy({ behavior: "smooth" })` on arrow click) |

---

## 14. Key UX Patterns

1. **Fixed header** with scroll — header stays at top, content scrolls beneath it (`margin-top: 60px` on first section)
2. **Sticky category filter** — category pills stick below header when scrolling
3. **Price display** — "From AED XXX" with large bold number, discounted price shown with strikethrough original
4. **Cart badge** — circular orange counter on cart icon, absolute positioned top-right
5. **Search-first UX** — large search bar as primary homepage CTA
6. **Trust signals** — stats bar + Trustpilot widget + "4.8★" prominently shown
7. **WhatsApp CTA** — floating chat widget (`AiSensy`)
8. **Multi-language** — Weglot integration for EN ↔ AR toggle
9. **Booking without login** — "My Booking" lookup available without sign-in
10. **E-ticket delivery** — "Tickets in seconds" messaging used throughout

---

## 15. Footer Legal Copy

```
© 2026 CityLaila. All rights reserved.
Developed by Kztar Technologies
```

**Legal links:**
- Privacy Policy
- Terms and Conditions
- Cancellation Policy
- Cookie Policy

---

## 16. Promo / Discount Patterns

Active promo codes seen on third-party sites:
- `CAE10` — extra 10% on top of existing discounts
- `CT33` — 10% sitewide
- `SAVE10` — first-time booking 10%
- `SAVE5` — 5% off
- App download: flat 10% off
- Discounts displayed: "Up to 45–65% off gate price"

---

## 17. Asset URLs (CDN References)

Base CDN: `https://d3gvlpbdidhqp.cloudfront.net/`

| Asset | URL |
|---|---|
| Logo | `assets/WhitelableLogo/1/1/logo.webp` |
| CSS - Base | `assets/whitelable1/css/Theme1/common.css` |
| CSS - Header | `assets/whitelable1/css/Theme1/headerstyle.css` |
| CSS - Banners | `assets/whitelable1/css/Theme1/bannerstyle.css` |
| Icons Sprite | `assets/whitelable1/img/icons-strip.svg` |
| Font Inter Bold | `assets/whitelable1/font/Inter-Bold.woff2` |
| Font Inter SemiBold | `assets/whitelable1/font/Inter-SemiBold.woff2` |
| Font Inter Medium | `assets/whitelable1/font/Inter-Medium.woff2` |
| Font Inter Regular | `assets/whitelable1/font/Inter-Regular.woff2` |

---

*End of Technical Specification — citylaila.com*
