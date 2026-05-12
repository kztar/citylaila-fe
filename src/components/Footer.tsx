import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { Container, Row, Col } from "react-bootstrap";

const whyCityLaila = [
  "Instant confirmation. Purchase anytime you need it, anywhere you want it.",
  "1M+ Happy customers",
  "20000+ attractions from 80+ Countries",
  "Get the lowest prices and last-minute deals",
  "Have a question? Live chat with our experts 24×7",
  "World's safest payment gateway",
  "3000+ reviews on Google & Trustpilot with 4.8★",
];

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "About CityLaila", href: "/about-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms And Conditions", href: "/terms-and-condition" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Agent Signup", href: "https://b2b.citylaila.com/" },
  { label: "Our Blog", href: "https://blog.citylaila.com/" },
  { label: "FAQ", href: "/faq" },
];

const paymentIcons = [
  "Visa", "Mastercard", "American Express", "Diners Club",
  "tabby", "Apple Pay", "Google Pay",
];

export default function Footer() {
  return (
    <footer className="cl-footer">
      <Container className="py-5">
        <Row className="g-4">
          {/* Col 1 — Company Info */}
          <Col xs={12} sm={6} lg={3}>
            <div className="mb-3">
              <img
                src="https://d3gvlpbdidhqp.cloudfront.net/assets/WhitelableLogo/1/2/logo.webp?v4"
                alt="CityLaila"
                width={120}
                height={38}
              />
            </div>
            <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: 12, lineHeight: 1.5 }}>
              <p className="cl-text-dark fw-bold mb-1" style={{ fontSize: 13 }}>Global Headquarters :</p>
              <div className="d-flex gap-2">
                <MapPin size={13} className="flex-shrink-0 mt-1 cl-text-primary" />
                <p className="mb-0 text-secondary">
                  CityLaila FZ-LLC, Al Moosa Tower 1, Maple Heights Business Center 16th Floor, Sheikh Zayed Rd – Metro Station – near Emirates Tower – Dubai – UAE
                </p>
              </div>
              <div className="d-flex gap-2">
                <Phone size={13} className="flex-shrink-0 mt-1 cl-text-primary" />
                <div className="text-secondary">
                  <a href="tel:+971506800227" className="d-block cl-text-dark">Phone / WhatsApp: (+971) 506800227</a>
                  <a href="tel:+97144511625" className="d-block cl-text-dark">Phone: (+971) 44511625</a>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Mail size={13} className="flex-shrink-0 mt-1 cl-text-primary" />
                <a href="mailto:info@citylaila.com" className="cl-text-dark">info@citylaila.com</a>
              </div>
            </div>
            <p className="cl-text-dark fw-bold mb-2" style={{ fontSize: 13 }}>Our International Offices</p>
            <div className="d-flex flex-column gap-1 text-secondary" style={{ fontSize: 12 }}>
              <p className="mb-0">Egypt: Alexandria — <a href="tel:+201129090043" className="cl-text-dark">(+20) 1129090043</a></p>
              <p className="mb-0">Singapore: Singapore city — <a href="tel:+6592310720" className="cl-text-dark">(+65) 92310720</a></p>
              <p className="mb-0">India: HSR, Bangalore — <a href="tel:+919591052942" className="cl-text-dark">(+91) 9591052942</a></p>
            </div>
          </Col>

          {/* Col 2 — Why CityLaila */}
          <Col xs={12} sm={6} lg={3}>
            <h4>WHY CITYLAILA?</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {whyCityLaila.map((item) => (
                <li key={item} className="d-flex gap-2 text-secondary" style={{ fontSize: 12, lineHeight: 1.4 }}>
                  <span className="cl-text-cta flex-shrink-0">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Col>

          {/* Col 3 — Useful Links */}
          <Col xs={12} sm={6} lg={3}>
            <h4>Useful Links</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="cl-text-dark"
                    style={{ fontSize: 12 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Col 4 — We Accept + Follow Us */}
          <Col xs={12} sm={6} lg={3}>
            <h4>We Accept</h4>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {paymentIcons.map((p) => (
                <span key={p} className="cl-payment-pill">{p}</span>
              ))}
            </div>
            <h4>Follow Us</h4>
            <div className="d-flex gap-2">
              <a
                href="https://www.facebook.com/CityLaila"
                target="_blank"
                rel="noopener noreferrer"
                className="cl-social-icon fb"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://www.linkedin.com/company/city-laila/"
                target="_blank"
                rel="noopener noreferrer"
                className="cl-social-icon li"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://www.instagram.com/citylailaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="cl-social-icon ig"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://www.youtube.com/@citylaila"
                target="_blank"
                rel="noopener noreferrer"
                className="cl-social-icon yt"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="cl-footer-bottom">
        <Container className="py-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
          <p className="text-secondary mb-0" style={{ fontSize: 12 }}>CityLaila © 2026 All rights reserved</p>
          <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
            Design and Developed by{" "}
            <a href="#" className="cl-text-primary">
              Kztar Technologies
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}