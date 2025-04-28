import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/app/_components/QueryProvider";
import "@/app/_styles/globals.scss";
import Navbar from "@/app/_components/Navbar";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
