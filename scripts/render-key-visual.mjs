// docs/poster/key-visual.html(1200×900, 4:3)을 전시 포스터 양식 제출용 대표이미지로 렌더링한다.
// - MALLO_대표이미지.png: 크림 배경, 3배율 3600×2700px
// - MALLO_대표이미지_투명.png: 투명 배경, 3배율 3600×2700px
import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTER_DIR = path.resolve(__dirname, "../docs/poster");
const PAGE_URL = pathToFileURL(path.join(POSTER_DIR, "key-visual.html")).href;
const SIZE = { width: 1200, height: 900 };

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: SIZE, deviceScaleFactor: 3 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await page.screenshot({ path: path.join(POSTER_DIR, "MALLO_대표이미지.png") });

  await page.evaluate(() => document.body.classList.add("transparent"));
  await page.screenshot({ path: path.join(POSTER_DIR, "MALLO_대표이미지_투명.png"), omitBackground: true });

  await browser.close();
  console.log(`rendered → ${POSTER_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
