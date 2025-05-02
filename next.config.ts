import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://storage.googleapis.com/bucket-nexon-ca-project/items/**")],
  },
};
// Sentry config 옵션
const sentryWebpackPluginOptions = {
  org: "haeyong-as",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
};

// 프로덕션 환경에서만 Sentry 설정 적용
module.exports =
  process.env.NODE_ENV === "production" ? withSentryConfig(nextConfig, sentryWebpackPluginOptions) : nextConfig;
