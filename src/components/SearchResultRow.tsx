import Link from "next/link";
import Image from "next/image";
import { Star, FileText, Clock, CheckCircle2, Zap } from "lucide-react";
import type { Attraction } from "@/data/attractions";

export default function SearchResultRow({ attraction }: { attraction: Attraction }) {
  const {
    name,
    slug,
    image,
    priceFrom,
    currency,
    originalPrice,
    rating,
    reviewCount,
    bookedCount,
  } = attraction;

  return (
    <article className="cl-search-result">
      <Link href={`/attractions/${slug}`} className="cl-search-result-img">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          sizes="200px"
          unoptimized
        />
      </Link>

      <div className="cl-search-result-body">
        <h3 className="cl-search-result-title">
          <Link href={`/attractions/${slug}`}>{name}</Link>
        </h3>

        <p className="cl-search-result-meta">
          {rating ? (
            <>
              <Star size={12} className="cl-star" fill="currentColor" />
              <strong className="ms-1">{rating}</strong>
            </>
          ) : null}
          {reviewCount ? (
            <span className="ms-2 text-secondary">{reviewCount} Reviews</span>
          ) : null}
          {bookedCount ? (
            <span className="ms-1 text-secondary">/ ({bookedCount} booked)</span>
          ) : null}
        </p>

        <div className="cl-search-result-pills">
          <span className="cl-info-pill"><FileText size={11} /> Description</span>
          <span className="cl-info-pill"><Clock size={11} /> Timings</span>
          <span className="cl-info-pill"><CheckCircle2 size={11} /> Inclusion</span>
        </div>
      </div>

      <div className="cl-search-result-action">
        <span className="cl-instant-confirm">
          <Zap size={12} fill="currentColor" /> Get Instant Confirm
        </span>
        <div className="cl-search-result-price-block">
          <p className="cl-search-result-from">From</p>
          <p className="cl-search-result-price">
            {currency} {priceFrom}
          </p>
          {originalPrice && originalPrice > priceFrom && (
            <p className="cl-search-result-original">
              {currency} {originalPrice}
            </p>
          )}
        </div>
        <Link href={`/attractions/${slug}`} className="btn btn-cta btn-cta-md w-100 text-center">
          Book Now
        </Link>
      </div>
    </article>
  );
}