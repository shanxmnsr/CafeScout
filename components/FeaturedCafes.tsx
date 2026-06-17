
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Cafe } from "@/types/cafe";

interface FeaturedCafesProps {
  cafes?: Cafe[];
}

export default function FeaturedCafes({ cafes = [] }: FeaturedCafesProps) {
  const router = useRouter();

  const featured = cafes.slice(0, 3);

  const handleExplore = (name: string) => {
    router.push(`/explore?search=${encodeURIComponent(name)}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
      
      {/* HEADER */}
      <div className="mb-10 sm:mb-14 text-center">
        <span className="rounded-full border border-[#D5CEA3] bg-white/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#3C2A21]">
          Popular Picks
        </span>

        <h2 className="font-heading mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A120B]">
          Cafes You'll Love
        </h2>

        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-[#6B5A4A]">
          Handpicked cafes based on real-time nearby data.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {featured.length > 0 ? (
          featured.map((cafe, index) => {
            const imageSrc =
              cafe.image || "https://picsum.photos/800/600?random=1";

            return (
              <motion.div
                key={cafe.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl sm:rounded-[32px] border border-[#D5CEA3]/50 bg-white shadow-md sm:shadow-lg transition hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                  <img
                    src={imageSrc}
                    alt={cafe.name || "Cafe"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A120B] truncate">
                        {cafe.name || "Unknown Cafe"}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-[#6B5A4A]">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">
                          {cafe.address || "Location not available"}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-[#6B5A4A] transition group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                    />
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleExplore(cafe.name || "")}
                    className="mt-5 sm:mt-6 w-full rounded-xl sm:rounded-2xl bg-[#1A120B] py-2.5 sm:py-3 text-sm font-medium text-[#FFF8EA] transition hover:bg-[#3C2A21]"
                  >
                    Explore Cafe
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-sm sm:text-base text-[#6B5A4A]">
            No featured cafes available yet.
          </p>
        )}
      </div>
    </section>
  );
}