import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import closeIcon from "@/assets/icons/close.svg";
import recordStopIcon from "@/assets/icons/record-stop.svg";
import { currentChild } from "@/data/child";
import { situations } from "@/data/situations";
import { useRecordingStore } from "@/store/recordingStore";

const WAVE_HEIGHTS = [10, 16, 28, 14, 36, 20, 16, 28, 20, 12, 24];

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** Figma node 1:527 "Recording" — 실시간 녹음 화면 */
export function Record() {
  const navigate = useNavigate();
  const situationId = useRecordingStore((s) => s.situationId);
  const situation = situations.find((s) => s.id === situationId) ?? situations[1];
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative flex h-full w-full flex-col items-center bg-surface-cream px-6 pt-10"
      data-node-id="1:527"
    >
      <button
        type="button"
        aria-label="녹음 취소"
        onClick={() => navigate(-1)}
        className="absolute left-5 top-8 flex size-10 items-center justify-center rounded-full bg-overlay-btn-bg"
      >
        <img src={closeIcon} alt="" className="size-5" />
      </button>

      <div className="rounded-full border-[0.5px] border-pill-border bg-white px-3 py-2">
        <span className="text-xs font-semibold text-text-primary">
          {currentChild.name} · {situation.label} 시간
        </span>
      </div>

      <div
        className="mt-16 flex size-[230px] items-center justify-center rounded-full border-[0.5px] border-record-ring-border bg-record-ring-track"
        style={{
          boxShadow:
            "0 0 0 18px color-mix(in srgb, var(--color-primary) 10%, transparent), 0 0 0 38px color-mix(in srgb, var(--color-primary) 7%, transparent)",
        }}
      >
        <div className="flex flex-col items-center">
          <p
            data-testid="record-timer"
            className="font-mono text-[51px] tracking-[-5px] text-text-primary"
          >
            {formatElapsed(elapsed)}
          </p>
          <div className="mt-5 flex h-12 items-center justify-center gap-[6px]">
            {WAVE_HEIGHTS.map((h, i) => (
              <span
                key={i}
                className="w-[6px] rounded-full bg-primary"
                style={{ height: h, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <p className="text-[17px] font-semibold text-text-primary">듣고 있어요</p>
        <p className="mt-2 text-[13px] text-text-subtle">앱을 닫아도 녹음은 계속돼요</p>
      </div>

      <div className="flex flex-1 flex-col justify-end pb-10">
        <button
          type="button"
          aria-label="녹음 정지"
          onClick={() => navigate("/record/processing")}
          className="flex size-[68px] items-center justify-center rounded-full bg-surface-dark shadow-[0_10px_7.5px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)]"
        >
          <img src={recordStopIcon} alt="" className="size-[30px]" />
        </button>
      </div>
    </div>
  );
}
