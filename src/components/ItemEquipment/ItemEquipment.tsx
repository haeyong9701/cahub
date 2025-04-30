"use client";

import Image from "next/image";
import { ItemEquipmentResponse } from "@/types/item";
import { ItemImage } from "@/components/ItemImage";
import styles from "./ItemEquipment.module.scss";

export default function ItemEquipments({ itemEquipment }: { itemEquipment: ItemEquipmentResponse }) {
  return (
    <section className={styles["item-equipment-section"]}>
      {itemEquipment.item_equipment.length ? (
        <div className={styles["item-equipment-wrapper"]}>
          {itemEquipment.item_equipment.map(({ item_equipment_slot_name, item_name }, index) => {
            if (!item_equipment_slot_name || item_equipment_slot_name === "(Unknown)") return null;
            if (!item_name || item_name === "(Unknown)") return null;

            return (
              <div key={index} className={styles["item-equipment-container"]}>
                <div className={styles["item-image-wrapper"]}>
                  <ItemImage itemName={item_name} />
                </div>
                <div className={styles["item-info"]}>
                  <p className={styles["item-slot-name"]}>{item_equipment_slot_name}</p>
                  <p className={styles["item-name"]}>{item_name}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles["no-item-equipment"]}>
          <Image src="/images/alert.png" alt="아이템 정보 없음" width={200} height={200} />
          <p>아이템 정보 없음</p>
        </div>
      )}
    </section>
  );
}
