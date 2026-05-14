"use client";

import { useEffect, useState } from "react";

import OrderForm from "./components/OrderForm";
import OrderImage from "./components/OrderImage";
import OrderAuth from "./components/OrderAuth";

import { isLoggedIn } from "@/app/services/auth/authStorage";

function OrderFormSkeleton() {
  return (
    <div className="w-full h-[500px] bg-blue-100/30 rounded-xl animate-pulse mb-6" />
  );
}

export default function OrderPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isLoggedIn());
      setLoading(false);
    };

    checkAuth();

    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-slate-50 py-8 sm:py-10 px-6 sm:px-10 lg:px-20"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Image */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-0 self-start">
            <OrderImage />
          </div>

          {/* Form/Auth */}
          <div className="w-full lg:w-1/2">
            {loading ? (
              <OrderFormSkeleton />
            ) : authenticated ? (
              <OrderForm />
            ) : (
              <OrderAuth onSuccess={() => setAuthenticated(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
