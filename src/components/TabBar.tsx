import { Link, useLocation } from "react-router";
import tabHome from "@/assets/icons/tab-home.svg?raw";
import tabReport from "@/assets/icons/tab-report.svg?raw";
import tabCoaching from "@/assets/icons/tab-coaching.svg?raw";
import tabSettings from "@/assets/icons/tab-settings.svg?raw";

const TABS = [
  { path: "/home", label: "홈", icon: tabHome },
  { path: "/report", label: "리포트", icon: tabReport },
  { path: "/coaching", label: "코칭", icon: tabCoaching },
  { path: "/settings", label: "설정", icon: tabSettings },
];

/**
 * 하단 탭바. 스크롤 영역 밖에 고정되는 레이어이므로 각 탭 화면은 이 컴포넌트를
 * 스크롤되는 본문(ScrollArea)의 형제로 둔다.
 * 아이콘은 <img>가 SVG의 currentColor를 상속하지 못하므로, raw SVG를 인라인
 * 삽입해(?raw import) 활성/비활성 색이 text-* 유틸리티로 상속되게 한다.
 */
export function TabBar() {
  const location = useLocation();

  return (
    <nav className="flex h-[78px] shrink-0 items-start justify-around border-t-[0.5px] border-border bg-surface pt-3">
      {TABS.map((tab) => {
        const active = location.pathname.startsWith(tab.path);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            data-testid={`tab-${tab.path.slice(1)}`}
            aria-current={active ? "page" : undefined}
            className="flex w-16 flex-col items-center gap-1"
          >
            <span
              aria-hidden
              className={`block size-[21px] ${active ? "text-primary" : "text-text-subtle"}`}
              dangerouslySetInnerHTML={{ __html: tab.icon }}
            />
            <span className={`text-[11px] font-medium ${active ? "text-primary" : "text-text-subtle"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
