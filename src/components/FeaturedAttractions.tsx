import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container, Row, Col } from "react-bootstrap";
import AttractionCard from "./AttractionCard";
import { attractions } from "@/data/attractions";

interface Props {
  title: string;
  subtitle?: string;
  city?: string;
  limit?: number;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export default function FeaturedAttractions({
  title,
  subtitle,
  city,
  limit = 8,
  showViewAll = true,
  viewAllHref = "/attractions",
}: Props) {
  const items = (city
    ? attractions.filter((a) => a.city === city)
    : attractions.filter((a) => a.featured)
  ).slice(0, limit);

  return (
    <section className="py-5">
      <Container>
        <div className="d-flex align-items-end justify-content-between mb-4">
          <div>
            <h2 className="cl-section-title mb-0">{title}</h2>
            {subtitle && <p className="text-secondary mt-1 mb-0 small">{subtitle}</p>}
          </div>
          {showViewAll && (
            <Link href={viewAllHref} className="cl-view-all">
              View All <ChevronRight size={16} />
            </Link>
          )}
        </div>

        <Row className="g-4">
          {items.map((attraction) => (
            <Col xs={12} sm={6} md={4} lg={3} key={attraction.id}>
              <AttractionCard attraction={attraction} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}