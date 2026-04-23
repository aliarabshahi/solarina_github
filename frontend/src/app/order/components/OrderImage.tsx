"use client";
import Image from "next/image";

export default function OrderImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/forms/project-order.svg"
        alt="ثبت سفارش پنل خورشیدی"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
