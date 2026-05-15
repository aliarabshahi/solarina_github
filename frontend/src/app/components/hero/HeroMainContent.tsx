import Link from "next/link";
import Image from "next/image";
import { Play, Zap, Sun, BatteryCharging } from "lucide-react";

export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl pt-12 sm:pt-20 pb-10 px-4 sm:px-6">
      {/* متن اصلی */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          خورشید تو جیبته،
          <span className="block sm:inline text-blue-600 mt-2 sm:mt-0 sm:mr-3">
            هرجا که باشی!
          </span>
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-gray-600">
          دیگه نگران تموم شدن شارژ گوشی تو دل طبیعت یا قطعی برق نباش. با
          پنل‌های خورشیدی پرتابل ما، هر جا نور هست، برق هم هست. ساده، سبک و همیشه
          آماده!
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/products"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            <Zap size={20} />
            مشاهده و خرید محصولات
          </Link>

          <button
            onClick={onVideoOpen}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white border border-gray-200 px-8 py-4 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300"
          >
            <Play size={20} />
            ببین چطور کار می‌کنه
          </button>
        </div>
      </div>

      {/* بخش ویژگی‌ها */}
      <div className="mt-32 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            یه نیروگاه کوچیک، همیشه همراهته
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            فرقی نمی‌کنه وسط کویر باشی یا روی بالکن خونه؛ این پنل جوری طراحی شده
            که بدون دردسر، انرژی پاک خورشید رو مستقیم به گوشی و پاوربانکت برسونه.
          </p>
        </div>

        {/* کارت‌های ویژگی‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* کارت ۱ */}
          <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative overflow-hidden aspect-video bg-gray-100">
              <Image
                src="/images/solar/solar1.png"
                alt="شارژ چند دستگاه"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-sm text-blue-600">
                <BatteryCharging size={24} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                همزمان شارژ کن
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                گوشی، هندزفری و پاوربانک رو همزمان بهش وصل کن و بذار خورشید کارش
                رو انجام بده.
              </p>
            </div>
          </div>

          {/* کارت ۲ */}
          <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative overflow-hidden aspect-video bg-gray-100">
              <Image
                src="/images/solar/solar2.png"
                alt="سفر با پنل خورشیدی"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-sm text-blue-600">
                <Sun size={24} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                رفیقِ فابریکِ جاده‌ها
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                توی ماشین یا کمپ، نگران دور بودن از پریز برق نباش. این پنل برای
                شرایط سخت طراحی شده.
              </p>
            </div>
          </div>

          {/* کارت ۳ */}
          <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative overflow-hidden aspect-video bg-gray-100">
              <Image
                src="/images/solar/solar3.png"
                alt="طبیعت‌گردی"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-sm text-blue-600">
                <Zap size={24} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                سبک و تاشو
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                اندازه‌اش جوریه که راحت توی کوله‌پشتی جا می‌شه و وزنش رو اصلاً
                حس نمی‌کنی.
              </p>
            </div>
          </div>
        </div>

        {/* CTA پایانی */}
        <div className="mt-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-14 text-center shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          ></div>
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          ></div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 relative z-10">
            آماده‌ای از شر سیم و پریز خلاص بشی؟
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
            همین حالا به صفحه محصولات سر بزن و اولین قدم رو برای داشتن انرژی رایگان
            و بی‌پایان بردار. خورشید منتظره!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 relative z-10"
          >
            <Sun size={22} className="text-blue-500" />
انتخاب محصولات          </Link>
        </div>
      </div>
    </div>
  );
}
