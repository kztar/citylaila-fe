import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const offers = [
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//224/Yas island.webp",
    alt: "Yas Island Summer Sale — up to 45% off",
    href: "/city-tour/tour-details/yas-island-1-day-any-1-park-online-tickets-14514.aspx",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//224/Combo.webp",
    alt: "Combo Offer — up to 55% off",
    href: "/ComboDeals",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//224/BOGO.webp",
    alt: "Summer Deal — Buy 1 & Get 1 Attraction FREE",
    href: "/Free-Ticket-Offer",
  },
];

export default function SummerOffers() {
  return (
    <section className="py-4 bg-white">
      <Container>
        <h2 className="cl-section-title mb-3">Summer Offers</h2>
        <Row className="g-3">
          {offers.map((offer) => (
            <Col xs={12} sm={4} key={offer.href}>
              <Link
                href={offer.href}
                className="cl-img-hover-zoom d-block position-relative rounded-3 overflow-hidden cl-aspect-270-200"
              >
                <Image
                  src={offer.src}
                  alt={offer.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 576px) 100vw, 33vw"
                  unoptimized
                />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}