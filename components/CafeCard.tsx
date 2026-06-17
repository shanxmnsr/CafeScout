
"use client";

import { forwardRef } from "react";
import { Wifi } from "lucide-react";
import { Cafe } from "@/types/cafe";
import { getDistanceKm } from "@/utils/distance";

interface CafeCardProps {
  cafe: Cafe;
  onViewDetails: (cafe: Cafe) => void;
  onClick?: () => void;
  isSelected?: boolean;
  userLocation?: [number, number] | null;
}

const CafeCard = forwardRef<HTMLDivElement, CafeCardProps>(
  (
    { cafe, onViewDetails, onClick, isSelected = false, userLocation },
    ref
  ) => {
    const distance = userLocation
      ? getDistanceKm(
          userLocation[0],
          userLocation[1],
          cafe.lat,
          cafe.lon
        ).toFixed(1)
      : null;

    const imageSrc = cafe.image || "/cafes/cafe-1.jpg";

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`
          group cursor-pointer rounded-2xl sm:rounded-3xl border bg-white
          p-3 sm:p-4
          transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
          ${
            isSelected
              ? "border-indigo-500 shadow-indigo-100 scale-[1.02]"
              : "border-black/5 shadow-sm hover:border-black/10"
          }
        `}
      >
        {/* IMAGE */}
        <div className="relative h-40 sm:h-44 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100">
          <img
            src={imageSrc}
            alt={cafe.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="mt-3 sm:mt-4 space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
            {cafe.name}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-[#6B5A4A] line-clamp-2">
            {cafe.address !== "Address not available"
              ? cafe.address
              : "Location unavailable"}
          </p>

          {distance && (
            <p className="mt-1 text-[11px] sm:text-xs text-[#6B5A4A]">
              {distance} km away
            </p>
          )}
        </div>

        {/* TAGS */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
          {cafe.wifi && (
            <span className="flex items-center gap-1 rounded-full border border-black/5 bg-neutral-50 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs text-neutral-700">
              <Wifi size={12} />
              WiFi
            </span>
          )}
        </div>

        {/* ACTION */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(cafe);
          }}
          className="
            mt-4 sm:mt-5 w-full rounded-xl sm:rounded-2xl bg-neutral-900
            py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white
            transition hover:bg-neutral-800 active:scale-[0.98]
          "
        >
          View details
        </button>
      </div>
    );
  }
);

CafeCard.displayName = "CafeCard";

export default CafeCard;