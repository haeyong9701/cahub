"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchInput.module.scss";
import SearchButton from "../SearchButton";

export default function SearchInput({ className }: { className?: string }) {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) return;
    router.push(`/search/${userName}`);
  };

  return (
    <form onSubmit={onSubmit} className={`${styles["search-form"]} ${className}`}>
      <input
        name="userName"
        type="text"
        placeholder="닉네임을 입력하세요."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className={styles["search-input"]}
        autoFocus
      />
      <SearchButton />
    </form>
  );
}
