import { FaSun } from "react-icons/fa";

export default function AboutIntro() {
  return (
    <section className="text-center space-y-6" dir="rtl">
      <div className="flex justify-center mb-4">
        <FaSun className="text-5xl text-yellow-400" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        درباره ما
      </h1>
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
        ما یک تیم کوچک و پرانگیزه هستیم که به دنبال ارائه راهکارهای ساده و کاربردی
        در زمینه انرژی خورشیدی برای مردم ایران هستیم. هدف ما این است که دسترسی
        به انرژی پاک و مستقل را برای همه آسان کنیم.
      </p>
    </section>
  );
}
