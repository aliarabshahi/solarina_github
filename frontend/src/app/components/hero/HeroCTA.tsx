"use client";

import Link from "next/link";
import { Sun, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCTA() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 sm:mt-20 lg:mt-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl sm:rounded-3xl p-7 sm:p-10 lg:p-14 text-center shadow-2xl shadow-blue-500/30 relative overflow-hidden"
    >
      {/* Background Glows (هماهنگ با هاله‌های نور بنر اصلی) */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 opacity-20 rounded-full blur-[60px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 opacity-30 rounded-full blur-[60px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-5 sm:mb-6 relative z-10 leading-snug tracking-tight">
        آماده‌ای از شر سیم و پریز خلاص بشی؟
      </h3>

      {/* Description */}
      <p className="text-base sm:text-lg lg:text-xl text-blue-50 max-w-xl mx-auto mb-8 lg:mb-10 leading-relaxed relative z-10">
        همین حالا به صفحه محصولات سر بزن و اولین قدم رو برای داشتن انرژی رایگان
        و بی‌پایان بردار. خورشید منتظره!
      </p>

      {/* Button (طراحی دکمه هماهنگ با دکمه‌های HeroBanner) */}
      <Link
        href="/products"
        className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-blue-700 font-bold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 relative z-10"
      >
        <Sun size={20} className="text-yellow-500" />
        انتخاب محصولات
        <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
