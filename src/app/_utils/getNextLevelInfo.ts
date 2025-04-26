import levels from "../../../public/data/levels.json";
import { LevelInfo } from "../_type";

export function getNextLevelInfo(level: number): LevelInfo | null {
  return levels.find((levelInfo) => levelInfo.level === level + 1) ?? null;
}
