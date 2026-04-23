"use client";
import Image from "next/image";

/** Contact page illustration (alt text in Persian for UI consistency) */
export default function ContactImage() {
  return (
    <div className="w-full h-full flex items-start justify-start">
      <Image
        // src="/images/forms/contact-us.svg"
        src="/images/forms/contact-us.svg"

        alt="تماس با تیم متخصص مهندسی داده و هوش مصنوعی هوبوک"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
