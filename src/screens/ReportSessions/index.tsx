import { useState } from "react";
import { useNavigate } from "react-router";
import backIcon from "@/assets/icons/back.svg";
import trashIcon from "@/assets/icons/trash.svg";
import retryIcon from "@/assets/icons/retry.svg";
import { sessions, type SessionStatus } from "@/data/sessions";

const FILTERS: { id: SessionStatus | "all"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "done", label: "완료" },
  { id: "analyzing", label: "분석 중" },
  { id: "failed", label: "실패" },
];

const STATUS_BADGE: Record<SessionStatus, { label: string; className: string }> = {
  done: { label: "완료", className: "bg-tip-card-bg text-text-link" },
  analyzing: { label: "분석 중", className: "bg-surface-cream text-text-link" },
  failed: { label: "실패", className: "bg-status-failed-bg text-status-failed-text" },
};

/** Figma node 1:640 "Sessions" — ReportHome 상단 문서 아이콘에서 진입 */
export function ReportSessions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<SessionStatus | "all">("all");

  const filtered = sessions.filter((s) => filter === "all" || s.status === filter);

  return (
    <div className="flex h-full w-full flex-col bg-bg px-5 pt-8" data-node-id="1:640">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="-ml-2 flex size-10 items-center justify-center rounded-full"
        >
          <img src={backIcon} alt="" className="size-[21px]" />
        </button>
        <p className="text-lg font-bold text-text-primary">녹음 세션</p>
        <button type="button" className="text-[13px] font-semibold text-text-link">
          편집
        </button>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium ${
                active ? "bg-surface-dark text-text-inverse" : "bg-surface-cream text-text-body"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-5 flex flex-col gap-3 pb-8">
        {filtered.map((session) => {
          const badge = STATUS_BADGE[session.status];
          return (
            <li
              key={session.id}
              className="rounded-2xl border-[0.5px] border-border bg-surface p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-semibold text-text-primary">{session.dateLabel}</p>
                  <p className="mt-1 text-xs text-text-subtle">{session.metaLabel}</p>
                </div>
                <span className={`rounded-full px-[10px] py-1 text-[11px] font-semibold ${badge.className}`}>
                  {badge.label}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t-[0.5px] border-[#f6efe5] pt-3">
                {session.status === "done" && (
                  <button
                    type="button"
                    onClick={() => navigate("/report/detail")}
                    className="text-[13px] font-semibold text-text-link"
                  >
                    리포트 보기 →
                  </button>
                )}
                {session.status === "analyzing" && (
                  <span className="text-xs text-text-subtle">{session.progressNote}</span>
                )}
                {session.status === "failed" && (
                  <button type="button" className="flex items-center gap-1 text-[13px] font-semibold text-text-body">
                    <img src={retryIcon} alt="" className="size-[13px]" />
                    재시도
                  </button>
                )}
                <button type="button" aria-label="삭제">
                  <img src={trashIcon} alt="" className="size-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
