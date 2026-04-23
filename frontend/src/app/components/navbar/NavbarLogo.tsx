import Link from "next/link";
import { FaSun } from "react-icons/fa";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <FaSun className="text-2xl md:text-3xl text-yellow-400" />
      <div className="text-xl md:text-2xl font-bold text-orange-500 cursor-pointer select-none">
        پنل خورشیدی
      </div>
    </Link>
  );
}
