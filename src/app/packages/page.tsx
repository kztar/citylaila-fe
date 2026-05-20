import type { Metadata } from "next";
import PackagesHero from "@/components/PackagesHero";
import JackpotDealsCarousel from "@/components/JackpotDealsCarousel";
import WorldDestinationsCarousel from "@/components/WorldDestinationsCarousel";
import HappyClientsSection from "@/components/HappyClientsSection";
import ReadingCornerCarousel from "@/components/ReadingCornerCarousel";

export const metadata: Metadata = {
  title: "Holiday Packages - CityLaila",
  description:
    "Search and book curated holiday packages — Vietnam, Thailand, Bali, Egypt, UAE and more. Save upto 35% on top-selling itineraries.",
  keywords:
    "Holiday packages, Vietnam holidays, Thailand tours, Bali packages, Egypt holidays, UAE tour packages",
};

export default function PackagesPage() {
  return (
    <>
      {/* 1. Hero with Search Now form + holiday-packages promo */}
      <PackagesHero />

      {/* 2. Jackpot deals on top selling packages — carousel */}
      <JackpotDealsCarousel />

      {/* 3. Explore world's top destinations — carousel */}
      <WorldDestinationsCarousel />

      {/* 4. Our happy clients — grid (NOT a carousel, per live site) */}
      <HappyClientsSection />

      {/* 5. Reading Corner — carousel */}
      <ReadingCornerCarousel />
    </>
  );
}