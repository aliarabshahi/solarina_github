import { FaTools, FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import Link from "next/link";

const socialLinks = [
  { name: "لینکدین", href: "https://www.linkedin.com/in/", icon: FaLinkedin },
  { name: "یوتیوب", href: "https://youtube.com/", icon: FaYoutube },
  { name: "اینستاگرام", href: "https://instagram.co/", icon: FaInstagram },
  { name: "تلگرام", href: "https://t.me/", icon: FaTelegramPlane },
];

export default function GlobalDowntimeBanner() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center 
      bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white text-center p-6">

      {/* Icon */}
      <FaTools className="text-7xl text-solarina mb-6 animate-bounce" />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        موقتا در دسترس نمی‌باشیم
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-300 mb-6">
        لطفاً بعداً تلاش کنید.
      </p>

      {/* Refresh Button */}
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-5 py-3 bg-solarina hover:bg-solarina/90 
                   text-black font-semibold rounded-full shadow-lg transition-all duration-300 
                   hover:scale-105"
      >
        <MdOutlineRefresh className="text-xl" />
        تلاش مجدد
      </button>

      {/* Social Links */}
      <div className="mt-16 flex gap-8">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              key={index}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={28} className="text-white" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
