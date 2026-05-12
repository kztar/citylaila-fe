"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const deals = [
  {
    name: "Buy Yas Island 3 parks multiple park access ticket and get 1 FREE ticket",
    href: "/tours/united-arab-emirates/abu-dhabi/free-ticket-offer/buy-yas-island-3-parks-multiple-park-access-ticket-and-get-1-free-ticket-14641",
    img: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-14641//yas.jpg",
    priceFrom: 740,
    originalPrice: 740,
  },
  {
    name: "Buy Yas Island 4 parks multiple park access ticket and get 1 free ticket",
    href: "/city-tour/tour-details/Buy-Yas-Island-4-parks-multiple-park-access-ticket-and-get-1-free-ticket-14639.aspx",
    img: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-14639//Miracle-Garden-Dubai-CityLaila4.jpeg",
    priceFrom: 678,
    originalPrice: 848,
  },
  {
    name: "Dubai Safari Park Pass with Train Explorer Safari Tour",
    href: "/city-tour/tour-details/Dubai--Safari-Park-Pass-with-Train-Explorer-Safari-Tour-324.aspx",
    img: "https://d3gvlpbdidhqp.cloudfront.net/Tour-Images/false-324/11282022171228_6384ebfc0eddc_1669655548_917757.jpg",
    priceFrom: 114,
    originalPrice: 120,
  },
  {
    name: "Dubai Aquarium and Underwater Zoo — 1 Day Pass with Unlimited Access",
    href: "/city-tour/tour-details/Dubai-aquarium-and-Underwater-zoo-1-day-pass-with-unlimited-access-to-all-activities-317.aspx",
    img: "https://d3gvlpbdidhqp.cloudfront.net/Tour-Images/false-317/804236.jpg",
    priceFrom: 166,
    originalPrice: 207,
  },
  {
    name: "Aquaventure Atlantis Water Park — 1 Day Pass with Unlimited Access",
    href: "/city-tour/tour-details/Dubai-Aquaventure-Atlantis-Water-Park-1-day-pass-with-unlimited-access-321.aspx",
    img: "https://d3gvlpbdidhqp.cloudfront.net/Tour-Images/false-321/184393.jpg",
    priceFrom: 262,
    originalPrice: 349,
  },
  {
    name: "IMG World of Adventure — 1 Day Pass, Unlimited Rides & Games, Buy 1 Get 1",
    href: "/city-tour/tour-details/IMG-World-of-adventure-1-day-pass-with-unlimited-rides-and-games-buy-1-get-1-381.aspx",
    img: "https://d3gvlpbdidhqp.cloudfront.net//Tour-Images//false-381//IMG 2.jpg",
    priceFrom: 385,
    originalPrice: 475,
  },
];

export default function ExclusiveDealWide() {
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
        <h2 className="cl-section-title mb-4">Exclusive Deal</h2>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-hslider-track">
              {deals.map((deal) => (
              <Link key={deal.href} href={deal.href} className="cl-exclusive-card">
                <Image
                  src={deal.img}
                  alt={deal.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 576px) 90vw, (max-width: 992px) 45vw, 33vw"
                  unoptimized
                />
                <div className="cl-exclusive-card-overlay">
                  <h3 className="cl-exclusive-card-title">{deal.name}</h3>
                  <div className="d-flex align-items-end justify-content-between gap-2">
                    <div>
                      <p className="text-white-50 mb-0" style={{ fontSize: 11 }}>from</p>
                      <div className="d-flex align-items-baseline gap-2">
                        <span className="text-white fw-bold" style={{ fontSize: 16 }}>
                          AED {deal.priceFrom.toFixed(2)}
                        </span>
                        {deal.originalPrice > deal.priceFrom && (
                          <span className="text-decoration-line-through text-white-50" style={{ fontSize: 12 }}>
                            AED {deal.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="btn btn-cta btn-cta-md flex-shrink-0">Book Now</span>
                  </div>
                </div>
              </Link>
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