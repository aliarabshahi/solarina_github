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

// --- Types ---
interface ProductItem {
  product_id: number;
  product_name: string;
  quantity: number;
  // ✅ ADDED: unit_price to the ProductItem interface
  unit_price: number;
}

interface Order {
  id: number;
  tracking_code: string;
  full_name: string;
  phone_number: string;
  address: string;
  status: "pending" | "paid" | "failed";
  created_at: string;
  total_price: number; // rial
  products: ProductItem[];
}

interface PageProps {
  searchParams: {
    code?: string;
  };
}
// -----------------------

// Helper function for formatting Toman (moved outside components for reusability)
const formatToman = (r: number | string) => (Number(r) / 10).toLocaleString();

export default async function OrderTrackPage({ searchParams }: PageProps) {
  const trackingCode = searchParams.code?.trim();
  let order: Order | null = null;
  let error: string | null = null;
  let notFound = false;

  if (trackingCode) {
    try {
      const response = await getApiData(
        `/orders/?tracking_code=${trackingCode}`
      );
      const items = response?.data?.results || response?.data || [];

      if (Array.isArray(items) && items.length > 0) {
        order = items[0];
      } else {
        notFound = true;
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      error = "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-6" dir="rtl">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
            پیگیری سفارش
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            کد رهگیری خود را برای مشاهده وضعیت سفارش وارد کنید.
          </p>
        </header>

        <SearchForm initialCode={trackingCode} />

        <div>
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

// ---------------- UI COMPONENTS ----------------

function SearchForm({ initialCode }: { initialCode?: string }) {
  return (
    <form
      action="/order/track"
      method="GET"
      className="bg-white p-4 sm:p-5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
    >
      <input
        type="text"
        name="code"
        defaultValue={initialCode || ""}
        placeholder="کد رهگیری خود را وارد کنید"
        required
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        aria-label="جستجو"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-3 transition flex items-center justify-center shadow-md"
      >
        <FaSearch />
      </button>
    </form>
  );
}

function OrderResult({ order }: { order: Order }) {
  const date = new Date(order.created_at);
  const { jy, jm, jd } = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const orderDate = `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(
    2,
    "0"
  )}`;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 border-b pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">جزئیات سفارش</h2>
          <p className="text-sm text-gray-500 mt-1">
            کد رهگیری:{" "}
            <span className="font-mono text-blue-600 font-semibold">
              {order.tracking_code}
            </span>
          </p>
        </div>
        <div className="text-sm text-gray-500">تاریخ ثبت: {orderDate}</div>
      </div>

      <StatusTimeline status={order.status} />

      {/* Customer Info */}
      <div className="border-t pt-6 space-y-4 text-sm text-gray-700">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <FaUserCircle className="text-blue-500 w-5 h-5" />
          اطلاعات تحویل گیرنده:{" "}
        </h3>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 flex items-center justify-center">
            <FaUser className="text-gray-400 w-4 h-4" />
          </span>
          <span>
            <strong>نام:</strong> {order.full_name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 flex items-center justify-center">
            <FaPhone className="text-gray-400 w-4 h-4" />
          </span>
          <span>
            <strong>شماره موبایل:</strong> {order.phone_number}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="w-5 h-5 flex items-center justify-center mt-1">
            <FaMapMarkerAlt className="text-gray-400 w-4 h-4" />
          </span>
          <span className="leading-relaxed">
            <strong>آدرس:</strong> {order.address}
          </span>
        </div>
      </div>

      {/* Product List */}
      <ProductList items={order.products} />

      {/* Total Price */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">مبلغ کل سفارش:</span>
          <span className="font-bold text-blue-700 text-lg">
            {formatToman(order.total_price)} تومان
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- STATUS TIMELINE ----------------

function StatusTimeline({ status }: { status: Order["status"] }) {
  const isPaid = status === "paid";
  const isPending = status === "pending";
  const isFailed = status === "failed";
  const circle =
    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm";
  const line = "flex-1 h-0.5";

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-5 text-center text-sm">
        وضعیت فعلی سفارش
      </h3>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className={`${circle} bg-green-500`}>
            <FaClipboardCheck />
          </div>
          <span className="text-xs mt-2 text-gray-600">ثبت سفارش</span>
        </div>
        <div className={`${line} ${isPaid ? "bg-green-500" : "bg-gray-300"}`} />
        <div className="flex flex-col items-center">
          <div
            className={`${circle} ${
              isPaid ? "bg-green-500" : isFailed ? "bg-red-500" : "bg-gray-400"
            }`}
          >
            {isPaid && <FaCheckCircle />}
            {isPending && <FaRegClock />}
            {isFailed && <FaTimesCircle />}
          </div>
          <span className="text-xs mt-2 text-gray-600">
            {isPaid
              ? "پرداخت موفق"
              : isFailed
              ? "پرداخت ناموفق"
              : "در انتظار پرداخت"}
          </span>
        </div>
        <div className={`${line} ${isPaid ? "bg-green-500" : "bg-gray-300"}`} />
        <div className="flex flex-col items-center">
          <div
            className={`${circle} ${isPaid ? "bg-green-500" : "bg-gray-400"}`}
          >
            <FaBoxOpen />
          </div>
          <span className="text-xs mt-2 text-gray-600">آماده‌سازی</span>
        </div>
      </div>
    </div>
  );
}

// ---------------- PRODUCT LIST ----------------

function ProductList({ items }: { items: ProductItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
        <FaShoppingBag className="text-blue-500 w-5 h-5" />
        محصولات سفارش
      </h3>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li
            key={item.product_id}
            className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200"
          >
            <span className="font-medium text-gray-800 whitespace-nowrap">
              {item.product_name}
            </span>
            {/* ✅ ADDED: Unit Price badge with green styling */}
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
              قیمت واحد: {formatToman(item.unit_price)} تومان
            </span>
            {/* Quantity badge remains */}
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
              تعداد: {item.quantity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- STATE COMPONENTS ----------------

function InitialPrompt() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center">
      <FaBoxOpen className="mx-auto text-5xl text-blue-300 mb-4" />
      <p className="text-sm text-gray-600">
        برای مشاهده جزئیات، کد رهگیری سفارش خود را وارد کنید.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center">
      <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
      <p className="text-sm text-gray-600">در حال جستجوی سفارش...</p>
    </div>
  );
}

function NotFoundMessage() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-yellow-200 text-center">
      <FaTimesCircle className="mx-auto text-5xl text-yellow-500 mb-4" />
      <h3 className="font-semibold text-yellow-700">سفارش یافت نشد</h3>
      <p className="text-sm text-gray-600 mt-2">
        کد رهگیری وارد شده معتبر نیست.
      </p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-red-200 text-center">
      <FaTimesCircle className="mx-auto text-5xl text-red-500 mb-4" />
      <h3 className="font-semibold text-red-700">خطا در ارتباط</h3>
      <p className="text-sm text-gray-600 mt-2">{message}</p>
    </div>
  );
}
