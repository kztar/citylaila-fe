import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Attraction } from "@/data/attractions";

export default function AttractionCard({ attraction }: { attraction: Attraction }) {
  const {
    name,
    slug,
    image,
    priceFrom,
    currency,
    originalPrice,
    discountPercent,
    rating,
    reviewCount,
    bookedCount,
  } = attraction;

  const savings = originalPrice ? originalPrice - priceFrom : null;

  return (
    <Link href={`/attractions/${slug}`} className="cl-card">
      {/* Image area */}
      <div className="cl-card-img">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
        />
        {savings && savings > 0 ? (
          <span className="cl-pill-savings">{currency} {savings} off</span>
        ) : discountPercent ? (
          <span className="cl-pill-savings">{discountPercent}% OFF</span>
        ) : null}
        <span className="cl-pill-lpd">Lowest Price Deal</span>
      </div>

      {/* Card body */}
      <div className="p-3">
        <h3
          className="cl-text-dark fw-semibold cl-line-clamp-2 mb-1"
          style={{ fontSize: 14, minHeight: 40 }}
        >
          {name}
        </h3>

        {rating && (
          <div className="d-flex align-items-center gap-1 mb-1 flex-wrap">
            <Star size={11} className="cl-star flex-shrink-0" fill="currentColor" />
            <span className="cl-text-dark fw-semibold" style={{ fontSize: 12 }}>{rating}</span>
            {reviewCount && (
              <span className="text-secondary" style={{ fontSize: 11 }}>
                {reviewCount} Reviews{bookedCount ? ` / (${bookedCount} booked)` : ""}
              </span>
            )}
          </div>
        )}

        <p className="text-success fw-medium mb-2" style={{ fontSize: 11 }}>Available Today</p>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="text-secondary fw-medium mb-0" style={{ fontSize: 10 }}>from</p>
            <div className="d-flex align-items-baseline gap-1">
              <span className="cl-text-dark fw-bold" style={{ fontSize: 14 }}>{currency} {priceFrom}</span>
              {originalPrice && (
                <span className="text-secondary text-decoration-line-through" style={{ fontSize: 11 }}>
                  {currency} {originalPrice}
                </span>
              )}
            </div>
          </div>
          <span className="btn btn-cta btn-cta-md">Book Now</span>
        </div>
      </div>
    </Link>
  );
}