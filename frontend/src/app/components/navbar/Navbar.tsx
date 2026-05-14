// app/components/navbar/Navbar.tsx

"use client";

import { useState } from "react";

import {
  Menu,
  X,
} from "lucide-react";

import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarLogin from "./NavbarLogin";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="
        sticky
        top-0
        z-50
        w-full
        bg-[#FCF8F9]
        border-b
        border-gray-200
        shadow-sm
      "
    >
      <div
        className="
          container
          mx-auto
          flex
          items-center
          justify-between
          px-4
          py-3
          md:px-10
        "
        dir="rtl"
      >

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden text-[#22313F]"
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <X size={24} />
              : <Menu size={24} />}
          </button>

          <NavbarLogo />

          <div className="hidden md:block">
            <NavbarMenu />
          </div>

        </div>

        {/* Left Side */}
        <NavbarLogin />

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            md:hidden
            px-4
            pb-4
            bg-[#FCF8F9]
            border-t
            border-gray-100
          "
          dir="rtl"
        >
          <div className="pt-4">
            <NavbarMenu />
          </div>

          <div className="pt-4">
            <NavbarLogin />
          </div>
        </div>
      )}

    </div>
  );
}
