"use client";
import Image from "next/image";

export default function ContactImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        src="/images/forms/contact-us.svg"
        alt="تماس با تیم پنل خورشیدی"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
