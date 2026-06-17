
"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCafes from "@/components/FeaturedCafes";
import MapPreview from "@/components/MapPreview";

import { useEffect, useState } from "react";
import { useCafes } from "@/lib/useCafes";

export default function Home() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation([28.6139, 77.2090]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      () => {
        setUserLocation([28.6139, 77.2090]);
      },
    );
  }, []);

  /* FETCH CAFES */
  const { cafes } = useCafes({
    lat: userLocation?.[0] || null,
    lon: userLocation?.[1] || null,
  });

  return (
    <main className="relative overflow-hidden bg-[#FFF8EA]">
     
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-[#E5B299]/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-[#D5CEA3]/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />

        <FeaturedCafes cafes={cafes} />

        <MapPreview
          cafes={cafes}
          userLocation={userLocation}
        />
      </div>
    </main>
  );
}