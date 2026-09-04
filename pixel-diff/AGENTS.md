<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# pixel-diff

## Purpose

`scripts/pixel-diff.mjs`가 쓰는 자산과 산출물. Figma 원본 캡처와 구현
캡처를 화면별로 대조한 결과가 여기 모인다.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `reference/` | Figma `get_screenshot`으로 받은 16개 화면 원본 PNG(393×852). **커밋 대상** — asset URL이 ~7일 후 만료돼 재요청 없인 다시 못 받는다 |
| `output/` | `pixel-diff.mjs` 실행 시 생성되는 좌/중/우 3분할 합성 이미지. **gitignore 대상** — `npm run shoot && npm run pixel-diff`로 언제든 재생성 가능 |

## Key Files (실행 후 생성, gitignore 대상)

| File | Description |
|------|-------------|
| `report.json` | 화면별 불일치 픽셀 수·비율·판정을 담은 원자료 |
| `REPORT.md` | 불일치율 높은 순 표 + 각 화면의 합성 이미지 링크 |

## For AI Agents

### Working In This Directory
- `reference/`의 파일명은 `src/routes/screens.ts`의 순번+label과
  정확히 일치해야 `pixel-diff.mjs`가 짝을 찾는다
  (`${순번}_${label}.png`, `screenshots/`와 동일한 규칙).
- 화면을 새로 추가하면 이 디렉토리에 대응하는 reference 이미지가
  없다 — Figma MCP `get_screenshot`(node-id, `maxDimension: 852`)으로
  받아 `reference/`에 커밋해야 그 화면의 픽셀 대조가 동작한다. 안
  받으면 `pixel-diff.mjs`가 해당 화면을 SKIP으로 표시할 뿐 실패하지는
  않는다.
- WARN/FAIL 판정을 볼 때 숫자만 보지 말고 `output/`의 합성 이미지를
  직접 열어본다 — 실제로 폰트 로딩 문제(가설이었지만 아니었음)와
  line-height 누적 오차(실제 원인으로 추정)를 구분한 것도 합성
  이미지를 직접 봐서 알아낸 것이다(`scripts/AGENTS.md` 참고).

<!-- MANUAL: -->
