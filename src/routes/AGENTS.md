<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# routes

## Purpose

화면 목록의 단일 소스. `App.tsx`(라우터)와 `scripts/shoot.mjs`(캡처),
`scripts/pixel-diff.mjs`(픽셀 대조)가 전부 이 디렉토리의 `screens.ts`
하나를 참조한다 — 화면이 늘어나도 여기 한 곳만 고치면 세 곳 모두 자동
반영된다.

## Key Files

| File | Description |
|------|-------------|
| `screens.ts` | `ScreenEntry[]` — `path`(라우트), `label`(한글 화면명), `figmaNodeId`(추적용), `implemented`(구현 여부) |

## For AI Agents

### Working In This Directory
- 새 화면을 추가할 때 이 배열의 순서는 Figma 캔버스에서 node-id
  오름차순 = 실제 디자인 흐름 순서라는 가정하에 정렬돼 있다(구현
  과정에서 이 가정이 맞았다 — `src/screens/AGENTS.md`의 "핵심 플로우"
  참고). 중간에 화면을 끼워 넣을 땐 이 순서 감각을 유지한다.
- `label`은 Figma 원본 화면명을 그대로 쓴다 — 실제 라우트 경로/역할이
  Figma 이름과 다르더라도(예: 1:640, 1:427) `label`은 안 바꾸고
  `path`만 실제 역할에 맞게 짓는다. 이름-역할 불일치 근거는
  `src/screens/AGENTS.md`에 남긴다.
- `implemented: false`인 항목은 `App.tsx`가 자동으로 `ComingSoon`
  컴포넌트를 렌더한다 — 화면을 구현하면 대응하는 `implemented`를
  `true`로 바꾸는 걸 잊지 않는다(캡처·픽셀 대조 스크립트가 이 값으로
  대상을 가른다).

### Testing Requirements
`screens.ts`를 고치면 `npm run typecheck`로 `App.tsx`의
`implementedComponents` 매핑과 어긋나지 않는지 확인한다. `npm run shoot`
결과 파일명이 `${순번}_${label}.png` 형태로 나오므로, `pixel-diff/reference/`의
파일명과도 맞아야 한다(둘 다 이 배열의 인덱스+label 조합으로 생성).

## Dependencies

### Internal
`App.tsx`, `scripts/shoot.mjs`, `scripts/pixel-diff.mjs`가 이 파일을
동적 import한다.

<!-- MANUAL: -->
