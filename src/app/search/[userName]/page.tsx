import { fetchOuid, fetchBasicInfo, fetchItemEquipment } from "@/app/_api";
import ItemEquipment from "@/app/_components/ItemEquipment";
import UserInfo from "@/app/_components/UserInfo";
import styles from "./SearchPage.module.scss";
import UserInfoNavbar from "@/app/_components/UserInfoNavbar";
import SearchNavbar from "@/app/_components/SearchNavbar";

export default async function SearchPage({ params }: { params: { userName: string } }) {
  const { userName: raw } = await params;
  const userName = decodeURIComponent(raw);

  const ouid = await fetchOuid(userName);
  const [basicInfo, itemEquipment] = await Promise.all([fetchBasicInfo(ouid), fetchItemEquipment(ouid)]);

  return (
    <div className={styles["search-page-container"]}>
      <SearchNavbar />
      <UserInfo basicInfo={basicInfo} userName={userName} />
      <UserInfoNavbar />
      <ItemEquipment itemEquipment={itemEquipment} />
    </div>
  );
}
