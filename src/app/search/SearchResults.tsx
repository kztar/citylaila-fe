"use client";

import { useSearchParams } from "next/navigation";
import SearchPageTemplate from "@/components/SearchPageTemplate";
import { attractions, type Attraction } from "@/data/attractions";

/** Token-based "contains-all" match across name, category, city, tags. */
function searchAttractions(list: Attraction[], q: string): Attraction[] {
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  return list.filter((a) => {
    const haystack = [
      a.name,
      a.category.replace(/-/g, " "),
      a.city,
      ...(a.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}

export default function SearchResults() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const results = searchAttractions(attractions, query);

  if (!query) {
    return (
      <SearchPageTemplate
        title="Search experiences"
        subtitle="Type something into the search bar above to find attractions, tours, and activities."
        attractions={[]}
        emptyMessage="Try searching for a city (e.g. Dubai), a category (e.g. desert safari), or an attraction name."
      />
    );
  }

  const count = results.length;
  return (
    <SearchPageTemplate
      title={`Search results for "${query}"`}
      subtitle={`${count} experience${count !== 1 ? "s" : ""} found`}
      attractions={results}
      emptyMessage={`No experiences match "${query}". Try a different keyword.`}
    />
  );
}