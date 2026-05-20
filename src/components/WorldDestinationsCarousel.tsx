"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CDN = "https://d3gvlpbdidhqp.cloudfront.net";

const destinations = [
  { name: "Thailand",     image: `${CDN}//assets/img/images/Bangkok.webp`,    href: "/search?q=thailand" },
  { name: "Japan",        image: `${CDN}//assets/img/images/Bali.webp`,       href: "/search?q=japan" },
  { name: "Vietnam",      image: `${CDN}//assets/img/images/Pattaya.webp`,    href: "/search?q=vietnam" },
  { name: "Turkey",       image: `${CDN}//assets/img/images/Baku.webp`,       href: "/search?q=turkey" },
  { name: "Saudi Arabia", image: `${CDN}//assets/img/images/Abu Dhabi.webp`,  href: "/search?q=saudi+arabia" },
  { name: "Mauritius",    image: `${CDN}//assets/img/images/Bali.webp`,       href: "/search?q=mauritius" },
  { name: "Uzbekistan",   image: `${CDN}//assets/img/images/Baku.webp`,       href: "/search?q=uzbekistan" },
  { name: "Egypt",        image: `${CDN}//assets/static-banner/WebsiteWiseContentImage//77/safari-in-dubai-deserts.webp`, href: "/search?q=egypt" },
  { name: "UAE",          image: `${CDN}//assets/img/images/Dubai.webp`,      href: "/search?q=uae" },
  { name: "Bali",         image: `${CDN}//assets/img/images/Bali.webp`,       href: "/search?q=bali" },
];

export default function WorldDestinationsCarousel() {
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
        <h2 className="cl-section-title mb-4">Explore world&apos;s top destinations</h2>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-hslider-track">
              {destinations.map((d) => (
                <Link key={d.name} href={d.href} className="cl-world-dest">
                  <div className="cl-world-dest-img">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="160px"
                      unoptimized
                    />
                  </div>
                  <p className="cl-world-dest-name">{d.name}</p>
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