
"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/explore?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-28 text-center">

      {/* Badge */}
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 sm:mb-6 rounded-full border border-[#D5CEA3] bg-white/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#3C2A21]"
      >
        Smart Cafe Discovery
      </motion.span>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-5xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#1A120B]"
      >
        Discover the perfect cafe
        <br />
        for work, study, and coffee.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-[#6B5A4A]"
      >
        Explore nearby cafes, discover hidden gems, and find your ideal workspace.
      </motion.p>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 flex w-full max-w-2xl items-center gap-3 rounded-full border border-[#D5CEA3] bg-white px-6 py-4 shadow-lg"
      >
        <Search size={20} className="text-[#6B5A4A]" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          type="text"
          placeholder="Search cafes, locations, study spots..."
          className="w-full bg-transparent outline-none placeholder:text-[#8B7A6A]"
        />

        <button
          onClick={handleSearch}
          className="rounded-full bg-[#1A120B] px-4 py-2 text-sm text-white hover:scale-105 transition"
        >
          Search
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-12 text-[#6B5A4A]"
      >
        <div className="min-w-[90px]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1A120B]">
            Real
          </h3>
          <p className="mt-1 text-sm sm:text-base">Cafe Data</p>
        </div>

        <div className="min-w-[90px]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1A120B]">
            Open
          </h3>
          <p className="mt-1 text-sm sm:text-base">StreetMap</p>
        </div>

        <div className="min-w-[90px]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1A120B]">
            Live
          </h3>
          <p className="mt-1 text-sm sm:text-base">Location Search</p>
        </div>
      </motion.div>
    </section>
  );
}