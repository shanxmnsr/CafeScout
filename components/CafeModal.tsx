
"use client";

import { X, Wifi, MapPin } from "lucide-react";
import { Cafe } from "@/types/cafe";

interface CafeModalProps {
  cafe: Cafe | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CafeModal({ cafe, isOpen, onClose }: CafeModalProps) {
  if (!isOpen || !cafe) return null;

  const openMaps = () =>
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${cafe.lat},${cafe.lon}`,
      "_blank"
    );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow hover:scale-105"
        >
          <X size={18} />
        </button>

        {/* Image */}
        {cafe.image ? (
          <img src={cafe.image} alt={cafe.name} className="h-72 w-full object-cover" />
        ) : (
          <div className="flex h-72 items-center justify-center bg-[#F5EFE6] text-6xl">
            
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#1A120B]">{cafe.name}</h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-[#6B5A4A]">
            <MapPin size={14} />
            <span>
              {cafe.address !== "Address not available"
                ? cafe.address
                : "Location unavailable"}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {cafe.wifi && (
              <span className="flex items-center gap-1 rounded-full bg-[#F5EFE6] px-3 py-1 text-sm">
                <Wifi size={14} /> WiFi
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-[#6B5A4A]">
            A comfortable cafe for work, study, and casual meetings with a calm atmosphere.
          </p>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={openMaps}
              className="flex-1 rounded-xl bg-[#1A120B] py-3 text-sm font-medium text-white hover:bg-[#3C2A21]"
            >
              Directions
            </button>

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#D5CEA3] py-3 text-sm font-medium hover:bg-[#F5EFE6]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}