"use client";

import { Accordion, Container } from "react-bootstrap";

const faqs = [
  {
    q: "How will I get my booked tickets?",
    a: "You will get your booked tickets through your email address or WhatsApp as soon as you have completed your transaction. If you face any difficulty in receiving your tickets you can contact our 24×7 customer support team, which will provide you with instant service and help.",
  },
  {
    q: "What is CityLaila's refund and cancellation policy?",
    a: "CityLaila provides convenient booking options and a flexible refund and cancellation policy for your ease and peace of mind. Customers can receive a refund for attractions and tours within 7 working days. For other products, the refund process follows the policy set by the respective partners. If the partners initiate the refund, it will be processed within 4 working days. Each product has its own specific refund and return policy, which can be found on the website.",
  },
  {
    q: "What payment methods are available?",
    a: "CityLaila offers multiple secure and reliable payment methods ensuring a safe transaction process — including Visa, Mastercard, and debit cards. We use the world's safest payment gateway to protect your financial information.",
  },
  {
    q: "What is the cancellation window?",
    a: "For eligible products, you can cancel within 72 hours after payment and receive a full refund. Some products may have different cancellation windows — please check the individual product page for specific terms.",
  },
  {
    q: "How does 24/7 support work?",
    a: "CityLaila has a dedicated and helpful customer support team available around the clock (24/7) to assist you with any issues or queries you may encounter. You can reach us via WhatsApp at +971 506 800 227 or by phone at +971 44511625.",
  },
  {
    q: "Can I book for a group?",
    a: "Yes! CityLaila supports group bookings. For large groups, we recommend contacting our support team directly via WhatsApp or email for the best available rates and a tailored experience.",
  },
  {
    q: "Are the tickets instant-confirmation?",
    a: "Most of our attraction tickets are instant-confirmation — you'll receive your e-ticket within seconds of completing your payment via email and WhatsApp. Where instant confirmation is available, it's clearly marked on the product page.",
  },
  {
    q: "Do I need to print my ticket?",
    a: "No — all our tickets are mobile tickets. Simply show the e-ticket on your phone at the venue entrance. No printing required.",
  },
  {
    q: "What is the loyalty points programme?",
    a: "CityLaila offers a loyalty rewards programme where you earn 3.2% back in points on eligible purchases. Points can be redeemed on future bookings.",
  },
];

export default function FAQsPage() {
  return (
    <>
      <section className="cl-page-hero">
        <Container className="text-center" style={{ maxWidth: 720 }}>
          <h1 className="mb-2" style={{ fontSize: 36 }}>Frequently Asked Questions</h1>
          <p className="mb-0" style={{ fontSize: 16 }}>
            Everything you need to know about booking with CityLaila
          </p>
        </Container>
      </section>

      <section className="py-5">
        <Container style={{ maxWidth: 760 }}>
          <Accordion flush className="d-flex flex-column gap-2">
            {faqs.map((item, i) => (
              <Accordion.Item
                eventKey={String(i)}
                key={item.q}
                className="border rounded-3 overflow-hidden"
                style={{ borderColor: "var(--cl-border-light)" }}
              >
                <Accordion.Header>
                  <span className="cl-text-dark fw-semibold" style={{ fontSize: 14 }}>{item.q}</span>
                </Accordion.Header>
                <Accordion.Body className="text-secondary" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  {item.a}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <div
            className="mt-5 cl-bg-soft border rounded-4 p-4 p-sm-5 text-center"
            style={{ borderColor: "var(--cl-border-light)" }}
          >
            <h3 className="cl-text-dark fw-bold mb-2" style={{ fontSize: 18 }}>Still have questions?</h3>
            <p className="text-secondary mb-4" style={{ fontSize: 14 }}>
              Our support team is available 24/7 via WhatsApp or email.
            </p>
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <a
                href="https://wa.me/971506800227"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success fw-semibold px-4 py-2 rounded-2"
                style={{ fontSize: 14 }}
              >
                💬 Chat on WhatsApp
              </a>
              <a
                href="mailto:hello@citylaila.com"
                className="btn btn-cta fw-semibold px-4 py-2"
                style={{ fontSize: 14, borderRadius: ".5rem" }}
              >
                ✉️ Send an Email
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}