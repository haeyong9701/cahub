// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// 프로덕션 환경에서만 Sentry 초기화
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://b08aed9c08783144bf69d03c6f604454@o4509246698094592.ingest.us.sentry.io/4509246699798528",

    // Add optional integrations for additional features
    integrations: [Sentry.replayIntegration()],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // 환경 설정 추가
    environment: "production",
  });
} else {
  // 개발 환경에서는 로그 메시지만 표시
  console.log("Sentry disabled in development mode (instrumentation-client.ts)");
}

// 라우터 전환 이벤트는 process.env.NODE_ENV === 'production'일 때만 활성화
export const onRouterTransitionStart =
  process.env.NODE_ENV === "production" ? Sentry.captureRouterTransitionStart : () => {};
