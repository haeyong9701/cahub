import Image from "next/image";
import styles from "./UserInfo.module.scss";
import { BasicUserInfo, GuildResponse } from "@/types/userInfo";
import { formatDateKoreanMinute, getNextLevelInfo, getUserStatusInfo, calculateExpRatio } from "@/utils/app";

export default function UserInfo({
  basicInfo,
  userName,
  guild,
}: {
  basicInfo: BasicUserInfo;
  userName: string;
  guild: GuildResponse;
}) {
  const { isOnline } = getUserStatusInfo(basicInfo.user_date_last_login, basicInfo.user_date_last_logout);

  // 레벨 1일 경우 경험치가 null로 오는 것을 처리
  const userExp = basicInfo.user_exp ?? 0;
  const { user_level } = basicInfo;
  const next = getNextLevelInfo(user_level);

  const expProgresRatio = calculateExpRatio(userExp, next);
  const nextTotalExp = next ? next.totalExp : userExp;

  return (
    <div className={styles["user-info-wrapper"]}>
      <section className={styles["user-info-container"]}>
        <div className={styles["image-wrapper"]}>
          <Image
            src="/images/ethi.png"
            alt="userinfo background"
            fill
            sizes="(min-width: 768px) 170px, 150px"
            priority
          />
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
                  <progress className={styles["exp-progress-bar"]} max={100} value={expProgresRatio} />
                  <dd className={styles["exp-progress-ratio"]}>{expProgresRatio}%</dd>
                  <dd className={styles["exp"]}>
                    {userExp.toLocaleString()} / {nextTotalExp.toLocaleString()}
                  </dd>
                </div>
              </div>

              <div className={styles["user-info-description"]}>
                <div className={styles["user-info-guild"]}>
                  <dt>길드</dt>
                  <dd>{guild.guild_id ?? "-"}</dd>
                </div>

                <div className={styles["user-info-nickname"]}>
                  <dt>닉네임</dt>
                  <dd>{basicInfo.user_name ?? "-"}</dd>
                </div>
              </div>

              <div className={styles["user-info-time-stamp"]}>
                <dt>최근 로그인</dt>
                <dd>{formatDateKoreanMinute(basicInfo.user_date_last_login)}</dd>
              </div>

              <div className={styles["user-info-time-stamp"]}>
                <dt>최근 로그아웃</dt>
                <dd>{isOnline ? "-" : formatDateKoreanMinute(basicInfo.user_date_last_logout)}</dd>
              </div>

              <div className={styles["user-info-time-stamp"]}>
                <dt>캐릭터 생성일</dt>
                <dd>{formatDateKoreanMinute(basicInfo.user_date_create)}</dd>
              </div>
            </dl>
          </div>
        )}
      </section>
    </div>
  );
}
