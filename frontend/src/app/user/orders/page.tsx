"use client";

import { useState, useEffect } from "react";
import { getUser } from "@/app/services/auth/authStorage";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

type OrderData = {
  id: number;
  tracking_code: string | null;
  full_name: string;
  phone_number: string;
  total_price: number;
  status: string;
  created_at: string;
  products: Array<{
    product_name: string;
    quantity: number;
  }>;
};

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatToman = (rial: number) => {
    if (typeof rial !== "number" || isNaN(rial)) return "0";
    return (rial / 10).toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const user = getUser();
      
      if (!user || !user.phone) {
        setError("لطفا ابتدا وارد حساب کاربری خود شوید.");
        setLoading(false);
        return;
      }

      try {
        let allOrders: OrderData[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const res = await getApiData(`orders/?phone_number=${user.phone}&page=${page}`);
          const data = res?.data || res;

          if (data && data.results) {
            allOrders = [...allOrders, ...data.results];
            if (data.next) {
              page++;
            } else {
              hasMore = false;
            }
          } else if (Array.isArray(data)) {
            allOrders = data;
            hasMore = false;
          } else {
            hasMore = false;
          }
        }
        
        const successfulOrders = allOrders.filter((order: OrderData) => order.status === "paid");
        setOrders(successfulOrders);
        
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("خطا در بارگذاری لیست سفارشات.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center p-10" dir="rtl">
        <p className="text-sm text-gray-600">در حال جستجوی سفارشات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center p-10" dir="rtl">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <FaBoxOpen className="text-3xl text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">سفارشات من</h1>
            <p className="text-sm text-gray-500 mt-1">لیست خریدهای موفق شما</p>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center space-y-4">
            <p className="text-gray-500">شما هنوز هیچ سفارش موفقی نداشته‌اید.</p>
            <Link href="/products" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:shadow-md">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      کد رهگیری: {order.tracking_code || "در حال صدور"}
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
                      <FaCheckCircle /> پرداخت موفق
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    تاریخ ثبت: {formatDate(order.created_at)}
                  </div>
                  <div className="text-sm text-gray-600">
                    اقلام: {order.products.map(p => `${p.product_name} (${p.quantity})`).join("، ")}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <div className="text-lg font-bold text-blue-700">
                    {formatToman(order.total_price)} تومان
                  </div>
                  {order.tracking_code && (
                    <Link 
                      href={`/order/track?code=${order.tracking_code}`} 
                      className="text-sm text-blue-600 hover:underline"
                    >
                      مشاهده جزئیات کامل
                    </Link>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
