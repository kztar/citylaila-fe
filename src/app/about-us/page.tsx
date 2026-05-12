import type { Metadata } from "next";
import { Container, Row, Col } from "react-bootstrap";
import { Users, Globe, Trophy, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About Citylaila - We Cover, You Discover - CityLaila",
  description:
    "Learn about CityLaila, your go-to destination for booking top attractions across the UAE and beyond.",
};

const stats = [
  { Icon: Users, value: "1M+", label: "Happy Customers" },
  { Icon: Globe, value: "80+", label: "Countries" },
  { Icon: TrendingUp, value: "20,000+", label: "Attractions" },
  { Icon: Trophy, value: "4.8★", label: "Average Rating" },
];

const values = [
  {
    title: "Accessibility",
    desc: "Tickets should be more accessible. We provide many ways to ensure it remains that way for you to have a joyful vacation.",
  },
  {
    title: "Customisation",
    desc: "We prioritise complete customisable options for your travel itinerary, catering to your comforts, preferences, and budget.",
  },
  {
    title: "Value",
    desc: "We believe that wasting a fortune on pre-decided tour plans with nothing suited to your taste isn't what you signed up for.",
  },
  {
    title: "Excellence",
    desc: "End-to-end service at the lowest price with top-notch customer satisfaction, leveraging our extensive global network.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="position-relative py-5 d-flex align-items-center justify-content-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 320,
        }}
      >
        <div className="position-absolute top-0 start-0 end-0 bottom-0" style={{ background: "rgba(0,34,72,.75)" }} />
        <Container className="position-relative text-center" style={{ zIndex: 2 }}>
          <h1 className="text-white fw-bold mb-3" style={{ fontSize: 40, textShadow: "0 4px 8px rgba(0,0,0,0.5)" }}>
            We Cover. You Discover.
          </h1>
          <p className="text-white-75 mx-auto mb-0" style={{ maxWidth: 540, fontSize: 16, color: "rgba(255,255,255,.8)" }}>
            Your go-to destination for uncovering the unknown, adventuring in an unfamiliar city, and experiencing something extraordinary.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-4" style={{ background: "var(--cl-secondary)" }}>
        <Container>
          <Row className="g-3">
            {stats.map(({ Icon, value, label }) => (
              <Col xs={6} sm={3} key={label} className="text-center">
                <div className="d-flex justify-content-center mb-2">
                  <Icon size={28} className="text-white-50" />
                </div>
                <p className="fw-bold text-white mb-0" style={{ fontSize: 24 }}>{value}</p>
                <p className="text-white-50 fw-medium mb-0" style={{ fontSize: 14 }}>{label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Story */}
      <section className="py-5">
        <Container style={{ maxWidth: 800 }}>
          <div className="text-center mb-4">
            <h2 className="cl-text-dark fw-bold mb-3" style={{ fontSize: 28 }}>Our Story</h2>
            <div className="cl-divider" />
          </div>
          <div className="d-flex flex-column gap-3 cl-text-dark fw-medium" style={{ fontSize: 16, lineHeight: 1.7 }}>
            <p>
              We make planning activities convenient and a pleasant experience for all. Tickets should be more accessible, and we provide many ways to ensure it remains that way for you to have a joyful vacation. We believe having fun is the only thing that should matter.
            </p>
            <p>
              City Laila makes its mission to help you find and book tickets for a humongous array of recognizable top attractions of the most popular cities so that you can create lifelong memories with your friends and family. We prioritise complete customisable options for your travel itinerary, catering to your comforts, preferences, and budget.
            </p>
            <p>
              We believe that wasting a fortune on pre-decided tour plans with nothing suited to your taste isn&apos;t what you signed up for. With us, you can enjoy only the most exclusive handpicked tours carefully designed by travel experts or get to choose from our curated selection of all the top activities from around the world.
            </p>
            <p>
              The platform provides endless possibilities, boundless fun, and the opportunity to create unforgettable memories. It specializes in covering popular, trending, cultural, and local activities across the Middle East, currently operating in the UAE and Saudi Arabia with plans for expansion.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-5 cl-bg-soft">
        <Container style={{ maxWidth: 1000 }}>
          <div className="text-center mb-4">
            <h2 className="cl-text-dark fw-bold mb-2" style={{ fontSize: 24 }}>Our Core Values</h2>
            <p className="text-secondary mb-0" style={{ fontSize: 14 }}>What drives everything we do</p>
          </div>
          <Row className="g-4">
            {values.map((v) => (
              <Col xs={12} sm={6} key={v.title}>
                <div className="bg-white rounded-3 p-4 border shadow-sm h-100" style={{ borderColor: "var(--cl-border-light)" }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded-circle" style={{ width: 8, height: 8, background: "var(--cl-cta)" }} />
                    <h3 className="cl-text-dark fw-bold mb-0" style={{ fontSize: 16 }}>{v.title}</h3>
                  </div>
                  <p className="text-secondary mb-0" style={{ fontSize: 14, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Founded */}
      <section className="py-5 text-center">
        <Container style={{ maxWidth: 720 }}>
          <h2 className="cl-text-dark fw-bold mb-3" style={{ fontSize: 24 }}>Founded in Dubai, 2019</h2>
          <p className="text-secondary mb-4" style={{ fontSize: 14, lineHeight: 1.7 }}>
            CityLaila FZ-LLC was founded in 2019 with a mission to make city exploration joyful and accessible for everyone. From our headquarters at Al Moosa Tower, Sheikh Zayed Road, Dubai — we&apos;ve grown to serve over 1 million customers across 80+ countries.
          </p>
          <div
            className="d-inline-flex align-items-center gap-2 cl-text-dark fw-medium px-3 py-2 rounded-pill"
            style={{ background: "#e9f6ff", fontSize: 14 }}
          >
            <Trophy size={16} className="cl-text-cta" />
            Winner — 2023 Travel Innovation Award
          </div>
        </Container>
      </section>
    </>
  );
}