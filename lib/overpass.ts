
const cafeImages = [
  "/cafes/cafe-1.jpg",
  "/cafes/cafe-2.jpg",
  "/cafes/cafe-3.jpg",
  "/cafes/cafe-4.jpg",
  "/cafes/cafe-5.jpg",
  "/cafes/cafe-6.jpg",
  "/cafes/cafe-7.jpg",
  "/cafes/cafe-8.jpg",
  "/cafes/cafe-9.jpg",
];

const cafeCache = new Map<string, any[]>();

async function safeFetch(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return res;
  } catch {
    return null;
  }
}

import { getDistanceKm } from "@/utils/distance";

export async function fetchNearbyCafes(
  userLat: number,
  userLon: number,
  radius = 10000
) {
  const lat = userLat ?? 28.6139;
  const lon = userLon ?? 77.2090;

  const cacheKey = `${lat.toFixed(2)}_${lon.toFixed(2)}_${radius}`;

  if (cafeCache.has(cacheKey)) {
    return cafeCache.get(cacheKey)!;
  }

  const query = `
[out:json][timeout:25];
(
  node["amenity"="cafe"](around:${radius},${lat},${lon});
  way["amenity"="cafe"](around:${radius},${lat},${lon});
  relation["amenity"="cafe"](around:${radius},${lat},${lon});
);
out center;
`;

  const OVERPASS_SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.ru/api/interpreter",
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  let data: any = null;
  let response: Response | null = null;

  try {
    for (const server of OVERPASS_SERVERS) {
      response = await safeFetch(server, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: query,
        signal: controller.signal,
      });

      if (response) break;
    }

    clearTimeout(timeout);

    if (!response) {
      throw new Error("All Overpass servers failed");
    }

    data = await response.json();
  } catch (err) {
    clearTimeout(timeout);
    console.warn("Overpass failed → using cache fallback");

    const cached = cafeCache.get(cacheKey);

    if (cached && cached.length > 0) {
      return cached;
    }

    return [];
  }

  const elements = data?.elements || [];

  const cafes = elements
    .map((el: any, index: number) => {
      const lat = el.lat || el.center?.lat;
      const lon = el.lon || el.center?.lon;

      if (lat == null || lon == null) return null;

      const distance = getDistanceKm(userLat, userLon, lat, lon);

      return {
        id: el.id,
        name: el.tags?.name || "Unnamed Cafe",
        lat,
        lon,
        distance,

        address:
          [
            el.tags?.["addr:housenumber"],
            el.tags?.["addr:street"],
            el.tags?.["addr:city"],
          ]
            .filter(Boolean)
            .join(", ") || "Address not available",

        wifi:
          el.tags?.wifi === "yes" ||
          el.tags?.internet_access === "yes",

        
        image: cafeImages[index % cafeImages.length],
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => a.distance - b.distance)
    .slice(0, 20);

  cafeCache.set(cacheKey, cafes);

  return cafes;
}