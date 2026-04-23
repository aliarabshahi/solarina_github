import { IoPlayCircleSharp } from "react-icons/io5";
import { FaBolt, FaShieldAlt, FaWeightHanging } from "react-icons/fa";

export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-6">
      {/* دکمه ویدیو */}
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <button
          onClick={onVideoOpen}
          className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium leading-6 
                     text-gray-700 ring-1 ring-gray-900/10 transition-all duration-300 ease-out
                     hover:ring-2 hover:ring-blue-600"
        >
          <IoPlayCircleSharp
            className="text-xl text-gray-500 transition-all duration-100 group-hover:text-blue-600
                         group-hover:scale-110"
          />
          <span>مشاهده ویدیوی معرفی</span>
        </button>
      </div>

      {/* متن اصلی و شعار */}
      <div className="text-center space-y-6 sm:space-y-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-tight sm:leading-tight">
          انرژی خورشید،{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            همیشه در دسترس
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-gray-600 max-w-2xl mx-auto">
          پنل‌های خورشیدی پرتابل ما به شما امکان می‌دهند در هر مکانی — کمپینگ،
          ماشین، یا هنگام قطعی برق — موبایل و وسایل دیجیتال خود را شارژ کنید.
          بدون نیاز به برق شهری.
        </p>

        {/* دکمه‌های اقدام */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#order"
            className="w-full sm:w-auto rounded-md bg-blue-600 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm 
                       hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-blue-600 
                       transition-all duration-300 hover:shadow-lg text-center"
          >
            ثبت سفارش
          </a>
          <a
            href="#products"
            className="w-full sm:w-auto rounded-md bg-orange-500 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold 
                       text-white shadow-sm hover:bg-orange-600 hover:shadow-lg transition-all duration-300 text-center"
          >
            مشاهده محصولات
          </a>
        </div>
      </div>

      {/* بخش جدید: ویژگی‌های کلیدی برای پربارتر شدن صفحه */}
      <div className="mt-16 pt-8 border-t border-gray-200/60 sm:mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* ویژگی ۱ */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mb-4 shadow-sm">
              <FaBolt className="text-2xl" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-900">شارژ سریع و هوشمند</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              پشتیبانی از فناوری فست شارژ برای پر کردن سریع باتری موبایل و پاوربانک.
            </p>
          </div>

          {/* ویژگی ۲ */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 mb-4 shadow-sm">
              <FaWeightHanging className="text-2xl" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-900">طراحی تاشو و سبک</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              به راحتی جمع می‌شود و در کوله‌پشتی یا داشبورد ماشین جای می‌گیرد.
            </p>
          </div>

          {/* ویژگی ۳ */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 mb-4 shadow-sm">
              <FaShieldAlt className="text-2xl" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-900">مقاوم در برابر آب</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              ساخته شده با متریال ضد آب و ضد گرد و غبار، ایده‌آل برای طبیعت‌گردی.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
