import { LevelInfo } from "@/types/userInfo";

export function calculateExpRatio(currentExp: number, nextLevelInfo: LevelInfo | null): string {
  if (!nextLevelInfo) {
    return "100";
  }

  // 현재 레벨에서 획득한 경험치 계산
  const expInCurrentLevel = currentExp - (nextLevelInfo.totalExp - nextLevelInfo.requiredExp);

  // 진행률 계산 및 소수점 1자리까지 포맷팅
  const ratio = (expInCurrentLevel / nextLevelInfo.requiredExp) * 100;
  return ratio.toFixed(1);
}
