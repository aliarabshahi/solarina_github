import { FaBolt, FaLeaf, FaHandHoldingUsd } from "react-icons/fa";

const highlights = [
  {
    icon: <FaBolt className="text-3xl text-orange-500" />,
    title: "انرژی مستقل",
    desc: "با پنل‌های خورشیدی پرتابل، دیگر نگران قطعی برق نباشید.",
  },
  {
    icon: <FaLeaf className="text-3xl text-cyan-500" />,
    title: "سازگار با محیط زیست",
    desc: "انرژی پاک و تجدیدپذیر، بدون آلودگی و هزینه برق.",
  },
  {
    icon: <FaHandHoldingUsd className="text-3xl text-blue-600" />,
    title: "مقرون به صرفه",
    desc: "سرمایه‌گذاری یک‌باره، استفاده چندین ساله بدون هزینه اضافی.",
  },
];

export default function AboutProjectSection() {
  return (
    <section className="space-y-8" dir="rtl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
        چرا انرژی خورشیدی؟
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center space-y-3"
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
