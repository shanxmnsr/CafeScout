
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Cafe } from "@/types/cafe";

const cafeIcon = new L.DivIcon({
  html: `
    <div style="
      width:42px;
      height:42px;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        width:42px;
        height:42px;
        border-radius:9999px;
        background:#1A120B;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 10px 25px rgba(0,0,0,0.25);
        border:2px solid #FFF8EA;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="#FFF8EA"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 4.993-5.539 9.193-7.399 10.476a1 1 0 0 1-1.202 0C9.539 19.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    </div>
  `,
  className: "",
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -18],
});

const userIcon = new L.DivIcon({
  html: `
    <div style="
      width:16px;
      height:16px;
      border-radius:9999px;
      background:#2563EB;
      border:3px solid white;
      box-shadow:0 0 0 4px rgba(37,99,235,0.25);
    "></div>
  `,
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// helpers
function ChangeView({
  userLocation,
}: {
  userLocation: [number, number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation) return;
    map.setView(userLocation, 14);
  }, [userLocation, map]);

  return null;
}

function FlyTo({ cafe }: { cafe: Cafe | null }) {
  const map = useMap();

  useEffect(() => {
    if (!cafe?.lat || !cafe?.lon) return;
    map.flyTo([cafe.lat, cafe.lon], 16, { duration: 1 });
  }, [cafe, map]);

  return null;
}

interface Props {
  cafes?: Cafe[];
  userLocation?: [number, number] | null;
  onSelectCafe?: (cafe: Cafe) => void;
  selectedCafe?: Cafe | null;
}

export default function CafeMap({
  cafes = [],
  userLocation,
  onSelectCafe,
  selectedCafe,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center text-sm text-neutral-500">
        Loading map...
      </div>
    );
  }

  const center: [number, number] =
    userLocation && userLocation[0] !== 0 && userLocation[1] !== 0
      ? userLocation
      : [28.6139, 77.209];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="OSM"
      />

      <ChangeView userLocation={userLocation ?? null} />
      <FlyTo cafe={selectedCafe ?? null} />

      {/* USER MARKER */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-sm font-bold">You are here</div>
          </Popup>
        </Marker>
      )}

      {/* CAFES */}
      {cafes
        .filter((cafe) => cafe.lat && cafe.lon)
        .map((cafe) => (
          <Marker
            key={cafe.id}
            position={[cafe.lat, cafe.lon]}
            icon={cafeIcon}
            eventHandlers={{
              click: () => onSelectCafe?.(cafe),
            }}
          >
            <Popup className="w-[180px] sm:w-[220px]">
              <div className="space-y-2 sm:space-y-3">
                
                {/* NAME */}
                <p className="text-sm sm:text-base font-semibold text-neutral-900">
                  {cafe.name}
                </p>

                {/* ADDRESS */}
                <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2">
                  {cafe.address}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => onSelectCafe?.(cafe)}
                  className="
                    w-full rounded-lg sm:rounded-xl 
                    bg-black py-2 sm:py-2.5 
                    text-[11px] sm:text-xs 
                    text-white 
                    active:scale-[0.98]
                  "
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}