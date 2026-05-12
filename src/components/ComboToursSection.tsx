"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "react-bootstrap";
import AttractionCard from "./AttractionCard";
import type { Attraction } from "@/data/attractions";

const combos: Attraction[] = [
  {
    id: "ct1",
    name: "Combo Desert Safari and Frame and Dhow Cruise Save 194 AED",
    slug: "combo-desert-safari-frame-dhow-cruise",
    city: "Dubai",
    category: "adventure",
    priceFrom: 229,
    currency: "AED",
    originalPrice: 381,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-266//03052023181138_64048e02abff8_1678020098_900235.webp",
    tags: [],
    rating: 4.3,
    reviewCount: 26,
    bookedCount: 54,
  },
  {
    id: "ct2",
    name: "Combo Dubai Aquarium and Green Planet Save 146 AED",
    slug: "combo-aquarium-green-planet",
    city: "Dubai",
    category: "local-attractions",
    priceFrom: 254,
    currency: "AED",
    originalPrice: 363,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-14628//aqurium.jpg",
    tags: [],
    rating: 4.4,
    reviewCount: 23,
    bookedCount: 155,
  },
  {
    id: "ct3",
    name: "Combo Dubai Aquarium and Ski Dubai Tickets",
    slug: "combo-aquarium-ski-dubai",
    city: "Dubai",
    category: "local-attractions",
    priceFrom: 372,
    currency: "AED",
    originalPrice: 489,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-249//03052023155748_64046ea47d560_1678012068_903821.webp",
    tags: [],
    rating: 4.4,
    reviewCount: 39,
    bookedCount: 653,
  },
  {
    id: "ct4",
    name: "Combo Dubai Frame and Dubai City Tour and IMG Save 314 AED",
    slug: "combo-frame-city-tour-img",
    city: "Dubai",
    category: "local-attractions",
    priceFrom: 305,
    currency: "AED",
    originalPrice: 554,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-14623//IMG.jpg",
    tags: [],
    rating: 4.4,
    reviewCount: 24,
    bookedCount: 125,
  },
  {
    id: "ct5",
    name: "Combo IMG and Legoland Waterpark Save 400 AED",
    slug: "combo-img-legoland",
    city: "Dubai",
    category: "theme-parks",
    priceFrom: 440,
    currency: "AED",
    originalPrice: 759,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-302//515310.webp",
    tags: [],
    rating: 4.4,
    reviewCount: 27,
    bookedCount: 320,
  },
  {
    id: "ct6",
    name: "Combo IMG Worlds and Ski Dubai Save 360 AED",
    slug: "combo-img-ski-dubai",
    city: "Dubai",
    category: "theme-parks",
    priceFrom: 399,
    currency: "AED",
    originalPrice: 650,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-301//IMG-Ski-Dubai.webp",
    tags: [],
    rating: 4.5,
    reviewCount: 31,
    bookedCount: 210,
  },
  {
    id: "ct7",
    name: "Combo Yas Island 3 Parks Save 15%",
    slug: "combo-yas-island-3-parks",
    city: "Dubai",
    category: "theme-parks",
    priceFrom: 685,
    currency: "AED",
    originalPrice: 805,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//224/Yas island.webp",
    tags: [],
    rating: 4.7,
    reviewCount: 58,
    bookedCount: 420,
  },
  {
    id: "ct8",
    name: "Combo Dubai Frame and Green Planet",
    slug: "combo-dubai-frame-green-planet",
    city: "Dubai",
    category: "local-attractions",
    priceFrom: 139,
    currency: "AED",
    originalPrice: 220,
    image: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-14629//Green-Planet.webp",
    tags: [],
    rating: 4.3,
    reviewCount: 19,
    bookedCount: 88,
  },
];

export default function ComboToursSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;
    const delta = node.clientWidth * 0.9 * (dir === "prev" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-5 cl-bg-grey">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="cl-section-title mb-0">Combo Tours</h2>
          <Link href="/Combo" className="cl-view-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-card-track">
              {combos.map((combo) => (
                <div key={combo.id} className="cl-card-track-item">
                  <AttractionCard attraction={combo} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => scroll("prev")} aria-label="Previous" className="cl-carousel-arrow prev">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll("next")} aria-label="Next" className="cl-carousel-arrow next">
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
}