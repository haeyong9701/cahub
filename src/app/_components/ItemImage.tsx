"use client";

import Image from "next/image";
import { useManifest } from "@/app/_query";

// ItemImage 컴포넌트: 각 아이템 이름당 한 번 훅 호출
export function ItemImage({ itemName }: { itemName: string }) {
  const { data, isPending, isError } = useManifest(itemName);

  if (isPending) return <p>이미지 로딩…</p>;
  if (isError) return <p style={{ color: "red" }}>이미지 로딩 실패</p>;
  if (!data || data.length === 0) return <p>아이템 이미지 없음</p>;

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
