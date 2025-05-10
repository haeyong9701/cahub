"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const firstRender = useRef(true);
  const initializationTimeout = useRef<NodeJS.Timeout | null>(null);

  // 클라이언트에서만 실행되는 마운트 감지
  useEffect(() => {
    setMounted(true);

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      firstRender.current = false;
      if (initializationTimeout.current) {
        clearTimeout(initializationTimeout.current);
      }
    };
  }, []);

  // 페이지 변경 감지 및 GA 이벤트 발송
  useEffect(() => {
    // 아직 마운트되지 않았으면 실행하지 않음
    if (!mounted) return;

    // GA 이벤트 발송 함수
    const executeGA = () => {
      const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (!GA_ID) return;

      try {
        // URL 안전하게 구성 (null 체크 강화)
        const searchString = search ? search.toString() : "";
        const url = pathname + (searchString ? `?${searchString}` : "");

        // 안전하게 window 객체 접근
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("config", GA_ID, {
            page_path: url,
          });
        }
      } catch (error) {
        console.error("Google Analytics 오류:", error);
      }
    };

    // 첫 렌더링에서는 하이드레이션 완료를 위해 약간 지연
    if (firstRender.current) {
      // 이전 타임아웃 정리
      if (initializationTimeout.current) {
        clearTimeout(initializationTimeout.current);
      }

      // 새 타임아웃 설정 (100ms 지연으로 하이드레이션이 완료될 시간 확보)
      initializationTimeout.current = setTimeout(() => {
        executeGA();
        firstRender.current = false;
      }, 100);
    } else {
      executeGA();
    }
  }, [pathname, search, mounted]);

  // 서버 렌더링과 클라이언트 렌더링 일치를 위해 null 반환
  return null;
}
