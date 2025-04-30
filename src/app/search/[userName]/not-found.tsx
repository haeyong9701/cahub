"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import SearchNavbar from "@/components/SearchNavbar/SearchNavbar";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const { userName: raw } = useParams();
  const userName = decodeURIComponent(String(raw));

  return (
    <>
      <SearchNavbar />
      <div className={styles["not-found-wrapper"]}>
        <section className={styles["not-found-container"]}>
          <Image src="/images/no-user-name.png" alt="no-user-name" width={80} height={80} priority />
          <div className={styles["not-found-text"]}>
            <p className={styles["user-name"]}>{userName}</p>
            <p>해당 유저를 찾을 수 없습니다. 이름을 다시 한번 확인해 주세요.</p>
            <p>2022년 1월 1일 이후 접속한 캐릭터만 조회할 수 있습니다.</p>
          </div>
        </section>
      </div>
    </>
  );
}
