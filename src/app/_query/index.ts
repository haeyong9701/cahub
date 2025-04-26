import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ManifestEntry } from "@/app/_type";
import { normalizeKey } from "../_utils/normalizeKey";

// useManifest 아이템 이름에 따라 manifest.json에서 데이터를 필터링
export function useManifest(filteredName: string) {
  return useQuery<ManifestEntry[]>({
    queryKey: ["image-manifest", filteredName],
    queryFn: () => axios.get<ManifestEntry[]>("/data/image-manifest.json").then((res) => res.data),
    staleTime: Infinity,
    select: (data) => {
      const filtered = data.filter((entry) => normalizeKey(entry.item_name) === normalizeKey(filteredName));
      return filtered;
    },
  });
}
