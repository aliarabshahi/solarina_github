"use client";

import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactImage from "./components/ContactImage";
import ContactDetail from "./components/ContactDetail";

function ContactFormSkeleton() {
  return (
    // تغییر رنگ اسکلتون به آبی روشن
    <div className="w-full h-[400px] bg-blue-100/30 rounded-xl animate-pulse mb-6" />
  );
}

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    // تغییر پس‌زمینه به bg-slate-50 و افزودن dir="rtl" برای هماهنگی
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10 px-6 sm:px-10 lg:px-20" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10">

          {/* تصویر استیکی */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <ContactImage />
          </div>

          {/* فرم + جزئیات تماس */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {loading ? <ContactFormSkeleton /> : <ContactForm />}
            <ContactDetail />
          </div>

        </div>
      </div>
    </div>
  );
}
