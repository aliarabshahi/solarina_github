"use client";
import { useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaComment,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

type ContactFormData = {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
};

export default function ContactForm() {
  const [contact, setContact] = useState<ContactFormData>({
    full_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Connect to Django backend
    // const { error } = await postApiData("/contact-us/", contact);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setLoading(false);
    setMessage("پیام شما با موفقیت ارسال شد");
    setContact({
      full_name: "",
      email: "",
      phone_number: "",
      message: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-md 
                 p-5 sm:p-7 md:p-8 rounded-xl 
                 shadow-lg
                 border border-orange-500/15 w-full"
    >
      {/* تیتر و توضیح */}
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-2">
          تماس با ما
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          سوالات و پیشنهادات خود را با ما در میان بگذارید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" method="post">
        {/* نام */}
        <div>
          <label
            htmlFor="full_name"
            className="block text-xs sm:text-sm font-medium mb-2 text-gray-700"
          >
            نام کامل
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-orange-500">
              <FaUser />
            </div>
            <input
              id="full_name"
              name="full_name"
              autoComplete="name"
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full bg-white/60 border border-orange-500/20 
                         text-gray-800 text-sm sm:text-base rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                         p-3 pr-10 placeholder-gray-400 transition"
              value={contact.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
              required
            />
          </div>
        </div>

        {/* ایمیل */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium mb-2 text-gray-700"
          >
            ایمیل
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-orange-500">
              <FaEnvelope />
            </div>
            <input
              id="email"
              name="email"
              autoComplete="email"
              type="email"
              placeholder="ایمیل شما"
              className="w-full bg-white/60 border border-orange-500/20 
                         text-gray-800 text-sm sm:text-base rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                         p-3 pr-10 placeholder-gray-400 transition"
              value={contact.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
        </div>

        {/* شماره تماس */}
        <div>
          <label
            htmlFor="phone_number"
            className="block text-xs sm:text-sm font-medium mb-2 text-gray-700"
          >
            شماره تماس
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-orange-500">
              <FaPhone />
            </div>
            <input
              id="phone_number"
              name="phone"
              autoComplete="tel"
              type="tel"
              placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹"
              className="w-full bg-white/60 border border-orange-500/20 
                         text-gray-800 text-sm sm:text-base rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                         p-3 pr-10 placeholder-gray-400 transition"
              value={contact.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              required
              pattern="^0.*$"
              maxLength={12}
            />
          </div>
        </div>

        {/* پیام */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs sm:text-sm font-medium mb-2 text-gray-700"
          >
            پیام شما
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-orange-500">
              <FaComment />
            </div>
            <textarea
              id="message"
              name="message"
              autoComplete="off"
              placeholder="متن پیام..."
              className="w-full bg-white/60 border border-orange-500/20 
                         text-gray-800 text-sm sm:text-base rounded-lg 
                         focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                         p-3 pr-10 h-32 placeholder-gray-400 transition resize-none"
              value={contact.message}
              onChange={(e) => handleChange("message", e.target.value)}
              required
            />
          </div>
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-400
                     hover:from-orange-600 hover:to-yellow-500
                     text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-6 
                     rounded-lg transition-all duration-300 shadow-md 
                     hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <FaPaperPlane className="text-sm" />
          )}
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>

        {/* پیغام بازخورد */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 bg-green-100 text-green-800"
          >
            <FaCheckCircle className="flex-shrink-0" />
            {message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}
