"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";

const URI = process.env.NEXT_PUBLIC_STORAGE_BUCKET_URL;
const DEFAULT_IMAGE = "/images/no-image-placeholder.png";
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDEzeBAADuQG5THZiiQAAAABJRU5ErkJggg==";

export function ItemImage({ itemName }: { itemName: string }) {
  const [imageType, setImageType] = useState<"png" | "gif" | "default">("png");

  const pngUrl = `${URI}${itemName}.png`;
  const gifUrl = `${URI}${itemName}.gif`;

  const size = imageType === "gif" ? 120 : 80;

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
          gifUrl,
          itemName,
        },
      });
    }
  }, [imageType, itemName, pngUrl, gifUrl]);

  const getCurrentSrc = () => {
    switch (imageType) {
      case "png":
        return pngUrl;
      case "gif":
        return gifUrl;
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
          // PNG가 실패하면 GIF로 전환, useState로 다시 리렌더링
          setImageType("gif");
        } else if (imageType === "gif") {
          // GIF도 실패하면 기본 이미지로 전환
          setImageType("default");
        }
      }}
    />
  );
}
