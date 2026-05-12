import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

const reasons = [
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//2/Screenshot_2023-12-04_012807-removebg-preview.webp",
    text: "98% of bookings receive instant confirmation via Email & WhatsApp backed by 24/7 customer support.",
  },
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//2/images-removebg-preview222.webp",
    text: "Get unbeatable prices on UAE attractions, global tours & holiday packages. 95% of our products are listed at the lowest price in the market.",
  },
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//2/top-reason03.webp",
    text: "Rated 4.9 for fast service, trusted booking experience and personalised recommendations for every traveller.",
  },
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//2/Screenshot_2023-12-04_013701-removebg-preview.webp",
    text: "Personalised recommendations for your budget & travel style + 24/7 WhatsApp support before, during & after your trip.",
  },
];

export default function WhyBookSection() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="cl-section-title mb-4">Why Book with City Laila?</h2>
        <Row className="g-3">
          {reasons.map((r) => (
            <Col xs={12} sm={6} lg={3} key={r.text}>
              <div className="cl-whybook-card">
                <div className="cl-whybook-icon">
                  <Image src={r.img} alt="" fill style={{ objectFit: "contain" }} sizes="48px" unoptimized />
                </div>
                <p className="cl-whybook-text">{r.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}