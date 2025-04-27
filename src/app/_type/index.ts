export interface BasicUserInfo {
  user_name: string;
  user_date_create: Date;
  user_date_last_login: Date;
  user_date_last_logout: Date;
  user_exp: number;
  user_level: number;
}

interface ItemEquipment {
  item_equipment_slot_name: string;
  item_name: string;
}

export interface ItemEquipmentResponse {
  item_equipment: ItemEquipment[];
}

export interface ManifestEntry {
  item_name: string;
  item_src: string;
}

export interface LevelInfo {
  level: number;
  requiredExp: number;
  totalExp: number;
}

export interface GuildResponse {
  guild_id: string;
}
