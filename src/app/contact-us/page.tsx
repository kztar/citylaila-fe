"use client";

import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const offices = [
  {
    city: "Dubai HQ",
    flag: "🇦🇪",
    address: "Al Moosa Tower 1, Maple Heights Business Center, 16th Floor, Sheikh Zayed Road, Dubai, UAE",
    phone: "+971 506 800 227",
    phone2: "+971 44511625",
  },
  { city: "Egypt", flag: "🇪🇬", address: "Cairo, Egypt", phone: "+20 100 000 0000" },
  { city: "Singapore", flag: "🇸🇬", address: "Singapore", phone: "+65 0000 0000" },
  { city: "India", flag: "🇮🇳", address: "India", phone: "+91 98000 00000" },
];

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="cl-page-hero">
        <Container className="text-center" style={{ maxWidth: 720 }}>
          <h1 className="mb-2" style={{ fontSize: 36 }}>Get in Touch with CityLaila</h1>
          <p className="mb-0" style={{ fontSize: 16 }}>
            Our team is available 24/7 to help with bookings, queries, and support.
          </p>
        </Container>
      </section>

      <section className="py-5">
        <Container style={{ maxWidth: 1100 }}>
          <Row className="g-4">
            {/* Contact Form */}
            <Col xs={12} lg={6}>
              <div
                className="bg-white rounded-4 border shadow-sm p-4 p-sm-5 h-100"
                style={{ borderColor: "var(--cl-border-light)" }}
              >
                <h2 className="cl-text-dark fw-bold mb-4" style={{ fontSize: 20 }}>Send Us a Message</h2>

                {submitted ? (
                  <div className="text-center py-5">
                    <div className="mb-3" style={{ fontSize: 48 }}>✅</div>
                    <h3 className="cl-text-dark fw-bold mb-2" style={{ fontSize: 18 }}>Message Sent!</h3>
                    <p className="text-secondary" style={{ fontSize: 14 }}>
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                      }}
                      className="btn btn-link mt-3 cl-text-primary fw-semibold"
                      style={{ fontSize: 14 }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <Row className="g-3">
                      <Col xs={12} sm={6}>
                        <Form.Label className="fw-semibold cl-text-dark mb-1" style={{ fontSize: 12 }}>
                          Full Name <span className="cl-text-cta">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="cl-form-input"
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Label className="fw-semibold cl-text-dark mb-1" style={{ fontSize: 12 }}>
                          Email Address <span className="cl-text-cta">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="cl-form-input"
                        />
                      </Col>
                    </Row>
                    <Row className="g-3">
                      <Col xs={12} sm={6}>
                        <Form.Label className="fw-semibold cl-text-dark mb-1" style={{ fontSize: 12 }}>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+971 50 000 0000"
                          className="cl-form-input"
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Label className="fw-semibold cl-text-dark mb-1" style={{ fontSize: 12 }}>
                          Subject
                        </Form.Label>
                        <Form.Select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="cl-form-select"
                        >
                          <option value="">Select a subject</option>
                          <option>Booking Enquiry</option>
                          <option>Cancellation / Refund</option>
                          <option>Technical Issue</option>
                          <option>Partnership / B2B</option>
                          <option>Other</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <div>
                      <Form.Label className="fw-semibold cl-text-dark mb-1" style={{ fontSize: 12 }}>
                        Message <span className="cl-text-cta">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="cl-form-textarea"
                      />
                    </div>
                    <Button type="submit" className="btn-cta w-100 fw-semibold py-2" style={{ borderRadius: ".5rem" }}>
                      Send Message
                    </Button>
                  </Form>
                )}
              </div>
            </Col>

            {/* Info panel */}
            <Col xs={12} lg={6}>
              <div className="d-flex flex-column gap-4">
                <div
                  className="cl-bg-soft rounded-4 border p-4"
                  style={{ borderColor: "var(--cl-border-light)" }}
                >
                  <h3 className="cl-text-dark fw-bold mb-3" style={{ fontSize: 16 }}>Quick Contact</h3>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <Phone size={16} className="cl-text-primary flex-shrink-0" />
                      <a href="tel:+971506800227" className="cl-text-dark fw-semibold" style={{ fontSize: 14 }}>
                        +971 506 800 227
                      </a>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Mail size={16} className="cl-text-primary flex-shrink-0" />
                      <a href="mailto:hello@citylaila.com" className="cl-text-dark fw-semibold" style={{ fontSize: 14 }}>
                        hello@citylaila.com
                      </a>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <Clock size={16} className="cl-text-primary flex-shrink-0 mt-1" />
                      <p className="cl-text-dark fw-medium mb-0" style={{ fontSize: 14 }}>24/7 Customer Support</p>
                    </div>
                    <div className="d-flex align-items-center gap-2 pt-2">
                      {[
                        { Icon: FaFacebookF, href: "https://www.facebook.com/CityLaila/" },
                        { Icon: FaInstagram, href: "https://www.instagram.com/citylailaa/" },
                        { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/city-laila" },
                      ].map(({ Icon, href }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-inline-flex align-items-center justify-content-center rounded-2 bg-white border cl-text-primary"
                          style={{ width: 36, height: 36, borderColor: "var(--cl-border-light)" }}
                        >
                          <Icon size={15} />
                        </a>
                      ))}
                      <a
                        href="https://wa.me/971506800227"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2 btn btn-success fw-semibold px-3 py-1 rounded-2"
                        style={{ fontSize: 12 }}
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  {offices.map((o) => (
                    <div
                      key={o.city}
                      className="bg-white rounded-3 border p-3 shadow-sm"
                      style={{ borderColor: "var(--cl-border-light)" }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span style={{ fontSize: 18 }}>{o.flag}</span>
                        <h4 className="cl-text-dark fw-bold mb-0" style={{ fontSize: 14 }}>{o.city}</h4>
                      </div>
                      <div className="d-flex flex-column gap-1 ps-4">
                        <div className="d-flex align-items-start gap-2">
                          <MapPin size={13} className="cl-text-primary flex-shrink-0 mt-1" />
                          <p className="text-secondary mb-0" style={{ fontSize: 12 }}>{o.address}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Phone size={13} className="cl-text-primary flex-shrink-0" />
                          <a href={`tel:${o.phone}`} className="cl-text-dark fw-semibold" style={{ fontSize: 12 }}>
                            {o.phone}
                          </a>
                        </div>
                        {o.phone2 && (
                          <div className="d-flex align-items-center gap-2">
                            <Phone size={13} className="cl-text-primary flex-shrink-0" />
                            <a href={`tel:${o.phone2}`} className="cl-text-dark fw-semibold" style={{ fontSize: 12 }}>
                              {o.phone2}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}