"use client";
import { useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSolarPanel, FaBox, FaMailBulk, FaEnvelope, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";

type OrderFormData = { 
  full_name: string; 
  phone_number: string; 
  email: string;
  product: string; 
  quantity: string;
  address: string;
  postal_code: string;
  notes: string;
};

export default function OrderForm() {
  const [order, setOrder] = useState<OrderFormData>({ 
    full_name: "", 
    phone_number: "",
    email: "",
    product: "", 
    quantity: "1",
    address: "",
    postal_code: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setOrder({ ...order, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: ارسال به Django backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setMessage("سفارش شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.");
    setOrder({ 
      full_name: "", 
      phone_number: "", 
      email: "",
      product: "", 
      quantity: "1", 
      address: "",
      postal_code: "",
      notes: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-xl shadow-lg border border-blue-500/15 w-full"
    >
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-2">ثبت سفارش</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">اطلاعات خود را وارد کنید تا محصول برای شما ارسال شود</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" method="post" dir="rtl">
        {/* Name */}
        <div>
          <label htmlFor="full_name" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
            نام کامل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"><FaUser /></div>
            <input id="full_name" type="text" placeholder="نام و نام خانوادگی تحویل گیرنده" required
              className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 placeholder-gray-400 transition"
              value={order.full_name} onChange={(e) => handleChange("full_name", e.target.value)} />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <label htmlFor="phone_number" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
              شماره موبایل <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"><FaPhone /></div>
              <input id="phone_number" type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required pattern="^0.*$" maxLength={12}
                className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 placeholder-gray-400 transition"
                value={order.phone_number} onChange={(e) => handleChange("phone_number", e.target.value)} />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
              ایمیل <span className="text-gray-400 text-xs">(اختیاری)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"><FaEnvelope /></div>
              <input id="email" type="email" placeholder="example@email.com"
                className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 placeholder-gray-400 transition"
                value={order.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Product & Quantity */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-2/3">
            <label htmlFor="product" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
              انتخاب محصول <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"><FaSolarPanel /></div>
              <select id="product" required
                className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 appearance-none transition"
                value={order.product} onChange={(e) => handleChange("product", e.target.value)}>
                <option value="" disabled>انتخاب کنید...</option>
                <option value="panel-60w">پنل خورشیدی تاشو ۶۰ وات</option>
                <option value="panel-120w">پنل خورشیدی تاشو ۱۲۰ وات</option>
                <option value="panel-200w">پنل خورشیدی تاشو ۲۰۰ وات</option>
              </select>
            </div>
          </div>

          <div className="w-full sm:w-1/3">
            <label htmlFor="quantity" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
              تعداد <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"><FaBox /></div>
              <input id="quantity" type="number" min="1" max="50" required
                className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 transition"
                value={order.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
            آدرس دقیق پستی <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-blue-500"><FaMapMarkerAlt /></div>
            <textarea id="address" placeholder="استان، شهر، خیابان، کوچه، پلاک، واحد..." required
              className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 h-24 placeholder-gray-400 transition resize-none"
              value={order.address} onChange={(e) => handleChange("address", e.target.value)} />
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postal_code" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
            کد پستی <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"><FaMailBulk /></div>
            <input id="postal_code" type="text" placeholder="۱۲۳۴۵۶۷۸۹۰" required 
              pattern="[0-9]{10}" maxLength={10}
              className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 placeholder-gray-400 transition"
              value={order.postal_code} onChange={(e) => handleChange("postal_code", e.target.value)} />
          </div>
          <p className="text-xs text-gray-500 mt-1 mr-1">کد پستی ۱۰ رقمی بدون خط تیره</p>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
            توضیحات تکمیلی <span className="text-gray-400 text-xs">(اختیاری)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-blue-500"><FaCommentDots /></div>
            <textarea id="notes" placeholder="هر توضیح اضافی که لازم است..."
              className="w-full bg-white/60 border border-blue-500/20 text-gray-800 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 pr-10 h-20 placeholder-gray-400 transition resize-none"
              value={order.notes} onChange={(e) => handleChange("notes", e.target.value)} />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <FaPaperPlane className="text-sm" />}
          {loading ? "در حال ثبت..." : "ثبت سفارش"}
        </button>

        {message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 bg-green-100 text-green-800">
            <FaCheckCircle className="flex-shrink-0" />{message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}
