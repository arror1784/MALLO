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
      use: { ...devices["iPhone 15"], viewport: { width: 393, height: 852 } },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
