import type { ReactNode } from "react";

/**
 * iOS 393x852(iPhone 16) 기준 고정 프레임. 브라우저 창이 작아도 내부 좌표는
 * 그대로 두고 transform: scale로만 축소한다 — 내부 좌표 자체를 줄이면
 * Figma 대비 픽셀 대조가 전부 어긋난다.
 */
const FRAME_WIDTH = 393;
const FRAME_HEIGHT = 852;

export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-200 p-6">
      <div
        className="relative shrink-0"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
        }}
      >
        <div
          data-device-frame
          className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-[44px] bg-bg shadow-2xl ring-8 ring-black/90"
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT }}
        >
          <div className="flex h-full w-full flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

export const DEVICE_FRAME_SIZE = { width: FRAME_WIDTH, height: FRAME_HEIGHT };
