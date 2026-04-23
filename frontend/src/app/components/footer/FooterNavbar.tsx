import Link from "next/link";

/** Navigation groups and their Persian labels/links (generalized but same structure) */
const navItems = [
  {
    title: "شرکت",
    links: [
      { text: "درباره ما", href: "/about" },
      { text: "تماس با ما", href: "/contact" },
      { text: "وبلاگ", href: "/blog" },
      { text: "سؤالات متداول", href: "/faq" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { text: "خدمت ۱", href: "/service-1" },
      { text: "خدمت ۲", href: "/service-2" },
      { text: "خدمت ۳", href: "/service-3" },
      { text: "خدمت ۴", href: "/service-4" },
    ],
  },
];

/** Footer navigation section with grouped Persian menu links */
export default function FooterNavbar() {
  return (
    <div className="flex justify-between gap-8">
      {navItems.map((item, index) => (
        <nav key={index} className="flex-1 space-y-2">
          <h6 className="text-lg font-bold text-black whitespace-nowrap">
            {item.title}
          </h6>
          <div className="flex flex-col space-y-1">
            {item.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors whitespace-nowrap"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </nav>
      ))}
    </div>
  );
}
