<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# api

## Purpose

도메인별 HTTP 클라이언트 모듈이 들어갈 자리. 화면 컴포넌트는 이
디렉토리의 모듈만 거쳐서 통신하고, axios 인스턴스를 직접 import하지
않는다(2단계 원칙). **1단계(현재)는 백엔드가 없어 이 디렉토리가
비어 있다** — `README.md` 한 장만 있다.

## Key Files

| File | Description |
|------|-------------|
| `README.md` | 이 디렉토리가 왜 비어 있는지, 2단계에서 어떤 모듈이 들어올 예정인지 설명 |

## For AI Agents

### Working In This Directory
- 지금은 어떤 화면도 이 디렉토리를 import하지 않는다 — 데이터는 전부
  `src/data/`의 더미 모듈에서 온다. 실제 API 연동은 2단계 범위.
- 2단계 착수 시 `report.ts`, `record.ts`, `auth.ts`, `child.ts`,
  `settings.ts` 등으로 채울 예정(`README.md`에 명시). 인증 토큰
  첨부·401 처리는 axios 인터셉터가 전담하고, 화면 코드는 도메인
  함수만 호출하는 형태를 유지한다.

## Dependencies

### External
Axios(설치는 돼 있으나 아직 어디서도 import하지 않음)

<!-- MANUAL: -->
