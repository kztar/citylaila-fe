import HeroSection from "@/components/HeroSection";
import AwardBar from "@/components/AwardBar";
import SummerOffers from "@/components/SummerOffers";
import WhyBookSection from "@/components/WhyBookSection";
import DestinationsSection from "@/components/DestinationsSection";
import ExclusiveDealsSection from "@/components/ExclusiveDealsSection";
import ComboToursSection from "@/components/ComboToursSection";
import ExclusiveDealWide from "@/components/ExclusiveDealWide";
import TravelGuidesSection from "@/components/TravelGuidesSection";
import PartnerLogosSection from "@/components/PartnerLogosSection";
import StatsBar from "@/components/StatsBar";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero / Banner — image carousel */}
      <HeroSection />

      {/* 2. Award Bar — 2024 Best Customer Satisfaction */}
      <AwardBar />

      {/* 3. Summer Offers — 3 promo banner cards */}
      <SummerOffers />

      {/* 4. Why Book with City Laila? — 4 feature columns */}
      <WhyBookSection />

      {/* 5. Top things to do in trending cities — horizontal slider */}
      <DestinationsSection />

      {/* 6. Exclusive Deals on Dubai's Top Experiences — 4-col grid */}
      <ExclusiveDealsSection />

      {/* 7. Combo Tours — 4-col grid */}
      <ComboToursSection />

      {/* 8. Exclusive Deal — wide horizontal cards */}
      <ExclusiveDealWide />

      {/* 9. Travel Guides & Trending Experiences — blog list + featured */}
      <TravelGuidesSection />

      {/* 10. Ticket Seller Partners — logo slider */}
      <PartnerLogosSection />

      {/* 11. Musement at a glance — 4 stat counters */}
      <StatsBar />

      {/* 12. Loved by Travellers — dark navy testimonial carousel */}
      <TestimonialsSection />
    </>
  );
}
