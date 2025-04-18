import { Storage } from "@google-cloud/storage";
import fs from "fs";
import path from "path";

// 1) GCS 설정
const storage = new Storage({
  keyFilename: path.join(process.cwd(), "gcs-key.json"),
});
const bucketName = "bucket-nexon-ca-project";
const prefix = "items/"; // items 폴더 안의 파일만 가져옴

async function main() {
  // 2) items/ 하위 파일 목록 가져오기
  const [files] = await storage.bucket(bucketName).getFiles({ prefix });

  // 3) 매핑 배열 생성
  const manifest = files.map((file) => {
    const parsed = path.parse(file.name);
    const file_ext = parsed.ext;
    const item_name = parsed.name;
    const item_src = `https://storage.googleapis.com/${bucketName}/${prefix}${item_name}${file_ext}`;
    return { item_name, item_src };
  });

  // 4) public 폴더에 JSON으로 저장
  const outDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "image-manifest.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`✅ image-manifest.json 생성 완료 (${manifest.length}개)`);
}

main().catch((err) => {
  console.error("스크립트 실행 중 오류:", err);
  process.exit(1);
});
