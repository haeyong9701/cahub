"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서만 실행되는 마운트 감지
  useEffect(() => {
    setMounted(true);
  }, []);

  // 페이지 변경 감지 및 GA 이벤트 발송
  useEffect(() => {
    // 아직 마운트되지 않았으면 실행하지 않음
    if (!mounted) return;

    const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_ID) return;

    // search 매개변수가 존재하는지 확인 후 URL 구성
    const searchStr = search?.toString();
    const url = pathname + (searchStr ? `?${searchStr}` : "");

    // 안전하게 window 객체 접근
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: url,
      });
    }
  }, [pathname, search, mounted]);

  // 서버 렌더링에는 아무것도 반환하지 않음
  return null;
}
