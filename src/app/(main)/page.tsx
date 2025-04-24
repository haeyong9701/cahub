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
          <p>캐릭터 정보를 조회할 수 있는 서비스</p>
        </div>
        <SearchInput />
      </section>
      <Footer />
    </div>
  );
}
