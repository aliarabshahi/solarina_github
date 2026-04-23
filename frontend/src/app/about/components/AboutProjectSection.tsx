/**
 * AboutProjectSection — explains company overview and available services
 */
export default function AboutProjectSection() {
  return (
    <div className="space-y-12">
      {/* Section 1 — General Overview */}
      <div className="bg-gradient-to-br from-[#1f9ece10] to-[#f477b810] p-6 rounded-xl shadow-sm border border-gray-100 text-justify leading-relaxed text-gray-700">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#1F9ECE]">
          نام برند چیست؟
        </h2>
        <p className="mb-4 text-sm sm:text-base">
          <strong>نام برند</strong> یک پلتفرم آموزشی و خدماتی است که توسط تیمی از
          متخصصان، مهندسان و مشاوران با هدف دسترسی آسان‌تر به دانش تخصصی ایجاد شده است.
        </p>
        <p className="text-sm sm:text-base">
          ما در زمینه‌ی <strong>آموزش کاربردی</strong> و{" "}
          <strong>انجام پروژه‌های واقعی</strong> فعالیت داریم؛ از طراحی و استقرار{" "}
          <strong>سیستم‌های داده و هوش مصنوعی</strong> گرفته تا مشاوره و توسعه نرم‌افزارهای
          تخصصی برای کسب‌و‌کارها.
        </p>
      </div>

      {/* Section 2 — Team & Collaboration */}
      <div className="bg-gradient-to-br from-[#1f9ece15] to-[#f477b820] p-6 rounded-xl shadow-sm border border-gray-100 text-justify leading-relaxed text-gray-700">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#1F9ECE]">
          به تیم متخصص نیاز داری؟
        </h2>
        <p className="mb-4 text-sm sm:text-base">
          تیم ما آماده‌ی اجرای <strong>پروژه‌های سازمانی و تخصصی</strong> شماست؛ از طراحی{" "}
          <strong>معماری داده</strong> تا ساخت پایپ‌لاین‌ها، مدل‌سازی، تحلیل داده و
          پیاده‌سازی <strong>راهکارهای هوشمند</strong>.
        </p>
        <p className="text-sm sm:text-base">
          اگر به دنبال <strong>مشاوره تخصصی</strong> یا همکاری در پروژه‌های فناوری هستی، با
          ما در تماس باش تا <strong>بهترین راهکار</strong> برای نیاز کسب‌وکارت طراحی شود.
        </p>
      </div>
    </div>
  );
}
