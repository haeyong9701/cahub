"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  return (
    <div>
      <h1>홈페이지</h1>
      <input
        type="text"
        placeholder="캐릭터 이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <button type="submit" onClick={() => router.push(`search/${userName}`)} style={{ padding: "10px" }}>
        조회
      </button>
    </div>
  );
}
