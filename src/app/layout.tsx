import { Geist } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.scss";
import QueryProvider from "@/components/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === "production";
  const NEXON_APP_ID = process.env.NEXON_APP_ID;

  return (
    <html lang="ko">
      <head>
        {isProduction && NEXON_APP_ID && (
          <Script
            src={`https://openapi.nexon.com/js/analytics.js?app_id=${NEXON_APP_ID}`}
            strategy="afterInteractive"
            async
          />
        )}
      </head>

      <body className={`${geistSans.variable} `}>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
