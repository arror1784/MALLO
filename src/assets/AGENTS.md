<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-09-04 | Updated: 2026-09-04 -->

# assets

## Purpose

Figma `get_design_context`가 반환한 asset URL(만료 ~7일)을 다운로드해
커밋해둔 정적 자산. 현재는 아이콘(SVG)만 있다 — 이미지/사진 자산이
생기면 `assets/images/` 같은 하위 디렉토리를 새로 만든다.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `icons/` | Figma에서 받은 SVG 아이콘 전부 (see `icons/AGENTS.md`) |

## For AI Agents

### Working In This Directory
아이콘을 직접 그리지 않는다. 새 아이콘이 필요하면 `figma-design-to-code`
스킬을 통해 `get_design_context`가 반환한 asset URL을 `curl`로 받아
이 디렉토리에 커밋한다 — URL은 짧은 시간 안에 만료되므로 받는 즉시
커밋 대상 파일로 저장해야 한다.

<!-- MANUAL: -->
