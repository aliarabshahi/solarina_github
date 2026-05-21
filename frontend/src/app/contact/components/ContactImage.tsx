"use client";
import Image from "next/image";

export default function ContactImage() {
  return (
    // Added lg:pt-16 for desktop top padding
    <div className="w-full h-full flex items-start justify-start lg:pt-16">
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
