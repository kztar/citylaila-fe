"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapPin, Calendar as CalendarIcon, Users, Moon, Search, Globe } from "lucide-react";

const COUNTRIES = [
  "Thailand", "Vietnam", "Bali", "Egypt", "Turkey", "Saudi Arabia",
  "UAE", "Mauritius", "Japan", "Uzbekistan", "Azerbaijan", "Singapore",
];
const PAX_OPTIONS = [
  "1 Person 1 Room",
  "2 Person 1 Room",
  "3 Person 2 Rooms",
  "4 Person 2 Rooms",
  "Family (5+)",
];
const NIGHTS_OPTIONS = [
  "All Nights",
  "1-3 Nights",
  "4-6 Nights",
  "7-9 Nights",
  "10+ Nights",
];
const NATIONALITIES = [
  "United Arab Emirates", "Saudi Arabia", "India", "Egypt", "United Kingdom",
  "United States", "Singapore", "France", "Germany", "Other",
];

const PROMO_IMAGE = "/images/packages/hero-banner.webp";

export default function PackagesHero() {
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(PAX_OPTIONS[1]);
  const [nights, setNights] = useState(NIGHTS_OPTIONS[0]);
  const [nationality, setNationality] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search backend not yet implemented — UI demo only.
    // eslint-disable-next-line no-console
    console.log("packages-search", { country, date, pax, nights, nationality });
  };

  return (
    <section className="cl-packages-hero">
      <Container>
        {/* White search card — full width */}
        <Form onSubmit={handleSubmit} className="cl-packages-search">
          <Row className="g-0 cl-packages-search-row">
            <Col xs={12} md={6} lg={3} className="cl-packages-field">
              <MapPin size={16} className="cl-packages-field-icon" />
              <Form.Select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Destination country">
                <option value="">Select Country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Form.Select>
            </Col>
            <Col xs={12} md={6} lg={3} className="cl-packages-field">
              <CalendarIcon size={16} className="cl-packages-field-icon" />
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Travel date"
              />
            </Col>
            <Col xs={12} md={6} lg={3} className="cl-packages-field">
              <Users size={16} className="cl-packages-field-icon" />
              <Form.Select value={pax} onChange={(e) => setPax(e.target.value)} aria-label="Travellers and rooms">
                {PAX_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </Form.Select>
            </Col>
            <Col xs={12} md={6} lg={3} className="cl-packages-field cl-packages-field-last">
              <Moon size={16} className="cl-packages-field-icon" />
              <Form.Select value={nights} onChange={(e) => setNights(e.target.value)} aria-label="Number of nights">
                {NIGHTS_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
              </Form.Select>
            </Col>
          </Row>
          <Row className="g-2 mt-2 align-items-stretch">
            <Col xs={12} md={5} lg={4} className="cl-packages-field cl-packages-field-bordered">
              <Globe size={16} className="cl-packages-field-icon" />
              <Form.Select value={nationality} onChange={(e) => setNationality(e.target.value)} aria-label="Nationality">
                <option value="">Nationality</option>
                {NATIONALITIES.map((n) => <option key={n} value={n}>{n}</option>)}
              </Form.Select>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <Button type="submit" className="btn-cta cl-packages-search-submit w-100">
                <Search size={16} className="me-2" />
                SEARCH NOW
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Promo banner — tropical image with text + CTA overlay on the right */}
        <div className="cl-packages-promo-banner">
          <Image
            src={PROMO_IMAGE}
            alt="Holiday packages"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 992px) 100vw, 1200px"
            unoptimized
            priority
          />
        </div>
      </Container>
    </section>
  );
}