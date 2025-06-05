"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import styles from "./error.module.scss";
import Image from "next/image";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(`에러 발생: ${error}`, {
      level: "error",
    });
    console.error("에러 발생:", error);
  }, [error]);

  return (
    <div className={styles["error-container"]}>
      <Image src="/images/no-user-name.png" alt="no-user-name" width={80} height={80} priority />
      <h1 className={styles["error-title"]}>문제가 발생했습니다</h1>
      <p className={styles["error-message"]}>
        페이지를 표시하는 중에 문제가 발생했습니다.
        <br />
        다시 시도하거나 홈으로 이동해주세요.
      </p>
      <div className={styles["error-actions"]}>
        <button onClick={reset} className={styles["retry-button"]}>
          다시 시도
        </button>
        <Link href="/" className={styles["home-button"]}>
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
