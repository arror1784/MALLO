// 단일 iOS 뷰포트(393x852)에서 screens.ts에 등록된 모든 화면을 순회하며
// 스크린샷을 뜨는 캡처 스크립트. 화면이 늘어나도 이 파일은 그대로 두고
// src/routes/screens.ts에만 추가하면 된다.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../screenshots");
const BASE_URL = process.env.SHOOT_BASE_URL ?? "http://localhost:5173";
const VIEWPORT = { width: 393, height: 852 };

async function loadScreens() {
  const mod = await import("../src/routes/screens.ts");
  return mod.screens;
}

function fileNameFor(screen, index) {
  const safeLabel = screen.label.replace(/[\\/:*?"<>|]/g, "_");
  return `${String(index + 1).padStart(2, "0")}_${safeLabel}.png`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const screens = await loadScreens();

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, locale: "ko-KR" });
  const page = await context.newPage();

  for (const [index, screen] of screens.entries()) {
    const url = `${BASE_URL}${screen.path}`;
    await page.goto(url, { waitUntil: "networkidle" });
    // DeviceFrame 바깥 배경(.bg-neutral-200)과 body 배경은 화면 확인용 배경일 뿐,
    // 캡처에는 필요 없다 — 캡처 직전에만 투명하게 지워서 둥근 모서리 바깥
    // 네 귀퉁이에 회색/크림색이 비쳐 보이지 않게 한다.
    await page.evaluate(() => {
      document.body.style.background = "transparent";
      document.querySelectorAll(".bg-neutral-200").forEach((el) => {
        el.style.background = "transparent";
      });
    });
    const framePath = path.join(OUT_DIR, fileNameFor(screen, index));
    const frame = page.locator("[data-device-frame]");
    await frame.screenshot({ path: framePath, omitBackground: true });
    console.log(`saved ${framePath} (${screen.implemented ? "implemented" : "coming soon"})`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
