import { Geist } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import "@/styles/globals.scss";
import QueryProvider from "@/components/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cahub.xyz"),
  title: "크아허브: 크아 유저 정보 조회",
  description: "크레이지 아케이드 유저 정보 조회 서비스입니다. 레벨, 경험치, 장착 아이템 등을 한눈에 조회합니다.",
  openGraph: {
    images: "/images/social-main.png",
  },
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === "production";
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const NEXON_APP_ID = process.env.NEXT_PUBLIC_NEXON_APP_ID;
  const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="ko">
      <head>
        {/* 1) GA 라이브러리 로드 */}
        {isProduction && GA_ID && (
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        )}
        {/* 2) gtag 초기화 */}
        {isProduction && GA_ID && (
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        )}

        {isProduction && NEXON_APP_ID && (
          <Script
            src={`https://openapi.nexon.com/js/analytics.js?app_id=${NEXON_APP_ID}`}
            strategy="afterInteractive"
            async
          />
        )}

        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body className={`${geistSans.variable} `}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
