import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import { todayScript } from "@/data/coaching";

/** Figma node 1:1232 "CoachingDetail" — 코칭 스크립트 전체 보기 */
export function CoachingScript() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-bg px-5 pt-8" data-node-id="1:1232">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <p className="mt-5 text-xs font-semibold text-text-link">
        {todayScript.situationEmoji} {todayScript.situationLabelLong}
      </p>
      <h1 className="mt-2 text-[23px] font-bold leading-[1.5] text-text-primary">
        {todayScript.headline[0]}
        <br />
        {todayScript.headline[1]}
      </h1>
      <p className="mt-2 text-[13px] text-text-body">{todayScript.subtitle}</p>

      <div className="mt-5 flex flex-col gap-2">
        <div className="rounded-2xl rounded-tl-xl bg-surface p-4 shadow-[0_3px_5px_rgba(49,30,0,0.05)]">
          <p className="text-sm font-medium text-text-primary">{todayScript.primaryQuote}</p>
        </div>
        {todayScript.followUps.map((q) => (
          <div key={q} className="rounded-2xl rounded-tl-xl bg-surface p-4 shadow-[0_3px_5px_rgba(49,30,0,0.05)]">
            <p className="text-sm font-medium text-text-primary">{q}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[20px] bg-surface-cream p-3">
          <p className="text-xs font-bold text-text-link">열린 질문</p>
          <p className="mt-1 text-xs text-text-primary">{todayScript.openQuestionExample}</p>
        </div>
        <div className="rounded-[20px] bg-surface-cream p-3">
          <p className="text-xs font-bold text-text-body">선택 질문</p>
          <p className="mt-1 text-xs text-text-primary">{todayScript.choiceQuestionExample}</p>
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border-[0.5px] border-border bg-surface p-4">
        <p className="text-sm font-semibold text-text-primary">추천 이유</p>
        <p className="mt-1 text-xs text-text-body">{todayScript.reason}</p>
      </div>

      <div className="mb-6 mt-4 rounded-[20px] bg-tip-card-bg p-4">
        <p className="text-xs font-bold text-text-link">기억해 주세요.</p>
        <p className="mt-1 text-xs text-tip-card-text">{todayScript.reminder}</p>
      </div>
    </div>
  );
}
