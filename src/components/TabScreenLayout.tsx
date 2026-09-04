import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ScrollArea";
import { TabBar } from "@/components/TabBar";

/** 홈/리포트/코칭/설정 등 하단 탭바를 갖는 화면의 공통 뼈대. */
export function TabScreenLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col bg-bg">
      <ScrollArea>{children}</ScrollArea>
      <TabBar />
    </div>
  );
}
