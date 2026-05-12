"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { categories } from "@/data/attractions";
import { cn } from "@/lib/utils";

const baseClass =
  "btn d-inline-flex align-items-center gap-1 px-3 py-1 rounded-2 fw-semibold flex-shrink-0 text-nowrap";
const inactive = "cl-bg-light text-dark border";
const active = "btn-cta";

export default function CategoryPills() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white shadow-sm border-bottom sticky-top" style={{ top: 60, zIndex: 1030 }}>
      <Container>
        <div className="d-flex align-items-center gap-2 overflow-auto scrollbar-hide py-2">
          <button
            onClick={() => setSelected(null)}
            className={cn(baseClass, selected === null ? active : inactive)}
            style={{ fontSize: 12 }}
          >
            All
          </button>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setSelected(cat.slug)}
              className={cn(baseClass, selected === cat.slug ? active : inactive)}
              style={{ fontSize: 12 }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}