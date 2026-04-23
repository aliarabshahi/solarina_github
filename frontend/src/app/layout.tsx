import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import localFont from "next/font/local";
import Alert from "./components/alert/Alert";

/** Load Vazirmatn font (local) */
const vazir = localFont({
  src: [
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-vazir",
});

/** Application metadata (generic boilerplate version) */
export const metadata: Metadata = {
  title: "نام برند | درباره خدمات اصلی",
  description:
    "نام برند؛ معرفی کوتاه از حوزه فعالیت و خدمات اصلی شما. توضیحاتی درباره آموزش، توسعه یا مشاوره در زمینه‌های تخصصی شرکت یا گروه.",
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/logo-icon.png",
  },

  keywords: [
    "خدمات آموزشی",
    "مشاوره فناوری",
    "پروژه‌های داده",
    "هوش مصنوعی",
    "تحلیل داده",
    "آموزش تخصصی",
    "شرکت فناوری اطلاعات",
    "Data Engineering",
    "AI Consulting",
    "Projects",
    "Education",
  ].join(","),
  authors: [{ name: "تیم نام برند" }],
  creator: "توسعه‌دهنده اصلی",
  publisher: "نام برند",
  category: "Education, Technology, Consulting",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://domain-url.ir"),
  alternates: { canonical: "https://domain-url.ir" },

  openGraph: {
    title: "نام برند | درباره خدمات اصلی",
    description:
      "نام برند؛ معرفی کوتاه از حوزه فعالیت و خدمات اصلی شما. توضیحاتی درباره آموزش، توسعه یا مشاوره در زمینه‌های تخصصی شرکت یا گروه.",
    url: "https://domain-url.ir",
    siteName: "نام برند",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://domain-url.ir/images/logo-social.png",
        width: 1200,
        height: 630,
        alt: "نام برند - معرفی خدمات تخصصی",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Root layout including Navbar & Footer */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        {/* JSON-LD Schema — generic example */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              name: "نام برند",
              url: "https://domain-url.ir",
              logo: "https://domain-url.ir/images/logo-square.png",
              description:
                "نام برند؛ شرح کوتاهی از حوزه و مأموریت شرکت در زمینه خدمات اصلی.",
              sameAs: [
                "https://linkedin.com/company/sample",
                "https://github.com/sample-org",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+98-900-0000000",
                  contactType: "customer service",
                  areaServed: "IR",
                },
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${vazir.className} bg-main-bg min-h-screen flex flex-col`}
      >
        <Navbar />
        {/* Render main content directly — downtime wrapper removed */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
