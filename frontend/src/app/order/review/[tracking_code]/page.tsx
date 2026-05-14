"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHashtag,
  FaStickyNote,
  FaShoppingBag,
} from "react-icons/fa";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { postApiData } from "@/app/services/receive_data/apiClientPost";

type OrderData = {
  id: number;
  tracking_code: string;
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  postal_code: string;
  notes: string;
  products: Array<{
    product_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  total_price: number;
  status: string;
};

export default function OrderReviewPage() {
  const params = useParams();
  const router = useRouter();
  const tracking_code = params.tracking_code as string;

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formatToman = (rial: number) => {
    if (typeof rial !== "number" || isNaN(rial)) return "0";
    return (rial / 10).toLocaleString();
  };

  // Fetch order by tracking code
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getApiData(`/orders/tracking/${tracking_code}/`);
        if (res?.data) {
          setOrder(res.data);
        } else {
          setMessage("سفارش یافت نشد");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setMessage("خطا در بارگذاری اطلاعات سفارش");
      }
    };

    if (tracking_code) {
      fetchOrder();
    }
  }, [tracking_code]);

  const handlePayment = async () => {
    if (!order) return;

    setLoading(true);
    setMessage("");

    try {
      const payRes = await postApiData<any>("orders/payment/create", {
        tracking_code: order.tracking_code,
      });

      if (payRes.error || !payRes.data?.payment_url) {
        setMessage(payRes.error || "خطا در ساخت لینک پرداخت");
        setLoading(false);
        return;
      }

      window.location.href = payRes.data.payment_url;
    } catch (err) {
      console.error("Payment Error:", err);
      setMessage("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  if (!order && !message) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex items-center justify-center text-center p-10"
        dir="rtl"
      >
        <p className="text-sm text-gray-600">در حال بارگذاری اطلاعات سفارش...</p>
      </div>
    );
  }

  if (message && !order) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex items-center justify-center text-center p-10"
        dir="rtl"
      >
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-blue-600">
              بررسی نهایی سفارش
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              کد رهگیری:{" "}
              <span className="font-mono text-blue-600 font-semibold">
                {order?.tracking_code}
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              لطفاً اطلاعات زیر را بررسی و در صورت تایید برای پرداخت اقدام فرمایید.
            </p>
          </header>

          {/* Customer Info */}
          <div className="space-y-5 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-400 w-4 h-4" />
              <span>
                <strong className="text-gray-800">نام کامل:</strong>{" "}
                {order?.full_name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-400 w-4 h-4" />
              <span>
                <strong className="text-gray-800">شماره موبایل:</strong>{" "}
                {order?.phone_number}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-400 w-4 h-4" />
              <span>
                <strong className="text-gray-800">ایمیل:</strong>{" "}
                {order?.email || "-"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-gray-400 w-4 h-4 mt-1" />
              <span>
                <strong className="text-gray-800">آدرس:</strong>{" "}
                {order?.address}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaHashtag className="text-gray-400 w-4 h-4" />
              <span>
                <strong className="text-gray-800">کد پستی:</strong>{" "}
                {order?.postal_code}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <FaStickyNote className="text-gray-400 w-4 h-4 mt-1" />
              <span>
                <strong className="text-gray-800">توضیحات:</strong>{" "}
                {order?.notes || "-"}
              </span>
            </div>
          </div>

          {/* Product List */}
          <div className="border-t pt-6 space-y-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
              <FaShoppingBag className="text-blue-500 w-5 h-5" />
              اقلام سفارش
            </h2>

            {order?.products.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm"
              >
                <span className="font-medium text-gray-700 whitespace-nowrap">
                  {p.name}
                </span>

                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                  قیمت واحد: {formatToman(p.unit_price)} تومان
                </span>

                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                  تعداد: {p.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                مبلغ قابل پرداخت
              </span>
              <span className="font-bold text-blue-700 text-lg">
                {formatToman(Number(order?.total_price))} تومان
              </span>
            </div>
          </div>

          {/* Payment Button */}
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
