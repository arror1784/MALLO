export type SessionStatus = "done" | "analyzing" | "failed";

export interface Session {
  id: string;
  dateLabel: string;
  metaLabel: string;
  status: SessionStatus;
  progressNote?: string;
}

export const sessions: Session[] = [
  {
    id: "session-1",
    dateLabel: "7월 18일 · 놀이 시간",
    metaLabel: "하늘 · 28개월 · 07:42",
    status: "done",
  },
  {
    id: "session-2",
    dateLabel: "7월 16일 · 식사",
    metaLabel: "하늘 · 28개월 · 10:16",
    status: "analyzing",
    progressNote: "거의 다 되었어요",
  },
  {
    id: "session-3",
    dateLabel: "7월 12일 · 등원",
    metaLabel: "하늘 · 28개월 · 06:09",
    status: "failed",
  },
];
