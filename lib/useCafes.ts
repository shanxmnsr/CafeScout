
"use client";

import { useEffect, useRef, useState } from "react";
import { Cafe } from "@/types/cafe";

interface UseCafesParams {
  lat: number | null;
  lon: number | null;
  radius?: number;
}

let lastGoodCafes: Cafe[] = [];

export function useCafes({ lat, lon, radius = 10000 }: UseCafesParams) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;

    const loadCafes = async () => {
      setLoading(true);
      setError(null);

      try {
        const safeLat = lat ?? 28.6139;
        const safeLon = lon ?? 77.2090;

        const query = `
          [out:json];
          node["amenity"="cafe"](around:${radius},${safeLat},${safeLon});
          out;
        `;

        const res = await fetch("/api/overpass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();

        if (currentRequest !== requestId.current) return;

        const cafes = data?.elements || [];

        if (cafes.length > 0) {
          lastGoodCafes = cafes;
          setCafes(cafes);
        } else {
          setCafes(lastGoodCafes);
          setError(
            lastGoodCafes.length > 0
              ? "Live data unavailable — showing cached cafes."
              : "No cafes found nearby."
          );
        }
      } catch (err) {
        console.error(err);

        setCafes(lastGoodCafes);
        setError(
          lastGoodCafes.length > 0
            ? "Network issue — showing cached cafes."
            : "Failed to load cafes."
        );
      } finally {
        if (currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    };

    loadCafes();
  }, [lat, lon, radius]);

  return { cafes, loading, error };
}