"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B5A4A]"
      />

      <input
        aria-label="Search cafes"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search cafes..."
        className="w-full rounded-2xl border border-[#D5CEA3] bg-white py-4 pl-12 pr-4 outline-none transition focus:border-[#1A120B]"
      />
      
    </div>
  );
}
