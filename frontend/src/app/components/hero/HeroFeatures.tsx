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
          چرا باید به خورشید اعتماد کنید؟
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          ما در سولارینا بهترین تجهیزات خورشیدی پرتابل و ثابت را گرد هم آورده‌ایم تا برق مورد نیاز شما را در هر شرایطی تامین کنیم؛ از سفرهای طبیعت‌گردی تا روشنایی و برق خونه ها
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* کارت ۱ - استقلال انرژی */}
        <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
          {/* Changed aspect-video to aspect-square here */}
          <div className="relative overflow-hidden aspect-square bg-gray-100">
            <Image
              src="/images/solar/1solar-power-backup.jpg"
              alt="تامین انرژی خورشیدی"
              width={800}
              height={800}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-sm text-blue-600">
              <Zap size={24} />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              خداحافظی با قطعی برق
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              با استفاده از پنل‌ها و پکیج‌های خورشیدی، همیشه یک منبع رزرو برای روشنایی و شارژ وسایل ضروری خود دارید.
            </p>
          </div>
        </div>

        {/* کارت ۲ - کاربرد در طبیعت */}
        <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
          {/* Changed aspect-video to aspect-square here */}
          <div className="relative overflow-hidden aspect-square bg-gray-100">
            <Image
              src="/images/solar/2solar-camping-travel.jpg"
              alt="کمپینگ و سفر"
              width={800}
              height={800}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-sm text-blue-600">
              <Sun size={24} />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              همسفر تمام‌عیار
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              تجهیزات سبک، تاشو و ضدآب سولارینا برای شرایط سخت سفر طراحی شده‌اند تا در هیچ جاده‌ای تنها نمانید.
            </p>
          </div>
        </div>

        {/* کارت ۳ - روشنایی مدرن */}
        <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
          {/* Changed aspect-video to aspect-square here */}
          <div className="relative overflow-hidden aspect-square bg-gray-100">
            <Image
              src="/images/solar/3solar-camping-travel.jpg"
              alt="روشنایی خورشیدی"
              width={800}
              height={800}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl shadow-sm text-blue-600">
              <BatteryCharging size={24} />
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              روشنایی هوشمند
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              پروژکتورها و چراغ‌های سولار نیازی به سیم‌کشی ندارند؛ در روز شارژ می‌شوند و شب‌ها به صورت خودکار محیط را روشن می‌کنند.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
