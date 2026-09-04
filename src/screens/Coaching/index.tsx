import { useState } from "react";
import { useNavigate } from "react-router";
import { TabScreenLayout } from "@/components/TabScreenLayout";
import { currentChild } from "@/data/child";
import { relatedTags, todayScript, todayMission } from "@/data/coaching";

/** Figma node 1:1135 "Coaching" — 코칭 탭 루트 */
export function Coaching() {
  const navigate = useNavigate();
  const [missionDone, setMissionDone] = useState(false);

  return (
    <TabScreenLayout>
      <div className="px-5 pb-8 pt-8">
        <h1 className="text-[23px] font-bold text-text-primary">오늘의 실천</h1>
        <p className="mt-1 text-[13px] text-text-subtle">
          최신 리포트 기반 · {currentChild.name} ({currentChild.ageMonths}개월)
        </p>

        <div className="mt-4 flex gap-2">
          {relatedTags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-cream px-3 py-2 text-xs text-text-body">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-surface-dark p-5">
          <p className="text-xs text-primary">
            {todayScript.situationEmoji} {todayScript.situationLabel}
          </p>
          <p className="mt-4 text-[37px] leading-none text-primary">&ldquo;</p>
          <p className="mt-2 text-[19px] font-semibold leading-[1.47] text-text-inverse">
            {todayScript.primaryQuote}
          </p>
          <button
            type="button"
            onClick={() => navigate("/coaching/script")}
            className="mt-5 rounded-2xl bg-white/10 px-4 py-2 text-xs font-semibold text-primary"
          >
            스크립트 전체 보기
          </button>
        </div>

        <div className="mt-4 rounded-2xl border-[0.5px] border-border bg-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[15px] font-semibold text-text-primary">{todayMission.title}</p>
              <p className="mt-1 text-[13px] text-text-body">{todayMission.description}</p>
            </div>
            <button
              type="button"
              role="checkbox"
              aria-checked={missionDone}
              onClick={() => setMissionDone((v) => !v)}
              className={`flex size-7 shrink-0 items-center justify-center rounded-full border-[0.5px] ${
                missionDone ? "border-primary bg-primary" : "border-checkbox-border bg-white"
              }`}
            >
              {missionDone && <span className="text-xs font-bold text-text-primary">✓</span>}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMissionDone((v) => !v)}
            className="mt-3 text-xs font-semibold text-text-link"
          >
            {missionDone ? "완료됨 ✓" : "완료했어요"}
          </button>
        </div>

        <div className="mt-3 rounded-2xl bg-surface-cream p-4">
          <p className="text-[15px] font-semibold text-text-primary">전후 비교</p>
          <p className="mt-2 text-[13px] text-text-body">
            세션이 3개 쌓이면 실천 전후 변화를 보여드릴게요.
          </p>
        </div>
      </div>
    </TabScreenLayout>
  );
}
