"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BasicUserInfo, ItemEquipmentResponse } from "@/app/_type";
import { fetchOuid, fetchBasicInfo, fetchItemEquipment } from "@/app/_api";
import { ItemImage } from "@/app/_components/ItemImage";

const queryClient = new QueryClient();

// 실제 데이터를 패칭하고 보여주는 컴포넌트
function OuidDisplay() {
  const [userName, setUserName] = useState<string>("");
  const [, setOuid] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicUserInfo | null>(null);
  const [itemEquipment, setItemEquipment] = useState<ItemEquipmentResponse | null>(null);

  // useMutation을 사용해 버튼 클릭 시만 API 호출
  const mutation = useMutation({
    mutationFn: () => fetchOuid(userName),
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
