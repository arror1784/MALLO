import { test, expect } from "@playwright/test";

/**
 * 첫화면 → 회원가입 → 데이터 동의 → 홈 → 녹음 준비 → 녹음 → 분석 중까지
 * 이어지는 온보딩+녹음 핵심 플로우를 한 세션에서 검증한다.
 */
test("온보딩부터 녹음 분석 진행까지 전체 플로우", async ({ page }) => {
  await page.goto("/");

  await test.step("첫화면 → 회원가입 이동", async () => {
    await page.getByRole("link", { name: "말로 시작하기" }).click();
    await expect(page).toHaveURL("/signup");
  });

  await test.step("회원가입 폼 검증 — 조건 미충족 시 제출 버튼 비활성", async () => {
    const submit = page.getByRole("button", { name: "가입하기" });
    await expect(submit).toBeDisabled();

    await page.getByPlaceholder("name@example.com").fill("parent@example.com");
    await page.getByPlaceholder("8자 이상 입력해주세요").fill("password123");
    await page.getByPlaceholder("비밀번호를 한 번 더 입력해주세요").fill("mismatch");
    await expect(submit).toBeDisabled();

    await page.getByPlaceholder("비밀번호를 한 번 더 입력해주세요").fill("password123");
    await expect(submit).toBeDisabled(); // 약관 체크 전에는 여전히 비활성

    const checkboxes = page.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(2);
    await checkboxes.nth(0).click();
    await checkboxes.nth(1).click();
    await expect(submit).toBeEnabled();

    await submit.click();
    await expect(page).toHaveURL("/consent");
  });

  await test.step("데이터 동의 — 필수 2개만 체크하면 활성화", async () => {
    const submit = page.getByRole("button", { name: "동의하고 녹음 시작하기" });
    await expect(submit).toBeDisabled();

    await page.getByRole("checkbox").nth(0).click(); // 음성 녹음 수집 · 처리
    await expect(submit).toBeDisabled();
    await page.getByRole("checkbox").nth(1).click(); // STT 전사 · AI 분석
    await expect(submit).toBeEnabled();

    await submit.click();
    await expect(page).toHaveURL("/home");
  });

  await test.step("홈에서 녹음 시작 → 녹음 준비 화면", async () => {
    await page.getByRole("button", { name: /녹음 시작하기/ }).click();
    await expect(page).toHaveURL("/record/prepare");
  });

  await test.step("녹음 준비 — 상황 선택 상태 전환", async () => {
    const playChip = page.getByRole("button", { name: "🧸 놀이" });
    const mealChip = page.getByRole("button", { name: "🍽 식사" });

    await expect(playChip).toHaveAttribute("aria-pressed", "true");
    await expect(mealChip).toHaveAttribute("aria-pressed", "false");

    await mealChip.click();
    await expect(mealChip).toHaveAttribute("aria-pressed", "true");
    await expect(playChip).toHaveAttribute("aria-pressed", "false");

    await page.getByRole("button", { name: /녹음 시작하기/ }).click();
    await expect(page).toHaveURL("/record");
  });

  await test.step("녹음 화면 — 선택한 상황이 배지에 반영되고 타이머가 실제로 증가", async () => {
    await expect(page.getByText("하늘 · 식사 시간")).toBeVisible();

    const timer = page.getByTestId("record-timer");
    await expect(timer).toHaveText("00:00");
    await expect.poll(async () => timer.textContent(), { timeout: 3000 }).not.toBe("00:00");

    await page.getByRole("button", { name: "녹음 정지" }).click();
    await expect(page).toHaveURL("/record/processing");
  });

  await test.step("분석 진행 — 단계가 시간에 따라 순서대로 진행된다", async () => {
    const steps = page.getByTestId("processing-step");
    await expect(steps).toHaveCount(3);

    await expect(steps.nth(0)).toHaveAttribute("data-status", "done");
    await expect(steps.nth(1)).toHaveAttribute("data-status", "active");
    await expect(steps.nth(2)).toHaveAttribute("data-status", "pending");

    await expect(steps.nth(1)).toHaveAttribute("data-status", "done", { timeout: 4000 });
    await expect(steps.nth(2)).toHaveAttribute("data-status", "active");

    await expect(steps.nth(2)).toHaveAttribute("data-status", "done", { timeout: 4000 });
  });
});
