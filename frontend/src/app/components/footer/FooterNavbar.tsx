import Link from "next/link";

const navItems = [
  {
    title: "شرکت",
    links: [
      { text: "درباره ما", href: "/about" },
      { text: "تماس با ما", href: "/contact" },
      { text: "سؤالات متداول", href: "/faq" },
    ],
  },
  {
    title: "محصولات",
    links: [
      { text: "پنل ۱۰ واتی", href: "/#products" },
      { text: "پنل ۲۰ واتی", href: "/#products" },
      { text: "پنل ماشین", href: "/#products" },
    ],
  },
];

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
                className="text-sm text-gray-500 hover:text-orange-500 transition-colors whitespace-nowrap"
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
