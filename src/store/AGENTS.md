<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# store

## Purpose

화면 간에 유지돼야 하는 소수의 전역 상태를 Zustand로 관리한다. 화면
내부에서만 쓰는 상태(체크박스, 필터, 라디오 선택 등)는 여기 두지 않고
각 화면 컴포넌트의 `useState`로 처리한다 — 이 디렉토리는 "다른 화면에서
읽어야 하는" 상태만 올라온다.

## Key Files

| File | Description |
|------|-------------|
| `recordingStore.ts` | `RecordPrepare`에서 고른 상황(`situationId`)을 `Record` 화면이 읽기 위한 세션 상태. 실제로 사용 중 |
| `uiStore.ts` | 모달/바텀시트 같은 오버레이를 열고 닫기 위한 전역 상태 구조. **아직 어떤 화면도 실제 오버레이를 쓰지 않아 사용되지 않는 상태** — 이 프로토타입엔 오버레이 UI가 없다. 2단계에서 실제 모달이 필요해지면 이 store를 확장해서 쓴다 |

## For AI Agents

### Working In This Directory
- 오버레이(모달·바텀시트)를 추가하게 되면 URL을 바꾸는 라우트로 만들지
  말고 `uiStore.ts`의 `openOverlay`/`closeOverlay`로 연다/닫는다 —
  한 곳(`AppModals`류 컴포넌트, 아직 없음)에서 렌더하고 `activeOverlay`
  값에 따라 분기하는 패턴을 권장.
- 새 전역 상태를 추가하기 전에 정말 여러 화면이 공유해야 하는지
  먼저 판단한다. 대부분의 상태는 로컬 `useState`로 충분하다 — 지금
  구현된 16개 화면 중 라디오/체크박스/필터/탭 상태는 전부 로컬이고,
  화면을 넘나드는 것만(`recordingStore`) 전역으로 뺐다.

### Testing Requirements
전역 상태는 그 상태를 쓰는 화면들의 e2e 시나리오로 간접 검증한다.
예: `e2e/signup-record-flow.spec.ts`가 `RecordPrepare`에서 상황을
바꾼 뒤 `Record` 화면 배지 텍스트("하늘 · 식사 시간")로
`recordingStore`가 제대로 전달됐는지 확인한다.

## Dependencies

### External
zustand 5 (`create`)

<!-- MANUAL: -->
