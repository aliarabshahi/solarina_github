import { CheckCircle2 } from "lucide-react";

const features = [
  "پنل‌های خورشیدی با کیفیت بالا و طول عمر بالای ۱۰ سال",
  "بدون نیاز به باتری داخلی (کاهش چشمگیر خرابی و هزینه‌های جانبی)",
  "ایده‌آل برای کمپینگ، سفر، آفرود و استفاده در مواقع اضطراری",
  "قابلیت شارژ مستقیم و ایمن موبایل، پاوربانک و تمامی دستگاه‌های USB",
  "پشتیبانی فنی کامل و مشاوره رایگان و دلسوزانه پیش از خرید",
];

export default function AboutFeatures() {
  return (
    <section dir="rtl">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 rounded-3xl p-8 sm:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            وجه تمایز محصولات ما
          </h2>
        </div>
        
        <ul className="space-y-4 max-w-2xl mx-auto">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-4 bg-white/60 p-4 rounded-2xl backdrop-blur-sm border border-white">
              <CheckCircle2 className="text-blue-600 w-6 h-6 shrink-0" />
              <span className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
