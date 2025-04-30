"use client";

import Image from "next/image";
import Spinner from "@/components/Spinner/Spinner";
import { useGetItemImage } from "@/queries/useGetItemImage";

export function ItemImage({ itemName }: { itemName: string }) {
  const { data, isPending, isError } = useGetItemImage(itemName);

  if (isPending) return <Spinner />;

  if (isError)
    return (
      <Image
        src="/images/no-image-placeholder.png"
        alt="아이템 이미지 없음"
        width={65}
        height={65}
        style={{ objectFit: "contain" }}
      />
    );

  const { url: itemUrl, contentType } = data;

  const isGif = contentType === "image/gif";
  const size = isGif ? 120 : 80;

  return <Image src={itemUrl} alt={itemName} width={size} height={size} style={{ objectFit: "contain" }} unoptimized />;
}
