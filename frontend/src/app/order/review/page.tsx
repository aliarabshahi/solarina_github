"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderReviewPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState<any>(null);

  // استخراج و پارس کردن داده‌ها از URL در هنگام لود صفحه
  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decodedOrder = JSON.parse(decodeURIComponent(data));
        setOrder(decodedOrder);
      } catch (err) {
        console.error("Error parsing order data:", err);
        setMessage("اطلاعات سفارش نامعتبر است.");
      }
    }
  }, [searchParams]);

  const handlePayment = async () => {
    if (!order) return;
    
    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ اصلاح دقیق انواع داده قبل از ارسال به بک‌اِند (بسیار مهم برای جلوگیری از خطای 500)
      const sanitizedPayload = {
        ...order,
        total_price: Number(order.total_price),
        products: Array.isArray(order.products)
          ? order.products.map((p: any) => ({
              product_id: Number(p.product_id),
              quantity: Number(p.quantity),
            }))
          : [],
      };

      // 2️⃣ ثبت سفارش در دیتابیس
      const orderRes = await fetch("/api/proxy/orders/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedPayload),
      });

      const orderData = await orderRes.json();
      const orderId = orderData.order_id;

      if (!orderRes.ok || !orderId) {
        setMessage(orderData?.error || "خطا در ثبت سفارش");
        setLoading(false);
        return;
      }

      // 3️⃣ ساخت لینک پرداخت زرین‌پال
      const payRes = await fetch("/api/proxy/orders/payment/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      const payData = await payRes.json();

      if (!payRes.ok || !payData.payment_url) {
        setMessage(payData?.error || "خطا در ساخت لینک پرداخت");
        setLoading(false);
        return;
      }

      // 4️⃣ انتقال به درگاه پرداخت
      window.location.href = payData.payment_url;

    } catch (err) {
      console.error("Payment Process Error:", err);
      setMessage("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <div className="text-center p-10 font-sans" dir="rtl">
        <p>{message || "در حال بارگذاری اطلاعات سفارش..."}</p>
      </div>
    );
  }

  return (
    <section
      dir="rtl"
      className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-blue-500/15 my-10 font-sans"
    >
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        بررسی نهایی سفارش
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>نام و نام‌خانوادگی:</strong> {order.full_name}
        </div>
        <div>
          <strong>شماره موبایل:</strong> {order.phone_number}
        </div>
        <div className="md:col-span-2">
          <strong>ایمیل:</strong> {order.email || "-"}
        </div>
        <div className="md:col-span-2">
          <strong>آدرس دقیق:</strong> {order.address}
        </div>
        <div>
          <strong>کد پستی:</strong> {order.postal_code}
        </div>
        <div className="md:col-span-2">
          <strong>توضیحات سفارش:</strong> {order.notes || "-"}
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="space-y-3">
        <h2 className="font-semibold text-gray-800">اقلام سفارش:</h2>
        {order.products.map((p: any, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center border bg-white/50 rounded-lg p-3 text-sm"
          >
            <span className="font-medium text-gray-600">محصول کد {p.product_id}</span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
              تعداد: {p.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8 p-4 bg-blue-50 rounded-lg font-bold text-blue-700 text-lg">
        <span>مبلغ قابل پرداخت:</span>
        <span>{Number(order.total_price).toLocaleString()} تومان</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`mt-6 w-full py-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
          loading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال انتقال به درگاه...
          </>
        ) : (
          "تأیید و پرداخت نهایی"
        )}
      </button>

      {message && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mt-4 text-sm text-center">
          {message}
        </div>
      )}
    </section>
  );
}
