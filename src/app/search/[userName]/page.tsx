import { fetchOuid, fetchBasicInfo, fetchItemEquipment, fetchGuildInfo } from "@/app/_api";
import ItemEquipment from "@/app/_components/ItemEquipment";
import UserInfo from "@/app/_components/UserInfo";
import styles from "./SearchPage.module.scss";
import UserInfoNavbar from "@/app/_components/UserInfoNavbar";
import SearchNavbar from "@/app/_components/SearchNavbar";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ParamsProps } from "@/app/_type";

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const userName = decodeURIComponent(params.userName);
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
  const userName = decodeURIComponent(params.userName);
  const ouid = await fetchOuid(userName);

  if (!ouid) {
    notFound();
  }

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
