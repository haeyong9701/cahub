import axios from "axios";
import { BasicUserInfo, ItemEquipmentResponse } from "@/app/_type";

const API_URL = "https://open.api.nexon.com/ca/v1";

// ouid 조회 API
const WORLD_NAME = "해피";
export const fetchOuid = async (userName: string): Promise<string> => {
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
