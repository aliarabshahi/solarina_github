// components/VerifyOTPForm.tsx

"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  FaShieldAlt,
  FaRedo,
} from "react-icons/fa";

import {
  verifyOTP,
  sendOTP,
} from "@/app/services/auth/authService";

export default function VerifyOTPForm({
  phone,
}: {
  phone: string;
}) {

  const router = useRouter();

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [timer, setTimer] = useState(60);

  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {

      setTimer((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleVerify = async (e: any) => {

    e.preventDefault();

    if (!code.trim()) {

      setError("کد تایید را وارد کنید");

      return;
    }

    try {

      setLoading(true);

      setError("");

      await verifyOTP(phone, code);

      router.push("/");

    } catch (err: any) {

      console.error(err);

      setError(
        err?.message || "کد وارد شده معتبر نیست"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleResend = async () => {

    try {

      setError("");

      const res = await sendOTP(phone);

      if (res.error) {

        setError(res.error);

        const match = res.error.match(/\d+/);

        if (match) {
          setTimer(Number(match[0]));
        }

        return;
      }

      setTimer(60);

    } catch (err) {

      console.error(err);

      setError("خطا در ارسال مجدد کد");

    }
  };

  return (
    <div
      className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-lg
        border
        border-gray-100
        p-8
      "
      dir="rtl"
    >
      <div className="text-center mb-8">

        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <FaShieldAlt className="text-blue-600 w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          تایید شماره موبایل
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-7">
          کد تایید ارسال شده به شماره زیر را وارد کنید.
        </p>

        <div
          className="
            mt-4
            inline-flex
            items-center
            bg-blue-50
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
          "
        >
          {phone}
        </div>

      </div>

      <form
        onSubmit={handleVerify}
        className="space-y-5"
      >
        <div className="space-y-2">

          <label className="text-sm font-medium text-gray-700">
            کد تایید
          </label>

          <input
            type="text"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="
              w-full
              h-[52px]
              rounded-xl
              border
              border-gray-300
              px-4
              text-center
              tracking-[8px]
              text-lg
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

        {error && (
          <div
            className="
              bg-red-50
              border
              border-red-200
              text-red-700
              text-sm
              rounded-xl
              p-3
            "
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            h-[52px]
            rounded-xl
            font-semibold
            transition
            shadow-md
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {loading
            ? "در حال تایید..."
            : "تایید و ورود"}
        </button>

        <div className="text-center pt-2">

          {timer > 0 ? (

            <div className="text-sm text-gray-500">
              ارسال مجدد تا {timer} ثانیه دیگر
            </div>

          ) : (

            <button
              type="button"
              onClick={handleResend}
              className="
                inline-flex
                items-center
                gap-2
                text-blue-600
                hover:text-blue-700
                text-sm
                font-medium
              "
            >
              <FaRedo className="w-3 h-3" />
              ارسال مجدد کد
            </button>

          )}

        </div>

      </form>
    </div>
  );
}
