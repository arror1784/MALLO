import { test, expect } from "@playwright/test";

test.describe("리포트 플로우", () => {
  test("홈에서 리포트로 진입해 세션 목록 필터와 지표 상세 전환까지 확인한다", async ({ page }) => {
    await page.goto("/home");

    await test.step("홈 → 리포트 탭 루트", async () => {
      await page.getByRole("button", { name: "보기", exact: true }).click();
      await expect(page).toHaveURL("/report");
    });

    await test.step("성장 추이 — 주간/월간 전환 시 실제 데이터 포인트 수가 바뀐다", async () => {
      const weeklyBtn = page.getByRole("button", { name: "주간" });
      const monthlyBtn = page.getByRole("button", { name: "월간" });
      const chart = page.getByTestId("trend-sparkline");

      await expect(weeklyBtn).toHaveAttribute("aria-pressed", "true");
      await expect(chart).toHaveAttribute("data-point-count", "4");

      await monthlyBtn.click();
      await expect(monthlyBtn).toHaveAttribute("aria-pressed", "true");
      await expect(weeklyBtn).toHaveAttribute("aria-pressed", "false");
      await expect(chart).toHaveAttribute("data-point-count", "6");
    });

    await test.step("녹음 세션 목록 진입 후 상태 필터가 실제로 목록을 좁힌다", async () => {
      await page.getByRole("button", { name: "녹음 세션 목록" }).click();
      await expect(page).toHaveURL("/report/sessions");

      const items = page.getByTestId("session-item");
      await expect(items).toHaveCount(3);

      await page.getByRole("button", { name: "완료", exact: true }).click();
      await expect(items).toHaveCount(1);
      await expect(items.first()).toHaveAttribute("data-status", "done");

      await page.getByRole("button", { name: "분석 중" }).click();
      await expect(items).toHaveCount(1);
      await expect(items.first()).toHaveAttribute("data-status", "analyzing");

      await page.getByRole("button", { name: "실패" }).click();
      await expect(items).toHaveCount(1);
      await expect(items.first()).toHaveAttribute("data-status", "failed");

      await page.getByRole("button", { name: "전체" }).click();
      await expect(items).toHaveCount(3);
    });

    await test.step("완료된 세션에서 리포트 상세로 진입", async () => {
      await page.getByRole("button", { name: "완료", exact: true }).click();
      await page.getByRole("button", { name: "리포트 보기 →" }).click();
      await expect(page).toHaveURL("/report/detail");
    });

    await test.step("핵심 지표 자세히 → 지표 상세, 하단 칩으로 지표 전환", async () => {
      await page.getByRole("button", { name: "핵심 지표 자세히 →" }).click();
      await expect(page).toHaveURL("/report/open-question");

      await expect(page.getByTestId("metric-label")).toHaveText("열린 질문");
      await expect(page.getByTestId("metric-value")).toHaveText("42%");

      await page.getByRole("button", { name: "발화량" }).click();
      await expect(page.getByTestId("metric-label")).toHaveText("발화량");
      await expect(page.getByTestId("metric-value")).toHaveText("127회");
      // 지금 보고 있는 지표(발화량)는 칩 목록에서 빠지고, 이전 지표(열린 질문)가 다시 나타난다.
      await expect(page.getByRole("button", { name: "열린 질문" })).toBeVisible();
    });

    await test.step("리포트 상세에서 내보내기로 이동", async () => {
      await page.goBack();
      await page.getByRole("button", { name: "리포트 내보내기" }).click();
      await expect(page).toHaveURL("/report/export");
    });
  });
});
