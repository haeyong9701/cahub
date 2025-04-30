interface ItemEquipment {
  item_equipment_slot_name: string;
  item_name: string;
}

export interface ItemEquipmentResponse {
  item_equipment: ItemEquipment[];
}

export interface ItemImageResponse {
  url: string;
  contentType: string;
}
