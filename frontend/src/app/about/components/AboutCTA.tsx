import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="text-center space-y-6 py-10" dir="rtl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        آماده شروع هستید؟
      </h2>
      <p className="text-gray-600 text-base max-w-xl mx-auto">
        همین حالا سفارش خود را ثبت کنید یا برای مشاوره رایگان با ما تماس بگیرید.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/#order"
          className="rounded-md bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-sm 
                     hover:bg-orange-600 transition-all"
        >
          ثبت سفارش
        </Link>
        <Link
          href="/contact"
          className="rounded-md bg-white border-2 border-orange-500 px-6 py-3 text-base font-semibold 
                     text-orange-500 hover:bg-orange-50 transition-all"
        >
          تماس با ما
        </Link>
      </div>
    </section>
  );
}

