"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaSignOutAlt,
  FaUserCircle,
  FaShoppingBag,
  FaSearch,
  FaSignInAlt 
} from "react-icons/fa";

import { getUser, removeUser } from "@/app/services/auth/authStorage";

export default function NavbarLogin() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load user initially
  useEffect(() => {
    setUser(getUser());
  }, []);

  // Listen for login/logout changes
  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getUser());
    };
    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    removeUser();
    setOpen(false);
  };

  if (!user) {
    return (
      <>
        {/* Desktop Mode (lg and up) */}
        <Link
          href="/auth/login"
          className="hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
        >
          ورود | ثبت نام
        </Link>

        {/* Mobile & Tablet Mode (below lg) */}
        <Link
          href="/auth/login"
          className="lg:hidden flex items-center justify-center p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
          aria-label="ورود"
        >
          <FaSignInAlt className="text-xl" />
        </Link>
      </>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Button (lg and up) */}
      <button
        onClick={() => setOpen(!open)}
        className="hidden lg:flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 px-4 py-2.5 rounded-xl transition shadow-sm"
      >
        <FaUserCircle className="text-blue-600 text-lg" />
        <span className="text-sm text-gray-700">{user.phone}</span>
        <FaChevronDown className="text-xs text-gray-500" />
      </button>

      {/* Mobile & Tablet Button (below lg) */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex items-center justify-center p-1 text-blue-600 rounded-full hover:bg-blue-50 transition"
      >
        <FaUserCircle className="text-3xl" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
          <Link
            href="/user/orders"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
            onClick={() => setOpen(false)}
          >
            <FaShoppingBag className="text-blue-500" />
            سفارشات من
          </Link>

          <Link
            href="/order/track"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
            onClick={() => setOpen(false)}
          >
            <FaSearch className="text-blue-500" />
            پیگیری سفارش
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FaSignOutAlt />
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  );
}
