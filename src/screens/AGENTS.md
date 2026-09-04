<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# screens

## Purpose

16개 Figma 화면 각각을 하나의 디렉토리 + `index.tsx`로 구현한다. 화면이
많고 구조가 반복적이라(디렉토리당 파일 하나) 화면별 개별 AGENTS.md 대신
이 문서 하나에 전체 목록·라우트·플로우를 정리한다.

## Key Files

| File | Description |
|------|-------------|
| `ComingSoon.tsx` | 미구현 화면 자리표시자. `App.tsx`가 `screens.ts`의 `implemented: false` 항목에 렌더한다. "완료"를 위장하지 않도록 라벨과 Figma node-id를 그대로 노출한다 |

## Subdirectories — 16개 화면 전부 구현 완료

각 디렉토리는 `index.tsx` 하나로 화면 컴포넌트를 export한다. Figma
node-id는 컴포넌트 최상위 요소의 `data-node-id`와 아래 표에 남아 있다
(파일 `src/routes/screens.ts`가 원본 소스).

| 디렉토리 | 라우트 | Figma node | 화면 |
|---|---|---|---|
| `Onboarding/` | `/` | 1:9 | 첫화면 |
| `SignUp/` | `/signup` | 1:86 | 회원가입 |
| `Consent/` | `/consent` | 1:164 | 약관 동의(실제로는 첫 녹음 전 데이터 처리 동의) |
| `Home/` | `/home` | 1:257 | 메인화면 (탭 루트, `TabScreenLayout`) |
| `RecordPrepare/` | `/record/prepare` | 1:427 | "회원가입 후 자녀 등록"이라는 이름과 달리 실제로는 기존 자녀 확인 + 녹음 상황 선택 화면 |
| `Record/` | `/record` | 1:527 | 녹음 화면 (실시간 타이머) |
| `RecordProcessing/` | `/record/processing` | 1:570 | 분석 진행 3단계 자동 시뮬레이션 |
| `ReportSessions/` | `/report/sessions` | 1:640 | 녹음 세션 목록 (ReportHome 우측 상단 아이콘에서 진입) |
| `ReportHome/` | `/report` | 1:750 | 리포트 탭 루트 (탭 루트, `TabScreenLayout`) |
| `ReportDetail/` | `/report/detail` | 1:902 | 세션 리포트 상세 |
| `MetricDetail/` | `/report/open-question` | 1:1045 | 핵심 지표 상세 (하단 칩으로 지표 전환) |
| `Coaching/` | `/coaching` | 1:1135 | 코칭 탭 루트 (탭 루트, `TabScreenLayout`) |
| `CoachingScript/` | `/coaching/script` | 1:1232 | 코칭 스크립트 전체 보기 |
| `ReportExport/` | `/report/export` | 1:1295 | 리포트 내보내기 |
| `Settings/` | `/settings` | 1:1370 | 설정 탭 루트 (탭 루트, `TabScreenLayout`) |
| `SettingsDelete/` | `/settings/delete` | 1:1488 | 데이터 삭제 요청 |

### 화면 이름과 실제 내용이 다른 곳 (구현 중 발견)

Figma에서 정리된 화면명이 실제 화면 역할과 다른 경우가 있었다 — 새
화면을 추가하거나 기존 화면을 고칠 때 이름만 보고 오해하지 않도록
남겨둔다.

- `Consent`(1:164, "약관 동의"): 서비스 이용약관이 아니라 **첫 녹음 전
  음성 수집·STT 분석 데이터 처리 동의** 화면.
- `RecordPrepare`(1:427, "회원가입 후 자녀 등록"): 자녀 등록 폼이
  아니라 **이미 등록된 자녀를 확인하고 녹음 상황(식사/놀이/잠자리/등원)을
  고르는** 녹음 준비 화면. 다자녀 관리는 사업계획서상 후속 버전 범위라
  이 프로토타입엔 자녀 등록 폼 자체가 없다.
- `ReportSessions`(1:640): 라벨은 "리포트 화면 - 우측 상단 리포트 버튼
  클릭"이지만 실제로는 `ReportHome`의 문서 아이콘 버튼에서 진입하는
  세션 목록.

### 핵심 플로우

```
/ → /signup → /consent → /home
/home → /record/prepare → /record → /record/processing → /home
/home,/report(탭) → /report → /report/sessions (문서 아이콘)
/report → /report/detail (세션 리포트 보기) → /report/open-question (핵심 지표 자세히)
/report/detail → /report/export (공유 아이콘)
/report/detail, /coaching(탭) → /coaching → /coaching/script (스크립트 전체 보기)
/settings(탭) → /settings/delete → (삭제 요청하기) 접수 완료 상태로 전환
```

탭 루트 4개(`Home`, `ReportHome`, `Coaching`, `Settings`)는 하단
`TabBar`가 붙는 화면이고, 나머지는 뒤로가기 버튼이 있는 drill-in
화면이다 — 새 화면이 탭 루트인지 drill-in인지는 Figma에서 하단 탭바
레이어(`Tabs`)가 있는지로 구분했다.

## For AI Agents

### Working In This Directory
- 새 화면 컴포넌트는 이 디렉토리 규칙을 그대로 따른다: 디렉토리 이름은
  PascalCase, 파일은 `index.tsx` 하나, 최상위 요소에
  `data-node-id="<figma id>"`, 컴포넌트 바로 위에 한 줄 주석으로
  `/** Figma node X:Y "이름" — 한 줄 설명 */`.
- 탭 루트 화면은 `<TabScreenLayout>`으로 감싸고, drill-in 화면은
  뒤로가기 버튼(`onClick={() => navigate(-1)}`, `aria-label="뒤로 가기"`)을
  좌상단에 둔다 — 기존 화면 전부 이 패턴.
- 여러 화면이 겹치는 콘텐츠(예: 코칭 스크립트)는 화면 컴포넌트에
  중복 정의하지 않고 `src/data/`의 공용 모듈에서 가져온다.
- Figma 화면명이 실제 내용과 다르면(위 사례처럼) 라우트 경로는 실제
  역할에 맞게 짓고, 이 표에 근거를 남긴다 — 이름만 보고 다음 사람이
  잘못된 라우팅을 이어가지 않게 하기 위함.

### Testing Requirements
새 화면을 추가하면 `e2e/`에 최소 하나의 시나리오(라우팅 + 화면 안의
주요 상태 전환)를 추가하고, `npm run shoot && npm run pixel-diff`로
Figma 원본과 대조한다.

### Common Patterns
- 더미 상태 전환(체크박스, 필터, 칩 선택 등)은 실제로 동작하게
  구현한다 — 정적 디자인과 실제 동작이 어긋나면 동작을 택한다는 게
  이 레포의 원칙(`CLAUDE.md` 7번).
- 테스트 훅으로 `data-testid`와 표준 접근성 속성(`aria-current`,
  `aria-pressed`, `role="radio"`/`role="checkbox"` + `aria-checked`)을
  적극 활용한다 — `e2e/`의 기존 스펙이 이 패턴을 그대로 쓴다.

## Dependencies

### Internal
- `src/components/TabScreenLayout.tsx`, `TabBar.tsx`, `ScrollArea.tsx`
- `src/store/recordingStore.ts` (RecordPrepare → Record 간 선택한 상황 전달)
- `src/data/*` (더미 데이터 전반)

<!-- MANUAL: -->
