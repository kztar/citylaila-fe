import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "react-bootstrap";
import SearchResults from "./SearchResults";

export const metadata: Metadata = {
  title: "Search - CityLaila",
  description: "Find your perfect attraction, tour, or experience across the UAE and beyond.",
};

function SearchFallback() {
  return (
    <section className="py-5">
      <Container>
        <p className="cl-text-dark mb-0">Loading results…</p>
      </Container>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}