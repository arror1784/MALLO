export type RecordingStatus = "analyzing" | "done";

export interface RecordingEntry {
  id: string;
  label: string;
  status: RecordingStatus;
}

export const recentRecordings: RecordingEntry[] = [
  { id: "rec-1", label: "오늘 오후 5:20", status: "analyzing" },
  { id: "rec-2", label: "7월 12일 · 놀이 시간", status: "done" },
];
