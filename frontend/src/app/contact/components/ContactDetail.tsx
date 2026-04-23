"use client";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";

export default function ContactDetail() {
  return (
    <div
      className="w-full bg-gradient-to-r from-[#1F9ECE] to-[#F477B8]
                 rounded-xl shadow-[0_2px_10px_rgba(31,158,206,0.15)]
                 p-5 sm:p-6 mt-8 text-center text-white"
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6">اطلاعات تماس</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
        <div className="space-y-3 text-sm sm:text-base" dir="rtl">
          <div className="flex items-center justify-center sm:justify-end">
            <span className="ml-2 tracking-wide">۰۹۱۹۰۰۸۸۱۹۰</span>
            <FaPhone className="text-base sm:text-lg mr-1" />
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <span className="ml-2 tracking-wide">s4aa4m@gmail.com</span>
            <FaEnvelope className="text-base sm:text-lg mr-1" />
          </div>
        </div>

        {/* شبکه‌ها */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 justify-center sm:justify-start">
            <a href="https://www.linkedin.com/in/" className="hover:opacity-80 transition">
              <FaLinkedin className="text-xl sm:text-2xl" />
            </a>
            <a href="https://github.com//" className="hover:opacity-80 transition">
              <FaGithub className="text-xl sm:text-2xl" />
            </a>
          </div>
          <div className="flex gap-5 justify-center sm:justify-start">
            <a href="https://youtube.com/" className="hover:opacity-80 transition">
              <FaYoutube className="text-xl sm:text-2xl" />
            </a>
            <a href="https://t.me/" className="hover:opacity-80 transition">
              <FaTelegram className="text-xl sm:text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
