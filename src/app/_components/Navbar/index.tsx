"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles["header"]}>
      <Link href="/" className={styles["header-link"]}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/images/logo.png" alt="CAHUB" fill sizes="9rem" />
        </div>
        <span className={styles["end-link"]}>.XYZ</span>
      </Link>
    </header>
  );
}
