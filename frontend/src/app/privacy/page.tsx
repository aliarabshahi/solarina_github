import { Shield, Lock, EyeOff } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-white relative z-0 min-h-screen py-16 sm:py-24" dir="rtl">
      {/* دکوراسیون پس‌زمینه */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60 pointer-events-none">
        <div className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#93c5fd] to-[#3b82f6] opacity-20 sm:right-[calc(50%-30rem)] sm:w-[72rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <Shield className="mx-auto h-16 w-16 text-blue-600 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">حریم خصوصی شما</h1>
          <p className="text-lg text-gray-600">اطلاعات شما نزد ما امانت است؛ با خیال راحت خرید کنید.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg shadow-blue-900/5 space-y-8">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
              <EyeOff className="text-blue-500 w-6 h-6" /> چه اطلاعاتی جمع‌آوری می‌کنیم؟
            </h3>
            <p className="text-gray-600 leading-relaxed">
              برای ثبت سفارش و ارسال محصولات، ما تنها اطلاعات ضروری مانند نام و نام خانوادگی، شماره تماس، و آدرس پستی شما را دریافت می‌کنیم. این اطلاعات صرفاً برای پردازش سفارش شما استفاده می‌شود.
            </p>
          </div>

          <div className="h-px bg-gray-100 w-full"></div>

          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
              <Lock className="text-blue-500 w-6 h-6" /> امنیت اطلاعات شما
            </h3>
            <p className="text-gray-600 leading-relaxed">
              ما به هیچ وجه اطلاعات شخصی شما را در اختیار شخص ثالث، شرکت‌های تبلیغاتی یا بازاریابی قرار نمی‌دهیم. همچنین تمامی تراکنش‌های مالی شما در درگاه‌های امن بانکی (شاپرک) انجام می‌شود و ما هیچ‌گونه دسترسی به اطلاعات کارت بانکی شما نداریم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
