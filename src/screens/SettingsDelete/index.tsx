import { useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import { currentChild } from "@/data/child";

type Target = "account" | "child";

/** Figma node 1:1488 "Deletion" */
export function SettingsDelete() {
  const navigate = useNavigate();
  const [target, setTarget] = useState<Target>("child");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex h-full w-full flex-col bg-bg px-5 pt-8" data-node-id="1:1488">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <h1 className="mt-5 text-[23px] font-bold text-text-primary">데이터 삭제 요청</h1>
      <p className="mt-2 text-[13px] text-text-body">
        삭제할 대상을 선택해 주세요. 요청 후에는 되돌릴 수 없어요.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={submitted}
          onClick={() => setTarget("account")}
          className={`flex items-center gap-3 rounded-[20px] border-[0.5px] p-4 text-left ${
            target === "account" ? "border-primary bg-selected-card-bg" : "border-border bg-surface"
          }`}
        >
          <span
            className={`flex size-5 shrink-0 items-center justify-center rounded-full border-[0.5px] ${
              target === "account" ? "border-primary" : "border-radio-border"
            }`}
          >
            {target === "account" && <span className="size-2.5 rounded-full bg-primary" />}
          </span>
          <span className="text-sm font-semibold text-text-primary">계정 전체 데이터</span>
        </button>

        <button
          type="button"
          disabled={submitted}
          onClick={() => setTarget("child")}
          className={`flex items-center gap-3 rounded-[20px] border-[0.5px] p-4 text-left ${
            target === "child" ? "border-primary bg-selected-card-bg" : "border-border bg-surface"
          }`}
        >
          <span
            className={`flex size-5 shrink-0 items-center justify-center rounded-full border-[0.5px] ${
              target === "child" ? "border-primary" : "border-radio-border"
            }`}
          >
            {target === "child" && <span className="size-2.5 rounded-full bg-primary" />}
          </span>
          <span className="text-sm font-semibold text-text-primary">{currentChild.name}이 데이터만</span>
        </button>
      </div>

      <div className="mt-4 rounded-[20px] bg-surface-cream p-4">
        <p className="text-xs font-bold text-text-primary">남은 보관 기한</p>
        <p className="mt-1 text-xs text-text-body">
          음성 원본: 최대 30일 · 전사 및 분석 결과: 최대 24개월
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-end pb-8 pt-5">
        {submitted ? (
          <div className="rounded-[20px] bg-status-done-bg p-4 text-center">
            <p className="text-sm font-semibold text-report-good">삭제 요청이 접수됐어요</p>
            <p className="mt-1 text-xs text-text-body">처리 완료까지 최대 5영업일이 걸려요.</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="flex h-[52px] w-full items-center justify-center rounded-[20px] bg-danger text-[15px] font-semibold text-text-inverse"
          >
            삭제 요청하기
          </button>
        )}
      </div>
    </div>
  );
}
