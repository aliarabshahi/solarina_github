"use client";

import { useEffect, useState } from "react";
import {
  FaPhone,
  FaShieldAlt,
  FaRedo,
  FaArrowRight,
} from "react-icons/fa";

import {
  sendOTP,
  verifyOTP,
} from "@/app/services/auth/authService";

const OTP_LENGTH = 4;
const RESEND_TIME = 60;

type Props = {
  onSuccess: () => void;
};

export default function OrderAuth({
  onSuccess,
}: Props) {
  const [step, setStep] = useState<
    "phone" | "otp"
  >("phone");

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] =
    useState(false);

  const [error, setError] = useState("");

  const [timer, setTimer] =
    useState(RESEND_TIME);

  // ✅ countdown timer
  useEffect(() => {
    if (step !== "otp") return;

    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  // ✅ send otp
  const handleSendOTP = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    const cleanedPhone = phone
      .replace(/\s/g, "")
      .trim();

    // ✅ basic validation
    if (!cleanedPhone) {
      setError("شماره موبایل را وارد کنید");
      return;
    }

    if (
      !/^09\d{9}$/.test(cleanedPhone)
    ) {
      setError(
        "شماره موبایل معتبر وارد کنید"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await sendOTP(
        cleanedPhone
      );

      if (res.error) {
        let message = res.error;

        message = message
          .replace("false |", "")
          .trim();

        setError(message);
        return;
      }

      // ✅ clean number
      setPhone(cleanedPhone);

      // ✅ reset old otp
      setCode("");

      // ✅ reset timer
      setTimer(RESEND_TIME);

      // ✅ next step
      setStep("otp");
    } catch (err: any) {
      console.log(err);

      setError("خطا در ارسال کد تایید");
    } finally {
      setLoading(false);
    }
  };

  // ✅ verify otp
  const handleVerify = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    // ✅ validate otp
    if (code.length !== OTP_LENGTH) {
      setError(
        `کد تایید باید ${OTP_LENGTH} رقمی باشد`
      );

      return;
    }

    try {
      setLoading(true);

      await verifyOTP(phone, code);

      // ✅ authenticated
      onSuccess();
    } catch (err: any) {
      console.log(err);

      let message =
        "کد وارد شده صحیح نمی باشد";

      if (typeof err === "string") {
        message = err;
      } else if (
        err &&
        typeof err.message === "string"
      ) {
        message = err.message;
      } else if (
        typeof err?.response?.data
          ?.message === "string"
      ) {
        message =
          err.response.data.message;
      }

      // ✅ cleanup weird backend text
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

      // ✅ clear old code
      setCode("");

      setResending(true);

      await sendOTP(phone);

      // ✅ restart timer
      setTimer(RESEND_TIME);
    } catch (err) {
      console.log(err);

      setError(
        "خطا در ارسال مجدد کد"
      );
    } finally {
      setResending(false);
    }
  };

  // ✅ back to phone step
  const handleBack = () => {
    setStep("phone");

    setCode("");

    setError("");

    setTimer(RESEND_TIME);
  };

  return (
    <div
      className="
        w-full
        max-w-md
        mx-auto
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
          {step === "phone" ? (
            <FaPhone className="text-blue-600 w-6 h-6" />
          ) : (
            <FaShieldAlt className="text-blue-600 w-6 h-6" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          ورود برای ثبت سفارش
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-7">
          {step === "phone"
            ? "برای ادامه شماره موبایل خود را وارد کنید"
            : "کد تایید ارسال شده را وارد کنید"}
        </p>

        {step === "otp" && (
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
        )}
      </div>

      {/* PHONE STEP */}
      {step === "phone" && (
        <form
          onSubmit={handleSendOTP}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              شماره موبایل
            </label>

            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="09123456789"
              value={phone}
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                setPhone(value);

                // ✅ clear error while typing
                if (error) {
                  setError("");
                }
              }}
              dir="ltr"
              className="
                w-full
                h-[56px]
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                text-center
                text-lg
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

          {/* SEND BUTTON */}
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
              ? "در حال ارسال..."
              : "ارسال کد تایید"}
          </button>
        </form>
      )}

      {/* OTP STEP */}
      {step === "otp" && (
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
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                setCode(value);

                // ✅ clear error while typing
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
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >
            {loading
              ? "در حال تایید..."
              : "تایید و ادامه"}
          </button>

          {/* RESEND */}
          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                ارسال مجدد تا {timer} ثانیه
                دیگر
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
                    ${
                      resending
                        ? "animate-spin"
                        : ""
                    }
                  `}
                />

                {resending
                  ? "در حال ارسال..."
                  : "ارسال مجدد کد"}
              </button>
            )}
          </div>

          {/* CHANGE PHONE */}
          <button
            type="button"
            onClick={handleBack}
            className="
              w-full
              inline-flex
              items-center
              justify-center
              gap-2
              text-sm
              text-gray-500
              hover:text-gray-700
              transition
            "
          >
            <FaArrowRight className="w-3 h-3" />
            تغییر شماره موبایل
          </button>
        </form>
      )}
    </div>
  );
}
