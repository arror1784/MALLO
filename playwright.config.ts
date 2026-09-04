import { defineConfig, devices } from "@playwright/test";

/**
 * 기능 자동 검증(스크롤 고정/모달/폼/상태동기화/날짜이동 등) 시나리오용 설정.
 * 로케일은 ko-KR로 고정한다 — 기본 로케일(en-US)로 돌리면 텍스트 탐색이
 * 깨진다.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    viewport: { width: 393, height: 852 },
  },
  projects: [
    {
      name: "iphone16",
      // 캡처 스크립트(scripts/shoot.mjs)와 동일하게 Chromium 기반으로 통일한다.
      // 기기 프리셋(devices['iPhone 15'])은 WebKit을 요구해 별도 브라우저
      // 설치가 필요해지므로 쓰지 않고, 뷰포트만 iOS 393x852로 맞춘다.
      use: { ...devices["Desktop Chrome"], viewport: { width: 393, height: 852 }, hasTouch: true },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
