"use client";

import Image from "next/image";
import { BatteryCharging, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroFeatures() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mt-32 space-y-16"
    >
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          یه نیروگاه کوچیک، همیشه همراهته
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          فرقی نمی‌کنه وسط کویر باشی یا روی بالکن خونه؛ این پنل جوری طراحی شده
          که بدون دردسر، انرژی پاک خورشید رو مستقیم به گوشی و پاوربانکت برسونه.
        </p>
      </div>

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
    </motion.div>
  );
}
