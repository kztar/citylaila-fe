import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SearchPageTemplate from "@/components/SearchPageTemplate";
import { attractions } from "@/data/attractions";
import { tourCategories } from "@/data/tourCategories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tourCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = tourCategories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found - CityLaila" };
  return {
    title: `${cat.label} - CityLaila`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = tourCategories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = attractions.filter((a) =>
    cat.attractionCategories.includes(a.category)
  );

  return (
    <SearchPageTemplate
      title={cat.label}
      subtitle={cat.description}
      attractions={items}
      emptyMessage={
        cat.attractionCategories.length === 0
          ? "We're adding experiences in this category soon — check back shortly."
          : "Try adjusting the filters or sidebar search."
      }
    />
  );
}