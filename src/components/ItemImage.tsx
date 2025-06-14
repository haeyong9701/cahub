"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";

const URI = process.env.NEXT_PUBLIC_STORAGE_BUCKET_URL;
const DEFAULT_IMAGE = "/images/no-image-placeholder.png";
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDEzeBAADuQG5THZiiQAAAABJRU5ErkJggg==";

export function ItemImage({ itemName }: { itemName: string }) {
  const [imageType, setImageType] = useState<"png" | "default">("png");

  const pngUrl = `${URI}${itemName}.png`;
  const size = 80;

  useEffect(() => {
    if (imageType === "default") {
      Sentry.captureMessage(`이미지를 찾을 수 없음: ${itemName}`, {
        level: "warning",
        tags: {
          component: "ItemImage",
          itemName,
        },
        extra: {
          pngUrl,
          itemName,
        },
      });
    }
  }, [imageType, itemName, pngUrl]);

  const getCurrentSrc = () => {
    switch (imageType) {
      case "png":
        return pngUrl;
      default:
        return DEFAULT_IMAGE;
    }
  };

  return (
    <Image
      src={getCurrentSrc()}
      alt={itemName || "아이템 이미지"}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      unoptimized
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={() => {
        if (imageType === "png") {
          // PNG가 실패 시 기본 이미지로 변환(useState로 다시 리렌더링)
          setImageType("default");
        }
      }}
    />
  );
}
