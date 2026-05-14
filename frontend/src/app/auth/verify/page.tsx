// verify/page.tsx

"use client";

import { useSearchParams } from "next/navigation";

import AuthBanner from "../components/AuthBanner";

import VerifyOTPForm from "../components/VerifyOTPForm";

export default function VerifyPage() {

  const params = useSearchParams();

  const phone = params.get("phone");

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        flex
      "
    >
      <AuthBanner />

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          px-6
          py-10
        "
      >
        <VerifyOTPForm phone={phone || ""} />
      </div>
    </div>
  );
}
