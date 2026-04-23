/**
 * AboutCTA — final call-to-action section
 */
export default function AboutCTA() {
  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        آماده‌ای با ما رشد کنی؟
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        چه برای <strong>یادگیری مهارت‌های تخصصی</strong> و چه برای{" "}
        <strong>ساخت پروژه‌های نوآورانه</strong>، ما کنارت هستیم تا بهترین نتیجه رو بگیری.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/courses"
          className="bg-[#1F9ED0] hover:bg-[#147aa9] text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors shadow-sm hover:shadow-md text-sm sm:text-base"
        >
          شروع یادگیری
        </a>

        <a
          href="/contact"
          className="bg-white border border-[#1F9ED0] text-[#1F9ED0] font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors hover:bg-[#1F9ED0]/5 shadow-sm text-sm sm:text-base"
        >
          ارتباط با تیم ما
        </a>
      </div>
    </div>
  );
}
