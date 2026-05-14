"use client";

import { useEffect, useState } from "react";

import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { postApiData } from "@/app/services/receive_data/apiClientPost";

type Props = {
  params: {
    tracking_code: string;
  };
};

export default function OrderReviewPage({ params }: Props) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const formatToman = (rial: number) => {
    return (rial / 10).toLocaleString();
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getApiData(
          `orders/review/${params.tracking_code}`
        );

        if (res.error || !res.data) {
          setMessage(res.error || "سفارش یافت نشد");
          return;
        }

        setOrder(res.data);
      } catch (err) {
        console.error(err);
        setMessage("خطا در دریافت اطلاعات سفارش");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.tracking_code]);

  const handlePayment = async () => {
    if (!order) return;

    try {
      const payRes = await postApiData<any>(
        "orders/payment/create",
        {
          order_id: order.id,
        }
      );

      if (payRes.error || !payRes.data?.payment_url) {
        setMessage(payRes.error || "خطا در پرداخت");
        return;
      }

      window.location.href = payRes.data.payment_url;
    } catch (err) {
      console.error(err);
      setMessage("خطا در ارتباط با سرور");
    }
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!order) {
    return <div>{message}</div>;
  }

  return (
    <div dir="rtl" className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        بررسی سفارش
      </h1>

      <div className="space-y-3">
        <p>نام: {order.full_name}</p>
        <p>موبایل: {order.phone_number}</p>
        <p>آدرس: {order.address}</p>
      </div>

      <div className="mt-8 space-y-3">
        {order.products.map((p: any, i: number) => (
          <div
            key={i}
            className="border p-3 rounded"
          >
            <p>{p.name}</p>

            <p>
              تعداد: {p.quantity}
            </p>

            <p>
              قیمت:
              {formatToman(p.unit_price)}
              تومان
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xl font-bold">
        مبلغ کل:
        {formatToman(order.total_price)}
        تومان
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        پرداخت
      </button>

      {message && (
        <div className="mt-4 text-red-500">
          {message}
        </div>
      )}
    </div>
  );
}
