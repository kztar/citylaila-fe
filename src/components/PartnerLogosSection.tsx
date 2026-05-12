"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partnerLogos = [
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-01.jpg", alt: "Partner 1" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-02.webp", alt: "Partner 2" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-03.webp", alt: "Partner 3" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-04.webp", alt: "Partner 4" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-05.webp", alt: "Partner 5" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-06.webp", alt: "Partner 6" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-07.webp", alt: "Partner 7" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-08.webp", alt: "Partner 8" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/BigBus.webp", alt: "Big Bus" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/aindubai.webp", alt: "Ain Dubai" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Museum_of_the_Future_logo.webp", alt: "Museum of the Future" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/image3.webp", alt: "Global Fiesta" },
  { src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//14/Logo-09.webp", alt: "Partner 9" },
];

export default function PartnerLogosSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;
    const delta = node.clientWidth * 0.8 * (dir === "prev" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="py-4 bg-white border-top">
      <Container>
        <h2 className="cl-section-title mb-3">Ticket Seller Partner</h2>

        <div className="cl-carousel-shell">
          <div ref={trackRef} className="cl-hslider-viewport scrollbar-hide" style={{ overflowX: "auto" }}>
            <div className="d-inline-flex align-items-center gap-4">
              {partnerLogos.map((logo) => (
                <div key={logo.src} className="cl-partner-logo">
                  <div className="imgwrap">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="140px"
                      unoptimized
                    />
                  </div>
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