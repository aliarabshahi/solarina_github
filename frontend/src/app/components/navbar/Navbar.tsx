"use client";
import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#FCF8F9] border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-10" dir="rtl">
        
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden text-[#22313F]"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo & Menu */}
        <div className="flex items-center justify-center md:justify-start flex-1 md:flex-none md:gap-6">
          <NavbarLogo />
          <div className="hidden md:block">
            <NavbarMenu />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 bg-[#FCF8F9]" dir="rtl">
          <NavbarMenu />
        </div>
      )}
    </div>
  );
}
