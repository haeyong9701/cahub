"use client";

import styles from "./UserInfoNavbar.module.scss";

export default function UserInfoNavbar() {
  return (
    <div className={styles["navbar-wrapper"]}>
      <nav className={styles["user-info-navbar"]}>
        <div className={styles["navbar-content"]}>
          <p>아이템</p>
        </div>
      </nav>
    </div>
  );
}
