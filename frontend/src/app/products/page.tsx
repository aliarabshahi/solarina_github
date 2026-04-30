import Link from "next/link";
import { FaBolt, FaWeightHanging, FaSun, FaWater, FaUsb } from "react-icons/fa";

export default function ProductsPage() {
  return (
    // استفاده از کلاس‌های تراز اصلی مشابه Hero.tsx
    <div className="bg-[#fbfeff] relative isolate px-6 lg:px-8" dir="rtl">
      {/* بخش محتوا با رعایت max-w-4xl برای هماهنگی با متن‌های صفحه اصلی */}
      <div className="mx-auto max-w-4xl pt-12 sm:pt-16 lg:pt-20 pb-12">
        {/* تیتر و معرفی محصول */}
        <div className="text-center space-y-6 sm:space-y-8 mb-16">
          <h1 className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            شارژر خورشیدی پرتابل <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mt-2 block">
              همسفرِ خستگی‌ناپذیرِ شما
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-gray-600 max-w-2xl mx-auto">
            این پنل خورشیدی تاشو طراحی شده تا تو دل طبیعت، کویر یا حتی تو تراس
            خونه، نذاره هیچوقت دستگاه‌هات خاموش بشن. سبک، مقاوم و با بازدهی
            بالا.
          </p>
          <div className="flex justify-center">
            <Link
              href="/order"
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-10 py-4 text-base font-bold text-white shadow-lg 
                         hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              ثبت سفارش (۲,۴۵۰,۰۰۰ تومان)
            </Link>
          </div>
        </div>

        {/* بخش مشخصات فنی - هماهنگ با عرض max-w-5xl */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-md border border-gray-100 p-8 sm:p-12 transition-all hover:shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                مشخصات فنی و ویژگی‌ها
              </h2>
              <p className="text-gray-500 mt-3">
                همه چیزهایی که قبل از خرید باید بدونی
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <FaBolt className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                    توان خروجی ($21W$)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    شارژ سریع و پایدار با پنل‌های مونوکریستال.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <FaUsb className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                    پورت‌های خروجی
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    دو پورت USB-A برای شارژ همزمان گوشی و پاوربانک.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <FaWeightHanging className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                    بسیار سبک ($600g$)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    وزنی معادل یک بطری آب! ایده‌آل برای کوهنوردی.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <FaWater className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                    مقاوم در برابر آب
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    رویه پلیمری مقاوم در برابر پاشش آب و گرد و غبار.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <FaSun className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                    تشخیص هوشمند نور
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    تنظیم خودکار جریان برق برای محافظت از باتری.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
