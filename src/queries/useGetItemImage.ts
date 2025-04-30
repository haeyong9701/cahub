import { useQuery } from "@tanstack/react-query";
import { ItemImageResponse } from "@/types/item";

const MINUTE = 1000 * 60;

export function useGetItemImage(itemName: string) {
  return useQuery<ItemImageResponse, Error>({
    queryKey: ["itemImage", itemName],
    queryFn: async () => {
      const res = await fetch(`/api/items?${itemName}`);
      const contentType = res.headers.get("Content-Type");

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText ?? "Image fetch failed");
      }

      if (!contentType) {
        throw new Error("Content-Type header is missing");
      }

      return {
        url: res.url,
        contentType,
      };
    },
    staleTime: 3 * MINUTE,
    gcTime: 10 * MINUTE,
  });
}
