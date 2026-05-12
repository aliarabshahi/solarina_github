import { getApiData } from "@/app/services/receive_data/apiServerFetch";
import jalaali from "jalaali-js";
import {
  FaSearch,
  FaBoxOpen,
  FaClipboardCheck,
  FaRegClock,
  FaTimesCircle,
  FaCheckCircle,
  FaSpinner,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaUserCircle,
} from "react-icons/fa";

// --- Types (Updated) ---
interface OrderItem {
  id: number;
  product_name: string; // Assumes your API sends this field
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  tracking_code: string;
  full_name: string;
  phone_number: string;
  address: string;
  status: "pending" | "paid" | "failed";
  created_at: string;
  total_price: number;
  order_items: OrderItem[]; // Assumes your API sends this nested array
}

interface PageProps {
  searchParams: {
    code?: string;
  };
}
// -----------------------

export default async function OrderTrackPage({ searchParams }: PageProps) {
  const trackingCode = searchParams.code?.trim();
  let order: Order | null = null;
  let error: string | null = null;
  let notFound = false;

  if (trackingCode) {
    try {
      const response = await getApiData(`/orders/?tracking_code=${trackingCode}`);
      const items = response?.data?.results || response?.data || [];
      
      if (Array.isArray(items) && items.length > 0) {
        order = items[0];
      } else {
        notFound = true;
      }
    } catch (err: any) {
       console.error("API Fetch Error:", err);
       error = "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">پیگیری سفارش</h1>
          <p className="text-gray-500 mt-2">
            کد رهگیری خود را برای مشاهده وضعیت سفارش وارد کنید.
          </p>
        </header>

        <SearchForm initialCode={trackingCode} />

        <div className="mt-8">
          {trackingCode && !order && !error && !notFound && <LoadingState />}
          {order && <OrderResult order={order} />}
          {notFound && <NotFoundMessage />}
          {error && <ErrorMessage message={error} />}
          {!trackingCode && <InitialPrompt />}
        </div>
      </div>
    </div>
  );
}

// --- UI Components ---

function SearchForm({ initialCode }: { initialCode?: string }) {
  return (
    <form action="/order/track" method="GET" className="bg-white p-4 rounded-xl shadow-md border border-blue-500/15 flex items-center gap-3">
      <input
        type="text"
        name="code"
        defaultValue={initialCode || ""}
        placeholder="کد رهگیری خود را وارد کنید"
        required
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
      />
      <button
        type="submit"
        aria-label="جستجو"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-3 transition-all flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </form>
  );
}

function OrderResult({ order }: { order: Order }) {
  const date = new Date(order.created_at);
  const { jy, jm, jd } = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const orderDate = `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">جزئیات سفارش</h2>
          <p className="text-sm text-gray-500 mt-1">
            کد رهگیری:{" "}
            <span className="font-mono text-blue-600 font-semibold">{order.tracking_code}</span>
          </p>
        </div>
        <div className="text-sm text-gray-600 mt-3 sm:mt-0">
          تاریخ ثبت: {orderDate}
        </div>
      </div>

      {/* 1. Status Timeline (Moved up) */}
      <StatusTimeline status={order.status} />
      
      {/* 2. Product List (New) */}
      <ProductList items={order.order_items} />

      {/* 3. Customer Details (Moved down) */}
      <div className="border-t pt-6 space-y-4 text-sm text-gray-700">
        <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
            <FaUserCircle className="text-blue-500" />
            اطلاعات تحویل
        </h3>
        <div className="flex items-center gap-3 pl-2">
          <FaUser className="text-gray-400 w-4 h-4" />
          <span><strong>تحویل گیرنده:</strong> {order.full_name}</span>
        </div>
        <div className="flex items-center gap-3 pl-2">
          <FaPhone className="text-gray-400 w-4 h-4" />
          <span><strong>شماره موبایل:</strong> {order.phone_number}</span>
        </div>
        <div className="flex items-start gap-3 pl-2">
          <FaMapMarkerAlt className="text-gray-400 w-4 h-4 mt-1" />
          <span className="flex flex-col">
            <strong>آدرس:</strong>
            <span className="text-gray-600 leading-relaxed">{order.address}</span>
          </span>
        </div>
      </div>

      {/* 4. Total Price Footer */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">مبلغ کل سفارش:</span>
          <span className="font-bold text-blue-700 text-lg">
            {Number(order.total_price).toLocaleString()} تومان
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusTimeline({ status }: { status: Order["status"] }) {
  const isPaid = status === "paid";
  const isPending = status === "pending";
  const isFailed = status === "failed";

  const baseCircleClass = "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm";
  const baseLineClass = "flex-1 h-0.5";

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-5 text-center">وضعیت فعلی</h3>
      <div className="flex items-center w-full">
        <div className="flex flex-col items-center">
          <div className={`${baseCircleClass} bg-green-500`}><FaClipboardCheck /></div>
          <span className="text-xs text-center mt-2 font-medium text-gray-600">ثبت سفارش</span>
        </div>
        <div className={`${baseLineClass} ${isPaid ? "bg-green-500" : "bg-gray-300"}`}></div>
        <div className="flex flex-col items-center">
          <div className={`${baseCircleClass} ${isPaid ? "bg-green-500" : isFailed ? "bg-red-500" : "bg-gray-400"}`}>
            {isPaid && <FaCheckCircle />}
            {isPending && <FaRegClock />}
            {isFailed && <FaTimesCircle />}
          </div>
          <span className={`text-xs text-center mt-2 font-medium ${isPaid ? "text-gray-600" : "text-gray-500"}`}>
            {isPaid ? "پرداخت موفق" : isFailed ? "پرداخت ناموفق" : "در انتظار پرداخت"}
          </span>
        </div>
        <div className={`${baseLineClass} ${isPaid ? "bg-green-500" : "bg-gray-300"}`}></div>
        <div className="flex flex-col items-center">
          <div className={`${baseCircleClass} ${isPaid ? "bg-green-500" : "bg-gray-400"}`}><FaBoxOpen /></div>
          <span className={`text-xs text-center mt-2 font-medium ${isPaid ? "text-gray-600" : "text-gray-500"}`}>آماده‌سازی</span>
        </div>
      </div>
      {isPending && (
        <div className="mt-6 text-center text-sm bg-yellow-50 text-yellow-700 border border-yellow-200 p-3 rounded-lg">
          سفارش شما ثبت شده و در انتظار پرداخت است.
        </div>
      )}
      {isFailed && (
        <div className="mt-6 text-center text-sm bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg">
          متاسفانه پرداخت این سفارش ناموفق بوده است.
        </div>
      )}
    </div>
  );
}

function ProductList({ items }: { items: OrderItem[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
        <FaShoppingBag className="text-blue-500" />
        محصولات سفارش
      </h3>
      <ul className="space-y-3 text-sm text-gray-700">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <p className="font-semibold text-gray-800">{item.product_name}</p>
              <p className="text-xs text-gray-500">تعداد: {item.quantity}</p>
            </div>
            <div className="font-mono text-gray-600 font-semibold">
              {Number(item.price * item.quantity).toLocaleString()} تومان
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InitialPrompt() {
  return (
    <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <FaBoxOpen className="mx-auto text-5xl text-blue-300 mb-4" />
      <p className="text-gray-600">برای مشاهده جزئیات، کد رهگیری سفارش خود را وارد کنید.</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center">
      <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
      <p className="text-gray-600">در حال جستجوی سفارش...</p>
    </div>
  );
}

function NotFoundMessage() {
  return (
    <div className="text-center bg-white p-8 rounded-xl shadow-md border border-yellow-200 animate-fade-in">
      <FaTimesCircle className="mx-auto text-5xl text-yellow-500 mb-4" />
      <h3 className="text-lg font-semibold text-yellow-700">سفارش یافت نشد</h3>
      <p className="text-gray-600 mt-2 text-sm">
        کد رهگیری وارد شده معتبر نیست. لطفاً آن را بررسی کرده و دوباره تلاش کنید.
      </p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center bg-red-50 p-8 rounded-xl shadow-md border border-red-200 animate-fade-in">
      <FaTimesCircle className="mx-auto text-5xl text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-700">خطا در ارتباط</h3>
      <p className="text-gray-600 mt-2 text-sm">{message}</p>
    </div>
  );
}
