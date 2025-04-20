import { fetchOuid, fetchBasicInfo, fetchItemEquipment } from "@/app/_api";
import { ItemImage } from "@/app/_components/ItemImage";

export default async function SearchPage({ params }: { params: { userName: string } }) {
  const { userName: raw } = await params;
  const userName = decodeURIComponent(raw);

  const ouid = await fetchOuid(userName);
  const [basicInfo, itemEquipment] = await Promise.all([fetchBasicInfo(ouid), fetchItemEquipment(ouid)]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{userName}</h1>

      <section>
        {basicInfo && (
          <div>
            <h2>기본 정보</h2>
            <p>닉네임: {basicInfo.user_name}</p>
            <p>가입일: {new Date(basicInfo.user_date_create).toLocaleString()}</p>
            <p>최근 로그인: {new Date(basicInfo.user_date_last_login).toLocaleString()}</p>
            <p>최근 로그아웃: {new Date(basicInfo.user_date_last_logout).toLocaleString()}</p>
            <p>경험치: {basicInfo.user_exp}</p>
            <p>레벨: {basicInfo.user_level}</p>
          </div>
        )}
      </section>

      <section>
        {itemEquipment && (
          <div>
            <h2>장착 아이템</h2>
            {itemEquipment.item_equipment.map(({ item_equipment_slot_name, item_name }, index) => {
              if (!item_equipment_slot_name || item_equipment_slot_name === "(Unknown)") return null;
              if (!item_name || item_name === "(Unknown)") return null;

              return (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>슬롯: {item_equipment_slot_name}</p>
                  <p>아이템 이름: {item_name}</p>
                  <ItemImage itemName={item_name} />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
