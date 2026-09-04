<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# scripts

## Purpose

화면 검증 자동화 스크립트 2개. 둘 다 `src/routes/screens.ts`를
`import("../src/routes/screens.ts")`로 동적 로드해 화면 목록을
얻는다 — Node의 네이티브 TS 타입 스트리핑(별도 로더 불필요, 타입
전용 구문만 있으면 동작)에 의존하므로, `screens.ts`에 런타임 동작이
필요한 구문(enum, namespace 등)을 넣지 않는다.

## Key Files

| File | Description |
|------|-------------|
| `shoot.mjs` | dev 서버(`http://localhost:5173`, `SHOOT_BASE_URL`로 변경 가능)가 떠 있는 상태에서 Playwright로 각 화면을 iOS 393×852 뷰포트 하나로 스크린샷 떠서 `screenshots/`에 저장. 파일명은 `${순번}_${label}.png` |
| `pixel-diff.mjs` | `pixel-diff/reference/`(Figma 원본)와 `screenshots/`(위 스크립트 결과)를 화면별로 비교해 좌(원본)/중(구현)/우(차이) 3분할 합성 이미지를 `pixel-diff/output/`에, 불일치율 리포트를 `pixel-diff/REPORT.md`·`report.json`에 저장 |

## For AI Agents

### Working In This Directory
- 실행 순서는 항상 `shoot.mjs` 먼저, `pixel-diff.mjs` 나중이다 —
  후자가 전자의 산출물(`screenshots/`)을 입력으로 쓴다.
- `pixel-diff.mjs`의 WARN(≥3%)/FAIL(≥10%) 임계값은 파일 상단 상수
  (`WARN_THRESHOLD`, `FAIL_THRESHOLD`)에 있다. 화면에 텍스트가 많이
  쌓일수록 line-height 미세 오차가 누적돼 WARN이 잘 뜨는 경향이
  있었다 — 임계값을 조정하기 전에 `pixel-diff/output/`의 합성
  이미지로 실제 원인(레이아웃 버그 vs 폰트/줄간격 오차)을 먼저
  확인한다.
- 두 스크립트 모두 화면이 추가되면 `screens.ts` 하나만 고치면
  자동으로 대상에 포함된다 — 스크립트 자체를 고칠 필요는 거의 없다.

### Testing Requirements
```bash
npm run shoot        # dev 서버(npm run dev) 실행 중이어야 함
npm run pixel-diff    # shoot 먼저 실행 필요
```

## Dependencies

### Internal
`src/routes/screens.ts`, `src/components/DeviceFrame.tsx`의
`[data-device-frame]` 셀렉터(캡처 대상)

### External
- `@playwright/test` (`shoot.mjs`)
- `sharp`, `pixelmatch`, `pngjs` (`pixel-diff.mjs` 전용 — 리사이즈·합성·픽셀
  비교)

<!-- MANUAL: -->
