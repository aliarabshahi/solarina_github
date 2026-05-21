import { Zap, Leaf, PiggyBank } from "lucide-react";

const highlights = [
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: "انرژی مستقل و همیشه در دسترس",
    desc: "با پنل‌های خورشیدی پرتابل، فرقی نمی‌کند کجا هستید؛ دیگر نگران تمام شدن شارژ و قطعی برق نباشید.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-emerald-500" />,
    title: "دوستدار محیط زیست",
    desc: "تامین انرژی از یک منبع پاک و تجدیدپذیر، بدون هیچ‌گونه آلودگی صوتی یا زیست‌محیطی.",
  },
  {
    icon: <PiggyBank className="w-8 h-8 text-blue-500" />,
    title: "مقرون‌به‌صرفه و اقتصادی",
    desc: "یک‌بار سرمایه‌گذاری کنید و سال‌ها بدون پرداخت هزینه اضافی بابت قبض برق، از انرژی رایگان استفاده کنید.",
  },
];

export default function AboutProjectSection() {
  return (
    <section className="space-y-10" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          چرا انرژی خورشیدی؟
        </h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl">
                {item.icon}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
