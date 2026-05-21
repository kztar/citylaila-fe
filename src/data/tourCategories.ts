/**
 * Tour categories surfaced in the Header → All Categories dropdown.
 * Each category routes to /category/[slug] and renders `SearchPageTemplate`
 * with attractions filtered by `attractionCategories`.
 *
 * The "Desert Safari Tours" dropdown item is NOT in this list — it points to
 * an attraction detail page (`/attractions/red-dune-desert-safari`) tracked
 * separately as ROADMAP F3.d.
 */
export interface TourCategory {
  slug: string;
  label: string;
  description: string;
  /** Values of `Attraction.category` to include. Empty array = no data yet. */
  attractionCategories: string[];
}

export const tourCategories: TourCategory[] = [
  {
    slug: "city-tours",
    label: "City Tours",
    description:
      "Discover iconic landmarks and hidden gems across Dubai, Abu Dhabi and beyond.",
    attractionCategories: ["local-attractions"],
  },
  {
    slug: "adventure-tours",
    label: "Adventure Tours",
    description:
      "Adrenaline-pumping experiences for thrill seekers — desert safaris, helicopter rides, skydiving and more.",
    attractionCategories: ["adventure"],
  },
  {
    slug: "dhow-cruise",
    label: "Dhow Cruise",
    description:
      "Traditional dhow dinner cruises along the Dubai Creek and Marina.",
    attractionCategories: ["cruises-boat-tours"],
  },
  {
    slug: "airport-transfers",
    label: "Private Airport Transfer",
    description:
      "Comfortable private pickup and drop-off services from major UAE airports.",
    attractionCategories: [],
  },
  {
    slug: "cruise-and-boat-tours",
    label: "Cruise and Boat Tours",
    description:
      "Yacht charters, dhow dinners and family-friendly boat tours.",
    attractionCategories: ["cruises-boat-tours"],
  },
  {
    slug: "water-activities",
    label: "Water Activities",
    description:
      "Water parks, jet skis, paddleboards and aquatic adventures.",
    attractionCategories: ["water-park-and-sports"],
  },
];