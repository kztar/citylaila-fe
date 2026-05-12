# Issues

A running list of known bugs and improvements. Check items off when resolved and move them to **Resolved**.

Format: `- [ ] **[High/Medium/Low]** Title — description`

---

## Open

*(no open issues)*

---

## Resolved

- [x] **Logo** — Replaced two plain bold words with a script/italic `City Laila` wordmark in `#d63260` (Georgia + Brush Script MT).
- [x] **Hero background** — Replaced Unsplash photo with a real CDN embla carousel (`bannerimg/1/Discover.webp`, `IMG.webp`).
- [x] **Search bar** — Moved from inside the hero card to a full-width strip directly below the nav in `Header.tsx`.
- [x] **Blue secondary service nav bar** — Removed entirely; does not exist on the real site.
- [x] **AwardBar** — Added `src/components/AwardBar.tsx` with "Proud Winner of The 2024 Best Customer Satisfaction Award in ME" and real CDN platform logos.
- [x] **SummerOffers** — Added `src/components/SummerOffers.tsx` with 3 CDN promo banner cards.
- [x] **WhyBookSection copy** — Updated to verbatim text and CDN icon images from the live site.
- [x] **DestinationsSection** — Converted static 6-col grid to an embla horizontal slider; heading updated to "Top things to do in trending cities"; 11 real cities with CDN images.
- [x] **AttractionCard design** — Savings pill moved to top of image (green `#00a651`); "Lowest Price Deal" badge added at bottom-left; booked count displayed; tag pills removed.
- [x] **ExclusiveDealsSection** — Added `src/components/ExclusiveDealsSection.tsx` (4-col grid, 8 real Dubai deals, CDN images).
- [x] **ComboToursSection** — Added `src/components/ComboToursSection.tsx` (4-col grid, 8 combo packages, CDN images).
- [x] **ExclusiveDealWide** — Added `src/components/ExclusiveDealWide.tsx` (wide horizontal cards for BOGO/exclusive deals).
- [x] **TravelGuidesSection** — Added `src/components/TravelGuidesSection.tsx` (blog list + large featured image, CDN images).
- [x] **PartnerLogosSection** — Added `src/components/PartnerLogosSection.tsx` (auto-scrolling embla slider, 13 real partner logos).
- [x] **StatsBar** — Redesigned as "Musement at a glance" with CDN orange icon images; 4 stats (20K+ / 44+ / 1M+ / 5+).
- [x] **TestimonialsSection** — Dark navy `#002248` background; embla carousel; real reviewer names and CDN avatars.
- [x] **Footer** — Dark navy `#002248`; 4 correct columns: Company + Offices / WHY CITYLAILA? / Useful Links / We Accept + Follow Us.
- [x] **Homepage section order** — `src/app/page.tsx` assembled with all 13 sections in the correct top-to-bottom order matching the live site.
- [x] **[High]** Hero carousel missing third slide — Added `Yas island banner.webp` as the third carousel item in `HeroSection.tsx`.
- [x] **[High]** `attractions.ts` sample data uses Unsplash images — All 20 records in `src/data/attractions.ts` updated to use real `d3gvlpbdidhqp.cloudfront.net` CDN image URLs.
- [x] **[High]** `bookedCount` missing from sample attractions — Populated `bookedCount` on all 20 records in `src/data/attractions.ts` (ranging 980–9500).
- [x] **[High]** `Log in / sign up` button — Removed extraneous `<User>` icon; button is now a plain orange pill matching the real site.
- [x] **[Medium]** `AppDownloadBanner` not audited against real site — Audit confirmed the live site has **no** app-download banner (testimonials → footer directly per `screenshot-scroll-5.png`). The component and the section-13 slot in `page.tsx` were removed (2026-05-11); spec section 10 is preserved as a tombstone.
- [x] **[Medium]** Category pages use stale `FeaturedAttractions` data — Resolved by the `attractions.ts` rewrite (all records now use CDN images and include `bookedCount`).
- [x] **[Low]** `.claude/` directory is untracked — Added `.claude/` to `.gitignore`.
