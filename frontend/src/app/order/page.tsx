"use client";

import { useEffect, useState } from "react";
import OrderForm from "./components/OrderForm";
import OrderImage from "./components/OrderImage";
import OrderSupport from "./components/OrderSupport";

function OrderFormSkeleton() {
  return (
    <div className="w-full h-[500px] bg-[#E9D7EB]/30 rounded-xl animate-pulse mb-6" />
  );
}

export default function OrderPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBFD] py-8 sm:py-10 px-6 sm:px-10 lg:px-20" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10">

          {/* تصویر استیکی */}
          {/* Changed from lg:order-2 to lg:order-1 */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 lg:sticky lg:top-0 self-start">
            <OrderImage />
          </div>

          {/* فرم + جزئیات پشتیبانی */}
          {/* Changed from lg:order-1 to lg:order-2 */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            {loading ? <OrderFormSkeleton /> : <OrderForm />}
            <OrderSupport />
          </div>

        </div>
      </div>
    </div>
  );
}
