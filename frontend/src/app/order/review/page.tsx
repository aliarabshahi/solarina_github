"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHashtag,
  FaStickyNote,
  FaShoppingBag,
} from "react-icons/fa";

export default function OrderReviewPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState<any>(null);

  /* ---------------- PRICE FORMAT ---------------- */
  const formatToman = (rial: number) => {
    return (rial / 10).toLocaleString();
  };

  // -----------------------------------------
  // Load order data from search params
  // -----------------------------------------
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

  // -----------------------------------------
  // Payment handler
  // -----------------------------------------
  const handlePayment = async () => {
    if (!order) return;

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...order,
        total_price: Number(order.total_price), // keep rial
        products:
          order.products?.map((p: any) => ({
            product_name: Number(p.product_name),
            quantity: Number(p.quantity),
          })) || [],
      };

      const orderRes = await fetch("/api/proxy/orders/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const orderData = await orderRes.json();
      const orderId = orderData.order_id;

      if (!orderRes.ok || !orderId) {
        setMessage(orderData?.error || "خطا در ثبت سفارش");
        setLoading(false);
        return;
      }

      const payRes = await fetch("/api/proxy/orders/payment/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });

      const payData = await payRes.json();

      if (!payRes.ok || !payData.payment_url) {
        setMessage(payData?.error || "خطا در ساخت لینک پرداخت");
        setLoading(false);
        return;
      }

      window.location.href = payData.payment_url;
    } catch (err) {
      console.error("Payment Error:", err);
      setMessage("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  // -----------------------------------------
  // If no order data yet
  // -----------------------------------------
  if (!order) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex items-center justify-center text-center p-10"
        dir="rtl"
      >
        <p className="text-sm text-gray-600">
          {message || "در حال بارگذاری اطلاعات سفارش..."}
        </p>
      </div>
    );
  }

  // -----------------------------------------
  // MAIN UI
  // -----------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">

          {/* Page Header */}
          <header className="text-center">
            <h1 className="text-2xl  font-bold text-blue-600">
              بررسی نهایی سفارش
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              لطفاً اطلاعات زیر را بررسی و در صورت تایید برای پرداخت اقدام فرمایید. 
            </p>
          </header>

          {/* ---------------------- Customer Info ---------------------- */}
          <div className="space-y-5 text-sm text-gray-700">

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <FaUser className="text-gray-400 w-4 h-4" />
              </span>
              <span>
                <strong className="text-gray-800">نام کامل:</strong>{" "}
                {order.full_name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <FaPhone className="text-gray-400 w-4 h-4" />
              </span>
              <span>
                <strong className="text-gray-800">شماره موبایل:</strong>{" "}
                {order.phone_number}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <FaEnvelope className="text-gray-400 w-4 h-4" />
              </span>
              <span>
                <strong className="text-gray-800">ایمیل:</strong>{" "}
                {order.email || "-"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 flex items-center justify-center mt-1">
                <FaMapMarkerAlt className="text-gray-400 w-4 h-4" />
              </span>
              <span>
                <strong className="text-gray-800">آدرس:</strong>{" "}
                {order.address}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <FaHashtag className="text-gray-400 w-4 h-4" />
              </span>
              <span>
                <strong className="text-gray-800">کد پستی:</strong>{" "}
                {order.postal_code}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 flex items-center justify-center mt-1">
                <FaStickyNote className="text-gray-400 w-4 h-4" />
              </span>
              <span>
                <strong className="text-gray-800">توضیحات:</strong>{" "}
                {order.notes || "-"}
              </span>
            </div>
          </div>

          {/* ---------------------- Product List ---------------------- */}
          <div className="border-t pt-6 space-y-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
              <FaShoppingBag className="text-blue-500 w-5 h-5" />
              اقلام سفارش
            </h2>

            {order.products.map((p: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm"
              >
                <span className="font-medium text-gray-700">
                    {p.product_name}
                </span>

                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  تعداد: {p.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* ---------------------- Total Price ---------------------- */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                مبلغ قابل پرداخت
              </span>

              <span className="font-bold text-blue-700 text-lg">
                {formatToman(Number(order.total_price))} تومان
              </span>
            </div>
          </div>

          {/* ---------------------- Payment Button ---------------------- */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                در حال انتقال به درگاه...
              </>
            ) : (
              "تأیید و پرداخت نهایی"
            )}
          </button>

          {message && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm text-center">
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
