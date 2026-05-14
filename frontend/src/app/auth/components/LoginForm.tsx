// components/LoginForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FaPhoneAlt } from "react-icons/fa";

import { sendOTP } from "@/app/services/auth/authService";

export default function LoginForm() {

  const router = useRouter();

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!phone.trim()) {

      setError("شماره موبایل را وارد کنید");

      return;
    }

    try {

      setLoading(true);

      setError("");

      const res = await sendOTP(phone);

      if (res.error) {

        setError(res.error);

        return;
      }

      router.push(`/auth/verify?phone=${phone}`);

    } catch (err) {

      console.error(err);

      setError("خطا در ارسال کد تایید");

    } finally {

      setLoading(false);

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
          <FaPhoneAlt className="text-blue-600 w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          ورود به حساب کاربری
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-7">
          شماره موبایل خود را وارد کنید تا کد تایید برای شما ارسال شود.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="space-y-2">

          <label className="text-sm font-medium text-gray-700">
            شماره موبایل
          </label>

          <input
            type="text"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="
              w-full
              h-[52px]
              rounded-xl
              border
              border-gray-300
              px-4
              text-sm
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
            ? "در حال ارسال..."
            : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}
