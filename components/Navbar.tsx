
// "use client";

// import Link from "next/link";
// import { Coffee } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Navbar() {
//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="fixed inset-x-0 top-0 z-50"
//     >
//       <div className="mx-auto max-w-7xl px-6 pt-6">
//         <div className="flex items-center justify-between rounded-full border border-[#D5CEA3]/60 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-xl">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A120B] text-[#FFF8EA]">
//               <Coffee size={18} />
//             </div>

//             <h2 className="font-heading text-2xl font-semibold text-[#1A120B]">
//               CafeScout
//             </h2>
//           </Link>

//           {/* ONLY ONE NAV ITEM */}
//           <nav className="hidden md:flex">
//             <Link
//               href="/explore"
//               className="text-sm font-medium text-[#6B5A4A] transition hover:text-[#1A120B]"
//             >
//               Explore
//             </Link>
//           </nav>

//           {/* CTA */}
//           <Link
//             href="/explore"
//             className="hidden rounded-full bg-[#1A120B] px-5 py-2.5 text-sm font-medium text-[#FFF8EA] transition hover:scale-105 hover:bg-[#3C2A21] md:block"
//           >
//             Find Cafes
//           </Link>
//         </div>
//       </div>
//     </motion.header>
//   );
// }



"use client";

import Link from "next/link";
import { Coffee, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 sm:pt-6">
        
        {/* NAVBAR */}
        <div className="flex items-center justify-between rounded-full border border-[#D5CEA3]/60 bg-white/70 px-4 sm:px-6 py-3 sm:py-4 shadow-lg backdrop-blur-xl">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#1A120B] text-[#FFF8EA]">
              <Coffee size={18} />
            </div>

            <h2 className="font-heading text-lg sm:text-2xl font-semibold text-[#1A120B]">
              CafeScout
            </h2>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex">
            <Link
              href="/explore"
              className="text-sm font-medium text-[#6B5A4A] transition hover:text-[#1A120B]"
            >
              Explore
            </Link>
          </nav>

          {/* DESKTOP CTA */}
          <Link
            href="/explore"
            className="hidden md:block rounded-full bg-[#1A120B] px-5 py-2.5 text-sm font-medium text-[#FFF8EA] transition hover:scale-105 hover:bg-[#3C2A21]"
          >
            Find Cafes
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full p-2 text-[#1A120B]"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-3 md:hidden rounded-2xl border border-[#D5CEA3]/60 bg-white/90 p-3 shadow-lg">
            
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-[#1A120B] hover:bg-[#F5EFE6]"
            >
              Explore Cafes
            </Link>

            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-[#1A120B] px-4 py-3 text-center text-sm font-medium text-[#FFF8EA]"
            >
              Find Cafes
            </Link>
          </div>
        )}
      </div>
    </motion.header>
  );
}