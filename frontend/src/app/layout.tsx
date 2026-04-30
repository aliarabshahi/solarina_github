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

/** Application metadata customized for Solarina — Portable Solar Devices */
export const metadata: Metadata = {
  title: "Solarina | شارژر خورشیدی قابل‌حمل و انرژی خورشیدی همیشه همراه",
  description:
    "Solarina جاییه که خورشید به برق تبدیل میشه! شارژر خورشیدی قابل‌حمل برای شارژ موبایل، پاوربانک و وسایل الکترونیکی هرجا که نور باشه. سبک، تاشو و همیشه آماده سفر.",
  icons: {
    icon: [
      { url: "/images/icon.png", type: "image/png" },
      { url: "/images/icon.webp", type: "image/webp" },
    ],
    apple: "/images/logo-icon.png",
  },

  keywords: [
    "شارژر خورشیدی",
    "پنل خورشیدی قابل حمل",
    "انرژی خورشیدی",
    "پاوربانک خورشیدی",
    "تجهیزات خورشیدی",
    "شارژ با نور خورشید",
    "سفر و طبیعت‌گردی",
    "کمپینگ",
    "Solar charger",
    "Portable solar panel",
    "Clean energy",
    "Renewable power",
  ].join(","),
  authors: [{ name: "تیم Solarina" }],
  creator: "Ali Arabshahi",
  publisher: "Solarina",
  category: "Energy, Solar Products, Technology",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://solarina.ir"),
  alternates: { canonical: "https://solarina.ir" },

  openGraph: {
    title: "Solarina | شارژر خورشیدی قابل‌حمل و انرژی همیشه در دسترس",
    description:
      "با Solarina نور خورشید رو به برق تبدیل کن! شارژر خورشیدی قابل‌حمل برای موبایل، دوربین و وسایل سفری — مناسب طبیعت‌گردی، کوه، ساحل یا هرجایی که نور هست.",
    url: "https://solarina.ir",
    siteName: "Solarina",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://solarina.ir/images/logo-social.png",
        width: 1200,
        height: 630,
        alt: "Solarina - تجهیزات و شارژر خورشیدی قابل‌حمل",
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
        {/* JSON-LD Schema — Solarina organization info */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "Store"],
              name: "Solarina",
              url: "https://solarina.ir",
              logo: "https://solarina.ir/images/logo-social.png",
              description:
                "Solarina تولیدکننده و عرضه‌کننده شارژرهای خورشیدی قابل‌حمل و تجهیزات انرژی خورشیدی برای سفر و طبیعت‌گردی.",
              sameAs: [
                "https://linkedin.com/solarina",
                "https://instagram.com/solarina",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+989374152095",
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
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
