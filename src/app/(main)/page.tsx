"use client";

import Image from "next/image";
import styles from "./mainPage.module.scss";
import SearchInput from "../_components/SearchInput";
import Footer from "../_components/Footer";

export default function MainPage() {
  return (
    <div className={styles["main-page-container"]}>
      <section className={styles["search-section"]}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/images/logo.png" alt="CAHUB" fill />
        </div>
        <div className={styles["description"]}>
          <p>크레이지아케이드 캐릭터 정보 검색</p>
        </div>
        <SearchInput />
      </section>
      <Footer />
    </div>
  );
}
