<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# data

## Purpose

1단계는 백엔드가 없으므로 화면에 보여줄 값은 전부 이 디렉토리의 더미
데이터 모듈에서 가져온다. 화면 컴포넌트 안에 데이터를 하드코딩하지
않고 여기로 분리해두면, 같은 데이터를 여러 화면이 공유하기 쉽고(예:
`child.ts`) 2단계에서 실제 API 응답으로 교체할 때 손댈 자리가
명확해진다.

## Key Files

| File | Description |
|------|-------------|
| `child.ts` | 현재 자녀(`currentChild`) — 다자녀 관리는 후속 버전 범위라 단일 자녀만 가정 |
| `situations.ts` | 대화 상황 4종(식사/놀이/잠자리/등원) — `RecordPrepare`에서 선택 |
| `recordings.ts` | Home 화면 "최근 녹음" 목록용 더미(2건) |
| `sessions.ts` | `ReportSessions`용 세션 목록(완료/분석중/실패 각 1건) — `recordings.ts`와 별도 모델, 화면마다 필요한 필드가 달라 통합하지 않았다 |
| `reportSummary.ts` | Home의 "최신 리포트" 요약 카드 데이터 |
| `sessionMetrics.ts` | `ReportDetail`의 3개 핵심 지표 + 참고 범위 진행도 |
| `metricDetails.ts` | `MetricDetail`의 지표별(열린 질문/발화량/어휘 다양도/감정 반응) 값·설명·월령별 참고 표 |
| `weeklyTrend.ts` | `ReportHome`의 성장 추이(주간/월간) + 이번 주 돌아보기 3개 카드 |
| `coaching.ts` | `Coaching`/`CoachingScript`가 공유하는 오늘의 스크립트·미션 |

## For AI Agents

### Working In This Directory
- 한 화면에서만 쓰는 데이터를 무리하게 여기로 빼지 않는다 — 두 화면
  이상이 같은 데이터를 참조하거나, 데이터 모양이 복잡해 컴포넌트
  파일을 어지럽힐 때만 분리한다.
- 날짜/시간 값을 상수로 박지 않는다. 상대적 표현("오늘 오후 5:20")은
  괜찮지만 실행 시점에 따라 달라져야 하는 값은 컴포넌트에서 실계산한다.
- 새 더미 데이터를 추가할 때도 타입을 export해서(`interface`/`type`)
  화면 컴포넌트와 e2e 테스트가 값 형태를 재사용할 수 있게 한다.

### Testing Requirements
데이터 모듈 자체는 순수 상수라 별도 테스트가 없다. 값을 바꾸면 그
값을 화면에서 검증하는 e2e 테스트(`e2e/report-flow.spec.ts` 등)가
깨지지 않는지 확인한다 — 특히 `sessions.ts`(개수·상태)와
`weeklyTrend.ts`(배열 길이)는 테스트가 정확한 값에 의존한다.

## Dependencies

### Internal
`src/screens/*`가 이 디렉토리 전체를 소비한다. 역방향 의존은 없다
(data → screens 참조 금지).

<!-- MANUAL: -->
