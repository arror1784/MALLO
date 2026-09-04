import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import shareIcon from "@/assets/icons/share.svg";
import { Sparkline } from "@/components/Sparkline";
import { MetricProgressBar } from "@/components/MetricProgressBar";
import { currentChild } from "@/data/child";
import { sessionMetrics, sessionOpportunities, fourWeekUtterances } from "@/data/sessionMetrics";

/** Figma node 1:902 "SessionReport" — 세션 리포트 상세 */
export function ReportDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-bg px-5 pt-8" data-node-id="1:902">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="-ml-2 flex size-10 items-center justify-center rounded-full"
        >
          <img src={backIcon} alt="" className="size-[21px]" />
        </button>
        <button
          type="button"
          aria-label="리포트 내보내기"
          onClick={() => navigate("/report/export")}
          className="flex size-10 items-center justify-center rounded-full bg-surface-cream"
        >
          <img src={shareIcon} alt="" className="size-[18px]" />
        </button>
      </div>

      <p className="mt-4 text-[13px] leading-[19.5px] text-text-subtle">7월 18일 · 놀이 시간</p>
      <div className="mt-1 flex items-center gap-2">
        <h1 className="text-[22px] leading-[33px] font-bold text-text-primary">
          {currentChild.name} · {currentChild.ageMonths}개월
        </h1>
        <span className="rounded-full bg-status-done-bg px-2 py-1 text-[10px] leading-[15px] font-semibold text-report-good">
          신뢰도 충분
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {sessionMetrics.map((metric) => (
          <div key={metric.id} className="rounded-2xl bg-surface-cream p-3">
            <p className="text-[11px] leading-[16.5px] font-medium text-text-body">{metric.label}</p>
            <p className="mt-1 text-[19px] leading-[28.5px] font-bold text-text-link">{metric.value}</p>
            <p className="mt-1 text-[10px] leading-[15px] font-medium text-text-subtle">{metric.refLabel}</p>
            <div className="mt-3">
              <MetricProgressBar progress={metric.progress} />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => navigate("/report/open-question")}
        className="mt-3 flex w-full items-center justify-center py-2 text-[13px] leading-[19.5px] font-semibold text-text-link"
      >
        핵심 지표 자세히 →
      </button>

      <h2 className="mt-6 text-[17px] leading-[25.5px] font-semibold text-text-primary">이번 대화에서 찾아본 기회</h2>
      <ol className="mt-3 flex flex-col gap-3">
        {sessionOpportunities.map((text, i) => (
          <li key={text} className="flex items-start gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs leading-[18px] font-bold text-text-primary">
              {i + 1}
            </span>
            <p className="pt-0.5 text-[13px] leading-5 text-tip-card-text">{text}</p>
          </li>
        ))}
      </ol>

      <section className="mt-5 rounded-2xl border-[0.5px] border-border bg-surface p-4">
        <p className="text-sm leading-[21px] font-semibold text-text-primary">최근 4주 발화량</p>
        <div className="mt-3">
          <Sparkline values={fourWeekUtterances} />
        </div>
        <p className="text-xs leading-[18px] text-report-good">꾸준히 늘고 있어요 👏</p>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => navigate("/coaching")}
          className="rounded-[20px] bg-surface-dark p-3 text-left text-[13px] font-semibold leading-[1.5] text-text-inverse"
        >
          오늘의 코칭
          <br />
          스크립트 →
        </button>
        <button
          type="button"
          onClick={() => navigate("/coaching")}
          className="rounded-[20px] bg-tip-card-bg p-3 text-left text-[13px] font-semibold leading-[1.5] text-text-primary"
        >
          오늘의 놀이
          <br />
          미션 →
        </button>
      </div>

      <p className="mb-6 mt-5 border-t-[0.5px] border-border pt-3 text-center text-[11px] leading-[16px] text-text-subtle">
        참고 정보이며 발달 진단이 아니에요.
      </p>
    </div>
  );
}
