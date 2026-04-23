import Link from "next/link";

const navbarLinks = [
  { label: "خانه", href: "/" },
  { label: "نمایش داده‌ها", href: "/example-items" },
  { label: "افزودن داده جدید", href: "/example-add" },
  { label: "تماس با ما", href: "/contact" },

];

export default function NavbarMenu() {
  return (
    <ul className="flex flex-col md:flex-row gap-3 md:gap-6 text-[#22313F] text-sm md:text-base">
      {navbarLinks.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="hover:text-[#1F9ED0] transition-colors">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
