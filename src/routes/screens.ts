/**
 * 화면 목록 단일 소스. 라우터(App.tsx)와 캡처 스크립트(scripts/shoot.mjs)가
 * 모두 이 목록을 참조한다 — 화면이 늘어나도 여기 하나만 추가하면 된다.
 *
 * figmaNodeId는 Figma 파일(KGjqGDv3jZO3WxZvDs278x) 내 "정리된 화면명" 그룹
 * (1:x, 왼쪽 낱개 프레임)의 원본 노드 id — 추적용으로만 남겨둔다.
 */
export interface ScreenEntry {
  path: string;
  label: string;
  figmaNodeId: string;
  implemented: boolean;
}

export const screens: ScreenEntry[] = [
  { path: "/", label: "첫화면", figmaNodeId: "1:9", implemented: true },
  { path: "/signup", label: "회원가입", figmaNodeId: "1:86", implemented: true },
  { path: "/consent", label: "약관 동의", figmaNodeId: "1:164", implemented: true },
  { path: "/home", label: "메인화면", figmaNodeId: "1:257", implemented: true },
  { path: "/record/prepare", label: "회원가입 후 자녀 등록", figmaNodeId: "1:427", implemented: true },
  { path: "/record", label: "녹음 화면", figmaNodeId: "1:527", implemented: true },
  { path: "/record/processing", label: "녹음화면 - 저장 후 분석 중", figmaNodeId: "1:570", implemented: true },
  { path: "/report/sessions", label: "리포트 화면 - 우측 상단 리포트 버튼 클릭", figmaNodeId: "1:640", implemented: true },
  { path: "/report", label: "리포트 화면", figmaNodeId: "1:750", implemented: true },
  { path: "/report/detail", label: "리포트 화면 - 상세 보기", figmaNodeId: "1:902", implemented: true },
  { path: "/report/open-question", label: "리포트 화면 - 열린질문 상세 데이터", figmaNodeId: "1:1045", implemented: true },
  { path: "/coaching", label: "코칭 화면", figmaNodeId: "1:1135", implemented: true },
  { path: "/coaching/script", label: "코칭 화면 - 스크립트 전체 보기", figmaNodeId: "1:1232", implemented: true },
  { path: "/report/export", label: "리포트 화면 - 내보내기", figmaNodeId: "1:1295", implemented: true },
  { path: "/settings", label: "설정 화면", figmaNodeId: "1:1370", implemented: true },
  { path: "/settings/delete", label: "설정 화면 - 데이터 삭제 요청", figmaNodeId: "1:1488", implemented: true },
];
