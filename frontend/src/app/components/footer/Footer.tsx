import FooterNavbar from "./FooterNavbar";
import FooterSocial from "./FooterSocial";

/** Main footer container with navigation and social links */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 text-base-content py-10" dir="rtl">
      <div className="container mx-auto px-6 sm:px-12 lg:px-28 xl:px-40">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-8 w-full">
          <FooterSocial />
          <FooterNavbar />
        </div>
      </div>
    </footer>
  );
}
