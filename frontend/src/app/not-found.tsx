import Image from "next/image";
import Link from "next/link";

/** Custom 404 page with Persian UI and gradient background styling */
export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-[#fdeaf4] overflow-hidden">
      {/* Background visuals */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f477b815] via-[#f477b810] to-transparent" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-16 right-10 w-64 h-64 bg-[#F477B8] rounded-full mix-blend-multiply filter blur-3xl opacity-25" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#1F9ECE] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration */}
        <div className="w-full max-w-md mx-auto mb-8">
          <Image
            src="/images/not_found.svg"
            alt="تصویر صفحه پیدا نشد"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Main content */}
        <h1 className="text-5xl font-bold text-gray-700 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          گم شدی دوست من؟
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          به نظر میاد صفحه‌ای که دنبالشی یا وجود نداره یا یه جای دیگه رفته!
          <br />
          نگران نباش، می‌تونیم کمکت کنیم که برگردی به مسیر درست.
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="bg-solarina hover:bg-solarina-dark text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
          >
            صفحه اصلی
          </Link>
          <Link
            href="/contact"
            className="bg-white border border-solarina text-solarina font-medium py-3 px-6 rounded-lg transition-colors hover:bg-solarina/5"
          >
            تماس با پشتیبانی
          </Link>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-sm text-gray-500">
          <p>اگه فکر می‌کنی اینجا باید صفحه‌ای باشه، بهمون خبر بده!</p>
        </div>
      </div>
    </div>
  );
}
