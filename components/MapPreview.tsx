
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import { Cafe } from "@/types/cafe";
import { getDistanceKm } from "@/utils/distance";

const CafeMap = dynamic(() => import("./CafeMap"), {
  ssr: false,
});

interface MapPreviewProps {
  cafes: Cafe[];
  userLocation: [number, number] | null;
}

export default function MapPreview({ cafes, userLocation }: MapPreviewProps) {
  const nearestCafe: (Cafe & { distance: number }) | null =
    userLocation && cafes.length > 0
      ? cafes
          .map((cafe) => ({
            ...cafe,
            distance: getDistanceKm(
              userLocation[0],
              userLocation[1],
              cafe.lat,
              cafe.lon
            ),
          }))
          .sort((a, b) => a.distance - b.distance)[0]
      : null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
      
      {/* HEADER */}
      <div className="text-center">
        <span className="rounded-full border border-[#D5CEA3] bg-white/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#3C2A21]">
          Explore Nearby
        </span>

        <h2 className="font-heading mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A120B]">
          Find Cafes Around You
        </h2>

        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-[#6B5A4A]">
          Discover real nearby cafes based on your location with live map data.
        </p>
      </div>

      {/* MAP WRAPPER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-10 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-[40px] border border-[#D5CEA3]/50 bg-white p-3 sm:p-4 shadow-xl sm:shadow-2xl"
      >
        <div className="relative h-[420px] sm:h-[550px] lg:h-[700px] overflow-hidden rounded-xl sm:rounded-[32px]">
          
          {/* MAP */}
          <CafeMap cafes={cafes} userLocation={userLocation} />

          {/* OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FFF8EA]/20 via-transparent to-transparent" />

          {/* NEAREST CAFE CARD */}
          {nearestCafe && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              
              className="
                absolute 
                bottom-4 sm:bottom-6 lg:bottom-8 
                right-4 sm:right-6 lg:right-8 
                z-[1000] 
                w-[260px] sm:w-[300px] lg:w-[320px] 
                rounded-2xl sm:rounded-[28px] 
                bg-white p-3 sm:p-5 
                shadow-xl sm:shadow-2xl
              "
            >
              {/* IMAGE */}
              <div className="h-28 sm:h-36 lg:h-40 rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={nearestCafe.image}
                  alt={nearestCafe.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* INFO */}
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl font-semibold text-[#1A120B]">
                {nearestCafe.name}
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-[#6B5A4A] line-clamp-2">
                {nearestCafe.address}
              </p>

              {/* META */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#6B5A4A]">
                {nearestCafe.distance && (
                  <span>{nearestCafe.distance.toFixed(1)} km</span>
                )}

                {nearestCafe.wifi && (
                  <span className="flex items-center gap-1">
                    <Wifi size={14} />
                    WiFi
                  </span>
                )}
              </div>

              {/* BUTTON */}
              <button
                className="mt-4 w-full rounded-xl bg-[#1A120B] py-2.5 text-xs sm:text-sm font-medium text-[#FFF8EA] transition hover:bg-[#3C2A21]"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${nearestCafe.lat},${nearestCafe.lon}`,
                    "_blank"
                  )
                }
              >
                Get Directions
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}