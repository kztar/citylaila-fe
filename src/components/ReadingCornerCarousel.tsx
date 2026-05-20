"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CDN = "https://d3gvlpbdidhqp.cloudfront.net";

const posts = [
  {
    title: "Explore the Tropical Rainforest in Dubai - The Green Planet",
    href: "https://blog.citylaila.com/",
    image: `${CDN}//Tour-Images//false-14629//Green-Planet.webp`,
  },
  {
    title: "Yas Island Parks Abu Dhabi - Let's Unleash the Ultimate Adventure",
    href: "https://blog.citylaila.com/",
    image: `${CDN}//Tour-Images//false-14641//yas.jpg`,
  },
  {
    title: "Dubai Parks and Resorts - The Largest Theme Park Destination in the World",
    href: "https://blog.citylaila.com/",
    image: `${CDN}//Tour-Images//false-302//515310.webp`,
  },
  {
    title: "Visit the Winter Wonderland of the Desert City - Ski Dubai",
    href: "https://blog.citylaila.com/",
    image: `${CDN}//Tour-Images//false-249//03052023155748_64046ea47d560_1678012068_903821.webp`,
  },
  {
    title: "Best Places for Ramadan Shopping in Dubai 2026",
    href: "https://blog.citylaila.com/best-places-for-ramadan-shopping-in-dubai-2026/",
    image: `${CDN}//assets/static-banner/WebsiteWiseContentImage//11/Ramadan-in-Dubai-2023-4-1024x640.webp`,
  },
  {
    title: "Dubai Shopping Festival 2025-26: Ultimate Guide",
    href: "https://blog.citylaila.com/dubai-shopping-festival-2025-26-ultimate-guide-for-shoppers-and-travelers/",
    image: `${CDN}//assets/static-banner/WebsiteWiseContentImage//11/BLOGS2.jpg`,
  },
];

export default function ReadingCornerCarousel() {
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
        <h2 className="cl-section-title mb-4">Reading Corner</h2>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="cl-hslider-track">
              {posts.map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cl-reading-card"
                >
                  <div className="cl-reading-card-img">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 576px) 80vw, (max-width: 992px) 40vw, 25vw"
                      unoptimized
                    />
                  </div>
                  <div className="cl-reading-card-body">
                    <h3 className="cl-reading-card-title">{post.title}</h3>
                    <span className="cl-reading-card-underline" />
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