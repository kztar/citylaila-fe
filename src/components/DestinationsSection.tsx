"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cities = [
  { name: "Dubai", href: "/tours/united-arab-emirates/dubai-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Dubai.webp" },
  { name: "Abu Dhabi", href: "/tours/united-arab-emirates/abu-dhabi-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Abu Dhabi.webp" },
  { name: "Bangkok", href: "/tours/thailand/bangkok-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Bangkok.webp" },
  { name: "Pattaya", href: "/tours/thailand/pattaya-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Pattaya.webp" },
  { name: "Los Angeles", href: "/tours/united-states-of-america/los-angeles-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Los Angeles.webp" },
  { name: "Las Vegas", href: "/tours/united-states-of-america/las-vegas-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Las Vegas.webp" },
  { name: "Baku", href: "/tours/azerbaijan/baku-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Baku.webp" },
  { name: "Ras Al Khaimah", href: "/tours/united-arab-emirates/ras-al-khaimah-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Ras al Khaimah.webp" },
  { name: "Bali", href: "/tours/indonesia/bali-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Bali.webp" },
  { name: "London", href: "/tours/united-kingdom/london-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/London.webp" },
  { name: "Paris", href: "/tours/france/paris-tours", img: "https://d3gvlpbdidhqp.cloudfront.net//assets/img/images/Paris.webp" },
];

export default function DestinationsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;
    const delta = node.clientWidth * 0.8 * (dir === "prev" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="cl-section-title mb-3">Top things to do in trending cities</h2>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-hslider-track">
              {cities.map((city) => (
                <Link key={city.name} href={city.href} className="cl-destination-card">
                  <Image src={city.img} alt={city.name} fill style={{ objectFit: "cover" }} sizes="200px" unoptimized />
                  <span className="cl-destination-name">{city.name}</span>
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