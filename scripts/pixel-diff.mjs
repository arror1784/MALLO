// Figma 원본(pixel-diff/reference/)과 실제 구현 캡처(screenshots/, `npm run shoot`로
// 생성)를 화면별로 좌(원본)/중(구현)/우(차이) 3분할 이미지로 비교하는 스크립트.
// 불일치율을 수치로 출력하고 pixel-diff/output/에 합성 이미지를, pixel-diff/report.md·
// report.json에 요약을 남긴다.
import sharp from "sharp";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REF_DIR = path.join(ROOT, "pixel-diff/reference");
const ACTUAL_DIR = path.join(ROOT, "screenshots");
const OUT_DIR = path.join(ROOT, "pixel-diff/output");

const FRAME_WIDTH = 393;
const FRAME_HEIGHT = 852;
const PANEL_GAP = 12;
const HEADER_HEIGHT = 28;

// 하나의 화면이 심각하게 어긋났다고 볼 불일치율 기준. Figma 폰트 렌더링·이모지
// 서체 차이 등 사소한 안티앨리어싱 차는 자연스럽게 몇 %씩 나오므로 여유를 둔다.
const WARN_THRESHOLD = 3; // %
const FAIL_THRESHOLD = 10; // %

async function loadScreens() {
  const mod = await import("../src/routes/screens.ts");
  return mod.screens;
}

function fileNameFor(screen, index) {
  const safeLabel = screen.label.replace(/[\\/:*?"<>|]/g, "_");
  return `${String(index + 1).padStart(2, "0")}_${safeLabel}.png`;
}

function verdictFor(percent) {
  if (percent >= FAIL_THRESHOLD) return "FAIL";
  if (percent >= WARN_THRESHOLD) return "WARN";
  return "OK";
}

function labelSvg(text, width) {
  return Buffer.from(
    `<svg width="${width}" height="${HEADER_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#22252a"/>
      <text x="${width / 2}" y="${HEADER_HEIGHT - 9}" text-anchor="middle"
        font-family="sans-serif" font-size="14" font-weight="600" fill="#ffffff">${text}</text>
    </svg>`,
  );
}

async function toRawRgba(filePath) {
  return sharp(filePath)
    .resize(FRAME_WIDTH, FRAME_HEIGHT, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();
}

async function diffOne(screen, index) {
  const fileName = fileNameFor(screen, index);
  const refPath = path.join(REF_DIR, fileName);
  const actualPath = path.join(ACTUAL_DIR, fileName);

  if (!existsSync(refPath) || !existsSync(actualPath)) {
    return {
      label: screen.label,
      fileName,
      skipped: true,
      reason: !existsSync(refPath) ? "reference 없음" : "actual(screenshots) 없음 — npm run shoot 먼저 실행",
    };
  }

  const [refRaw, actualRaw] = await Promise.all([toRawRgba(refPath), toRawRgba(actualPath)]);

  const diffPng = new PNG({ width: FRAME_WIDTH, height: FRAME_HEIGHT });
  const mismatched = pixelmatch(refRaw, actualRaw, diffPng.data, FRAME_WIDTH, FRAME_HEIGHT, {
    threshold: 0.1,
  });
  const totalPixels = FRAME_WIDTH * FRAME_HEIGHT;
  const mismatchPercent = (mismatched / totalPixels) * 100;

  // 좌(원본) | 중(구현) | 우(차이) 3분할 합성. 각 패널 위에 라벨 헤더를 얹는다.
  const panelW = FRAME_WIDTH;
  const compositeW = panelW * 3 + PANEL_GAP * 2;
  const compositeH = FRAME_HEIGHT + HEADER_HEIGHT;

  const diffPngBuffer = PNG.sync.write(diffPng);

  const canvas = sharp({
    create: {
      width: compositeW,
      height: compositeH,
      channels: 4,
      background: { r: 0x22, g: 0x25, b: 0x2a, alpha: 1 },
    },
  });

  const refResized = await sharp(refPath).resize(FRAME_WIDTH, FRAME_HEIGHT, { fit: "fill" }).png().toBuffer();
  const actualResized = await sharp(actualPath).resize(FRAME_WIDTH, FRAME_HEIGHT, { fit: "fill" }).png().toBuffer();

  const composite = await canvas
    .composite([
      { input: labelSvg("원본 (Figma)", panelW), left: 0, top: 0 },
      { input: labelSvg(`구현 (${verdictFor(mismatchPercent)})`, panelW), left: panelW + PANEL_GAP, top: 0 },
      { input: labelSvg(`차이 · ${mismatchPercent.toFixed(1)}%`, panelW), left: (panelW + PANEL_GAP) * 2, top: 0 },
      { input: refResized, left: 0, top: HEADER_HEIGHT },
      { input: actualResized, left: panelW + PANEL_GAP, top: HEADER_HEIGHT },
      { input: diffPngBuffer, left: (panelW + PANEL_GAP) * 2, top: HEADER_HEIGHT },
    ])
    .png()
    .toBuffer();

  await mkdir(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, fileName);
  await writeFile(outPath, composite);

  return {
    label: screen.label,
    fileName,
    skipped: false,
    mismatchedPixels: mismatched,
    totalPixels,
    mismatchPercent,
    verdict: verdictFor(mismatchPercent),
    outPath: path.relative(ROOT, outPath),
  };
}

async function main() {
  const screens = await loadScreens();
  const results = [];

  for (const [index, screen] of screens.entries()) {
    const result = await diffOne(screen, index);
    results.push(result);
    if (result.skipped) {
      console.log(`SKIP  ${screen.label} — ${result.reason}`);
    } else {
      console.log(
        `${result.verdict.padEnd(4)}  ${screen.label} — ${result.mismatchPercent.toFixed(2)}% (${result.mismatchedPixels}/${result.totalPixels}px)`,
      );
    }
  }

  const compared = results.filter((r) => !r.skipped);
  const sorted = [...compared].sort((a, b) => b.mismatchPercent - a.mismatchPercent);

  console.log("\n=== 불일치율 높은 순 ===");
  for (const r of sorted) {
    console.log(`  ${r.verdict.padEnd(4)} ${r.mismatchPercent.toFixed(2)}%  ${r.label}`);
  }

  const failCount = compared.filter((r) => r.verdict === "FAIL").length;
  const warnCount = compared.filter((r) => r.verdict === "WARN").length;
  const skipCount = results.length - compared.length;
  console.log(
    `\n총 ${results.length}개 화면 — OK ${compared.length - failCount - warnCount} / WARN ${warnCount} / FAIL ${failCount} / SKIP ${skipCount}`,
  );

  await mkdir(path.join(ROOT, "pixel-diff"), { recursive: true });
  await writeFile(
    path.join(ROOT, "pixel-diff/report.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2),
  );

  const mdLines = [
    "# 픽셀 대조 리포트",
    "",
    `생성 시각: ${new Date().toISOString()}`,
    "",
    "| 화면 | 불일치율 | 판정 | 비고 |",
    "|---|---|---|---|",
    ...sorted.map((r) => `| ${r.label} | ${r.mismatchPercent.toFixed(2)}% | ${r.verdict} | [합성 이미지](${r.outPath.replace(/\\/g, "/")}) |`),
    ...results
      .filter((r) => r.skipped)
      .map((r) => `| ${r.label} | - | SKIP | ${r.reason} |`),
    "",
  ];
  await writeFile(path.join(ROOT, "pixel-diff/REPORT.md"), mdLines.join("\n"));

  if (failCount > 0) {
    console.log(`\n⚠️  FAIL 판정 화면이 ${failCount}개 있습니다. pixel-diff/output/의 합성 이미지를 확인하세요.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
