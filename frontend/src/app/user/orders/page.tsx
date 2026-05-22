"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUser } from "@/app/services/auth/authStorage";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { 
  PackageOpen, 
  CheckCircle2, 
  CalendarDays, 
  ShoppingBag, 
  ChevronLeft,
  CreditCard
} from "lucide-react";

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

// کامپوننت اسکلتون برای بارگذاری سفارشات
const OrderSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-48"></div>
      <div className="h-8 bg-green-100 rounded-xl animate-pulse w-32"></div>
    </div>
    <div className="h-px w-full bg-gray-50"></div>
    <div className="space-y-4">
      <div className="h-5 bg-gray-200 rounded-md animate-pulse w-1/3"></div>
      <div className="h-5 bg-gray-200 rounded-md animate-pulse w-2/3"></div>
    </div>
    <div className="h-px w-full bg-gray-50"></div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-32"></div>
      <div className="h-10 bg-blue-100 rounded-2xl animate-pulse w-full sm:w-40"></div>
    </div>
  </div>
);

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatToman = (rial: number) => {
    if (typeof rial !== "number" || isNaN(rial)) return "0";
    return (rial / 10).toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  return (
    <main className="min-h-screen  bg-white relative overflow-hidden" dir="rtl">
      {/* دکوری پس‌زمینه (مشابه صفحه محصولات) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative right-[calc(50%-11rem)] aspect-[1155/678]
          w-[36rem] translate-x-1/2 rotate-[30deg]
          bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6]
          opacity-20 sm:w-[72rem]"
        />
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        
        {/* هدر صفحه */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-10 sm:mb-14 text-center sm:text-right">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
            <PackageOpen size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              سفارشات من
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              تاریخچه و لیست خریدهای موفق شما
            </p>
          </div>
        </div>

        {/* مدیریت حالت‌های مختلف (خطا، لودینگ، خالی، لیست) */}
        <div className="space-y-6">
          
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-3xl text-center">
              {error}
            </div>
          ) : loading ? (
            // نمایش اسکلتون‌ها در زمان بارگذاری
            <>
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </>
          ) : orders.length === 0 ? (
            // حالت لیست خالی
            <div className="bg-gray-50/50 border border-dashed border-gray-200 p-10 sm:p-16 rounded-3xl text-center space-y-6 flex flex-col items-center">
              <ShoppingBag className="text-gray-300 w-20 h-20" strokeWidth={1} />
              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-bold text-gray-700">هیچ سفارش موفقی یافت نشد</p>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  شما هنوز خریدی انجام نداده‌اید. برای مشاهده و خرید محصولات می‌توانید به فروشگاه سر بزنید.
                </p>
              </div>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all"
              >
                مشاهده محصولات
                <ChevronLeft className="mr-2 w-4 h-4" />
              </Link>
            </div>
          ) : (
            // لیست سفارشات
            orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* بخش بالایی کارت */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-extrabold text-gray-900">
                      کد رهگیری: {order.tracking_code || <span className="text-gray-400 font-normal">در حال صدور...</span>}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold w-fit">
                    <CheckCircle2 size={16} />
                    پرداخت موفق
                  </div>
                </div>

                <div className="h-px w-full bg-gray-50 mb-5"></div>

                {/* جزئیات کارت */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 text-gray-600 text-sm">
                    <CalendarDays className="w-5 h-5 text-gray-400 shrink-0" />
                    <span>تاریخ ثبت: <span className="font-medium text-gray-800">{formatDate(order.created_at)}</span></span>
                  </div>
                  
                  <div className="flex items-start gap-3 text-gray-600 text-sm">
                    <ShoppingBag className="w-5 h-5 text-gray-400 shrink-0" />
                    <span className="leading-relaxed">
                      اقلام: <span className="font-medium text-gray-800">
                        {order.products.map(p => `${p.product_name} (${p.quantity})`).join("، ")}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-50 mb-5"></div>

                {/* بخش پایینی کارت */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-500 text-sm">مبلغ کل:</span>
                    <span className="text-lg sm:text-xl font-bold text-blue-600">
                      {formatToman(order.total_price)} <span className="text-sm font-normal text-gray-500">تومان</span>
                    </span>
                  </div>
                  
                  {order.tracking_code && (
                    <Link 
                      href={`/order/track?code=${order.tracking_code}`} 
                      className="inline-flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl text-sm font-bold transition-colors w-full sm:w-auto"
                    >
                      مشاهده جزئیات
                      <ChevronLeft className="mr-1 w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
