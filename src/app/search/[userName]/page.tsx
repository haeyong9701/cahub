import { fetchOuid, fetchBasicInfo, fetchGuildInfo } from "@/services/nexonApi";
// import ItemEquipment from "@/components/ItemEquipment/ItemEquipment";
import UserInfo from "@/components/UserInfo/UserInfo";
import UserInfoNavbar from "@/components/UserInfoNavbar/UserInfoNavbar";
import SearchNavbar from "@/components/SearchNavbar/SearchNavbar";
import { ParamsProps } from "@/types/params";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./SearchPage.module.scss";

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
    notFound();
  }

  // const [basicInfo, itemEquipment, guild] = await Promise.all([
  //   fetchBasicInfo(ouid),
  //   fetchItemEquipment(ouid),
  //   fetchGuildInfo(ouid),
  // ]);
  const [basicInfo, guild] = await Promise.all([fetchBasicInfo(ouid), fetchGuildInfo(ouid)]);

  return (
    <div className={styles["search-page-container"]}>
      <SearchNavbar />
      <UserInfo basicInfo={basicInfo} userName={userName} guild={guild} />
      <UserInfoNavbar />
      {/* <ItemEquipment itemEquipment={itemEquipment} /> */}
      <div className={styles["item-equipment-notice"]}>
        <p>[ 장착 아이템 조회 서비스 일시 중단 안내 ]</p>
        <p>현재 서버 점검으로 인해 장착 아이템 조회가 일시 중단되었습니다.</p>
        <p>정상화 예정 : 6월 1일 오후 12:00</p>
        <p>이용에 불편을 드려 죄송합니다.</p>
      </div>
    </div>
  );
}
