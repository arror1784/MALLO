import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import personIcon from "@/assets/icons/person.svg";
import volumeIcon from "@/assets/icons/volume.svg";
import clockIcon from "@/assets/icons/clock.svg";
import checkCircleIcon from "@/assets/icons/check-circle.svg";
import micIcon from "@/assets/icons/mic.svg";
import { currentChild } from "@/data/child";
import { situations } from "@/data/situations";
import { useRecordingStore } from "@/store/recordingStore";

const TIPS = [
  { icon: personIcon, text: "아이와 50cm 이내" },
  { icon: volumeIcon, text: "조용한 환경" },
  { icon: clockIcon, text: "5분 이상이면 분석이 더 정확해요" },
];

/** Figma node 1:427 "Prepare" — 녹음 시작 전 대상·상황 확인 */
export function RecordPrepare() {
  const navigate = useNavigate();
  const situationId = useRecordingStore((s) => s.situationId);
  const setSituationId = useRecordingStore((s) => s.setSituationId);

  return (
    <div className="flex h-full w-full flex-col bg-surface px-6 pt-8" data-node-id="1:427">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => navigate(-1)}
        className="-ml-2 flex size-10 items-center justify-center rounded-full"
      >
        <img src={backIcon} alt="" className="size-[21px]" />
      </button>

      <div className="pt-6">
        <h1 className="text-2xl font-bold leading-9 tracking-[-0.72px] text-text-primary">
          누구와 어떤 시간인가요?
        </h1>
        <p className="mt-2 text-sm text-text-body">대화의 맥락을 알면 코칭이 더 자연스러워져요.</p>
      </div>

      <div className="mt-7 flex items-center rounded-2xl border-[0.5px] border-border bg-bg p-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-avatar-bg text-xl">
          {currentChild.avatarEmoji}
        </div>
        <div className="flex-1 pl-3">
          <p className="text-[15px] font-semibold text-text-primary">
            {currentChild.name} <span className="font-normal text-text-subtle">({currentChild.ageMonths}개월)</span>
          </p>
          <p className="text-xs text-text-subtle">현재 녹음 대상</p>
        </div>
        <button type="button" className="text-[13px] font-semibold text-text-link">
          변경
        </button>
      </div>
      <p className="mt-3 text-xs text-text-subtle">
        녹음이 시작되면 이 세션은 {currentChild.name}에게 고정돼요.
      </p>

      <h2 className="mt-7 text-base font-semibold text-text-primary">추천 대화 상황</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {situations.map((situation) => {
          const selected = situation.id === situationId;
          return (
            <button
              key={situation.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setSituationId(situation.id)}
              className={`flex h-12 items-center justify-center rounded-[20px] border-[0.5px] text-sm font-medium ${
                selected
                  ? "border-primary bg-chip-selected-bg text-text-primary"
                  : "border-border bg-surface text-text-body"
              }`}
            >
              {situation.emoji} {situation.label}
            </button>
          );
        })}
      </div>

      <h2 className="mt-7 text-base font-semibold text-text-primary">더 정확한 분석을 위해</h2>
      <ul className="mt-3">
        {TIPS.map((tip) => (
          <li key={tip.text} className="flex items-center gap-3 py-[10px]">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-surface-cream">
              <img src={tip.icon} alt="" className="size-4" />
            </div>
            <span className="text-sm text-tip-text">{tip.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2 rounded-[20px] bg-success-bg p-3">
        <img src={checkCircleIcon} alt="" className="size-[15px]" />
        <span className="text-[13px] text-success-text">마이크 권한이 허용되어 있어요</span>
      </div>

      <div className="flex flex-1 flex-col justify-end pb-8 pt-5">
        <button
          type="button"
          onClick={() => navigate("/record")}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[20px] bg-primary text-[15px] font-semibold text-text-primary shadow-[0_6px_8px_rgba(255,161,2,0.18)]"
        >
          <img src={micIcon} alt="" className="size-[17px]" />
          녹음 시작하기
        </button>
      </div>
    </div>
  );
}
