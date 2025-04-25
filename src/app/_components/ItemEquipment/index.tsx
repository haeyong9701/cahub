"use client";

import { ItemEquipmentResponse } from "@/app/_type";
import { ItemImage } from "../ItemImage";

export default function ItemEquipment({ itemEquipment }: { itemEquipment: ItemEquipmentResponse }) {
  return (
    <section>
      {itemEquipment && (
        <div>
          <h2>장착 아이템</h2>
          {itemEquipment.item_equipment.map(({ item_equipment_slot_name, item_name }, index) => {
            if (!item_equipment_slot_name || item_equipment_slot_name === "(Unknown)") return null;
            if (!item_name || item_name === "(Unknown)") return null;

            return (
              <div key={index}>
                <p>슬롯: {item_equipment_slot_name}</p>
                <p>아이템 이름: {item_name}</p>
                <ItemImage itemName={item_name} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
