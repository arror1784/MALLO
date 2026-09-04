<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# src

## Purpose

애플리케이션 소스 전체. 라우팅(`App.tsx`)이 `src/routes/screens.ts`의
화면 목록을 순회해 구현된 화면(`src/screens/`)과 미구현 자리표시자
(`ComingSoon`)를 매핑하고, 모든 화면을 고정 크기 `DeviceFrame`(iOS
393×852) 안에서 렌더링한다.

## Key Files

| File | Description |
|------|-------------|
| `main.tsx` | 엔트리. `BrowserRouter` + `App` 마운트, `index.css` 임포트 |
| `App.tsx` | `screens.ts`를 순회해 `<Routes>` 생성, 구현된 경로만 실제 컴포넌트 매핑 |
| `index.css` | Tailwind v4 진입점 + `@theme` 디자인 토큰(색·폰트) 단일 소스 |
| `vite-env.d.ts` | Vite 클라이언트 타입(`*.svg`, `*.svg?raw`, `import.meta.env`) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `screens/` | 화면별 컴포넌트, 16개 + `ComingSoon` (see `screens/AGENTS.md`) |
| `components/` | 화면 간 공유 UI 컴포넌트 (see `components/AGENTS.md`) |
| `data/` | 더미 데이터 모듈 (see `data/AGENTS.md`) |
| `store/` | Zustand 전역 상태 (see `store/AGENTS.md`) |
| `routes/` | 화면 목록 단일 소스(`screens.ts`) (see `routes/AGENTS.md`) |
| `api/` | 도메인별 HTTP 모듈 자리 — 1단계는 비어 있음 (see `api/AGENTS.md`) |
| `assets/` | Figma에서 받아 커밋한 아이콘 자산 (see `assets/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- 새 화면을 추가하는 표준 순서: ① `src/routes/screens.ts`에 경로·라벨·
  Figma node-id 추가 → ② `src/screens/<Name>/index.tsx` 작성 → ③
  `App.tsx`의 `implementedComponents`에 등록 → ④ `implemented: true`로
  변경. 이 순서를 지키면 캡처 스크립트·픽셀 대조 스크립트가 자동으로
  새 화면을 인식한다.
- 컴포넌트에서 색상 리터럴(`#fff`, `text-[#...]`)을 직접 쓰지 않는다.
  `index.css`의 `@theme` 토큰 이름으로만 참조 — Figma에서 새 색이
  나오면 토큰을 추가한다.
- 이미지/아이콘은 직접 그리지 않는다. `get_design_context`가 반환하는
  asset URL을 다운로드해 `src/assets/icons/`에 커밋한다.

### Testing Requirements
루트 `AGENTS.md`의 스크립트 참고. 화면을 고치면 최소한
`npm run typecheck`와 해당 화면이 걸린 `npm run test:e2e` 시나리오를
돌려본다.

### Common Patterns
- 오버레이(모달·바텀시트)는 라우트가 아니라 `store/uiStore.ts`로 연다/
  닫는다 — 단 이 저장소는 아직 실제로 오버레이를 쓰는 화면이 없어
  `uiStore.ts`는 구조만 잡혀 있고 사용되지 않는 상태다.
- 고정 레이어(헤더/탭바)와 스크롤 영역은 분리한다.
  `components/TabScreenLayout.tsx` + `components/ScrollArea.tsx` 참고.

## Dependencies

### Internal
- `routes/screens.ts` ↔ `App.tsx` ↔ `screens/*`: 세 곳이 항상 같은
  경로 문자열을 공유해야 라우팅이 깨지지 않는다.

### External
- react-router 8 (`BrowserRouter`, `Routes`, `Link`, `useNavigate`)
- zustand 5

<!-- MANUAL: -->
