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

  // 1. If parameters are missing, immediately show failed state
  if (!Status || !Authority) {
    return <FailedPayment />;
  }

  try {
    // 2. Verify the payment status
    const verifyRes = await getApiData(
      `/orders/payment/verify/?Status=${Status}&Authority=${Authority}`
    );

    // Look inside verifyRes.data based on your getApiData structure
    const verifyData = verifyRes?.data;
    const isSuccess = verifyData?.status === "success" || verifyData?.status === "already_verified";

    if (!isSuccess) {
      return <FailedPayment />;
    }

    // 3. Fetch the specific Order details
    const detailRes = await getApiData(`/order-payments/?authority=${Authority}`);
    
    // Look inside detailRes.data
    const detailData = detailRes?.data;
    
    // Handle DRF pagination structure (inside .results) or direct array
    const items = detailData?.results || detailData || [];
    const paymentData: OrderPayment | null = Array.isArray(items) && items.length > 0 ? items[0] : null;
    const order = paymentData?.order_detail;

    // 4. Render Success UI
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12" dir="rtl">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 max-w-lg w-full text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            پرداخت با موفقیت انجام شد
          </h2>
          <p className="text-gray-600 mb-8">
            سفارش شما ثبت و پرداخت شد. تیم ما به زودی با شما تماس خواهد گرفت.
          </p>

          {order && paymentData ? (
            <div className="bg-slate-50 rounded-xl p-5 text-right space-y-4 border border-slate-100">
              <h3 className="font-bold text-gray-800 border-b pb-2 mb-3 text-center">
                خلاصه سفارش شما
              </h3>
              
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FaReceipt className="text-blue-500" />
                <span><strong className="text-gray-900">شماره سفارش:</strong> {order.id}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FaUser className="text-blue-500" />
                <span><strong className="text-gray-900">نام:</strong> {order.full_name}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FaMapMarkerAlt className="text-blue-500" />
                <span><strong className="text-gray-900">آدرس:</strong> {order.address}</span>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t">
                <span className="font-semibold text-gray-700">مبلغ پرداختی:</span>
                <span className="font-bold text-blue-700">
                  {Number(paymentData.amount).toLocaleString()} تومان
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded">
              جزئیات سفارش در حال حاضر در دسترس نیست، اما پرداخت شما تایید شده است.
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Verification error:", error);
    return <FailedPayment />;
  }
}

// --- Helper Component for Failed State ---
function FailedPayment() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 max-w-md w-full text-center">
        <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          پرداخت ناموفق بود
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          فرآیند پرداخت تکمیل نشد. اگر مبلغی از حساب شما کسر شده است، معمولاً ظرف ۷۲ ساعت توسط بانک بازگردانده می‌شود.
        </p>
      </div>
    </div>
  );
}
