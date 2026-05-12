# CityLaila Frontend

A pixel-faithful frontend clone of [citylaila.com](https://www.citylaila.com/) — a UAE-based Online Travel Agency (OTA) for booking attraction tickets across Dubai, Abu Dhabi, and 80+ countries.

> **Design reference**: See [`CITYLAILA_TECHNICAL_SPEC.md`](./CITYLAILA_TECHNICAL_SPEC.md) for the full reverse-engineered design spec (colors, typography, layout, content, component specifications).

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16.2.4 | Framework (App Router, SSG) |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| lucide-react | latest | UI icons (search, phone, map pin, etc.) |
| react-icons | 5 | Social media brand icons (fa6 subset) |
| embla-carousel-react | 8 | Carousel/slider (installed, ready to use) |
| clsx + tailwind-merge | latest | Conditional class utility (`cn()`) |
| Inter (Google Fonts) | — | Primary typeface (400/500/600/700) |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve production build
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout — Inter font, Header + Footer
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # CSS custom properties + global resets
│   ├── about-us/page.tsx         # About Us page
│   ├── faqs/page.tsx             # FAQ accordion page
│   ├── contact-us/page.tsx       # Contact form + office info
│   └── category/[slug]/page.tsx  # Dynamic category listing (SSG)
│
├── components/                   # Shared UI components
│   ├── Header.tsx                # Fixed top nav + service bar + mobile drawer
│   ├── Footer.tsx                # 4-column footer with social icons
│   ├── HeroSection.tsx           # Hero banner with search form
│   ├── StatsBar.tsx              # "1M+ Happy Customers" blue bar
│   ├── CategoryPills.tsx         # Sticky scrollable category filter
│   ├── AttractionCard.tsx        # Attraction card (image, tags, price, CTA)
│   ├── FeaturedAttractions.tsx   # 4-col card grid section
│   ├── WhyBookSection.tsx        # 4 value-prop feature cards
│   ├── DestinationsSection.tsx   # 6-city destination grid
│   ├── TestimonialsSection.tsx   # Customer review cards
│   └── AppDownloadBanner.tsx     # Dark app download CTA
│
├── data/
│   └── attractions.ts            # 20 attraction records + 9 categories + 6 cities
│
└── lib/
    └── utils.ts                  # cn() helper (clsx + tailwind-merge)
```

---

## Design System

All design tokens are defined as CSS custom properties in [`globals.css`](./src/app/globals.css) and registered with Tailwind's `@theme inline` block.

### Colors (extracted from live CityLaila CDN CSS)

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#0b79c5` | Nav links, active states, icon accents |
| `--secondary` | `#0F75BC` | Stats bar, secondary headings, footer h4 |
| `--text-dark` | `#002248` | Dark navy — main headings, footer text |
| `--btn-cta` | `#f55c2c` | All primary CTA buttons (orange/coral) |
| `--border-light` | `#e9f1ff` | Card borders, input borders, dividers |
| `--bg-light` | `#f1f6ff` | Section backgrounds, category pills, bottom footer |
| `--bg-warm` | `#fffaf0` | Warm off-white — explore/holidays sections |

### Typography

- **Font**: `Inter` loaded via `next/font/google` (weights 400, 500, 600, 700)
- **Base size**: 14px
- **Key sizes**: Hero h1 `clamp(28px, 5vw, 50px)` · Section headings 20–24px · Cards 14–16px · Badges/captions 10–12px

---

## Pages

### `/` — Homepage

Assembled from the following sections in order:

1. **HeroSection** — Full-width Dubai background image, h1 "We Cover. You Discover.", search form with popular-tag quick-fills
2. **StatsBar** — Blue bar: 1M+ customers, 20K+ attractions, 4.8★, safe payment, 24×7 support
3. **CategoryPills** — Sticky row of 9 category filter pills (scrolls horizontally on mobile)
4. **FeaturedAttractions** (Dubai) — 4-column card grid, filtered to Dubai city, 8 items
5. **WhyBookSection** — 4 icon cards: Instant Confirmation, Best Price, 24/7 Support, Curated Experiences
6. **FeaturedAttractions** (Abu Dhabi) — Same grid, filtered to Abu Dhabi, 4 items
7. **DestinationsSection** — 6-city portrait cards (Dubai, Abu Dhabi, Riyadh, Cairo, London, Paris)
8. **TestimonialsSection** — 4 customer review cards with star ratings
9. **AppDownloadBanner** — Dark navy band with app stats and Google Play / App Store links

### `/about-us`

- Hero with Dubai background and overlay
- Stats row (1M+, 80+ countries, 20K+ attractions, 4.8★)
- Company story — 4 paragraphs of verbatim copy from the live site
- Core values grid (Accessibility, Customisation, Value, Excellence)
- Founded callout with Travel Innovation Award badge

### `/faqs`

- Blue gradient hero
- 9 accordion items (client-side expand/collapse via `useState`)
- "Still have questions?" card with WhatsApp and Email CTAs

### `/contact-us`

- Blue gradient hero
- Left: Contact form (Name, Email, Phone, Subject dropdown, Message) with success state
- Right: Quick contact panel (phone, email, WhatsApp button, social icons) + 4 office cards (Dubai, Egypt, Singapore, India)

### `/category/[slug]`

- Statically generated for all 9 category slugs via `generateStaticParams`
- Blue gradient header with category icon + item count
- Sticky `CategoryPills` for cross-navigation
- 4-column `AttractionCard` grid filtered by category slug
- Empty state with illustration if no items match

---

## Components

### `Header`

**File**: [`src/components/Header.tsx`](./src/components/Header.tsx)

- `"use client"` — uses `useState` and `useEffect`
- Fixed at `top: 0`, `z-index: 50`, white background
- Adds `shadow-md` on scroll (threshold: 10px via scroll event listener)
- **Top row**: Logo (blue "City" + orange "Laila"), primary nav links, language selector pill, cart icon with count badge, "Register Now" CTA button
- **Secondary row** (desktop only): Blue service links (Transfers, Hotels, Tours, Visa Services, International Holidays) + phone number flush right
- **Mobile**: Hamburger icon opens a full-height slide-in drawer from the left, with a click-outside backdrop to close

---

### `Footer`

**File**: [`src/components/Footer.tsx`](./src/components/Footer.tsx)

- Server component (no interactivity)
- 4-column grid on desktop (`lg:grid-cols-4`), stacked on mobile
- **Col 1**: Wordmark logo, tagline, social icons (`FaFacebookF`, `FaInstagram`, `FaLinkedinIn`, `FaYoutube`, `FaXTwitter` from `react-icons/fa6`), payment method badges
- **Col 2**: 9 quick links including all policy pages
- **Col 3**: Address, two phone numbers, two email addresses — each with lucide icon
- **Col 4**: 4 international offices + App Store / Google Play buttons
- **Bottom bar**: `#f1f6ff` background, copyright + "Developed by Kztar Technologies"

---

### `HeroSection`

**File**: [`src/components/HeroSection.tsx`](./src/components/HeroSection.tsx)

- `"use client"` — search form uses `useState` + `useRouter`
- Full-width Unsplash background (Dubai skyline), `min-height` 520px–600px
- Dark gradient overlay (`from-black/55 via-black/45 to-black/30`)
- Centred white card contains:
  - Text input with `MapPin` icon for destination/attraction search
  - Orange submit button with `Search` icon
  - Popular search quick-fill tag buttons
- On submit: navigates to `/search?q=<query>`

---

### `StatsBar`

**File**: [`src/components/StatsBar.tsx`](./src/components/StatsBar.tsx)

- Server component, no props
- `bg-[#0F75BC]`, white text, `py-5`
- Responsive grid: 2 cols → 3 cols → 5 cols
- Data: 1M+ customers · 20,000+ attractions · 4.8★ rating · 🔒 safe payment · 24×7 support

---

### `CategoryPills`

**File**: [`src/components/CategoryPills.tsx`](./src/components/CategoryPills.tsx)

- `"use client"` — `useState` tracks the active pill slug
- `sticky top-[60px] z-30` — sits directly below the fixed header
- Horizontal overflow with `scrollbar-hide` (custom CSS utility in `globals.css`)
- "All" pill resets active filter; remaining 9 pills link to `/category/[slug]`
- Active state: `bg-[#f55c2c]` orange; inactive: `bg-[#f1f6ff]` blue-grey

---

### `AttractionCard`

**File**: [`src/components/AttractionCard.tsx`](./src/components/AttractionCard.tsx)

- Server component — renders as a `<Link>` wrapping the whole card
- Props: `attraction: Attraction` (see Data section)
- **Image area**: 200px tall, `object-cover`, subtle hover scale-up; discount % badge absolute top-left
- **Body**: Name (2-line clamp, min-height 40px), up to 2 tag pills, star rating row, price row
- **Price row**: "From AED XXX" bold blue left + strikethrough original price; "Book Now" orange button right
- Full-card hover deepens box-shadow

---

### `FeaturedAttractions`

**File**: [`src/components/FeaturedAttractions.tsx`](./src/components/FeaturedAttractions.tsx)

- Server component
- **Props**:
  - `title: string` — section heading
  - `subtitle?: string` — muted sub-heading
  - `city?: string` — filters attractions by city (e.g. `"Dubai"`)
  - `limit?: number` — max cards to show (default 8)
  - `showViewAll?: boolean` (default `true`)
  - `viewAllHref?: string` (default `/attractions`)
- Grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

---

### `WhyBookSection`

**File**: [`src/components/WhyBookSection.tsx`](./src/components/WhyBookSection.tsx)

- Server component, no props
- 4 feature cards on white background:
  - ⚡ Instant Confirmation (orange icon, warm bg)
  - 💰 Best Price Guarantee (blue icon, blue bg)
  - 🎧 24/7 Dedicated Support (green icon, green bg)
  - ✨ Curated Experiences (purple icon, purple bg)
- Cards have rounded icon circle, title, description, hover shadow

---

### `DestinationsSection`

**File**: [`src/components/DestinationsSection.tsx`](./src/components/DestinationsSection.tsx)

- Server component
- 6-column portrait grid (2 on mobile, 3 on sm, 6 on lg), `aspect-[3/4]`
- Each card: `next/image` fill, gradient overlay (`from-black/70`), city name + activity count
- Hover: image scales to 110% with overflow hidden

---

### `TestimonialsSection`

**File**: [`src/components/TestimonialsSection.tsx`](./src/components/TestimonialsSection.tsx)

- Server component, no props
- 4-col grid (`sm:grid-cols-2 lg:grid-cols-4`)
- Aggregate 4.8★ shown with filled star icons above the grid
- Each card: star row, italic quote in `""`, reviewer name, location, attraction name
- 4 reviews drawn from real Trustpilot review themes

---

### `AppDownloadBanner`

**File**: [`src/components/AppDownloadBanner.tsx`](./src/components/AppDownloadBanner.tsx)

- Server component, no props
- `bg-[#002248]` dark navy, `py-12`
- Left column: "Download the App" label, headline, description, Google Play + App Store buttons
- Right column: 3 translucent stat cards (10% discount · 2-sec delivery · 4.8★) with orange values

---

## Data

### `src/data/attractions.ts`

Exports three arrays used across the entire app:

#### `attractions: Attraction[]`

20 records covering Dubai and Abu Dhabi. Each record:

```ts
interface Attraction {
  id: string;
  name: string;
  slug: string;
  city: string;              // "Dubai" | "Abu Dhabi"
  category: string;          // matches a category slug
  priceFrom: number;         // e.g. 249
  currency: string;          // "AED"
  image: string;             // Unsplash URL
  tags: string[];            // e.g. ["Mobile Ticket", "Instant Confirmation"]
  rating?: number;           // e.g. 4.8
  reviewCount?: number;
  discountPercent?: number;  // e.g. 30 (shown as badge on card)
  originalPrice?: number;    // gate price before discount
  featured?: boolean;        // included in homepage featured grid
}
```

Sample attractions included: Atlantis Aquaventure, Ski Dubai, Museum of the Future, Motiongate, IMG Worlds, Dubai Frame, Burj Khalifa, Desert Safari, Ferrari World Abu Dhabi, Warner Bros. World, SeaWorld Abu Dhabi, and more.

#### `categories`

```ts
{ label: string; slug: string; icon: string }[]
```

9 entries: Adventure, Cruises & Boat Tours, Food & Drinks, Local Attractions, Theme Parks, Water Park & Sports, Kid Friendly, Desert & Outdoor Activities, Free Ticket Offer.

#### `cities`

```ts
{ name: string; image: string; attractionCount: number }[]
```

6 entries: Dubai, Abu Dhabi, Riyadh, Cairo, London, Paris.

---

## Utility

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Used in any component needing conditional or merged Tailwind classes (e.g. `Header`, `CategoryPills`, `FAQItem`).

---

## Routing Summary

| Route | Render type | File |
|---|---|---|
| `/` | Static | `src/app/page.tsx` |
| `/about-us` | Static | `src/app/about-us/page.tsx` |
| `/faqs` | Static (client accordion) | `src/app/faqs/page.tsx` |
| `/contact-us` | Static (client form) | `src/app/contact-us/page.tsx` |
| `/category/adventure` | SSG | `src/app/category/[slug]/page.tsx` |
| `/category/theme-parks` | SSG | same |
| `/category/water-park-and-sports` | SSG | same |
| `/category/local-attractions` | SSG | same |
| `/category/desert-outdoor-activities` | SSG | same |
| `/category/kid-friendly` | SSG | same |
| `/category/cruises-boat-tours` | SSG | same |
| `/category/food-drinks` | SSG | same |
| `/category/free-ticket-offer` | SSG | same |

All pages are pre-rendered at build time. Data is served from `src/data/attractions.ts` — no external API calls.

---

## Configuration Files

| File | Purpose |
|---|---|
| [`next.config.ts`](./next.config.ts) | Allows remote images from `images.unsplash.com` and `d3gvlpbdidhqp.cloudfront.net` |
| [`postcss.config.mjs`](./postcss.config.mjs) | Tailwind CSS v4 via `@tailwindcss/postcss` |
| [`tsconfig.json`](./tsconfig.json) | Strict TypeScript, `@/*` path alias maps to `src/` |
| [`src/app/globals.css`](./src/app/globals.css) | CSS custom properties, `@theme inline` Tailwind tokens, scrollbar styles, `.scrollbar-hide` utility |

---

## Next Steps / Extensibility

| Feature | Where to add |
|---|---|
| Attraction detail page | `src/app/attractions/[slug]/page.tsx` |
| Search results page | `src/app/search/page.tsx` (reads `?q=` query param) |
| Cart state | Zustand store + `src/app/cart/page.tsx` |
| User auth (login / register) | `src/app/auth/` + NextAuth or similar |
| Real API integration | Replace `src/data/attractions.ts` with `fetch()` calls in Server Components |
| Hero image carousel | Use installed `embla-carousel-react` in `HeroSection` |
| RTL / Arabic support | `next-intl` + `dir="rtl"` toggle on `<html>` |
| Blog | `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx` |
| Visa services | `src/app/visa/page.tsx` |
| B2B portal | Separate Next.js app or subdomain |
