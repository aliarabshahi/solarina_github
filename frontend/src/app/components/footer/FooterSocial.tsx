import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedin } from "react-icons/fa";

/** Social media link definitions - generic placeholders */
const socialLinks = [
  {
    name: "لینکدین",
    href: "https://linkedin.com/company/example_ir",
    icon: <FaLinkedin className="text-[#0A66C2] text-2xl sm:text-[26px]" />,
  },
  {
    name: "یوتیوب",
    href: "https://youtube.com/@example_ir",
    icon: <FaYoutube className="text-[#FF0000] text-2xl sm:text-[26px]" />,
  },
  {
    name: "اینستاگرام",
    href: "https://instagram.com/example_ir",
    icon: <FaInstagram className="text-[#E4405F] text-2xl sm:text-[26px]" />,
  },
  {
    name: "تلگرام",
    href: "https://t.me/example_ir",
    icon: <FaTelegramPlane className="text-[#0088cc] text-2xl sm:text-[26px]" />,
  },
];

export default function FooterSocial() {
  return (
    <nav className="flex flex-col items-center space-y-3">
      {/* Logo fixes: add safe padding and relative z-index so it never gets overlapped */}
      <div className="relative pb-2 pt-2 z-10 flex justify-center items-center">
        <Link href="/" aria-label="صفحه اصلی">
          <Image
            src="/images/logo-icon.png"
            alt="لوگو Example"
            width={80}
            height={80}
            className="block mx-auto w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-all duration-200"
            priority
          />
        </Link>
      </div>

      <h6 className="footer-title text-base sm:text-lg font-bold text-center">
        شبکه‌های اجتماعی
      </h6>

      <div className="flex flex-row justi-center gap-x-4 sm:gap-x-6">
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
