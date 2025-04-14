"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

interface BasicUserInfo {
  user_name: string;
  user_date_create: string;
  user_date_last_login: string;
  user_date_last_logout: string;
  user_exp: number;
  user_level: number;
}

const queryClient = new QueryClient();

// 실제 데이터를 패칭하고 보여주는 컴포넌트
function OuidDisplay() {
  const [userName, setUserName] = useState<string>("");
  const [, setOuid] = useState<string>("");
  const [basicInfo, setBasicInfo] = useState<BasicUserInfo | null>(null);

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

  // useMutation을 사용해 버튼 클릭 시만 API 호출
  const mutation = useMutation({
    mutationFn: fetchOuid,
    onSuccess: (ouid) => {
      setOuid(ouid);
      fetchBasicInfo(ouid).then((info) => {
        setBasicInfo(info);
        console.log("Basic Info:", info);
      });
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
      {/* {ouid && <p>ouid: {ouid}</p>} */}
      {basicInfo && (
        <div>
          <h2>기본 정보</h2>
          <p>닉네임: {basicInfo.user_name}</p>
          <p>가입일: {basicInfo.user_date_create}</p>
          <p>최근 로그인: {basicInfo.user_date_last_login}</p>
          <p>최근 로그아웃: {basicInfo.user_date_last_logout}</p>
          <p>경험치: {basicInfo.user_exp}</p>
          <p>레벨: {basicInfo.user_level}</p>
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
