import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="text-center space-y-8 pb-10" dir="rtl">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          آماده شروع هستید؟
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          همین حالا می‌توانید سفارش خود را ثبت کنید یا برای دریافت مشاوره تخصصی رایگان با کارشناسان ما در تماس باشید.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/products"
          className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200"
        >
          مشاهده محصولات و خرید
        </Link>
        <Link
          href="/contact"
          className="w-full sm:w-auto rounded-xl bg-white border-2 border-gray-200 px-8 py-3.5 text-base font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
        >
          تماس با ما
        </Link>
      </div>
    </section>
  );
}
