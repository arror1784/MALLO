import { create } from "zustand";

/** RecordPrepare에서 고른 상황을 Record 화면이 읽기 위한 세션 상태(더미 플로우 연결용). */
interface RecordingState {
  situationId: string;
  setSituationId: (id: string) => void;
}

export const useRecordingStore = create<RecordingState>((set) => ({
  situationId: "play",
  setSituationId: (id) => set({ situationId: id }),
}));
