"use client";

import Image from "next/image";
import { useManifest } from "@/app/_query";
import Spinner from "./Spinner";

// ItemImage 컴포넌트: 각 아이템 이름당 한 번 훅 호출
export function ItemImage({ itemName }: { itemName: string }) {
  const { data, isPending, isError, isSuccess } = useManifest(itemName);

  if (isPending) return <Spinner />;

  if (isError) return <p style={{ color: "red" }}>이미지 로딩 실패</p>;

  if (isSuccess && data.length === 0)
    return (
      <Image
        src="/images/no-image-placeholder.png"
        alt="아이템 이미지 없음"
        width={65}
        height={65}
        style={{ objectFit: "contain" }}
      />
    );

  const src = data[0].item_src;
  const isGif = /\.gif($|\?)/i.test(src);
  const size = isGif ? 120 : 80;

  return (
    <Image
      src={src}
      alt={itemName}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      // GIF일 때만 최적화 끄기
      unoptimized={isGif}
    />
  );
}
