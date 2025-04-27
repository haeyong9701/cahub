import axios from "axios";
import { BasicUserInfo, ItemEquipmentResponse, GuildResponse } from "@/app/_type";

const API_URL = "https://open.api.nexon.com/ca/v1";

// ouid 조회 API
const WORLD_NAME = "해피";
// TODO API ERROR 처리, react-query로 어떻게 해야할지 고민
export const fetchOuid = async (userName: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/id`, {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
      },
      params: {
        user_name: userName,
        world_name: WORLD_NAME,
      },
    });
    return response.data.ouid;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("[fetchOuid] status:", err.response?.status, "data:", err.response?.data);
      throw new Error(err.response?.data?.message || `OUID 조회 실패 (status ${err.response?.status})`);
    }
    throw new Error("An unexpected error occurred");
  }
};

// 기본 정보 조회 API
export const fetchBasicInfo = async (ouid: string): Promise<BasicUserInfo> => {
  const response = await axios.get(`${API_URL}/user/basic`, {
    headers: {
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
    },
    params: {
      ouid,
    },
  });
  return response.data;
};

// 장착 아이템 정보 조회 API
export const fetchItemEquipment = async (ouid: string): Promise<ItemEquipmentResponse> => {
  const response = await axios.get(`${API_URL}/user/item-equipment`, {
    headers: {
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
    },
    params: {
      ouid,
    },
  });
  return response.data;
};

// 길드 정보 조회 API
export const fetchGuildInfo = async (ouid: string): Promise<GuildResponse> => {
  const response = await axios.get(`${API_URL}/user/guild`, {
    headers: {
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_NEXON_CA_API_KEY,
    },
    params: {
      ouid,
    },
  });
  return response.data;
};
