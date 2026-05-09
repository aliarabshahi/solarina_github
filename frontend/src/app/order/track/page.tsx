"use client";

import { useState } from "react";
// Adjust this import path based on where your fetchApiData function is located
import { fetchApiData } from "@/app/services/receive_data/apiClientAxios";
// Updated to match your Django OrderModel exactly
interface OrderDetail {
  id: number;
  full_name: string;
  phone_number: string;
  email?: string | null;
  address: string;
  postal_code: string;
  notes?: string | null;
  products: any[];
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      const response = (await fetchApiData(`/orders/${orderId}/`)) as any;

      if (response && response.id) {
        setOrderData(response);
      } else if (response && response.data && response.data.id) {
        setOrderData(response.data);
      } else {
        setError("سفارشی با این شماره یافت نشد.");
      }
    } catch (err) {
      setError("سفارشی با این شماره یافت نشد.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render the appropriate status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200">
            پرداخت موفق
          </span>
        );
      case "failed":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold border border-red-200">
            پرداخت ناموفق
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold border border-yellow-200">
            در انتظار پرداخت
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold border border-gray-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">پیگیری سفارش</h1>

      <form onSubmit={handleTrackOrder} className="flex flex-col gap-4 mb-8">
        <div>
          <label htmlFor="orderId" className="block mb-2 font-medium">
            شماره سفارش خود را وارد کنید:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border border-gray-300 p-2 rounded-md flex-1 focus:outline-none focus:border-blue-500"
              placeholder="مثلاً: 2"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {loading ? "در حال جستجو..." : "جستجو"}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 border border-red-200">
          {error}
        </div>
      )}

      {orderData && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold">
              جزئیات سفارش #{orderData.id}
            </h2>
            {/* Display the status badge here */}
            {renderStatusBadge(orderData.status)}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">نام و نام خانوادگی:</span>
              <span className="font-medium">{orderData.full_name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">شماره تماس:</span>
              {/* Updated to phone_number */}
              <span className="font-medium">{orderData.phone_number}</span> 
            </div>

            {orderData.email && (
              <div className="flex justify-between">
                <span className="text-gray-600">ایمیل:</span>
                <span className="font-medium">{orderData.email}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">کد پستی:</span>
              <span className="font-medium">{orderData.postal_code}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">آدرس:</span>
              <span className="font-medium text-left max-w-xs">{orderData.address}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">تاریخ ثبت:</span>
              <span className="font-medium" dir="ltr">
                {new Date(orderData.created_at).toLocaleString('fa-IR')}
              </span>
            </div>
            
            <div className="flex justify-between pt-3 border-t mt-3">
              <span className="text-gray-800 font-bold">مبلغ کل:</span>
              <span className="font-bold text-blue-600">
                {orderData.total_price?.toLocaleString()} تومان
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
