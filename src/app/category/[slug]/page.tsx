import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Row, Col } from "react-bootstrap";
import AttractionCard from "@/components/AttractionCard";
import CategoryPills from "@/components/CategoryPills";
import { attractions, categories } from "@/data/attractions";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found - CityLaila" };
  return {
    title: `${cat.label} in Dubai & UAE - CityLaila`,
    description: `Book ${cat.label.toLowerCase()} tickets in Dubai, Abu Dhabi and beyond. Best prices, instant confirmation.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = attractions.filter((a) => a.category === slug);

  return (
    <>
      <div className="cl-page-hero py-4">
        <Container>
          <div className="d-flex align-items-center gap-3 mb-2">
            <span style={{ fontSize: 28 }}>{cat.icon}</span>
            <h1 className="text-white fw-bold mb-0" style={{ fontSize: 28 }}>{cat.label}</h1>
          </div>
          <p className="text-white-50 mb-0" style={{ fontSize: 14 }}>
            {items.length > 0
              ? `${items.length} experience${items.length !== 1 ? "s" : ""} available`
              : "Explore our curated selection"}
          </p>
        </Container>
      </div>

      <CategoryPills />

      <section className="py-5">
        <Container>
          {items.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ fontSize: 48 }} className="mb-3">🔍</p>
              <h2 className="cl-text-dark fw-bold mb-2" style={{ fontSize: 22 }}>No results yet</h2>
              <p className="text-secondary" style={{ fontSize: 14 }}>
                We&apos;re adding more experiences in this category soon. Check back later!
              </p>
            </div>
          ) : (
            <Row className="g-4">
              {items.map((attraction) => (
                <Col xs={12} sm={6} md={4} lg={3} key={attraction.id}>
                  <AttractionCard attraction={attraction} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}