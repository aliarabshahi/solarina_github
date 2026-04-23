import { IoPlayCircleSharp } from "react-icons/io5";

/** Main Hero content: video button, heading, description, and CTA */
export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl pt-12 sm:pt-16 lg:pt-24 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-6">
      {/* Video trigger button */}
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <button
          onClick={onVideoOpen}
          className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium leading-6 
                     text-gray-700 ring-1 ring-gray-900/10 transition-all duration-300 ease-out
                     hover:ring-2 hover:ring-solarina-dark"
        >
          <IoPlayCircleSharp
            className="text-xl text-gray-500 transition-all duration-100 group-hover:text-[#f05757]
                         group-hover:scale-110"
          />
          <span>مشاهده ویدیوی معرفی</span>
        </button>
      </div>

      {/* General heading & description */}
      <div className="text-center space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 leading-tight sm:leading-tight">
          با <span className="text-solarina-dark">ایده‌های نو</span>،{" "}
          <span className="bg-gradient-to-r from-solarina to-purple-600 bg-clip-text text-transparent">
            آینده‌ات را بساز
          </span>
          <span className="text-gray-600">!</span>
        </h1>

        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-3xl mx-auto">
          پیدا کن مسیر رشد فردی و کاری خودت را با الهام از آموزش، تجربه و همکاری
          واقعی. هر گام کوچک می‌تونه نقطه شروع تغییری بزرگ در مسیر حرفه‌ای‌ت باشه.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="/example-items"
            className="w-full sm:w-auto rounded-md bg-solarina px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-sm 
                       hover:bg-solarina-dark focus-visible:outline focus-visible:outline-2 
                       focus-visible:outline-offset-2 focus-visible:outline-solarina-dark 
                       transition-all duration-300 hover:shadow-lg text-center"
          >
            مشاهده داده‌ها
          </a>
          <a
            href="/example-add"
            className="w-full sm:w-auto rounded-md bg-gradient-to-r from-purple-500 to-solarina px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold 
                       text-white shadow-sm hover:shadow-lg transition-all duration-300 text-center"
          >
            افزودن داده جدید
          </a>
        </div>
      </div>
    </div>
  );
}
