// components/AuthBanner.tsx

import { FaShieldAlt, FaSms, FaUserCheck } from "react-icons/fa";

export default function AuthBanner() {
  return (
    <div
      className="
        hidden lg:flex
        w-1/2
        bg-gradient-to-br
        from-blue-600
        to-blue-800
        text-white
        p-16 lg:p-24 xl:p-32
        flex-col
        justify-center
        items-center
        relative
        overflow-hidden
      "
      dir="rtl"
    >
      <div className="relative z-10 w-full max-w-md space-y-8">

        <div>
          <h1 className="text-3xl font-bold leading-relaxed">
            ورود سریع و امن
          </h1>

          <p className="mt-4 text-blue-100 leading-7 text-xs">
            با شماره موبایل وارد حساب کاربری خود شوید و سفارش‌ها،
            پرداخت‌ها و اطلاعات خرید خود را سریع‌تر مدیریت کنید.
          </p>
        </div>

        <div className="space-y-5">

          <div className="flex items-start gap-4">
            <div className="bg-white/15 p-2.5 rounded-xl flex-shrink-0">
              <FaSms className="w-4 h-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                ورود با کد تایید
              </h3>

              <p className="text-xs text-blue-100 mt-1">
                بدون نیاز به رمز عبور وارد حساب خود شوید.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white/15 p-2.5 rounded-xl flex-shrink-0">
              <FaShieldAlt className="w-4 h-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                امنیت بالا
              </h3>

              <p className="text-xs text-blue-100 mt-1">
                کد تایید فقط برای شماره موبایل شما ارسال می‌شود.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white/15 p-2.5 rounded-xl flex-shrink-0">
              <FaUserCheck className="w-4 h-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                دسترسی سریع
              </h3>

              <p className="text-xs text-blue-100 mt-1">
                پیگیری سفارش‌ها و خرید سریع‌تر بعد از ورود.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full" />
      <div className="absolute top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
    </div>
  );
}
