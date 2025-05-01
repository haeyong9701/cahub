"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./SearchInput.module.scss";
import SearchButton from "@/components/SearchButton/SearchButton";

export default function SearchInput({ className }: { className?: string }) {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const decodedPathName = decodeURIComponent(pathname.split("/").pop() ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName) return;

    if (userName === decodedPathName) {
      return;
    }

    setIsLoading(true);
    setUserName("로딩 중...");
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
        spellCheck="false"
      />
      <SearchButton isLoading={isLoading} />
    </form>
  );
}
