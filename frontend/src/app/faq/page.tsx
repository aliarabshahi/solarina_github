import { HelpCircle, MessageCircleQuestion } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "آیا این پنل‌ها گوشی را مستقیم شارژ می‌کنند؟",
      answer: "بله! خروجی پنل‌های ما استاندارد USB است و می‌توانید دقیقاً مثل یک شارژر دیواری، کابل گوشی خود را به آن وصل کنید تا با انرژی خورشید شارژ شود."
    },
    {
      question: "در روزهای ابری هم کار می‌کنند؟",
      answer: "راندمان پنل‌های خورشیدی در روزهای ابری کمتر از روزهای آفتابی است، اما همچنان می‌توانند با سرعت کمتری دستگاه شما را شارژ کنند. برای بهترین نتیجه، نور مستقیم خورشید پیشنهاد می‌شود."
    },
    {
      question: "آیا پنل‌ها ضد آب هستند؟",
      answer: "بله، روکش روی سلول‌های خورشیدی در برابر قطرات آب و باران مقاوم است. اما توجه داشته باشید که قسمت پورت‌های USB نباید زیر آب برود."
    },
    {
      question: "چقدر طول می‌کشه تا یه گوشی کامل شارژ بشه؟",
      answer: "این زمان به ظرفیت باتری گوشی شما و شدت نور آفتاب بستگی دارد. اما در یک روز آفتابی و با پنل‌های توان بالای ما، زمان شارژ تقریباً مشابه شارژرهای معمولی دیواری (حدود ۱.۵ تا ۲.۵ ساعت) است."
    }
  ];

  return (
    <div className="bg-white relative z-0 min-h-screen py-16 sm:py-24" dir="rtl">
      {/* دکوراسیون پس‌زمینه */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60 pointer-events-none">
        <div className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6] opacity-20 sm:right-[calc(50%-30rem)] sm:w-[72rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <MessageCircleQuestion className="mx-auto h-16 w-16 text-blue-600 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">سؤالات متداول</h1>
          <p className="text-lg text-gray-600">پاسخ پرتکرارترین سؤالاتی که مشتریان از ما پرسیده‌اند.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white border border-gray-200 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-5 text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  {faq.question}
                </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
