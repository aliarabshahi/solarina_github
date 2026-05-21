import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaMapMarkerAlt,
  FaReceipt,
  FaShoppingBag,
  FaHome,
} from "react-icons/fa";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import { ReactNode } from "react";
import Link from "next/link";
import PrintButton from "./components/PrintButton";

// --- Types ---
interface OrderedProduct {
  name: string;
  quantity: number;
  product_id: number;
  unit_price: number;
  total_price: number;
  product_name: string;
}

interface OrderDetail {
  tracking_code: ReactNode;
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  total_price: number | string;
  products: OrderedProduct[];
}

interface OrderPayment {
  id: number;
  authority: string;
  amount: number | string; // rial
  status: string;
  order_detail: OrderDetail;
  tracking_code: string;
}

interface PageProps {
  searchParams: {
    Status?: string;
    Authority?: string;
  };
}
// -------------

export default async function VerifyOrderPage({ searchParams }: PageProps) {
  const { Status, Authority } = searchParams;

  const formatToman = (r: number | string) =>
    (Number(r) / 10).toLocaleString();

  if (!Status || !Authority) {
    return <FailedPayment />;
  }

  try {
    const verifyRes = await getApiData(
      `/orders/payment/verify/?Status=${Status}&Authority=${Authority}`
    );

    const verifyData = verifyRes?.data;
    const isSuccess =
      verifyData?.status === "success" ||
      verifyData?.status === "already_verified";

    if (!isSuccess) {
      return <FailedPayment />;
    }

    const detailRes = await getApiData(
      `/order-payments/?authority=${Authority}`
    );

    const detailData = detailRes?.data;
    const items = detailData?.results || detailData || [];
    const paymentData: OrderPayment | null =
      Array.isArray(items) && items.length > 0 ? items[0] : null;

    const order = paymentData?.order_detail;

    return (
      <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6" dir="rtl">
        
        {/* استایل‌های مخصوص چاپ برای مخفی کردن هدر، فوتر و ... */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * {
                visibility: hidden;
              }
              #receipt-card, #receipt-card * {
                visibility: visible;
              }
              #receipt-card {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                box-shadow: none !important;
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
              }
            }
          `
        }} />

        <div className="max-w-3xl mx-auto">
          <div id="receipt-card" className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center space-y-6 sm:space-y-8">
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-5xl sm:text-6xl text-green-400 mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-green-500 mb-2">
                پرداخت با موفقیت انجام شد
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-md">
                سفارش شما با موفقیت ثبت شد و در حال پردازش است. لطفاً کد رهگیری خود را یادداشت یا ذخیره کنید.
              </p>
            </div>

            {order && paymentData ? (
              <div className="bg-slate-50 rounded-lg p-5 sm:p-6 text-right space-y-5 border border-slate-200">
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg border-b pb-3 mb-2 text-center">
                  خلاصه سفارش شما
                </h3>

                <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                  <FaReceipt className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>
                    <strong className="text-gray-900">کد رهگیری:</strong>{" "}
                    <span className="font-mono text-blue-600 font-semibold">
                      {order.tracking_code}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                  <FaUser className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>
                    <strong className="text-gray-900">نام و نام خانوادگی:</strong>{" "}
                    {order.full_name}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1" />
                  <span className="flex flex-col">
                    <strong className="text-gray-900">آدرس:</strong>
                    <span className="text-gray-600 leading-relaxed">
                      {order.address}
                    </span>
                  </span>
                </div>

                {order.products && order.products.length > 0 && (
                  <div className="pt-5 mt-5 border-t space-y-4">
                    <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
                      <FaShoppingBag className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
                      اقلام سفارش
                    </div>

                    {order.products.map((p, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row justify-between items-center bg-white border border-slate-200 rounded-lg p-3 sm:p-4 gap-4 text-sm sm:text-base text-center sm:text-right"
                      >
                        <span className="font-medium text-gray-700 w-full sm:w-auto">
                          {p.name}
                        </span>

                        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 w-full sm:w-auto">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                            قیمت واحد: {formatToman(p.unit_price)} تومان
                          </span>

                          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                            تعداد: {p.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* PRICE */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-5 mt-5 border-t">
                  <span className="font-semibold text-gray-700 text-base sm:text-lg">
                    مبلغ پرداختی:
                  </span>
                  <span className="font-bold text-blue-700 text-xl sm:text-2xl">
                    {formatToman(paymentData.amount)} تومان
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm sm:text-base text-gray-500 bg-gray-100 p-4 rounded-lg border border-gray-200">
                جزئیات سفارش در حال حاضر در دسترس نیست، اما پرداخت شما تایید شده است.
              </div>
            )}

            {/* --- Buttons Section (Print/Download & Return Home) --- */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
              <PrintButton />
              
              <Link
                href="/"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base shadow-sm"
              >
                <FaHome className="w-4 h-4 sm:w-5 sm:h-5" />
بازگشت به صفحه اصلی              </Link>
            </div>
            {/* -------------------------------------------------------- */}

          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Verification error:", error);
    return <FailedPayment />;
  }
}

function FailedPayment() {
  return (
    <div
      className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6 flex items-center justify-center"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center space-y-4 sm:space-y-6">
        <FaTimesCircle className="text-5xl sm:text-6xl text-red-500 mx-auto" />
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600">پرداخت ناموفق بود</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          فرآیند پرداخت تکمیل نشد. اگر مبلغی از حساب شما کسر شده است، معمولاً
          ظرف ۷۲ ساعت توسط بانک بازگردانده می‌شود.
        </p>
        <Link
          href="/"
          className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base shadow-sm"
        >
          <FaHome className="w-4 h-4 sm:w-5 sm:h-5" />
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
