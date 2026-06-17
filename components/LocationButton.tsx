"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface LocationButtonProps {
  onLocationFound: (lat: number, lng: number) => void;
}

export default function LocationButton({
  onLocationFound,
}: LocationButtonProps) {
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationFound(
          position.coords.latitude,
          position.coords.longitude
        );

        setLoading(false);
      },
      (error) => {
        console.error("Unable to retrieve location:", error);
        setLoading(false);
      }
    );
  };

  return (
    <button
      onClick={getLocation}
      disabled={loading}
      className="flex items-center gap-2 rounded-2xl border border-[#D5CEA3] bg-white px-5 py-3 font-medium text-[#1A120B] transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
    >
      <MapPin size={18} />
      {loading ? "Locating..." : "Use My Location"}
    </button>
  );
}