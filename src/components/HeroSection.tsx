"use client";

import { Carousel } from "react-bootstrap";
import Image from "next/image";

const bannerSlides = [
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net/assets/bannerimg/1/Discover.webp",
    alt: "Discover the Top Things to Do & Plan Your Perfect Trip",
    href: "/",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net/assets/bannerimg/1/IMG.webp",
    alt: "IMG Worlds of Adventure — Book Online",
    href: "/city-tours/tours-by-type/Theme-Parks-11692.aspx",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net/assets/bannerimg/1/Yas island banner.webp",
    alt: "Yas Island Summer Sale",
    href: "/city-tour/tour-details/yas-island-1-day-any-1-park-online-tickets-14514.aspx",
  },
];

export default function HeroSection() {
  return (
    <section className="cl-hero position-relative w-100 overflow-hidden">
      <Carousel fade interval={5000} controls indicators={false} pause={false}>
        {bannerSlides.map((slide) => (
          <Carousel.Item key={slide.src}>
            <a href={slide.href} className="d-block position-relative w-100 h-100">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-fit-cover"
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}