"use client";

import { BasicUserInfo } from "@/app/_type";
import Image from "next/image";
import styles from "./UserInfo.module.scss";
import { formatDate } from "@/app/_lib";

export default function UserInfo({ basicInfo, userName }: { basicInfo: BasicUserInfo; userName: string }) {
  const lastLogin = formatDate(basicInfo.user_date_last_login);
  const lastLogout = formatDate(basicInfo.user_date_last_logout);
  const isOnline = lastLogin > lastLogout;

  return (
    <section className={styles["user-info-container"]}>
      <div className={styles["image-wrapper"]}>
        <Image src="/images/ethi.png" alt="userinfo background" fill sizes="20rem" />
      </div>

      {basicInfo && (
        <div className={styles["user-info-list"]}>
          <div className={styles["user-info-name-and-status"]}>
            <h1 className={styles["user-name"]}>{userName}</h1>
            <div className={styles["user-info-status"]}>
              <div className={`${styles["status-circle"]} ${isOnline ? styles["online"] : styles["offline"]}`} />
              <h1 className={isOnline ? styles["online-text"] : styles["offline-text"]}>
                {isOnline ? "온라인" : "오프라인"}
              </h1>
            </div>
          </div>
          <dl>
            <div className={styles["user-info-description"]}>
              <div className={styles["user-info-level"]}>
                <dt>레벨</dt>
                <dd className="level">{basicInfo.user_level}</dd>
              </div>

              <div className={styles["user-info-exp"]}>
                <dt>경험치</dt>
                <dd className="exp">{basicInfo.user_exp}</dd>
              </div>
            </div>

            <div className={styles["user-info-description"]}>
              <div className={styles["user-info-guild"]}>
                <dt>길드</dt>
                <dd>-------</dd>
              </div>

              <div className={styles["user-info-nickname"]}>
                <dt>닉네임</dt>
                <dd>{basicInfo.user_name ?? ""}</dd>
              </div>
            </div>

            <div className={styles["user-info-time-stamp"]}>
              <dt>최근 로그인</dt>
              <dd>{lastLogin}</dd>
            </div>

            <div className={styles["user-info-time-stamp"]}>
              <dt>최근 로그아웃</dt>
              <dd>{isOnline ? "-" : lastLogout}</dd>
            </div>

            <div className={styles["user-info-time-stamp"]}>
              <dt>캐릭터 생성일</dt>
              <dd>{formatDate(basicInfo.user_date_create)}</dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}
