
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

export function useCafes({
  lat,
  lon,
  radius = 10000,
}: UseCafesParams) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestId = useRef(0);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const currentRequest = ++requestId.current;

    const loadCafes = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchNearbyCafes(lat, lon, radius);

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