import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/">
      <div className="text-xl md:text-2xl font-bold text-[#1F9ED0] cursor-pointer select-none">
        Example
      </div>
    </Link>
  );
}
