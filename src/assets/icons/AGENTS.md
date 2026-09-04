<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# icons

## Purpose

Figma에서 다운로드해 커밋한 SVG 아이콘 36개. 파일명은 아이콘의 시각적
역할을 나타내는 kebab-case이고, Figma의 원래 asset id와는 무관하다 —
여러 화면이 시각적으로 같은 아이콘(예: 뒤로가기 화살표)을 쓰는 경우
`diff -q`로 중복을 확인해 하나로 합쳤다(예: `back.svg`는 8개 화면이
공유).

## Key Files

| 파일 | 쓰이는 곳 / 역할 |
|---|---|
| `back.svg` | 뒤로가기 화살표 — drill-in 화면 대부분이 공유 |
| `close.svg` | 닫기(X) — Record 화면 |
| `arrow-right.svg`, `arrow-right-white.svg`, `arrow-small-orange.svg` | CTA 버튼 안의 화살표(검정/흰색/작은 주황) |
| `chevron-down.svg`, `chevron-down-outline.svg` | 아래 화살표(자녀 선택 드롭다운) — 화면마다 정확한 asset가 미세하게 달라 두 벌 유지 |
| `chevron-right.svg`, `chevron-right2.svg` | 오른쪽 화살표(리스트 행 이동) — 위와 동일한 이유로 두 벌 |
| `check-circle.svg`, `check-sm.svg` | 완료 체크 아이콘(권한 허용 배너 / 처리 단계) |
| `document.svg`, `image-export.svg`, `pdf-export.svg`, `share.svg`, `share2.svg` | 리포트 내보내기 관련(문서/이미지 저장/PDF 저장/공유, 화면마다 미세하게 다른 asset 두 벌 존재) |
| `person.svg`, `volume.svg`, `clock.svg` | RecordPrepare "더 정확한 분석을 위해" 팁 3종 |
| `mic.svg`, `mic-dark.svg`, `record-stop.svg` | 녹음 시작/정지 아이콘 |
| `headset.svg` | 분석 진행 화면 캐릭터 아이콘 |
| `shield.svg` | Consent 화면 "말로의 데이터 약속" |
| `sparkle.svg`, `info.svg`, `info-outline.svg` | 홈/리포트 팁 배너 |
| `plus.svg`, `logout.svg`, `trash.svg`, `retry.svg` | 설정/세션 목록의 추가·로그아웃·삭제·재시도 |
| `apple.svg` | SignUp 소셜 로그인 |
| `tab-home.svg`, `tab-report.svg`, `tab-coaching.svg`, `tab-settings.svg` | 하단 탭바 4개. `TabBar.tsx`가 `?raw` import로 인라인 삽입해 `currentColor`로 활성/비활성 색을 입힌다 — stroke 색을 `currentColor`로 sed 치환해뒀다 |

## For AI Agents

### Working In This Directory
- 새 아이콘을 받기 전에 기존 파일과 시각적으로 같은지 먼저 의심한다
  (`diff -q new.svg existing.svg`). 같으면 새로 만들지 않고 기존
  파일을 재사용한다 — 이 디렉토리의 여러 파일이 이미 그렇게
  중복 제거된 결과다.
- `<img src="...">`로 쓸 아이콘은 원본 그대로 두면 되지만, 색이
  동적으로 바뀌어야 하는 아이콘(탭바처럼)은 `?raw` import +
  `currentColor` 패턴을 쓴다 — `src/components/AGENTS.md`의 "겪은
  문제" 참고.
- 파일명은 새로 받을 때 아이콘의 역할을 보고 짓는다(Figma가 주는
  asset id를 그대로 파일명으로 쓰지 않는다).

<!-- MANUAL: -->
