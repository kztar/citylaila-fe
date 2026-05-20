"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { packages } from "@/data/packages";

export default function JackpotDealsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;
    const delta = node.clientWidth * 0.9 * (dir === "prev" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section id="deals" className="py-5 bg-white">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="cl-section-title mb-0">
            Jackpot deals on top selling packages - Save upto 35%
          </h2>
          <Link href="/packages" className="cl-view-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-hslider-track">
              {packages.map((pkg) => (
                <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="cl-jackpot-card">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 576px) 80vw, (max-width: 992px) 40vw, 25vw"
                    unoptimized
                  />
                  <div className="cl-jackpot-card-overlay">
                    <p className="cl-jackpot-card-title">{pkg.name}</p>
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