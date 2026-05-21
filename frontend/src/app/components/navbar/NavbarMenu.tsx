import Link from "next/link";

const navbarLinks = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "ثبت سفارش", href: "/order" },
  { label: "پیگیری سفارش", href: "/order/track" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

interface NavbarMenuProps {
  onItemClick?: () => void;
}

export default function NavbarMenu({ onItemClick }: NavbarMenuProps) {
  return (
    <ul className="flex flex-col md:flex-row gap-3 md:gap-6 text-gray-700 text-sm md:text-base">
      {navbarLinks.map((item) => (
        <li key={item.href}>
          <Link 
            href={item.href} 
            className="hover:text-blue-600 transition-colors block py-1 md:py-0"
            onClick={onItemClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
