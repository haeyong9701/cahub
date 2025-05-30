"use client";

import { useEffect, useRef, useId } from "react";
import styles from "./AdBanner.module.scss";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[];
  }
}

// 이미 초기화된 광고 슬롯을 추적하는 Set
const initializedSlots = new Set<string>();

export default function AdBanner({ slot }: { slot: string }) {
  const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId(); // 고유 ID 생성
  const adUniqueId = `ad-${slot}-${uniqueId.replace(/:/g, "")}`;

  useEffect(() => {
    // 이 슬롯이 이미 초기화되었는지 확인
    if (initializedSlots.has(adUniqueId)) {
      return; // 이미 초기화된 경우 중복 실행 방지
    }

    const initializeAd = () => {
      if (!adRef.current) return;

      try {
        const adElement = adRef.current.querySelector(".adsbygoogle");
        if (adElement && !adElement.getAttribute("data-ad-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initializedSlots.add(adUniqueId); // 초기화 완료 표시
        }
      } catch (err) {
        console.error("AdSense 초기화 오류:", err);
      }
    };

    // 약간의 지연 시간을 두고 초기화 (DOM이 완전히 준비되도록)
    const timeoutId = setTimeout(initializeAd, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [adUniqueId]);

  return (
    <div ref={adRef} className={styles["ad-banner-container"]}>
      <div className={styles["ad-label"]}>광고</div>
      <ins
        id={adUniqueId}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "280px" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
