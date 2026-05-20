import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

const CDN = "https://d3gvlpbdidhqp.cloudfront.net";

const clients = [
  {
    name: "T H",
    avatar: `${CDN}//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 154840.png`,
    quote: "Citylaila are very professional, helpful and friendly.",
  },
  {
    name: "Muhammad Ibrahim",
    avatar: `${CDN}//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 155622.png`,
    quote:
      "I am a United States Citizen and have travelled domestically and internationally multiple times. I have used travelocity, Airbnb and Booking.",
  },
  {
    name: "Nidhi Pujaramishri",
    avatar: `${CDN}//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 155527.png`,
    quote: "Competitive discount pricing and prompt service.",
  },
  {
    name: "Diamond Talayeh",
    avatar: `${CDN}//assets/static-banner/WebsiteWiseContentImage//10/Screenshot 2025-06-21 154549.png`,
    quote: "Excellent customer service, fast and friendly thanks.",
  },
];

export default function HappyClientsSection() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="cl-section-title mb-4">Our happy clients</h2>
        <Row className="g-4">
          {clients.map((client) => (
            <Col xs={12} sm={6} lg={3} key={client.name}>
              <article className="cl-client-card">
                <div className="cl-client-avatar">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="96px"
                    unoptimized
                  />
                </div>
                <div className="cl-client-body">
                  <p className="cl-client-quote">{client.quote}</p>
                  <p className="cl-client-name">{client.name}</p>
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}