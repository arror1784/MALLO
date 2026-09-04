import { test, expect } from "@playwright/test";

test.describe("코칭 화면", () => {
  test("오늘의 미션 체크가 실제로 토글되고 스크립트 전체 보기로 이동한다", async ({ page }) => {
    await page.goto("/coaching");

    const missionCheckbox = page.getByRole("checkbox");
    await expect(missionCheckbox).toHaveAttribute("aria-checked", "false");
    await expect(page.getByRole("button", { name: "완료했어요" })).toBeVisible();

    await missionCheckbox.click();
    await expect(missionCheckbox).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("button", { name: "완료됨 ✓" })).toBeVisible();

    // 텍스트 버튼도 같은 상태를 조작한다 — 다시 누르면 원복된다.
    await page.getByRole("button", { name: "완료됨 ✓" }).click();
    await expect(missionCheckbox).toHaveAttribute("aria-checked", "false");

    await page.getByRole("button", { name: "스크립트 전체 보기" }).click();
    await expect(page).toHaveURL("/coaching/script");
    await expect(page.getByText("오늘 유치원에서 뭐가 제일 재미있었어?")).toBeVisible();
    await expect(page.getByText("친구랑 어떤 놀이를 했어?")).toBeVisible();
  });
});

test.describe("리포트 내보내기", () => {
  test("포함 범위와 형식 선택이 상호 배타적으로 전환된다", async ({ page }) => {
    await page.goto("/report/export");

    const summary = page.getByRole("radio", { name: /기본 요약본/ });
    const detailed = page.getByRole("radio", { name: /상세 포함본/ });
    await expect(summary).toHaveAttribute("aria-checked", "true");
    await expect(detailed).toHaveAttribute("aria-checked", "false");

    await detailed.click();
    await expect(detailed).toHaveAttribute("aria-checked", "true");
    await expect(summary).toHaveAttribute("aria-checked", "false");

    const imageBtn = page.getByRole("button", { name: "이미지 저장" });
    const pdfBtn = page.getByRole("button", { name: "PDF 저장" });
    await expect(imageBtn).toHaveAttribute("aria-pressed", "false");

    await imageBtn.click();
    await expect(imageBtn).toHaveAttribute("aria-pressed", "true");
    await pdfBtn.click();
    await expect(pdfBtn).toHaveAttribute("aria-pressed", "true");
    await expect(imageBtn).toHaveAttribute("aria-pressed", "false");
  });
});

test.describe("설정", () => {
  test("데이터 삭제 요청과 로그아웃으로 각각 이동한다", async ({ page }) => {
    await page.goto("/settings");

    await page.getByRole("button", { name: "데이터 삭제 요청" }).click();
    await expect(page).toHaveURL("/settings/delete");

    await page.goBack();
    await expect(page).toHaveURL("/settings");

    await page.getByRole("button", { name: "로그아웃" }).click();
    await expect(page).toHaveURL("/");
  });

  test("삭제 대상 선택 후 요청하면 접수 완료 상태로 전환된다", async ({ page }) => {
    await page.goto("/settings/delete");

    const childRadio = page.getByRole("radio", { name: /데이터만/ });
    const accountRadio = page.getByRole("radio", { name: "계정 전체 데이터" });
    await expect(childRadio).toHaveAttribute("aria-checked", "true");

    await accountRadio.click();
    await expect(accountRadio).toHaveAttribute("aria-checked", "true");
    await expect(childRadio).toHaveAttribute("aria-checked", "false");

    await expect(page.getByTestId("delete-confirmation")).toHaveCount(0);

    await page.getByRole("button", { name: "삭제 요청하기" }).click();

    await expect(page.getByTestId("delete-confirmation")).toBeVisible();
    await expect(page.getByText("삭제 요청이 접수됐어요")).toBeVisible();
    await expect(page.getByRole("button", { name: "삭제 요청하기" })).toHaveCount(0);
    // 제출 후에는 대상 선택도 잠긴다.
    await expect(accountRadio).toBeDisabled();
  });
});
