import { test, expect } from "@playwright/test";

/**
 * 하단 탭바 4개 탭 전환과, "고정 레이어와 스크롤 영역 분리" 원칙—
 * 본문을 스크롤해도 탭바 위치가 그대로인지 검증한다.
 */
test.describe("하단 탭바", () => {
  test("탭을 누르면 해당 화면으로 이동하고 활성 탭 표시가 갱신된다", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByTestId("tab-home")).toHaveAttribute("aria-current", "page");

    await page.getByTestId("tab-report").click();
    await expect(page).toHaveURL("/report");
    await expect(page.getByTestId("tab-report")).toHaveAttribute("aria-current", "page");
    await expect(page.getByTestId("tab-home")).not.toHaveAttribute("aria-current", "page");

    await page.getByTestId("tab-coaching").click();
    await expect(page).toHaveURL("/coaching");
    await expect(page.getByTestId("tab-coaching")).toHaveAttribute("aria-current", "page");

    await page.getByTestId("tab-settings").click();
    await expect(page).toHaveURL("/settings");
    await expect(page.getByTestId("tab-settings")).toHaveAttribute("aria-current", "page");

    await page.getByTestId("tab-home").click();
    await expect(page).toHaveURL("/home");
  });

  test("본문을 스크롤해도 탭바는 화면에 고정된 채 유지된다", async ({ page }) => {
    await page.goto("/home");

    const tabBar = page.locator("nav");
    const before = await tabBar.boundingBox();
    expect(before).not.toBeNull();

    await page.getByTestId("scroll-area").evaluate((el) => el.scrollTo(0, el.scrollHeight));

    const after = await tabBar.boundingBox();
    expect(after).not.toBeNull();
    expect(after!.y).toBe(before!.y);
    await expect(tabBar).toBeInViewport();
  });
});
