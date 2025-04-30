export interface BasicUserInfo {
  user_name: string;
  user_date_create: string;
  user_date_last_login: string;
  user_date_last_logout: string;
  user_exp: number;
  user_level: number;
}

export interface LevelInfo {
  level: number;
  requiredExp: number;
  totalExp: number;
}

export interface GuildResponse {
  guild_id: string;
}
