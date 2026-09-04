<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# e2e

## Purpose

Playwright 기능 자동 검증. 화면 캡처(픽셀 대조)가 "생김새"를 확인한다면
이 디렉토리는 "동작"을 확인한다 — 폼 검증, 상태 전환(체크박스/필터/칩),
라우팅, 타이머, 탭바 고정 레이어 등. `playwright.config.ts`가
`testDir: "./e2e"`로 이 디렉토리를 지정하고, 로케일은 `ko-KR`로 고정돼
있다(기본 로케일 en-US로 돌리면 한글 텍스트 탐색이 깨진다).

## Key Files

| File | Description |
|------|-------------|
| `signup-record-flow.spec.ts` | 첫화면 → 회원가입(폼 검증) → 데이터 동의 → 홈 → 녹음 준비(상황 선택) → 녹음(실시간 타이머) → 분석 진행(단계별 자동 전환)까지 전체 온보딩+녹음 플로우 1개 테스트 |
| `tab-navigation.spec.ts` | 하단 탭 4개 전환 + `aria-current` 갱신, 스크롤해도 탭바 위치 고정 |
| `report-flow.spec.ts` | 성장 추이 주간/월간 전환(데이터 포인트 수 검증), 세션 목록 상태 필터, 지표 상세 칩 전환 |
| `coaching-and-settings-flow.spec.ts` | 코칭 미션 체크 토글, 리포트 내보내기 라디오/형식 선택, 데이터 삭제 요청 접수 상태 전환 |

## For AI Agents

### Working In This Directory
- 셀렉터는 접근성 속성 우선(`getByRole`, `aria-*`)으로 쓴다. 화면
  컴포넌트에 이미 `data-testid`(예: `record-timer`, `processing-step`,
  `trend-sparkline`, `session-item`, `metric-label`/`metric-value`,
  `scroll-area`, `delete-confirmation`)와 `aria-current`/`aria-pressed`/
  `role="radio"`+`aria-checked` 등이 붙어 있으니 먼저 찾아보고, 없으면
  화면 컴포넌트에 최소한만 추가한다(시각 결과물은 바꾸지 않는다).
- `getByRole('button', { name: '...' })`를 쓸 때 버튼 텍스트가 다른
  버튼의 부분 문자열이 될 수 있으면(예: "보기" vs "미션 보기 →")
  `{ exact: true }`를 반드시 쓴다 — 이 디렉토리 기존 스펙에서 실제로
  겪은 함정.
- 시간 의존적 검증(타이머, 단계 자동 전환)은 `expect.poll`이나
  `toHaveAttribute(..., { timeout })`로 폴링하고, 특정 시각을
  하드코딩하지 않는다 — 기대값도 실행 시점 기준으로 판단한다.

### Testing Requirements
```bash
npm run test:e2e
```
`playwright.config.ts`의 `webServer`가 dev 서버를 자동으로 띄운다
(이미 떠 있으면 재사용). 새 화면/상태 전환을 추가하면 최소 한 개
시나리오를 이 디렉토리에 추가한다.

### Common Patterns
- 브라우저 엔진은 Chromium으로 통일돼 있다(`playwright.config.ts`).
  `devices['iPhone 15']` 같은 기기 프리셋은 WebKit을 요구해 별도
  설치가 필요해지므로 쓰지 않고, 뷰포트만 393×852로 맞춘다.

## Dependencies

### Internal
`src/screens/*`, `src/components/TabBar.tsx`, `src/components/Sparkline.tsx`
등 테스트 훅이 붙은 컴포넌트 전반.

### External
`@playwright/test`

<!-- MANUAL: -->
