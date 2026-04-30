import Link from "next/link";
import Image from "next/image";
import { IoPlayCircleSharp } from "react-icons/io5";

export default function HeroMainContent({
  onVideoOpen,
}: {
  onVideoOpen: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-6">

      {/* دکمه ویدیو */}
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <button
          onClick={onVideoOpen}
          className="group flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium leading-6 
                     text-gray-700 ring-1 ring-gray-900/10 transition-all duration-300 ease-out
                     hover:ring-2 hover:ring-blue-600 bg-white/50 backdrop-blur-sm"
        >
          <IoPlayCircleSharp
            className="text-xl text-blue-500 transition-all duration-100 group-hover:scale-110"
          />
          <span>ببین چطور کار می‌کنه!</span>
        </button>
      </div>

      {/* متن اصلی */}
      <div className="text-center space-y-6 sm:space-y-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
          خورشید تو جیبته،{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            هرجا که باشی!
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-gray-600 max-w-2xl mx-auto">
          دیگه نگران تموم شدن شارژ گوشی تو دل طبیعت یا قطعی برق نباش. با پنل‌های خورشیدی پرتابل ما، هر جا نور هست، برق هم هست. ساده، سبک و همیشه آماده!
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/order"
            className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 text-sm sm:text-base font-bold text-white shadow-lg 
                       hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            می‌خوام بخرم
          </Link>

          <a
            href="products"
            className="w-full sm:w-auto rounded-xl bg-gray-100 px-8 py-4 text-sm sm:text-base font-semibold 
                       text-gray-900 hover:bg-gray-200 transition-all duration-300 text-center"
          >
            بررسی مشخصات فنی
          </a>
        </div>
      </div>

      {/* بخش ویژگی‌ها */}
      <div className="mt-24 max-w-5xl mx-auto space-y-16 px-4 sm:px-0">

        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            یه نیروگاه کوچیک، همیشه همراهته
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            فرقی نمی‌کنه وسط کویر باشی یا روی بالکن خونه؛ این پنل جوری طراحی شده که بدون دردسر، انرژی پاک خورشید رو مستقیم به گوشی و پاوربانکت برسونه.
          </p>
        </div>

        {/* کارت‌های ویژگی‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* کارت ۱ */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="overflow-hidden aspect-video">
              <Image
                src="/images/solar/solar1.png"
                alt="شارژ چند دستگاه"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">همزمان شارژ کن</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                گوشی، هندزفری و پاوربانک رو همزمان بهش وصل کن و بذار خورشید کارش رو انجام بده.
              </p>
            </div>
          </div>

          {/* کارت ۲ */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="overflow-hidden aspect-video">
              <Image
                src="/images/solar/solar2.png"
                alt="سفر با پنل خورشیدی"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">رفیقِ فابریکِ جاده ها</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                توی ماشین یا کمپ، نگران دور بودن از پریز برق نباش. این پنل برای شرایط سخت طراحی شده.
              </p>
            </div>
          </div>

          {/* کارت ۳ */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="overflow-hidden aspect-video">
              <Image
                src="/images/solar/solar3.png"
                alt="طبیعت‌گردی"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">سبک و تاشو</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                اندازه‌اش جوریه که راحت توی کوله‌پشتی جا می‌شه و وزنش رو اصلاً حس نمی‌کنی.
              </p>
            </div>
          </div>

        </div>

        {/* CTA پایانی */}
        <div className="mt-20 bg-gray-900 rounded-[2.5rem] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none"></div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
            آماده‌ای از شر سیم و پریز خلاص بشی؟
          </h3>
          <p className="text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
            همین حالا سفارش بده و اولین قدم رو برای داشتن انرژی رایگان و بی‌پایان بردار. خورشید منتظره!
          </p>
          <Link
            href="/order"
            className="inline-block bg-blue-600 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-lg hover:bg-blue-500 hover:scale-105 transition-all relative z-10"
          >
             سفارش می‌دم
          </Link>
        </div>

      </div>
    </div>
  );
}
