import { FaCheckCircle, FaTimesCircle, FaUser, FaMapMarkerAlt, FaReceipt } from "react-icons/fa";
import { getApiData } from "@/app/services/receive_data/apiServerFetch";

// --- Types ---
interface OrderDetail {
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  total_price: number | string;
}

interface OrderPayment {
  id: number;
  authority: string;
  amount: number | string;
  status: string;
  order_detail: OrderDetail;
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

    const detailRes = await getApiData(`/order-payments/?authority=${Authority}`);

    const detailData = detailRes?.data;
    const items = detailData?.results || detailData || [];
    const paymentData: OrderPayment | null =
      Array.isArray(items) && items.length > 0 ? items[0] : null;
    const order = paymentData?.order_detail;

    return (
      <div
        className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6"
        dir="rtl"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center space-y-6">

            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-6xl text-green-500 mb-3" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                پرداخت با موفقیت انجام شد
              </h2>
              <p className="text-gray-500 text-sm max-w-md">
                سفارش شما ثبت و پرداخت شد. تیم ما به زودی با شما تماس خواهد گرفت.
              </p>
            </div>

            {order && paymentData ? (
              <div className="bg-slate-50 rounded-lg p-5 text-right space-y-4 border border-slate-200">

                <h3 className="font-semibold text-gray-800 text-base border-b pb-3 mb-2 text-center">
                  خلاصه سفارش شما
                </h3>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <FaReceipt className="text-blue-500 w-4 h-4" />
                  <span>
                    <strong className="text-gray-900">شماره سفارش:</strong>{" "}
                    {order.id}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <FaUser className="text-blue-500 w-4 h-4" />
                  <span>
                    <strong className="text-gray-900">نام:</strong>{" "}
                    {order.full_name}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500 w-4 h-4 mt-1" />
                  <span className="flex flex-col">
                    <strong className="text-gray-900">آدرس:</strong>
                    <span className="text-gray-600 leading-relaxed">
                      {order.address}
                    </span>
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 mt-4 border-t">
                  <span className="font-semibold text-gray-700">
                    مبلغ پرداختی:
                  </span>
                  <span className="font-bold text-blue-700 text-lg">
                    {Number(paymentData.amount).toLocaleString()} تومان
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg border border-gray-200">
                جزئیات سفارش در حال حاضر در دسترس نیست، اما پرداخت شما تایید شده است.
              </div>
            )}
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
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center space-y-4">
        <FaTimesCircle className="text-6xl text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-red-600">
          پرداخت ناموفق بود
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          فرآیند پرداخت تکمیل نشد. اگر مبلغی از حساب شما کسر شده است، معمولاً ظرف ۷۲ ساعت توسط بانک بازگردانده می‌شود.
        </p>
      </div>
    </div>
  );
}
