import type { ReactNode } from "react";

/**
 * 헤더/탭바 같은 고정 레이어와 스크롤 콘텐츠를 분리하기 위한 래퍼.
 * 화면 컴포넌트는 고정 레이어를 형제로 두고, 스크롤되는 본문만 이걸로 감싼다.
 */
export function ScrollArea({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-testid="scroll-area" className={`flex-1 overflow-y-auto overscroll-contain ${className}`}>
      {children}
    </div>
  );
}
