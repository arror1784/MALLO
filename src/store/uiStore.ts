import { create } from "zustand";

/**
 * 모달/바텀시트 등 "화면 위에 겹치는" 오버레이는 라우트가 아니라 이 전역
 * 상태로 열고 닫는다. URL이 바뀌지 않으므로 뒤로가기 동작이 자연스럽다.
 */
export type OverlayId =
  | "record-cancel-confirm"
  | "report-export-share"
  | "settings-delete-confirm"
  | null;

interface UiState {
  activeOverlay: OverlayId;
  openOverlay: (id: OverlayId) => void;
  closeOverlay: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeOverlay: null,
  openOverlay: (id) => set({ activeOverlay: id }),
  closeOverlay: () => set({ activeOverlay: null }),
}));
