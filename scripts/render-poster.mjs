// docs/poster/poster.html(1000×1414, A 규격 세로 비율)을 인쇄용으로 렌더링한다.
// - poster.png: 5배율 5000×7070px (A1 출력 시 약 210dpi)
// - poster-preview.png: 1배율 미리보기
// - poster.pdf: poster.png를 A1(594×841mm) 한 장에 담은 인쇄소 전달용
import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTER_DIR = path.resolve(__dirname, "../docs/poster");
const POSTER_URL = pathToFileURL(path.join(POSTER_DIR, "poster.html")).href;
const SIZE = { width: 1000, height: 1414 };

async function open(browser, deviceScaleFactor) {
  const page = await browser.newPage({ viewport: SIZE, deviceScaleFactor });
  await page.goto(POSTER_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

async function main() {
  const browser = await chromium.launch();

  const preview = await open(browser, 1);
  await preview.screenshot({ path: path.join(POSTER_DIR, "poster-preview.png") });

  const hires = await open(browser, 5);
  await hires.screenshot({ path: path.join(POSTER_DIR, "poster.png") });

  // HTML을 직접 PDF로 찍으면 box-shadow가 회색 박스로 깨지고 A1 확대도
  // 어긋나므로, 위의 고배율 PNG를 A1 한 장에 꽉 채워 담는다
  const a1 = await browser.newPage();
  const png = await readFile(path.join(POSTER_DIR, "poster.png"));
  const pngUrl = `data:image/png;base64,${png.toString("base64")}`;
  await a1.setContent(
    `<style>@page{margin:0}html,body{margin:0}img{display:block;width:594mm;height:841mm}</style><img src="${pngUrl}">`,
    { waitUntil: "load" },
  );
  await a1.pdf({
    path: path.join(POSTER_DIR, "poster.pdf"),
    width: "594mm",
    height: "841mm",
    printBackground: true,
    pageRanges: "1",
  });

  await browser.close();
  console.log(`rendered → ${POSTER_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
