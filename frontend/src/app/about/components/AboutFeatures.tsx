import { FaHandsHelping, FaRocket, FaUserGraduate } from "react-icons/fa";

/**
 * AboutFeatures — displays 3 feature cards (learning, projects, community)
 */
export default function AboutFeatures() {
  return (
    <div className="grid gap-10 md:grid-cols-3 text-center text-gray-700">
      {/* Feature 1 — Learning */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] rounded-xl shadow-sm border border-gray-100">
        <FaUserGraduate className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-base sm:text-lg font-semibold mb-2">
          آموزش تخصصی
        </h3>
        <p className="text-sm sm:text-base leading-6">
          دسترسی به <strong>محتوای آموزشی باکیفیت</strong> در حوزه داده، هوش مصنوعی و
          فناوری‌های نو، همراه با تمرین‌ها و نمونه‌های واقعی.
        </p>
      </div>

      {/* Feature 2 — Projects */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] rounded-xl shadow-sm border border-gray-100">
        <FaRocket className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-base sm:text-lg font-semibold mb-2">
          پروژه‌های واقعی
        </h3>
        <p className="text-sm sm:text-base leading-6">
          از ایده تا اجرا در پروژه‌های کاربردی شرکت کنید؛ تجربه‌ای واقعی از
          <strong>حل مسائل صنعتی</strong> و ساخت سیستم‌های داده‌محور.
        </p>
      </div>

      {/* Feature 3 — Community */}
      <div className="p-6 bg-gradient-to-br from-[#1f9ece08] to-[#f477b810] rounded-xl shadow-sm border border-gray-100">
        <FaHandsHelping className="mx-auto text-[#1F9ECE] text-3xl mb-4" />
        <h3 className="text-base sm:text-lg font-semibold mb-2">
          جامعه حرفه‌ای
        </h3>
        <p className="text-sm sm:text-base leading-6">
          عضویت در <strong>جامعه‌ای از متخصصان و علاقه‌مندان</strong> به فناوری و داده برای
          یادگیری جمعی و همکاری در پروژه‌های مشترک.
        </p>
      </div>
    </div>
  );
}
