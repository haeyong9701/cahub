"use client";

import Image from "next/image";
import styles from "./SearchButton.module.scss";

export default function SearchButton() {
  return (
    <button type="submit" className={styles["search-button"]}>
      <div className={styles["search-icon-wrapper"]}>
        <Image src="/images/search.svg" alt="search" width={15} height={15} />
      </div>
    </button>
  );
}
