"use client";

import { BasicUserInfo } from "@/app/_type";
import styles from "./UserInfo.module.scss";

export default function UserInfo({ basicInfo, userName }: { basicInfo: BasicUserInfo; userName: string }) {
  return (
    <section className={styles["user-info"]}>
      {basicInfo && (
        <div>
          <h1>현재 접속중</h1>
          <h1>{userName}</h1>

          <p>길드: ----</p>
          <p>닉네임: {basicInfo.user_name}</p>

          <p>
            최근 로그인:
            {new Date(basicInfo.user_date_last_login).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </p>
          {/* <p>최근 로그아웃: {new Date(basicInfo.user_date_last_logout).toLocaleString()}</p> */}

          {/* <p>가입일: {new Date(basicInfo.user_date_create).toLocaleString()}</p> */}
          <p>경험치: {basicInfo.user_exp}</p>
          <p>레벨: {basicInfo.user_level}</p>
        </div>
      )}
    </section>
  );
}
