import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import axios from "axios";

// 파일명에 사용할 수 없는 문자를 안전하게 변경
function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "_");
}

// 이미지 URL을 다운로드하여 로컬에 저장
async function downloadImage(url, destPath) {
  try {
    const res = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(destPath);
    res.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

// 특정 페이지를 크롤링하고 이미지를 모두 다운로드
async function scrapeAndDownload(pageNum = 1, outputDir = "./images") {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
  );

  const url = `https://ca.nexon.com/Info/Item?page=${pageNum}&o=R`;
  console.log(`→ [Page ${pageNum}] Crawling: ${url}`);
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.waitForSelector(".info");

  const items = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll(".info").forEach((node) => {
      const img = node.querySelector(".inner .tmb img");
      const nameEl = node.querySelector(".inner .name");
      const imageUrl = img ? img.src : null;
      const itemName = nameEl ? nameEl.innerText.trim() : null;
      if (
        imageUrl &&
        itemName &&
        itemName !== "(Unknown)" &&
        !list.some((i) => i.imageUrl === imageUrl && i.itemName === itemName)
      ) {
        list.push({ imageUrl, itemName });
      }
    });
    return list;
  });

  console.log(`  • Found ${items.length} items on page ${pageNum}`);
  for (const { imageUrl, itemName } of items) {
    const safeName = sanitizeFileName(itemName);
    const ext = path.extname(imageUrl) || ".jpg";
    const destPath = path.join(outputDir, `${safeName}${ext}`);
    try {
      await downloadImage(imageUrl, destPath);
      console.log(`    ✔ Downloaded: ${safeName}${ext}`);
    } catch (err) {
      console.error(`    ✖ Failed: ${safeName}${ext}`, err.message);
    }
  }

  await browser.close();
}

// 딜레이 헬퍼
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 전체 페이지 순회
(async () => {
  const totalPages = 429;
  const waitMs = 3000;
  for (let i = 1; i <= totalPages; i++) {
    try {
      await scrapeAndDownload(i);
    } catch (e) {
      console.error(`Error on page ${i}:`, e);
    }
    if (i < totalPages) {
      console.log(`Waiting ${waitMs}ms before next page...`);
      await delay(waitMs);
    }
  }
  console.log("All pages processed.");
})();
