import fs from "fs";
import path from "path";

// 1) 원본 TSV 파일 경로
const inputPath = path.resolve(process.cwd(), "levels.tsv");
// 2) 결과 JSON 파일 경로
const outputPath = path.resolve(process.cwd(), "levels.json");

// 3) 파일을 읽어 한 줄씩 배열로
const lines = fs.readFileSync(inputPath, "utf-8").trim().split(/\r?\n/);

// 4) 각 줄을 파싱해 객체로 변환
const levels = lines.map((line) => {
  // 탭이나 여러 공백으로 구분되어 있다면 아래 정규식 사용
  const cols = line.split(/\s+/);
  // cols 예시: ["메달","이미지", "3", "Bronze", "Beginner", "Black", "Storm", "600", "1,000"]
  const level = Number(cols[2]);
  const requiredExp = Number(cols[7].replace(/,/g, ""));
  const totalExp = Number(cols[8].replace(/,/g, ""));

  return { level, requiredExp, totalExp };
});

// 5) JSON으로 파일에 쓰기
fs.writeFileSync(outputPath, JSON.stringify(levels, null, 2), "utf-8");
console.log(`✅ ${levels.length}개 레벨 데이터를 ${outputPath} 에 저장했습니다.`);
