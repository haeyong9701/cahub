import { fetchOuid, fetchBasicInfo, fetchItemEquipment, fetchGuildInfo } from "@/services/nexonApi";
import ItemEquipment from "@/components/ItemEquipment/ItemEquipment";
import UserInfo from "@/components/UserInfo/UserInfo";
import UserInfoNavbar from "@/components/UserInfoNavbar/UserInfoNavbar";
import SearchNavbar from "@/components/SearchNavbar/SearchNavbar";
import { ParamsProps } from "@/types/params";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./SearchPage.module.scss";
import * as Sentry from "@sentry/nextjs";

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { userName: raw } = await params;
  const userName = decodeURIComponent(raw);
  const ouid = await fetchOuid(userName);

  if (!ouid) {
    return { title: "사용자를 찾을 수 없습니다" };
  }

  return {
    title: `${userName} 캐릭터 정보 조회 결과`,
    description: `${userName}님의 레벨, 경험치, 장착 아이템 등을 한눈에 조회합니다.`,
    openGraph: {
      images: "/images/social-main.png",
    },
  };
}

export default async function SearchPage({ params }: ParamsProps) {
  const { userName: raw } = await params;
  const userName = decodeURIComponent(raw);
  const ouid = await fetchOuid(userName);

  if (!ouid) {
    Sentry.captureMessage(`검색 실패: ${userName}`, {
      level: "info",
      tags: {
        feature: "user_search",
        action: "search_not_found",
      },
      extra: {
        userName,
        timestamp: new Date().toISOString(),
      },
    });

    notFound();
  }

  Sentry.captureMessage(`검색 성공: ${userName}`, {
    level: "info",
    tags: {
      feature: "user_search",
      action: "search_success",
    },
    extra: {
      userName,
      ouid,
    },
  });

  const [basicInfo, itemEquipment, guild] = await Promise.all([
    fetchBasicInfo(ouid),
    fetchItemEquipment(ouid),
    fetchGuildInfo(ouid),
  ]);

  return (
    <div className={styles["search-page-container"]}>
      <SearchNavbar />
      <UserInfo basicInfo={basicInfo} userName={userName} guild={guild} />
      <UserInfoNavbar />
      <ItemEquipment itemEquipment={itemEquipment} />
    </div>
  );
}
