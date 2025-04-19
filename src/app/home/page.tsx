"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import Image from "next/image";

interface BasicUserInfo {
  user_name: string;
  user_date_create: Date;
  user_date_last_login: Date;
  user_date_last_logout: Date;
  user_exp: number;
  user_level: number;
}

interface ItemEquipment {
  item_equipment_slot_name: string;
  item_name: string;
}

interface ItemEquipmentResponse {
  item_equipment: ItemEquipment[];
}

interface ManifestEntry {
  item_name: string;
  item_src: string;
}

const queryClient = new QueryClient();

function normalizeKey(s: string) {
  return s.trim().normalize("NFC");
}

function useManifest(filteredName: string) {
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

// 2) ItemImage 컴포넌트: 각 아이템 이름당 한 번 훅 호출
function ItemImage({ itemName }: { itemName: string }) {
  const { data, isPending, isError } = useManifest(itemName);

  if (isPending) return <p>이미지 로딩…</p>;
  if (isError) return <p style={{ color: "red" }}>이미지 없음</p>;

  return <Image src={data[0]?.item_src} alt={itemName} width={60} height={60} style={{ objectFit: "contain" }} />;
}

// 실제 데이터를 패칭하고 보여주는 컴포넌트
function OuidDisplay() {
  const [userName, setUserName] = useState<string>("");
  const [, setOuid] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicUserInfo | null>(null);
  const [itemEquipment, setItemEquipment] = useState<ItemEquipmentResponse | null>(null);

  // ouid 조회 API
  const fetchOuid = async (): Promise<string> => {
    const response = await axios.get("https://open.api.nexon.com/ca/v1/id", {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
      },
      params: {
        user_name: userName,
        world_name: "해피",
      },
    });
    return response.data.ouid;
  };

  // 기본 정보 조회 API
  const fetchBasicInfo = async (ouid: string): Promise<BasicUserInfo> => {
    const response = await axios.get("https://open.api.nexon.com/ca/v1/user/basic", {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
      },
      params: {
        ouid,
      },
    });
    return response.data;
  };

  // 장착 아이템 정보 조회 API
  const fetchItemEquipment = async (ouid: string): Promise<ItemEquipmentResponse> => {
    const response = await axios.get("https://open.api.nexon.com/ca/v1/user/item-equipment", {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
      },
      params: {
        ouid,
      },
    });
    return response.data;
  };

  // useMutation을 사용해 버튼 클릭 시만 API 호출
  const mutation = useMutation({
    mutationFn: fetchOuid,
    onSuccess: async (ouid) => {
      setOuid(ouid);
      setBasicInfo(await fetchBasicInfo(ouid));
      setItemEquipment(await fetchItemEquipment(ouid));
    },
  });

  if (mutation.isPending) return <div>Loading...</div>;
  if (mutation.isError) return <div style={{ color: "red" }}>Error: {mutation.error.message}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>계정 식별자 (ouid) 조회</h1>
      <input
        type="text"
        placeholder="캐릭터 이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={() => mutation.mutate()} disabled={mutation.isPending} style={{ padding: "10px" }}>
        {mutation.isPending ? "조회 중..." : "조회"}
      </button>

      {basicInfo && (
        <div>
          <h2>기본 정보</h2>
          <p>닉네임: {basicInfo.user_name}</p>
          <p>가입일: {new Date(basicInfo.user_date_create).toLocaleString()}</p>
          <p>최근 로그인: {new Date(basicInfo.user_date_last_login).toLocaleString()}</p>
          <p>최근 로그아웃: {new Date(basicInfo.user_date_last_logout).toLocaleString()}</p>
          <p>경험치: {basicInfo.user_exp}</p>
          <p>레벨: {basicInfo.user_level}</p>
        </div>
      )}

      {itemEquipment && (
        <div>
          <h2>장착 아이템</h2>
          {itemEquipment.item_equipment.map(({ item_equipment_slot_name, item_name }, index) => {
            if (!item_equipment_slot_name || item_equipment_slot_name === "(Unknown)") return null;
            if (!item_name || item_name === "(Unknown)") return null;

            return (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p>슬롯: {item_equipment_slot_name}</p>
                <p>아이템 이름: {item_name}</p>
                <ItemImage itemName={item_name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CaIdPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <OuidDisplay />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
