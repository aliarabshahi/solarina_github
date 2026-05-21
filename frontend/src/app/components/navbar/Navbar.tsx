"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
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
        {/* بخش سمت راست: منوی همبرگری (موبایل) و لوگو+لینک‌ها (دسکتاپ) */}
        <div className="flex items-center justify-start flex-1 md:flex-none md:gap-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden text-[#22313F] p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* نمایش لوگو و منو فقط در دسکتاپ */}
          <div className="hidden md:flex items-center gap-6">
            <NavbarLogo />
            <NavbarMenu />
          </div>
        </div>

        {/* بخش وسط: لوگو مخصوص موبایل (وسط‌چین) */}
        <div className="flex md:hidden items-center justify-center flex-1">
          <NavbarLogo />
        </div>

        {/* بخش سمت چپ: دکمه ورود/پروفایل */}
        <div className="flex items-center justify-end flex-1 md:flex-none">
          <NavbarLogin />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
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
            <NavbarMenu onItemClick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
