"use client";

import { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Accordion,
  Pagination,
} from "react-bootstrap";
import { Search } from "lucide-react";
import SearchResultRow from "./SearchResultRow";
import type { Attraction } from "@/data/attractions";

const POPULAR_FILTERS = [
  { id: "today-available", label: "Today Available" },
  { id: "instant-confirm", label: "Instant Confirm" },
];

const SORT_OPTIONS = [
  { id: "popular",      label: "Most Popular" },
  { id: "price-asc",    label: "Lowest Price" },
  { id: "price-desc",   label: "Highest Price" },
  { id: "recommended",  label: "Recommended" },
] as const;

type SortId = (typeof SORT_OPTIONS)[number]["id"];

export interface SearchPageTemplateProps {
  /** Page H1 — also surfaces in document title via parent. */
  title: string;
  /** Optional sub-heading (e.g. "12 experiences found"). */
  subtitle?: string;
  /** Attractions to render — already filtered by the parent (URL query, category slug, etc.). */
  attractions: Attraction[];
  /** Optional empty-state body. */
  emptyMessage?: string;
  /** Page size for pagination. Defaults to 20 (matches live site). */
  pageSize?: number;
}

/**
 * Canonical listing/search-results template.
 * Layout: left sidebar (refine search + filters), right column (sort bar + vertical
 * list of SearchResultRow + pagination). Matches the live citylaila.com search page.
 */
export default function SearchPageTemplate({
  title,
  subtitle,
  attractions,
  emptyMessage,
  pageSize = 20,
}: SearchPageTemplateProps) {
  const [filterText, setFilterText] = useState("");
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [popularFilters, setPopularFilters] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortId>("popular");
  const [page, setPage] = useState(1);

  // Categories present in the current attraction set (so the filter UI is relevant)
  const availableCategories = useMemo(
    () => Array.from(new Set(attractions.map((a) => a.category))).sort(),
    [attractions]
  );

  // Filter
  const filtered = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    return attractions.filter((a) => {
      if (q) {
        const hay = [
          a.name,
          a.category.replace(/-/g, " "),
          a.city,
          ...(a.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (priceMin !== "" && a.priceFrom < priceMin) return false;
      if (priceMax !== "" && a.priceFrom > priceMax) return false;
      if (selectedCategories.size > 0 && !selectedCategories.has(a.category)) return false;
      // Popular filters: stub — all our records assume instant-confirm + today-available.
      // Real wiring will require `instantConfirm` / `availableToday` fields on Attraction.
      return true;
    });
  }, [attractions, filterText, priceMin, priceMax, selectedCategories]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "price-asc":
        arr.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "price-desc":
        arr.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "popular":
      case "recommended":
        arr.sort((a, b) => (b.bookedCount ?? 0) - (a.bookedCount ?? 0));
        break;
    }
    return arr;
  }, [filtered, sortBy]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(startIdx, startIdx + pageSize);

  const toggleSet = (set: Set<string>, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const onCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) => toggleSet(prev, cat));
    setPage(1);
  };
  const onPopularToggle = (id: string) => {
    setPopularFilters((prev) => toggleSet(prev, id));
    setPage(1);
  };

  const prettyCategory = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Pagination window (always show first, last, current ± 1, with ellipses)
  const pageNumbers: (number | "ellipsis")[] = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const result: (number | "ellipsis")[] = [1];
    if (currentPage > 3) result.push("ellipsis");
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
      result.push(p);
    }
    if (currentPage < totalPages - 2) result.push("ellipsis");
    result.push(totalPages);
    return result;
  }, [currentPage, totalPages]);

  return (
    <section className="py-4 cl-search-page">
      <Container>
        <Row className="g-4">
          {/* ── Sidebar ── */}
          <Col xs={12} md={4} lg={3}>
            <aside className="cl-search-sidebar">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
                className="mb-3"
              >
                <InputGroup className="cl-sidebar-search">
                  <Form.Control
                    type="text"
                    placeholder="Search Your Tour"
                    value={filterText}
                    onChange={(e) => {
                      setFilterText(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Refine results"
                  />
                  <Button type="submit" className="btn-cta" aria-label="Search">
                    <Search size={15} />
                  </Button>
                </InputGroup>
              </Form>

              <h3 className="cl-filter-heading">Filter</h3>

              <Accordion
                defaultActiveKey={["price", "popular", "category"]}
                alwaysOpen
                flush
                className="cl-filter-accordion"
              >
                <Accordion.Item eventKey="price">
                  <Accordion.Header>Price</Accordion.Header>
                  <Accordion.Body>
                    <Row className="g-2">
                      <Col xs={6}>
                        <Form.Label className="cl-filter-label">MIN</Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          value={priceMin}
                          onChange={(e) => {
                            setPriceMin(e.target.value === "" ? "" : Number(e.target.value));
                            setPage(1);
                          }}
                          placeholder="0"
                          size="sm"
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Label className="cl-filter-label">MAX</Form.Label>
                        <Form.Control
                          type="number"
                          min={0}
                          value={priceMax}
                          onChange={(e) => {
                            setPriceMax(e.target.value === "" ? "" : Number(e.target.value));
                            setPage(1);
                          }}
                          placeholder="9999"
                          size="sm"
                        />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="popular">
                  <Accordion.Header>Popular Filters</Accordion.Header>
                  <Accordion.Body>
                    {POPULAR_FILTERS.map((f) => (
                      <Form.Check
                        key={f.id}
                        type="checkbox"
                        id={`pop-${f.id}`}
                        label={f.label}
                        checked={popularFilters.has(f.id)}
                        onChange={() => onPopularToggle(f.id)}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="category">
                  <Accordion.Header>Tour Category</Accordion.Header>
                  <Accordion.Body>
                    {availableCategories.length === 0 ? (
                      <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                        No categories available
                      </p>
                    ) : (
                      availableCategories.map((cat) => (
                        <Form.Check
                          key={cat}
                          type="checkbox"
                          id={`cat-${cat}`}
                          label={prettyCategory(cat)}
                          checked={selectedCategories.has(cat)}
                          onChange={() => onCategoryToggle(cat)}
                        />
                      ))
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </aside>
          </Col>

          {/* ── Results ── */}
          <Col xs={12} md={8} lg={9}>
            {/* Page heading (subtle — no hero bar, matches live site) */}
            <div className="mb-3">
              <h1 className="cl-text-dark fw-bold mb-1" style={{ fontSize: 18 }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Sort bar */}
            <div className="cl-sort-bar d-flex align-items-center mb-3 gap-1 flex-wrap">
              <span className="cl-sort-label">Sort By :</span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`cl-sort-option${sortBy === opt.id ? " active" : ""}`}
                  onClick={() => {
                    setSortBy(opt.id);
                    setPage(1);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-5">
                <p style={{ fontSize: 48 }} className="mb-3">🔍</p>
                <h2 className="cl-text-dark fw-bold mb-2" style={{ fontSize: 22 }}>
                  No experiences found
                </h2>
                <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
                  {emptyMessage ?? "Try a different keyword or adjust your filters."}
                </p>
              </div>
            ) : (
              <>
                <div className="d-flex flex-column gap-3">
                  {pageItems.map((a) => (
                    <SearchResultRow key={a.id} attraction={a} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination className="cl-pagination mb-0">
                      <Pagination.Prev
                        onClick={() => setPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      />
                      {pageNumbers.map((p, i) =>
                        p === "ellipsis" ? (
                          <Pagination.Ellipsis key={`e-${i}`} disabled />
                        ) : (
                          <Pagination.Item
                            key={p}
                            active={p === currentPage}
                            onClick={() => setPage(p)}
                          >
                            {p}
                          </Pagination.Item>
                        )
                      )}
                      <Pagination.Next
                        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}