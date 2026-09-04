import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import headsetIcon from "@/assets/icons/headset.svg";
import checkIcon from "@/assets/icons/check-sm.svg";
import { currentChild } from "@/data/child";

type StepStatus = "done" | "active" | "pending";

const STEP_LABELS = ["업로드", "화자 구분", "전사 · 분석"] as const;

function stepStatus(index: number, activeIndex: number): StepStatus {
  if (index < activeIndex) return "done";
  if (index === activeIndex) return "active";
  return "pending";
}

/** Figma node 1:570 "Processing" — 업로드/화자구분/전사분석 3단계를 순서대로 진행 시뮬레이션 */
export function RecordProcessing() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (activeIndex >= STEP_LABELS.length) return;
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), 2200);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className="flex h-full w-full flex-col bg-bg px-6 pt-8" data-node-id="1:570">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <div className="flex flex-col items-center pt-7 text-center">
        <div className="relative flex size-24 items-center justify-center rounded-[34px] bg-surface-cream">
          <img src={headsetIcon} alt="" className="size-[45px]" />
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-t-2xl rounded-bl-xl rounded-br-2xl bg-primary px-2 py-1 text-xs font-bold text-text-primary">
            말로!
          </span>
        </div>
        <h1 className="mt-7 text-2xl font-bold tracking-[-0.72px] text-text-primary">
          말로가 대화를 읽고 있어요
        </h1>
        <p className="mt-2 text-sm text-text-body">
          {currentChild.name}이와의 대화를 차근차근 살펴보고 있어요.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border-[0.5px] border-border bg-surface px-5">
        {STEP_LABELS.map((label, i) => {
          const status = stepStatus(i, activeIndex);
          return (
            <div
              key={label}
              data-testid="processing-step"
              data-status={status}
              className={`flex items-center gap-3 py-5 ${
                i > 0 ? "border-t-[0.5px] border-[#f6efe5]" : ""
              }`}
            >
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                  status === "done"
                    ? "bg-status-done-bg"
                    : status === "active"
                      ? "bg-tip-card-bg"
                      : "bg-step-pending-bg"
                }`}
              >
                {status === "done" ? (
                  <img src={checkIcon} alt="" className="size-4" />
                ) : (
                  <span
                    className={`size-2.5 rounded-full ${
                      status === "active" ? "bg-text-link/60" : "bg-text-subtle"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-text-primary">{label}</p>
                <p className="text-xs text-text-subtle">
                  {status === "done" && "완료"}
                  {status === "active" && "진행 중 · 약 2분"}
                  {status === "pending" && "대기"}
                </p>
              </div>
              {status === "active" && (
                <span className="text-[11px] font-semibold text-text-link">처리 중</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex h-16 flex-col items-center justify-center rounded-[20px] bg-surface-cream text-center">
        <p className="text-[13px] leading-5 text-tip-card-text">
          완료되면 알려드릴게요.
          <br />
          기다리지 않으셔도 돼요.
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-end pb-8 pt-5">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="flex h-[52px] w-full items-center justify-center rounded-[20px] bg-primary text-[15px] font-semibold text-text-primary shadow-[0_6px_8px_rgba(255,161,2,0.18)]"
        >
          나중에 확인하기
        </button>
      </div>
    </div>
  );
}
