import levels from "../../../public/data/levels.json";
import { LevelInfo } from "@/types/userInfo";

export function getNextLevelInfo(level: number): LevelInfo | null {
  return levels.find((levelInfo) => levelInfo.level === level + 1) ?? null;
}
