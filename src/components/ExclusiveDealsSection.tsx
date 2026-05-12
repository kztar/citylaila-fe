"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "react-bootstrap";
import AttractionCard from "./AttractionCard";
import type { Attraction } from "@/data/attractions";

const deals: Attraction[] = [
  {
    id: "ed1",
    name: "Morning Safari",
    slug: "morning-safari",
    city: "Dubai",
    category: "desert-outdoor-activities",
    priceFrom: 104,
    currency: "AED",
    originalPrice: 121,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/sunrise-morning-safari-in-desert.webp",
    tags: [],
    rating: 4.5,
    reviewCount: 45,
    bookedCount: 150,
  },
  {
    id: "ed2",
    name: "Desert Safari",
    slug: "desert-safari-dubai",
    city: "Dubai",
    category: "desert-outdoor-activities",
    priceFrom: 133,
    currency: "AED",
    originalPrice: 153,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/safari-in-dubai-deserts.webp",
    tags: [],
    rating: 4.8,
    reviewCount: 1215,
    bookedCount: 3500,
  },
  {
    id: "ed3",
    name: "The Dubai Balloon at Atlantis",
    slug: "dubai-balloon-atlantis",
    city: "Dubai",
    category: "adventure",
    priceFrom: 182,
    currency: "AED",
    originalPrice: 209,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/09282023135104_651537706fcd1_1695889264_990994.webp",
    tags: [],
    rating: 4.6,
    reviewCount: 53,
    bookedCount: 175,
  },
  {
    id: "ed4",
    name: "Big Bus Tour Sightseeing Dubai",
    slug: "big-bus-tour-dubai",
    city: "Dubai",
    category: "local-attractions",
    priceFrom: 182,
    currency: "AED",
    originalPrice: 209,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/01042023034828_63b4f70cec021_1672804108_937817.webp",
    tags: [],
    rating: 4.4,
    reviewCount: 29,
    bookedCount: 95,
  },
  {
    id: "ed5",
    name: "Hatta Wadi Ultimate Package",
    slug: "hatta-wadi-ultimate-package",
    city: "Dubai",
    category: "adventure",
    priceFrom: 229,
    currency: "AED",
    originalPrice: 267,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/hatta-wadi-bg.webp",
    tags: [],
    rating: 4.7,
    reviewCount: 38,
    bookedCount: 210,
  },
  {
    id: "ed6",
    name: "Helicopter Ride Dubai",
    slug: "helicopter-ride-dubai",
    city: "Dubai",
    category: "adventure",
    priceFrom: 600,
    currency: "AED",
    originalPrice: 720,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/helocopter-ride.webp",
    tags: [],
    rating: 4.9,
    reviewCount: 67,
    bookedCount: 180,
  },
  {
    id: "ed7",
    name: "Gyrocopter Dubai",
    slug: "gyrocopter-dubai",
    city: "Dubai",
    category: "adventure",
    priceFrom: 399,
    currency: "AED",
    originalPrice: 470,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/12292022034127_63ad0c6762fd0_1672285287_915215.webp",
    tags: [],
    rating: 4.8,
    reviewCount: 42,
    bookedCount: 95,
  },
  {
    id: "ed8",
    name: "Skydive Dubai",
    slug: "skydive-dubai",
    city: "Dubai",
    category: "adventure",
    priceFrom: 2199,
    currency: "AED",
    originalPrice: 2499,
    image: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//77/09282023135104_651537706fcd1_1695889264_990994.webp",
    tags: [],
    rating: 5.0,
    reviewCount: 124,
    bookedCount: 320,
  },
];

export default function ExclusiveDealsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;
    const delta = node.clientWidth * 0.9 * (dir === "prev" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="cl-section-title mb-0">Exclusive Deals on Dubai&apos;s Top Experiences</h2>
          <Link href="/tours/united-arab-emirates/dubai-tours" className="cl-view-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-card-track">
              {deals.map((deal) => (
                <div key={deal.id} className="cl-card-track-item">
                  <AttractionCard attraction={deal} />
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