import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

const stats = [
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//5/Musement-at-a-glance01.webp",
    value: "20K+",
    label: "Attractions",
  },
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//5/coronavirus copy.webp",
    value: "44+",
    label: "Countries",
  },
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//5/Musement-at-a-glance03.webp",
    value: "1M+",
    label: "Happy Customers",
  },
  {
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//5/Musement-at-a-glance02.webp",
    value: "5+",
    label: "Awards",
  },
];

export default function StatsBar() {
  return (
    <section className="py-5 bg-white">
      <Container className="text-center">
        <h2 className="cl-section-title mb-5">Musement at a glance</h2>
        <Row className="g-4">
          {stats.map((stat) => (
            <Col xs={6} sm={3} key={stat.label}>
              <div className="d-flex flex-column align-items-center">
                <div className="position-relative mb-3" style={{ width: 80, height: 80 }}>
                  <Image src={stat.img} alt={stat.label} fill style={{ objectFit: "contain" }} sizes="80px" unoptimized />
                </div>
                <span className="cl-text-cta fw-bold" style={{ fontSize: 24 }}>{stat.value}</span>
                <span className="cl-text-muted fw-medium mt-1" style={{ fontSize: 14 }}>{stat.label}</span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}