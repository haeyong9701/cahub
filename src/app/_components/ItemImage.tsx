"use client";

import Image from "next/image";
import { useManifest } from "@/app/_query";

// ItemImage 컴포넌트: 각 아이템 이름당 한 번 훅 호출
export function ItemImage({ itemName }: { itemName: string }) {
  const { data, isPending, isError } = useManifest(itemName);

  if (isPending) return <p>이미지 로딩…</p>;
  if (isError) return <p style={{ color: "red" }}>이미지 로딩 실패</p>;
  if (!data || data.length === 0) return <p>아이템 이미지 없음</p>;

  return <Image src={data[0].item_src} alt={itemName} width={60} height={60} style={{ objectFit: "contain" }} />;
}
