import { Sun } from "lucide-react";

export default function AboutIntro() {
  return (
    <section className="text-center space-y-6" dir="rtl">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-orange-50 rounded-full">
          <Sun className="w-12 h-12 text-orange-500" />
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
        درباره ما
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
        ما یک تیم کوچک و پرانگیزه هستیم که به دنبال ارائه راهکارهای ساده، هوشمندانه و کاربردی در زمینه انرژی خورشیدی برای مردم ایران هستیم. هدف ما این است که دسترسی به انرژی پاک و مستقل را برای همه آسان و لذت‌بخش کنیم.
      </p>
    </section>
  );
}
