import { IoPlayCircleSharp } from "react-icons/io5";

export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl pt-12 sm:pt-16 lg:pt-24 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-6">
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

      <div className="text-center space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 leading-tight sm:leading-tight">
          انرژی خورشید،{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            همیشه در دسترس
          </span>
        </h1>

        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto">
          پنل‌های خورشیدی پرتابل ما به شما امکان می‌دهند در هر مکانی — کمپینگ،
          ماشین، یا هنگام قطعی برق — موبایل و وسایل دیجیتال خود را شارژ کنید.
          بدون باتری، بدون پیچیدگی.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#order"
            className="w-full sm:w-auto rounded-md bg-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-sm 
                       hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-blue-600 
                       transition-all duration-300 hover:shadow-lg text-center"
          >
            ثبت سفارش
          </a>
          <a
            href="#products"
            className="w-full sm:w-auto rounded-md bg-orange-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold 
                       text-white shadow-sm hover:bg-orange-600 hover:shadow-lg transition-all duration-300 text-center"
          >
            مشاهده محصولات
          </a>
        </div>
      </div>
    </div>
  );
}
