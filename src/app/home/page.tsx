"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

const queryClient = new QueryClient();

// 실제 데이터를 패칭하고 보여주는 컴포넌트
function OuidDisplay() {
  const [userName, setUserName] = useState<string>("");
  const [ouid, setOuid] = useState<string>("");

  // API 호출 함수
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

  // useMutation을 사용해 버튼 클릭 시만 API 호출
  const mutation = useMutation({
    mutationFn: fetchOuid,
    onSuccess: (data) => {
      setOuid(data);
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
      <button onClick={() => mutation.mutate()} style={{ padding: "10px" }}>
        조회
      </button>
      {ouid && <p>ouid: {ouid}</p>}
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
