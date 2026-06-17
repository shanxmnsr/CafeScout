
"use client";

import { useEffect, useRef, useState } from "react";
import { fetchNearbyCafes } from "@/lib/overpass";
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
        // ✅ FIX: always fallback to safe coordinates
        const safeLat = lat ?? 28.6139; // Delhi fallback
        const safeLon = lon ?? 77.2090;

        const data = await fetchNearbyCafes(safeLat, safeLon, radius);

        // ignore stale requests
        if (currentRequest !== requestId.current) return;

        if (data?.length > 0) {
          lastGoodCafes = data;
          setCafes(data);
        } else {
          setCafes(lastGoodCafes);

          setError(
            lastGoodCafes.length > 0
              ? "Live data unavailable — showing cached cafes."
              : "No cafes found nearby."
          );
        }
      } catch (err) {
        console.error("Cafe fetch error:", err);

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