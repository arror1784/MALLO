import { useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import infoOutlineIcon from "@/assets/icons/info-outline.svg";
import { metricDetails } from "@/data/metricDetails";

/** Figma node 1:1045 "MetricDetail" — 하단 칩으로 지표를 바꿔가며 보는 상세 화면 */
export function MetricDetail() {
  const navigate = useNavigate();
  const [metricId, setMetricId] = useState("open-questions");
  const metric = metricDetails.find((m) => m.id === metricId) ?? metricDetails[0];
  const otherMetrics = metricDetails.filter((m) => m.id !== metricId);

  return (
    <div className="flex h-full w-full flex-col bg-bg px-5 pt-8" data-node-id="1:1045">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <p className="mt-5 text-sm text-text-subtle">핵심 지표</p>
      <h1 data-testid="metric-label" className="mt-1 text-2xl font-bold text-text-primary">
        {metric.label}
      </h1>

      <div className="mt-5 flex flex-col items-center">
        <p data-testid="metric-value" className="text-[52px] font-bold leading-none text-primary">
          {metric.value}
        </p>
        <p className="mt-2 text-[13px] text-text-body">{metric.refRangeLabel}</p>
        <span className="mt-2 rounded-full bg-status-done-bg px-3 py-1.5 text-xs font-semibold text-report-good">
          {metric.deltaLabel}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border-[0.5px] border-border bg-surface p-4">
        <p className="text-[15px] font-semibold text-text-primary">{metric.label}이란?</p>
        <p className="mt-2 text-[13px] leading-5 text-tip-card-text">{metric.description}</p>
      </div>

      <h2 className="mt-6 text-base font-semibold text-text-primary">월령별 참고 범위</h2>
      <div className="mt-3 overflow-hidden rounded-[20px] border-[0.5px] border-border">
        <div className="grid grid-cols-2 bg-surface-cream p-3">
          <span className="text-xs font-semibold text-text-primary">월령</span>
          <span className="text-xs font-semibold text-text-primary">참고 범위</span>
        </div>
        {metric.refTable.map((row) => (
          <div key={row.ageRange} className="grid grid-cols-2 border-t-[0.5px] border-border p-3">
            <span className="text-xs text-text-primary">{row.ageRange}</span>
            <span className="text-xs text-text-primary">{row.range}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2 rounded-[20px] bg-surface-cream p-3">
        <img src={infoOutlineIcon} alt="" className="mt-0.5 size-4 shrink-0" />
        <p className="text-xs leading-5 text-tip-card-text">
          단일 세션보다 여러 세션의 흐름을 함께 봐주세요. 이 지표는 진단 도구가 아니에요.
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-end pb-6 pt-5">
        <div className="flex gap-2 overflow-x-auto">
          {otherMetrics.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetricId(m.id)}
              className="shrink-0 rounded-[20px] border-[0.5px] border-border bg-surface px-4 py-3 text-[13px] font-medium text-text-primary"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
