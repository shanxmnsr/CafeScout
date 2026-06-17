"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import LocationButton from "@/components/LocationButton";
import CafeCard from "@/components/CafeCard";
import CafeModal from "@/components/CafeModal";

import { useCafes } from "@/lib/useCafes";
import { Cafe } from "@/types/cafe";


const CafeMap = dynamic(() => import("@/components/CafeMap"), {
  ssr: false,
});

export default function ExploreClient() {
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [activeFilter, setActiveFilter] = useState("");

  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  
  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (err) => {
        console.warn("Location blocked", err);
      }
    );
  }, []);

 
  const { cafes, loading, error } = useCafes({
    lat: userLocation?.[0] ?? null,
    lon: userLocation?.[1] ?? null,
  });

 
  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      const text =
        `${cafe.name} ${cafe.address ?? ""} ${cafe.wifi ? "wifi" : ""}`.toLowerCase();

      const query = searchTerm.toLowerCase();

      const matchesSearch = query
        ? text.includes(query) ||
          query.split(" ").some((word) => text.includes(word))
        : true;

      let matchesFilter = true;

      if (activeFilter === "WiFi") {
        matchesFilter = Boolean(cafe.wifi);
      }

      return matchesSearch && matchesFilter;
    });
  }, [cafes, searchTerm, activeFilter]);

  useEffect(() => {
    if (!selectedCafe && filteredCafes.length > 0) {
      setSelectedCafe(filteredCafes[0]);
    }
  }, [filteredCafes, selectedCafe]);


  const handleViewDetails = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setIsModalOpen(true);
  };

  const handleSelectCafeFromMap = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setIsModalOpen(true);
  };

 
  return (
    <>
      <main className="min-h-screen bg-[#FFF8EA]">
        {/* HEADER */}
        <section className="border-b border-[#D5CEA3]/40 bg-white/60 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <h1 className="text-4xl font-bold text-[#1A120B]">
              Explore Cafes
            </h1>

            <p className="mt-2 text-[#6B5A4A]">
              Discover real cafes near you powered by OpenStreetMap.
            </p>

            {/* SEARCH */}
            <div className="mt-6 flex flex-col gap-4 md:flex-row">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <LocationButton
                onLocationFound={(lat: number, lng: number) =>
                  setUserLocation([lat, lng])
                }
              />
            </div>

            {/* FILTER CHIPS */}
            <div className="mt-5 flex flex-wrap gap-3">
              {["WiFi"].map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(
                      activeFilter === filter ? "" : filter
                    )
                  }
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-[#1A120B] text-white"
                      : "border border-[#D5CEA3] bg-white text-[#3C2A21]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            {/* LIST */}
            <div className="space-y-4">
              {error ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
                  <h3 className="text-lg font-semibold text-red-600">
                    Something went wrong
                  </h3>
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                </div>
              ) : loading ? (
                <p className="text-gray-500">Loading cafes...</p>
              ) : filteredCafes.length > 0 ? (
                filteredCafes.map((cafe) => (
                  <CafeCard
                    key={cafe.id}
                    cafe={cafe}
                    onClick={() => setSelectedCafe(cafe)}
                    onViewDetails={handleViewDetails}
                    isSelected={selectedCafe?.id === cafe.id}
                    userLocation={userLocation}
                  />
                ))
              ) : (
                <div className="rounded-3xl border border-[#D5CEA3]/50 bg-white p-8 text-center">
                  <h3 className="text-lg font-semibold text-[#1A120B]">
                    No cafes found
                  </h3>
                  <p className="mt-2 text-[#6B5A4A]">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>

            {/* MAP */}
            <div className="overflow-hidden rounded-[32px] border border-[#D5CEA3]/50 bg-white p-4 shadow-xl">
              <div className="h-[800px] overflow-hidden rounded-[24px]">
                <CafeMap
                  userLocation={userLocation}
                  cafes={filteredCafes}
                  onSelectCafe={handleSelectCafeFromMap}
                  selectedCafe={selectedCafe}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL */}
      <CafeModal
        cafe={selectedCafe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}