import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const blogPosts = [
  {
    title: "Best Places for Ramadan Shopping in Dubai 2026",
    href: "https://blog.citylaila.com/best-places-for-ramadan-shopping-in-dubai-2026/",
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//11/Ramadan-in-Dubai-2023-4-1024x640.webp",
  },
  {
    title: "Dubai Shopping Festival 2025–26: Ultimate Guide for Shoppers and Travelers",
    href: "https://blog.citylaila.com/dubai-shopping-festival-2025-26-ultimate-guide-for-shoppers-and-travelers/",
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//11/BLOGS2.jpg",
  },
  {
    title: "Complete Travel Guide: Planning Your Dubai & Abu Dhabi Holiday for Christmas and New Year 2026",
    href: "https://blog.citylaila.com/complete-travel-guide-planning-your-dubai-abu-dhabi-holiday-for-christmas-and-new-year-2026/",
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//11/BLOG 3.jpeg",
  },
  {
    title: "Qasr Al Watan – Explore the Presidential Palace of Abu Dhabi",
    href: "https://blog.citylaila.com/qasr-al-watan-explore-the-presidential-palace-of-abu-dhabi/",
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//11/qasr-al-watan.jpg",
  },
  {
    title: "Unveiling the Remarkable Journey of City Laila",
    href: "https://blog.citylaila.com/",
    img: "https://d3gvlpbdidhqp.cloudfront.net//assets/static-banner/WebsiteWiseContentImage//11/Ramadan-in-Dubai-2023-4-1024x640.webp",
  },
];

const featuredPost = {
  title: "Unveiling the Remarkable Journey of City Laila",
  href: "https://blog.citylaila.com/",
  img: "https://d3gvlpbdidhqp.cloudfront.net/assets/whitelable1//img/citylaila/imagejourney.jpg",
};

export default function TravelGuidesSection() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="cl-section-title mb-4">CityLaila Travel Guides &amp; Trending Experiences</h2>
        <Row className="g-4">
          <Col xs={12} lg={6}>
            <div className="d-flex flex-column gap-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.href + post.title}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-3 rounded-2 p-2"
                  style={{ transition: "background-color .2s" }}
                >
                  <div className="position-relative flex-shrink-0 rounded-2 overflow-hidden" style={{ width: 100, height: 70 }}>
                    <Image src={post.img} alt={post.title} fill style={{ objectFit: "cover" }} sizes="100px" unoptimized />
                  </div>
                  <p className="cl-text-muted fw-semibold cl-line-clamp-3 mb-0" style={{ fontSize: 14 }}>{post.title}</p>
                </Link>
              ))}
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <Link
              href={featuredPost.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cl-img-hover-zoom d-block position-relative rounded-3 overflow-hidden h-100"
              style={{ minHeight: 320 }}
            >
              <Image
                src={featuredPost.img}
                alt={featuredPost.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 992px) 100vw, 50vw"
                unoptimized
              />
              <div
                className="position-absolute top-0 start-0 end-0 bottom-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.2) 50%, transparent 100%)",
                }}
              />
              <p
                className="position-absolute text-white fw-bold mb-0"
                style={{ bottom: 16, left: 16, right: 16, fontSize: 18, lineHeight: 1.3, zIndex: 2 }}
              >
                {featuredPost.title}
              </p>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}