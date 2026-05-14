"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShieldAlt, FaRedo } from "react-icons/fa";

import {
  verifyOTP,
  sendOTP,
} from "@/app/services/auth/authService";

const OTP_LENGTH = 4;
const RESEND_TIME = 60;

export default function VerifyOTPForm({
  phone,
}: {
  phone: string;
}) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(RESEND_TIME);

  // ✅ countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ✅ verify otp
  const handleVerify = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    // validate code length
    if (code.length !== OTP_LENGTH) {
      setError(`کد تایید باید ${OTP_LENGTH} رقمی باشد`);
      return;
    }

    try {
      setLoading(true);

      await verifyOTP(phone, code);

      // success
      router.push("/");
    } catch (err: any) {
      console.log(err);

      // ✅ clean backend error
      let message = "کد وارد شده صحیح نمی باشد";
      if (typeof err === "string") {
        message = err;
      } else if (
        err &&
        typeof err.message === "string"
      ) {
        message = err.message;
      } else if (
        typeof err?.response?.data?.message === "string"
      ) {
        message = err.response.data.message;
      }

      // ✅ remove unwanted "false |"
      message = message
        .replace("false |", "")
        .trim();

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ resend otp
  const handleResend = async () => {
    try {
      setError("");

      // ✅ clear old code immediately
      setCode("");

      setResending(true);

      await sendOTP(phone);

      // ✅ restart countdown
      setTimer(RESEND_TIME);
    } catch (err) {
      console.log(err);

      setError("خطا در ارسال مجدد کد");
    } finally {
      setResending(false);
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
      {/* HEADER */}
      <div className="text-center mb-8">
        <div
          className="
            mx-auto
            w-16
            h-16
            rounded-2xl
            bg-blue-50
            flex
            items-center
            justify-center
            mb-4
          "
        >
          <FaShieldAlt className="text-blue-600 w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          تایید شماره موبایل
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-7">
          کد تایید ارسال شده به شماره زیر را وارد کنید
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

      {/* FORM */}
      <form
        onSubmit={handleVerify}
        className="space-y-5"
      >
        {/* OTP INPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            کد تایید
          </label>

          <input
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            placeholder="1 2 3 4"
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(
                /\D/g,
                ""
              );

              setCode(value);

              // ✅ clear old error while typing
              if (error) {
                setError("");
              }
            }}
            className="
              w-full
              h-[56px]
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              text-center
              text-2xl
              tracking-[12px]
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              placeholder:text-gray-400
            "
          />
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* VERIFY BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            h-[56px]
            rounded-xl
            font-semibold
            text-white
            transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loading
            ? "در حال تایید..."
            : "تایید و ورود"}
        </button>

        {/* RESEND */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">
              ارسال مجدد تا {timer} ثانیه دیگر
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className={`
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                transition
                ${
                  resending
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-700"
                }
              `}
            >
              <FaRedo
                className={`
                  w-3
                  h-3
                  ${resending ? "animate-spin" : ""}
                `}
              />

              {resending
                ? "در حال ارسال..."
                : "ارسال مجدد کد"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
