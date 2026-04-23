import { FaCheckCircle } from "react-icons/fa";

const features = [
  "پنل‌های خورشیدی با کیفیت بالا و طول عمر ۱۰+ سال",
  "بدون نیاز به باتری داخلی — کمتر خرابی، کمتر هزینه",
  "مناسب برای کمپینگ، سفر، خودرو و مواقع اضطراری",
  "شارژ مستقیم موبایل، پاوربانک و دستگاه‌های USB",
  "پشتیبانی کامل و مشاوره رایگان قبل از خرید",
];

export default function AboutFeatures() {
  return (
    <section className="bg-blue-50/70 rounded-2xl p-8 space-y-6" dir="rtl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
        ویژگی‌های محصولات ما
      </h2>
      <ul className="space-y-4 max-w-2xl mx-auto">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <FaCheckCircle className="text-blue-600 text-xl mt-0.5 shrink-0" />
            <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
