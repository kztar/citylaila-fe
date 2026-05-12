"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import type { CarouselRef } from "react-bootstrap/Carousel";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "First experience with City Laila, and very impressed with the great customer care and support. MAI was very helpful and guided through the entire booking journey in detail! Will be back again!",
    name: "Obaid Malik",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 154840.png",
    rating: 5,
  },
  {
    text: "Great and quick service.",
    name: "Rinat Cohen",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 155622.png",
    rating: 5,
  },
  {
    text: "Quick response and always helpful.",
    name: "Nikhil Nerurkar",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 155527.png",
    rating: 5,
  },
  {
    text: "CityLaila did all 4 theme parks, marina yacht tour & global village. All went smoothly and I enjoyed. Thank you.",
    name: "Kohila Ranjitkumar",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 154549.png",
    rating: 5,
  },
  {
    text: "I was looking for some discount on entry tickets to Warner Bros which I got through CityLaila.",
    name: "AMARDEEPU N",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 154507.png",
    rating: 5,
  },
  {
    text: "Very Good Offers by City Laila.",
    name: "Joel Guyomard",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 154402.png",
    rating: 5,
  },
  {
    text: "What a remarkable experience! Vizago not only provided valuable insights into different visa options but also assisted me in choosing the best path.",
    name: "Kenny Ponce",
    country: "France",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/France.webp",
    rating: 5,
  },
  {
    text: "Motiongate Dubai was an unforgettable experience, filled with an abundance of amazing attractions. From rollercoasters to 3D shows, there was something for everyone. The staff were especially helpful and accommodating.",
    name: "Fahad al-Habib",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/12292022033406_63ad0aae80b91_1672284846_973212-(1).webp",
    rating: 5,
  },
  {
    text: "Very fast service - great value.",
    name: "Dasha K",
    country: "",
    avatar: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//10/12292022034127_63ad0c6762fd0_1672285287_915215.webp",
    rating: 5,
  },
];

type Review = (typeof reviews)[number];

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="rounded-3 p-4 h-100"
      style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)" }}
    >
      <div className="d-flex gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="cl-star" fill="currentColor" />
        ))}
      </div>
      <p className="text-white-50 cl-line-clamp-4 mb-4" style={{ fontSize: 14, lineHeight: 1.6 }}>
        {review.text}
      </p>
      <div className="d-flex align-items-center gap-3">
        <div
          className="position-relative rounded-circle overflow-hidden flex-shrink-0"
          style={{ width: 44, height: 44, background: "rgba(255,255,255,.1)" }}
        >
          <Image src={review.avatar} alt={review.name} fill style={{ objectFit: "cover" }} sizes="44px" unoptimized />
        </div>
        <div>
          <p className="text-white fw-semibold mb-0" style={{ fontSize: 14 }}>{review.name}</p>
          {review.country && <p className="text-white-50 mb-0" style={{ fontSize: 12 }}>{review.country}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const groups = chunk(reviews, 2);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <section className="cl-bg-dark" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <Container>
        <Row className="g-4 align-items-center">
          {/* Left — heading + nav */}
          <Col xs={12} lg={4}>
            <h2 className="cl-text-cta fw-bold mb-3" style={{ fontSize: 36, lineHeight: 1.15 }}>
              Loved by Travellers.
              <br />
              Trusted by Many
            </h2>
            <p className="text-white-50 mb-4" style={{ fontSize: 14 }}>
              Loved by Travellers. Trusted by Many
            </p>
            <div className="d-flex gap-3">
              <button
                onClick={() => carouselRef.current?.prev()}
                aria-label="Previous review"
                className="cl-slider-btn outline-light"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => carouselRef.current?.next()}
                aria-label="Next review"
                className="cl-slider-btn outline-light"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </Col>

          {/* Right — testimonial carousel */}
          <Col xs={12} lg={8}>
            <Carousel
              ref={carouselRef}
              activeIndex={index}
              onSelect={(i) => setIndex(i)}
              interval={5000}
              controls={false}
              indicators={false}
              touch
            >
              {groups.map((group, idx) => (
                <Carousel.Item key={idx}>
                  <Row className="g-3">
                    {group.map((review) => (
                      <Col xs={12} md={6} key={review.name}>
                        <ReviewCard review={review} />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}