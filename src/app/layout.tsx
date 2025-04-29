import type { Metadata } from "next";
import { Geist } from "next/font/google";
import QueryProvider from "@/app/_components/QueryProvider";
import "@/app/_styles/globals.scss";
import Navbar from "@/app/_components/Navbar";
import Footer from "./_components/Footer";
import Script from "next/script";
import GoogleAnalytics from "./_components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "크아허브: 크아 유저 정보 조회",
  description: "크레이지 아케이드 유저 정보 조회 서비스입니다. 레벨, 경험치, 장착 아이템 등을 한눈에 조회합니다.",
  openGraph: {
    images: "/images/social-main.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === "production";
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
      </head>

      <body className={`${geistSans.variable} `}>
        <GoogleAnalytics />
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
