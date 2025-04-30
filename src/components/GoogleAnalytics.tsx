"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_ID) return;

    const url = pathname + (search.toString() ? `?${search.toString()}` : "");
    window.gtag?.("config", GA_ID, {
      page_path: url,
    });
  }, [pathname, search]);

  return null;
}
