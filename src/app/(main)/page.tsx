import Image from "next/image";
import styles from "./MainPage.module.scss";
import SearchInput from "@/components/SearchInput/SearchInput";

export default function MainPage() {
  return (
    <div className={styles["main-page-container"]}>
      <section className={styles["search-section"]}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/images/logo.png" alt="CAHUB" fill sizes="(min-width: 768px) 350px, 250px" priority />
        </div>
        <div className={styles["description"]}>
          <p>크레이지아케이드 유저 정보 조회</p>
        </div>
        <SearchInput />
      </section>
    </div>
  );
}
