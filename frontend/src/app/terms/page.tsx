import { Scale, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="bg-white relative z-0 min-h-screen py-16 sm:py-24" dir="rtl">
      {/* دکوراسیون پس‌زمینه مشابه صفحه اصلی */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60 pointer-events-none">
        <div className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6] opacity-20 sm:right-[calc(50%-30rem)] sm:w-[72rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Scale className="mx-auto h-16 w-16 text-blue-600 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">شرایط و قوانین استفاده</h1>
          <p className="text-lg text-gray-600">لطفاً پیش از خرید، قوانین فروشگاه ما را مطالعه کنید تا با خیال راحت سفارش خود را ثبت کنید.</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <ShieldCheck className="text-blue-500" /> ثبت سفارش و خرید
            </h2>
            <p className="text-gray-600 leading-relaxed">
              تمامی محصولات قرار گرفته در سایت، موجود و قیمت‌ها به‌روز هستند. پس از ثبت نهایی سفارش و پرداخت موفق، یک پیامک تایید حاوی کد رهگیری برای شما ارسال می‌شود. لطفاً در وارد کردن شماره تماس و آدرس دقت کنید، زیرا ملاک ما برای ارسال، اطلاعات ثبت شده توسط شماست.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <Truck className="text-blue-500" /> ارسال و تحویل
            </h2>
            <p className="text-gray-600 leading-relaxed">
              سفارشات تهران از طریق پیک و سفارشات شهرستان از طریق پست پیشتاز ارسال می‌شوند. زمان تحویل برای تهران معمولاً ۱ تا ۲ روز کاری و برای سایر شهرها بین ۳ تا ۵ روز کاری زمان می‌برد. هزینه ارسال در مرحله پرداخت محاسبه می‌شود.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
              <RefreshCcw className="text-blue-500" /> گارانتی و مرجوعی کالا
            </h2>
            <p className="text-gray-600 leading-relaxed">
              پنل‌های خورشیدی ما دارای گارانتی سلامت فیزیکی در زمان تحویل هستند. اگر محصولی که به دست شما رسید دچار آسیب دیدگی بود یا با سفارش شما مغایرت داشت، تا ۴۸ ساعت فرصت دارید به پشتیبانی اطلاع دهید تا بدون هیچ هزینه‌ای محصول را برایتان تعویض کنیم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
