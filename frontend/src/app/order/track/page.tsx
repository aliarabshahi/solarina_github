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
  FaReceipt,
} from "react-icons/fa";

interface ProductItem {
  product_id: number;
  product_name: string;
  quantity: number;
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
  total_price: number;
  products: ProductItem[];
}

interface PageProps {
  searchParams: {
    code?: string;
  };
}

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
      console.error(err);
      error = "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.";
    }
  }

  return (
    <div className="min-h-screen  py-10 sm:py-16 px-6" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8">
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
        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none h-[48px] bg-white text-gray-900"
      />

      <button
        type="submit"
        aria-label="جستجو"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 h-[48px] transition flex items-center justify-center shadow-md"
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b pb-4">
        <h2 className="text-lg font-bold text-gray-800">جزئیات سفارش</h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md">
          تاریخ ثبت: {orderDate}
        </div>
      </div>

      <StatusTimeline status={order.status} />

      <div className="border-t pt-6 space-y-5 text-sm sm:text-base text-gray-700">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FaUserCircle className="text-blue-500 w-5 h-5" />
          اطلاعات تحویل گیرنده
        </h3>

        {/* --- هر فیلد در یک خط کامل --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaReceipt className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>
              <strong className="text-gray-900">کد رهگیری:</strong>{" "}
              <span className="font-mono text-blue-600 font-semibold">
                {order.tracking_code}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>
              <strong className="text-gray-900">نام و نام خانوادگی:</strong> {order.full_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>
              <strong className="text-gray-900">شماره موبایل:</strong>{" "}
              {order.phone_number}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1" />
            <span className="flex flex-col">
              <strong className="text-gray-900">آدرس:</strong>
              <span className="text-gray-600 leading-relaxed mt-1">
                {order.address}
              </span>
            </span>
          </div>
        </div>
      </div>

      <ProductList items={order.products} />

      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-semibold text-gray-700 text-base sm:text-lg">
            مبلغ کل سفارش:
          </span>
          <span className="font-bold text-blue-700 text-xl sm:text-2xl">
            {formatToman(order.total_price)} تومان
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

  const circle =
    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0 z-10";
  const line = "flex-1 h-1 mt-4 mx-1 sm:mx-2 rounded";

  return (
    <div className="py-2">
      <h3 className="font-semibold text-gray-700 mb-6 text-center text-sm sm:text-base">
        وضعیت فعلی سفارش
      </h3>

      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col items-center w-20 shrink-0">
          <div className={`${circle} bg-green-400`}>
            <FaClipboardCheck />
          </div>
          <span className="text-xs sm:text-sm mt-2 text-gray-600 text-center">ثبت سفارش</span>
        </div>

        <div className={`${line} ${isPaid ? "bg-green-400" : "bg-gray-200"}`} />

        <div className="flex flex-col items-center w-24 shrink-0">
          <div
            className={`${circle} ${
              isPaid ? "bg-green-400" : isFailed ? "bg-red-500" : "bg-gray-400"
            }`}
          >
            {isPaid && <FaCheckCircle />}
            {isPending && <FaRegClock />}
            {isFailed && <FaTimesCircle />}
          </div>

          <span className="text-xs sm:text-sm mt-2 text-gray-600 text-center">
            {isPaid
              ? "پرداخت موفق"
              : isFailed
              ? "پرداخت ناموفق"
              : "در انتظار پرداخت"}
          </span>
        </div>

        <div className={`${line} ${isPaid ? "bg-green-400" : "bg-gray-200"}`} />

        <div className="flex flex-col items-center w-20 shrink-0">
          <div className={`${circle} ${isPaid ? "bg-green-400" : "bg-gray-400"}`}>
            <FaBoxOpen />
          </div>
          <span className="text-xs sm:text-sm mt-2 text-gray-600 text-center">آماده‌سازی</span>
        </div>
      </div>
    </div>
  );
}

function ProductList({ items }: { items: ProductItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaShoppingBag className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
        محصولات سفارش
      </h3>

      <div className="space-y-3 text-sm sm:text-base">
        {items.map((item) => (
          <div
            key={item.product_id}
            className="flex flex-col sm:flex-row justify-between items-center bg-white border border-slate-200 rounded-lg p-3 sm:p-4 gap-4 text-center sm:text-right"
          >
            <span className="font-medium text-gray-700 w-full sm:w-auto">
              {item.product_name}
            </span>

            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 w-full sm:w-auto">
              <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                قیمت واحد: {formatToman(item.unit_price)} تومان
              </span>

              <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                تعداد: {item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InitialPrompt() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center">
      <FaBoxOpen className="mx-auto text-5xl text-blue-300 mb-4" />
      <p className="text-sm sm:text-base text-gray-600">
        برای مشاهده جزئیات، کد رهگیری سفارش خود را وارد کنید.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center">
      <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
      <p className="text-sm sm:text-base text-gray-600">در حال جستجوی سفارش...</p>
    </div>
  );
}

function NotFoundMessage() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-yellow-200 text-center">
      <FaTimesCircle className="mx-auto text-5xl text-yellow-500 mb-4" />
      <h3 className="font-semibold text-yellow-700 text-lg">سفارش یافت نشد</h3>
      <p className="text-sm sm:text-base text-gray-600 mt-2">
        کد رهگیری وارد شده معتبر نیست.
      </p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-red-200 text-center">
      <FaTimesCircle className="mx-auto text-5xl text-red-500 mb-4" />
      <h3 className="font-semibold text-red-700 text-lg">خطا در ارتباط</h3>
      <p className="text-sm sm:text-base text-gray-600 mt-2">{message}</p>
    </div>
  );
}
