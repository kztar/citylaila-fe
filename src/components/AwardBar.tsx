import Image from "next/image";
import { Container } from "react-bootstrap";

const reviewPlatforms = [
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//3/logo 1.webp",
    alt: "Google Reviews — 1000+ Reviews, 4.9",
    href: "https://www.google.com/maps/place/City+Laila",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//3/LOGO 3.webp",
    alt: "Facebook — Excellent, 35K+ Reviews, 5.0",
    href: "https://www.facebook.com/CityLaila/reviews",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//3/LOGO 2.webp",
    alt: "Trustpilot — 1000+ Reviews, 4.7",
    href: "https://www.trustpilot.com/review/citylaila.com",
  },
  {
    src: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//3/LOGO 4.webp",
    alt: "IATA Accredited",
    href: "",
  },
];

export default function AwardBar() {
  return (
    <section className="bg-white border-bottom" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <Container className="text-center">
        <h2 className="cl-text-dark fw-bold mb-3" style={{ fontSize: 28 }}>
          Proud Winner of The 2024 Best Customer Satisfaction Award in ME
        </h2>
        <p className="text-secondary mb-5" style={{ fontSize: 16 }}>
          Honoured For Achieving One of The Highest Travellers Ratings Globally &bull; A Remarkable 4.8/5 Across All Major Review Platforms
        </p>
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 gap-sm-5">
          {reviewPlatforms.map((platform) =>
            platform.href ? (
              <a
                key={platform.alt}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="position-relative d-inline-block"
                style={{ height: 150, width: 240, opacity: 0.95 }}
              >
                <Image src={platform.src} alt={platform.alt} fill style={{ objectFit: "contain" }} sizes="240px" unoptimized />
              </a>
            ) : (
              <div key={platform.alt} className="position-relative d-inline-block" style={{ height: 150, width: 240 }}>
                <Image src={platform.src} alt={platform.alt} fill style={{ objectFit: "contain" }} sizes="240px" unoptimized />
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}