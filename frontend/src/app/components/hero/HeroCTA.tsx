"use client";

import Link from "next/link";
import { Sun } from "lucide-react";

export default function HeroCTA() {
  return (
    <div className="mt-16 sm:mt-20 lg:mt-24 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl sm:rounded-3xl p-7 sm:p-10 lg:p-14 text-center shadow-2xl shadow-slate-900/40 relative overflow-hidden">

      {/* background glow */}
      <div
        className="absolute -top-20 -right-20 sm:-top-24 sm:-right-24 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* title */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 sm:mb-6 relative z-10 leading-snug">
        آماده‌ای از شر سیم و پریز خلاص بشی؟
      </h3>

      {/* description */}
      <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-xl mx-auto mb-7 sm:mb-8 lg:mb-10 leading-relaxed relative z-10">
        همین حالا به صفحه محصولات سر بزن و اولین قدم رو برای داشتن انرژی رایگان
        و بی‌پایان بردار. خورشید منتظره!
      </p>

      {/* button */}
      <Link
        href="/products"
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-slate-900 font-bold text-base sm:text-lg lg:text-lg px-7 sm:px-9 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl shadow-xl hover:bg-gray-50 hover:scale-[1.03] transition-all duration-300 relative z-10"
      >
        <Sun size={20} className="text-yellow-500" />
        انتخاب محصولات
      </Link>
    </div>
  );
}
