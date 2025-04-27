"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles["header"]}>
      <Link href="/" className={styles["header-link"]}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/images/logo.png" alt="CAHUB.XYZ" fill sizes="12rem" />
        </div>
      </Link>
    </header>
  );
}
