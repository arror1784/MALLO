<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# components

## Purpose

여러 화면이 공유하는 UI 컴포넌트. 화면 전용 하위 컴포넌트(예: 특정
화면 안에서만 쓰는 카드)는 여기 두지 않고 해당 화면 파일 안에 로컬로
둔다 — 이 디렉토리는 두 화면 이상에서 실제로 재사용되는 것만 올린다.

## Key Files

| File | Description |
|------|-------------|
| `DeviceFrame.tsx` | iOS 393×852 고정 프레임. 내부 좌표를 절대 줄이지 않고 `transform: scale`로만 축소 — 캡처/픽셀 대조 스크립트가 `[data-device-frame]`을 찾는다 |
| `TabScreenLayout.tsx` | 하단 탭바가 있는 화면(홈/리포트/코칭/설정)의 공통 뼈대. `ScrollArea` + `TabBar` 조합 |
| `TabBar.tsx` | 하단 탭 4개. `<img>`가 SVG의 `currentColor`를 상속 못 해 `?raw` import로 SVG를 인라인 삽입하는 패턴 사용 (상세: 아래 "겪은 문제") |
| `ScrollArea.tsx` | 스크롤 본문 래퍼. 고정 레이어(헤더/탭바)는 이 컴포넌트 밖 형제로 둔다. `data-testid="scroll-area"`로 e2e에서 스크롤 시뮬레이션 |
| `CheckRow.tsx` | 체크박스 + 라벨 + "전체보기" 버튼 행. SignUp/Consent 공용 |
| `MetricProgressBar.tsx` | 참고 범위 내 위치를 점-트랙으로 표시. `progress: 0~1` prop |
| `Sparkline.tsx` | 더미 수치 배열로 그리는 라인 차트(정적 이미지 아님). `testId` prop으로 e2e에서 `data-point-count` 검증 가능 |

## For AI Agents

### Working In This Directory
- 새 컴포넌트를 추가하기 전에 이미 있는 걸 재사용할 수 있는지 먼저
  확인한다 (`figma-design-to-code` 스킬의 "Reuse what the project
  already has" 원칙과 동일).
- 색상은 항상 `src/index.css`의 `@theme` 토큰(Tailwind 클래스 또는
  `var(--color-*)`)으로만 참조한다.

### 겪은 문제 — SVG currentColor
`<img src="icon.svg">`는 SVG 내부의 `currentColor`를 상속하지 못한다.
탭 아이콘처럼 활성/비활성 색이 바뀌어야 하는 경우, React 19.2에서
`style={{ maskImage: ... }}` 인라인 스타일이 렌더 시 통째로 드롭되는
현상까지 겹쳐 CSS mask 방식은 포기하고, `import icon from "./x.svg?raw"`
로 raw SVG 문자열을 받아 `dangerouslySetInnerHTML`로 인라인 삽입하는
방식으로 우회했다(`TabBar.tsx` 참고). 같은 문제가 다시 나오면 이
패턴을 먼저 시도한다.

### Testing Requirements
컴포넌트 자체 단위 테스트는 없다 — `e2e/`의 화면 시나리오가 간접적으로
검증한다. 새 공용 컴포넌트를 추가하면 그 컴포넌트를 쓰는 화면의 e2e
시나리오에 최소 한 줄 추가하는 걸 권장.

## Dependencies

### Internal
- `src/index.css`의 디자인 토큰
- `TabBar.tsx` → `src/assets/icons/tab-*.svg`

### External
- react-router (`TabBar.tsx`의 `Link`, `useLocation`)

<!-- MANUAL: -->
