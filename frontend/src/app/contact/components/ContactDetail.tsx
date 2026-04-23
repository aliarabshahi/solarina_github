"use client";
import { FaPhone, FaEnvelope, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function ContactDetail() {
  return (
    <div
      className="w-full bg-gradient-to-r from-orange-500 to-yellow-400
                 rounded-xl shadow-lg
                 p-5 sm:p-6 mt-8 text-center text-white"
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">اطلاعات تماس</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
        <div className="space-y-3 text-sm sm:text-base" dir="rtl">
          <div className="flex items-center justify-center sm:justify-end">
            <span className="ml-2 tracking-wide">۰۹۱۲۳۴۵۶۷۸۹</span>
            <FaPhone className="text-base sm:text-lg mr-1" />
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <span className="ml-2 tracking-wide">info@solarpanel.ir</span>
            <FaEnvelope className="text-base sm:text-lg mr-1" />
          </div>
        </div>

        {/* شبکه‌ها */}
        <div className="flex gap-5 justify-center">
          <a href="https://instagram.com/yourpage" className="hover:opacity-80 transition">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://t.me/yourpage" className="hover:opacity-80 transition">
            <FaTelegram className="text-2xl" />
          </a>
          <a href="https://wa.me/989123456789" className="hover:opacity-80 transition">
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
