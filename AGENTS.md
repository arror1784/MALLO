<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# MALLO

## Purpose

부모-자녀 대화를 녹음·분석해 맞춤 코칭을 제공하는 학부모 대상 에듀테크
서비스 "말로(MALLO)"의 **1단계 화면 프로토타입** 저장소. Figma 디자인을
iOS 393×852 단일 뷰포트 기준 웹(React+Vite) 프로토타입으로 옮겨
화면·플로우를 캡처·검증하는 것이 이 레포의 목표다. 실제 네이티브 앱이
아니며, 백엔드 연동 없이 더미 데이터만 사용한다. 서비스 기획 배경은
`MALLO_사업계획서.md`, 1단계 작업 방식의 상세 근거는
`MALLO-화면작업-브리핑.md` 참고.

**저장소 운영 규칙(절대 규칙)은 `CLAUDE.md`에 있다 — 이 AGENTS.md 계층은
그 규칙을 전제로 각 디렉토리의 구조를 안내하는 보조 문서다.** 두 문서가
어긋나면 `CLAUDE.md`를 따른다.

## Key Files

| File | Description |
|------|-------------|
| `CLAUDE.md` | 이 레포의 절대 규칙(인프라 경계, 커밋 정책, 아키텍처 규칙, 검증 방식) |
| `README.md` | 로컬 실행/스크립트 명령어 |
| `MALLO_사업계획서.md` | 서비스 기획 배경 문서 (구현 최신 상태 반영 안 함) |
| `MALLO-화면작업-브리핑.md` | 1단계 착수 시점 작업 방식 브리핑 (착수 시점 참고 자료) |
| `package.json` | `dev`/`build`/`typecheck`/`shoot`/`pixel-diff`/`test:e2e` 스크립트 |
| `index.html` | Vite 엔트리. Pretendard 웹폰트(jsdelivr CDN)를 여기서 로드한다 |
| `vite.config.ts` | React + Tailwind v4 플러그인, `@` → `src/` 별칭 |
| `playwright.config.ts` | e2e 테스트 설정. iOS 393×852 뷰포트, ko-KR 로케일 고정, Chromium 기반 |
| `tsconfig*.json` | 프로젝트 참조형 TS 설정(app/node 분리) |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `src/` | 애플리케이션 소스 (see `src/AGENTS.md`) |
| `e2e/` | Playwright 시나리오 테스트 (see `e2e/AGENTS.md`) |
| `scripts/` | 캡처·픽셀 대조 자동화 스크립트 (see `scripts/AGENTS.md`) |
| `pixel-diff/` | Figma 원본 vs 구현 픽셀 대조 자산·산출물 (see `pixel-diff/AGENTS.md`) |
| `docs/` | 부록 문서 (see `docs/AGENTS.md`) |
| `screenshots/` | `npm run shoot` 산출물. 매번 재생성되며 커밋 대상 아님(gitignore) |

## For AI Agents

### Working In This Directory
- 이 레포는 **프론트엔드 화면/플로우 코드까지만** 책임진다. 백엔드 API,
  인증 서버, 스토어 배포 파이프라인은 범위 밖 — 경계 밖 변경이 필요해
  보이면 실행 전 사용자에게 먼저 확인한다(`CLAUDE.md` 1번).
- Figma 소스: `https://www.figma.com/design/KGjqGDv3jZO3WxZvDs278x/MALLO`.
  구현 대상 화면 16개와 node-id 매핑은 `src/routes/screens.ts`가 단일
  소스다. 새 화면을 추가할 때도 이 파일 하나만 고치면 라우터·캡처
  스크립트·픽셀 대조 스크립트가 전부 따라간다.
- 커밋/푸시는 검증(빌드·타입체크·주요 동작 확인) 후 진행한다. 이
  프로젝트에서는 사용자가 체크포인트마다 자동으로 push해 달라고
  명시적으로 요청한 상태다(`CLAUDE.md` 2번) — 단 `--force`나 히스토리
  재작성은 여전히 확인 필요.
- 응답은 항상 한글로.

### Testing Requirements
```bash
npm run typecheck   # tsc -b --noEmit
npm run build       # tsc -b && vite build
npm run shoot        # 전체 16화면 스크린샷 캡처 (dev 서버 필요)
npm run pixel-diff   # Figma 원본 대비 픽셀 대조 (shoot 먼저)
npm run test:e2e     # Playwright 시나리오 8개
```

### Common Patterns
- 디자인 토큰은 `src/index.css`의 `@theme` 블록 하나가 유일한 소스.
  컴포넌트에서 색상 리터럴 직접 쓰지 않는다.
- 화면 컴포넌트는 `src/screens/<Name>/index.tsx` 하나로 끝나는 게
  기본형. 상세 규칙은 `src/screens/AGENTS.md`.
- Figma에서 뽑은 아이콘은 `src/assets/icons/`에 다운로드해 커밋
  (asset URL은 ~7일 후 만료).

## Dependencies

### External
- React 19 + TypeScript 7 + Vite 8 (Rolldown 번들러)
- Tailwind CSS 4 (`@tailwindcss/vite`, CSS 기반 `@theme` 설정)
- Zustand 5 (전역 상태)
- react-router 8 (`react-router-dom` 아님 — 패키지명이 바뀌었다)
- Axios (1단계는 도메인 모듈 자리만 비워둠)
- Playwright(`@playwright/test`) — e2e 테스트 + 캡처 스크립트
- sharp / pixelmatch / pngjs — 픽셀 대조 스크립트 전용

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
