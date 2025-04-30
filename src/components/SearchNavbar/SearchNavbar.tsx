"use client";

import SearchInput from "@/components/SearchInput/SearchInput";
import inputStyles from "@/components/SearchInput/SearchInput.module.scss";
import styles from "./SearchNavbar.module.scss";

export default function SearchNavbar() {
  return (
    <div className={styles["search-navbar-wrapper"]}>
      <nav className={styles["user-info-search-navbar"]}>
        <SearchInput className={inputStyles.SearchNavbar} />
      </nav>
    </div>
  );
}
