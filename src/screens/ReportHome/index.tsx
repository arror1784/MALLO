import { useState } from "react";
import { useNavigate } from "react-router";
import { TabScreenLayout } from "@/components/TabScreenLayout";
import { Sparkline } from "@/components/Sparkline";
import chevronDownIcon from "@/assets/icons/chevron-down-outline.svg";
import documentIcon from "@/assets/icons/document.svg";
import arrowSmallIcon from "@/assets/icons/arrow-small-orange.svg";
import { currentChild } from "@/data/child";
import { weeklyTrend, weeklyHighlights } from "@/data/weeklyTrend";

type Period = "weekly" | "monthly";

/** Figma node 1:750 "ReportHome" — 리포트 탭 루트 */
export function ReportHome() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("weekly");

  return (
    <TabScreenLayout>
      <div className="px-5 pb-8 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <button type="button" className="flex items-center gap-1 text-xs text-text-subtle">
              {currentChild.name} · {currentChild.ageMonths}개월
              <img src={chevronDownIcon} alt="" className="size-[13px]" />
            </button>
            <p className="mt-1 text-[23px] font-bold text-text-primary">리포트</p>
          </div>
          <button
            type="button"
            aria-label="녹음 세션 목록"
            onClick={() => navigate("/report/sessions")}
            className="rounded-full bg-surface-cream p-2"
          >
            <img src={documentIcon} alt="" className="size-[18px]" />
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-surface-dark p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-white/65">최신 세션 리포트 · 7월 18일</span>
            <span className="rounded-full bg-report-good/20 px-2 py-1 text-[10px] text-report-badge-text">
              신뢰도 충분
            </span>
          </div>
          <p className="mt-6 text-[13px] text-white/65">부모 발화 비율</p>
          <p className="mt-1 text-[37px] font-bold text-primary">
            62<span className="text-lg">%</span>
          </p>
          <button
            type="button"
            onClick={() => navigate("/report/detail")}
            className="mt-6 flex items-center gap-1 text-[13px] font-semibold text-primary"
          >
            세션 리포트 보기
            <img src={arrowSmallIcon} alt="" className="size-[15px]" />
          </button>
        </div>

        <section className="mt-4 rounded-2xl border-[0.5px] border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-text-primary">성장 추이</p>
            <div className="flex gap-0.5 rounded-2xl bg-surface-cream p-0.5">
              {(["weekly", "monthly"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`rounded-2xl px-[10px] py-1 text-[11px] font-semibold ${
                    period === p
                      ? "bg-white text-text-primary shadow-sm"
                      : "text-text-subtle"
                  }`}
                >
                  {p === "weekly" ? "주간" : "월간"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <Sparkline values={period === "weekly" ? weeklyTrend.weekly : weeklyTrend.monthly} />
          </div>
          <p className="text-xs">
            <span className="font-medium text-text-link">{weeklyTrend.deltaLabel}</span>{" "}
            <span className="text-text-subtle">· {weeklyTrend.noteLabel}</span>
          </p>
        </section>

        <h2 className="mt-6 text-[17px] font-semibold text-text-primary">이번 주 돌아보기</h2>
        <div className="mt-3 flex flex-col gap-2">
          {weeklyHighlights.map((item) => (
            <div key={item.title} className="flex gap-3 rounded-[20px] bg-surface-cream p-3">
              <span className="text-base">{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-0.5 text-xs text-text-body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 border-t-[0.5px] border-border pt-3 text-center text-[11px] text-text-subtle">
          참고 정보이며 발달 진단이 아니에요.
        </p>
      </div>
    </TabScreenLayout>
  );
}
