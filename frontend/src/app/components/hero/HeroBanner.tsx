"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Zap, Sun, ArrowLeft } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function HeroBanner({ onVideoOpen }: { onVideoOpen: () => void }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24"
    >
      {/* ستون راست: متن‌ها */}
      <div className="text-right space-y-6 lg:pr-4 order-2 lg:order-1">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          انرژی خورشیدی برای زندگی روزمره
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.2]"
        >
          قدرت خورشید، <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mt-2 inline-block">
            در دستان تو
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg sm:text-xl leading-relaxed text-gray-600 max-w-lg">
          از کمپینگ در قلب طبیعت تا تامین برق اضطراری در خانه؛ سولارینا همراه شماست تا از انرژی بی‌پایان خورشید، بهره‌مند شوید.
        </motion.p>

        {/* دکمه‌ها */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/products"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            <Zap size={20} className="text-yellow-300" />
            مشاهده محصولات
            <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={onVideoOpen}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white border border-gray-200 px-8 py-4 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300"
          >
            <Play size={20} className="fill-current" />
            معرفی سولارینا
          </button>
        </motion.div>
      </div>

      {/* ستون چپ: تصویر */}
      <motion.div 
        variants={itemVariants}
        className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-300/30 to-yellow-200/30 blur-[60px] rounded-full -z-10" />
        
        <div className="relative w-full max-w-sm lg:max-w-md">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Image
              src="/images/solar/main2.png" 
              alt="محصولات انرژی خورشیدی سولارینا"
              width={400}
              height={400}
              className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl"
              priority
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 sm:-left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
          >
            <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
              <Sun size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">انرژی پایدار</p>
              <p className="text-xs text-gray-500">صرفه‌جویی در هزینه برق</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
