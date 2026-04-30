import Link from "next/link";
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaSun } from "react-icons/fa";

const socialLinks = [
  {
    name: "اینستاگرام",
    href: "https://instagram.com/solarina",
    icon: <FaInstagram className="text-[#E4405F] text-2xl sm:text-[26px]" />,
  },
  {
    name: "تلگرام",
    href: "https://t.me/solarina",
    icon: <FaTelegramPlane className="text-[#0088cc] text-2xl sm:text-[26px]" />,
  },
  {
    name: "واتساپ",
    href: "https://wa.me/989374152095",
    icon: <FaWhatsapp className="text-[#25D366] text-2xl sm:text-[26px]" />,
  },
];

export default function FooterSocial() {
  return (
    <nav className="flex flex-col items-center space-y-3">

      {/* Logo + Enamad */}
      <div className="relative pb-2 pt-2 z-10 flex justify-center items-center gap-4">
        <Link href="/" aria-label="صفحه اصلی">
          <FaSun className="text-yellow-400 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-all duration-200" />
        </Link>

        <a
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=722392&Code=k5XI9hwNFKb97I6nCJckpbG4w29I6H3I"
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=722392&Code=k5XI9hwNFKb97I6nCJckpbG4w29I6H3I"
            alt="نماد اعتماد الکترونیکی"
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
            style={{ cursor: "pointer" }}
          />
        </a>
      </div>

      <h6 className="footer-title text-base sm:text-lg font-bold text-center">
        شبکه‌های اجتماعی
      </h6>

      <div className="flex flex-row justify-center gap-x-4 sm:gap-x-6">
        {socialLinks.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            {social.icon}
          </Link>
        ))}
      </div>

    </nav>
  );
}
