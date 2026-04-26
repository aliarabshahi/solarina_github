"use client";

import { useEffect, useState } from "react";

export default function VerifyOrderPage() {
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const Status = url.searchParams.get("Status");
    const Authority = url.searchParams.get("Authority");

    if (!Status || !Authority) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `/api/proxy/orders/payment/verify/?Status=${Status}&Authority=${Authority}`
        );

        const data = await res.json();

        if (data.status === "success") setStatus("success");
        else setStatus("failed");
      } catch (error) {
        setStatus("failed");
      }
    };

    verify();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600 text-xl">
        در حال بررسی پرداخت...
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          پرداخت با موفقیت انجام شد 🎉
        </h2>
        <p className="text-gray-600">
          سفارش شما ثبت و پرداخت شد. تیم ما به زودی با شما تماس خواهد گرفت.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        پرداخت ناموفق بود ❌
      </h2>
      <p className="text-gray-600">
        اگر مبلغ از حساب شما کسر شده، ظرف چند دقیقه بازگردانده می‌شود.
      </p>
    </div>
  );
}
